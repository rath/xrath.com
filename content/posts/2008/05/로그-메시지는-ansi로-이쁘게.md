---
title: "로그 메시지는 ANSI로 이쁘게~"
date: 2008-05-07
slug: 2008/05/로그-메시지는-ansi로-이쁘게
lang: ko
---

PC통신 시절, 각종 ANSI 들 기억 하시나요.

로그 메시지 이쁘게 만드는 거 귀찮아서 색상 입히기를 다시 기억해냈습니다.
이런 녀석들을 참고해서 만들고 있습니다.

[ ANSI Color logging with log4j for any appender](http://wiki.osuosl.org/display/howto/ANSI+Color+logging+with+log4j+for+any+appender)
[Xterm Control Sequences](http://invisible-island.net/xterm/ctlseqs/ctlseqs.html)

맨날 거무튀튀하고 허연 로그 메시지 보느라 지겨우신 분들을 위해 
ANSI 를 기억하기~

System.console().printf("안녕하세요. \u001b[31;1m%s\u001b[0m은 빨갛고 두껍습니다%n", "요것");

$TERM xterm, ansi 일 때 잘 보입니다.

Microsoft Windows 에서는 escape 문자가 그대로 보일텐데요. NT 베이스는 지원하지 않는답니다.
[Wikipedia 설명](http://en.wikipedia.org/wiki/ANSI_escape_code)을 보면 System32/Config.NT 파일에 DEVICE=%SystemRoot%\system32\ANSI.SYS 를 넣어주면 된다고 하는데.. 재부팅 안하니까 적용안되는군요. 

Windows 에서는 [SetConsoleTextAttribute ](http://msdn.microsoft.com/en-us/library/ms686047.aspx) 를 써주세요. 누가 [만들어 놓은 소스코드](http://www.rgagnon.com/javadetails/java-0469.html)도 있네요.

## Comments

### 착이
*2008-05-14T05:16:23.000Z*

대화방에 폭탄(?) 안시 뿌리고 다니던 나쁜 사람들 생각도 나네요.. ㅋ

---

### rath
*http://xrath.com/*
*2008-05-14T06:41:20.000Z*

하하하 -_-; 멋진 안시 로고들 있는 동호회 갈 때면 부럽기만 했었는데.. 십년이 넘게 지나도 ANSI는 여전히 색상 바꾸기밖에 할 줄 모르겠네요

---

### 스카리
*http://scari.net/*
*2008-05-19T05:06:16.000Z*

ㅎㅎ 저는 색깔만 몇개 넣어서 썼었는데, 사람들이 눈 아프다고 못 쓰게 해서 그냥 평문으로 출력했다는... ;ㅅ;

---

