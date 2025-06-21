---
title: "OpenID와 AJAX 연계 삽질후기"
date: Mon Mar 12 2007 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2007/03/openid와-ajax-연계-삽질후기
lang: ko
tags: ["technology", "openid", "ajax"]
---

삽질록이니 경어를 자제하겠습니다.

코멘트 달 때, 인증하러 다녀와서 기존 페이지(Consumer)의 상태를 fully 유지하기 위해 어떻게 하면 좋을까 생각해보다가 Ajax로 어떻게 해보면 좋겠네! 해서 삽질을 시작했다.

등록 버튼을 눌렀을 때, 팝업 페이지가 떠서 인증을 한다? Firefox 같은 경우 탭으로 붙을테니 -_-
Ajax으로 어떻게든 붙여본다? 
client.readyState=4, client.status=302 일 때, location 헤더 들고와서.. 그 다음 어쩔껀데;; 

window.open(client.getResponseHeader('location')) 한다? 
그럼 그냥 form target을 _blank로 하는거랑 별 다를 바가 없다 --;
어차피 창으로 이쁘게 띄우려면 provider 인증페이지가 적절한 크기여야 하는데, 그것도 애매하고..

그래.. 받은 Location 헤더를 XMLHttpRequest로 다시 요청한 다음 <form> 태그를 분석해서
consumer쪽 페이지에서 비밀번호 입력받게 한 다음 분석한 <form> 태그의 action으로 요청?
그럼 [피싱 문제](http://www.openid.or.kr/13)가 더 심각해지는거잖아 -_-;; 

그래! 이 생각은 어리석었어!

결론은 메뉴부분에 OpenID 로긴창 붙이는 것이란 말인가 ㄷㄷㄷ
OpenID 브라우저 익스텐션 있었으면 좋겠다. 익스텐션 만드는 놈이 가로채면 어쩌나?

표준을 만드는 사람들의 노고와 피와 땀이 느껴진다.

## Comments

### 동윤
*http://nainu.myid.net/*
*2007-03-13T00:54:06.000Z*

공감..
나중에 openid 스펙도 산으로 가지는 않을런지 조금은 걱정이 됩니다~

---

### rath
*http://xrath.com/*
*2007-03-13T01:08:51.000Z*

그러게요. 조그마하고 재미난 일들은 산으로 보내는 것이 즐겁기도 하지만, OpenID는 안그랬으면 좋겠어요 ㅎㅎ

---

### pistos
*2007-03-13T05:54:09.000Z*

로그인 부분만 iframe 파서.. iframe안에서 뽁짝거리게 만들면 안되려나 ;;

---

### rath
*http://xrath.com/*
*2007-03-13T05:57:08.000Z*

OpenID 피싱 문제를 벗어날 수 없어서 그래요
iframe으로 파면 사용자 입장에서 주소창을 볼 수도 없으니 더욱 위험하지요
iframe으로 할 수 있으면 ajax에서도 다 할 수 있으니.. ㅎㅎ

그나저나 형 오랜만이에요 -ㅅ-

---

### rath
*http://xrath.com/*
*2007-03-13T05:57:55.000Z*

아무래도 피싱은 제쳐두고.. 그냥 미리 로그인해놓고 쓰세요 모드를 써야겠어요 _-_

---

### pistos
*2007-03-13T09:39:56.000Z*

나도 openID 하나 만들어볼까 :)

---

### rath
*http://xrath.com/*
*2007-03-13T09:41:51.000Z*

ㅎㅎ rath.naver.com 이런 OpenID 가지고 싶어용 -ㅇ-

---
