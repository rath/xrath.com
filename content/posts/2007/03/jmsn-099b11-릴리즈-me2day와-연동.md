---
title: "JMSN 0.9.9b11 릴리즈 - me2day와 연동"
date: Thu Mar 15 2007 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2007/03/jmsn-099b11-릴리즈-me2day와-연동
lang: ko
tags: ["technology", "software-integration", "openid"]
---

아직 클로즈 베타인 [미투데이](http://me2day.net)와 5년째 잘 돌아가고 있는(중간에 한 2년 쉬긴 했어요) JMSN을 연동했습니다.
[nainu군](http://honeydream.egloos.com/)을 [JMSN 테스터로 영입](http://sourceforge.net/users/ninecow/)한 후 JMSN 개발에 박차를 가하는 중입니다. ㅎㅎ

이번 릴리즈의 가장 큰 변화는 <오늘의 한마디>로 불리우는 PSM(Personal Status Message) 지원을 msnmlib-2007 에 [넣은 것](http://jmsn.cvs.sourceforge.net/jmsn/msnmlib-2007/src/rath/msnm/NotificationProcessor.java?r1=1.2&r2=1.4)이고 JMSN 에서는 me2day rss를 오늘의 한마디에 표시하도록 [한 것](http://jmsn.cvs.sourceforge.net/jmsn/jmsn-2007/src/rath/jmsn/)입니다.

물론 msnmlib에 오늘의 한마디(PSM) 지원이 들어갔기 때문에 이것 역시 JMSN에서 수정하고 친구들의 오늘의 한마디도 대화목록에서 볼 수 있습니다. (아직 대화창에서는 볼 수 없음)

자 그럼 미투데이와 연결하는 모습을 시연(?) 하겠습니다.

![](/img/jmsn_me2day_01.jpg)

**도구 -> me2day.net 설정**을 하거나 Ctrl-D 누르면 창이 하나 뜹니다.

![](/img/jmsn_me2day_02.jpg)

오늘의 한마디 부분을 자동으로 me2day 에서 긁어올 것인지 수동으로 할 것인지를 결정하고
긁어오고자 하는 주소를 씁니다. 일반적인 경우라면 자신의 아이디를 써야할텐데요.
rss 일 뿐이니 남의 아이디를 쓰셔도 됩니다 -_- 
그 후 RSS Interval에서 긁는 주기를 설정하고 창을 닫으면 바로 오늘의 한마디를 갱신해줍니다.

새로 생긴 JMSN 메뉴바 바로 아래의 Today 부분을 마우스로 더블클릭하면 오늘의 한마디를 수정할 수 있습니다.

![](/img/jmsn_me2day_03.jpg)

아! 그리고 가끔 로그인 직후 Challenge에 응답하지 못해서 끊기던 버그가 말끔히 해결되었고 로그인이 가끔 안되던 문제도 **사라졌**습니다.

그리고 2주전쯤 SOCK4/5 지원도 넣었습니다. 도구 -> 옵션 에서 Connection 탭을 누르면

![](/img/jmsn_me2day_04.jpg)

이렇게 설정할 수 있습니다. (H) 물론 이 기능은 java.net.Socket 을 사용한 기능이므로
Java 5 이상에서만 사용할 수 있습니다. (제 아이북 osx 10.3.9 에서는 안되요 T.T)

다운로드-1: [http://xrath.com/files/jmsn-0.9.9b11.zip](/files/jmsn-0.9.9b11.zip)
다운로드-2: [http://xrath.com/files/jmsn-0.9.9b11.tar.gz](/files/jmsn-0.9.9b11.tar.gz)

osx 에서도 잘 돌아갑니다. 단, 맥용 자바어플 전용으로 빌드를 아직 안했으니 그리 맘에 들진 않을겁니다.  

이제 OpenAPI 나오기만을 기다립니다! 오늘의 한마디에 쓰면 미투데이에 포스트하도록요~ (H)

## Comments

### hey
*http://me2day.net/heycalmdown*
*2007-03-16T01:07:41.000Z*

rss 일 뿐이니 남의 아이디를 쓰셔도 됩니다  (킥킥)

---

### rath
*http://xrath.com/*
*2007-03-16T06:01:23.000Z*

JMSN 링크 잘못되어있던 것 고쳤습니다. 표시는 11로 해놓고 링크를 8로 걸어놔서 proxy와 me2day가 없는 버전을 받으셨을 겁니다. 
지금은 b11로 잘 수정해놨구요, 리포팅해주신 fribirdz님 감사!

hey님, PSM에 안넣고 friends.xml에 있는 거 한번에 다 긁어보여주는 귀여운 툴 있으면 더 재미있을 것도 같아요 ㅋㅋ 미투데이 만세!

---

### 만박
*http://sumanpark.com/blog/*
*2007-03-16T17:20:38.000Z*

멋지십니다. ^^

---

### rath
*http://xrath.com/*
*2007-03-16T18:00:35.000Z*

다 미투데이 덕분이에요 ^^;

---

### 까나리
*http://kkanari.egloos.com*
*2007-03-19T17:02:49.000Z*

미투동작 잘 하네요, 감사감사 ^^

---

### rath
*http://xrath.com/*
*2007-03-19T17:25:56.000Z*

앗 까나리옹 (_ _)/ 부족한 거 많지만 스스로 꺼리낌없이 릴리즈 할 수 있을 때 모두에게 연락드릴께요 -ㅅ-

---

### 성훈
*2007-10-24T00:30:51.000Z*

왜그런지... 로그인하려고 하면 순간적으로 되었다가 ... 갑자기 팅~ 하네요-_-;; 왜그렇지.ㅜㅜ

---

### fedora8
*2008-01-14T02:37:19.000Z*

안녕하세요. jmsn을 써보려고 합니다(pidgin이 계속 죽네요-_-;) fedora8, LANG=en,utf-8인데 JMSN 0.9.9b11버전인데 한글이 깨져서 네모로 출력되네요. 메뉴의 Locale부분에서 korean, korean(utf-8), english를 선택해 봐도 같은 증상이네요...(마지막으로 블로그 왼쪽 하단에 JMSN 0.9.8b11 릴리즈라고 되어 있는데 0.9.9b11 이죠?)

---

### rath
*http://xrath.com/*
*2008-01-14T02:42:45.000Z*

예 0.9.9b11 가 맞습니다. version string 관리에 문제가 있어서요 -_;
한글들이 네모로 출력되는 건 locale 문제보다는 font 문제일 경우가 많습니다.

$JAVA_HOME/jre/lib/fontconfig.properties 파일에 한글 설정을 해주셔야 될겁니다. 자세한 자료는 'java 한글 fontconfig' 키워드로 찾아보시면 될겁니다.

---

### fedora8
*2008-01-15T07:19:46.000Z*

고맙습니다. 자세히 설명해주셔서... 해보고 있는데 아직 성공을 못했네요^^;;; $JAVA_HOME(/usr/lib/jvm)설정하고 fontconfig.properties파일에서 font디렉토리를 재설정(또는 성공한 config 파일 down)하고 재부팅등 여러가지 해봤는데 잘 안되서 고민중입니다. 다시 열심히 시도해봐야겠네요.

---
