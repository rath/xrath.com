---
title: "xrath.com 업글 2"
date: 2007-04-01
slug: 2007/04/xrathcom-업글-2
lang: ko
---

오랜만에 xrath.com 에 수정을 가했습니다.

**Blog entry 를 선택하였을 때, <title> 에 포스트의 제목을 표시하기**

이것은 원래 당연히 됐어야 하는 것인데, 제 사이트는 '거의' 모든 페이지의 title이 'Rath World' 였습니다. 그냥 두고 살고있다가.. 구글에서 [nds site:xrath.com](http://www.google.co.kr/search?q=NDS+site%3Axrath.com&ie=utf-8&oe=utf-8&aq=t&rls=org.mozilla:ko:official&client=firefox) 쿼리 결과를 본 후, 반성하고 orz 후딱 고쳤습니다.

**범주에 Me2Day 추가**

미투데이 관련글이 많아진 것 같아 Me2Day 범주를 따로 만들었습니다. 태그는 익숙하지 않아서요.

**미투데이 내 글을 여기로 옮겨오기 위해 metaWeblog 수신기 구현**

미투데이 서비스는 매일 새벽 4시, 전날 미투데이에 남겼던 기록들을 자신의 블로그에 배달해주는 훌륭한 기능을 가지고 있습니다.

![](/img/me2day_metaweblog.jpg)

티스토리, 이글루스는 다 지원한다는데, 수작업으로 만든 제 블로그 돌아갈리 만무해서 문서 보고 뽀작뽀작 만들었습니다. xmlrpc lib 설치하기도 싫고, 코딩이나 해보자~ 해서 아래 문서들 보고 날로 구현했습니다.

[RFC: MetaWeblog API](http://www.xmlrpc.com/metaWeblogApi)
[Six Apart Developer Documentation - metaWeblog.getRecentPosts](http://www.sixapart.com/developers/xmlrpc/metaweblog_api/metaweblognewpost.html)
[Six Apart Developer Documentation - metaWeblog.newPost](http://www.sixapart.com/developers/xmlrpc/metaweblog_api/metaweblognewpost.html)

me2day 배달만을 위해 만든 xmlrpc 서블릿이라 [Me2Day-Archive 범주](/blog/list/Me2Day-Archive)에 자동으로 들어가게 했고, 
RSS 구독자를 위해 NO_RSS 플래그를 켜서 넣도록 했습니다. 
꼭 좌측 메뉴에서 [Me2Day-Archive](/blog/list/Me2Day-Archive) 를 눌러야만 볼 수 있습니다.

물론 [검색](/search?q=REST)은 잘 됩니다 

어느덧 5시가 넘었네요. 다시 [스프링노트 MSN 봇](http://rath.springnote.com/pages/18623) 개선하러 갑니다. (H)

## Comments

### 코에이
*http://koei.fiaa.net*
*2007-04-01T23:53:25.000Z*

래쓰님 잠은 자고 살아야해연~

---

### reserve
*http://reserve.tistory.com*
*2007-04-02T01:32:35.000Z*

맞아염~ 잠은 자고 살아야해연~
간만에 3시간 자고 출근했더니 졸려 죽겠어용 -ㅇ-;

---

### rath
*http://xrath.com/*
*2007-04-02T01:41:28.000Z*

카페인풀 한 하루를 열고 있지요. 
사실 정신없어서 실수 연발 하고 있어연 -_-;

---

### 프리버즈
*2007-04-02T02:00:02.000Z*

미투데이가 형의 여가시간을 주당 40시간씩 뺏어먹고 있지 말입니다.

---

### rath
*http://rath.idtail.com/*
*2007-04-02T02:10:11.000Z*

IDTail 로 남겨보는 코멘트

---

### S2day
*http://s2day.com*
*2007-04-06T03:56:58.000Z*

프로그래밍 하시는거 보면 참... 신기할 따름입니다 -ㅇ-
흐흐 ...  그나저나 미투데이봇도 한번 생각해보심이 ;ㅁ;

---

### rath
*http://xrath.com/*
*2007-04-06T04:09:45.000Z*

-ㅁ- 생각은 많이 해뒀는데, 요새 애사심이 점점 커져서..
스프링노트봇 일단락 지은 후 다음 타켓으로 생각하고 있습니다.
미투스럽게. 아주 심플하게요 ;)

---

