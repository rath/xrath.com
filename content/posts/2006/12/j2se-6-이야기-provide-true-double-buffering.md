---
title: "J2SE 6 이야기 - Provide true double buffering"
date: 2006-12-03
slug: 2006/12/j2se-6-이야기-provide-true-double-buffering
lang: ko
---

제목에서 알 수 있듯이 '그럼 여태까진 구라 더블버퍼링이였단 말이냐? :@'를 나타낸다.

mustang(b32 - 윈도우즈, b48 - 솔라리스, 리눅스)에서 적용됐다니 지금 배포되는 RC에선 물론 포함된 것이다.
swing application 위에서 창들을 미친듯이 드래그하면 회색부분이 많이 보인다.
자바 어플리케이션들을 무겁게 보이게 하는 키-포인트였다.

이거 한 줄로 짧게 표현되기에는, client side에서의 자바 프로그램들의 입지를 확 늘려줄 수 있는 개선사항인 것 같다. [Scott Violet](http://weblogs.java.net/blog/zixle/archive/2005/04/no_more_gray_re_1.html)의 블로그를 보면 더욱 감동이다.

Scott violet의 포스트 제목이 "Swing Painting Improvements: No more gray rect!" 다. 점점 스윙 프로그래머 살만한 세상이 되나보다. 

The fix involved adding true double buffering support to Swing. That is, each window will now have an off-screen image that is kept in sync with the on-screen image. When a window is exposed we copy directly from the off-screen image, on the toolkit thread, to the screen. That's it! Your application will no longer see paint events in this scenario!

그래! 카피 다이렉트!

사실 bug 데이터베이스 내용을 보고 위 내용에만 기뻐했는데, scott violet 글을 읽다 더 충격적인 것 발견.

An added bonus of this fix is that if your application is blocking the event dispatch thread, say you're contacting a server and a user hides your window and exposes it the app will still paint. Nice!

내가 이거 피하게 하려고 스레드질 얼마나 했었는데 :(
정말 J2SE 6부터는 swing 프로그래머, 이제 어디가서 안꿀릴거다.

Scott Violet. 이런 분이 swing 을 개선할 권한이 있으니 더 좋아질 거 같다.
블로그에서 그의 소개글이다. Cocoa의 정신을 가지고 계실테니.. ㅎㅎ

Scott Violet has been in the Java client group at Sun for over eight years. He started out at Sun in the OpenStep group (what is now Cocoa), and then joined the Java Software group working on Swing. He has helped with Java Web Start, NetBeans, and Glow. Today he is the architect for Swing and has been working on the project since long before the 1.0 release.

[RFE 4967886: Swing should provide full double buffering per window ](http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4967886)
