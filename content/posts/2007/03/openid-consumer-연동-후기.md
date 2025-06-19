---
title: "OpenID Consumer 연동 후기"
date: 2007-03-11
slug: 2007/03/openid-consumer-연동-후기
lang: ko
---

[OpenID4Java](http://code.sxip.com/openid4java/)로 직접 만든 블로그에 OpenID로 코멘트 쓰기를 붙이면서 겪었던 것들을 몇가지 정리해봅니다.

편의상 경어를 피하겠습니다.

**[설치환경]**

- jdk 1.6.0-b105
- resin 3.1 
- OpenID4java의 lib의 모든 xsd과 jar를 $resin/lib/openid로 몽땅 복사
- OpenID4java의 endorsed의 모든 jar를 $JAVA_HOME/jre/lib에 endorsed 디렉 만들고 복사

**[시나리오]**

```
 Context init 리스너에서 ConsumerManager를 생성하고 In-Memory association, Nonce verifier 지정
 사용자가 OpenID를 입력하고 코멘트를 작성
 write_cmt.jsp 로 submit
 로그인된 사용자인지 확인, OpenID로 남기려는 사용자인지 확인
 코멘트 입력정보들과 복귀후 리다이렉트 될 url과 DiscoveryInformation을 묶어 OpenIDSession이란 커스텀 클래스로 묶어 세션에 보관
 리턴 페이지 (제 경우 http://xrath.com) 담아서 OpenID server 로 리다이렉트 
 OpenID 서버(제 경우 [myID.net](http://myid.net))에서 인증을 마치고 리턴 페이지로 복귀
 세션에서 OpenIDSession이 있는지 검사
 Identifier가 세션에 존재하고 Verified 인지 확인
 세션에 함께 넣어놨던 action 페이지(제 경우 write_cmt)로 리다이렉트
 코멘트 INSERT됨!
```

**[주의사항]**

- endorsed 가 바뀌어 디폴트 xml transformer가 xalan-2.6으로 바뀌었다.
이 때문에 잠시 rss가 안돌아갔는데, TransformerFactory에 "indent-number" 속성을 더이상 사용할 수 없게 되었다. ㅠㅠ 그럼 이제 표준 방법대로 하면 되는건가?

- 만약 ConsumerManager.discover 에서 NullPointerException이 발생할 경우, src/net/openid/yadis/YadisResolver.java 315라인의 주석 제거 후 java-openid-sxip.jar 리빌드해보자. (도대체 왜 주석처리 되어있던건지 잘 모르겠지만, 바쁘니 패스-_-)

정리하고 나니 큰 이슈는 없었네요. 이제 테스트베드를 만들었으니 스펙들을 읽어보기 시작해야겠습니다. (7)

## Comments

### rath
*http://xrath.com/*
*2007-03-11T01:37:38.000Z*

호호

---

### 지꼴
*http://jiggol.myid.net/*
*2007-03-11T03:12:52.000Z*

오호호.. 저도 ID 생성!!

---

### 개굴
*http://geoguru.myid.net/*
*2007-03-11T03:18:07.000Z*

오 수고 많으셨습니다 ~

---

### 윤종현
*http://www.oscarflex.net/tt*
*2007-03-11T03:18:37.000Z*

캡챠 입력하지 않아서 좋네요~ ㅎㅎ

---

### rath
*http://xrath.com/*
*2007-03-11T11:42:05.000Z*

신뢰하기 애매한 사이트에 비밀번호 제공하기 찝찝했었는데, 오픈아이디 참 괜찮은거 같아요. 

지꼴, 흐흐 만세!
개굴, 감사합니다. 
윤종현, 대략 추이봐서 거의 다 OpenID를 사용한 다면 캡챠 아예 빼버릴까 해요 ㅎㅎ

---

### 지꼴
*http://jiggol.myid.net/*
*2007-03-11T12:00:42.000Z*

ㅋㅋ 이제 방명록 고고싱~~

---

### rath
*http://xrath.com/*
*2007-03-11T13:02:54.000Z*

이제 황금 주말이 끝났으니.. 방명록은 수요일쯤 개발 착수할 계획~!
아놔 jmsn, jateon도 땡겼는데 이제 me2day까지 내 시간을 가져가고 있네 ;ㅁ;
물약 원츄! ㅋㅋㅋ

---

### 프리버즈
*2007-03-12T02:10:09.000Z*

테스트~

---

### 프리버즈
*2007-03-12T02:18:52.000Z*

와~ 잘 된다~~

그런데, myid.net 로그인 끝난 후에 : xrath.com/null : Not Found 나와요 -0-;

1.
그리고, 어느 시점에서 OpenID 로그인을 해야하는지 헷갈려요.
이게 블로그에 OpenID 붙일 때 인터페이스 상의 난제인데요. 
태터툴즈 OpenID Plugin을 만들때( 옆에서 구경하면서 같이) 고민했던 부분인데요.

OpenID를 입력하고 로그인이 언제 되는지 의문이 되요.
특히, 태터툴즈나 다른 블로그처럼 비밀번호 필드가 있는 경우에는 더욱 헷갈리구요.
submit 누르면 openid provider로 redirect되서 openid pw를 입력하는건데, 잘 모르는 사람들은 openid pw를 그냥 블로그 비밀번호 필드에 입력할 수 있으니까요. (피싱의 오해도 살 수 있어서 권장하지 않는다고 Kay님도 그러시고..)

** 그래서 태터툴즈 플러그인처럼, Login OpenID와 같은 링크를 하나 걸고 로그인 후 되돌아오도록 하는게 (좀 깔끔하진 않지만), 괜찮은 방법이더라구요.

2.
그리고, 개인 계정(xrath.com, fribirdz.net)을 delegate해서 쓸 수 있고,
OpenID Provider에게 Nickname을 요청할 수 있으니까요.

OpenID로 로그인하면,
OpenID 주소를 홈피 필드에 채워주는 것도 좋더라구요.

단, 실제로는 fribirdz.egloos.com인데, OpenID가 fribirdz.myid.net 인 사람들을 위해 readonly는 안되겠구..

3.
이름(닉네임)은 readonly여도 되겠구.. 자동으로 채워주면 편하더라구요.

너무 길다 -0-; 죄송

---

### rath
*2007-03-12T06:48:59.000Z*

좋은 조언 고마워요 ^^ 

Provider에게 회원정보 요청하기 <- 이녀석 OpenID4Java에 있어서 해봤는데 잘 안되더라구요 더 연구해볼 계획이에요. 

이름 채우는 것에 대해 고민이 많았었는데.. 자동으로 채워주는 것은 Provider에서 제공하는 것이겠지요? 정말 애매한 것 같아요 -_-;

'홈피' 필드를 openid로 채우는 것(default로)은 좋은 아이디어 같네요. 가장 먼저 적용해볼 수 있는 부분 같은데.. myid.net 같은 경우 썰렁한 홈피(?)가 뜨게 되는 것 같아 지금과 같은 방식을 선택했지요.
그나저나 코멘트를 남기려는 순간 (등록 버튼을 누르는) 오픈아이디에 인증을 하려 했기 때문에 이 모든 애매함들이 생긴 것 같아요. 그렇다고 오픈아이디로 먼저 로그인하라고 하면 '코멘트 하나 남기려 하는데, 로그인을 하고 나서 코멘트를 쓰는 귀찮음을 가져야 하다니!' 하는 기분이 들 수 있을 것 같은데, 어찌보면 똑같지만 귀찮음 정도는 분명히 높게 느껴져서.. 정말 애매해요 -_-;;

대충 정리해보면 일단 코멘트 남기기 전에도 오픈아이디로 로그인하기를 가능하게 만들고, Consumer 사이트에서 해당 openid를 key로 여러가지 정보들을 (이 사이트에서만 사용할) 미리 입력할 수 있는 '자기정보' 페이지를 유지하는 것을 선택할까 하고 있어요.
이렇게 되면 뭔가 OpenID의 정신(?)에 위배되는 것 같긴 하지만, 단순히 '이 사이트에 내 비밀번호 흔적을 남기고 싶지 않다' 욕구는 해소될테니까요.

아 복잡해요 한참 더 심사숙고 해야겠네요 -_-;;

---

### 프리버즈
*2007-03-12T07:36:47.000Z*

네, 그것때문에 태터 플러그인만들때도 여러가지 인터페이스를 해봤었 (던걸 옆에서 구경하고 한마디씩 거들었었) 는데..

대신 openid session이 살아있으면 "openid login"만 누르면 비밀번호를 누를 필요 없지요. "always trust" 승인이 안된 사이트라면 "승인"은 해야겠지만요.

openid 1.x spec에 nickname 등의 미리 지정된 정보를 (7-8개던가) 주고 받을 수 있구요. 닉네임은 openid consumer마다 다르게 지정할 수 있어요. (openid 2.0 spec에서는 custum field 지정이 가능했던 거 같음..)

예를 들어 xrath.myid.net 으로 site A에 로그인하면, site A에서는 "래쓰"라는 닉네임을 항상 사용하고, site B에 로그인 할때는 "서태지"라는 닉네임을 사용할 수 있어요. 

정확한 프로세스는 기억이 나지 않는데, 아마 첨에 consumer에서 provider로 로그인 요청하면서 부가정보들을 요청하면, provider에서는 user에게 해당 부가정보 전송을 허용할 것인지, 그리고 값을 채워놓고 "이 값을 줄껀지, 아니면 니가 다시 입력한 값을 줄껀지" 를 주는듯..

좀 써보니까, 비밀 번호 흔적도 남기지 않고, 일일이 아이디, 홈페이지 안쳐도 되고, 세션이 살아있으면 비밀번호 입력도 안해도 되는 장점이 있더라구요~

근데 openid 개념 일반인들한테 참 어려워요. me2day 가입시키면서 고생을..ㅠㅠ

그럼 전 이만 자러 -_-;; 어제 회사서 밤새고 지금 집에 왔음..ㅠㅠ

---

### 지꼴
*http://jiggol.myid.net/*
*2007-03-12T09:05:52.000Z*

장호형 달려요 달려요~~ ㅋㅋ

---

### rath
*http://xrath.com/*
*2007-03-12T11:52:00.000Z*

xrath.com/null 로 표시되면서 코멘트 에러나던 것 수정했습니다.

특정 포스트를 클릭해서 코멘트를 쓰면 정상작동했었는데, 대문 목록보기 화면에서 코멘트를 남겼을 경우 항상 발생하던 버그였네요.

깔끔하게 해결하진 못했지만, 아무튼 그럭저럭 잘 수정됐습니다 .ㅎㅎ

---

### ruvu
*http://ruvu.myid.net/*
*2007-03-12T12:29:20.000Z*

나도나도

---

### rath
*http://xrath.com/*
*2007-03-12T18:14:34.000Z*

ruvu, 오픈아이디 만든 것 축하!

---

### rath
*http://xrath.com/*
*2007-03-12T18:28:52.000Z*

프리버즈, consumer마다 닉네임을 다르게 지정할 수 있다니 참 괜찮네요.

급하게 구현하느라 자세히 안보고 넘겨버렸는데 지금 검색해보니 Attribute Exchange로 하는거였군요..
 http://openid.net/specs/openid-attribute-properties-list-1_0-01.html
이 문서를 보니 property가 정말 많군요! 50개까지 세다가 말았어요 (-_-)
따로 consumer 사이트 내에서 DB로 유지하려고 했던 것들이 다 있네요.

제가 필요로 했고 관심있는 ax property들은 
gender, 
language/pref, 
contact/phone/cell
contact/IM/default
contact/IM/MSN
contact/IM/Jabber
contact/web/default
contact/web/blog

정도였어요 ㅎㅎ. 
다음번 Hollys 미팅때는 OpenID로 얘기할 게 많을 것 같네요.
일요일까지 스펙 정독하고 가야되는건가 ㄷㄷㄷ

저도 이만 자러 -_-;

---

### 이치형
*2007-04-09T17:55:32.000Z*

지금 openid를 consumer 측에서 연동 테스트 해볼려구하는데요, 간단하게 jsp파일하나만들어서 내용은 <%@ page language="java" import="com.SampleConsumer, net.openid.consumer.*" contentType="text/html;charset=KSC5601" %>
<%
    try{
        SampleConsumer sc = new SampleConsumer();
        sc.authRequest("idnote.myid.net",request, response);
    }catch(ConsumerException e){
        out.println("Error="+e.toString());
    }
%>
실행하면 myid.net인증페이지로 넘어가서 인증완료된후에 제가만든 result.jsp파일로 돌아오는데요, 그 안에서 <%@ page language="java" import="com.SampleConsumer, net.openid.consumer.*" contentType="text/html;charset=KSC5601" %>
<%
    
    try{
        SampleConsumer sc = new SampleConsumer();
        sc.verifyResponse(request);
        out.println("@@@@");
    }catch(ConsumerException e){
        out.println("Error="+e.toString());
    }
씩으로 출력해보니 null이 나오네요.ㅠ.ㅠ 인증후에 인증된 정보를 어케 하면 얻어올 수 있는거져?  님이 해보신 방법중 "Context init 리스너에서 ConsumerManager를 생성하고 " 부분이 어케하라는 말씀인지 잘 이해가 안되요, 그부분을 제가 안해서 그런듯한데, 죄송한데, 샘플좀 어케안될까요?ㅠ.ㅠ윽윽 몇일째 고생하고잇어요.지금.ㅠ.ㅠ부탁합니다.제발

---

### 이치형
*http://idnote.myid.net/*
*2007-04-09T17:59:18.000Z*

환경은 윈도우, java version "1.5.0_10", resin-3.1.0 , java-openid-sxip-0.9.1.167 이며, SampleConsumer클래스는 java-openid-sxip-0.9.1.167안에 포함된 클래스입니다. returnToUrl값만 결과페이지인 result.jsp파일로 변경하엿습니다.ㅠ..ㅠ

---

### rath
*http://xrath.com/*
*2007-04-10T03:22:38.000Z*

Context init 리스너를 꼭 사용하실 필요는 없습니다.
가장 중요한 것은 ConsumerManager를 생성하고 이것을 하나의 컨테이너에서 유지하는 것인데요.
생성한 것을 application scope에 넣는 시점을 잡기가 애매하여 ContextListener를 사용한 것 뿐입니다. 

저같은 경우 인증을 마치고 returnURL로 돌아왔을때 제일 먼저 

ConsumerManager mgr = (ConsumerManager)application.getAttribute("openid.manager");

이렇게 servlet context init 시 application에 넣었던 ConsumerManager를 꺼내오는 것 입니다.

초기에 ConsumerManager 생성시에는

ConsumerManager manager = new ConsumerManager();
manager.setAssociations( new InMemoryConsumerAssociationStore() );
manager.setNonceVerifier( new InMemoryNonceVerifier(60*60) );
.getServletContext().setAttribute("openid.manager", manager);

이렇게 넣어둔 것이지요.

그리고.. SampleConsumer.java 이녀석 그대로 쓰면 원래 안됩니다 -_-;

---

### 이치형
*http://idnote.myid.net/*
*2007-04-10T04:02:32.000Z*

정말 감사합니다. 많은 도움이 될거같아요. 이렇게 빨리 답변을 주시다니, 정말 감사합니다.열심히 연구해볼게요,^.^ 항상 즐거운 삶을 사세요^.^ 우리모두 웃어 보아요 하 하 하 ~~~~~~ 기분이 좋아 집니다.^.^

---

### rath
*http://xrath.com/*
*2007-04-10T04:28:06.000Z*

도움이 되셨으면 좋겠습니다. ^^
저도 스마일 매니아에요. ㅎㅎ 가끔은 주위에서 '오바쟁이' 라고 할 정도로 웃는거에 적응되어있답니다.  좋은 한 주 되세요 ;)

