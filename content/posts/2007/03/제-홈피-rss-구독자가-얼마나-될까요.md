---
title: "제 홈피 RSS 구독자가 얼마나 될까요"
date: Thu Mar 15 2007 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2007/03/제-홈피-rss-구독자가-얼마나-될까요
lang: ko
tags: ["rss", "web-analytics", "technology"]
---

xrath.com를 rss로 구경하는 사람이 얼마나 될까 궁금하여 tail 과 grep으로 간단히 분석해봤습니다.

먼저 구독자 수를 User-Agent 에 친절히 박아준 곳 입니다.
$ tail -2000 xrath.com.access_log | grep subscribe 

```
44명 HanRSS
19명 Bloglines 
08명 Rojo
08명 Google
==========
79명
```

구독자 수를 제공하지 않는 것들 중 일반 브라우저가 아닌 것들 입니다.
```
$ tail -2000 xrath.com.access_log | grep rss\.xml | grep -v subscribe
YeonMo/5.7.0.0 
UniversalFeedParser/3.3 
AppleSyndication/54
openmaru feed aggregator 0.1
JetBrains Omea Reader 2.2 
```

최근 2,000개만 분석한 것이긴 하지만 YeonMo가 가장 많은 것 같습니다.
아이피 distinct로 사용자 수 다 산출해볼까요 -_-

다음 웹인사이드 통계가 제대로 안나오니.. rss publish 서블릿 고쳐서 내용의 앞 300바이트 정도만 보여주도록 고쳐볼까 생각중입니다. 통계를 알고 싶다구요! 수치에 따라 이미지 관리해주는 센스;;

그나저나 이 블로그에 트랙백은 언제 만들까요? 트랙백을 필요로 하는 사람이 2명 이상이 이 글에 코멘트를 달면 2일안에 트랙백 기능이 생길지도 모른답니다. (무슨 행운의 편지냐 -_-;; )

## Comments

### v쭌쓰v
*2007-03-15T03:53:19.000Z*

(^^)/ Trackback 기능 추가 손!!

---

### v쭌쓰v
*2007-03-15T03:55:35.000Z*

/rath님 제가 쓴 Comment 삭제가 안되는군요; 헛.. Comment 남길때 비번도 넣는 부분이 없는 것을 보니..; 삭제 불가능인건가요;

---

### 서문교
*http://munggo.tistory.com*
*2007-03-15T04:29:37.000Z*

나 연모...씀

---

### 이진석
*2007-03-15T04:42:51.000Z*

안 그래도 오늘 아칭메, xrath.com에 트랙백기능이 있는지 확인했었습니다. ;-)

---

### 이진석
*http://allieus.myid.net/*
*2007-03-15T04:44:48.000Z*

OpenID가 틀리면, 에러메세지없이 댓글이 안 달리는군요. ;-)

---

### rath
*http://xrath.com/*
*2007-03-15T04:46:44.000Z*

v쭌쓰v, 지금은 지원하지 않고 있어요. OpenID로 들어왔을 경우 수정이나 삭제가 가능하도록 하겠습니다.

---

### rath
*http://xrath.com/*
*2007-03-15T04:49:28.000Z*

이진석, 급조한거라 예외처리가 거의 안되어있습니다. 예외가 발생했으니 잽싸게 고쳐야겠네요

---

### rath
*http://xrath.com/*
*2007-03-15T04:49:48.000Z*

이로써 '트랙백 기능' 낙찰되었습니다. (_ _)

---

### rath
*http://xrath.com/*
*2007-03-15T05:30:10.000Z*

OpenID 틀렸을 때 오류처리 넣었습니다 :)

---

### rath
*http://xrath.com/*
*2007-03-15T12:54:37.000Z*

뭉고, 스파게티 먹구 싶다

---

### xhoto
*2007-03-15T15:54:18.000Z*

내가 hanrss 랑 연모랑 둘다 쓰니 카운트 하나 무효 -_-/ ㅋㅋㅋ

---

### rath
*http://xrath.com/*
*2007-03-15T15:55:07.000Z*

T.T ㅋㅋㅋ

---

### reserve
*http://reserve.tistory.com*
*2007-03-16T03:35:19.000Z*

오오.. 날로 번창하는!!
나중에 홈페이지 툴로 묶어서 배포를.. =3

---

### rath
*http://xrath.com/*
*2007-03-16T05:59:20.000Z*

배포할 때 머머 고쳐야하는지 잠깐 생각해봤는데, 20시간은 족히 버닝해야할 견적이 나오네요. 관리자모드에 신경을 써야겠음! ㅎㅎ

---

### 스믈
*http://smle.net*
*2007-03-16T10:48:08.000Z*

저에요 연모... 호호호

---

### rath
*http://xrath.com/*
*2007-03-16T12:37:00.000Z*

엄허 그게 지눅님이였구나 :$

---
