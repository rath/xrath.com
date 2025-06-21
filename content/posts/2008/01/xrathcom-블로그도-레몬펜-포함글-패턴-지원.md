---
title: "xrath.com 블로그도 레몬펜 포함글 패턴 지원"
date: Wed Jan 02 2008 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2008/01/xrathcom-블로그도-레몬펜-포함글-패턴-지원
lang: ko
tags: ["blogging", "web-development", "lemonpen"]
---

[레몬펜 포함글 패턴 지원](http://lemonpen.springnote.com/pages/685640.xhtml)..  
[미투데이 블로그로 배달하는 기능](http://www.openonweb.com/mashupcontent/%EB%AF%B8%ED%88%AC%EB%8D%B0%EC%9D%B4-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EA%B8%80%EB%B0%B0%EB%8B%AC)..   
[스프링노트에서 쓴 글을 블로그로 보내는 기능](http://help.springnote.com/pages/229046)..
트랙백..

이런 쓸만한 기능들이 나올 때마다 가슴 한 켠이 아프다.  
2006년 어느 봄날, 그저 만들어본 것이거늘.. 뭐 하나 지원할 때마다   
누구의 도움도 받을 수 없는 IT 속의 외딴 섬에서 지원 기능들을 혼자 만들어야 하는 고뇌를 누가 알아줄 것인가.

물론 남들 다 제대로 지원 못하는데 혼자 쌈빡하게 지원하는 쾌거를 이룰 수도 있다.   
하여튼 이제 레몬펜 포함글 패턴을 여기 홈피도 지원한다.

**레몬펜 포함글 패턴**이 도대체 뭔지.. 헷갈리는가?

그렇다. 블로그란 녀석이 첫 대문 페이지에 최근글 2-3개를 보여주다보니,   
http://xrath.com/ 상태에서 최근글에 레몬펜질을 하고나면 새 글이 올라오거나 퍼머링크로 접근하면 논리적으로 똑같은 글임에도 불구하고 소중한 레몬펜질이 보이지 않는 것이다.

이걸 어떻게 해결한 것인가.  
고유 글을 div 로 휘감고 class 속성에 **hentry** 를 넣어주고   
그 안에 해당 글 퍼머링크 에 **rel** 속성으로 **bookmark** 라고 타다닥 타이핑만 해넣으면 되는 것이다.

덕분에 이 블럭은 

```
http://xrath.com/
http://xrath.com/index.jsp
http://xrath.com/blog.jsp?category=-1&page=1
```

어떻게 접근하든 잘 보이게 되는 쾌거를 이루는 것이다.

얼쑤

## Comments

### 한날
*http://www.hannal.net*
*2008-01-05T08:05:59.000Z*

요거 필요했던 기능이로군~!

---

### rath
*http://xrath.com/*
*2008-01-05T14:24:01.000Z*

헤헤 아주 좋아

---

### 지저깨비
*http://zizukabi.myid.net/*
*2008-01-27T06:47:38.000Z*

제 블로거닷컴 블로그도 레몬펜 패턴글 포함을 지원하게 수정했답니다.
잘 되는지 확인 좀 해주세요. ^^

---

### rath
*http://xrath.com/*
*2008-01-29T05:18:17.000Z*

한 페이지에 하나씩만 나와서 어떻게 테스트해야할지 고민하고 있었는데..
이미 테스트 하셨다니 다행이네요 :-)

---
