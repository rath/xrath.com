---
title: "ActionScript 3 삼매경"
date: Mon Feb 19 2007 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2007/02/actionscript-3-삼매경
lang: ko
tags: ["programming", "flash", "actionscript", "flex"]
---

처음에 Flash 란 녀석을 접했을 때는 '디자이너만 쓰는 건가보다' 였다. 
그때가 99년 00년 시절이던가. 사내 디자이너 누님들이 쓰는 것을 보고 마냥 신기해하기만 했다.

그러다가 다시 흥미를 가지게 된 것은 [심장군의 Lab](http://buzzler.tistory.com/)을 보고 나서였다. 이때가 01년인가 02년인가.. 지금은 아무것도 없지만 그 당시에는 actionscript 만으로 물리공식을 섞어 뭔가 00KB짜리의 쫄깃쫄깃 한 것들이 마구 나오는 것들을 보고 '내가 범접할 수 없는 세상이구나'라고 생각했다.

그러다가 언젠가부터 [정웅이](http://blog.naver.com/blumetal)가 actionscript를 다루기 시작했다. 그때가 언제였지 03년정도였던 것 같다. 한 때 Flash로 MSN 클론을 만들어보겠노라고 우리집에서 밤새고 코딩질을 했던 기억이 난다. 그때는 actionscript의 기능이 미약해서 UI만 flash로 하고 나머지 통신부분은 win32 sdk로 만들어서 샤샥 붙이자! 뭐 이랬던 것 같은데 이런 저런 이유로 흐지부지 댔었다. -ㅇ-

작년 12월경 정웅이가 다시 Flash로 할만한 쫄깃쫄깃한 프로젝트를 제안했고 그 프로젝트엔 as3와 ruby가 함께 쓰이는 것이라 '모르는 언어 투성이다 만세~' 하고 잽싸게 수락했다. 느긋하게 지인들끼리 하는 프로젝트라 일주일에 1-2시간 이상도 잘 투자하지 못해 진도가 매우 더디지만 간간히 재미나게 하고 있다.

그러다보니 [거친마루님](http://comfuture.tistory.com/)도 요새 회사에서 Flex로 프로젝트를 하신다하고.. 뭔가 RIA 쪽에서의 Flex가 대세가 되어가는 향기도 풀풀 나고 -ㅇ-

무엇보다 Flex에 빠져들어 실제로 써보게 된 가장 큰 이유는 아래와 같다.

  초딩들의 PC에도 Flash Player는 깔려있다 -ㅇ- (jre 안녕~)
  유연하게 charset 조정가능한 tcp socket을 쓸 수 있다. (xml socket 안녕~)
  Flex 2 SDK는 무료이고 SDK 만으로도 뭐든 만들 수 있다. (builder 안녕~)
  Command Lince Interface를 지원하고 sdk가 Java라 모든 플랫폼에서 할 수 있다. (실제로 심장군은 osx 터미널에서 개발하고 내 [Flex 온라인 훈련 프로그램](/flex/try.jsp)은 fc6 에서 돈다)

그래서 홈피에다 mp3 player니 video player니 이것저것 mxml만으로 장난질을 해보다가 irc client 만들어야지~ 하고 flash.display.Sprite를 상속해서 대화창 컴포넌트 만들 생각을 하고 레퍼런스를 보는데 앞이 깜깜하다. java.awt.Graphics2D와 비슷한 flash.display.Graphics를 찾았지만.. 아놔 왜 drawString이 없는건데 -_-

씩씩 거리다가 재미난걸 찾았다.
as3 으로 Java의 Canvas, Graphics를 구현해 놓은 것! (@) 
나같은 사람에게는 아주 유용한 [문서](http://www.saturn.dti.ne.jp/~npaka/flash/as30/ShootingGame/index.html)~ ㄱㅅ

그나저나 나도 이제 Eclipse 써야 하나 CLI 너무 중독된거 같은데 -_-;

## Comments

### rath
*2007-02-19T15:27:08.000Z*

BitmapData에 Matrix로 적절히 translate한 TextField를 그냥 draw하면 되는거였다 :$

---

### rath
*2007-02-19T15:29:41.000Z*

BitmapData.draw 의 첫번째 인자인 IBitmapDrawable을 DisplayObject가 구현하고 있었다. ㄷㄷ 안그려지는 컴포넌트가 없는거잖아 -ㅅ-

---

### BZRSA
*2007-02-23T16:14:11.000Z*

Eclipse는 XP에, intel x86 에, win32 밖에 안되는듯. Vista x64, AMD64 에선 무수한 에러가 삭삭삭

---

### rath
*2007-02-24T13:09:38.000Z*

저런. 이클립스 계속 안써야겠군 후후 -_-

---
