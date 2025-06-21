---
title: "T-Mobile USB 모뎀의 진실"
date: Sat Sep 05 2009 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2009/09/t-mobile-usb-모뎀의-진실
lang: ko
tags: ["t-mobile", "usb-modem", "internet", "network-limitation"]
---

7월 25일에 런던에 입국한 나, shared room을 빌려 256Byte/s 의 인터넷 속도를 즐기다가.

8월 15일 광복절을 맞이하야 -_- 새 집으로 이사를 왔다. 4층 건물의 꼭대기층이라 천장이 아주 높은 것이 매력. 이리저리 짐들을 정리하고 가구 장만에 정신이 없다가 8월 20일경 [Virgin Media](http://www.virginmedia.com/)에 인터넷 라인과 집 전화번호를 신청했다.

어느덧 시간이 흘러 9월 6일, 메일이 한통 날라왔다. 9월 15일에 전화선을 설치해준단다. 3주가 넘게 걸리다니.. 뭐 문화가 원래 그러니 어쩔 수 없다. 영어 공부를 위해 메일과 문자를 주고 받는 사람들에게 물어보니 자기는 영국온지 2년이 넘었는데 집에 인터넷이 없단다. 또 어느 이탈리아인에게 물어보니 원래 거지같으니 그러려니 하란다. 문화는 사람들이 옳다고 믿는 것이 아닌가. 뭐 그런가보지.

그렇다고 온라인이 아니면 살아갈 수 없는 내가 인터넷을 안쓰고 계속 기다릴리 없다.

그리하야 T-Mobile 의 USB 모뎀을 샀다. 한달에 8만원쯤 하는데, 여기 물가에 몇번 농락당하다보면 참 싸게 느껴진다. 가격도 비싸지만 다운로드 제한이 한달에 3기가바이트란다. 3기가 다 쓰면 어떻게 하냐고 물어보니 그래도 웹서핑은 된단다.

그런데 한달 다운로드 제한인 3GB를 다 써도 웹서핑이 된다는 것이 이상하지 않은가? 큰 이미지들만 계속 보면 어떻게 감당하려고. 혹은 내가 한국서버에서 1GB 자료 받은 다음 jpg로 인코딩해서 HTTP로 받아가면 땡이지 않는가.

그들은 OS 레벨에서 html를 바꿔치기 한다. 모든 html 페이지 앞에 script 태그를 찡겨놓기도 하고 모든 이미지는 자기네 proxy를 거치도록 img 태그를 바꿔버린다. 이미지 화질이 환상이다.. 캡챠라도 한번 나오면 정말 알아볼 수가 없단 말이다. 아무튼 자료를 이미지로 바꿔 받아보는 짓은 할 수 없게 되었다. (Shift-R을 누르면 원래 화질의 이미지를 표시해준다. 아마 이짓을 하기 위해 페이지 상단에 script를 찡겨 박은 것이렸다)

그뿐만이 아니다. 이런 짓거리를 OS 레벨에서 해서 그런지 연결을 해두기만 해도 시스템 자원을 엄청나게 소모한다. 내 맥북에어 syslogd 에 엄청난 메시지를 주기적으로 보낸다. 대략 30라인 정도의 로그를 2~3초에 한번씩 보낸다. 덕분에 i/o load 상승.

유튜브에서 영상이라도 한번 보면 시스템 자원을 모조리 가져다 쓰는게 아닐까 하는 의심이 들 정도다. 견딜 수 없어서 시스템 기본 인덱서도 죽여버렸다. 덕분에 mds가 없다고 투덜대며 10초에 한번씩 3줄의 로그를 syslog에 던지는데, T-Mobile USB 모뎀에 비하면 이정도는 애교지.

그러던 오늘, extjs 사의 GXT를 돌리려는데 위젯이 전혀 나타나지 않는 것이였다. 이유는 아직 모른다. 스크립트 태그 이상한 거 넣어서 충돌 났나보지.. 그래서 만들어놓은 프로그램 테스트를 직접 못하고 -_- 한국에 있는 친구들에게 부탁하기도 했다. 그러다 이건 아니다 싶어서 BTOpenzone WIFI 티켓을 구매해서 USB 모뎀을 버리고 *깨끗한* WIFI에 붙였다.

그러더니 갑자기 메일 폭주. gmail sms notifier도 폭주. 이게 무슨 일인가 뒤져보니 T-Mobile USB 모뎀이 Outgoing SMTP를 허용하지 않는 것이였다. 로컬에 이슈트래커인 Mantis를 깔아 쓰고 있었는데 오늘 BTOpenzone WIFI에 연결하니 그동안 쌓였던 이슈들 수십개가 한꺼번에 메일로 날라왔다. (난 메일 날라오면 sms 받는 사람이란 말이다.. SMS 한통에 200원인데 ㅠ_ㅠ)

USB 모뎀 사다가 계속 집에서 쓰는 것도 서러운데.. 비싼 돈도 서러운데.. 프로그램마저 개판이니!

아래는 T-Mobile USB 모뎀이 syslog에 남기는 메시지의 일부.


```
Sep  6 00:49:09 rath T-Mobile Internet Manager[133]: [sendHeadCmdToBack:]  (A) ZTEDMgr Status Status Cmd is Running
Sep  6 00:49:09 rath T-Mobile Internet Manager[133]: [addZPASWithModuleId:]
Sep  6 00:49:09 rath T-Mobile Internet Manager[133]: addZPASWithModuleId:mQueue count = 1
Sep  6 00:49:09 rath T-Mobile Internet Manager[133]: [addZDONWithModuleId:]
Sep  6 00:49:09 rath T-Mobile Internet Manager[133]: addZDONWithModuleId:mQueue count = 2
Sep  6 00:49:09 rath T-Mobile Internet Manager[133]: SendAtCmd call
Sep  6 00:49:09 rath T-Mobile Internet Manager[133]: send AT+CSQ^M
Sep  6 00:49:09 rath T-Mobile Internet Manager[133]: [Source From TTY]:AT+CSQ^M
Sep  6 00:49:09 rath T-Mobile Internet Manager[133]: [nEndFlg]:0
Sep  6 00:49:09 rath T-Mobile Internet Manager[133]: [after Bk_PreProcess_SIO_Rdata]:AT+CSQ^M
Sep  6 00:49:09 rath T-Mobile Internet Manager[133]: [Source From TTY]:^M\n+CSQ: 17,99^M\n^M\nOK^M
Sep  6 00:49:09 rath T-Mobile Internet Manager[133]: [nEndFlg]:1
Sep  6 00:49:09 rath T-Mobile Internet Manager[133]: [after Bk_PreProcess_SIO_Rdata]:^M\n+CSQ: 17,99^M\n^M\nOK^M
Sep  6 00:49:09 rath T-Mobile Internet Manager[133]: [before Put__Res_Q]:^M\n+CSQ: 17,99^M\n^M\nOK^M\n>>Sizeof(21)
Sep  6 00:49:09 rath T-Mobile Internet Manager[133]: [Put_Res_Q]:^M\n+CSQ: 17,99^M\n^M\nOK^M
Sep  6 00:49:09 rath T-Mobile Internet Manager[133]: [addOneUnsolicitedRes:] (IN)pRes = 
Sep  6 00:49:09 rath T-Mobile Internet Manager[133]: [sendHeadCmdToBack:]  (A) ZTEDMgr Status Status Cmd is Running
Sep  6 00:49:09 rath T-Mobile Internet Manager[133]: SendAtCmd call
Sep  6 00:49:09 rath T-Mobile Internet Manager[133]: send AT+ZPAS?^M
Sep  6 00:49:09 rath T-Mobile Internet Manager[133]: [Source From TTY]:AT+ZPAS?^M
```


저기요, 시스로그는 디버그 메시지를 남기는 곳이 아니거든요? -_-

여기까지 야밤에 SMS 20통 받고 당황해서 글을 쓴 rath 였습니다.

## Comments

### rath
*http://xrath.com/*
*2009-09-06T01:35:53.000Z*

요것은 페이지 상단에 붙어나오는 스크립트.

http://1.2.3.4/bmi-int-js/bmi.js

---

### kfmes
*http://blog.kfmes.com*
*2009-09-06T02:11:14.000Z*

인터넷 환경이 열악하다는건 알고 있었지만, 열악한건 둘째치고 서비스부터가 엉망이군요!

---

### 아크몬드
*http://archvista.net/*
*2009-09-06T04:29:20.000Z*

정말, 대한민국은 초고속 인터넷 만큼은 세계 1위인 듯 합니다..ㅋ

---

### twinpix
*http://oiku.net*
*2009-09-06T06:26:02.000Z*

@rath 

1.2.3.4는 dt망에서만 먹히는건가봐요..

---

### rath
*http://xrath.com/*
*2009-09-06T06:37:54.000Z*

[@kfmes](#comment-9600)
제가 생각하기에. 참 엉망이에요. 고객서비스는 대한민국이 최강이 아닌가 싶습니다.
상황을 보니 지금 건물에 원래 들어와있는데 BT라는 회사인데.. 전화라인을 아예 다른 회사로 바꾸는거라 지역 알아보고 이것저것 알아보느라 시간이 더 걸린다는 것 같네요.
그래도 그렇지.. 한국에서 3주 기다리는 일은 절대로 없겠죠. 인터넷 회사 옮기면 현금까지 주는 나라인데 말이에요 ㄷㄷ

---

### rath
*http://xrath.com/*
*2009-09-06T06:38:32.000Z*

[@아크몬드](#comment-9601)
공감합니다. 여기에 하나를 덧붙이자면 택배서비스도 대한민국이 최고인듯 합니다. ㅋㅋ

---

### rath
*http://xrath.com/*
*2009-09-06T06:40:13.000Z*

[@twinpix](#comment-9602)
그런가봅니다 USB 모뎀을 제거하고 BTOpenzone으로 시도해보니 접근이 안되네요! 모뎀 붙여서 다시 시도해보겠습니다.

---

### rath
*http://xrath.com/*
*2009-09-06T07:30:32.000Z*



```
rath :


@twinpix

그런가봅니다 USB 모뎀을 제거하고 BTOpenzone으로 시도해보니 접근이 안되네요! 모뎀 붙여서 다시 시도해보겠습니다.
```



BTOpenzone 쓰려고 잠시 T-Mobile USB Connector를 언인스톨했는데, 스크립트 내용을 복사하기 위해 다시 설치했더니... 설치가 안됩니다. -_-; 언인스톨했다가 다시 깔면 안되는건가..
신기하게도 인스톨이 끝나면 정작 중요한 프로그램은 안깔리고 언인스톨러만 설치됩니다. 정말 문제가 많군요.

---

### rath
*http://xrath.com/*
*2009-09-06T10:22:37.000Z*

인스톨 문제가 생겼을 때 install script가 한참을 돌길래 이상해서 top으로 o-cpu를 해보니 chmod가 80%를 점유하고 있어 의아해 했었습니다.
그런데.. 이녀석이 제 시스템의 대부분의 파일을 0777로 만들었습니다.

얘네 도대체 뭐하자는 플레이일까요.

---

### Jenix
*http://jinhyung.org*
*2009-09-07T00:02:17.000Z*

헛 ㅎㅎㅎ 저는 NTT DoCoMo 에 들어가는 맥용 USB 모뎀 클라이언트와 드라이버를 작년에 OEM 한적이 있는데,
실제 제품 출시에는 아니지만.. 테스트버젼으로 깜빡하고 디버깅 로그를 안끄고 보내줬다가 한소리 들은 기억이 떠오르네요 ^^ 모뎀 커맨드를 보니 반가운.. -ㅇ-;;;;;;

---

### rath
*http://xrath.com/*
*2009-09-07T03:39:08.000Z*

[@Jenix ](#comment-9609)
으헛 도코모에 들어가는 맥용 모뎀 클라이언트도 만드시고 멋지네요!
매번 개발할 때마다 로그 관리하는 게 참 귀찮아요. 로그들도 사랑해주고 보듬어줘야하는데.. 요새는 로그에 찍는 메시지들을 잘 작성해야겠다는 생각만하고, 장비나 상황별로 로그가 차각차각 바껴지는 아름다운 -ㅅ- 것들을 시도하지 못하고 있어요.
모뎀 커맨드라고 하니 전 ATDT 밖에 생각나지 않는군요;;

---

### 서문교
*2009-09-07T07:26:06.000Z*

영국은 인터넷 후진국이구나 ㅋㅋ

---

### rath
*http://xrath.com/*
*2009-09-07T21:01:56.000Z*

[@서문교 ](#comment-9613)
실망이 이만저만이 아니야. 어휴.

---

### ㄴㅇㄱ
*http://wookay.egloos.com*
*2009-09-09T08:06:12.000Z*

헐. AT+CSQ 왠지 반갑다니.. -_-;;
그래도 재밌게 읽었어요. 힘내쉬워요.

---

### Jenix
*http://jinhyung.org*
*2009-09-10T09:35:21.000Z*

@rath
레쓰님처럼 뭔가 멋지게 만들었으면 참 좋을텐데 실력이 미천한지라 ㅠㅠ

앗.. 그러고보니 ㄴㅇㄱ님도 모뎀커맨드를 보고 댓글을 다셨군요. -ㅁ-; 후다닥;

---

### rath
*http://xrath.com/*
*2009-09-10T11:31:48.000Z*

[@ㄴㅇㄱ ](#comment-9632)
모뎀커맨드를 아시는 분이 꽤 되는군요~; AT+CSQ는 뭐에요? 대충 구글링해보니 신호강도 체크하는거라도 나오긴 하는데.. 흐흐 힘내서 쉴께요~!

---

### rath
*http://xrath.com/*
*2009-09-10T11:34:12.000Z*

[@Jenix ](#comment-9640)
실력은 Jenix님이나 다른 분들이 더 좋을꺼에요~ 저는 뭔가 혼자 뚝딱뚝딱 만들어서 뿅~ 하는걸 좋아해서 그렇죠 뭐 흐흐;

---
