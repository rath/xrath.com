---
title: "JetBrains 플러그인 만들다"
date: Thu Oct 19 2017 02:00:00 GMT+0900
slug: 2017/10/jetbrains-plugin-angular-folding
lang: ko
tags: ["jetbrains", "plugin", "angular"]
---

[Angular Folding](https://plugins.jetbrains.com/plugin/10090-angular-component-folding)

혼자 쓰기 아까워서 젯브레인 공식 플러그인 레포에 올렸다. 그 흔한 스크린샷 하나 없이 설명 달랑 두 줄 써놨다. import 구문 빼면 다 합쳐서 100줄도 안 되는 초간단 플러그인.

Angular 컴포넌트들 파일명 같고 확장자만 html/css/less/ts로 달라서 project tree 더럽혀지는 것을 피하는 게 유일한 목표다.

![](/img/angular-folding.jpg)

소스코드는 깃헙에 https://github.com/rath/angular-folding
