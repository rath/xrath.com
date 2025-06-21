---
title: "Resin 3.0.22 와 J2SE 6 는 개떡 궁합?"
date: Fri Jan 19 2007 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2007/01/resin-3022-와-j2se-6-는-개떡-궁합
lang: ko
tags: ["technology", "java", "resin", "bug"]
---

1시간 전 J2SE 6으로 올리면서 이것저것 주르륵 업데이트 하고 다 잘 돌아가는지 이것저것 눌러보았고 왠만큼 다 돌아가는 것처럼 보였다.

RenderingHints 문제는 지금도 전혀 납득할 수 없다. 구글 리서치는 잠시 미룬다.
아무튼 정상인줄 알고 헤벌레 하다가 /rss.xml을 눌러보니까 황당한 에러 발생!


```
<font style="font-size: 11px; font-family: 돋움">
javax.xml.transform.TransformerException: java.lang.UnsupportedOperationException
        at com.sun.org.apache.xalan.internal.xsltc.trax.TransformerImpl.transform(TransformerImpl.java:718)
        at com.sun.org.apache.xalan.internal.xsltc.trax.TransformerImpl.transform(TransformerImpl.java:313)
        at rath.web.service.RDFSiteSummary.service(RDFSiteSummary.java:196)
        at javax.servlet.http.HttpServlet.service(HttpServlet.java:92)
        at com.caucho.server.dispatch.ServletFilterChain.doFilter(ServletFilterChain.java:106)
        at com.caucho.server.webapp.WebAppFilterChain.doFilter(WebAppFilterChain.java:173)
        at com.caucho.server.dispatch.ServletInvocation.service(ServletInvocation.java:229)
        at com.caucho.server.hmux.HmuxRequest.handleRequest(HmuxRequest.java:420)
        at com.caucho.server.port.TcpConnection.run(TcpConnection.java:511)
        at com.caucho.util.ThreadPool.runTasks(ThreadPool.java:520)
        at com.caucho.util.ThreadPool.run(ThreadPool.java:442)
        at java.lang.Thread.run(Thread.java:619)
Caused by: java.lang.UnsupportedOperationException
        at com.caucho.xml.QDocument.getXmlVersion(QDocument.java:848)
        at com.sun.org.apache.xalan.internal.xsltc.trax.DOM2TO.setDocumentInfo(DOM2TO.java:375)</font>
```



뭐야 뭔데 -_-? 대략난감이다. 
jdk 하나 바꿨을 뿐인데.. Transformer.transform 에서 에러가 나다니 이 무슨 날벼락 콤보란 말인가.

욱 하는 마음에 데스크탑 윈2003에서 같은 코드를 돌려보았더니 잘 돌아간다. jdk 6은 죄가 없다. 
실제로 com.caucho.xml.QDocument.getXmlVersion의 1줄 구현을 아래처럼 해놓은 caucho가 죄!

  throw new UnsupportedOperationException();

스택트레이스 내용을 보면 jdk 6에 포함된 xalan이 문득 caucho 쪽으로 튄다.
jdk 5에서는 간단한 transform 수행 시 Document.getXmlVersion(DOM Level 3)가 없어도 괜찮았나 보다. 구글님의 도움으로 찾은 [J2SE Tech 문서](http://java.sun.com/javase/6/docs/technotes/guides/xml/jaxp/JAXP-Compatibility_160.html)에 의하면 J2SE 1.4 는 DOM Level 2 를 지원하고 J2SE 6부터 DOM Level 3 를 지원한다고 한다. 

DOM Level 3를 지원하는건 좋은데 지원하지 못하는 DOM Level 2의 구현물(caucho resin 3.0.x의 그것)들은 어떻게 살라고 그러는건지 모르겠다. 하위호환성을 좀 더 신경써줬으면 좋았을텐데.

아무튼 이것 때문에 RSS를 닫기도 그렇고 -_- 이것 때문에 jdk를 다시 5로 내릴 수는 없잖아 :@
속는 셈 치고 Resin 3.1.0 으로 바꿔봤다. resin 빌드 자주해서 아주 외우겠다 외우겠어 -_-

./configure --prefix=/home/rath/resin --with-apxs=/opt/apache/bin/apxs --enable-jni 
make; sudo make install 
rm -rf ~/html/WEB-INF/work <- 오타나면 작살 -_-;
~/resin/bin/httpd.sh start
/opt/apache/bin/apachectl restart

결론은.. 빙고~! XML Transform 잘 돌아간다. :)

문제의 근원은 J2SE 6 은 DOM Level 3 구현물이고 Transformer가 Level 3 를 원하는데 provider가 DOM Level 2 였던 것이였다. 덕분에 Resin 3.1 을 깔아볼 수 있었다. 

Resin 3.1 은 Servlet 2.5를 지원하고 watchdog이 들어갔다. 그리고 별 관심은 없지만 Quercus님이 PHP6 유니코드 지원을 한댄다. 이런 짓 하다보면 나도 J2EE에 관심이 조금씩 생겨서 좋다. (@)

아무튼 이제!

[rath@ns lib]$ telnet localhost 80
Trying 127.0.0.1...
Connected to localhost (127.0.0.1).
Escape character is '^]'.
GET / HTTP/1.0

HTTP/1.1 200 OK
Date: Fri, 19 Jan 2007 19:42:29 GMT
**Server: Apache/1.3.37 (Unix) Resin/3.1.0 mod_jk/1.2.15**

이렇게 댔다 ㅎㅎ

## Comments

### 윤종현
*http://blog.naver.com/neoctrl*
*2007-01-20T00:52:11.000Z*

UnsupportedOperationException? -0- 그런 Exception도 있었나;; 근데 좀 당황스럽네요. 인스턴스화까지 시킬 수 있는데 객체의 특정 메서드 콜을 하면 그냥 에러가 떨어진다는건 ... 

java 너무 오래 안한건가? -0-

---

### rath
*2007-01-20T01:28:36.000Z*

abstract method 같은 개념은 아니구요 단순히 RuntimeException 상속받은 클래스에요. 
만약 Resin 3.0.22 이전의 QDocument 클래스에 getXmlVersion() 가 없었다면 인스턴스화는 잘 되고 getXmlVersion을 호출하는 순간 AbstractMethodError가 발생하겠지만 3.0.22 이전의 구현은

public String getXmlVersion() {
throw new UnsupportedOperationException();
}

요렇게 되있었다는 허무한 말이였어요 -ㅇ-;

---

### xhoto
*2007-01-20T17:54:05.000Z*

그쪽 바닥은 내바닥이 아니라 -_- 패쓰 -_-/ ㅋㅋㅋ
이틀 수원에서 요양하고 오늘 저녁에 다시 구미로 ㅠ.ㅠ
담주 주말이나, 다담주 주중 쯤 해서 곱창 1미터 콜?

---

### rath
*2007-01-20T20:15:44.000Z*

엉 콜이야 ㅋㅋ 새 회사 출근날짜가 2월 5일로 잡혀서 그 전에는 아주 널럴함!

---
