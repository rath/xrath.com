---
title: "네이트온 lib 재개발 중"
date: Sat Feb 17 2007 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2007/02/네이트온-lib-재개발-중
lang: ko
tags: ["nateon", "reverse-engineering", "java-library", "authentication"]
---

TR 모사에 근무할 때 아무런 동기없이 만들었던 nateon.jar (버전을 보니 2005/05/20)
최근 [가현님](http://kfmes.com)과 JaTeOn 개발에 합류하고 요런 저런 아이디어를 구현해보느라 OpenAPI로 이것저것 하는 API를 다 만들고 머리를 식힐겸 nateonlib을 재개발 하고 있다.

원래 네이트온 인증 부분은 아주 지저분 -_-? 했다. LSIN 헤더로 인증할 때 TE3 라는 것을 쓴다.
물론 지금도 TE3로 인증이 잘 되지만 가현님의 이야기를 듣고 다시 패킷 냄새를 느껴보니 MD5가 있길래
이 요상한 TE3 인증 부분 클래스를 우선 공개하고자 한다.

[NateEncode.java](/files/NateEncode.java.html)

도대체 저게 무슨 알고리즘인지 모르겠다. 아무튼 저것을 알고 싶었기 때문에 추측성 리버스가 아닌 try error 전략을 통해 -_- 알아냈다. 
알아내는 방법은 다음과 같다. 일단 비밀번호를 abcd[a-z][1-9]로 바꿀만큼 다 바꿔서 최종 encode된 값들을 표로 만들어 뚫어지게 째려본다. 몇가지 추측을 한다. 추측이 맞는지 검사한다. 이것을 무한반복한다. -_-

어느정도 알아낸 후엔 길이에 따라 바뀌는지도 해보고.. 그렇게해서 NateEncode 클래스를 만들어내긴 했는데 거의 2년이 지나고 소스코드를 보니 아직도 도대체 저게 뭘 하려는건지 알 수가 없다.
아무튼 로그인은 된다;; MD5 알고리즘을 지원한 이후엔 MD5(p|u)로 간단해졌으니 더이상 기존 NateEncode는 필요없다. 2년전 어느 주말의 삽질이여 안녕~ ㅋㅋ

이번에 만들어보려 하는 것은 SMS MO 서비스를 흉내내기 위한 것이다. 해뜨기전에 다 만들어야지 룰루 (7)
그나저나 가현님은 명절때 네이트온을 통한 SMS 발송 클래스를 열심히 리버싱하고 계신다.
부디 성공하시길!!

보너스로 이전에 만들다 만 [nateonlib API docs](/devdoc/nateon/index.html)!

## Comments

### tourcabi.Net
*http://tourcabinet.myid.net/*
*2007-05-03T03:19:51.000Z*

nateonlib API docs!  감사합니다.

---

### rath
*http://xrath.com/*
*2007-05-03T06:48:48.000Z*

재미나게 사용하시길 바랍니다 ;)

---
