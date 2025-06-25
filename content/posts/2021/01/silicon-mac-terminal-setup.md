---
title: "Silicon Mac과 터미널 중독"
date: Fri Jan 08 2021 01:30:00 GMT+0900
slug: 2021/01/silicon-mac-terminal-setup
lang: ko
tags: ["silicon-mac", "terminal", "development-tools", "cocoapods"]
---

Silicon CocoaPods ffi 문제를 찾아보니 ffi 문제라기보다 libcurl 바인딩한 ethon > typhoeus가 ffi 하면서 포인터 조작질 하는 부분에서 터지는 느낌이라 CocoaPods core에서 typhoeus 날리고 빌트인 Net::HTTP로 바꿔서 순정을 유지했다. 덕분에 백 년 만에 루비 코드 보면서 반가웠다.

실리콘 맥 쓰다 보니 속도 중독이 심해져서 빌드 느리게 하는 주범인 SwiftyDropbox 날리고 Objective-C 라이브러리로 바꿔서 빌드가 더 빨라졌다. 이제 거지같은 Firebase 패밀리만 날려버리면 더 빨라지겠지!

개발 환경을 모두 Neovim에 tmux로 맞춰두니 창 전환할 일이 없고 버벅임도 없고 메모리도 남아돈다. 싹 다 터미널로 하려고 fzf fd bat 패밀리도 장착했다. fd (find 클론)와 bat (cat 클론)을 만든 David Peter 존잘이다. Rust로 예쁘고 사용성 좋은 터미널 유틸리티를 많이 만든다. 자율주행 쪽 일을 하는 물리학자라는데 미적감각도 좋고 사용성에 대한 이해도 높고 오픈소스도 열심히 한다니!

밀린 회사 일을 거의 다 했다. 이제 주말이 지나기 전에 화상채팅만 만들면 된다...?
