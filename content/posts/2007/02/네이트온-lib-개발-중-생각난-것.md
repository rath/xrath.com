---
title: "네이트온 lib 개발 중 생각난 것"
date: Tue Feb 20 2007 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2007/02/네이트온-lib-개발-중-생각난-것
lang: ko
tags: ["nateon", "open-source", "java", "chatbot"]
---

네이트온의 문자대화 기능과 싸이월드와 연동된 수많은 응용기술들을 생각하다보니
오픈소스로 하는 것은 예나 지금이나 SKT 무서워서 섣불리 못하겠고.. 

오픈소스도 어렵고 그보다 리스키한 서비스도 어렵다면, 개인적으로 재미나게 쓰는 거라도 되야한다.
mo 되는것만으로도 sediah님과 이것저것 아이디어를 주고 받았는데, 봇 띄워놓고 멀뚱멀뚱 있다보니

**=> CALM 0 CYHP rath@********* 미니홈피%20방명록에%20새%20글이%20등록되었습니다. 1 URL**

이런 것도 오네 :$

아놔 너무 좋은거 아니야? -_- SMS MO로 재미난 것들을 고려하다보니 80byte의 제한이 너무나도 컸다.
이러다 그냥 SK-VM 어플 만드는거 아닌지 모르겠다. 야후 거기에서도 지도가 있으면 정말 좋겠고..
어떻게든 이미지를 받아내고 싶은데 새로산 V840이 QVGA 니 WAP 페이지로 image 고고싱?
아놔 스크롤 꼭 되게하고 싶은데 그러려면 나야 SKT J2ME 1.0 or WIPI 2.0 밖에 못하고 
그러면 접근성 떨어지는데.. 하긴 (7) 나 혼자 쓰면 그만;

어제는 open XMMP java library [Smack](http://www.jivesoftware.org/smack/smack_gtalk.jsp)으로 구글톡 봇도 만들어봤다. 이건 프로토콜도 공개에다 워낙 Smack이 롱런하신거라 간단한 에코봇 만드는데 40줄 미만 (7)


```java
GoogleTalkConnection con = new GoogleTalkConnection();
con.login("joesmith", "password");
con.createChat("maryjane@gmail.com").sendMessage("Howdy!");
```


리서치 들어가기전에 괜히 '좋아 RFC 보고 그냥 짜는거야!' 하면서 이더리얼 켰다가 TLS base라 바로 닫고 -_-;;

그나저나 uptime 대략 32시간인데 죽겠다

## Comments

### reserve
*http://reserve.tistory.com*
*2007-02-21T02:33:55.000Z*

이야~ 너무 좋은데요? :$
저는 카드쓴거 SMS로 오는걸 바탕으로 가계부를 만들려고요;;
(언제쯤 가능할지는 모르겠지만.. 언젠가는~ -ㅇ-;; )

WAP으로 지도도 보고 싶은데.. 이미지 만들어서 변환도 해야되고.. -ㅇ-;;
아흑아흑~ 만들어주세용~ =3

---

### rath
*2007-02-21T06:03:45.000Z*

네이버 지도 API로 뽕뽕하면 날로 먹을 수 있을 것도 같은데 -ㅇ-
요새는 시간의 부족함을 절실히 느끼고 있어요 할거는 많고~ ㅎㅎ

---

### 개굴
*2007-02-22T12:26:12.000Z*

http://myohan.egloos.com/2968270 
ㅎㅎ 이런분도 계시다는 ... : )

---

### rath
*2007-02-24T13:10:08.000Z*

ㅎㅎ

---
