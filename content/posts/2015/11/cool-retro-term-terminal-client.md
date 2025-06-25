---
title: "브라운관 효과를 재현하는 터미널 클라이언트"
date: Sat Nov 28 2015 18:00:00 GMT+0900
slug: 2015/11/cool-retro-term-terminal-client
lang: ko
tags: ["terminal", "cool-retro-term", "qt"]
---

브라운관 효과를 시전하는 터미널 클라이언트 cool-retro-term.

스크린샷에서 느낄 수 있는 볼록함과 뿌연 효과 외에도 동적 효과들이 있으니 그 시절에 터미널 좀 쓰셨다 하는 분들은 묘한 즐거움을 느낄 수 있을 것이다. 번들된 테마가 10여 개쯤 있다.

단, OSX에서 Qt 5.4로 빌드하면 Ctrl 키가 안 먹는 문제가 있어서 vim, tmux 등을 사용할 수 없는데다가 C-d와 C-c마저도 못한다. 이 경우 Qt 5.3으로 빌드하면 잘 된다고 하며 https://github.com/Swordfish90/cool-retro-term/issues/203 빌드하기 귀찮으면 원저자가 작년 말에 dmg 만들어놓은 거 https://github.com/Swordfish90/cool-retro-term/releases/tag/v1.0.0-RC1 쓰면 Ctrl 키 잘 먹힌다.

[깃헙 주소](https://github.com/Swordfish90/cool-retro-term)
