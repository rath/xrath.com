---
title: "Tiger로 프로젝트 개발하기"
date: Sat Oct 02 2004 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2004/10/tiger로-프로젝트-개발하기
lang: ko
tags: ["java-5", "tiger", "generics", "programming"]
---

Java 5 (1.5)가 정식 릴리즈 된지도 이제 한달이 지났다.
베타버젼이나 RC 버젼에서 보이던 VM 주저앉는 버그들도 다 잡혀진것 같다.

Tiger(Java 5)는 정말로 매력적이다. 자바 개발자들을 정말 편하게 해준다.
static import나 Auto boxing/unboxing 은 중독성이 매우 강하게 느껴진다.
generics.. foreach.. 아아 정말 옴팡지게 매력적인 도구가 아닐 수 없다.

Generics들은 분명히 컴파일 타임에 이루어지는 것이다. VM 레벨에서의 
변화는 없다고 말했다. 
고로 코드가 아무리 옴팡지게 매력적으로 편리하게 구현되더라 하더라도 
런타임에 더 느려지거나 빨라지는 일은 결코 일어나지 않는다는 것이다.

**그/런/데**

jdk 1.5 에서 컴파일한 클래스는 결코 1.4 이하의 VM에서 돌아가지 않는다.
예를들어 MS JVM 기반의 Applet을 개발하는 사람이 1.4 컴파일러를 가지고
있거나, SK-VM 등의 MIDlet 기반의 어플을 1.4로 컴파일하려 한다면..

*javac -source 1.4 -target 1.1 ...*  
*javac -source 1.2 -target 1.1 ...*

이런식으로 써주면 **매우** 잘 돌아간다. 
(물론 1.1에 없는 클래스를 사용했다면 이 사람은.. 땅에 묻어버리자)

그렇다면 Generics를 사용하더라도 *-source 1.5 -target 1.4*를 준다면
실행되지 않을 이유가 없다. Generics는 분명히 VM의 변화가 아니라 컴파일러의
변화이기 때문이다. 근데.. 아직 안된다.

아.. 왜 1.4 이하의 VM을 사용하려고 하느냐고?
그렇다. 난 Tiger VM을 신뢰한다. 그렇지만.. 당신 회사 사장이나 PM은 
테스트 되지 않은 VM을 프로젝트에 투입하는 것을 꺼려할 것이며 ㅡ_ㅡ
애플릿이나 웹스타트 개발자들은, 사용자들의 VM 버젼을 선택할 수 없다.
(라고 보통 말하더라 -.-)

그래, 인간적으로 나 Tiger 두루두루 쓰고 싶다.
그래서 *-source 1.5 -target 1.4*를 써봤다.

$ javac -source 1.5 -target 1.4 Test.java
javac: source release 1.5 requires target release 1.5

이런 개 어처구니를 엿바꿔먹은 경우를 봤나..
혹시나 싶어서 아래와 같은 짓도 해봤다.

```
$ javac -source 1.4 -target 1.4 Test.java
Test.java:1: static import declarations are not supported in -source 1.4
(try -source 1.5 to enable static import declarations)
import static java.lang.System.*;
       ^
Test.java:10: generics are not supported in -source 1.4
(try -source 1.5 to enable generics)
                ArrayList list = new ArrayList();
                         ^
Test.java:15: for-each loops are not supported in -source 1.4
(try -source 1.5 to enable for-each loops)
                for(String s:list)
                            ^
3 errors
```

도대체 어쩌라는 거냐..

Sun Forum을 뒤지다가 Hidden option을 찾았다.

$ javac -source 1.5 -target jsr14 Test.java
$ 

오 된다.. 이 옵션을 찾아낸 Sun forum의 [vortex1111vortex](http://forum.java.sun.com/profile.jsp?user=194676)님 대단하시다.

그러나 저 옵션은 클래스 매직넘버링을 1.4로 하기 때문에 역시 1.3에서는 안돈다.
아무튼 Generics, static imports, foreach 등등 다 잘 돌아간다. 
게다가 Sun 에서 공식적으로 지원하는 옵션이 아니니, 언제 사라질지도 모른다.

Forum을 헤매이다가 [Retroweaver](http://retroweaver.sourceforge.net)라는 염통이 발랑거리는 오픈소스 툴을 발견했다.
이 녀석은 1.5 컴파일러로 컴파일된 **class 파일들**로부터 1.2~1.4 VM에서 하위호환성을 가지도록 클래스 파일을 고쳐주는 툴인것이다. 아아 기분을 콜롬비아스틱하게 해준다.

이 녀석이 해주는 일은 아래와 같다.

1.4 VM 이하에서 지원하지 않는 식별자인 +를 $로 변경
JVM Instruction LDC, LDC_W를 CONSTANT_Class로 변경
접근지정어 비트들을 예전것으로 변경
String에 + 연산자를 썼을때 StringBuilder로 바뀌는 것을 StringBuffer로 변경
Auto boxing/unboxing 런타임 클래스 연결
Enum 런타임 클래스 참조 변경 (com.rc.retroweaver.runtime.Enum_)
foreach를 위해 Iterable 참조 변경 (com.rc.retroweaver.runtime.Iterable_)
기타 자잘..

위 목록을 보면 Generics에서 필요한 Runtime 클래스들을 retroweaver에서 
제공하며 기존 코드의 1.5 클래스들에 대한 참조를 weaving 할때 retroweaver 자체의
것으로 변경함을 알 수 있을 것이다.

그리하여.. retroweaver.jar 파일을 함께 deploy 하여야 한다.
**26,817** 바이트인데, 압축을 풀어보면 Runtime 시에 불필요한 파일이 많다.
꼭 필요한 파일인 AutoBox.class, ClassLiteral.class, Enum_.class, Iterable_.class
를 따로 떼어 jar로 묶으면 **5,604** 바이트까지 줄일 수 있다.

5K 라면 부담없이 MIDP, JVM 1.1기반 Applet 등에 다 써먹을 수 있다.
Iterable이나 Enum 안쓸꺼면 runtime에서 더 뺄 수도 있다. -ㅁ-

이제 맘놓고 Tiger 써야겠다!
