---
title: "OpenID 관련해 홈피 살짝 개편"
date: Sun May 20 2007 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2007/05/openid-관련해-홈피-살짝-개편
lang: ko
tags: ["technology", "openid", "web-development", "java"]
---

아무도 알아채지 못할 정도의 개편을 했습니다.

[OpenID4Java](http://code.sxip.com/openid4java/) 0.8 에서 0.9.2 로 마이그레이션 
로그인 시, [Simple Registration](http://www.openidenabled.com/openid/simple-registration-extension)으로 nickname 요청 (optional)
trust.url 과 returnTo.url 을 분리

OpenID4Java 를 0.9.2로 바꾸면서 고칠 것은 2개 였습니다.

import 구문에서 net.openid. 를 org.openid4java. 로 변경
Provider로 redirect 하기 직전 getRedirectUrl 메서드를 getDestinationUrl(boolean)으로 변경

simple registration 으로 요청한 nickname은 사용자가 거절해도 상관이 없으며 
**OpenID로 로그인 시 nickname을 제공했을 경우, 코멘트를 달 때 '이름' 부분에 자동으로 채워**집니다.
홈페이지를 대체할 무엇인가가 필요했는데, sreg 에 site 주소는 없네요 :(

OpenID에 대한 지식이 짧아서, 인증요청을 만들 때 return_url과 trust_url이 따로 나뉘어있는 사실을 몰랐는데, 알고난 뒤에 생각해보니 이거 없이 어떻게 만들 생각을 했었는지 놀랍기만 합니다 --;

아무튼 분리하게 되어 소스코드가 훨씬 깔끔해졌습니다. return.to.url 은 /openid/verify 로 바꾸고 trust.url 에는 다른 consumer 사이트처럼 http://xrath.com 박았습니다. ㅎㅎ
[ OpenID4Java 에서는 trust.url을 realm이라고 표현](http://code.sxip.com/openid4java/apidoc/org/openid4java/consumer/ConsumerManager.html#authenticate(org.openid4java.discovery.DiscoveryInformation,%20java.lang.String,%20java.lang.String))하네요.

그리고 가끔 코멘트 작성 時, 오류페이지가 보이는 경우가 있었는데 (등록은 제대로 됐지만) [성수씨](http://www.senux.com)의 리포팅으로 함께 해결되었습니다. 

5월에 너무 많은 일을 겪다보니, 홈피 관리에 너무 소홀해진 것 같아 이것 저것 정리하는 시간을 가졌습니다. 
날새고 출근합니다~!

## Comments

### reserve
*http://id.zzabu.net/*
*2007-05-31T06:57:53.000Z*

헤헤.. 오랜만에 방문해봤습니다~ ^^/
ID도 상큼(시큼?;)하게 바꿔봤.. =3

---

### rath
*http://xrath.com/*
*2007-05-31T15:43:20.000Z*

우와 '아이디 짜부 닷넷!!!' ㅎㅎ

---

### 투어캐비넷군
*http://tourcabinet.myid.net/*
*2007-07-03T11:59:14.000Z*

rath님 생일 축하했어요..

---
