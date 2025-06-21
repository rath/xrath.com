---
title: "YouTube API V2 나옴"
date: Thu Oct 23 2008 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2008/10/youtube-api-v2-나옴
lang: ko
tags: ["youtube-api", "facebook-integration", "api-v2", "video-services"]
---

Facebook 미니피드에 자신의 YouTube 계정을 연결해둔 사람은 알 것이다.
YouTube 즐겨찾기에(favorites) 등록해둔 동영상들이 여러번 올라오는 지저분한 일을.

페이스북이 youtube 연동 부분을 발로 짰거나, 즐겨찾기한 동영상이 특별 대우를 받아 친구들에게 자주 노출되도록 기획된 게 아닐까 뭐 그런 추측만 했을 뿐인데, 며칠전 릴리즈된 [YouTube API V2](http://apiblog.youtube.com/2008/10/ch-ch-ch-changes-versioning-geo-search.html) 를 보면 그 이유를 알 수 있다.

**Issue 110 - Retrieve time a favorite was added**

아니! 즐겨찾기 항목에 시간 필드가 없었다니;;;
V2 에서는 [즐겨찾기 항목을 gdata로 접근할 때 시간 필드까지 넘겨준다](http://code.google.com/p/gdata-issues/issues/detail?id=110)고 한다. 



```
Please list service(s) affected YouTube

What steps will reproduce the problem?
1. Feed data by API
2. There is no information about when video was added to favorites by user

What is the expected output? What do you see instead?
Time when user add video to his/her favorites 

What version of the product are you using? On what operating system?
Current Google API
```



브라보, facebook도 얼른 v2를 적용하기 바란다. :$
