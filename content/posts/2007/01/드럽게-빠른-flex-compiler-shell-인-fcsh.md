---
title: "드럽게 빠른 Flex Compiler Shell 인 fcsh"
date: 2007-01-01
slug: 2007/01/드럽게-빠른-flex-compiler-shell-인-fcsh
lang: ko
---

정웅이와 Flex 수다를 떨다가 [labs.adobe.com](http://labs.adobe.com) 에 갔다가 [CLI](http://en.wikipedia.org/wiki/Command-line_interface) 매니아 눈에게 바로 들어온.

**Flex Compiler Shell** !!!

처음에 아무 생각없이 클릭했다가 나를 광분하게 만든 문장은 바로 이것.

It works very similarly to the mxmlc and compc command line compilers, but it compiles faster than the mxmlc and compc command-line compilers. One reason is that by **keeping everything in memory**, fcsh **eliminates the overhead of launching the JVM and loading the compiler classes**. Another reason is that compilation results (for example, type information) can be kept in memory for subsequent compilations.

잽싸 깔아보기로 한다. 아 참, fcsh은 Flex 2.0.1 이상에서만 돌아간다. 그 이하 버전을 사용하고 있다면 에러를 두두두 만나게 될 것이다. ([거친마루님](http://maroo.info/)께서 알려주셨다)

자자 그럼 얼마나 빨라졌는지 구경할 시간 (7)

**[mxmlc로 그냥 컴파일 했을 때]**


```
[rath@desk files]$ time mxmlc MoviePlayer.mxml
Loading configuration file /home/rath/flex2/frameworks/flex-config.xml
/home/rath/files/MoviePlayer.swf (168826 bytes)

real    <b>0m7.640s</b>
user    0m7.378s
sys     0m0.252s
[rath@desk files]$ 
```


**[fcsh에서 컴파일 했을 때]**


```
(fcsh) <b>mxmlc -benchmark=true MoviePlayer.mxml</b>
fcsh: Assigned <font color="blue">2</font> as the compile target id
Loading configuration file /home/rath/flex2/frameworks/flex-config.xml
Initial setup: 10ms
Loaded 8 SWCs: 846ms
Files: 334 Time: 3674ms
Linking... 28ms
Optimizing... 384ms
SWF Encoding... 175ms
/home/rath/files/MoviePlayer.swf (168826 bytes)
Total time: <b>5121ms</b>
Peak memory usage: 77 MB (Heap: 51, Non-Heap: 26)
(fcsh)   <font color=#336699>(이 부분에서 MoviePlayer.mxml 소스를 살짝 고쳤음)</font>
(fcsh) compile <font color="blue">2</font>
Loading configuration file /home/rath/flex2/frameworks/flex-config.xml
Initial setup: 8ms
Loaded 8 SWCs: 17ms
Recompile: /home/rath/files/MoviePlayer.mxml
Reason: The source file or one of the included files has been updated.
Files changed: 1 Files affected: 0
Files: 334 Time: 540ms
Total time: <b>566ms</b>
Peak memory usage: 83 MB (Heap: 57, Non-Heap: 26)
Linking... 16ms
Optimizing... 177ms
SWF Encoding... 68ms
/home/rath/files/MoviePlayer.swf (168830 bytes)
Total time: <b>263ms</b>
Peak memory usage: 85 MB (Heap: 59, Non-Heap: 26)
```


기존 mxmlc 사용시 7.640초

fcsh 사용시 최초 빌드시 5.121초  
두번째 빌드때부터는 (소스코드 고치고) 0.828초! (왕창 절약 ㅋㅋ)

매번 compile n 쳐주기 귀찮아서 리버스 엔지니어링으로 살짝 [fcsh.jar (24KB)](/files/fcsh.jar)를 고쳐보았다. 
!를 입력하면 마지막 명령 반복을 해주고, compile 3 대신에 3만 쳐도 컴파일되고 
mxmlc 의 약어 m도 먹게 고쳐놨다. 좀 더 편하고자 하시는 분은 사용해보길 바란다.

어예! (H)
