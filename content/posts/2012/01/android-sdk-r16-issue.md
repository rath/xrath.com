---
title: "Android SDK r16에서의 ant 빌드 이슈"
date: Wed Jan 25 2012 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2012/01/android-sdk-r16-issue
lang: ko
tags: ["android", "build-tools", "android-sdk", "programming"]
---

Android SDK Tools r16에서 생겨난 [이슈](http://code.google.com/p/android/issues/detail?id=22948)입니다.

요약하면 코드 한줄 고치고 ant 빌드했는데 apk 파일이 새로 만들어지지 않는다는 겁니다. 이런게 어떻게 릴리즈 됐고 아직도 패치가 안됐는지 참..

구글링 하다보면 r16 이 이상한거니 r15 쓰라는 말도 있고, 개발장비 성능이 좋은 개발자분들은 매번 ant clean debug 를 한다고 합니다.

com.android.ant.InputPath#ignores에서 boolean flag에 !를 실수로 붙여서 생긴 문제이므로 소스코드의 !를 빼주기만 하면 됩니다. 고치기 귀찮으시죠?

$ANDROID_SDK/tools/lib/[anttasks.jar](/tmp/android/anttasks.jar) 를 덮어쓰시면 됩니다.

**추가로** 제가 수정한 이 anttasks.jar 파일에는 [dx](http://developer.android.com/guide/developing/tools/index.html) --no-optimize 옵션 지원을 넣은DexExecTask도 포함되어 있습니다. no-optimize는 [말도 안되게 느린 안드로이드의 dex ](/2010/10/dont-make-me-hardcore/)파일 생성을 조금이라도 빨리 하기 위해 사용합니다. $ANDROID_SDK/tools/ant/build.xml 파일의 253 라인 dex element 에 nooptimize="true"를 넣으면 30% 정도의 속도향상을 보이게 됩니다. 마켓에 배포할 때는 no-optimize 꺼주시는 것 잊지 말고요.

코드 한 바이트도 안고쳐진 외부 라이브러리들도 빌드때마다 매번 다시 처리하시는 android dx tool 에게 10초간 묵념합시다.
