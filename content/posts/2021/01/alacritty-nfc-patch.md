---
title: "샤이니가 ㅅㅑㅇㅣㄴㅣ로 보일 때"
date: Wed Jan 06 2021 00:45:00 GMT+0900
slug: 2021/01/alacritty-nfc-patch
lang: ko
tags: ["alacritty", "rust", "unicode", "nfc"]
---

회사 일로 인스타그램 API 작업을 하는데 GraphQL 반환 값의 한글 자소가 분리되어 있고 Alacritty는 다른 터미널들 다 지원하는 NFC 지원을 안 해서 샤이니가 ㅅㅑㅇㅣㄴㅣ로 보여 빡치는 것이다. 깃헙 이슈에 서너 개의 요청이 있었지만 메인 개발자가 수년째 거부하고 있길래 러스트 연습할 겸 패치를 했다. 코드는 아직 맘에 안 들지만 잘 돌아간다.

[Commit 1fca332](https://github.com/rath/alacritty/commit/1fca332c4fbb07634a4063cdb77be62e257ac9a3?branch=1fca332c4fbb07634a4063cdb77be62e257ac9a3&diff=unified&fbclid=IwY2xjawLJC8tleHRuA2FlbQIxMQBicmlkETBCNVJYZGdpSncxSVBGb25QAR4GjWpprKh2BaUKdPc8yk-C8ouWHA3BpqK6hqW-aTrZC61l-RrnwOYJhPIUew_aem_W3POZyGqI0_lXJ3POsXLEg)
![](/img/alacritty-nfc-patch.jpg)

아 진짜 회사 일 해야 되는데,,
