//当MetingJS爆炸时使用的Plan B
//目前还没想好怎么解析网易云歌单，暂时“拿来主义”吧

const ap = new APlayer({
    container: document.getElementById('aplayer'),
    fixed: true,
    autoplay: false,
    lrcType: 3,
    order: random,
    audio: 
	[
 {
 "name":"\u30a2\u30b2\u30a4\u30f3",
 "artist":"\u6a2a\u5c71\u514b",
 "url":"https://cdn.twili.club/songs/June.mp3",
 "cover":"https://cdn.twili.club/songs/June.jpg",
 "lrc":"https://cdn.twili.club/songs/June.json"
 },
 {
 "name":"Illusionary Daytime",
 "artist":"Shirfine",
 "url":"https://cdn.twili.club/songs/Illusionary_Daytime.mp3",
 "cover":"https://cdn.twili.club/songs/Illusionary_Daytime.jpg",
 "lrc":"https://cdn.twili.club/songs/Illusionary_Daytime.json"
 },
 {
 "name":"\u52fe\u6307\u8d77\u8a93\uff08Cover\uff1ailem\uff09",
 "artist":"\u6ce0\u9e22yousa",
 "url":"https://cdn.twili.club/songs/Cover_ilem.mp3",
 "cover":"https://cdn.twili.club/songs/Cover_ilem.jpg",
 "lrc":"https://cdn.twili.club/songs/Cover_ilem.json"
 },
{
 "name":"\u57ce\u5357\u82b1\u5df2\u5f00",
 "artist":"\u4e09\u4ea9\u5730",
 "url":"https://cdn.twili.club/songs/South.mp3",
 "cover":"https://cdn.twili.club/songs/South.jpg",
 "lrc":"https://cdn.twili.club/songs/South.json"
 },
 {
 "name":"\u6211\u60f3\u5927\u58f0\u544a\u8bc9\u4f60",
 "artist":"\u6a0a\u51e1",
 "url":"https://cdn.twili.club/songs/Loud.mp3",
 "cover":"https://cdn.twili.club/songs/Loud.jpg",
 "lrc":"https://cdn.twili.club/songs/Loud.json"
 },
 {
 "name":"Time Back",
 "artist":"Bad Style",
 "url":"https://cdn.twili.club/songs/Time_Back.mp3",
 "cover":"https://cdn.twili.club/songs/Time_Back.jpg",
 "lrc":"https://cdn.twili.club/songs/Time_Back.json"
 },
 
 {
 "name":"\u4e0d\u4e3a\u8c01\u800c\u4f5c\u7684\u6b4c (Live)",
 "artist":"\u5f90\u4f73\u83b9 \/ \u6797\u4fca\u6770",
 "url":"https://cdn.twili.club/songs/Nobody_Song.mp3",
 "cover":"https://cdn.twili.club/songs/Nobody_Song.jpg",
 "lrc":"https://cdn.twili.club/songs/Nobody_Song.json"
 },
 
{
 "name":"Beauty and a Beat",
 "artist":"Alex Goot / Chrissy Costanza / Kurt Hugo Schneider",
 "url":"https://cdn.twili.club/songs/Beauty-and-a-Beat.mp3",
 "cover":"https://cdn.twili.club/songs/Beauty-and-a-Beat.jpg",
 "lrc":"https://cdn.twili.club/songs/Beauty-and-a-Beat.json"
 },
 {
 "name":"When You Left Me",
 "artist":"Stories",
 "url":"https://cdn.twili.club/songs/When-You-Left-Me.mp3",
 "cover":"https://cdn.twili.club/songs/When-You-Left-Me.jpg",
 "lrc":"https://cdn.twili.club/songs/When-You-Left-Me.json"
 },
 {
 "name":"\u521d\u590f\u4e4b\u7ea6\u5b9a",
 "artist":"\u6b27\u9633\u8000\u83b9",
 "url":"https://cdn.twili.club/songs/summer-agreement.mp3",
 "cover":"https://cdn.twili.club/songs/summer-agreement.jpg",
 "lrc":"https://cdn.twili.club/songs/summer-agreement.json"
 },
 {
 "name":"\u4e16\u754c\u304c\u7d42\u308b\u307e\u3067\u306f\u2026",
 "artist":"WANDS",
 "url":"https://cdn.twili.club/songs/until-the-world-ends.mp3",
 "cover":"https://cdn.twili.club/songs/until-the-world-ends.jpg",
 "lrc":"https://cdn.twili.club/songs/until-the-world-ends.json"
 },
 {
 "name":"\u6740\u7834\u72fc",
 "artist":"JS",
 "url":"https://cdn.twili.club/songs/Killing-the-wolf.mp3",
 "cover":"https://cdn.twili.club/songs/Killing-the-wolf.jpg",
 "lrc":"https://cdn.twili.club/songs/Killing-the-wolf.json"
 },
 {
 "name":"\u5904\u5904\u543b",
 "artist":"\u6768\u5343\u5b05",
 "url":"https://cdn.twili.club/songs/Kiss-everywhere.mp3",
 "cover":"https://cdn.twili.club/songs/Kiss-everywhere.jpg",
 "lrc":"https://cdn.twili.club/songs/Kiss-everywhere.json"
 },
 {"name":"At The Edge",
 "artist":"\u5343\u5742",
 "url":"https://cdn.twili.club/songs/At-The-Edge.mp3",
 "cover":"https://cdn.twili.club/songs/At-The-Edge.jpg",
 "lrc":"https://cdn.twili.club/songs/At-The-Edge.json"
 },
 {"name":"\u60ca\u86f0",
 "artist":"\u97f3\u9619\u8bd7\u542c \/ \u738b\u6893\u94b0",
 "url":"https://cdn.twili.club/songs/Horror.mp3",
 "cover":"https://cdn.twili.club/songs/Horror.jpg",
 "lrc":"https://cdn.twili.club/songs/Horror.json"
 },
 {
 "name":"Dream\u00d7Dream",
 "artist":"\u611b\u5185\u91cc\u83dc",
 "url":"https://cdn.twili.club/songs/Dream-Dream.mp3",
 "cover":"https://cdn.twili.club/songs/Dream-Dream.jpg",
 "lrc":"https://cdn.twili.club/songs/Dream-Dream.json"
 },
 {
 "name":"\u900d\u9065\u53f9",
 "artist":"\u80e1\u6b4c",
 "url":"https://cdn.twili.club/songs/sigh.mp3",
 "cover":"https://cdn.twili.club/songs/sigh.jpg",
 "lrc":"https://cdn.twili.club/songs/sigh.json"
 },
 {
 "name":"China-P",
 "artist":"\u5f90\u68a6\u5706",
 "url":"https://cdn.twili.club/songs/China-P.mp3",
 "cover":"https://cdn.twili.club/songs/China-P.jpg",
 "lrc":"https://cdn.twili.club/songs/China-P.json"
 },
 {
 "name":"\u5012\u5e26",
 "artist":"\u8521\u4f9d\u6797",
 "url":"https://cdn.twili.club/songs/rewind.mp3",
 "cover":"https://cdn.twili.club/songs/rewind.jpg",
 "lrc":"https://cdn.twili.club/songs/rewind.json"
 },
 {"name":"\u65e5\u4e0d\u843d",
 "artist":"\u8521\u4f9d\u6797",
 "url":"https://cdn.twili.club/songs/sunset.mp3",
 "cover":"https://cdn.twili.club/songs/sunset.jpg",
 "lrc":"https://cdn.twili.club/songs/sunset.json"
 },
 {
 "name":"Way Back",
 "artist":"Vicetone \/ Cozi Zuehlsdorff",
 "url":"https://cdn.twili.club/songs/Way-Back.mp3",
 "cover":"https://cdn.twili.club/songs/Way-Back.jpg",
 "lrc":"https://cdn.twili.club/songs/Way-Back.json"
 },
 {
 "name":"Solo Dance (Acoustic Mix)",
 "artist":"Martin Jensen",
 "url":"https://cdn.twili.club/songs/Solo-Dance.mp3",
 "cover":"https://cdn.twili.club/songs/Solo-Dance.jpg",
 "lrc":"https://cdn.twili.club/songs/Solo-Dance.json"
 }, 
 {
 "name":"\u6ce1\u6cab",
 "artist":"G.E.M.\u9093\u7d2b\u68cb",
 "url":"https://cdn.twili.club/songs/foam.mp3",
 "cover":"https://cdn.twili.club/songs/foam.jpg",
 "lrc":"https://cdn.twili.club/songs/foam.json"
 },
 {
 "name":"\u518d\u89c1",
 "artist":"G.E.M.\u9093\u7d2b\u68cb",
 "url":"https://cdn.twili.club/songs/Bye.mp3",
 "cover":"https://cdn.twili.club/songs/Bye.jpg",
 "lrc":"https://cdn.twili.club/songs/Bye.json"
 },
 {
 "name":"\u559c\u6b22\u4f60",
 "artist":"G.E.M.\u9093\u7d2b\u68cb",
 "url":"https://cdn.twili.club/songs/Love.mp3",
 "cover":"https://cdn.twili.club/songs/Love.jpg",
 "lrc":"https://cdn.twili.club/songs/Love.json"
 },
 {
 "name":"\u6211\u7684\u79d8\u5bc6",
 "artist":"G.E.M.\u9093\u7d2b\u68cb",
 "url":"https://cdn.twili.club/songs/Secret.mp3",
 "cover":"https://cdn.twili.club/songs/Secret.jpg",
 "lrc":"https://cdn.twili.club/songs/Secret.json"
 },
 {
 "name":"\u53cb\u4ebaA\u541b\u3092\u79c1\u306e\u4f34\u594f\u8005\u306b\u4efb\u547d\u3057\u307e\u3059",
 "artist":"\u6a2a\u5c71\u514b",
 "url":"https://cdn.twili.club/songs/friends.mp3",
 "cover":"https://cdn.twili.club/songs/friends.jpg",
 "lrc":"https://cdn.twili.club/songs/friends.json"
 },
 {
 "name":"China-X",
 "artist":"\u5f90\u68a6\u5706",
 "url":"https://cdn.twili.club/songs/China-X.mp3",
 "cover":"https://cdn.twili.club/songs/China-X.jpg",
 "lrc":"https://cdn.twili.club/songs/China-X.json"
 },
 {
 "name":"Baby Sister",
 "artist":"2009\u5feb\u5973\u5168\u56fd12\u5f3a",
 "url":"https://cdn.twili.club/songs/Baby-Sister.mp3",
 "cover":"https://cdn.twili.club/songs/Baby-Sister.jpg",
 "lrc":"https://cdn.twili.club/songs/Baby-Sister.json"
 },
 {
 "name":"\u5915\u66ae\u308c\u306e\u30b0\u30e9\u30f3\u30c9",
 "artist":"Annabel",
 "url":"https://cdn.twili.club/songs/Grand-of-twilight.mp3",
 "cover":"https://cdn.twili.club/songs/Grand-of-twilight.jpg",
 "lrc":"https://cdn.twili.club/songs/Grand-of-twilight.json"
 },
 {
 "name":"\u3055\u304f\u3089~\u3042\u306a\u305f\u306b\u51fa\u4f1a\u3048\u3066\u3088\u304b\u3063\u305f~ - \u6a31\u82b1\u6a31\u82b1\u60f3\u89c1\u4f60\uff08Cover\uff1aRSP\uff09",
 "artist":"\u7535\u7ade\u5c11\u5973\u96ea\u843d",
 "url":"https://cdn.twili.club/songs/Sakura-meet.mp3",
 "cover":"https://cdn.twili.club/songs/Sakura-meet.jpg",
 "lrc":"https://cdn.twili.club/songs/Sakura-meet.json"
 },
 {
 "name":"DAN DAN \u5fc3\u9b45\u304b\u308c\u3066\u304f",
 "artist":"FIELD OF VIEW",
 "url":"https://cdn.twili.club/songs/DAN-DAN.mp3",
 "cover":"https://cdn.twili.club/songs/DAN-DAN.jpg",
 "lrc":"https://cdn.twili.club/songs/DAN-DAN.json"
 },
 {
 "name":"Wings Of Piano",
 "artist":"V.K\u514b",
 "url":"https://cdn.twili.club/songs/Wings-Of-Piano.mp3",
 "cover":"https://cdn.twili.club/songs/Wings-Of-Piano.jpg",
 "lrc":"https://cdn.twili.club/songs/Wings-Of-Piano.json"
 },
 {
 "name":"\u5149\u5e74\u4e4b\u5916",
 "artist":"G.E.M.\u9093\u7d2b\u68cb",
 "url":"https://cdn.twili.club/songs/Outside-the-light.mp3",
 "cover":"https://cdn.twili.club/songs/Outside-the-light.jpg",
 "lrc":"https://cdn.twili.club/songs/Outside-the-light.json"
 },
 {
 "name":"\u30a2\u30a4\u306e\u30b7\u30ca\u30ea\u30aa",
 "artist":"CHiCO with HoneyWorks",
 "url":"https://cdn.twili.club/songs/Eye-scenario.mp3",
 "cover":"https://cdn.twili.club/songs/Eye-scenario.jpg",
 "lrc":"https://cdn.twili.club/songs/Eye-scenario.json"
 },
 {
 "name":"Take me hand",
 "artist":"DAISHI DANCE \/ Cecile Corbel",
 "url":"https://cdn.twili.club/songs/Take-me-hand.mp3",
 "cover":"https://cdn.twili.club/songs/Take-me-hand.jpg",
 "lrc":"https://cdn.twili.club/songs/Take-me-hand.json"
 },
 
 {
 "name":"\u3053\u3053\u306b\u3044\u308b\u3088",
 "artist":"SoulJa \/ \u9752\u5c71\u30c6\u30eb\u30de",
 "url":"https://cdn.twili.club/songs/I-am-here.mp3",
 "cover":"https://cdn.twili.club/songs/I-am-here.jpg",
 "lrc":"https://cdn.twili.club/songs/I-am-here.json"
 },
 {
 "name":"\u306a\u3093\u3067\u3082\u306a\u3044\u3084\u00a0\u6ca1\u4ec0\u4e48\u5927\u4e0d\u4e86\u7684\uff08Cover\uff1aRadwimps\uff09",
 "artist":"Akie\u79cb\u7ed8",
 "url":"https://cdn.twili.club/songs/nothing-embarrassed.mp3",
 "cover":"https://cdn.twili.club/songs/nothing-embarrassed.jpg",
 "lrc":"https://cdn.twili.club/songs/nothing-embarrassed.json"
 },
 {
 "name":"\u8d77\u98ce\u4e86",
 "artist":"\u4e70\u8fa3\u6912\u4e5f\u7528\u5238",
 "url":"https://cdn.twili.club/songs/windy.mp3",
 "cover":"https://cdn.twili.club/songs/windy.jpg",
 "lrc":"https://cdn.twili.club/songs/windy.json"
 },
 {
 "name":"\u6a31\u82b1\u6a31\u82b1\u60f3\u89c1\u4f60",
 "artist":"\u674e\u868a\u9999 \/ \u6ee1\u6c49\u5168\u5e2d",
 "url":"https://cdn.twili.club/songs/Sakura.mp3",
 "cover":"https://cdn.twili.club/songs/Sakura.jpg",
 "lrc":"https://cdn.twili.club/songs/Sakura.json"
 },
 {
 "name":"Intro",
 "artist":"The xx",
 "url":"https://cdn.twili.club/songs/Intro.mp3",
 "cover":"https://cdn.twili.club/songs/Intro.jpg",
 "lrc":"https://cdn.twili.club/songs/Intro.json"
 },
 {
 "name":"Friendships (Original Mix)",
 "artist":"Pascal Letoublon",
 "url":"https://cdn.twili.club/songs/Friendships.mp3",
 "cover":"https://cdn.twili.club/songs/Friendships.jpg",
 "lrc":"https://cdn.twili.club/songs/Friendships.json"
 },
 {
 "name":"Look4You",
 "artist":"Alberto Ciccarini",
 "url":"https://cdn.twili.club/songs/Look4You.mp3",
 "cover":"https://cdn.twili.club/songs/Look4You.jpg",
 "lrc":"https://cdn.twili.club/songs/Look4You.json"
 },
 {
 "name":"\u305d\u3070\u306b\u3044\u308b\u306d",
 "artist":"\u9752\u5c71\u30c6\u30eb\u30de",
 "url":"https://cdn.twili.club/songs/By.mp3",
 "cover":"https://cdn.twili.club/songs/By.jpg",
 "lrc":"https://cdn.twili.club/songs/By.json"
 },
 {
 "name":"Pick Me Up",
 "artist":"Emilia De Poret",
 "url":"https://cdn.twili.club/songs/Pick-Me-Up.mp3",
 "cover":"https://cdn.twili.club/songs/Pick-Me-Up.jpg",
 "lrc":"https://cdn.twili.club/songs/Pick-Me-Up.json"
 },
 {
 "name":"The Ray of Light",
 "artist":"FELT",
 "url":"https://cdn.twili.club/songs/The-Ray-of-Light.mp3",
 "cover":"https://cdn.twili.club/songs/The-Ray-of-Light.jpg",
 "lrc":"https://cdn.twili.club/songs/The-Ray-of-Light.json"
 },
 {
 "name":"Hymn For The Weekend [Remix]",
 "artist":"Alan Walker \/ Coldplay",
 "url":"https://cdn.twili.club/songs/Hymn-For-The-Weekend.mp3",
 "cover":"https://cdn.twili.club/songs/Hymn-For-The-Weekend.jpg",
 "lrc":"https://cdn.twili.club/songs/Hymn-For-The-Weekend.json"
 },
 {
 "name":"\u7ea2\u662d\u613f",
 "artist":"\u97f3\u9619\u8bd7\u542c",
 "url":"https://cdn.twili.club/songs/Red-wish.mp3",
 "cover":"https://cdn.twili.club/songs/Red-wish.jpg",
 "lrc":"https://cdn.twili.club/songs/Red-wish.json"
 },
 {
 "name":"\u6ca1\u6709\u4ec0\u4e48\u4e0d\u540c",
 "artist":"\u66f2\u5a49\u5a77",
 "url":"https://cdn.twili.club/songs/no-difference.mp3",
 "cover":"https://cdn.twili.club/songs/no-difference.jpg",
 "lrc":"https://cdn.twili.club/songs/no-difference.json"
 }
 ]
	
});