---

### 이치형
*http://idnote.myid.net/*
*2007-04-10T07:07:55.000Z*

rath님 덕분에 드디어 성공했습니다. 근데 이제 남은게, 로그아웃을 시켜야하는데요.ㅠ.ㅠ api 열심히 참아보구있는데, 아 왜케 안보이는지,염치 불구하구,
도움좀 청하면 안될까요? 자바 지식이 깊지를 못해서.ㅠ.ㅠ 무지 해매네요...
매번 도움만 청하구ㅠ.ㅠ 좀 부탁드릴게요..... 그리고 정말 감사합니다...

---

### 이치형
*http://idnote.myid.net/*
*2007-04-10T08:10:17.000Z*

아 그리구요, resin으로 하다가 아래 메세지에 봉착하여.ㅠ.ㅠ 해결 못하구,
검색해 보니 어떤 사람이 해결 했다고는 한데,
"It turns out it was actually a problem with Resin's XML parser. We 
switched Resin so that it uses Xerces-Xalen and the problem went away. 
원문: http://groups.google.com/group/openid4java/browse_thread/thread/1a182096944b7e94"
resin에서 Xerces-Xalen를 어케 사용하게 하는지를 몰라 포기하구,
tomcat 5.5로 바꾸었어요.ㅠ.ㅠ 대부분 tomcat 만 사용하다보니, resin은 잘모르겟더라구요.ㅠ.ㅠ 에공 내공 부족..ㅠ.ㅠ

