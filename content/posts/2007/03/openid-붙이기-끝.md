---
title: "OpenID 붙이기 끝"
date: 2007-03-10
slug: 2007/03/openid-붙이기-끝
lang: ko
---

xrath.com 코멘트 쓰기에 [OpenID](http://openid.net) 를 붙였습니다.

처음에 [OpenID4Java](http://code.sxip.com/openid4java/) 가 있다는 생각에 만만하게 봤었는데, 은근 고생이 많았습니다.

ConsumerManager를 사이트 전역에서 공유해야해서 [javax.servlet.ServletContextListener](http://java.sun.com/j2ee/1.4/docs/api/javax/servlet/ServletContextListener.html) 에서 이녀석을 생성하고 application scope에 넣어둬야 했고 어찌된 일인지 OpenID4Java 소스코드 1줄을 고쳐야하는 삽질을 하기도 했습니다.

게다가 기존 코멘트를 DB에 넣는 write_cmt 에는 캡챠 일치여부만 체크해서 넣도록 되어있었는데, 이제는 OpenID로 처음 인증을 하려 했을 때, 한번 인증 끝나고 다시 사용하려고 할 때, OpenID를 안쓰고 기존 캡챠로 글을 쓰려고 할 때. 이렇게 분기가 3개가 되어버렸네요 -_-;

시작은 기존 코멘트 쓰기에만 붙이느라고 OpenID 전용이 아니지만 앞으로 만들 방명록이나 여타 서비스(비밀:$)에서는 OpenID 전용으로 만들고 구현부도 좀 깔끔하게 해서 제 사이트에 **OpenID로 로그인할 가치**를 만들어 나갈 생각입니다.

그나저나 [OpenID4Java](http://code.sxip.com/openid4java/) 날로 먹기 어렵네요. 포럼에 글도 많지 않고 배포본에 포함된 문서는 아주 간단하기만 했습니다.

아무튼 이제 코멘트 쓰기가 OpenID 지원을 하니, [updong님의 포스트](http://updong.net/wordpress/archives/56)처럼 맘껏 테스트해보세요~

OpenID가 없으신 분은 기존방식처럼 캡챠를 통해 코멘트를 남길 수 있고요
OpenID를 만들고자 하시는 분은 국내 OpenID 프로바이더인 [마이아이디넷(myID)](http://www.myid.net/)에서 만들 수 있습니다.

## Comments

### rath
*http://xrath.com/*
*2007-03-10T23:10:43.000Z*

붙인 기념 주인장 포스트~

---

### 지꼴
*http://jiggol.myid.net/*
*2007-03-11T03:15:01.000Z*

울라울라 울라울라~

---

### 동윤
*http://nainu.myid.net/*
*2007-03-11T07:11:20.000Z*

테슷흐~

---

### 동윤
*http://nainu.myid.net/*
*2007-03-11T07:12:10.000Z*

불여우라 그런가? http://xrath.com/null 로 리다이렉트됩니다~
닉넴이나 홈피는 나중에 openid provider가 주는 값을 받아서 쓰셔두 될듯..
simple registration <-

---

### 동윤
*http://nainu.myid.net/*
*2007-03-11T07:14:04.000Z*

멋져영 ㅎㅎ

---

### rath
*http://xrath.com/*
*2007-03-11T13:01:12.000Z*

불여우에서도 종종 하는데.. how to replay 어려운 버그인가보다 T.T
simple registration 고민중 ~_~

---

### rath
*2007-03-11T13:04:17.000Z*

그나저나 누가보면 OpenID 아니면 코멘트 못 남기는 줄 알겠네요 _-_

---

### rath
*http://rath.myopenid.com/*
*2007-03-11T13:16:57.000Z*

rath.myopenid.com으로 남겨보는 코멘트

---

### 테스터동윤
*http://nainu.myid.net/*
*2007-03-11T14:54:47.000Z*

ㅇㅇㅇ

---

### xhoto
*2007-03-11T15:12:18.000Z*

귀차나 ㅋㅋㅋ 운 좋은 인간이라는거 증명하는게 어렵긴하지만 -_-
난 인간이 아닌가 왜 자꾸 틀리지.

---

### xhoto
*http://xhoto.myid.net/*
*2007-03-11T15:15:54.000Z*

--/

---

### rath
*http://xrath.com/*
*2007-03-11T23:43:10.000Z*

코멘트 입력 당시.. 특별히 운좋은 인간이 아니였던게야 _-_

---

