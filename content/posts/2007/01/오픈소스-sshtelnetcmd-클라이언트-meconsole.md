---
title: "오픈소스 SSH/Telnet/CMD 클라이언트 MEConsole"
date: Sun Dec 31 2006 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2007/01/오픈소스-sshtelnetcmd-클라이언트-meconsole
lang: ko
tags: ["technology", "ssh", "telnet", "opensource"]
---

SourceForge에 등록된 프로젝트인 [MEConsole](http://sourceforge.net/projects/meconsole)을 사용해봤다.
아~ 나 완전 감동!!!

MEConsole is an easy used SSH/Telnet/CMD console for windows with a lot of features. i.e multi & dividual tabs, chinese font support, enhanced windows console, lots of hotkey support. 

SSH/Telnet는 Putty도 있고 라이센스도 구입한 SecureCRT도 잘 되지만..
세상에 **CMD** 콘솔이라니!!! 아우 너무 잘 된다 ㅠ.ㅠ 
보통 내 윈도 데스크탑에는 탐색기 서너개 CMD 3-4개가 항상 떠있다. CMD는 내 필수품.

하지만 CMD는 width가 일정 한도 이상 안늘어나는 단점이 있고 MEConsole 처럼 탭을 제공해주지도 않기 때문에 3-4개 띄우다보면 매번 title 명령으로 이름을 정해주지 않으면 작업표시줄에 
C:\Windows\system32\cmd.exe <- 이것만 잔뜩 보여서 헷갈린다. -_-

SecureCRT 5.x 버전처럼 탭 터미널링(?);;도 잘되고 한 탭 내에서 수평/수직으로 화면을 나눌 수도 있다. 물론 Alt+Enter로 전체화면 스위칭도 잘 된다.
ssh에서 한글 입력/출력도 무난하게 되는데 ssh/telnet은 putty 기반이라 뭐 당연히 잘되리라 보고..
안타까운건 지원 Encoding이 

- System default
- Windows Chinese Simplified (CP 936)
- Windows Chinese Tranditional (CP 950)

이렇게밖에 없다. 아마도 만드신 분이 중국분이 확실하리라.
UTF-8 없는게 안타깝지만, CMD 지원이라는 것만으로도 내겐 감동 백만회다.

약간 어이없는 것은 ssh/telnet 에서 한글 입력이 잘됨에도 불구하고, cmd에서는 한글입력이 안된다는 것 -_- 이다. 다행히 cmd 에서 한글입력 할 일이 별로 없긴하지만 다른 여러가지 장점에도 불구하고 좀 치명적이다.

뭐 오픈소스니까 UTF-8이랑 CMD 한글문제 패치하면 되겠지! (그런데 데탑에 MSVC도 안깔려있네 (7))
이런 멋진 프로그램을 알게해주신 IRC #perky 채널의 [KOEI님](http://koei.fiaa.net)께 심심한 감사를 드립니다 :$