**resin 에러메세지
java.lang.IllegalArgumentException: URI is not absolute
at java.net.URI.toURL(URI.java:1080)
at net.openid.discovery.Discovery.extractDiscoveryInformation(Discovery.java:276)
at net.openid.discovery.Discovery.discover(Discovery.java:189)
at net.openid.discovery.Discovery.discover(Discovery.java:134)
at net.openid.consumer.ConsumerManager.discover(ConsumerManager.java:497)
at com.openid.SampleConsumer.authRequest(SampleConsumer.java:55)
at _jsp._consumer__jsp._jspService(consumer.jsp:12)
at com.caucho.jsp.JavaPage.service(JavaPage.java:61)
at com.caucho.jsp.Page.pageservice(Page.java:577)
at com.caucho.server.dispatch.PageFilterChain.doFilter(PageFilterChain.java:190)
at com.caucho.server.webapp.WebAppFilterChain.doFilter(WebAppFilterChain.java:167)
at com.caucho.server.dispatch.ServletInvocation.service(ServletInvocation.java:226)
at com.caucho.server.http.HttpRequest.handleRequest(HttpRequest.java:263)
at com.caucho.server.port.TcpConnection.run(TcpConnection.java:477)
at com.caucho.util.ThreadPool$Item.runTasks(ThreadPool.java:591)
at com.caucho.util.ThreadPool$Item.run(ThreadPool.java:513)
at java.lang.Thread.run(Thread.java:619) (2007/04/10 17:09:14)

