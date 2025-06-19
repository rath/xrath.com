---
title: "미투데이에 글 쓰고 Facebook으로 보내기"
date: 2008-11-04
slug: 2008/11/미투데이에-글-쓰고-facebook으로-보내기
lang: ko
---

[me2day api](http://codian.springnote.com/pages/89009)를 사용해 [facebook 어플리케이션](http://www.facebook.com/apps/application.php?id=21311568362)을 만들어봤습니다.

[미투데이](http://me2day.net/)에 [2fb 태그](http://me2day.net/tag/2fb)를 달아 글을 쓰면 Facebook 내 상태를 갱신해주는 facebook app입니다. 

 

아래처럼 me2sms로 글을 쓰면

![me2facebook-usage-me2day.jpg](http://rath.springnote.com/pages/2045964/attachments/921946)

 

이렇게 Facebook 상태가 바뀝니다.

![me2facebook-usage-facebook.jpg](http://rath.springnote.com/pages/2045964/attachments/921948)

 

 

 

만들게 된 동기는 3가지 입니다.

Facebook API를 써보고 싶다.
휴대폰으로 Facebook 상태 메시지를 바꾸고 싶다.
폰카로 찍은 사진을 Facebook 사진첩에 올리고 싶다.

프로그램 사용법은 간단합니다. 먼저 자신의 미투데이 아이디를 적고

![me2facebook-enter-me2day.png](http://rath.springnote.com/pages/2045964/attachments/921934)

 

확인을 눌러 미투데이에 쓴 글이 Facebook 상태 메시지로 연동되는 것을 확인합니다.

여기서 꼭 화면 하단의 '일단, me2day가 상태 변경하는 것을 허락해주세요.' 를 눌러 '상태 업데이트 허용'을 해주셔야 합니다.

 

![me2facebook-approval.png](http://rath.springnote.com/pages/2045964/attachments/921936)

 

이제 다 됐습니다. **연동할래요!** 버튼을 누르면 끝납니다. 

 

![me2facebook-complete.png](http://rath.springnote.com/pages/2045964/attachments/921938)

 

며칠전에 미투데이 내에서 오픈했을 때 연동을 했고 2fb 태그를 달아 포스팅했음에도 불구하고 Facebook 상태 메시지가 변하지 않는 문제가 있었는데, [Infinite session을 잘못처리](http://www.henrycipolla.com/blog/2008/02/how-to-create-infinite-sessions-with-the-facebook-platform-api/)해서 생긴 문제였습니다. 지금은 수정되었으니 안심하고 사용하세요 :$

 

## FAQ

me2photo를 올렸는데 상태 메시지가 변하지 않아요.

Facebook 사진첩 me2day Photos 란 앨범 속에 들어가있을 것입니다. 여기서 올린 사진들을 허용하면 자신의 미니피드에 업로드한 사진이 노출됩니다. Facebook 내에서 Flickr 사진이 노출되는 것에 비해 Facebook 사진첩의 사진의 노출이 훨씬 큰 것을 고려하면 불편하더라도 기능을 넣는 것이 좋다고 생각하여 넣었습니다. 매번 허용해주셔야 합니다. -.-;

다른 기능은 없나요?

[이 페이지](http://www.facebook.com/home.php?ref=logo#/apps/application.php?id=21311568362)의 리뷰 게시판이나 토론 게시판에 의견을 남겨주세요. 담벼락에 장난 글을 쓰셔도 좋습니다. :-)

Facebook 어플리케이션 이름이 me2day 던데.. 미투데이에서 만든건가요?

아니요. 개인적으로 만든 것입니다. 딱히 쓸만한 이름이 없어서 me2facebook 을 쓰려니 이름에 'face'가 들어갈 수 없다고 해서 me2day로 했습니다. 좋은 이름을 정해주시면 바꾸도록 하겠습니다.

 

프로도님 같은 경우 [미투데이에 2fb로 글을 썼](http://me2day.net/skyizblue/2008/10/31#18:00:00)는데.. 페이스북에 댓글이 더 많이 달리는 케이스도 보여주셨습니다. ㅎㅎ

 

이 글은 [스프링노트](http://rath.springnote.com/pages/2045964)에서 작성되었습니다.