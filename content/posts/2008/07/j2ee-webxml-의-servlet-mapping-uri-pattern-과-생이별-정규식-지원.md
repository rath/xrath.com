---
title: "J2EE web.xml 의 servlet-mapping, uri-pattern 과 생이별 + 정규식 지원"
date: Sun Jul 06 2008 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2008/07/j2ee-webxml-의-servlet-mapping-uri-pattern-과-생이별-정규식-지원
lang: ko
tags: ["java", "servlet", "uri-mapping"]
---

머리속에 아이디어는 떠오르고 이녀석들을 그냥 버리기는 아까워서 [RTM](http://www.rememberthemilk.com/)에 등록해두기만 했다가, 오늘처럼 와이프 늦잠자는 일요일 오전이면 한두개씩 실행에 옮기곤 한다.

이번에 소개할 것은 web.xml에 들어가는 uri-pattern 과의 생이별.

### 동기

아이디어의 시작은 수십 수백개에 달하는 <servlet> <servlet-mapping>을 보고있자니 너무 한숨이 나와서 이다. attribute를 안쓰고 **하나의 서블릿**에 예쁜 이름을 매핑하려면 포매팅을 고려하여 9줄이 필요하다.

```xml
<servlet>
<servlet-name>xxx</servlet-name>
<servlet-class>aaa.bbb.xxx</servlet-class>
</servlet>

<servlet-mapping>
<servlet-name>xxx</servlet-name>
<uri-pattern>/hello-xxx</url-pattern>
</servlet-mapping>
```

나에게 정작 필요한 것은 servlet-class와 uri-pattern 뿐인데.. 뭐이리 길어! :@
바로 이것이 이 short-term 프로젝트의 시작이였다.

### 아이디어 강화

코엘료 소설에도 나와있듯이 열정은 과거에 속한 것을 모두 파괴해버린다고 하지 않았나. 직업 특성인지 내 특성인지 모르겠지만 아무튼 뭔가 몰입하면 밥먹는 것, 화장실 가는 것, 친구의 이름, 저 친구에게 내가 존댓말을 썼었는지 등등.. 다 까먹어버리는 나를 위해 rememberthemilk와 미투데이에 글을 적어놨다.
 
> 동적으로 넣어줄 방법을 이리저리 서치하다가 강철심장님 포스트 발견. 반가워요 심장님 o.o! 서블릿 클래스에 @UrlPattern(“/board/list”) 달아놓고 쫘르륵 mapping 할 계략인데.. 성공할 수 있을지.

그리고 어느덧 일요일이 다가왔다.

### 기능 및 사용

rath-uri-mapper.jar를 사용하면 더이상 servlet-mapping 노가다를 하지 않아도 되고, uri-pattern에 정규식을 사용할 수 있다!
단순히 자신이 만드는 서블릿 클래스에 UriPattern이란 annotation을 달아주면 해결
 


```java
import rath.web.mapper.UriPattern;
@UriPattern ("/login/[0-9]*\.([A-Za-z0-9]*)")
public class MelongServlet extends HttpServlet ..
```


클래스 annotation 덕분에 소스코드 편집하다가 '이거 uri-pattern이 뭐였지?' 하고 web.xml을 뒤지는 일도 줄어들었다. 

그리고 정규식을 사용한 덕분에 capture group의 덕을 볼 수 있다. 위의 예제의 경우 [A-Za-z0-9]* 가 그룹으로 묶여있었기 때문에, 이를 처리하는 서블릿에서request.getAttribute("uri.group.1") 을 요청하면 [A-Za-z0-9]* 부분만 뽑아올 수도 있다.

마지막으로 이 uri-mapper를 활성화하기 위해 rath-uri-mapper.jar (jdk 1.6으로 컴파일된 상태)를 WEB-INF/lib에 넣고 web.xml 에 다음과 같이 필터를 선언하면 된다.


```
uri-mapper
rath.web.mapper.MappingFilter
```


### 문제점

mod_caucho (xrath.com은 resin 3을 사용)나 mod_jk를 사용한다면 UriPattern에 지정한 녀석들이 j2ee container 까지 도착하지 않을 것이다. resin의 경우 apache VirtualHost 블럭의 ResinConfigServer 가 web.xml을 열심히 뒤져서 이것을 resin으로 보낼지 말지 결정하기 때문에 요청이 아예 j2ee container에 도달조차 하지 않을 것이다.

HttpServletRequest.getRemoteAddr 가 127.0.0.1이 나오는 슬픔을 꾹 참고.. mod_rewrite 를 썼다.

### 아쉬운 점

위의 문제점들을 해결하는 것도 필요하지만, JSP 의 page info 속성을 이용하여 jsp 에도 uri-pattern을 적용하고 싶었는데 매번 재컴파일해야하는 jsp의 page info에 uri-pattern을 넣으면 웃긴 상황이 연출되는데다가 -.- filter에서 도저히 JSP 페이지들을 담당하는 dynamic classloader 에 접근하기가 어려워서 포기했다. Container specific 한 코드들을 넣자면 (지금도 JspContainer란 enum이 있긴 하지만) work 디렉토리 구조를 분석해서 filter init 할때만 새 classloader로 그들을 읽고 servlet-info 만 훔쳐온 다음 버리면 되겠지만, 찝찝하므로 다음으로 미룬다.

### Next

- jsp 조금이라도 지원
- google code에 적당한 형태로 소스코드 풀기

- 날로 먹는 j2ee 생활자 rath 씀

## Comments

### 백일몽
*http://crackradio.com/*
*2008-07-07T01:57:14.000Z*

ajp_proxy 모듈 이용해서 프록시 통해 컨테이너로 바로 넘길 수도 있을 것 같은디.

---

### rath
*http://xrath.com/*
*2008-07-07T02:19:18.000Z*

으흠~ 시도해봐야겠네요

---

### rath
*http://xrath.com/*
*2008-07-07T05:43:26.000Z*

으음~ 그러고보니 ajp네요 -,- 제 서버는 resin인데.. 먼가 쌈빡한 방법 없을까 고민중

---

### 한날
*http://www.hannal.net*
*2008-07-08T16:15:36.000Z*

http://www.djangoproject.com/documentation/url_dispatch/

이런 거지? (쟈는 django on python)

---

### rath
*http://xrath.com/*
*2008-07-08T17:26:29.000Z*

응 완전히 똑같은 거라고 봐도 대~ ㅎㅎ

---
