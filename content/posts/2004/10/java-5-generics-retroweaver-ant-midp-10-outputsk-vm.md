---
title: "Java 5 Generics + RetroWeaver + Ant = MIDP 1.0 Output(SK-VM)"
date: Sat Oct 02 2004 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2004/10/java-5-generics-retroweaver-ant-midp-10-outputsk-vm
lang: ko
tags: ["java-5", "retroweaver", "ant", "mobile-development"]
---

[RetroWeaver](http://retroweaver.sourceforge.net)의 도움으로 현재 서비스중인 SK-VM 컨텐트 3개를 
1.5 기반으로 작성하여 실폰에서 정상적으로 돌아가게 되었습니다! -ㅁ-

**[환경]**
Platform: SK-VM 1.3.2
Compiler: Java 5 (-source 1.5 -target 1.5)
Weaving Tool: RetroWeaver (-target 1.2)
Build Tool: Ant 1.6.2 

RetroWeaver에서 ant로 통합할때에 대한 예제도 있어서 무지 편리했습니다.

사실 1.5을 사용한다 하여도, 도움될만 한것은..

  static import로 타이핑 시간 절감
  vargs ... 으로 코드 깔끔
  generics를 통해 Collection 유지보수 편리
  Auto boxing/unboxing 사용으로 인한 편리
  foreach 굿~

그런데 사실상 foreach를 도는 것도 거의 없고, 
Auto boxing 할만한 코드부분도 별로 없고...
generics는 그저 코드 폼나는 것 같고.. 
static import랑 vargs가 그나마 편했던것 같습니다.

아무래도 모바일이니 편리가 필요한 코드는 거의 없네요

에잇 다음엔 Applet
