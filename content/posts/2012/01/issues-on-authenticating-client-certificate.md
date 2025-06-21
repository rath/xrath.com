---
title: "로그인"
date: Fri Jan 27 2012 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2012/01/issues-on-authenticating-client-certificate
lang: ko
tags: ["web-development", "authentication", "web-security"]
---

혼자 또는 측근들과 사용할 웹서비스를 만드는 경우 인증이 항상 번거로운 존재가 된다.

*** 세션**

내가 이 웹서비스를 쓰다가 화장실을 들렀다가 부엌에 가서 커피를 내려왔을 때 '세션이 만료되었습니다' 를 보게 되는 거지같은 경험을 받고 싶지 않다.

문맥(혼자 또는 측근들과 사용하는 웹서비스)에 어긋남이 있긴 하지만 확장성 이슈가 있고, session persistence 설정을 따로 하지 않을 경우 개발도중에 서버 내렸다 올리면 세션이 사라져서 개발편의성도 떨어진다. 개발자가 지쳐가는 시점부터는 세션에 아무거나 쑤셔넣기 시작하는데 (open된 fd를 넣는다거나) 세션서버 분리시점에 뒤늦게 깨달아 후회하여 고치면 그나마 다행이나, serialize 가능한 객체라 세션서버가 분리되도 상관없다면 '에이 뭐 serialize하는데 얼마나 걸리겠어?' 하게 되어 서버가 서서히 지쳐가게 된다.

*** 쿠키**

쿠키에 User ID를 넣었을 때 hijacking을 막으려면 내용 전체를 shared key로 암호화(언제 깨질지 모름)하거나, [Play!](http://www.playframework.org/) 처럼 내용물은 plain으로 하되 스푸핑을 막기 위해 signature를 넣을 수도 있다. 무엇을 선택하더라도 서버코드쪽에 최소한 검증을 위한 로직이 들어가야 한다. 귀찮다.

*** 인증서**

nginx 쪽에서 클라이언트 인증서 verify 까지 모두 마치고 application server 에게 subject 만 (nginx|apache의 경우 $ssl_client_s_dn) 넘겨주니 application server는 nginx가 뽑아준 DN 문자열 속에서 코드 1줄로 CN을 뽑거나 emailAddress를 뽑아 믿고 쓸 수 있다. 인증서를 쓰기 시작하면 내가 만드는 모든 웹서비스에서 동일한 인증서로 로그인을 할 수 있으니 억지로 껴맞춰보자면 OpenID 스러운 장점을 가지게 된다. 도시와 국가 정보까지 제공된다!

반면 웹브라우저의 클라이언트 인증서 지원여부에 의존하게 되므로 접근성이 현저하게 떨어진다. iOS의 경우 인증서를 Mail 앱 등에서 열어서 바로 설치할 수 있지만, [Android ICS (4.0) 이전의 기본 브라우저는 기 설치된 Client Certificate 사용을 지원조차 하지 않으며](http://code.google.com/p/android/issues/detail?id=8196), 이를 지원한다는 Galaxy Nexus (ICS) 에서 직접 시도해보니 로그인에 사용할 인증서를 고르는 UI 까지는 잘 표시되지만 정작 인증서를 선택하고 접속을 시도하면 com.google.android.browser가 [세폴](http://en.wikipedia.org/wiki/Segmentation_fault)먹고 죽는다. 이런 거지같은.

접근하는 기기로서의 문제도 있지만, 이 서비스가 public 하게 오픈될 경우 사용자들 개개인에게 인증서를 발급해줘야 하는 문제가 있다. [DN](http://en.wikipedia.org/wiki/Distinguished_Name#Directory_structure)  중 사용자로부터는 Common Name과 emailAddress 만 받고 나머지는 자동으로 채워 인증서를 발급하기까지는 쉽겠지만, 사용자에게 [PKCS12](http://en.wikipedia.org/wiki/PKCS12) 포맷 인증서를 다운로드 받게하여 탐색기나 Finder에서 더블클릭하여 시스템에 설치하게 해야한다. 물론 설치하고난 뒤에는 id/pw 입력보다도 훨씬 더 편하게 인증 과정을 마칠 수 있겠지만, 인증서를 잃어버리면 끝이다. 그렇다고 DB에 사용자들의 패스워드를 plain text로 저장하는 정신나간녀석들처럼 private key를 서버에 보관하고 있을 수는 없지 않은가 ㅋ. public 하게 오픈할 땐 인증서 다 걷어내고 세션|쿠키로 바꾸는 게 좋겠다.

어쨌든 SSL 처리 때문에 웹서버(nginx|apache) 성능이 현저하게 떨어진다.

*** 결론 **

여전히 번거롭다.

## Comments

### 준상
*2012-01-27T04:50:44.000Z*

^^ 결론에 뭔가 매직이 있을 줄 알았는데 여전히 번거로운거군요 ㅠㅠㅠ

---
