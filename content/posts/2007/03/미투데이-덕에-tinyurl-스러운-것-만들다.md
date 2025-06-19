---
title: "미투데이 덕에 tinyurl 스러운 것 만들다"
date: 2007-03-23
slug: 2007/03/미투데이-덕에-tinyurl-스러운-것-만들다
lang: ko
---

[미투데이](http://me2day.net)에 글을 남길 때는 북마클릿을 사용하더라도 URL 포함 150자를 넘지 못한다.
그래서 [tinyurl](http://tinyurl.com)를 쓰곤 한다던데, 자식 tinyurl.com 이면 xrath.com 보다도 긴 주제에 -_-!!

"차라투스트라는 이렇게 말했다" 를 구입했다고 자랑하는 글을 올리면서 예스24의 긴 URL(http://www.yes24.com/Goods/FTGoodsView.aspx? goodsNo=426994&CategoryNumber=001001017001011) 올리려다가
그놈 참 띠거워 보여서 MSN 타자봇이랑 대충 연동했다.

URL 형식은 **[http://xrath.com/url/1](/url/1)**
등록은 타자봇에서 아래 그림처럼 할 수 있다.

![](/img/tinyurl_msn.png)

은근 이러저리 손 많이 댔다. 
(1) mysql에다 tinyurl 테이블 만들고 
(2) web.xml에 /url/* servlet-mapping 추가
(3) 서블릿이 받으면 쿼리해다 302 안녕~
(4) 타자봇에다 startsWith "줄여죠 http://" 잡아다 db insert 코드 넣기
(5) 타자봇 죽였다 살리기 -.-

MSN 타자봇이 뭔지 잘 모르는 분들을 위해 프리웨어 [Wink](http://www.debugmode.com/wink/)로 스크린캐스트를 만들어봤다.

**아래 있는거 이미지 아닙니다. 마우스로 클릭하세요! 동영상입니다.**
@movie:image=http://xrath.com/img/tiny1508.jpg,movie=http://desk.xrath.com/files/tinyurl.flv,width=640,height=480@

[MSN 타자봇](/2006/07/msn-타자봇-개발-현황)이 뭔지 모르신다면 xrath.com 앞에 골뱅이 앞에 taja를 MSN 친구로 추가하시면 봇이 자동 수락해주기 때문에 아무런 절차없이 즐거운 타자봇 세상으로 올 수 있다. **줄여죠** 기능을 타자봇 유저라면 누구나 맘껏 쓸 수 있다 :)

## Comments

### 프리버즈
*2007-03-23T18:01:28.000Z*

헉. 북마클릿에서 150자 이상 글쓰기 되는데 -0-

---

### rath
*http://xrath.com/*
*2007-03-23T18:02:33.000Z*

아놔 나 뭔짓 한거야 -_-;;; 진정한 뺑이

---

### rath
*http://xrath.com/*
*2007-03-23T18:24:35.000Z*

아무도 안쓰겠군. 나라도 열심히 써야겠어 후우욱..

---

### 이진석
*http://allieus.myid.net/*
*2007-03-24T05:07:44.000Z*

다른 사람에게 말로서, 긴 URL알려주기 불편할때 쓰면 딱 좋을거 같은데 ^^;;;

---

### 한날
*http://www.hannal.net*
*2007-03-24T09:25:38.000Z*

아아, 이 분, 무척 발랄하셔라 >_<

---

### nova
*http://trivial.tistory.com/*
*2007-03-24T09:36:24.000Z*

죄송해요. http://urlx.org/가 더 짧아요. ;-)

---

### 띠용
*2007-03-24T09:39:35.000Z*

헉.. 등록해놓고 자주 이용할께요+_+

---

### rath
*http://xrath.com/*
*2007-03-24T11:46:46.000Z*

이진석: 그렇게라도 봐주시니 감사 :$

---

### rath
*http://xrath.com/*
*2007-03-24T11:48:09.000Z*

한날, 히죽 반가웠어요

---

### rath
*http://xrath.com/*
*2007-03-24T11:50:19.000Z*

nova, tinyurl보다 짧고 심플하네요. 좋은 정보 감사드립니다 ^_^

---

### rath
*http://xrath.com/*
*2007-03-24T11:50:43.000Z*

띠용, 네 마음껏 이용하세요~

---

### reserve
*http://reserve.tistory.com*
*2007-03-26T00:43:45.000Z*

URL을 줄이는 용도 외에, 자신이 관심있는 URL을 가볍게 저장하는 용도로도 쓸 수 있겠군요. ^^

---

### rath
*http://xrath.com/*
*2007-03-26T00:51:06.000Z*

'내 최근 URL' 이라고 하면 최근 저장한 URL 5개 정도 보여주게 하면.. 재밌으려나용~_~

---

