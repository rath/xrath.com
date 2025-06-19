---
title: "Jython auto completion 구현하다"
date: 2005-01-16
slug: 2005/01/jython-auto-completion-구현하다
lang: ko
---

[Jython](http://www.jython.org) interpreter에 tab auto-completion 기능 구현! 및 gnu-readline 연동

[서문]
20시간동안 쉬지않고 Telnet(RFC854, RFC855, RFC857, RFC858, RFC859)을 구현하고 ANSI와 싸우다보니 어제 블로그를 남긴 이후로 컴퓨터 앞에 그대로 앉아있다. 자기위해 따스한 물로 샤워를 하니 몸과 마음이 개운해지는것 같다. 그러다보니... 지난 12월 21일에 작업한 Jython auto-completor 내용을 아무데도 업데이트 안했다는 사실을 알았다!

그렇다.. 사실 나 지난달 12월 22일에 데스크탑 하드날렸다 ㅡㅡ;
충격이 이만저만이 아니여서.. 머리속이 또 리셋되었던 것이다.

[본론]
각설하고... 지난 12월 21일경, 열심히 IRC를 하고 있던중 때마침 gnu-readline을 자바에서도 쓸 수 없을까.. 하는 얘기가 돌고 있었다. 오호라.. 그래 jni로 wrap해서 꿀꺽해버릴까~ 했었는데 우리의 신 [Google](http://www.google.co.kr) 님께서 gnu-readline을 wrap 해놓은 [java-readline](http://java-readline.sourceforge.net/) 의 존재를 가르켜주셨다. (Linux, Solaris를 지원하고 Windows는 지원하지 않음!)

요새는 검색만 해도 필요한게 다 나와있는 세상이 맞았다. (java telnet 쪽은 안그렇더만 -_-) 
그리하여 "그럼 이제 java-readline을 jython에 적용만 시키면 되겠지" 하고 생각하려던 순간, java-readline 홈페이지의 "Projects using Java-Readline"을 보았더니.. 헉 "Jython" 이 떡하니 적혀있는 것이다.
후다닥 Jython 코드내에서 Readline 쓰는 부분을 찾는도중 nohmad 님이 jython registry 파일안에

python.console=org.python.util.ReadlineConsole
python.console.readlinelib=GnuReadline

만 적어주면 적용된다는걸 찾아내셨다.
좋다.. 테스트 해보니, 인터프리터에서 그냥 엔터치면 null error가 나오는 버그가 있긴했지만, 즐거운 방향키로 이전 입력한것 찾기 같은것도 잘 되었다!

근데.. auto completion이 안된다.
분명히 java-readline은 org.gnu.readline.ReadlineCompleter 라는 클래스를 제공하고 있는데!!! Jython 에서는 그게 안되는 것이다.

[결론]
삽질이 시작되었고 jython에 적합하도록 auto completor를 구현하고 기존 버그수정 및 테스트하는데 성공하였다. 결국 짠!

rath@gentoo rath $ jython
Jython 2.1 on java1.4.2_06 (JIT: null)
Type "copyright", "credits" or "license" for more information.
>>> import sys
>>> sys.s 
font-style: italic;">sys.setClassLoader  sys.settrace        sys.stdin
sys.setprofile      sys.stderr          sys.stdout
>>> sys.set 
font-style: italic;">sys.setClassLoader  sys.setprofile      sys.settrace
>>> sys.set

유후~

[사용법]
1. [jython](http://www.jython.org) 을 받아 설치한다.
2. [java-readline](http://java-readline.sourceforge.net) 을 받아 설치한다.
3. 내 [Projects](/projects/) 메뉴에서 jython-completion.jar 을 받는다.
4. jython의 registry 파일을 열어 마지막 부분에 다음과 같이 입력한다
python.console=rath.ExtendedReadlineConsole
python.console.readlinelib=GnuReadline
5. jython을 실행시키는 shell script 파일을 연다.
- libreadline.so 파일이 있는 위치를 -Djava.library.path=/usr/lib 형식으로 추가한다.
- libreadline-java.jar 파일을 classpath 에 추가한다.
- jython-completion.jar 파일을 classpath 에 추가한다.
6. 저장하고 jython 실행!

import sys 를 입력한 뒤,
sys. 까지만 입력하고 TAB을 강하게 눌러보잣!

## Comments

### nohmad
*2005-01-17T09:58:04.000Z*

덕분에 잘 쓰고 있습니다. Jython 프로젝트에 패치 보내신다고 하지 않으셨었나요? ChangeLog에서 rath님 이름을 보고 싶어요~

---

### rath
*http://xrath.com*
*2005-01-19T00:11:51.000Z*

그 날 패치 보냈었는데 소식이 없어요~;

---

