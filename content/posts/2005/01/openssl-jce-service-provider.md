---
title: "OpenSSL - JCE Service Provider"
date: Tue Jan 25 2005 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2005/01/openssl-jce-service-provider
lang: ko
tags: ["openssl", "java-cryptography", "jca", "jni"]
---

전혀 새로운 기술은 아니지만, 살짝 구글링 해봐도 안나오길래.. 만들기로 결심했다.
그것은 바로 JCA(Java Cryptography Architecture) service provider 형태로 openssl 을 쓰면 좋겠다는 생각!
사실 openssl의 libssl 과 libcrypto 중, libcrypto 를 지원하는 provider라고 말하는 것이 옳다.

이름은 빠밤~ [OpenSSL-Java](http://sourceforge.net/projects/openssl-java) 이다. sourceforge 에 프로젝트로 걸어놓은 상태다. 이녀석이 하는 역할은 뭔고하니 자바에서 JCA 인터페이스를 그대로 지키면서 구현부를 openssl로 스위칭 할 수 있게 하자는 모토이다.

구성은 아래처럼 된다.

Any Java Application with crypto 
----------------
Java Cryptography Architecture
----------------
OpenSSL-Java (JCA Provider 형태)
-----------------
Java Native Interface
-----------------
OpenSSL wrapper (JNI 형태)
-----------------
OpenSSL

검정색 - Crypto 프로그래머가 만드는 부분
파랑색 - Sun Microsystems가 구현한 인터페이스
갈색 - 내가 만든 부분 (괜히 패키지명에 내 닉 안넣고 org.openssl 로 했음)
초록색 - openssl 

OpenSSL-Java 의 최대 강점은 J2SE로 순수하게 프로그래밍 해놓은 어플리케이션을 단 한줄도 바꾸지 않고 openssl 구현부로 switch 해버릴 수 있다는 것이다. 이 모든 것은 JCA의 힘!

JCA 나 JCE가 생소한 분들을 위해 JCA 를 사용하여 프로그래밍한 자바 코드의 예를 보자.

```java
import java.security.MessageDigest;

MessageDigest md = MessageDigest.getInstance("MD5");
MessageDigest sha = MessageDigest.getInstance("SHA1");
md.update( "에헤헤".getBytes("UTF-8") );
sha.update( "우히히".getBytes("UTF-8") );
byte[] ret_md = md.digest();
byte[] ret_sha = sha.digest();
```

이것이 JCA 를 사용하는 자바 코드이다. 여기의 md5, sha1 부분을 openssl로 쓰고 싶을땐

1. JRE의 설정을 변경할 수 있을 때 (기존 코드 수정 불필요)

$JAVA_HOME/jre/lib/security/java.security 파일을 열어서
security.provider.1 에 org.openssl.java.OpenSSL 로 바꾸고 저장.

2. JRE의 설정을 변경할 수 없을 때 (기존 코드 1줄 수정)

main 클래스에서 아래와 같은 한 줄을 추가해준 후,
Security.addProvider(new org.openssl.java.OpenSSL())
instance를 만들때 MessageDigest.getInstance("MD5", "OpenSSL") 이렇게 얻어온다.

아무래도 2번 방식은 코드를 고치는 귀찮음이 따를테니 (어차피 한줄이지만 -_-) 가능하면 jre/lib/security/java.security 파일을 편집하는것이 더 나을 것이다.

이것을 실제로 사용하기 위해서 필요한 파일이 2개이다.

openssl-jce.jar - 열심히 만든 openssl JCE Provider.
libopenssl-java.so  - 열심히 만든 JNI openssl wrap 파일

openssl-jce.jar는 classpath에 넣어주고, libopenssl-java.so 이면 LD_LIBRARY_PATH에 걸어주고 (linux), openssl-java.dll은 PATH에 놓아준다(Windows).  jvm 실행시 -Djava.library.path 로 잡아줘도 된다. 

-------------------------------------------------------
내 데스크탑의 경우 모든 Java application에 추가 설정없이 OpenSSL-Java를 이용하기 위해 아래와 같이 구성해놓았다.

1. openssl-jce.jar 를 jre/lib/ext 에 위치
2. libopenssl-java.so 를 /usr/lib 에 위치시킨 후, LD_LIBRARY_PATH에 넣음 (linux)
3. jre/lib/security/java.security 파일의 provider.1 을 org.openssl.java.OpenSSL 로 대치.

위처럼 해놓으면 servlet container 이건 https 건 ssl 이건 몽땅 OpenSSL-Java로 돌릴 수 있다! 왜냐하면 SSL Handshake 중에도 SHA1, DES 등을 많이 사용하기 때문에 분명 이점이 있기 때문이다.
잊은것이 있다. OpenSSL-Java 가 지원예정인 알고리즘의 목록을 말해주지 않았다.

MD4, MD5, SHA1, SHA, DES, Blowfish, RC2, RC4, RC5, HMAC-MD5, HMAC-SHA1

ecb, cbc 도 왠만하면 다 구현할 예정이다. 
현재 구현된 것은 MD4, MD5, SHA, SHA1, HMAC-MD5, HMAC-SHA1 이고, 실제로 OpenSSL-Java를 만드는데 필요한 지식은 아래와 같다.

1. JCA Service Provider 구조 이해 및 구현 방법
2. 각 알고리즘을 자바로 사용하는 방법
3. 각 알고리즘을 openssl을 이용하여 c 코드로 작성하는 방법
4. JNI 구현 방법

아직 sourceforge 에는 코드를 1인치도 안올려놨다. 프로젝트에 c 코드가 있고 사용자 시스템의 openssl과 연동되는 부분이기 때문에, autotools로 깔끔하게 만들어서 안쪽팔린 상태로 올리고 싶기 때문이다 -_-;
openssl-jce 의 jni header와 class 파일들은 [ant](javascript:void(0);/*fckeditortemplink*/) 로 쉽게 작성해두었지만, jni 코드들을 컴파일하게 하려면.. 내 꿈은

```bash
ant
./configure --with-openssl=/path/to/openssl --with-java=/path/to/java 
make 
```

이런식으로 사용자가 3줄로 컴파일 및 설치를 끝내게 했으면.. 하기 때문!
요새 바빠서 autotools 를 공부해서 적용해놓으려면 꽤나 시간이 걸릴듯 싶다 ㅡ_ㅡ

## Comments

### 허진
*2005-02-22T20:05:01.000Z*

다음의 사이트를 참고해 보십시요.

허진 올림

http://www.warnertechnology.com/Computers/Software/JavaOpenSSL.shtml

---

### 허진
*2005-02-22T20:07:24.000Z*

잠실중학교 동문이시군요.

연락 한번 부탁 드립니다.

---

### rath
*http://xrath.com*
*2005-02-23T22:10:27.000Z*

사이트 잘 보았습니다. OpenSSL을 wrap 하긴 했는데, MacOSX 기반이고 libssl을 wrap하여 SSLSocket을 대체한 경우이군요.

제가 준비하는것은 거의 libcrypto 기반이며, JCE interface를 준수합니다. 게다가 오픈소스이지요 :)

---

### 최영근
*http://me2day.net/choizak*
*2008-11-14T09:12:04.000Z*

안녕하세요. 초보 Java 프로그래머입니다.
개인적으로 정말 기대를 많이 했던 프로젝트인데 sourceforge에 올라있지 않더라구요. ^^; JCE Service Provider 구현도 그렇고 JNI 도 그렇고 정말 소스를 꼭 보고 싶었는데요... ㅎㅎ

P.S. 장호님 덕분에 미투데이를 알게 되어서 쓰고 있어요. 그 점도 감사드립니다. ^^

---

### 구종윤
*2010-05-18T04:38:24.000Z*

안녕하세요 논문 준비중인 학부생입니다.
지금 준비중인 논문중에 bn_prime.c의 소수출력부분을 jni로 구현하려고 하는데 어려움이 많습니다.
염치불구하고 혹시나 xrath님에게 자료가 있으시다면 혹시 구할수 있는지 여쭙고 싶어 이렇게 댓글 남깁니다.
좋은 하루 보내세요^^

---
