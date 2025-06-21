---
title: "Consumer JRE: Leaner, Meaner Java Technology"
date: Thu May 24 2007 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2007/05/consumer-jre-leaner-meaner-java-technology
lang: ko
tags: ["technology", "java", "consumer-jre", "desktop-applications"]
---

Desktop Java Application 이 RIA 가 될 수 있도록 [Chet Haase](http://weblogs.java.net/blog/chet/) 가 열심히 준비중인 
[Consumer JRE](http://weblogs.java.net/blog/chet/archive/2007/05/consumer_jre_le.html) 가 **2008년 초에 선보인다**고 합니다.

Java SE 6 이 세상에 나온지도 한참 되었지만 아직도 까칠한 사용자들에게 Java로 만들어진 프로그램 설치를 요구하는 것은 어려운 일입니다. 그나마 Windows IE에 [MS JVM](http://www.microsoft.com/mscorp/java/)이 포함되어있던 시절에는 애플릿으로 뭘 하기가 편했었는데.. 요새는 그것마저도 없어졌지요.

2002년에 만들고 거의 업데이트를 안하는 [JMSN](http://jmsn.sourceforge.net/) 를 비롯해 여러가지 자바 swing 어플리케이션들이 고통받고 있습니다. JMSN 요새 로그인 안된다고 생각하시는 분들 많지요? 전 아직도 JMSN 만을 씁니다. 물론 아직도 파일전송 기능은 막혀있지만, 만든 사람이라도 써줘야 프로그램이 덜 슬퍼할 것 같아서요 -_-

**Java SE 6** <- 처음 프로그래밍을 시작한 98년부터 Java의 느린 속도를 체험해 버릇해서 그런지 정말 빠릅니다. 빠르면 뭐합니까 (씨익) 설치가 쉽지 않습니다. 개발자인 저도 가끔 설치에 곤욕을 치릅니다. 하물며 사용자는 어쩌라는건지! JRE 크기도 문제지만 저처럼 귀찮은 것 싫어하는 dummy user (?) 들에게는 여전히 어렵습니다. 

리눅스에서 Java 어플리케이션을 사용하는 것은 아직도 쉽지 않은 일입니다. 
한글 설정.. 왜 이런걸 해야할까요? 저야 우분투에서 JMSN을 사용하는 사람이니 한글 설정이 없이는 어려운 사람중 1人 이니 귀중한 20-30분을 날리며 한글 설정을 하지요. (그런면에서 MacOSX이 자바 지원 젤 잘되는 곳이 아닐까요. UTF-16 의 압박은 빼고요 -_-)
누가 쓰겠습니까! -_- 

잡설은 여기까지- [원문](http://weblogs.java.net/blog/chet/archive/2007/05/consumer_jre_le.html)을 읽기 귀찮은 분들을 위해 Consumer JRE에 대해 제 의견을 섞어 간단히 요약합니다.

아무리 Desktop 환경에서의 Java 가 좋아졌다고 할지라도 엔드유저에게 자바 어플리케이션을 배포하려고 할 때 개발자 입장에서 아래와 같은 문제들이 여전히 남아있습니다.

![](http://weblogs.java.net/blog/chet/images/attack-sm.gif)

```
JRE 감지 - 설치는 되어있나? 버전은 몇인가? 6으로 올려야대나? 그럼 어떻하나?
시작 시간 - 빨라졌다고는 하지만 Cold startup은 눈에 띄게 느리다.
JRE 설치본 크기 - 한국은 괜찮겠지만 그래도 10MB.. 덜덜
설치 시간 - Pack200으로 줄인다 한들 설치할 때 잡아먹는 CPU.. ㄷㄷ 
```

2008년 초에 세상에 나올 Consumer JRE 는 아래와 같은 것들이 개선된다고 합니다. Java 7 에 포함되는 내용은 아니구요, Java 6 Update 로 들어간다고 하니 Consumer JRE를 맞이할 시간이 머지 않았음을 알게 해줍니다.

**[Quickstarter]**
97년 Netscape 에서 Applet 하나 돌리려면.. 제 기억에 40초정도는 컴퓨터가 덜덜덜 거렸습니다. 물론 옛날 얘기이긴 하지만, 최근에도 우리들의 까칠한 사용자들을 만족시키기엔 부족함이 많습니다. 
애플릿 때문에 쾌적한 웹서핑 중 브라우저가 덜덜 거리는 것을 보고 싶은 사용자는 아무도 없겠지요.

JVM 을 시작하는 것은 크게 warm startup, cold startup 으로 나눌 수 있습니다.
요즘의 JVM (Java 6과 같은)은 warm startup 은 아주 빠릅니다. warm startup 이라 함은 시스템에서 한번이라도 jvm 이 실행된 과거(-_-)가 있을 경우를 말합니다. 

warm startup은 정말 빠릅니다. 자바 프로그램이 시작될 때 40메가에 육박하는 rt.jar 를 비롯해서 여러가지 파일을 툭툭 건드려야하지만 한번 실행된 후에는 OS가 disk cache를 해주니 메모리에서 바로 읽어올 수 있기 때문입니다. (이 외에도 몇몇 비기가 들어있긴 하지만)

```
[rath@ns tmp]$ **time** java test http://rath.myid.net
http%3A%2F%2Frath.myid.net

real    0m0.160s
user    0m0.095s
sys     0m0.031s
```

java.net.URLEncoder 클래스로 파라미터로 넘어온 문자열을 urlencode 해주는 프로그램을 P4 2.4G 에서 실행한 결과입니다. JVM 시작시간을 합쳐 0.1초 내에 끝났습니다. 

이것은 현재 시점에서 얻은 Java 프로그램들의 즐거움일뿐인데, quickstarter가 해준다는 것은 뭘까요? 무엇이 cold startup을 피할 수 있게 해준다는 건가요?


> But we can pre-load at some earlier time, such as Windows boot or login time. And we can keep the pages warm in the disk cache as machine and memory conditions allow.


사용자 입장에서는 괜찮겠지만.. 마법을 부리진 않는다는군요. 부팅할 때나 로긴할 때 살짝 살짝 진행하도록 하겠답니다. (씨익)

**[Java Kernel]**

Java Kernel 은 사용자 PC에 JRE가 설치되어 있지 않은 경우에 빛을 발하게 해줍니다.
JRE 다운로드 및 설치 <- 를 도와주는 부분입니다. 이 시간을 엄청나게 줄여준다고 합니다.
응용프로그램 자신이 '어랏 Java 6이 없잖아!' 하면 스슥 다운로드하고 스슥 깔아준다고 합니다.

이게 무슨 완전 소중한 말입니까. 아래 Java Kernel 이 움직이는 순서를 보세요. 정말 아름답지 않습니까?

> Download base functionality that every application needs (VM, garbage collector, security, classloader, and enough basic networking functionality to be able to download the rest of the bits)  
> Download **additional dependencies that this application specifies**   
> Download any "Class not found" exception culprits as needed  
> Download the rest of the JRE in parallel until the entire release exists on the user's system  

**[Deployment Toolkit]**

이 부분은 어떤 형태로 나오게 될지 참 궁금한 부분 중 하나인데, Java, Javascript 다른 브라우저 플러그인들을 감지하는 작업을 훨씬 쉽게 만들어준다고 합니다.
어떤 형태로 나오게 될지 정말 궁금하네요!

**[Installer Improvements]**

이 부분은 별로 관심이 없는 부분입니다. 인스톨러 UI가 좀 더 친숙하게 하고 간단하게 됩니다.
Java Kernel 이 들어가도 전체 JRE를 설치할 일은 여전히 필요할테니 분명 가치있는 일이 되겠지만 
Consumer JRE 의 다른 개선점들에 비하면 확실히 너무 약합니다.

그래서 그런지, 이 부분은 Consumer JRE 가 발표되는 2008년 초가 아닌, 다음달인 6월에 들어간다고 합니다.

**[Graphics Performance on Windows]**

대단히 기대되는 부분입니다. 비교적 큰 GUI 프로그램을 만드는 일이 많지 않아 개인적으로 얻는 기쁨이 크진 않지만, SWT에 밀리기만 하던 swing이 다시 한번 도약할 수 있는 기회가 되기를 희망합니다.


> We are re-writing the default graphics pipeline on Windows to take advantage of Direct3D for performing everything from simple rectangular fills and copies, which is what you get now by default, to translucency, gradients, arbitrary transformations, and other more advanced 2D operations. Swing applications simple and complex should benefit from much better runtime performance on Windows as a result.


[jMonkey engine](http://www.jmonkeyengine.com/) 으로 만들어진 훌륭한 자바 게임들을 보며 다른 세상 이야기처럼 들리기만 했는데, 많은 성능 향상으로 Java 2D 어플리케이션 시장이 더욱 활성화되기를 기대해봅니다.

Swing 만세!!!

**[Nimbus Look & Feel]**

새로운 룩앤필이 들어간답니다. Numbus 좋아하시는 분들에게는 엄청난 희소식이 되겠네요.

![](http://weblogs.java.net/blog/chet/images/nimbus-swingset-1.png)

[Jasper Pott's Blog](http://www.jasperpotts.com/blog/category/nimbus/) 에서 Nimbus LNF 를 좀 더 구경해보실 수 있습니다.
프로그래스바가 인상적입니다.

2008년 초에 Consumer JRE가 발표되기 전에 Desktop 용 자바프로그램 만들기 감각을 다시 찾아야할 것 같습니다. 특히 Java Kernel 너무 좋아요!

## Comments

### 유겸애비
*http://hanjava.net/call-151*
*2007-05-24T22:14:34.000Z*

Consumer JRE는 좋은데 Nimbus는 별로 이쁜거 모르겠어요. 뭐 제가 디자인을 논할 처지는 아니지만 말이죠..^^ 근데 개인적인질문인데 작티는 어떤가요? ^^

---

### rath
*http://xrath.com/*
*2007-05-24T22:59:31.000Z*

유겸애비님 안녕하세요. 저도 Nimbus 룩앤필은 뭐가 이쁜지 잘 모르겠더라구요.
꼭 예뻐서라기보다 JRE에 기본으로 장착(?)되는 룩앤필이 많아지는 것으로 만족하고 있답니다. 이 룩앤필이 들어가서 JRE가 더 커지는 문제가 있겠지만요 ^^;

작티 <- 아주 좋아요. 일반 디카에 옵션으로 껴있는 동영상과는 확실한 화질 차이가 있습니다. 얼마전에 HD2 가 나왔는데 제가 사용중인 것은 HD1a 거든요.
1280x720 은 신뢰할만한 퀄리티는 아니지만, 640x480 60fps 같은 경우 괜찮습니다. 무엇보다 휴대가 간편하다는 장점이 있습니다 ^^

---

### ddt
*http://me2day.net/roald*
*2007-05-25T00:15:54.000Z*

오 흥미진진해요 ㅎㅎ 원문은 안 읽어봐서 그런데  java kernel이라는 건 사용자가 다운로드해서 설치해야 하는 건가요?

---

### rath
*http://xrath.com/*
*2007-05-25T00:32:11.000Z*

사용자에게 다운로드 해야할 의무(?)를 주진 않을거라고 생각합니다. 
그보다는 만들어진 자바 프로그램을 deploy 할 때.. 현재처럼 .jar 형식이 아니지 않을까요? OS specific kernel downloader와 같은 형태가 아닐런지 모르겠습니다. 

그랬으면 좋겠어요~ ㅎㅎ

---

### pistos
*http://pistos.myid.net/*
*2007-05-26T16:00:40.000Z*

Java application 안만든지 어언 5년.. ;; 
갠적으로 metal 보다는 nimbus가 훨 맘에 드는 스타일이넹-
언젠가는 다시 만질수도 있으니 관심만 ^^

---

### rath
*http://xrath.com/*
*2007-05-29T01:57:22.000Z*

헛.. 벌써 5년이나 지난건가요 ;ㅁ; 
오래 쓰다보면 또 어떻게 변할지는 모르겠지만.. 
맨날 보던거 보다가 새로운 거 나와서 그런지 산뜻한 기분이 들더라구요 ㅎㅎ

---

### 아유대디
*http://px.tistory.com*
*2007-06-02T14:10:26.000Z*

멋진 포스팅이네요..

---

### rath
*http://xrath.com/*
*2007-06-02T23:27:29.000Z*

제 친구랑 이름이 같으시네요 :^)
Consumer JRE가 빨리 나왔으면 좋겠습니다 ^_^

---

### kfmes
*http://blog.kfmes.com*
*2007-06-08T08:31:09.000Z*

자테온 swing 시절당시 가장 치명적인 문제가, 리눅스에서는 한글폰트설정을 해줘야된다는 것이었죠

---

### rath
*http://xrath.com/*
*2007-06-11T05:41:49.000Z*

SWT는 원활하게 돌아가는거에요? 리눅스에서 SWT 써본 기억이 별로 없어서 잘 모르겠네요 ㅎㅎ 된다면.. 정말 대부분의 장난감들 만들 플랫폼으로 SWT 옮겨타볼까도 싶네요 ;)

---
