---
title: "JMSN 0.9.9b2"
date: Wed Aug 04 2004 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2004/08/jmsn-099b2
lang: ko
tags: ["jmsn", "java", "instant-messaging"]
---

JMSN의 공식 홈페이지는 [http://sourceforge.net/projects/jmsn](http://sourceforge.net/projects/jmsn) 입니다. 
sourceforge에서의 최신 릴리즈는 0.9.8b7 이지만, 비공식 적으로 jmsn 0.9.9b2 버젼을 배포합니다. [이곳](/dist/)을 클릭해보십시오.

JMSN 0.9.9b2 부터는 MSNSLP/1.0을 조금씩 지원하기 시작하였습니다. 이제 JMSN으로도 자신의 공개사진을 제공할 수 있고 친구들의 공개사진을 볼 수 있습니다. 

MacOS X의 java 1.4.2에서는 javax.imageio 패키지를 제공하지 않으므로 공개사진 기능을 사용할 수 없습니다.

## Comments

### Drizzt
*2004-09-15T05:47:47.000Z*

에 여기에 있는 소스로 JMSN을 구동시켜 봤는데 로그인이 안되더군요..왜그런걸까요...-_- MSN6.2는 종료 시킨 상황이었습니다..

---

### rath
*http://xrath.com*
*2004-09-15T07:47:08.000Z*

JMSN 소스빌드상의 문제는 보고된 바가 없었습니다. STDOUT 로그를 보여주시거나, JRE 버젼이 1.4 이상인지 확인해보세요

---

### Front
*2004-09-15T07:49:59.000Z*

안녕하세요^^..

저는 자바를 공부하는 학생입니다.. 덕분에 JMSN 잘 쓰고 있습니다.

누가 비슷한 코멘트를 남겨 놓으셨네요..

공부할대 .. 그러니까 윈도우에서 java할때는 JMSN 로그인 되거든요.. 그런데 FreeBSD 4.5에(JDK 1.4.2)에서는 깜깜 무소식 이에요..

혹시 FreeBSD 시스템에 문제 있는건가요?

그럼 멋진 가을~^^*

--소스--

```java
public class MSNtest {

	public static void main(String[] av)
	{

	MSNMessenger msn = new MSNMessenger( "bilgate@microsoft.com", "fuckms^^" );
	  msn.setInitialStatus( UserStatus.ONLINE );
	  msn.addMsnListener( new MsnAdapter() {
	      public void progressTyping( SwitchboardSession ss,
	          MsnFriend friend, String typingUser )
	      {
	          System.out.println( "Typing on " + friend.getLoginName() );
	      }
	      public void instantMessageReceived( SwitchboardSession ss,
	          MsnFriend friend, MimeMessage mime )
	      {
	          System.out.println( "*** MimeMessage from " + friend.getLoginName() );
	          System.out.println( mime.getMessage() );
	          System.out.println( "*****************************" );
	      }
	  });
	  msn.login();
	}

}
```

---

### rath
*http://xrath.com*
*2004-09-15T08:50:52.000Z*

FreeBSD 시스템이 없어서 테스트를 해보지 못하고 있습니다.

오늘 저녁즈음에 FreeBSD 5.2를 설치하고 테스트해볼 계획입니다.

감감무소식을 피하시기 위해선..

rath.msnm.Debug.printInput = true;
rath.msnm.Debug.printOutput = true;
rath.msnm.Debug.printMime = true;
rath.msnm.Debug printFireEvent = true;

등을 테스트해보시면 도움이 될지도 모르겠습니다..

---

### Front
*2004-09-16T02:23:44.000Z*

안녕하세요?

도움 주신대로 해보니..Freebsd에서는 깜깜 무소식이 아니네요..

그런데도 로그인이 못합니다. ㅠ.ㅠ

아래와 같이 응답을 하는군요.. [shaas@adf.net]  VER 1 MSNP9 MSNP8 CVRO

```
 CVR 2 0x0412 FreeBSD 4.10-STABLE i386 MSNMSGR 6.0.0602 MSMSGS shaas@adf.net
 USR 3 TWN I shaas@adf.net
 VER 4 MSNP9 MSNP8 CVRO
 CVR 5 0x0412 FreeBSD 4.10-STABLE i386 MSNMSGR 6.0.0602 MSMSGS shaas@adf.net
 USR 6 TWN I shaas@adf.net

<= USR 6 TWN S lc=1033,id=507,tw=40,fs=1,ru=http%3A%2F%2Fmessenger%2Emsn%2Ecom,ct=1095300683,kpp=1,kv=5,ver=2.1.6000.1,tpf=d60f8da656e8118438ed9214a80b13f0
```

---

### 까나리
*http://kkanari.org/blog*
*2004-10-22T02:56:41.000Z*

안녕하세요, rath님

#perky 방의 까나리입니다. (__) 넙죽

- jmsn 0.9.9b2 버전입니다.

(0.9.5 에 있는 jmsn.exe rath_awt.dll jmsn.prop 파일도 넣었습니다.)

jmsn 을 XP 에서 사용하려고 하는데

http://jmsn.sf.net 에서 파일을 받아서 압축을 풀고

처음 로긴했을때는 실행이 잘 됐습니다. 그런데
환경설정에 들어가서

변경한 사항:

1. 다운로드 디렉토리 D:\Download 으로 변경
2. 공개사진 변경 파일명 (까나리.jpg)
3. 배경이미지 변경 (lvback.gif)
4. 기타 (자세히 기억은 안남)

이 정도 변경한것 같은데, 다시 로그인 하면 접속이 되자마자 바로 끊겨버립니다.
로그인 몇번을 시도해도 안되고, 다른 패스포트 계정으로 들어가도 안됩니다.
레지스트리에서 jmsn 에 대한 정보가 기록되어서 그런가부다 하고, regedit 찾아봤는데
아무리 찾아봐도 어디에 정보가 기록되는지 모르겠군요.
윈도우 상에 정보 기록되는 곳이 어딘지 알려주시고, 왜 접속 안되는지도 알고 싶습니다.

그럼 이만, 수고하세요

---
