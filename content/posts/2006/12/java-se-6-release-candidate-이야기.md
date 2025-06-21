---
title: "Java SE 6 Release Candidate 이야기"
date: Fri Dec 01 2006 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2006/12/java-se-6-release-candidate-이야기
lang: ko
tags: ["java", "jdk6", "api-updates", "programming"]
---

릴리즈 노트를 보다보니, 재미난 것들이 참 많아 몇 가지를 정리해 올려본다.

**- RFE [4655503](http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4655503): Array Reallocation API**
코딩 수가 좀 줄어들겠다. 오버로딩을 활용한 java.util.Arrays.copyOf()


```java
import static java.util.Arrays.*;
  int[] newArray = copyOf( oldArray, oldArray.length ); <- 좋구나~
  Melong[] newMel = copyOf( oldMel, 10 ); <- 잇힝~
```


두번째 파라미터는 새로운 길이다. old.length를 하면 똑같이 복사지만,
원본보다 더 크면 null 혹은 0 시리즈로 패딩되고 작으면 truncate!

**- RFE N/A: BigDecimal optimizations for specjbb++**
성능이 얼마나 좋아졌을까. 
흥미를 가진 일중 BigInteger/Decimal들을 쓸 일이 없어 안타깝다.
게다가 specjbb가 뭔지도 모르는 내겐.. (7)

**- RFE [4057701](http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4057701): Method for Discovering Free Disk Space**
회사제품땜에 JNI로 win32, linux, solaris 용 만들었었는데.. 점점 살기좋은 세상이다.
: java.io.File.getTotalSpace/getFreeSpace/getUsableSpace
이것들은 static은 아니고 file instance가 속한 파티션에 대해 동작한다. 

**- RFE [4050435](http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4050435): Password Prompting **
이것도 몇 년전 순수한 호기심으로 JNI 공부할 때 win32, linux 용으로 만들었었는데 
아.. 이제 진정 자바에서 지원하지 못하는 c 연습용 모듈 개발이 불필요한가보다.
: char[] java.io.Console.readPassword()
: String pass = new String(System.console().readPassword());
코드 테스트를 해보니 echo 되지 않고 Ctrl+U, Ctrl+H, Backspace들도 잘 먹는다.

**- RFE [4639391](http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=4639391): JSR 202: Java Class File Specification Update**
뭐가 바뀌었길래 RFE도 있고 JSR에도 있나 해서 final draft 구경해보고 있다.  
Java 5의 class file format과 바뀐 점만을 정리된 pdf를 보니 폰트, 목차 조정..
그런거 말고 -_- StackMapTable 이란 녀석이 새로 생겼다.
뭐에 쓰나 찾아보니 
This attribute is used during the process of verficiation by typechecking (4.11.1)
4.11.1 Verification by Type Checking 부분만 새로 씌여졌고
나머지는 이것으로 인해 class load, store 부분이 바뀌는 것에 대한 내용뿐이다.
JVM 만드는 사람.. 귀찮은 일 많이 생겼겠다 (7)

**- RFE [6192552](http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=6192552): Deques**
나 이런거에 약하다. 잘 모르는 것이라 정리해보는 것인데, 
"double ended queue"의 약자라고 한다. 발음은 '덱' -.-
앞으론 무식하게 ArrayList에다 add(0, obj) 하기보단 ArrayDeque.addFirst(obj) 해야겠다.
역시 알고리즘과 자료구조는 열심히 공부하고 봐야겠다. 이런거 참 약하다.
내게 알고리즘/자료구조 공부에 대한 동기부여 해주는 것은 자바다. (@)

**- RFE [6174397](http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=6174397): jconsole is more user-friendly**
Java 5 베타를 처음 설치했을때 jconsole 이 뭐지.. 하고 아~ 한 다음에
다신 본적이 없다. jmx 사용할 때 잠깐 다시 구경한 정도랄까.
아무튼 더 친숙해졌다니 jconsole을 자주 사용하던 사람에겐 희소식이 아닐까 싶다.

**- RFE [6270015](http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=6270015): Light-weight HTTP server**
오! python을 잠깐씩 하면서 이런게 부러웠었는데, sun이 이런짓도 하다니 놀랍다.
나만 이런 생각을 하는게 아니였는지, 6270015에 대해 vote 수가 0 이다.
한번 써보자는 생각에 api doc을 뒤져봤으나 찾을 수 없었다. 울그락불그락
결국은 찾았다. com.sun.net.httpserver 패키지였다. 
light-weight 이라길래 초썰렁한 것인줄 알았는데 상상보단 괜찮았다.
여러개의 context를 만드는 것이나 authenticator는 부착할 수 있었지만
virtual host는 지원하지 못하는 것 같다. 그래.. 너무 많은걸 바란거야 -_-
그래도 sun 스럽게 아주 간단하지 않으며 확장할 수 있는 부분이 많았다.
그래봐야 com.sun 패키지지만 말이다.

**- RFE [6268383](http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=6268383): Classpath wildcards**
아니 이런 감동적인 것을 봤나. 이런건 오래전에 들어왔어야 했다.
말이 필요없다. javac -cp "*" melong.java 이게 된다! :D

**- RFE [6179212](http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=6179212): Improved startup time**
JVM 시작 시간이 많이 단축되는 일은 여러번 있었다.
또 무엇이 빨라졌을까.. 궁금해서 열어보니 Synopsis가 Analyze the startup time of **netbeans** 였다;
그렇지만 충분히 빨라질만 하다. 적용된 것이 다음과 같은 거란다.
```
 6251998 - Inline Arraycopy in C1
 6217807 - Use Background Compilation
 4990299 - Reduce overhead of Class File Parsing
 6235792 - Reduce overhead of Class File loading
 6251992 - Eliminate Call to JVM_ReleaseUTF
 4770745 - Improve Zip reading
```
맞다. 빨라질만 하다.

[http://java.sun.com/javase/6/webnotes/features.html](http://java.sun.com/javase/6/webnotes/features.html)

정리작업을 하면서 많이 공부하게 되어 좋다.  
퇴근 시간이 넘어버렸으니 client side의 변경된 점들은 다음에 할 계획이다.

## Comments

### 권남
*http://kwon37xi.egloos.com*
*2006-12-01T16:25:10.000Z*

와~ 많이 멋져졌는데요.

---

### dasony
*2006-12-01T16:39:08.000Z*

딴건 다 관심없고 RFE 6268383: Class-path wildcards 하나에 엄청난 감동.

---

### rath
*2006-12-02T08:02:58.000Z*

권남: 예 멋있는게 많은 것 같아, 열심히 공부해보려구요 ^^

---

### rath
*2006-12-02T08:07:55.000Z*

dasony: 완전 감동이에요. wildcard가 Manifest 내의 Class-Path 속성같은 곳에도 다 먹힌데요~ ㅎㅎ

---

### rath
*2007-01-29T06:18:59.000Z*

Classpath wildcards 기능을 테스트하다보니 포스트에 오류가 있었네요
javac -cp "*.jar" test.java 하면 아예 못잡고 
javac -cp "*" test.java 해야 하네요~ (7)

---
