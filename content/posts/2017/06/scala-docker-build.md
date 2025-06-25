---
title: "스칼라 도커 빌드하다가 대청소하기"
date: Sat Jun 03 2017 11:00:00 GMT+0900
slug: 2017/06/scala-docker-build
lang: ko
tags: ["docker", "scala", "build-tools"]
---

FROM myobplatform/scala-play 까지 얹었는데도 sbt, scala 버전의 다양함 때문에 parent image 빌드 굉장히 오래 걸린다. build.sbt 파일 하나에 스칼라 버전도 써있고 디펜던시 섹션도 있어서 도커 캐시 완벽히 태우기도 어렵다.

도커를 얹어보면 숨어있던 문제들이 다 드러나서 좋다. 스칼라 툴체인 나아진 거 별로 없네 개똥이다. 기다리다 환장할 것 같으니 집 대청소나 해야겠다 😔
