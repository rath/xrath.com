---
title: "홈피 개편 - Ajax & etc"
date: 2006-12-31
slug: 2007/01/홈피-개편-ajax-etc
lang: ko
---

내 홈피에 [Ajax](http://en.wikipedia.org/wiki/Ajax_%28programming%29)를 적용해봤다. 요리조리 공부하다보니 [REST](http://en.wikipedia.org/wiki/REST) 란 것도 둘러보게 됐고 
홈피에 널부러져있는 javascript, jsp 보며 이것저것 고칠 거 고쳐봤다.

Ajax를 적용한 부분은 '코멘트 관련' 부분이다. 

코멘트 한 번 쓰고, 페이지 다시 다 읽는 것 의미가 없으니 코멘트 등록 부분을 Ajax로 바꿨다.
페이지를 다시 읽지 않으니 코멘트 목록들도 다시 갱신하기 위해 특정 entry 에 포함된 코멘트 읽기 부분도 Ajax로 바꿨다. 그러고나니 관리자 전용 코멘트 삭제 기능도 해야할 것 같아서 그것도 바꿨다.
이제 좌측 메뉴 Recent Comments도 함께 바뀌어야 할 것 같아 그것도 바꿨다 -_-

하나 둘씩 적용하다보니 자연스럽게 페이지를 좌악 좌악 찢게 되는데 Ajax 적용하면서 웹페이지 모듈화가 잘되어 것도 기분이 좋다.

내 사이트 내 범용 [ajax.js](/files/ajax.js.html)도 만들었다. [뭉고군](http://munggo.tistory.com)이 추천해준 Prototype과 비슷하게 해봤다. 
가장 인상적이였던 함수명 $ ! 이것만을 따라하기로 했다. 너무 맘에 든다. 함수 프리픽스로의 $...
[ajax.js](/files/ajax.js.html)로 만든 스크립트 [comments.js](/files/comments.js.html)를 보면 어떤건지 감이 올꺼다.

만들고나니 -_- 글 목록 보는 페이지에서도 코멘트를 보여주기가 쉬울 것 같아 도전해봤는데 아래의 스크립트와 2개의 div 태그로 날로 먹을 수 있었다.

![](/img/bloglist_ajax.png)

Ajax는 더 좋고 편한거구나.. 몰랐네 -_-;;

[뭉고군](http://munggo.tistory.com)말 듣고 Prototype 공부해서 쓰고 그럴껄 괜히 $ 만 좋아가꼬;
이거 하면서 자바스크립트 감 잡아서 동영상 플레이어도 좀 더 깔끔하게 스크립트 바꾸고 코멘트 작성자 이름에 홈페이지 링크 걸기도 만들었다.

아 재밌는 웹 세상. 웹을 직업으로만 안하면 정말 재밌는거 같다.