---

### rath
*http://xrath.com/*
*2007-04-10T15:52:14.000Z*

로그아웃 처리의 경우 전 세션에서 지우기만 합니다. 

URI is not absolute 에러는 모르겠네요. 만난 기억이 나지 않아서 ^^;

---

### 이치형
*http://idnote.myid.net/*
*2007-04-11T02:04:19.000Z*

아 그렇군요, 전 또 해당 OpenID Provider쪽에 로그아웃 호출이 있는가 해서요,ㅎㅎ 감사합니다.정말 오늘도 즐거운 하루되세요...

---

### 이치형
*http://idnote.myid.net/*
*2007-04-11T02:09:40.000Z*

군데 세션만 지우게되면은요, 오픈아이디 유효한 시간과 웹브라우저를 닫지 않았으면, 다른 사람이 오픈아이디만 알면, 보통 오픈아이디 input박스에 자동완성으로 알수 있으니, 그냥 로그인을 할 수 있겠네요?... 이건 어쩔수 없는건가요? www.myid.net Provider쪽에 로그아웃 시키는게 정말없는건가요?ㅠ..ㅠ

---

### 이치형
*http://idnote.myid.net/*
*2007-04-11T02:13:42.000Z*

헉 한번 로그인 한상태에서 아무리 이곳 consumer쪽에서 로그아웃시켜도,
Provider(www.myid.net)에는 여전히 로그인 상태로 남아 있어 Provider 마이페이지로도 접근이 가능하네요?.ㅠ.ㅠ 테더툴즈도 한번 테스트해봐야겟에요, 플러그인으로 붙어놓았던데...그럼 슝~~~~

