---
title: "Discord가 RN 개발자를 까는 건 아니겠지만"
date: Thu May 28 2020 11:37:00 GMT+0900
slug: 2020/05/discord-rn-rust-thoughts
lang: ko
tags: ["discord", "rust", "go", "react-native"]
---

Discord 서버를 Go에서 Rust로 바꾼 썰 푸는 걸 재밌게 읽어서 다른 글도 읽어봤는데 충격을 받았고 꽤 실망했다. 저자가 의도했을 리는 없겠지만 RN 개발자들 까는 글이 된 느낌이다. RN 잘 쓰면 네이티브에 비해 성능상 안 꿀린다!를 말하고 싶었던 것 같은데 세부 내용을 읽어보면 "어떻게 저런 것도 신경 안 쓰고 막 릴리즈하고 운영했던 거지?" 정도의 느낌이다. 자바스크립트에서 정규식 개념 없었던 것도 놀라웠지만 중간에 Flux Store 최적화라 써놨는데 그냥 충분한 이해 없이 막 만들어서 이상해진 거잖아... 😔 어찌 보면 RN 극찬 글인 게 대강 짜놔도 서비스 운영에 큰 문제가 없다는 얘기가 된다.

그래서 Discord 프론트는 이제 관심이 없고 백엔드만 맘에 든다. 지난주부터 아무 이유 없이 Rust 귀신이 붙어서 계속 Rust만 보고 있다. 회사 일은 지금도 동접 100명도 안 돼서 장고로 막 만든 서버도 맨날 노는데 왠 Rust.. 라지만 개발자가 나밖에 없으니 결국 저지를 것만 같다. 매일 기획팀이랑 일하면서 운영 툴과 Flutter 작업만 하느라 파이썬 코드 볼 일이 없다. 가끔 보더라도 몇 글자 치고 끝나니 이젠 코드가 잘 기억나지도 않아서 맨날 grep으로 모듈 찾아서 한다. 이러다 백엔드 다 까먹을지도 몰라. 러스트를 얹어서 백엔드에 시간을 많이 써야겠어.. 😋
