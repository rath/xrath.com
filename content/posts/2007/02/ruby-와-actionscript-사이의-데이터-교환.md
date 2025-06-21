---
title: "Ruby 와 ActionScript 사이의 데이터 교환"
date: Sat Feb 24 2007 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2007/02/ruby-와-actionscript-사이의-데이터-교환
lang: ko
tags: ["programming", "ruby", "actionscript", "data-exchange"]
---

근 2주에 한번씩 건드리고.. 시작한지 3개월이 다 되가는 Fresh Hollys 프로젝트.

이 프로젝트는 ruby 언어로 만들어진 RPGXP 쯔구르의 Player 부분을 Flash 9으로 새로 작성하는 프로젝트이다. 나는 ruby도 모르고 avm2도 잘 모르지만 -_- 새로운 공부 해보자는 차원에서 프로젝트에 합류했다.

프로젝트 리더는 꽤 오랫동안 actionscript를 만져왔던 [정웅이](http://blog.naver.com/blumetal).

이 프로젝트 시작한게 12월 초순이였는데.. 그동안 회사 그만두고, 1달간 웰빙 생활, 그리고 얼마전 새 회사 적응 버닝 등으로 계속 미루어지다가 간만에 다시 할리스 코드를 잡았다.

첫번째로 내가 맡은 부분은 Ruby의 Marshal.load를 ActionScript로 구현하는 것.
RPG 쯔꾸르에서 게임을 열심히 만들고 Export 하면 .rxdata 라는 확장자를 가진 게임데이터들이 나온다.
다행히도 이것은 [ruby marshaling](http://headius.com/rubyspec/index.php/Marshaling)을 그대로 쓴다.

꾸역꾸역 삽질해서 RPG 쯔꾸르에서 export 된 데이터들을 as3에서 읽어들이게 하는데 성공했다.
처음부터 [RubySpec marshaling 문서](http://headius.com/rubyspec/index.php/Marshaling)를 보고 했으면 압박이 덜했으련만.. 

Nil, Boolean, Fixnum, String, Symbol, Symlink, Array, Hash, Object, _dump 구현을 마치고 
기존 .rxdata 들이 잘읽어지는지 확인하는데 성공하고 배고픔의 눈물을 훔치며 -_- 포스팅 한다.

이 프로젝트는 참여자 3명 모두가 회사원이라 아주 느린 속도로 진행된다. 오픈소스다.
언젠가는 완성되겠지.. (7) 웹에서 쯔꾸르를 돌릴 수 있게 되는 그날까지 고고싱~

## Comments

### 이정웅
*http://blog.naver.com/blumetal*
*2007-02-26T04:46:50.000Z*

례아~~~~두근두근

---

### rath
*2007-02-26T06:22:29.000Z*

둥두루둥둥 PM님 화이팅~!

---

### 프리버즈
*2007-03-01T03:14:51.000Z*

안녕하세요~ 정웅이 친굽니다. 담주에 회의때 뵈요. ;)

---

### rath
*2007-03-01T22:55:31.000Z*

이제 참여자 4명이 되는건가요~ ㅎㅎ 다음주 미팅때 뵈요~

---

### rath
*http://xrath.com/*
*2008-04-19T22:31:10.000Z*

TYPE_LINK(@)도 파싱 성공~ 우왕ㅋ굳ㅋ

---
