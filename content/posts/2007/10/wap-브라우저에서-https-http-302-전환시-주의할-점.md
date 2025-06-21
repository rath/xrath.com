---
title: "WAP 브라우저에서 https => http 302 전환시 주의할 점"
date: Mon Oct 15 2007 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2007/10/wap-브라우저에서-https-http-302-전환시-주의할-점
lang: ko
tags: ["wap", "mobile-development", "openid", "web-development"]
---

1달전에 삽질한 내용이지만 저같은 순진무구 :$ 한 개발자가 덜 고생하라고 포스팅 하나 남깁니다.

테스트 했던 폰은 삼성 SCH-V840 이며, 이통사는 SKT를 씁니다. WAP Browser도 302 redirect를 아주 잘- 쫓아갑니다. 

그런데 한가지.. HTTPS 에서 HTTP 로 Redirect 를 걸면 브라우저가 살짝 맛이 갑니다.웹서버 요청 로그를 보면, 3회 정도 **뻘** 요청을 보내다가 '서버에서 응답이 없습니다' 에러를 뱉고 끝나버립니다.

처음에는 WAP Browser라 SSL을 제대로 지원하지 못하나 했는데, 그런건 아니였습니다.
단순히 HTTPS 에서 HTTP 로 Redirect 만을 받지 못하는 것이였습니다.

혹시나 해서 Redirect 대신에 사용자 인터랙션을 한번 더 받고 가도록 페이지를 나눴더니 아주 잘 동작하네요.

자.. 왜 이런 짓을 하게 됐을까요?
WAP 에서 오픈아이디 로그인해보려고 했습니다 -_-; 

myID 를 비롯하여 idtail, 해외 OpenID 제공자인 myopenid 도 제대로 처리를 하지 못하더군요.
혹시나 해서 dummy idp를 올리고 SSL을 모두 끈 상태에서 WAP 으로 OpenID 로그인을 시도했더니 정상적으로 인증되더군요. (sreg도 잘 받아옵니다 :D) 

WAP Browser 만이 생성해내는 HTTP 헤더와 이통사 IP 대역으로 필터링하는 기술로 부비부비하면 :$ 
IDP에 모바일 디바이스를 위한 페이지 뷰와 약간의 로직(선별적인 302 redirect)만 얹어서 휴대폰에서도 즐겁게 OpenID 사용을 할 수 있습니다.

요새 하는 일 없이 바빠서(이런 상태를 게으른 상태라고 합니다 -_-) myID에 발 빠르게 모바일 지원을 넣게 될지는 모르겠으나 기술 장벽은 모두 없어졌으니 재미난 매쉬업과 함께 myID에 모바일 지원을 넣게 될 듯 합니다. 

요점: **HTTPS => HTTP 302 Redirect 조심** 하세요~

## Comments

### 한날
*http://www.hannal.net*
*2007-10-17T18:05:59.000Z*

우후, 나 지금 하는 게 python 으로 openid 물리는 것. ㄱ ㅡ

---

### 김영일
*http://blog.naver.com/gboarder*
*2007-10-18T04:05:16.000Z*

안녕하세요? 장호씨 오랜만입니다. 음 핸드폰연락처바꾸셨던데 -_-; 연락좀 해주세요.. 제가 좀 물어볼께 있어서... JMSN을 제가 쓴 책에 약간 소개하는 내용을 실어서 이를 허락받고자 -_-;

---

### rath
*http://xrath.com/*
*2007-10-18T15:07:40.000Z*

영일씨 오랜만이네요. 따로 연락은 했으니.. ㅎㅎ 그나저나 책 나오면 꼭 하나 얻으러 가겠습니다 (_ _)

---

### 홍길동
*2008-04-24T05:39:41.000Z*

음..openid가 뭐쥐???

---

### rath
*http://xrath.com/*
*2008-04-28T18:32:35.000Z*

http://openid.net/ 을 참고해주세요.

---
