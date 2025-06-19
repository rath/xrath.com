---
title: "Java 6 Mustang에서 Splash 화면!"
date: 2005-10-01
slug: 2005/10/java-6-mustang에서-splash-화면
lang: ko
---

요새는 JRE가 무진장 빨라져서 큰 이펙트는 없겠지만, jdk 1.6인 mustang에 splash-screen 기능이 들어갔다. 확 JMSN에 Splash screen만 넣어서 릴리즈 해버릴까보다 -_-;

이 글은 Sun 아티클 기반으로 작성된 것이며, 원문은 [여기](http://java.sun.com/developer/technicalArticles/J2SE/Desktop/mustang/splashscreen/)서 읽어볼 수 있다.

Splash 화면은 프로그램이 시작되고 있다는 것을 사용자에게 알려주고 피드백하는 것이 목적이지만, 자바는.. JVM도 띄워야하고.. swing, awt 클래스 라이브러리도 올려야하고.. 여러가지 라이브러리를 올린 다음에야 삐질삐질 Splash 화면이 나오는데 이러면 그다지 의미가 없지 않은가! (번역만 해놓는것 같은 기분이 ㅡㅡ)

그러나 Mustang에서의 Splash 화면은 JVM이 초기화도 되기전에 보여질 수 있다!

**java -splash:melong.gif AppMain**

아니면 Manifest 파일에 SplashScreen-Image: 어쩌구.png 해도 된단다.
이렇게 하면 Splash 화면이 짠~ 하고 뜬 다음에, 개발자가 만든 첫번째 Window 가 뜨는 순간 사라진다.

물론 재미없는 이미지 한장짜리 Splash 화면은 매우 지루하고 지겨울수 있다.
이를 위해 java.awt.SplashScreen 클래스를 이용하여 동적으로 Loading 프로그래스바를 그려줄수도 있다. 와아아 이렇게 편할수가! 

[http://download.java.net/jdk6/docs/api/java/awt/SplashScreen.html](http://download.java.net/jdk6/docs/api/java/awt/SplashScreen.html)

자세한 것은 위의 SplashScreen apidoc 을 보거나 Sun의 아티클을 참조하면 된다.