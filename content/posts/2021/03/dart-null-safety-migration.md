---
title: "Null Safety 마이그레이션 열반기"
date: Sat Mar 13 2021 14:00:00 GMT+0900
slug: 2021/03/dart-null-safety-migration
lang: ko
tags: ["dart", "flutter", "null-safety"]
---

Dart 2.12 null safety 마이그레이션하다가 열반에 오를 지경이다. Null safety 아직도 지원 안 하는 의존성 패키지들이 적지 않고, --no-sound-null-safety 옵션 쓰기는 싫어서 웬만하면 새로 만들고 정 안 되겠으면 포크해서 고치고 있다.

작년부터 Flutter로 만든 십여 개의 앱이 다 마이그레이션 대상이다. 자동 마이그레이션 툴이 잘 동작하긴 하지만 그런 거 믿고 코드 방치하기에는 내가 넘 꼰대다. 하농 치듯이 아무 생각 없이 계속 한다. 이 또한 지나가리라.
