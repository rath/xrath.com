---
title: "스프링노트 MSN 봄공책 봇 이용자 수"
date: Sat Apr 07 2007 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2007/04/스프링노트-msn-봄공책-봇-이용자-수
lang: ko
tags: ["springnote", "msn-bot", "technology"]
---

스프링노트 MSN 봄공책 봇의 이용자 수 입니다.
봇 한 마리당 500명의 이용자를 Allow list에 유지할 것이기 때문에, 500이란 숫자는 제게 대단히 sensitive 합니다.


```
mysql> select count(distinct(openid)) from springnote_user;
+-------------------------+
| count(distinct(openid)) |
+-------------------------+
| 469                     |
+-------------------------+
1 row in set (0.00 sec)
```


전체 카운트에서 distinct 를 빼면 477. 그렇다면 8명은 MSN 계정 여러개라는 말 -_-;
500명 될 때까지는 [미투데이](http://me2day.net) 매셥질 하다가 500명 끊는 순간부터 UI 개선 및 멀티 계정 지원 들어갑니다. 
(내 타자봇은 8개월이 지나도 410명인데.. OTL)

그럼 잠시 [스프링노트](http://www.springnote.com/ko/) 광고 나갑니다. (H)

![](/img/ad_springnote.jpg)

그거 아시죠? **조지 포먼에게는 철칙이 하나 있었다. 바로 '마음에 들지 않으면 추천하지 않는다' 였다.** 
저도 그렇습니다. 보장할 수 있는 것은 '제 마음에 든다는 것'입니다. 스프링노트 강력히 추천합니다~

## Comments

### 주마군
*http://jumagun.myid.net/*
*2007-04-09T16:52:06.000Z*

저 타자봇 줌 알려줘요

---

### rath
*http://xrath.com/*
*2007-04-10T03:08:52.000Z*

오시면 연락주세요. 1:1 강습 들어가지 말입니다.

---

### KOEI
*http://koei.fiaa.net*
*2007-04-11T15:48:37.000Z*

추천해주신 책이 생각나는군연

---

### rath
*http://xrath.com/*
*2007-04-12T00:12:09.000Z*

요새 다른 것들 하다보니 코에이님이 추천해주신 책들 아직도 다 못읽었네요
저도 이제 다시 여유를 찾아야 겠어요.. ㅎㅎ

---
