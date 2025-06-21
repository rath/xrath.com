---
title: "Adobe Flex 2 온라인 코딩 훈련 프로그램 만들다!"
date: Mon Jan 01 2007 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2007/01/adobe-flex-2-온라인-코딩-훈련-프로그램-만들다
lang: ko
tags: ["technology", "programming", "flex", "actionscript"]
---

Flash 9 플레이어가 있으면 어디서든 쌩쌩 잘돌아가는 Flex 2 + ActionScript 3.0.

요새 Flex를 심도있게 공부하는 것은 아니지만, 가볍게 가지고 노는 것을 자주 하고 있다.
그러다보니 난 '깊게' 하는 것도 아닌데, PC 바뀔때마다 flex 받고 압축풀고 환경변수 잡고..
게다가 컴파일은 도대체 어느 나라 속도인지 -_- 무지 느리다. 

속성 하나 고쳐서 눈으로 보고 싶어도 cmd 열고 cd로 달려가서 vi열고 고치고 저장하고 컴파일하는데 7초나 걸리는 mxmlc로 컴파일 하고 fdb로 구경하는 짓이란.. 사람을 참 지치게 만든다. (@)

그러던 중 어제 한줄기 빛으로 다가온 fcsh님을 만나게 되었고.. :$
빠른 속도를 의지하여 fcsh에 tcp 소켓서버를 살짝 붙여서 Flex Compiler Web! 를 만들게 되었다.

![](/img/flex_training.png)

내가 필요해서 만든 것이기도하지만, Flash / Flex 를 좋아하는 지인들 몇명만 이 서비스를 사용했으면 좋겠다. 왜냐하면 fcsh 자체가 메모리 귀신이라 덜덜덜 여러사람이 동시에 하면 -Xmx384m도 금방 한계가 드러나는 것을 목격했기 때문이다.

이로써 xrath.com 에서 도는 자바 데몬수가.. 6개가 됐다 -_- 메모리 512MB인데 젝일;
