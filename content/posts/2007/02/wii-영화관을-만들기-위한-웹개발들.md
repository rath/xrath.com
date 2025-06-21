---
title: "Wii 영화관을 만들기 위한 웹개발들"
date: Sat Feb 03 2007 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2007/02/wii-영화관을-만들기-위한-웹개발들
lang: ko
tags: ["web-development", "wii", "java-servlet"]
---

**[Wii 영화관 (1분 49초)]**
@movie:image=http://xrath.com/img/wii_theater.jpg,movie=http://desk.xrath.com/files/wii_theater.flv,width=320,height=240@

Wii 영화관람 페이지를 만들었다.
어머니의 못본 드라마 다시 보기용 관람 페이지가 될 가능성 다분 (7) 

당연하게도 Wii 일본판에 한글폰트가 없어서, desk.xrath.com/print 란 서블릿을 만들었다.
이녀석은 msg로 출력할 메시지를 utf-8로 받아 이를 png 로 출력해주는 서블릿이다.

사용할 사람들도 거의 없을테니 리퍼러 안막고 그냥 내비둘련다 -ㅅ-
아래 이미지의 등록정보를 보면 대충 형식을 알 수 있을 것이다.

```
Host: desk.xrath.com
URI: print
Param: msg = UTF-8로 인코딩된 문자열
Param: size = 글자 크기 (Default 12) optional
Param: fg = aa30bb 형식의 글자 전경색 (Default black) optional
Param: bg = aa30bb 형식의 글자 배경색 (Default white) optional
Param: b = 0 또는 1의 Bold 여부 (Default 1) optional
```

예상했겠지만 print 서블릿은 소스코드가 별 거 없다. [HangulPrint.java](/files/HangulPrint.html)

하지만 이 print 서블릿이 있다고 해도 새 페이지를 만들거나 기존 페이지를 편집하고자 하면 노가다를 피할 수 없다. 예를 들어 '<b>News</b> 안녕하세요 좋은 아침입니다' 문장을 페이지에 삽입하려고 한다면 워드랩을 고려해서 

<b>News</b> <img src="/print?msg=%EC%95%88%EB%85%95%ED%95%98%EC%84%B8%EC%9A%94" > <img src="/print?msg=%EC%A2%8B%EC%9D%80"> <img src="/print?msg=%EC%95%84%EC%B9%A8%EC%9E%85%EB%8B%88%EB%8B%A4">

이짓을 해야한다. 어우 어뜨케 -_-s

그래서 최근 구경했던 prototype과 비슷한 유틸 메서드를 만들었다. 메서드명은 $ 

protected String $( String msg )
protected String $( String msg, int size )
protected String $( String msg, int size, String fg )
protected String $( String msg, int size, String fg, String bg )

$ 메서드는 먼저 HTML 태그가 있다면 그 부분은 by pass하고 그 후 공백(0x20)으로 split 해서 각각에 대해 img 태그를 만들어주는 것이다. 

위 메서드 signature를 보면 알 수 있지만 static도 아니고 protected 다. 
클래스이름 아무리 짧게 하더라도 매번 WebUtil.$("미녀는 삼류를 좋아해~") 이러기도 귀찮아서,

public abstract class **RathJsp** extends **com.caucho.jsp.JavaPage**

를 만들었다. 결과적으로 Wii 영화관 페이지의 소스코드는 요런 형식!
<%= $("감독: 에드위드 즈윅", 18) %><br>
커스텀 태그를 만들면 조금 더 이뻐지겠지만, 황금의 백수생활이 얼마 남지 않았으니 패스 --

다음 페이지는 이전 포스트였던 '백수 끝' 내용을 $로 한큐에 이미지로 바꿔본 예제이다.
[http://xrath.com/tmp/post379.jsp](/tmp/post379.jsp)

공백으로 끊어서 워드랩도 잘 된다 ㅎㅎ

## Comments

### 다즐링
*http://iz4u.net/blog*
*2007-02-03T22:55:27.000Z*

후덜덜;;

---

### rath
*2007-02-04T11:25:16.000Z*

날씨가 많이 춥죠?;;

---

### 윤종현
*http://blog.naver.com/neoctrl*
*2007-02-04T15:26:22.000Z*

엇, 오픈마루로 간거에요?

---

### rath
*2007-02-04T16:04:55.000Z*

옙~ 오늘부터 출근이에요 -ㅇ-; 어여 자러~ ㅎㅎ
그나저나 버그가 꽤 생기네요 종현님이 코멘트 입력 버그 발견 3회째.. ㅠㅠ

---

### 가이브
*http://cyworld.co.kr/guyv*
*2007-02-06T06:28:16.000Z*

안녕하세용~~ 함씩 눈팅하는데 들렸다 갑니다. :)

... 그런데 저는 인간이 아닌지 몇번 시도해야 증명이 되네요 T_T

---

### rath
*2007-02-06T13:42:48.000Z*

밑에 문구 바꿨습니다 -_-; 틀리시더라도 운 나쁘다는 것은 아닙니다 ~_~

---

### 가이브
*http://cyworld.co.kr/guy*
*2007-02-07T05:48:13.000Z*

헉 -_-;;;; 죄송합니다. 꾸벅;

---

### rath
*2007-02-07T14:13:52.000Z*

엇 재미로 바꿔본건데, 미안해하시면 어뜨케요~ -ㅅ-;

---
