---
title: "J2EE Servlet/JSP로 OpenID 지원 사이트 만들기"
date: Wed May 09 2007 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2007/05/j2ee-servletjsp로-openid-지원-사이트-만들기
lang: ko
tags: ["technology", "java", "openid", "web-development"]
---

지난주부터 현재 재직중인 회사에서 팀을 옮겼습니다. 인프라팀에서 웹서비스 팀으로요!

울 아들 봄공책 군에게 [MSN](http://www.springnote.com/post/1143?page=1), [네이트온](http://www.springnote.com/post/2268?page=1), [Google Talk](http://www.springnote.com/post/2335?page=1) 인터페이스를 열심히 붙여주고 유지보수를 한 뒤,
이번주부터는 [OpenID](http://openid.net) 확산을 위해 J2EE 환경에서 OpenID Consumer를 쉽게 만들 수 있도록 길면 길고 짧다면 짧은 노트를 만들었습니다.

**J2EE 환경에서 OpenID 지원 사이트 구축해보기** <- 링크에요 -_-;

나름 간만의 블로그 포스팅인데 내용이 너무 짧으면 미투데이스러워질까봐 
링크 클릭하기 귀찮으신 분들을 위해 가이드라인 도입 부분 스크린샷을 올립니다.

[

![](/img/java_openid_consumer_guideline.jpg)

](http://rath.springnote.com/pages/213977.xhtml)
* 위 이미지를 클릭하시면 가이드라인 문서로 연결됩니다.

자! OpenID 지원 사이트 많이 만들어주세요! 
[스프링노트](http://www.springnote.com), [미투데이](http://me2day.net), [Lifepod](http://www.lifepod.co.kr) 같은 멋지고 훌륭한 서비스를 만들어주세요! 

만드신 후, OpenAPI를 열어주시는 것 잊지마시구요. 그래야 매쉬업이 많이 나옵니다 /--/

* 이 가이드라인은 곧 OpenID 포럼에 안착할 것입니다. 지금 forum.OpenID.or.kr 이 원활하지 않은데, 피드백이나 문제점들은 일단 이 포스트의 댓글로 달아주세요. 나중에 OpenID 포럼에 포스트 할 때 댓글내용까지 정리해서 한꺼번에 올리겠습니다.

## Comments

### ddt
*http://roald.myid.net/*
*2007-05-10T00:18:15.000Z*

와 잘 보겠습니다(_ _)

---

### rath
*http://xrath.com/*
*2007-05-10T02:31:00.000Z*

히히 ddt님 오랜만이에요

---

### 뀁쁑이
*2008-07-17T08:22:34.000Z*

안녕하세요.
openid consumer 를 혼자 실습해 보다 막히는 부분이 있어서 문의를 드립니다.
(이상하게 trackback이 안되네요;;)

사용자의 추가 정보를 받아오기 위해서 rath님의 글을 보고

sreq.addAttribute("fullname", true);
AuthRequest authReq = manager.authenticate(discovered, returnToUrl, trustRoot);
authReq.addExtension(sreq);

를 추가 했더니 
verification = manager.verify(receiveURL, paramList, di);
에서 verification에 null이 들어가버립니다.

그래서 더이상 진행되지가 않는데요. 추가 정보 받아오는것에대한 설명 좀 부탁드려요;

---
