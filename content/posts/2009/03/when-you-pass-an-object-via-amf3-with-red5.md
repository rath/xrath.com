---
title: "When you pass an object via AMF3 with Red5, be careful."
date: 2009-03-15
slug: 2009/03/when-you-pass-an-object-via-amf3-with-red5
lang: ko
---

Flash나 Flex를 프론트 엔드로 쓰는 네트워크 프로그램을 개발한다면 Red5를 사용해볼 것을 추천한다. Red5는 FMS(Flash Media Server)의 자바 구현체이며 오픈소스이다. 많은 사람들이 red5를 오디오나 비디오를 스트리밍할 용도로 많이 사용하고 있는데, 나는 그런 것에는 별로 관심이 없고 그저 AMF를 쓸 수 있기 때문에 사용한다.

AMF는 Active Message Format의 약자이며 위키백과 페이지에서 볼 수 있듯이 대부분의 언어에서 사용할 수 있도록 오픈소스로 개발된 라이브러리들이 많다. AMF는 그저 serialize 포맷의 하나다. Java의 ObjectOutputStream/ObjectInputStream, ruby의 marshal load/dump 처럼 ActionScript 에서 int, string, array, dictionary, object 들을 serialize 하는데 사용하는 것이다. 그나저나 Flash 9 부터 포함되기 시작한 성능 좋은 AVM2 위에서는 AMF3가 들어갔는데 이전 버전의 AMF(version 0)보다 빨라졌다. (AMF1 이나 AMF2 같은 것은 존재한 적이 없다.)

아래 James Ward의 벤치마크 결과는 text based format과 binary based format 과의 치사한 비교이긴 하지만, 괜시리 내 마음을 끌기에는 충분했다.

![](http://www.jamesward.org/wordpress/wp-content/uploads/2007/12/blazebench.jpg)

아이고 치사하다. 아무튼 Red5에서도 AMF3를 지원하므로 POJO를 flash side로 보낼 수 있다.

```java
	package a.b.c;
	
	import java.io.Serializable;
	import java.util.List;
	import java.util.Map;
	
	public class Melong implements java.io.Serializable {
	 private String a;
	 private String b;
	 private List<Integer> c;
	 private Map<Integer, String> d;
	 public String getA() { return a; }
	 public String getB() { return b; }
	 public List<Integer> getC() { return c; }
	 public Map<Integer> getD() { return d; }
	}
```

물론 getter/setter 메서드들은 만들지 않아도 된다. 그저 public variable들만 선언해도 무난히 전송된다. Flex의 NetConnection으로 객체를 집어 던질때처럼 registerClassAlias 같은 것으로 등록해줄 필요도 없다. 대신 이 객체를 받아먹을 flex 사이드의 클래스 선언 위에 살포시..

```java
	package qqq.www.eee {
	 **[RemoteClass(alias="a.b.c.Melong")]**
	 public class Melong {
	 ...
	 }
	}
```

RemoteClass alias로 red5 사이드의 fqdn을 넣어주기만 하면 된다.

그런데 오늘 포스팅의 목적은 이것이 아니다.  **메서드 하나 잘못 추가했다가 패닉할 수 있다.** 자, 여러분이 서버 사이드에서 사용할 목적으로 d Map의 모든 values를 뽑아오는 유틸리티 메서드를 만들었다고 치자. 구현은 다음과 같을 것이다.

```java
	public class Melong implements java.io.Serializable {
	 [생략]
	 private Map<Integer, String> d;
	 public List<String> getAllValuesFromD() {
	 return new ArrayList<String>(this.d.values());
	 }
	}
```

이렇게 getAllValuesFromD 란 메서드를 구현한 다음, 이 객체를 flash에 전송해본다. 어랏. 이상한 예외가 발생하네 -_-?

```java
org.red5.server.net.rtmp.codec.RTMPProtocolEncoder - Error encoding object:
java.lang.NullPointerException
at org.red5.io.object.Serializer.serializeField(Serializer.java:317)
at org.red5.io.amf3.Output.writeObject(Output.java:483)
at org.red5.io.object.Serializer.writeObjectType(Serializer.java:274)
```

거참, 불친절하기도 하다. NullPointerException이 발생했다는데 힌트가 하나도 없다 stacktrace 최상단을 보면 serializeField 란 메서드에서 났다고 한다. 허허.. 요즘 세상에 기본 컬렉션이나 primitive type들도 serialize가 안되는건가. ㄱ- 게다가 이 오류가 발생하면 flex side에 어떠한 신호도 보내주지 않아 로그를 주시하고 있지 않았다면 더욱 황당한 일일 것이다.

이것때문에 1시간 넘게 삽질에 삽질을 거듭했었다. 원인은.. red5의 미숙한 배려였다. 필드를 전송할 때 reflection api로 get으로 시작하는 모든 메서드를 불러와서 get을 떼고 나머지 문자열의 맨 앞 글자를 대문자로 만든 뒤 getField를 해서 null check **없이** 다음 프로세스를 처리하는 것이다. 만약 getD() 라는 메서드를 서버 사이드에 구현해뒀다면 getD의 실행결과가 amf3로 전달될 것이다. 하지만 getAllValuesFromD 메서드를 구현한 뒤에는, 황당하게도 어떠한 메시지도 없이 위와 같은 예외를 뱉어버린다. encoding object에 null pointer exception 이라니.. 개발자로 하여금 serializable을 다시 확인하게 하기만 한다.

절대로 절대로 유틸리티성 메서드를 AMF로 전송할 클래스에 선언하지 마라.

이 오류를 뱉는 것은 red5 0.8RC1 포함한 이전 버전에서만 생긴다. 물론 svn trunk를 이용하면 이 오류가 발생하지 않는다. (지금은 RC3 까지 나온 상태이다) 하지만 깔끔하게 처리된 것은 결코 아니다. 오늘 svn update 한 red5 에서 실행해본 결과 값을 잘 전달하고, red5는 어떠한 오류도 뱉지 않지만 flex side에서 오류가 발생한다. flex의 Melong 클래스에 allValuesFromD 란 **필드가 없다**고. 이것은 당황스럽게 보일 수 있겠지만 대단히 편리한 수단이 될 수도 있다. 만약 Melong 플렉스 클래스에 public var allValuesFromD:Array 를 선언해뒀다면 서버 사이드의 getAllValuesFromD **메서드 실행 결과가 allValuesFromD:Array 필드에 바로바로 박혀**주기 때문.

이 사건을 긍정적으로 살펴보면, 모델 클래스에는 절대로 로직 넣지 말라는 조언 정도로 볼 수 있겠다. 메서드가 getter 형태를 띌 경우 remote field에 바로 대입해주는 것은 얼핏보면 편리해보이지만 규칙이 없고 잘 정리된 문서가 없기 때문에 개발자를 혼란에 빠트릴 위험이 많기 때문이다.
