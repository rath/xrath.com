---
title: "SMS로 미투데이에 포스트 남기기"
date: Sat Apr 07 2007 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2007/04/sms로-미투데이에-포스트-남기기
lang: ko
tags: ["api", "sms-integration", "programming"]
---

[codian님](http://codian.net/wp/)의 OpenAPI 지원으로 SMS으로 미투데이에 글 쓰기를 실현하게 되었습니다.

먼저 me2API 의 자바 wrapper를 만들었습니다. 
여기서 API Document를 볼 수 있고

**[View Me2API-Java API Document](/devdoc/me2api-java/)**

여기서 다운로드 받으시면 됩니다. (J2SE 5 이상입니다)

**[Download Me2API-Java 0.1](/files/me2api-java-0.1.jar)**

정말 간단하게 사용할 수 있습니다. 미투데이 스럽게요 ;)


```java
 Me2API me2 = new Me2API();
 me2.setUsername("rath");
 me2.setUserKey("00112233"); 
 me2.setApplicationKey("1"); // <i>아직 발급 절차가 없습니다</i>
 me2.post( "아무리 할 일이 많아도 여유를 잃은 삶 따위는 살지 않으리", "*활짝*", KIND_THINK);
```


아래는 SMS로 미투데이에 글 올리는 모습입니다. -_-

![](/img/me2day_sms.jpg)
 
이건 순전히 혼자 만든 sms mo 핵을 이용한 것이기 때문에, 저 말고는 사용하실 수 없습니다 :$
그래도 만들어서 혼자만 쓰면 너무 자랑글이 되는 것 같으니 선착순 4명 받겠습니다! 
제 메일 주소로 **자신의 미투데이 이름, 사용자 키, 핸드폰 번호**를 알려주세요.
그러면 제 핸드폰 번호와 함께 사용법을 적어 회신 메일을 보내드리겠습니다 ;)
(nainu 와 프리버즈는 예약 손님이니 보내지 말기. 강제로 예약해서 미안 -.-)

나머지 분들은 미투데이가 공식으로 MO 서비스 오픈하기를 기다려주세요 (씨익)
그럼 즐거운 미투데이 하세요.

===================================================  
2007-04-08 17:36 부로  
**선착순 4명 모두 마감되었습니다.**

## Comments

### 이진석
*http://allieus.myid.net/*
*2007-04-07T12:03:42.000Z*

축하드립니다. ^^
동영상 마지막에 래쓰님 "하하~" 유일한 보이스~ :-)
api 잘 쓰겠습니다.

---

### dise
*http://dise.myid.net/*
*2007-04-07T12:38:29.000Z*

랫흐옹..의 봄노트에 공유받은 페이지들...  당췌 어떻게 해야 공유 받을 수 있는거에요? 
orz  1주일째 고민중 ~_~

---

### steelheart
*http://steelheart.kr*
*2007-04-07T12:41:11.000Z*

같은 폰 쓰시는군요;
ME2API 필요했던건데 금방 만드시네요. ㅎㅎ
감사히 잘 받아 먹겠습니다.

---

### 이승훈
*http://intsix.com*
*2007-04-07T12:51:46.000Z*

컴퓨터 좌측 벽면에 있는 두루마리 휴지의 용도는?
인상적이군요... ㅋㅋ

---

### rath
*http://xrath.com/*
*2007-04-07T12:54:34.000Z*

진석, ㅎㅎ 잘들어보시면 '낙장불입' 보이스도 들으실 수 있답니다 (H)

---

### rath
*http://xrath.com/*
*2007-04-07T13:00:02.000Z*

dise, 

페이지 우측 상단 '메뉴' 옆의 '내 페이지' 링크를 눌러서 권한설정 메뉴에 들어가신 다음 '공유자로' 초대를 하면 되요. 

초대 받았을 때는 우측최상단에 '초대' 라는 메뉴가 들어오는데 그곳 눌러서 초대내역을 보고, '수락' 눌러주면 되요~

---

### rath
*http://xrath.com/*
*2007-04-07T13:01:17.000Z*

steelheart, 같은 폰이군요 흐. 재미나게 쓰시길 바래요 ^.^

---

### rath
*http://xrath.com/*
*2007-04-07T13:01:29.000Z*

이승훈, 악플러 이모님 오랜만입니다 -_-

---

### dise
*http://dise.myid.net/*
*2007-04-07T15:05:56.000Z*

