---
title: "JSmooth 0.9.8-2 한글화"
date: Tue Feb 27 2007 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2007/02/jsmooth-098-2-한글화
lang: ko
tags: ["programming", "java", "localization", "opensource"]
---

Java 프로그램을 EXE로 만들어주는 오픈소스 프로그램인 [JSmooth](http://jsmooth.sourceforge.net) 0.9.8-2를 한글화했다.

번역한 Text 리소스는 대략 65개 안팎에 skeleton 2개 xml 파일 부분만을 수정했다.
이 외에도 좌측 아이콘 메뉴 5개는 아예 소스코드에 메뉴명이 박혀있어 어쩔 수 없이 소스코드를 수정했다. 

번역해야할 부분이 xml, properties 이렇게 2개인데 properties 부분은 ResourceBundle을 쓰기 때문에 순수하게 번역하는 것만으로도 가능했지만 xml 부분은 쉽게 다국어화하기 어려운 형태로 되어있어서 그냥 configurable 한 부분만 골라서 패치 보내드려야 겠다.

스샷

![](/img/jsmooth-ko.png)

JSmooth 0.9.8-2 한글버전 **다운로드**

그럼 다시 일하러~ =3

## Comments

### 개굴
*2007-03-01T02:20:15.000Z*

ㅎㅎ 좋네요 : )

---

### rath
*2007-03-02T10:00:20.000Z*

개굴님도 Java를 사용하시나요 'ㅁ'? 부디 생산물이 도움이 되셨으면~

---

### 개굴
*2007-03-02T12:28:10.000Z*

아..  업무용으로 조금 사용하구 있습니다.  : )
지금 간단하게 일해주고 있는 회사에서 어떤분이 만드신 자바App를 배포한다길레 이거 추천해드릴려구요 ㅎㅎ ( 상용을 알아보구 계시더라구요 ; 킁; )

---

### rath
*2007-03-03T02:33:22.000Z*

NSIS(Nullsoft scriptable install system)과 JSmooth가 결합하면 좋은 배포 모습이 나오지 않을까 생각해봅니다. 좋은 주말 보내셔요. 
(참 재미난 mo 서비스 없을까요~?)

---
