---
title: "Tomcat 안녕"
date: 2005-02-03
slug: 2005/02/tomcat-안녕
lang: ko
---

Resin 3.0.10 으로 바꿨다. 
아아 역시 난 resin 매니아. Tomcat 은 즐!

내가 Resin 을 좋아하는 이유

1. 남들이 잘 안쓴다.
2. WAS 땜에 개발자를 삽질하게 만들지 않는다. (한글처리 매우 유연하다)
3. 기본 설정 파일은 매우 단순하지만, 확장성이 졸라 좋다.
4. cluster 잘된다. 
5. session 서버를 뗄 수 있고, WAS 내려앉을때 세션 보관도 댄다 -ㅅ-)=b
6. Request 처리가 빠르다더라.
7. Apache 랑 붙일 때 초보자도 쉽게 할 수 있고, module 파일도 경량에다 확실히 빠르다.
8. JSP 파일이 변경되면 자동 컴파일도 가능하다 -ㅛ-)=b
9. 호스트별로 charset 맘대로 조정 가능 -_-)=b
10. extension 별로 cache 시간도 줄 수 있고
11. openssl 도 한방에 붙는다 _-_)=b
12. GPL 이네 -ㅠ-

아쉬운게 있다면 jdk 1.5 + jikes 1.22 with encoding 에서 jsp 컴파일이 잘 안댄다. 징..

간만에 resin 2.x 대에서 3.x 로 옮겨왔더니 설정파일은 많이 바뀌었지만,
역시 난 resin 매니아라서, 설정파일이 제공하는 속성 목록만 봐도 눈에 확 들어온다 -ㅅ-

(그런데 아직도 블로그만 php 기반인 soojung 이다 ㅡㅡ)

## Comments

### ddt
*http://nosurprises.org/blog*
*2005-02-03T23:34:16.000Z*

joojung 만들면 참여해주세요~ (soojung java version 크크)

---

### frieel
*http://q3s.my.lv*
*2005-02-04T07:04:36.000Z*

꺄꺄  'ㅁ';;  

마지막 줄 멘트 압권이었어요;;

---

### rath
*http://xrath.com*
*2005-02-04T07:38:04.000Z*

오 ddt님 좋은 아이디어네요 :$

---

### 이창근
*2009-10-12T07:02:11.000Z*

안녕하세요. 레진 관련해서 검색하다가 블로그를 방문하게 되었습니다.
레진에 대해서 한가지 궁금한게 있어서요.
레진으로 웹프로젝트 개발시 java파일을 컴파일 하면 세션을 자꾸 잃는데.
혹시 톰켓처럼 java파일을 수정하고 컴파일을 해도 레진을 재기동하지 않아도
적용되고, 세션을 잃지 않는 방법을 알고계신가 해서요~
혹시 알고계신다면 이메일로 답변 좀 부탁드립니다^^
수고하세요~!

---

### Jang-Ho Hwang
*http://xrath.com/*
*2009-10-12T13:59:23.000Z*

[@이창근 ](#comment-3268) 
session-persistence로 검색해보시면 많은 자료가 나옵니다. 
http://www.caucho.com/resin-3.0/config/sessions.xtp 문서를 참조하시면 도움이 될 듯 합니다. ^^

---

