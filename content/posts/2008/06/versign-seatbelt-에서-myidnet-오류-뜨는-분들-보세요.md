---
title: "Versign Seatbelt 에서 myID.net 오류 뜨는 분들 보세요"
date: Sun Jun 01 2008 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2008/06/versign-seatbelt-에서-myidnet-오류-뜨는-분들-보세요
lang: ko
tags: ["openid", "firefox-extension", "security", "certificate"]
---

Firefox Extension 인 [Versign Seatbelt](https://pip.verisignlabs.com/seatbelt.do) 에 myID.net 프로바이더를 사용중이신 분들은 지난 5월 28일부터 아래와 같은 스크립트 창에게 괴롭힘을 당하셨을겁니다.

![](/img/seatbelt_cert_error.jpg)

이 문제는 myID.net 웹사이트 인증서가 5월 28일에 새로 갱신되었기 때문인데, 5월 28일 이전에 myID.net 를 seatbelt 에 등록하신 분들은 **설치 당시의 인증서 SHA1Hash를 가지고 있기 때문**에 생기는 문제입니다.

물론 myID.net 사이트 인증서와 [seatbelt config 파일](https://www.myid.net/seatbeltcfg.xml)의 SHA1Hash는 정상적으로 갱신된 상태이지만(제 불찰로 뒤늦은 6월 2일 오전 1시에 갱신되었습니다.), Seatbelt 가 각 프로바이더의 config 파일을 사용자 브라우저 영역에 cache 하고 있기 때문에 자동적으로 갱신되지 못하고 아래와 같은 귀찮은 작업을 해주셔야 합니다.

1. SeatBelt 설정의 **OpenID 제공자** 탭에서 설치되있던 myID.net 을 제거

2. 하단 **제공자 추가** 에 https://www.myid.net/ 를 입력하여 OpenID 제공자 다시 추가

사용자 브라우저에 설치되는 extension 이니 성능상 local 에 cache 하는 게 자연스러운 행동이긴 하지만, 1~2년 마다 인증서를 갱신하는 환경에서 cache 가 얼마나 안좋은 것인지 알게 되는 그런 경험이었습니다.
