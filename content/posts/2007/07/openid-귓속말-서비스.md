---
title: "OpenID 귓속말 서비스"
date: Mon Jul 23 2007 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2007/07/openid-귓속말-서비스
lang: ko
tags: ["openid", "authentication", "sms-notifications", "web-service"]
---

# OpenID 귓속말 소개

OpenID로 **개인적인 메시지를 주고 받을 수 있는** 간단한 서비스입니다.

아직 정식 서비스가 아니라 이용약관이나 별도의 가입 절차도 없지만, 편리하게 사용해볼 수 있다는 장점이 있습니다.

 

기능 목록입니다.

OpenID & 로그인 전용
귓속말 보내기
귓말 수신시 SMS 로 알림
귓말 수신시 내 스프링노트의 지정한 페이지에 쌓이도록 하기
받는 사람 입력창에 **me2day 사용자의 아이디를 입력**하고 CTRL+SPACE 입력시 OpenID 자동완성 (Windows, Linux Only)

 

# 스크린샷

귓속말 서비스를 이용중인 화면입니다. 설정 부분의 매력적인 부가기능(SMS, 스프링노트로 쓰기)을 주목해주세요 :-)

![openid-whisper.png](http://rath.springnote.com/pages/378662/attachments/157794)

 

# 써보고 싶어요!

OpenID 만 있다면 바로 이용해보실 수 있습니다. [http://whisper.lab01.openmaru.com/](http://whisper.lab01.openmaru.com/)

사용의 편리성을 위해 아무런 가입절차가 없습니다. 그저 자신의 오픈아이디로 로그인 하는 것이 가입절차의 전부입니다.

 

아직 OpenID를 가지고 있지 않으신가요? 그렇다면 지금 바로 OpenID를 만드세요.

[http://myid.net](http://myid.net/)
[http://myopenid.com](http://myopenid.com/)
[http://idtail.com](http://idtail.com/)
[http://www.idpia.com/](http://www.idpia.com/)

 

로그인을 하셨나요? 귓속말 본문을 입력하시고, 받는 사람 OpenID 주소창에 메시지를 받을 친구의 오픈아이디를 넣으시고, '보내기' 버튼을 누르시면 됩니다. 너무 간단하다고요? 죄송합니다. 그게 전부입니다 :-)

 

궁금한 게 있을 경우 받는 사람 OpenID 주소에 제 오픈아이디인 [http://rath.myid.net/](http://rath.myid.net/) 를 입력하고 메시지를 보내보세요. 확인 즉시 회신해드리겠습니다.

 

# 매번 귓속말을 확인하러 이 사이트를 방문해야하나요??

그럴 필요 없습니다. 우측 상단의 '설정' 메뉴를 이용하면 귓말 도착시 SMS 및 자신의 스프링노트에 알람을 받을 수 있도록 설정할 수 있습니다.

![openid-whisper-pref.png](http://rath.springnote.com/pages/378662/attachments/157796)

 

 

### (1) SMS로 귓말 수신 알람 받기

이것을 사용하기로 하고 자신의 휴대폰 번호를 입력해두면 **귓속말이 도착했을 때 SMS로 도착 알림**을 받을 수 있습니다.

아직은 시범 서비스이므로 사용자에게 과금 하는 절차는 없습니다. :-)

 

### (2) 받은 귓말을 내 스프링노트에 쓰기

SMS 수신 알람 기능은 '누군가 나에게 새로운 귓속말을 보냈다' 는 것을 알려주기만 합니다. 하지만 스프링노트에 쓰기 기능을 사용하면 아예 귓속말 사이트에 접속하지 않아도 됩니다. **귓속말이 도착하면 자신이 지정한 스프링노트 페이지**에 바로바로 **귓속말을 보낸 사람의 OpenID, 보낸 시각, 귓속말 내용** 이렇게 3개가 차곡차곡 쌓이게 됩니다.

 

### (3) 매쉬업을 위한 사용자키

이 오픈ID 귓속말 서비스를 기반으로 매쉬업(Mash-Up) 서비스를 이용하기 위한 사람들을 위해 '**사용자 키**'를 제공합니다.

이용 초기에는 사용자키를 발급되지 않은 상태이며, '**새 사용자키 발급**' 버튼을 눌러야 발급이 됩니다. 이 사용자키는 비밀번호만큼이나 중요한 것입니다! 만약 누출의 위험이 생겼을 경우 '**새 사용자키 발급**' 버튼을 눌러 다시 발급받으시는 것이 좋습니다.

 

매쉬업 개발자 분들은 각 사용자에게 키를 복사할 것을 요청해야할텐데요, 그것을 위한 편리한 URL을 제공합니다.

 

[  http://whisper.lab01.openmaru.com/api/getkey?openid=http://rath.myid.net/](http://whisper.lab01.openmaru.com/api/getkey?openid=http://rath.myid.net/)

 

위 URL 에서 마지막 openid 파라미터 부분만 사용자의 openid로 바꾸면 아래와 같이 사용자가 무슨 키를 복사해야하는지 한 눈에 알아볼 수 있는 페이지가 표시됩니다.

 

![openid-whisper-userkey.png](http://rath.springnote.com/pages/378662/attachments/157797)

 

 

# 개발자들을 위한 API

미흡한 형태이나 몇가지 API가 공개되어 있습니다.

귓말 보내기

설명: 특정 사용자에게 귓속말을 보냅니다.
URL: [http://whisper.lab01.openmaru.com/api/send](http://whisper.lab01.openmaru.com/api/send)
Method: **POST** only
인증: **BASIC_AUTH**.

username : normalize 된 송신자의 OpenID.
password : 사용자키 (ex. 0123456)

파라미터

openid_to : 받는 사람의 openid
message : UTF-8로 인코딩된 귓속말 내용

결과

없음. 성공시 200 OK

읽지 않은 귓말 개수 확인

설명: 내가(특정 사용자) 읽지 않은 귓속말의 개수를 확인합니다.
URL: [http://whisper.lab01.openmaru.com/api/hasunread](http://whisper.lab01.openmaru.com/api/hasunread)
Method: **GET** only
인증: **BASIC_AUTH **

username : normalize 된 송신자의 OpenID.
password : 사용자키 (ex. 0123456)

파라미터

openid : BASIC_AUTH 사용시 불필요.

결과

인증시

읽지 않은 귓속말의 개수

무인증시

읽지 않은 귓속말이 존재하는지 여부만 0과 1로 출력

XML 출력 예

<?xml version="1.0" encoding="UTF-8"?>
<whisper-count type="unread">0</whisper-count>

사용자키 조회

설명: 특정 사용자의 사용자키를 조회합니다.
URL: [http://whisper.lab01.openmaru.com/api/getkey](http://whisper.lab01.openmaru.com/api/getkey)
Method: **GET** only
인증: 없음. (IDP의 인증을 필요로함)
파라미터

openid : 사용자키를 얻어올 사용자의 정규화된 OpenID

결과

사용자키가 출력된 HTML 페이지.

**내가 받은 귓속말 목록** (받은 귓속말 only, 보낸 귓속말은 지원하지 않음)

URL: [http://whisper.lab01.openmaru.com/api/list](http://whisper.lab01.openmaru.com/api/list)
Method: **GET** Only
인증: **BASIC_AUTH**

username : normalize 된 자신의 OpenID
password : 사용자키

응답 형식

messages 엘리먼트 속의 message 엘리먼트 집합
message:id 속성은 메시지의 고유아이디
message:hasRead 속성은 이 메시지를 읽었는지 안읽었는지 여부
from 보낸 사람의 OpenID
content 귓속말 내용
sent-date yyyy-MM-dd HH:mm:ss 형식으로 표현된 귓속말을 받은 시각.

응답 XML 예

<?xml version="1.0" encoding="UTF-8"?>
<messages>
  <message id="6443987249387294823718732132-2007072212323" hasRead="false">
    <from> [http://rath.myid.net/](http://rath.myid.net/) </from>
    <content><!CDATA[아- 아- 동네 사람들- 오픈아이디 귓속말 API 좀 써봐연~]]></content>
    <sent-date>yyyy-MM-dd HH:mm:ss</sent-date>
  </message>
  <message id="328917987a123123823718732132-2007072212323" hasRead="true">
    <from> [http://rath.myid.net/](http://rath.myid.net/) </from>
    <content><!CDATA[아- 아- 동네 사람들- 오픈아이디 귓속말 API 좀 써봐연~]]></content>
    <sent-date>yyyy-MM-dd HH:mm:ss</sent-date>
  </message>
</messages>

**내 귓속말 삭제**

URL: [http://whisper.lab01.openmaru.com/api/delete/$(MESSAGE-ID)](http://whisper.lab01.openmaru.com/api/delete/$%28MESSAGE-ID%29)
Method: **DELETE** Only
인증: **BASIC_AUTH**

username : normalize 된 자신의 OpenID
password : 사용자키

파라미터

message-id : URI 부분 /api/delete/ 뒤에 삭제하고자 하는 메시지의 id를 넣는다.

예) /api/delete/328917987a123123823718732132-2007072212323

응답 형식

200 OK
otherwise error (401, 500)

 

 

이 글은 [스프링노트](http://rath.springnote.com/pages/378662)에서 작성되었습니다.

## Comments

### 프로도
*http://skyizblue.myid.net/*
*2007-07-23T02:14:26.000Z*

-_-)=b 최고!

---

### rath
*http://xrath.com/*
*2007-07-23T05:49:44.000Z*

:$

---

### S2day
*http://s2day.com*
*2007-07-23T20:05:23.000Z*

보...복잡하군요;;;

---

### rath
*http://xrath.com/*
*2007-07-23T23:49:39.000Z*

문서를 좀 길게 쓰는 버릇이 있어서 -,.-

---

### 버즐순이
*http://fribirdz.net/*
*2007-07-26T07:28:30.000Z*

codian님에게 책 한권 정말 드렸습니까. ㅋㅋㅋ

---

### rath
*http://xrath.com/*
*2007-07-26T07:59:01.000Z*

구라에요 ㅋㅋㅋ

---

### rath
*http://xrath.com/*
*2007-12-13T15:05:00.000Z*

귓속말 개편으로 한동안 API가 작동하지 않을겁니다. 양해 부탁드립니다.

---
