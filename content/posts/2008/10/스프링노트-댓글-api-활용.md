---
title: "스프링노트 댓글 API 활용"
date: 2008-10-20
slug: 2008/10/스프링노트-댓글-api-활용
lang: ko
---

지난달 개편된 [스프링노트](http://www.springnote.com/)에는 읽기모드, 대쉬보드, 페이지 댓글 등의 기능들이 있다.

 

요새 블로그에 글을 쓸 때 스프링노트를 적극 활용중인데, 내 홈피의 글쓰기 편집창보다 스프링노트가 훨씬 나은데다 블로그로 보내기 기능을 갖고 있기 때문. 이미지 트래픽도 절감하고 -_- 이래저래 좋다. 그래서 블로그에 쓰는 내용은 대부분 그 원본이 스프링노트에 있다.

그러다보니 **댓글이 분산되는 일**을 겪게 된다. 얼마전에 쓴 [생산성 2.0 이란 글](http://rath.springnote.com/pages/1949206)의 경우 모든 댓글이 스프링노트에 달렸고 블로그에 발행된 글에는 댓글이 하나도 달리지 않았고, [Firefox 3.1 beta 에 대해 리뷰한 글](http://rath.springnote.com/pages/1934834)의 경우 대부분의 댓글이 스프링노트에 달리고 블로그에는 2개의 댓글만이 달려있다!

 

;ㅁ; 그래서 블로그 특정 포스트의 댓글을 출력할 때 그 글을 발행한 원본 스프링노트 페이지에 달린 댓글도 함께 출력하도록 수정하였다.

 

   

![comments-with-springnote.png](http://rath.springnote.com/pages/1961506/attachments/877700)

 

## 스프링노트 페이지의 댓글은 어떻게 가져오나

일단 페이지의 댓글을 가져와야 한다. 댓글은 GET http://rath.springnote.com/pages/1111/comments.xml 형태로 가져올 수 있다.

이번 기회에 [getComments](/devdoc/springnote/rath/toys/springnote/SpringNote.html#getComments%28int%29) 메서드를 [springnote-api for java](http://code.google.com/p/springnote-api/)에 추가하였으니 java 개발자들은 [springnote-api svn](http://code.google.com/p/springnote-api/source/checkout) 을 사용할 수 있을 것이다.

 

## 그 다음엔?

블로그의 댓글과 스프링노트의 댓글을 필요한만큼 정규화시킨다. 딱히 스프링노트 Comment 리소스에 댓글 작성자의 정보(오픈아이디나 스프링노트 페이지 주소)를 제공하지 않아 완벽하진 않겠지만 그래도 스프링노트 아이콘 

![](/img/springnote-icon.png)

 과 스프링노트 안에서의 닉네임 정도는 표시해줄 수 있을 것이다. 작성자, 내용, 날짜. 이렇게 3개면 충분하다. 간단히 List 에 넣은 뒤 생성날짜 기준으로 오름차순 정렬을 해준다. (Collections.sort(List, Comparator)를 썼다)

그리고 출력!

 

## 포스트가 스프링노트에서 내보낸 것인지 어떻게 알지? pageId는 또 어떻게 알고?

그러게 말이다. 스프링노트에서 내보낸 것인지 아닌지 깔끔하게 알 수 있는 방법은 없다. 그저 스프링노트에서 내보낸 글일 경우 "*이 글은 스프링노트에서 작성되었습니다.*" 라고 표시되는데 이것이 수정될 일은 거의 없다치고 (댓글 fetcher 코드는 블로그 주인장만 건드리는 것이고 포스트도 주인장만 다는 것이므로) 정규식을 써버리자.

블로그 내용에

Pattern p = Pattern.compile("http://[a-zA-Z0-9]*\\.springnote\\.com/pages/([0-9]*)\">스프링노트</a>에서 작성");

이 패턴이 있는지 조사한 뒤

Matcher matcher = p.matcher(HTML태그를포함한블로그내용);
if( matcher.find() ) {
  String pageId = matcher.group(1);
}

페이지 번호를 캡춰해온다. 그러면 pageId 를 얻어온 곳에서부터 SpringNote API를 콜하여 댓글을 얻어오고, 원 댓글과 merge 하는 작업 및 출력하는 루틴을 거치게 하면 된다.

 

스프링노트 API... 튼튼하겠지?

이 글은 [스프링노트](http://rath.springnote.com/pages/1961506)에서 작성되었습니다.

## Comments

### deepblue
*http://myruby.net/*
*2008-10-20T12:56:50.000Z*

영차~ 영차~ 님 너무 멋져

---

### 정원희
*http://www.potatosoft.com*
*2008-10-21T04:28:23.000Z*

글쓰기가 힘드신거라면 블로그를 설치형으로 바꾸시는것도 -_-;; 아니면 편집창만 따로 바꾸시던지요 ㅎㅎ NC 새 사옥 멋지네요 /부럽

---

### rath
*http://xrath.com/*
*2008-10-21T20:04:04.000Z*

deepblue// 그러게 ㅠㅠ metaWeblog 같은 API엔 왜 comment api가 없는걸까 ;ㅁ;

---

### rath
*http://xrath.com/*
*2008-10-21T20:05:41.000Z*

정원희// 몇년 묵은 초 구세대 블로그긴 하지만 사제 블로그라.. 설치형이나 다른 곳으로 갈아타지 않고 있습니다. ㅎㅎ 새 NC 사옥 최고에요! 아아 회사가 좋아지면 힘들어지는데 -_- 말입니다;

---

