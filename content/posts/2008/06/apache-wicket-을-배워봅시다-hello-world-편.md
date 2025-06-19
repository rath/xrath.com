---
title: "Apache Wicket 을 배워봅시다. Hello World 편"
date: 2008-06-17
slug: 2008/06/apache-wicket-을-배워봅시다-hello-world-편
lang: ko
---

Wicket Hello World 예제  [원문: [Apache Wicket - ExampleHelloWorld](http://wicket.apache.org/examplehelloworld.html)]

HelloWorld 를 실행하기 위해 wicket binary 및 의존성 library 들을 가져다 놓습니다.

1. Apache Wicket 1.3.3 을 [다운로드](http://www.apache.org/dyn/closer.cgi/wicket/1.3.3) 한다. 수많은 jar 들 중, wicket-1.3.3.jar 만 필요.
2. slf4j [다운로드](http://www.slf4j.org/download.html). jar 파일이 우르르 나올텐데 그 중 slf4j-api-1.5.2jar 와 slf4j-log4j12-1.5.2.jar 만 취한다.
3. commons-logging-1.1.1.jar [다운로드](http://commons.apache.org/downloads/download_logging.cgi)
4. log4j 1.2.x [다운로드](http://logging.apache.org/log4j/1.2/download.html)

위와 같이 총 5개의 jar 파일이 WEB-INF/lib 에 있으면 wicket application 을 구동할 준비가 다 된 것입니다. (slf4j-log4j12 대신 slf4j-simple을 받고, log4j는 받지 않으셔도 무관합니다.)

Maven을 즐겨 쓰시는 분이라면 


```
mvn archetype:create -DarchetypeGroupId=org.apache.wicket -DarchetypeArtifactId=wicket-archetype-quickstart -DarchetypeVersion=1.3.3 -DgroupId=com.mycompany -DartifactId=myproject
```


로 준비작업을 마칠 수 있습니다.

자, 이제 web.xml 파일을 건드릴 차례입니다. /* 로 오는 모든 요청들을 [Wicket Filter](http://wicket.apache.org/docs/wicket-1.3.2/wicket/apidocs/org/apache/wicket/protocol/http/WicketFilter.html) 가 받게 해줍니다.

필터 클래스 FQDN은 org.apache.wicket.protocol.http.WicketFilter 입니다. 
init-param 에 applicationClassName 에는 wicket WebApplication 구현체 클래스명을 넣어주면 준비 완료입니다. 저는 가계부 어플리케이션을 만들 계획이라 rath.quicken.www.QuickenApplication 으로 했습니다.


```
Rath and Elle's Quicken at Home
 org.apache.wicket.protocol.http.WicketFilter

applicationClassName

rath.quicken.www.QuickenApplication

 Rath and Elle's Quicken at Home
 /*
```


이제 WebApplication 클래스를 만들고 해당 웹app의 HomePage 페이지를 만듭니다.
그걸로 HelloWorld는 마무리됩니다. [여기](http://wicket.apache.org/examplehelloworld.html)의 예제 소스코드를 참조하여 HelloWorldApplication과 HelloWorld를 작성합니다. 

패키지명 적당히 주시고.. 하면 되는데, WebApplication 클래스의 getHomePage 메서드에 이 어플리케이션의 '홈페이지'를 처리할 WebPage의 클래스명을 적어줍니다. 


```java
package rath.quicken.www;
import org.apache.wicket.protocol.http.WebApplication;

public class QuickenApplication extends WebApplication
public class HelloWorldApplication extends WebApplication
{
    public QuickenApplicationHelloWorldApplication()
    {

    }

    public Class getHomePage()
    {
        return HelloWorld.class;
    }
}
```



WebApplication 에서는 이 webapp의 첫 페이지(HomePage) 클래스를 리턴하는 것 외에 이 webapp의 여러가지 설정들을 넣을 수 있습니다. 예를 들어 newSession, newSessionStore, getApplicationSettings 등이 다 여기에 있지요. 나중에 알아볼 mount 메서드도 WebApplication 클래스의 메서드입니다. path :: webpage class map 이랄까요? 페이지를 특정 path 에 mount 한다는 의미로 생각하시면 편할 것입니다.

Wicket 이 타 웹 framework 들에 비해 초기 설정 cost 는 확실히 적은 편이지만, 이래저래 customize 할 수 있는 부분이 워낙 많아 이것들은 [Wicket In Action](http://www.amazon.com/Wicket-Action-Martijn-Dashorst/dp/1932394982) 책이 도착하면 차근차근 알아볼 생각입니다. 

아무튼 HomePage 클래스를 구현해야할 차례입니다. 


```java
import org.apache.wicket.markup.html.WebPage;
import org.apache.wicket.markup.html.basic.Label;

public class HelloWorld extends WebPage
{
    public HelloWorld()
    {
        add(new Label("message", "Hello World!"));
    }
}
```


WebPage 클래스를 상속했음이 중요한 내용이고요, 여기서는 그저 label 에 메시지를 표시할 것이기 때문에 Label 클래스를 만들고 id가 message인 녀석의 value를 Hello World!로 표시되도록 했습니다.

Wicket 에서는 org.apache.wicket.markup 패키지랑 그 하위 패키지에서 Label 과 같은 웹개발에 필요한 여러가지 html 클래스들의 추상 클래스들을 제공하고 있습니다. Label 도 있고.. MultilineLabel 도 있고.. markup.form 패키지에서는 form, 각 type별 input element 들(버튼, 체크박스, 라디오버튼, 리스트, textarea 등)에 대한 추상 클래스들도 싸그리 제공하고 있습니다. 

아무튼 HelloWorld 페이지에서는 id:message 에 HelloWorld! 를 표시하라는 label을 추가(add)하기만 했습니다. 그럼.. 이것을 렌더링할 html 페이지가 있어야겠지요?


```
xxx
```


이런식입니다. Wicket 에서 자랑하는 것이 다른 웹프레임워크처럼 새로운 태그들을 배우지 않아도 된다- 는 것인데, 위 소스코드에서 볼 수 있듯이 기존 html 코드들을 그대로 쓸 수 있는 대신, WebPage 인스턴스와의 연결고리를 위해 wicket:id attribute 가 있습니다. 이정도면.. 뭐 특별히 html 렌더링을 위해 custom tag를 배우지 않아도 된다- 는 것을 인정해주기로 했습니다. 하하;

여기서 중요한 것은 이 HTML 리소스 파일의 위치입니다. HelloWorld extends WebPage 의 소스코드 어디에서도 이 웹페이지의 리소스(.html 파일)이 어디있는지 알려주지 않았습니다. 도대체 어디에 위치해야합니까! @.@

정답은- 

WebPage 상속한 클래스의 클래스명과 동일한 형태로 classes/path/to/HelloWorld.html 에 위치해야합니다. 지금 이 예제에서 HelloWorld 의 패키지명이 foo.bar 였다면, classes/foo/bar/HelloWorld.html 에 위치하면 되는 것입니다.

이것이 맘에 안든다고요? HTML 파일을 어디로부터 읽어들일지 변경하는 것이 가능합니다.
[Control where HTML files are loaded from](http://cwiki.apache.org/WICKET/control-where-html-files-are-loaded-from.html) 이 문서를 참조하세요.

WebApplication 클래스에서 getResourceSettings() 를 불러 addResourceFolder("/html") 를 불러주는 것으로 WEB-INF/classes/path/to/xxx 에 html 을 저장해야하는 것에서 /html/path/to/xxx 로 간단히 변경될 수 있습니다. 

리소스 파일이 WebPage의 패키지명과 동일한 디렉토리 구조를 가져야 하는 것이 맘에 안드신다면 ResourceStreamLocator 를 재지정하여 이를 해결할 수 있습니다. [Control where HTML files are loaded from](http://cwiki.apache.org/WICKET/control-where-html-files-are-loaded-from.html) 에서는 PathStripperLocator 를 만들어 패키지명을 무시하고 /html/HelloWorld.html 을 사용하도록 하고 있습니다. 이것 역시 WebApplication.ge
tResourceSettings().setResourceStreamLocator 메서드로 재정의된 ResourceStreamLocator 를 사용하도록 할 수 있습니다.

아무튼 HelloWorld.html 파일의 <span wicket:id=..>xxx</span> 의 xxx 부분에 Hello World! 가 찍히는 것을 볼 수 있을 것입니다. 이 HelloWorld 웹페이지는 HomePage 로 지정해뒀으므로 http://localhost/ 로 접근하면 됩니다.

이것으로 Wicket 을 가볍게 알아보기 위한 HelloWorld 스터디를 마치겠습니다.
spring, hibernate, ibatis 와의 연동도 제공하고 있다고 하는데, 제가 아는 게 없어서 -_- 차근차근 잘근잘근 공부해가며 스터디해볼 생각입니다.

만들려는 가계부 웹어플리케이션이 인터페이스는 별 거 없으면서도 할 건 다 해야되서 ;ㅁ; 결코 Wicket을 수박 겉핥기 식으로 스터디하게 되진 않을 듯 합니다. 

다음 편도 기대해주세요! :$

## Comments

### 오스카
*http://www.oscarplex.net*
*2008-06-18T03:14:02.000Z*

웹 개발 관련 내용은 이젠 기억 저편으로;;;

---

### rath
*http://xrath.com/*
*2008-06-19T18:12:03.000Z*

기왕 웹 건드려 본김에 신나게 들쑤셔 보려는 계획입니다. ㅎㅎ;

---

### hey
*http://heycalmdown.myid.net/*
*2008-06-27T08:24:19.000Z*

가계부~ 오예~

---

### 잘살앙
*http://k55679.textcube.com*
*2010-02-24T15:36:44.000Z*

아훙...wicket.apache.org에 있는 튜토리얼을 보면서 하고 있었는데 안됐는데 글을 읽고 나니 html의 위치가 잘못 되었군요..다시 시도 해봐야겠습니다. 감사합니다.

---

### 잘살앙
*http://k55679.textcube.com*
*2010-02-24T15:38:19.000Z*

아참 그리고.. 어디서 많이 보던 URL이어서 생각해보니 JMSN만드신분이신듯.. 메신져 만드는데 목표 였습니다. 비록 도달을 못했지만..^^

---

