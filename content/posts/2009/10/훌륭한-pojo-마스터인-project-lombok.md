---
title: "훌륭한 POJO 도우미인 Project Lombok"
date: 2009-10-02
slug: 2009/10/훌륭한-pojo-마스터인-project-lombok
lang: ko
---

며칠전에 발견한 멋진 POJO 도우미인 [Project Lombok](http://projectlombok.org/)을 소개한다.

사실, 내가 따로 소개할 필요를 느끼지 못하겠다. 스크린캐스트 영상을 보면 누구라도 감 잡고, 바로 이용할 수 있기 때문이다.

그래도 링크 클릭하기 귀찮은 사람들을 위해 정리를 하자면

**Lombok**은 Java 1.5 부터 포함된 [apt](/javase/ko/6/docs/ko/technotes/guides/apt/index.html)(annotation processing tool)를 이용해 만든 POJO 도우미다. 그저 [lombok.jar](http://projectlombok.googlecode.com/files/lombok.jar) (343KB)를 내려받아 더블클릭하여 실행하면 바로 이클립스 플러그인으로 설치된다. (Manifest에 Main-Class 속성이 지정되어 인스톨러 GUI가 바로 실행되고, OSX일 경우 이클립스의 위치까지 바로 제안해준다, 343KB 속에는 여러가지 PNG 리소스와 빠른 설치를 위한 DLL까지 포함되어있다)

진정 설치하는데 10초도 안걸린다.

Lombok을 쉽게 이해하려면 Setter, Getter 생성기라고 보면 된다. 그 외에도 편리한 기능들을 제공하지만 말이다.


```java
public class Person {
  private final int id;
  private String name;
  private String mobile;
  private Date birthday;
}
```


위와 같은 POJO가 있다고 가정해보자. 이클립스에서 Getter/ Setter/ Constructor/ equals()/ hashcode()/ toString() 를 만들려면  Source 메뉴에서 각 메뉴를 일일히 클릭해서 엔터를 치는 수고를 해야 한다. 물론 이 작업을 다 하는데는 10초정도면 될 것이다. (10초는 주의력이 분산되기에 충분한 시간이다) 그런데 Person에 필드가 하나 추가되면? Quick-Fix를 눌러 setter/getter를 생성해줘야 한다. 그런데 final int로 선언되어있던 id가 String으로 바뀌면? Refactor 메뉴를 또 한번 눌러줘야하는 수고를 해야 한다. toString(), hashCode(), equals()도 다시 건드려줘야 한다.

게다가 setter/getter 말고 조금 특수한 getter들이 추가되었다면 어떨까. 예를 들어 getBirthdayAsString()를 추가했다고 치자. 지금은 메서드 7개와 생성자 1개밖에 안되지만 필드가 10개쯤 된다면 수많은 setter/getter들 사이에서 내가 직접 추가한 메서드가 무엇인지 파악하기 힘들다. 소스코드가 얼마나 긴지..

**그래서 태어난 Lombok.**


```java
import lombok.Data;

public @Data class Person {
  private final int id;
  private String name;
  private String mobile;
  private Date birthday;
}
```


축하한다. 그대는 final 필드를 파라미터로 받는 생성자와 Setter/Getter를 모두 다 가졌다. 뿐만아니라 디버그를 위한 toString 메서드도 가졌고 Joshua Bloch이 추천하는 equals(), hashCode()도 가졌다. **새로운 필드가 추가되거나 필드 형식이 바뀌더라도 아무런 추가 작업이 필요없다**.

그런데 import lombok을 해서 lombok.jar에 의존성이 생기지 않았냐고? No. lombok은 컴파일 타임 유틸리티이다. lombok.jar를 classpath에 넣고 Person.java 를 컴파일 하는 순간 lombok의 역할은 끝이다.

테스트 삼아 위의 Person.java를 컴파일 해보겠다.


```
$ javac -cp lombok.jar Person.java
```


컴파일이 됐다. 그럼 javap로 Person.class에 어떤 메서드들이 들어있는지 확인해보자.


```java
$ javap Person
Compiled from "Person.java"
public class Person extends java.lang.Object{
  public int getId();
  public java.lang.String getName();
  public void setName(java.lang.String);
  public java.lang.String getMobile();
  public void setMobile(java.lang.String);
  public java.util.Date getBirthday();
  public void setBirthday(java.util.Date);
  public java.lang.String toString();
  public int hashCode();
  public boolean equals(java.lang.Object);
  public Person(int);
}
```


모두 가졌다. 컴파일 타임에 Person 클래스가 확장됐다. 물론 Lombok은 이클립스 플러그인도 제공하고 있기 때문에 (lombok.jar를 더블클릭하여 설치를 누른순간 이미 그대의 이클립스에 설치됐다) @Data를 통해 Person.java를 만들고나면 Outline 에서도 생성된 모든 메서드를 볼 수 있다.

그러나 @Data 만으로는 불충분하다. 그래서 클래스 레벨의 @Data 말고도 개별적으로 @Setter, @Getter, @ToString, @EqualsAndHashCode를 지정할 수도 있게 해준다. @Data 어노테이션은 transient를 제외한 모든 필드에 대해 @Setter, @Getter를 붙이고 (final 필드면 @Getter만) @ToString, @EqualsAndHashCode 를 클래스에 붙여주는 *통합본*일 뿐이다.

그 외에도 아래와 같은 재미난 어노테이션들을 제공한다.

	[@NonNull](http://projectlombok.org/api/lombok/NonNull.html) -  멤버 변수에 붙여줄 경우, 그 필드를 꼭 받도록 생성자가 수정된다. 그리고 setXXX로 null을 넘겨줄 경우 if (xxx==null) 체크 코드가 들어가서 throw new NullPointerException("XXX") 를 던져준다. 버그 방지용으로 안성맞춤이다.
	[@Cleanup](http://projectlombok.org/features/Cleanup.html) - 내가 아주 즐겨 쓰는 유틸리티이다. 로컬 변수 앞에 붙여 쓸 수 있으며, 해당 변수 scope의 끝까지 자동으로 try { } 로 묶어주고 finally 블럭에서 field.close() 를 넣어준다. 이것은 컴파일 타임에 close()를 호출하도록 하는 것이므로 별도의 interface를 필요로 하지 않는다. 만약 destroy() 를 불러야하는 경우라면 @Cleanup("destroy") 라고 써주면 된다.* 단, try 블럭에서 예외가 발생했고 cleanup 메서드에서**도** 예외가 발생할 경우 cleanup 메서드에서 발생한 예외는 완전히 무시된다. 그러므로 @Cleanup에 **완전히 의존**하는 것은 위험하다. *
	[@Synchronized](http://projectlombok.org/features/Synchronized.html) - static 용, instance 용 lock 오브젝트를 자동으로 생성해주고 어노테이션을 메서드에 적용할 경우, 메서드 바디를 synchronized 키워드로 감싸준다. 내겐 별로 쓸모가 없지만, 주목할만한 점은 new Object() 가 serialize 되지 않는 것을 고려하여 instance용 lock 오브젝트를 new Object[0]로 선언해준다는 것이 특이사항이다. 별 생각없이 new Object()로 lock를 선언했다가 serialize 안되서 짜증나는 경우를 겪었던 사람이라면 이 @Synchronized 키워드의 센스를 인정할 수 있을 것이다. 만약 별도의 lock 객체를 생성해서 몇몇 메서드에게만 적용하고 싶다면 (read-lock 같은 경우를 위해) @Synchronized("lock-object-name") 형식으로 쓰면 된다. 대신 lock-object-name은 프로그래머가 직접 필드를 선언해야만 하는데, 그 이유는 나중에 버그 찾기 힘들어서라고!
	[@SneakyThrows](http://projectlombok.org/features/SneakyThrows.html) - 이것 또한 내가 좋아하는 것이다. 절대 일어나지 않을 checked exception을 씹어 먹어주는 편리한 녀석이다. 이클립스에서 checked exception을 Quick-Fix로 고치면 자동으로 e.printStackTrace()를 붙여주지만, 정말로 정말로 일어나지 않을 exception이라면 // TODO 와 스택트레이스 지우는 것조차도 귀찮은 일이니까. String.getBytes("UTF-8")이 대표적인 예인데, JVM 스펙에 따르면 UTF-8 인/디코더의 존재여부는 MUST BE 임에도 불구하고 우리는 IOException 을 잡아줘야 하기 때문. 그럴때 @SneakyThrows(UnsupportedEncodingException.class)를 해주면 코드가 예뻐진다. *단, 예외를 씹어먹는 부분이 Lombok.sneakyThrow(e) 라서 런타임 시 lombok.jar에 의존성을 가지게 되는 문제가 있다.*

큰 기쁨을 주는 툴이 아닐 수 없다. apt를 정말 멋지게 활용한 프로젝트가 아닐 수 없다. 게다가 javac와 묶여서 apt 커멘드를 실행할 일조차 없게 해주다니, 정말 멋지지 않은가?

이제 LISP의 defmacro가 부럽지 않을 것만 같다.

## Comments

### 화니
*http://dogfeet.tistory.com*
*2009-10-24T07:37:27.000Z*

가려운곳을 긁어주는 효자손 같아요 ㅋㅋ.

아.. 코드가 딱 필요한 로직만 가지게 되는게 좋아요.

---

### Jang-Ho Hwang
*http://xrath.com/*
*2009-10-26T02:46:09.000Z*

[@화니 ](#comment-3381) 
메일링 리스트를 보니 개발자가 새로운 Feature를 쉽게 넣을 수 있도록 하는 작업이 진행되고 있더라고요. 아직 follow up은 못했지만 확장해서 쓸 수 있다면 더욱 좋을 것 같습니다. ㅎㅎ

---

### 기선
*http://whiteship.me*
*2010-03-17T01:19:04.000Z*

이게 POJO랑 무슨 상관인거죠?? getter/setter가 있다고 해서 POJO가 아닌것도 아니고 getter/setter가 눈에 보이지 않는다고 해서 POJO 마스터인이라는 건가요? 저는 오히려 lombook이 가시성을 떨어트려서 혼란의 여지가 생길 수 있지 않나 생각합니다. 

물론.. 어느 정도 편의성은 제공하지만 그 편의성과 가시성이 떨어지는 정도와의 차이를 어떤 관점에서 비교하느냐에 따라 호불호가 갈릴 것 같습니다.

그렇치만 여전히 lombook이 왜 POJO 마스터라는 건지는 이해되지 않습니다.

---

### Jang-Ho Hwang
*http://xrath.com/*
*2010-03-17T01:51:23.000Z*

[@기선 ](#comment-3991) 
귀찮은 대부분의 작업을 해결해줘서 고마운 기분에 별 생각없이 워딩을 했었네요. POJO 어시스턴트의 기능을 포함한다 정도의 표현이 적절하겠군요. 

가시성이 떨어진다는 부분은 잘 이해가 되지 않지만, 말씀하신것처럼 호불호의 차이인 듯 합니다. 
getter/setter는 핵심 이슈가 아닌 듯 하고 lombook이라고 작성하신 것으로 미루어볼 때 lombok에 관심이 없으신듯하여 lombok에 대해 더 이야기하지는 않겠습니다. 

lombok 소개글 제목을 엄하게 지어서 죄송합니다. 본문과 제목의 **POJO 마스터**란 표현을 **POJO 도우미**로 변경하였습니다. :-)

---

### Wonhee Jung
*http://www.facebook.com/AaronJung*
*2012-02-17T08:14:43.000Z*

오래된 덧글들이라 지금 덧글을 추가하기가 조심스럽긴 하지만 가시성을 떨어뜨린다고 이야기한다면 Spring이나 기타 자바 프레임워크들의 어노테이션 기반 모든 것들이 가시성을 떨어뜨란다고 이야기할 수도 있게 되지 않나 싶네요. 멤버변수 20개 갖고 있는 POJO가 있다고 가정할때 IDE의 코드생성 기능으로 40개의 getter/setter가 생기는 것과(어차피 컴파일 에러나지 않는 이상 하나하나 다 살펴보지도 않을) 그냥 @Data 혹은 @Getter @Setter적어주는 것만으로 그게 해결된다면 과연 어느쪽이 가시성이 떨어지고 혼란을 유발하는 건지 생각해 볼 일입니다.

---

