#!/bin/sh
# Recreate the pinned backend checkout; credentials stay outside tracked files.
set -eu
root=$(CDPATH= cd -- "$(dirname -- "$0")/.." && pwd)
service="$root/.comments-service"
if [ ! -d "$service/.git" ]; then
  git clone --depth 1 --branch v2.35.0 https://github.com/KingPin/Garrul.git "$service"
fi
if [ "$(git -C "$service" rev-parse HEAD)" != c4570c85af211007fb7bf1b873b42f01cda7cd1c ]; then
  echo 'Unexpected Garrul revision; review upgrade before continuing.' >&2
  exit 1
fi
for patch in "$root"/deployment/comments/patches/*.patch; do
if git -C "$service" apply --check "$patch" 2>/dev/null; then
  git -C "$service" apply "$patch"
else
  git -C "$service" apply --reverse --check "$patch"
fi
done
cp "$root/deployment/comments/wrangler.toml" "$service/wrangler.toml"
cd "$service"
npm ci --ignore-scripts
echo 'Backend prepared. Use npm run deploy from .comments-service after reviewing changes.'
