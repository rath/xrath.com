---
title: "Quercus 한글 문제를 해결하고 WordPress로 갈아타다"
date: Sun Feb 08 2009 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2009/02/quercus-한글-문제를-해결하고-wordpress로-갈아타다
lang: ko
tags: ["programming", "php", "wordpress", "web-development"]
---

5년만에 블로그를 바꿨습니다. 그동안 extends HttpServlet 과 JSP로 수작업한 블로그로, 버그도 많고 사용성 개선도 없고 기능 빼기도 없고 추가도 없고.. 그러다가 드디어 블로그를 엎었습니다. 워드프레스로! 

 

PHP 5를 100% 자바로 구현한 [Quercus](http://quercus.caucho.com/)는 몇해전부터 여러번 찔러봤지만 legacy php 앱을 돌리기엔 많은 문제가 있었습니다. [초반의 즐거움은 잠시뿐](/2006/04/resin-3018%EC%9D%98-php-5-cleanroom-%EA%B5%AC%ED%98%84-quercus/)이였고, 최근 발견한 [metaWeblog newMediaObject 버그](/2008/11/quercus-%ec%97%90%ec%84%9c-%ec%9b%8c%eb%93%9c%ed%94%84%eb%a0%88%ec%8a%a4-metaweblognewmediaobject-%ed%98%b8%ec%b6%9c%ec%8b%9c-%eb%ac%b8%ec%a0%9c%ec%a0%90/)도 있고 2007년 초에 [mediaWiki를 설치하려다 실패](/2007/02/quercus-%eb%8b%98%ec%97%90%ea%b2%8c-%eb%82%9a%ec%9d%b4%eb%8b%a4/)한 적도 있었습니다. phpMyAdmin이나 wordpress의 경우 한글 문제 때문에 좌절하고 버려뒀었습니다. 자세히 기억은 안나지만 phpMyAdmin과 태터툴즈 같은 경우 Quercus가 mcrypto lib을 제대로 구현하지 못해서 문제가 생기기도 했었습니다. 

 

매번 Quercus를 시도할 때면 한글 문제에 부딪힙니다. <? echo ("한글". (1+2). "이야 깔깔") ?> 이런 코드는 아무런 문제가 없지만 mysql에 왔다갔다 하면 그때부터 한글이 뽀각뽀각 깨지기 시작합니다. UTF-8을 기본 인코딩으로 쓰는 저는 create database 할 때도 꼭 default charset utf8 을 붙여주는데, Quercus의 mysql_fetch_xxxx 시리즈는 latin1 만을 지원하는지 insert 는 잘해주면서 select 하면 한글이 와장창 깨지는 문제가 있는거지요. [caucho 에서 제공하는 문서](http://www.caucho.com/resin/doc/quercus.xtp)에 의하면 web.xml 의 servlet-mapping 쪽에 php-ini 엘리먼트를 만들어서 script encoding, output encoding, runtime_encoding 을 지정할 수 있다고 하는데.. 해도 잘 안되고요. -_- 그러다 누가 이기나 해보자! 하고 Quercus 소스코드를 구경하다보니 무서운 코드가 있었습니다. 

 
```java
            if (metaData.getClass().getName().equals("com.mysql.jdbc.ResultSetMetaData")) {
              // calling getString() will decode using the database encoding
              String s = rs.getString(column);

              if (s == null)
                return NullValue.NULL;
 
              // php/1464, php/144f, php/144g
              // attempt to convert to latin1 bytes,
              // conversion may fail if there was a mismatch between database
              // encoding and latin1 (implying that the database didn't encode
              // the data that went into it)
              bytes = MysqlLatin1Utility.encode(s);
            }
```
 

주석을 보니 데이터베이스 인코딩이 latin1이 아니라면 깨질거라는군요. 세상에 MysqlLatin1Utility도 있고. 그래도 친절하게 깨질거라고 주석을 달아주셨으니 몸둘바를 모르겠습니다. 소스코드가 이런줄도 모르고 계속 문서만 읽으면서 php-ini 고쳐보고 이짓저짓 했던 저를 슬프게 만들어버리는 저 주석.. 분노와 욕심 속에서 저는 코드를 아래와 같이 바꿔버렸습니다. ([caucho mantis를 보면 작년에 5월에 고쳤다고 하는데](http://bugs.caucho.com/view.php?id=2676) 뭘 어떻게 고친건지..)

 
```java
    bytes = MysqlLatin1Utility.encode(s);
    bytes = s.getBytes("UTF-8");
```
 

이렇게만 바꾸고 resin.jar를 다시 빌드하니 한글이 잘 출력됩니다. 지금 읽고 계신 이 문서도 Resin 3.2.0 (OpenSource) + Quercus + WordPress 2.7 조합으로 출력된 내용입니다. phpinfo를 보면 PHP 5.2.0 이라고 예쁘게 나옵니다. ^^

 

이제는 난이도가 낮은 작업들을 스믈스믈 처리하기 시작했습니다. 기존 데이터들을 WordPress로 import 해야할텐데요, 귀찮은 스크립트 하나 짜야될 줄 알았는데 워드프레스가 RSS 문서를 통한 import를 제공해주는 바람에 날로 먹었습니다. 댓글도 어떻게 안되나.. 생각했지만 여기선 방법이 없었고요, 그냥 노가다 스크립트 짜서 열심히 퍼다 옮겼습니다. 아쉽게도 OpenID로 댓글을 남겨주신 분들에게 오픈아이디 마크까지 마이그레이션 해드리지는 못했습니다. 아직 [WordPress OpenID 플러그인](http://wordpress.org/extend/plugins/openid/)이 Quercus에서 제대로 작동하지 않아서 어쩔 수 없었고요, 선처를 부탁드리겠습니다. (_ _)

 

마지막으로 WordPress에서 제공하는 퍼머링크들을 RESTful 하게 만들기 위해 작년에 만든 [URIMapper](/2008/07/j2ee-webxml-%EC%9D%98-servlet-mapping-uri-pattern-%EA%B3%BC-%EC%83%9D%EC%9D%B4%EB%B3%84-%EC%A0%95%EA%B7%9C%EC%8B%9D-%EC%A7%80%EC%9B%90/)로 wordpress에서 퍼머링크를 만들 때 사용하는 몇가지 규칙들을 추가해서 주소들도 예쁘게 바꾸고, 예전 제 블로그의 퍼머링크와 워드프레스용 퍼머링크를 translate 해주는 간단한 서블릿을 만드는 것으로 워드프레스로의 이사가 끝났습니다.

 

아이고 예쁘네요! 이제 수많은 워드프레스 테마들이 다 내꺼라니!!

## Comments

### 우울한딱따구리
*http://www.potatosoft.com/tt*
*2009-02-09T00:31:21.000Z*

어익후 축하드립니다. :) 들렀다가 잘못 왔나 싶어 깜짝 놀랬습니다. ㅎ

---

### 기분째즈
*2009-02-09T00:45:41.000Z*

오우 ㅊㅋㅊㅋ

---

### 오스카
*http://www.oscarplex.net*
*2009-02-09T01:38:15.000Z*

오호, 워프에 합류한 걸 ㅊㅊ~ 이 테마 요즘 많이들 쓰네요~

---

### 김성안
*http://www.pragmatic.kr*
*2009-02-09T02:17:23.000Z*

이사 축하드려요. 댓글 쓰는 곳이 목록 화면에서는 찾기 어렵네요;; 목록 화면에서는 '댓글3'이라고 되어있었는데 첫 번째 댓글인걸 보니 혹시 낚시용 스킨??^^;;

---

### 백일몽
*2009-02-09T02:22:06.000Z*

우웡... 보기 좋다. 그나저나 저 소스는 대체 무슨 생각일까? -.-

---

### rath
*http://xrath.com/*
*2009-02-09T06:05:11.000Z*



> 김성안 :
>
> 이사 축하드려요. 댓글 쓰는 곳이 목록 화면에서는 찾기 어렵네요;; 목록 화면에서는 ‘댓글3′이라고 되어있었는데 첫 번째 댓글인걸 보니 혹시 낚시용 스킨??^^;;


[@김성안](#comment-5674)
스팸 댓글/트랙백들 때문에 관리자가 승인을 해줘야 나타납니다. 딱히 의도는 없었고요 wp default 정책인가봅니다. -ㅁ-;

---

### rath
*http://xrath.com/*
*2009-02-09T06:07:38.000Z*

> 오스카 :
>
> 오호, 워프에 합류한 걸 ㅊㅊ~ 이 테마 요즘 많이들 쓰네요~

저런, identity가 떨어지는 테마였군요 --; 상용 테마를 질러야 되는걸까요.. -ㅠ-

---

### rath
*http://xrath.com/*
*2009-02-09T06:08:36.000Z*

[@백일몽](#comment-5675) 담당 개발자의 생활에서는 latin1으로 모든 것이 다 해결되나봐요 -_-.. 흑흑

---

### 기분째즈
*2009-02-10T01:20:56.000Z*

오픈소스 어쩌구 저쩌구 미투에 글 남긴건 이것때문인가보네. 소스까지 볼 생각을 하다니. ㅎㅎ

---

### 우울한딱따구리
*http://www.potatosoft.com/tt*
*2009-02-10T04:52:06.000Z*

-_-;; 맥의 사파리에서는 댓글을 펼쳐도 보이질 않는군요 ㅎㄷㄷ

---

### S2day
*http://s2news.net*
*2009-02-11T00:40:44.000Z*

오!!! 워드프레스 이전 축하드립니다.
저도 워드프레스라는~~ ^^

---

### 헤즈론
*http://cube9.net*
*2009-02-11T12:50:48.000Z*

워프로 온 걸 환영하오~ ㅎㅎ~
워프 옮기면서 구해놓은 것들.. 물론 무료...
쓸만한 것들 많으니... 꼭 한번 살펴보길.. ㅎㅎ~

http://delicious.com/eva1998/theme

---
