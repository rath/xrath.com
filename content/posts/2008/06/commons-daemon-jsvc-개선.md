---
title: "commons-daemon jsvc 개선"
date: Thu Jun 19 2008 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2008/06/commons-daemon-jsvc-개선
lang: ko
tags: ["java", "linux", "daemon", "native-integration"]
---

첫 회사를 다닐때부터.. 리눅스에서 Java 프로세스 띄울 때 setproctitle 도 먹게 하고 싶기도하고
/etc/init.d/named start|stop 처럼 Java 로 만들어진 데몬들을 제어하고 싶었다. 

예전 xrath.com 서버에서 invoker 란 이름으로 자그마한 개인프로젝트를 했었는데, 이녀석은 JNI로 CreateJavaVm 을 실행하고 요짓죠짓을 하는 녀석으로 윈도우면 서비스에 등록하고 start/stop 시그널을 받게 하는 거였고 (한창 resin 2.0 시절에 -install 옵션을 주면 설치되는 멋진 모습도 기억이!) 리눅스면 sigint sigterm sighup 같은 것을 처리하..지는 못하고 그저 jvm 을 실행해주는 native executable을 빌드해주는 정도였다. 

이 프로젝트의 가장 큰 문제점은 native executable로 만들 프로그램이 돌 시스템에 컴파일 환경이 구축되어있어야 한다는 것이였다.  필요한 클래스패스나 JVM 옵션들을 설정파일로 빼두긴 했지만 c 코딩이 똑바로 안되던 시절이였기 때문에 필요한 프로젝트 프로퍼티들을 c 코드 템플릿 내에 쳐박고 cl.exe 나 gcc 로 고고싱하는 지금 생각해보면 참 무서운 ;; 녀석이다. 

하지만 윈도우즈 서비스 목록에서 Java Launcher <- 라고 나오면 참 자존심 상하지 않겠는가!
Super Fantastic Chatting Server <- 이렇게 등록하고 싶단 말이였다;; 

암튼 서론은 끝

미루고 미루다 본 [apache jakarta commons daemon 의 jsvc](http://commons.apache.org/daemon/jsvc.html)

나름 괜찮은 feature들을 가지고 있지만, 아쉬운 점들이 꽤나 있다.
jsvc의 아쉬운 부분들을 어느 분이 [친절히 설명해준 페이지](http://home.thatbox.net/~k4thryn/code/jsvc.html)도 있다. 요약하자면,
jsvc 를 실행시킬 때, 절대 혹은 상대경로로 지정하는 것만 가능하다. **PATH에만 있으면 안된다!** 예를 들어 jsvc가 /usr/local/bin 에 있고 현재 디렉토리는 /home/rath/work/xxx 라면 jsvc 가 동작하지 않는다. - jsvc 를 실행하려면 root 권한이 필요하다 -_-- 옵션 -errfile 을 지정하지 않으면 모든 에러메시지들이 /dev/null로 날아가버린다 (이건 뭐.. 지정하면 되지 까탈스럽기는)

하지만 jsvc는 **자바 프로그래머에게 sighup 과 sigterm을 처리**할 수 있게 해준다!!
그래서 jsvc native c 코드를 좀 건드려서 해결했다.

첫번째 문제는 실행시킨 프로세스를 detach 하는 용도로 [execve](http://docs.sun.com/app/docs/doc/816-5167/6mbb2jaf1?l=ko&a=view)를 쓰고 있어서 생기는 문제인데 [execve](http://docs.sun.com/app/docs/doc/816-5167/6mbb2jaf1?l=ko&a=view)의 첫번째 파라미터가 pathname이다. filename이 아니라는 점. 그러니 터미널에서 PATH 에 잡아놨다고 좋아라~ 하고 jsvc -cp xxx test 하면 execve 에서 에러 -_-.
environ을 넘기려고 ve을 쓴 거 같은데, 유연성보다는 편리성을 택하기로 하고 execvp 로 교체하여 해결.

두번째 문제는 비교적 간단히 해결했다. jsvc 실행옵션 중 -user 가 있는데 문제가 -user 값이 넘어오지 않았을 때도 set_cap 을 쓴다. 그저.. user value 가 NULL 일 때는 set_cap 질하는 펑션 모두를 호출하지 않도록 바꿔버렸다.

세번째 문제는.. 사실 별 문제도 아니라고 생각하는데, -outfile -errfile -pidfile 옵션을 주지 않았을 때 디폴트로 현재디렉토리에 stdout.txt stderr.txt pid 란 이름으로 파일을 생성하도록 바꿨다.

마지막으로 [jsvc 문서](http://commons.apache.org/daemon/jsvc.html)나 jsvc -help 에는 나와있지 않은, setproctitle!

리눅스에서만 쓸 거라면 기냥 argv[0] 건드리면 될텐데 왜 proctitle 고치는 게 없을까? 해서 소스코드를 살펴보니 -proctitle 옵션이 있다! 그런데 무슨 이유인지 옵션처리 if else 에서 골키퍼 else 부분 밑에 코딩되어있다. 뭔가 문제가 있어서 막아두었나 보다. 아무튼 가볍게 copy and paste 하여 활성화했다.

그런데 proctitle에 약간 문제가 있다. 보통 jsvc로 실행하려면

jsvc -cp commons-daemon.jar:my.jar -pidfile my.pid -proctitle MyRomanticDaemon com.xrath.romantic.Launcher 

라고 입력하는데 -proctitle 옵션에 MyRomanticDaemon 이라고 입력해봐야 ps 에는

MyRomanticDaemon -cp commons-daemon.jar:my.jar -pidfile my.pid -proctitle MyRomanticDaemon com.xrath.romantic.Launcher 

이렇게 나온다는 것 -_-
안이쁘잖아요 ToT

단순히 argv[1] = NULL 이 안먹히는 걸 보니 Unix C는 어려워 어려워 :'(
이 문제가 해결되면 jsvc-src/native/jsvc-unix.c 랑 jsvc-src/native/arguments.c 의 패치파일을 공개할 생각인데, 아직 argv[1] 이하가 안지워져서.. 부끄러워서 공개는 못하고 있다.

욕심같아서는 [commons-daemon 자바 인터페이스](/devdoc/jsvc/)에 setProcTitle 메서드가 있어서 현재 데몬 상태(proctitle)를 동적으로 바꿔서 sendmail처럼 ps 에서 확인할 수 있게 하는 것인데 JNI 브리지 새로 만들어야하니 천-천-히 해볼 생각.

## Comments

### 다즐링
*http://iz4u.net/blog/*
*2008-06-22T14:16:18.000Z*

....  이.. 이런... ( 생략 )

---

### neonatas
*2008-06-24T11:01:22.000Z*

뭐한다는건지.. 반은 살짝 알겠고.. 반은 모르겠고.. 암튼 뭔가 무시무시한것 같다.

---

### rath
*http://xrath.com/*
*2008-06-24T12:03:31.000Z*

neonatas// 시스템 프로그램들이 다 그렇지 뭐 (...)

---

### rath
*http://xrath.com/*
*2008-06-24T12:04:08.000Z*

다즐링// 쩜쩜쩜...

---
