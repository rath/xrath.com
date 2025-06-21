---
title: "PS3 에 BD-J 어플리케이션 올리기, Part 1"
date: Mon Oct 06 2008 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2008/10/ps3-에-bd-j-어플리케이션-올리기-part-1
lang: ko
tags: ["java", "bd-j", "ps3-development", "blu-ray"]
---

오랜만에 [java.sun.com](http://java.sun.com/) 에 갔더니 [이목을 끄는 기사](http://java.sun.com/developer/technicalArticles/javame/bluray/)가 있어서 옮겨보고자 합니다.

**Java로 블루레이 어플리케이션을 개발할 수 있다**고 합니다! 우왕ㅋ굳ㅋ

모바일 어플리케이션 개발을 시작한 게 2000년 말경에 출시됐던 LGT iBook이 탑재한 CLDC 기반의 KittyHawk 였습니다. 지금의 J2ME랑 별반 다르지도 않지만 그 당시 "Hello World" 가 아닌 "안녕 빌어먹을 세상아!" 라는 프로그램을 직접 짜서 내 폰에 올릴 수 있다는 매력은 그 무엇보다 높았었지요. 중간에 XCE가 만든 XVM, 정통부가 추진한 WIPI를 지나.. 어느덧 **PS3 콘솔에 직접 짠 프로그램을 올릴 수 있**게 되었습니다!! :$
 

일단 [BD-J](http://en.wikipedia.org/wiki/BD-J) 란 용어를 살펴봅시다. 링크된 위키피디아 페이지를 보면 알 수 있듯이, 현존하는 블루레이 지원 플레이어 중 PS3 만이 BD-J를 지원하고 Blu-ray Profile 1.1을 지원합니다. 특히 PS3는 특별한 기능을 더 지원한다고 하네요. *local storage (persistent memory), picture-in-picture, or internet access*


개발을 위해 무엇이 필요한가하니

Windows Vista 혹은 XP. 맥이나 리눅스는 엄청나게 특화되어있는 video driver가 없어서 안된다고 합니다. 맥 유저는 부트캠프를 추천합니다.
그래픽카드가 최소 256MB 는 되야 하고, HD 비디오를 렌더링 할 수 있어야 합니다.
블루레이 라이터가 필요합니다. 열심히 만든 프로그램을 PS3 에 집어 넣어야 되겠죠.

[CyberLink](http://www.cyberlink.com/prog/bd-support/diagnosis.do) 에서 제공하는 툴을 이용하면 자신의 PC가 BD-J 어플 만들기 괜찮은 PC인지 체크해준다고 하니, 돌려보세요. ^^


두번째로 BD-J 로 무엇을 할 수 있나를 살펴보겠습니다.

특정 프레임에 텍스트를 그릴 수 있다. 고로 자막을 그리는 게 쉽다.
재생되는 비디오 위에 shape 이나 이미지를 그릴 수 있다.
인터렉티브한 게임을 만들기 좋게 animated 이미지를 그릴 수 있다.
Fade 나 트렌지션들을 사용할 수도 있다.

![](http://java.sun.com/developer/technicalArticles/javame/bluray/figure3.jpg)


Blu-ray Java API 들을 보겠습니다. 패키지명, 아름답습니다. 

- org.blueray.application - 디스크 넣었다 뺐다 (insert/eject) 이벤트 노티를 받는 등의 app lifecycle 처리를 합니다.  
- org.blueray.media - Picture-in-Picture (PiP), 자막, 오디오 제어 클래스들이 있다고 합니다.  
- org.blueray.net - TCP/IP는 java.net 에서 여전히 쓸 수 있고, 이 패키지는 Java TV API를 확장하여 블루레이 장치의 위치만 넣어주면 된다고 합니다.  
- org.blueray.storage - vfs와는 달리 모든 블루레이 플레이어에서 사용할 수 있는 스토리지에 대한 클래스입니다. 뭔지는 잘..   
- org.blueray.system - 블루에이 플레이어의 시스템 레지스터를 접근한다고 합니다. 시스템 레지스터가 뭐가 있을까요? ;;  
- org.blueray.ti - 디스크의 메타데이터를 접근하는데 사용됩니다.  
- org.blueray.ui - awt가 해주던 그것을 제공한다고 하는데.. 자세한 것은 두고봐야겠지요.  
- org.blueray.vfs - 생각하신대로 가상 파일시스템입니다. 로컬 스토리지를 모든 player가 제공하지는 않지만 nfs 처럼 네트웍이 가능한 곳에서서 적절한 장치가 준비되어있다면 vfs를 사용할 수 있다고 합니다.  


원문은 [Blu-ray Disc Application Development with Java ME, Part 1: Creating Your First Application](http://java.sun.com/developer/technicalArticles/javame/bluray/) 입니다.

Part 2 에서는 BD-J 제작을 위한 개발 환경 만들기에 대해 소개할 예정이라네요.

기대됩니다. 아흐흥 >_<


## Comments

### 다즐링
*2008-10-06T07:18:25.000Z*

일단 그전에 PS3 가...;;

---

### rath
*http://xrath.com/*
*2008-10-06T09:37:38.000Z*

오늘은 Wii도 질렀지요;;

---

### nohmad
*http://nohmad.myid.net/*
*2008-10-06T10:36:31.000Z*

HScene, HSceneFactory 라는 이름이 뭔가를 기대하게 만드네요. ^^

---

### 스카리
*http://scari.net/*
*2008-10-07T04:39:40.000Z*

BDJ에서 말하는 레지스터는 GPR (General Purpose Registers)과 PSR (Player Status Registers) 인데, Conceptual하게 구현된 s/w레지스터라고 보시면 됩니다. 사용하는 방법이나 담고있는 의미는 드라이버작업 할때 알던 그 레지스터와 동일합니다. HScene은 에찌신을 말하는건 아니고 ^^;; havi 라는 미들웨어 (직접적으로 만져보지 않아서 잘 모릅니다) 에서 사용하는 기본 윈도우 클래스인걸로 알고 있습니다. Factory는 아마 이름그대로 Factory 클래스겠네요.

하는 일이랑 관련된  포스트가 올라와서 간만에.... ㅇㅅㅇ
아.. 그리고 BDJ를 지원하는 BDP는 PS3외에도 시중에 나와있는 제품이 여럿 되는걸로  알고 있습니다. 근데 직접 다뤄본 결과 거의 모든 면에서 PS3가 압승이니 혹시 구입하시려거든 참조하세요

---

### rath
*http://xrath.com/*
*2008-10-07T17:32:30.000Z*

스카리옹.. 직접 다뤄보셨다니 하악 :$   
GP, PS 레지스터 얘기는 전혀 모르겠네요. 드라이버 작업이랑 비슷하다니 안도감만 조금 드네요.   
그나저나 PS3 에서 뭔가 올려볼 수 있다니 넘 신나는데, 경제적 리소스가 더 투입되는 건 없는거죠? (블루레이 라이터 빼고요 ㅎㅎ) 장난칠 기회가 오면 요것죠것 물어볼께요.  

---
