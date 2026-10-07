#!/usr/bin/env python3
"""Back up Gitalk and prepare Garrul's Remark42 import; never modify GitHub issues."""
import argparse
import datetime
import hashlib
import json
import pathlib
import subprocess
from urllib.parse import quote, unquote, urlsplit

ROOT = pathlib.Path(__file__).resolve().parents[1]
DEST = ROOT / 'backups/gitalk'
REPO = 'Macyrate/Macyrate.github.io'


def api(route):
    pages = json.loads(subprocess.check_output(
        ['gh', 'api', route, '--paginate', '--slurp'], text=True))
    return [item for page in pages for item in page]


def save(name, data):
    (DEST / name).write_text(json.dumps(data, ensure_ascii=False, indent=2) + '\n')


def export():
    issues = [i for i in api(f'repos/{REPO}/issues?state=all&per_page=100')
              if 'pull_request' not in i and
              any(l['name'].lower() == 'gitalk' for l in i['labels'])]
    comments, mismatches = [], []
    by_issue = {}
    for row in api(f'repos/{REPO}/issues/comments?per_page=100'):
        number = int(row['issue_url'].rsplit('/', 1)[1])
        by_issue.setdefault(number, []).append(row)
    for issue in issues:
        rows = by_issue.get(issue['number'], [])
        if len(rows) != issue['comments']:
            mismatches.append(dict(issue=issue['number'], reported=issue['comments'],
                                   retrieved=len(rows)))
        comments.extend(dict(c, issue_number=issue['number']) for c in rows)
    save('export.json', dict(repository=REPO,
         exported_at=datetime.datetime.now(datetime.timezone.utc).isoformat(),
         issues=issues, comments=comments, count_mismatches=mismatches))


def path_key(path):
    return unquote(path).removesuffix('index.html')


def convert():
    data = json.loads((DEST / 'export.json').read_text())
    pages = json.loads((DEST / 'pages.json').read_text())
    paths = {path_key('/' + p['path']): p for p in pages}
    issues = {i['number']: i for i in data['issues']}
    mappings, output = {}, []
    for comment in data['comments']:
        # Reject malformed source dates instead of letting the importer use now.
        for field in ('created_at', 'updated_at'):
            datetime.datetime.fromisoformat(comment[field].replace('Z', '+00:00'))
        issue = issues[comment['issue_number']]
        old = path_key(urlsplit(issue['body'].split()[0]).path)
        # Current Hexo slugs include the filename's YYYY-MM-DD prefix.
        parts = old.strip('/').split('/')
        dated = ('/' + '/'.join(parts[:3]) + '/' + '-'.join(parts[:3]) +
                 '-' + parts[3] + '/') if len(parts) == 4 else old
        key = old if old in paths else dated if dated in paths else old
        matched = key in paths
        title = issue['title'].split(' | ')[0].strip()
        mappings[str(issue['number'])] = dict(old_path=old, page_key=key,
            matched=matched, title=title)
        user = comment.get('user') or {}
        output.append(dict(id='gitalk-' + str(comment['id']), pid='',
            orig=comment['body'], time=comment['created_at'],
            edit={'time': comment['updated_at']},
            user={'id': 'github_' + str(user.get('id', 'deleted-' + str(comment['id']))),
                  'name': user.get('login', '已注销用户')},
            locator={'site': 'hakurei.red', 'url': 'https://hakurei.red' + quote(key, safe='/')},
            title=paths[key]['title'] if matched else title))
    assert len({c['id'] for c in output}) == len(output), 'Duplicate comment IDs'
    output.sort(key=lambda c: (c['time'], c['id']))
    (DEST / 'comments.remark42.jsonl').write_text(''.join(
        json.dumps(c, ensure_ascii=False) + '\n' for c in output))
    save('migration-report.json', dict(issue_count=len(issues),
        comment_count=len(output), count_mismatches=data['count_mismatches'],
        mappings=mappings, unresolved_issues=[int(n) for n, m in mappings.items()
                                            if not m['matched']]))
    digest = hashlib.sha256((DEST / 'export.json').read_bytes()).hexdigest()
    (DEST / 'export.sha256').write_text(digest + '  export.json\n')
    print(f'{len(issues)} issues, {len(output)} comments; see migration-report.json')


if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--refresh', action='store_true', help='Refresh GitHub backup first')
    args = parser.parse_args()
    DEST.mkdir(parents=True, exist_ok=True)
    if args.refresh:
        export()
    convert()
