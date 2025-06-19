---
title: "스프링노트 Java API 0.7 릴리즈"
date: 2007-09-05
slug: 2007/09/스프링노트-java-api-07-릴리즈
lang: ko
---

[스프링노트 API for Java](http://code.google.com/p/springnote-api/) 를 0.7로 릴리즈 하였습니다.

기능 변경은 없으며, 돌아오는 9월 17일부터 변경될 API Call 방식(SSL)을 지원합니다.
아니, 지원한다기보다 이전 방식(http)을 아예 사용하지 않고, 새로운 방식(https)를 사용하도록 변경했습니다.

rath.toys.springnote.SpringNote 클래스에 추가된 인터페이스는 없지만 삭제된 것은 있습니다.

```
 setApplicationId
 getApplicationId
```

더 쉬워진 스프링노트의 API Call 에서는 Application ID 개념이 없어지고 
BASIC_AUTH 에 **UserKey.ApplicationKey** 만 넣으면 되기 때문입니다.

참, **Application Key**는 이제 **API 센터**에서 발급 받으시면 됩니다. 다들 아시죠 -ㅅ-?

![](/img/apicenter-main.jpg)

질문은 댓글에서~

## Comments

### 권남
*http://kwon37xi.myid.net/*
*2007-09-06T15:21:33.000Z*

언제나 땡큐합니다~ Notetaker도 작업들어갑니다~

---

### 성수
*2007-09-12T10:57:17.000Z*

오~ 다양한 기능이 속속 추가되는것 같네요~

---

### 김성안
*http://pragmatic.kr*
*2007-11-18T13:49:50.000Z*

오래된 글이지만 댓글 남깁니다. Mac에서는 DateFormat Exception이 발생하네요. note.getPages()나 getPage(id)를 수행하면 발생하고 PageMeta에 채울 Date를 구성하다가 깨지는 것 같습니다. T.T

---

### 김성안
*http://pragmatic.myid.net/*
*2007-11-18T14:37:22.000Z*

음. SVN에서 내려받아 다시 빌드하니 해결됐습니다. 다운로드용 라이브러리와 실제 코드와 미묘한 차이가 있지 싶네요. ^^'

---

### rath
*http://xrath.com/*
*2007-11-18T14:39:43.000Z*

얼마전 스프링노트 팀에서 대대적인 내부 개편 작업하면서 포맷 관련된 게 바뀌었어요. 저도 허겁지겁 2일전에나 겨우 고쳤는데 따로 릴리즈 하지 못한 것이 개발자에게 번거로움을 샀다는 게 죄송스럽네요 ^^;;

스프링노트 이쁘게 써주세요. 개발자들의 애정이 녹아있는 몇 안되는 작품 중 하나에요..  ^^;

---

### 김성안
*2007-12-02T15:48:21.000Z*

rath님 Springnote Java API잘 쓰고 있습니다. 사용 중 에러가 발생해서요 ^^' 시간되시면 아래 문제 좀 봐주세요. 감사합니다.
1. 첨부파일을 다룰 때  DateFormatException이 발생합니다. 실제 XML 파일의 저장 형식에 차이가 있네요. Page는 2007-11-19T01:01:27Z 형식이고, Attachment는 2007-11-26T09:29:14+09:00 이런 형식입니다.
2. 위 문제를 Attachments.java를 수정해서 넘어가도 javax.net.ssl.SSLException: Unsupported record version Unknown-84.84이 발생합니다.
javax.net.ssl.SSLException: Unsupported record version Unknown-84.84

---