네 초대 받기 위한 그 무언가를  모르겠어요 '';;
해당 주인노트에 들어가보니 공유받기 위한 방법은 안나와있공;;

---

### 기나
*http://essaysucks.egloos.com*
*2007-04-07T15:29:56.000Z*

와~신기해요+ㅅ+ 핸드폰으로도 미투할수있으면 정말 24시간 포스팅 가능하겠어요-ㅂ- ㅋㅋ

---

### Neos
*2007-04-07T15:40:08.000Z*

와우.. 신기한데요..
그런데, 저 동영상은 어디에 올리신건지.. 저것도 신기하네요...
참.. 제가 메일을 하나 드렸는데.....
확인 좀 부탁드릴게욥.. 감사합니다 ^^;;

---

### rath
*http://xrath.com/*
*2007-04-07T16:01:45.000Z*

기나님, 이제부터 지하철에서 열심히 미투질 할 생각입니다. ㅎㅎㅎ -ㅁ-

---

### rath
*http://xrath.com/*
*2007-04-07T16:04:06.000Z*

Neos님, 메일 보내드렸습니다 ;)

dise님, 아하! 주인이 주도적으로 공유를 해줘야만 해요 -ㅁ- 스프링노트 팀에 건의해보세요 이희희

---

### Neos
*2007-04-07T16:09:11.000Z*

기대를 져버리지 않는 rath님.. 역시 아직 안주무셨군요.. 
주신말씀 명심하겠습니다 ^^;

---

### S2day
*http://s2day.com*
*2007-04-08T00:49:18.000Z*

오오... 잘되는군요=_=... 혹시 핸드폰 기종에 따라 방법이 다 틀려지는건 아닐런지... 궁금함둥;;;

---

### rath
*http://xrath.com/*
*2007-04-08T00:53:38.000Z*

SMS 문자내용에만 의존하는거라.. 기종 따라 방법이 틀려지는건 아니에요.
아직도 선착순 4명이 채워지지 않아서 '하아아악' 하고 있는데
S2day님도 한 번 써보심이.. =ㅁ=

---

### 동그리
*http://me2day.net/donguri*
*2007-04-08T01:35:22.000Z*

메일 주소를 도저히 모르겠어요...ㅠ_-

---

### rath
*http://xrath.com/*
*2007-04-08T02:33:53.000Z*

그러고보니 온라인 쇼핑몰에서 쓰이는 가상계좌처럼 가상 이메일주소 같은 것 있으면 정말 편하겠다는 생각이 드네요.

이렇게 아이디어를 말해버렸으니 누군가 만들어주지 않을까...요.. (7)

---

### nova
*http://trivial.tistory.com/*
*2007-04-08T06:10:05.000Z*

'temporary email'로 검색하니까 몇 개 뜨네요. 가끔 이용해야 겠습니다. ㅎㅎ
제일 쓸만한 것은 http://www.mytrashmail.com/ 여기인 것 같군요.

---

### JJUNGs
*2007-04-09T19:30:25.000Z*

윽! 이런... 너무 늦어서 써보지도 못했네요. ^^ 구현방법이 me2api를 이용하셨다는 말에... 갑자기 프로그래밍해보고픈 생각이~ 헤헷! 멋져요! ^^ b

---

### rath
*http://xrath.com/*
*2007-04-10T03:07:17.000Z*

즐거운 응용프로그래머 세상으로 오세요~ ㅎㅎ

---

### rath
*http://xrath.com/*
*2007-04-10T03:08:08.000Z*

nova: ㅇ.ㅇ 이제 더이상 @xrath.com James 메일섭에 무의미한 계정 안만들어도 되겠네요 흐흐 --)/

---

### nohmad
*http://nohmad.sub-port.net*
*2007-04-12T10:46:21.000Z*

저도 같은 핸드폰 쓰는데.. 아쉽네요. 써보고 싶었는데..ㅜㅜ

---

### rath
*http://xrath.com/*
*2007-04-12T17:50:54.000Z*

지금부터 '10회 이용권' 이런거 발급해볼까요 -ㅁ-

---

### heesun
*http://heesun.myid.net/*
*2007-04-18T11:12:52.000Z*

ㅠ.ㅠ...

---

### rath
*http://xrath.com/*
*2007-04-18T16:54:49.000Z*

heesun님 우는 아이에겐 산타할아버지가 선물 안주신데요 ㅠ.ㅠ

---
