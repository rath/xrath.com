---
title: "뇌단련 DS 플레이 영상"
date: Sat Dec 09 2006 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2006/12/뇌단련-ds-플레이-영상
lang: ko
tags: ["gaming", "nintendo-ds", "brain-training", "flash-development"]
---

닌텐도 DS용 게임인 Brain Age - Train your brain in minutes a day!를  
9월말부터 시작하여 2개월 이상 매일매일 하고 있습니다.

기말고사 실시간 시험이 끝난 기념으로.. Daily training 플레이 영상을 찍었습니다.ㅎㅎ  
FLV 인코더로 살짝 인코딩 한 다음 Flex 2 SDK에서 mxml로

```
<mx:VideoDisplay id="video" width="400" height="300" source="http://desk.xrath.com/files/brainage.flv" autoPlay="false"/>
```

로 간단히 동영상 플레이어를 제작!

@movie:image=http://xrath.com/img/brain_age.jpg,movie=http://desk.xrath.com/files/brainage.flv,width=400,height=300@

자자 DS와 뇌단련을 구입하세요~*

## Comments

### 영빨짱
*http://moses.maru.net*
*2006-12-09T13:48:37.000Z*

오~ 그 게임이다~ ^^

---

### rath
*2006-12-10T02:02:43.000Z*

흐흐 그 게임 그 게임! 
기말고사 준비하느라 지난주에 연락 못드렸네요
윤형, 조만간 연락드립니다~

---

### 스카리
*http://scari.net*
*2006-12-10T16:41:24.000Z*

-0-....

---

### 먀
*2006-12-11T01:04:08.000Z*

firefox에서는 안돌아가는군요

---

### rath
*2006-12-11T01:20:38.000Z*

Firefox에서도 잘 돌아감이 확인되었습니다. 자료화면 http://xrath.com/img/firefox_xrath.png

---

### rath
*2006-12-11T01:22:38.000Z*

원인을 추측해보자면.. Flash player 버전밖에 없겠네요. Flex 2 sdk로 만들었으니 Flash 9 이상이 반드시 설치되어있어야 합니다.
<object>태그에 #version=9,0,28,0 을 박아뒀으니 갱신되야하는게 맞는것도 같은데.. (7)

---

### 거친마루
*http://maroo.info*
*2006-12-11T10:43:41.000Z*

버전 박아뒀다고 되는거 아니에요 흐흐
expressInstall 되도록 몇가지 장치를 해놓아야...

---

### rath
*2006-12-11T12:56:04.000Z*

엇 그런게 있었군요 @.@ IE는 버전받으면 인증창이 새로 뜨길래 그러려나했는데 firefox가 다른건지.. 아니면 IE도 사실 expressInstall로 써야하는건지.. 조만간 채널에서 이야기나눠보아요~ ㅎㅎ

---

### jong10
*http://www.jong10.com/*
*2007-04-14T05:23:33.000Z*

뇌단련.. 굉장히 빠르시군요!! 저도 딱 한번 해봤는데 어렵던데요..

---

### rath
*http://xrath.com/*
*2007-04-15T07:33:40.000Z*

딴 한번 해보셔서 그럴실꺼에요. 여러번 해보면 금방 빨라지거든요 ㅎㅎ

---
