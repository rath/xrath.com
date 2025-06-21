---
title: "iBATIS 접견"
date: Fri Jun 27 2008 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2008/06/ibatis-접견
lang: ko
tags: ["ibatis", "apache-wicket", "java-web", "orm"]
---

나는 언제까지 원시인 코딩을 계속 할 것인가.

나는 왜 아직도 extends HttpServlet 을 하여 웹프로그램을 만드는가.
나는 왜 아직도 vim 과 editplus 뿐인가.

[spring](http://www.springframework.org), [hibernate](http://www.hibernate.org/) <- 이 두녀석은 요상하게 정이 안가서, 계속 쌩까고 있는 중이다. 
내 입맛에 맞는 적절한 entry point 가 있어야 된다. 그게 아니면 그냥 '저거 뭐하러 써? 저거 없이도 다 되잖아..' 하며 회피하기 일쑤.

그러다 [Apache Wicket](http://wicket.apache.org/) 에 관심이 가서 요리조리 [공부중](/2008/06/apache-wicket-을-배워봅시다-hello-world-편)이다. 
일단 이녀석은 내 마음에 든다!!!

난 GUI 프로그래밍 출신이 아니였던가. jdk 1.1로 MSJVM에서 awt 가지고 했던 수많은 삽질들.. 
어린 시절, 지금은 꾸리꾸리하기만한 Swing Metal LNF가 어찌나 맘에 들었는지.. applet 에서 swing을 쓸 수 있는 날이 오기만을 기다린 시절도 있었다. 

swing 삽질은 [JMSN](http://jmsn.sourceforge.net/) 개발할 때 삽질 정도가 하늘을 찔렀고, 어느덧 swing 코딩은 내게 뇌없이 GUI를 만들 수 있게 해주는 그런 친숙한 녀석이 되었다. 마침 swing을 중급이상으로 다루는 사람이 거의 없는 대한민국에서는 노력대비 고수익 :$ 프리랜서 프로젝트 거리가 많이도 들어왔었다. 

그런데!!! Wicket 코드를 보면 swing 스타일이다 :$ 이게 무슨 얘긴고하니, 첫인상이 좋다는 이야기다. 
wicket 문서들을 계속 읽다보니 어느덧 이 웹프레임워크에 매력을 느끼게 되었고, 둘러둘러 보다보니.. wicket 에는 db 코딩 쉽게 해주는? 그런 녀석이 없었다. 그래 기왕 딴놈들이 만든 프레임웍 쓸꺼면 풀세트로 써야하지 않겠나. 

[Wicket 에서 Spring을 통해 iBATIS를 사용하는 방법](http://cwiki.apache.org/WICKET/ibatis.html)을 보다가.. 정말 뜬금없이 iBATIS에 꽂힌 것이다. Hibernate을 선택하지 않은 이유는 iBATIS는 ORM이 아니라서.. 더하기 iBATIS는 code generator인 [Abator](http://ibatis.apache.org/docs/tools/abator/)(지금은 iBATOR로 이름이 바뀌었다)를 제공해줘서 그랬다. 

그런 연유로 -_- [iBATIS](http://ibatis.apache.org/)를 공부하게됐다. 

iBATIS 사이트의 60페이지짜리 [pdf](http://svn.apache.org/repos/asf/ibatis/trunk/java/docs/en/) 문서와 [iBATIS in action](http://www.google.co.kr/url?sa=t&ct=res&cd=1&url=http%3A%2F%2Fwww.amazon.com%2FWicket-Action-Martijn-Dashorst%2Fdp%2F1932394982&ei=3oNkSOiEJoyI6gPRtqy_DQ&usg=AFQjCNGeDnZJ5fHqV0yuK5YcJE9GFfcdCA&sig2=JkSKIj2xbg3i53C6F6hzoQ)을 읽은 후, iBATIS 훈련을 위해 적용해볼만한 서비스를 고려해보다가. [귓속말](http://whisper.playmaru.net/)이 당첨됐다. 

그리하여- 

귓속말에 iBATIS를 적용했다. 기존 날코딩 되어있던 SQL을 SqlMap.xml 파일에 빼는 것도 일이지만, #melong:VARCHAR# 같은 거 익히고 include refid로 sql들 잘근잘근 쪼개놓기도 하고 # 열고 # 안닫았다가 NoSuchElementException 나서 완전 당황하기도 하고 -_-; 자꾸 <select> 에서 resultClass 빼먹어서 삽질하질 않나 -.-;; 

여튼 80여개의 쿼리가 50여개로 줄었으며, java 소스코드는 정말 화악- 줄어들었다. 
이정도의 효과를 보여주면서.. 이렇게 배우기 쉽고 적용하기도 편한 framework 이 있을까 +_+

마지막으로 귓속말에 iBATIS를 적용하기 시작한 지난 새벽 2시부터 마이그레이션 및 테스트를 마친 오후 2시까지 사투의 흔적 -_-

![OpenID-Whisper Error mails](/img/whisper-error-mails.jpg)

Wicket 공부 및 귓속말에 적용하기가 끝나면 그 다음엔 Hibernate과 함께 ORM 고고싱~

## Comments

### 정원희
*2008-06-27T06:57:41.000Z*

iBATIS 의 세계에 오신걸 환영해요( 좀 늦으셨네요? ㅋ )

---

### rath
*http://xrath.com/*
*2008-06-27T06:58:37.000Z*

감사합니다. 지각은 저의 힘입니다.

---

### songsungkyun
*http://songsungkyun.cafe24.com/*
*2008-06-27T09:02:18.000Z*

저두 swing 많이 좋아라 한답니다.
업무유틸은 모두 swing swing swing
저두 며칠전에 ibatis책을 구입했습니다.
third patry sql map을 현재 쓰고 있는데
업무유틸엔 ibatis가 제젹일것 같아서요.
wicket이라는 애도 한번 얼굴 보고 싶네요.

---

### rath
*http://xrath.com/*
*2008-06-27T09:08:05.000Z*

songsungkyun// swing을 즐겨쓰신다면 wicket 정말 맘에 드실겁니다. 추천해드립니다.

---

### kfmes
*2008-07-02T12:35:45.000Z*

JMSN swing 코드를 보면서 감탄을 했었어요..
역시 rath옹은 초고수 !

---