---

### rath
*http://xrath.com/*
*2007-04-11T02:18:37.000Z*

정말 문제가 될 수 있네요. 확인해보겠습니다. 
검토가 끝나기 전까지는 꼭 브라우저를 닫아놔야겠군요 ㅎㅎ

---

### fusionism
*http://fusionism.myopenid.com/*
*2007-04-16T04:00:31.000Z*

되는구요..ㅎㅎ

---

### ckiller
*http://ckiller.myid.net/*
*2007-04-18T06:22:28.000Z*

음하하하..

---

### 이치형
*http://idnote.myid.net/*
*2007-04-21T19:10:13.000Z*

안녕하세요? 예전에 도움을 받았던 사람인데요, 계속 되는 OpenID Provider 삽질 끝에 해결 못하고 이렇게 도움돔 청할려구요ㅠ.ㅠ, 현재 윈도우, java version "1.5.0_10", resin-3.1.0 , java-openid-sxip-0.9.2.212(http://code.sxip.com/openid4java/)를 이용 해서 로그인 아이디에 localhost:8080/user.jsp 이렇게 입력 하면 OpenID인증이 성공적으로 이루어 집니다. Provider 샘플 소스가 jsp로 쉽게 되어있어서 되더라구요, 그래서 현재에는 Provider와 consumer 모두 테스트를 성공한 상태인데요, 문제는 로그인 할 경우 localhost:8080/user.jsp 이런 식으로 보통 안하고 id.mydomain.net 이런식으로 하잔아요? 그렇게 바꿀려고 하고 있거든요, 그래서 생각 해낸 방법이 id.mydomain.net의 index.jsp파일 안의 내용을 usr.jsp파일로 바꾸었더니, id.mydomain.net 아이디로 로그인을 하면 로그인이 되더라구요, user.jsp파이의 내용은 
<%@ page contentType="application/xrds+xml"%><?xml version="1.0" encoding="UTF-8"?>
<xrds:XRDS
  xmlns:xrds="xri://$xrds"
  xmlns:openid="http://openid.net/xmlns/1.0"
  xmlns="xri://$xrd*($v*2.0)">
  <XRD>
    <Service priority="0">
      <Type>http://openid.net/signon/1.0</Type>
      <URI>http://www.mydomain.net/provider.jsp</URI>
    </Service>
  </XRD>
</xrds:XRDS> 
이거구요...
근데 문제는 웹브라우저에서 http://id.mydomain.net 을 입력했더니,
index.jsp파일 내용이 user.jsp안의 내용으로 되어있어서 그런지 파일 다운로드창이 나오더라구요.ㅠ.ㅠ  간단한 intro 페이지가 나와야 하는데 말이져...
정리하면, id.mydomain.net으로 로그인되게 하되, http://id.mydomain.net를 입력하면 간단한 intro 페이지가 나오게 할려하거든요, 근데 어케 해야할지를 모르겠어요, 1주일 넘게 삽질하고있는데 아직 해결을.. ㅠ.ㅠ 같이 연구좀 해보면 안될까요?.ㅠ.ㅠ 좀 도와주세요.ㅠ.ㅠ

---

### rath
*http://xrath.com/*
*2007-04-22T01:02:53.000Z*

날림으로 Consumer만 구현해보고 Provider 까지는 아직 해볼 생각이 없어서 치형님을 도와드릴만한 정신적 여유가 없습니다. 
나중에라도 java-openid-sxip 으로 Provider 구현할 일이 생기면 함께 연구해볼 수 있을 것 같네요. 죄송합니다-!

---

### 재현
*2008-01-14T14:54:26.000Z*

SampleConsumer를 그대로 쓰면 안되는 것이였군요.

---

