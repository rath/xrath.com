---
title: "Adobe AIR 컴포넌트 mx:HTML은 요청을 어떻게 보내나"
date: 2008-09-17
slug: 2008/09/adobe-air-컴포넌트-mxhtml은-요청을-어떻게-보내나
lang: ko
---

며칠전 [오픈아이디 귓속말](http://whisper.playmaru.net/) [OAuth](http://en.wikipedia.org/wiki/OAuth)에 대한 문의가 들어왔다. 

다름이 아니라 OAuth 인증이 실패한다는 것.
원인을 분석해보니 오픈아이디 귓속말의 OAuth 구현의 문제여서 다른 일 다 제쳐두고 이를 열심히 뜯어고치고 있다.
문제는 [OAuth Core 문서의 Section 5.2](http://www.lemonpen.com/goto/196603)를 완벽히 구현하지 않아  생긴거였다. 테스트해본 OAuth consumer lib은 ruby와 java 밖에 없었는데, 이번에 들어온 지원요청은 [Actionscript 3으로 구현된 OAuth 구현체(as3oauth)](http://code.google.com/p/as3oauth/)였는데, as3oauth는 oauth 인증 데이터를 Authorization 헤더에 실어 나르는 게 아니라 QueryString에 담기 때문이였다. 

Section 5.4.1의 Authorization 헤더로만 인증을 수행하고, QueryString이나 POST로 도착한 oauth 인증 데이터들은 쌩깠다는 것.
귓속말 OAuth 인증을 한큐에 통과하지 못하고 애쓰신 많은 개발자분들에게 미안한 마음 감출 길이 없다. -_-;; 지금 귓속말의 OAuth protected resource 접근은 GET querystring과 Authorization 헤더를 둘 다 지원한다. 안타깝게도 POST 데이터로 넘기는 것은 아직 처리하지 못한다.

자 그럼 AIR 1.1에 포함된 WebKit 이 mx:HTML라는 가면을 쓰고 보내는 HTTP Header는 어떻게 생겼는지 구경해보자.

**Referer** - 리퍼러 스킴은 http가 아닌 app로 온다. swf 명이 test.swf 일 경우 app:/test.swf 형태를 가진다. 뭔가 맘에 안든다. app 란 스킴을 AIR가 독점한 기분이랄까?
**Accept** - video/mp4;q=0.9 와 audio/mp4 가 있는 것이 매력적이다 :$. 물론 flv는 당연히 포함이다.
**x-flash-version** - 플래시 플레이어 버전을 보내준다. 최근 공식 릴리즈인 9,0,124,0 이 도착했다.
**User-Agent** - 보통 이것을 궁금해하지 않을까 싶다. Mozilla/5.0 (Windows; U; ko-KR) AppleWebKit/523+ (KHTML, like Gecko) AdobeAIR/1.1 가 왔다. AppleWebKit ~_~

덕분에 pc에 AIR SDK도 깔고.. 오랜만에 actionscript 구경하게 됐다. 왠지 어색하지 않다. 자바 개발자들이 어렵지 않게 넘어갈 수 있는 플랫폼이리라.

## Comments

### 머드초보
*http://mudchobo.tomeii.com/tt/*
*2008-09-17T08:13:04.000Z*

헉-_-; 저때문에.....ㅠㅠ
AIR에서는 뭔가 틀리게 날리는군요 ㅠ
아...어렵네요. AIR에는 WebKit엔진이 있다고 하더군요.

저는 J2SE6한글문서를 통해서 이블로그를 알게 되었는데,
귓속말 개발자일거라는 생각은 전혀 못했네요 ^^
감사해 쓰고 있습니다 ^^ 기부도좀하고 그래야하는데-_-;

---

### 머드초보
*http://mudchobo.tomeii.com/tt/*
*2008-09-17T08:31:21.000Z*

아 해결했어요~ 된다된다~
이거 제가 프로그램을 잘못 짜서 ^^
귓속말은 뒤에 open_id를 붙여서 오더라구요 ^^
감사합니다 ^^

---

### rath
*http://xrath.com/*
*2008-09-17T14:01:54.000Z*

해결되었다니 속이 시원해지네요. 머드초보님 덕분에 actionscript 경험치 몇 점 얻었습니다. API 요청 많이 넣어주세요. 지원해드리겠습니다. ^^

---

### lovedev
*http://lovedev.tistory.com*
*2008-09-18T11:23:54.000Z*

저는 Referer때문에 고민이네요.. 구글맵은 플래시 API를 제공한 이후로는 
레퍼러 보면 튕겨버리더군요..

---

### rath
*http://xrath.com/*
*2008-09-19T06:15:22.000Z*

AIR의 app:/ 레퍼러를 받아주지 않는건가요? 흐음..

---

