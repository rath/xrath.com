---
title: "Google Calendar의 SMS 알림에는 뭔가 특별한 것이 있다."
date: Fri Aug 08 2008 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2008/08/google-calendar의-sms-알림에는-뭔가-특별한-것이-있다
lang: ko
tags: ["google-calendar", "sms-notification", "pims", "api"]
---

이제 [구글 캘린더 일정 알림에 sms가 추가](http://googlekoreablog.blogspot.com/2008/08/google.html)됐습니다.

제가 PIMS에 대단히 집착을 가지고 있긴 하지만 불규칙한 수면 습관 덕에 TODO 관리만 하고 Schedule 관리는 잘 안하는 편입니다. 그래서 왠만한 캘린더 서비스가 나와도 크게 동요하지 않는 편인데.. 구글 캘린더의 SMS 지원에는 뭔가 색다른 것이 있습니다.

SMS 지원이 대단한 것이냐고요? 아닙니다. 국내 서비스인 [라이프팟](http://www.lifepod.co.kr/)은 무료로 SMS 알림을 해줄뿐만 아니라 SMS MO로 일정을 등록할 수도 있습니다. 그렇다면 구글 캘린더의 SMS 알림이 도대체 뭐가 그리 특별한 걸까요.

짜잔 :$

![](/img/google_calendar_sms_1.jpg)

![](/img/google_calendar_sms_2.jpg)

세상에! 80바이트가 넘으면 쪼개서 보내주는 **센스**라니! (게다가 지금은 sms 발송이 무료던데!!)

지속적인 사용률을 보인 PIMS라고는 [Remember The Milk](http://rememberthemilk.com) 밖에 없었는데 여기에 Google Calendar가 추가되겠습니다-

두 서비스의 공통점이라면, 둘 다 [미투데이처럼](http://http://codian.springnote.com/pages/89009) rich 한 API를 제공([Remember The Milk API](http://www.rememberthemilk.com/services/api/), [Google Calendar API](http://code.google.com/apis/calendar/))하면서 PIMS 라는 겁니다.

Remember The Milk는 세계 각국의 SMS를 지원하지만 안타깝게도 한국은 어느 이통사도 지원하지 않아 저로 하여금 [rtmlib](http://code.google.com/p/rtmlib/)을 만들어 국내 SMS 호스팅업체와 연동하게 만들었는데 -_- 이제 편법을 이용해서 RTM의 마감알림을 Google Calendar SMS를 통해 받을 수 있게 되었어요 :$

## Comments

### ucandoit
*http://guseongwoo.com*
*2008-08-08T20:28:46.000Z*

저도 포스팅 했습니다. ~_ ~

---

### rath
*http://xrath.com/*
*2008-08-09T15:52:45.000Z*

예 ^^ ucandoit님, 미투 바깥에서 만나니 더 반갑네요 ㅎㅎ

---

### 프버즈
*http://fribirdz.net/*
*2008-08-13T07:26:43.000Z*

- 이 글을 본 소타군은 SMS 알림을 80바이트로 쪼개기 시작합니다. -

---
