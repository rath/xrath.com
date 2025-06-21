---
title: "me2video 개발 후기"
date: Tue Jul 08 2008 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2008/07/me2video-개발-후기
lang: ko
tags: ["video-development", "me2day", "mobile", "multimedia"]
---

근 1년만에 me2day 범주에 글을 씁니다.
미투데이에서 평생을 함께할 인생의 반려자까지 찾았는데, 너무 매쉬업이 뜸한 거 아닌가 해서 -_-..

한 때는 [매쉬업 토론](http://blog.openmaru.com/132)에도 참여하기도 했지만, 매쉬업에 대해 왠지 모를 사회적 트렌드(?)가 마음에 안들어서 잠시 접어뒀었습니다. 
매시업관련 용어 정의는 얼마전 교보문고에서 훑어본 Flickr MASHUPS 에서 말하듯 매시업, 리믹스 등이 있는데, 사실 그런 것에는 전혀 관심이 없고 그저 **내가 필요한 거 만들고 싶고, 그거 만들고 사용하는데에 필요한 비용들을 절약해주는 리소스가 있다면 뭐든 끌어다 쓰겠다**는 심보입니다.

아무튼 이리저리 돌고 돌아 me2video는 완성되었습니다. 며칠전 uri-mapper 포스트에서 쓰던 스타일로 진행해보겠습니다.

### 동기

me2photo를 만들었으면 me2video도 만들고 싶은 게 당연한 것 아닐까.
작년 7월경 me2video WIPI 버전 개발 시도를 했었으나 [XCE의 냉랭한 대응](http://developer.xce.co.kr/qna/qna_view.asp?qna_id=wipi&keyfield=title&keyword=Video&pageno=1&id_num=442&listNum=3)으로 인해 좌절되고 조용히 뒷전에 묻어뒀다.
그러던 지난 6월말 생일 선물로 받은 새 폰, 모토로라 v9m 럭셔리 에디션을 득템하다.
세상에, 320x240으로 동영상 촬영이 되지 않는가! 뒷전에 묻어놨던 me2video 개발 의욕이 다시 물밀듯 올라왔다. 

### 개발을 시작하기 까지

동영상 몇개를 촬영하여 그것을 미투데이에 올리고 싶어졌다. 네이트 아이스박스와 연동되는 me2video는 조잡해서 내 맘에 안든다. 그렇다면 새로 만들어야지 암.. -_-

내 폰에서 320x240으로 찍은 동영상은 3gp로 떨구는데 (file extension은 skm이라고 해놨지만 그놈이 그놈) audio 부분을 EVRC를 쓴다. 그렇담 EVRC 디코더가 있어야 되는데.. [이런 삽질들](http://me2day.net/rath/tag/evrc)을 거듭한 뒤 남자답게 포기했다.

그러던 6월 29일 저녁, 와이프 & kkung과 고기를 먹다가 나만 모르던 사실을 알게 되었다.
전송용 동영상이 있다는 올드한 사실을 orz... 전송용으로 찍어 mms로 보내보니 video=mpeg4, audio=pcm_s16le로 예쁘게 전달해주는 게 아닌가.. -_-
그날 밤, 집에 와서 바로 me2video 개발을 시작했다. 

### 첫 프로토타입 완성

밤 10시부터 미친듯이 작업하여 날이 밝을 때쯤 프로토타입을 구경할 수 있었다.
휴대폰으로 동영상 촬영vpost at xrath dot com으로 전송google apps의 pop3 ssl을 열심히 pollmms 포맷 + 동영상 detect?첨부파일 다운로드 및 mms에 포함된 text parseffmpeg으로 볼륨 400% 업. 하는 김에 flv 인코딩도gdata lib으로 내 YouTube 계정에 업로드me2day-api for java로 YouTube 링크를 포함하여 미투데이에 포스트

### 멀티 유저 환경 구성

첫 프로토타입은 내 미투데이 사용자키와 YouTube 계정 정보가 소스코드가 박혀있다. 이러면 내 미투데이 친구들과 함께 쓰는 재미를 느끼지 못한다. 그러므로 멀티유저용으로 전환이 필요하다.

그리하여 미투데이 아이디, 사용자키, 휴대폰번호, YouTube 계정을 DB에 저장해둘 사이트 **[http://me2video.xrath.com/](http://me2video.xrath.com/)**를 만들었다.

만들고나니 사용자키 입력하는게 너무 귀찮다. 그래서 [웹기반 쉬운 인증](http://codian.springnote.com/pages/729036)을 적용하여 사용자는 휴대폰 번호만 입력할 수 있도록 했다. (정보 push 해준 kkung 고맙!)

### SKT를 넘어.. KTF/LGT 지원

내 미투데이 친구들 중에는 KTF/LGT 를 사용하는 사람이 꽤 있다. 친구들의 KTF 지원 요청을 어찌 버릴 수 있으랴! 
topRay 군의 지원으로 KTF mms 동영상 샘플을 얻을 수 있었고, KTF는 audio 부분에 [QCELP](http://en.wikipedia.org/wiki/QCELP)를 쓴다는 것을 캐치.
그러나 ffmpeg에서 지원하지 않는 audio codec 이다. 그러나 무한 구글링 삽질과 ffmpeg rebuild 를 반복하여 QCELP decoder를 ffmpeg에 부착하기 성공.

me2video가 QCELP를 지원함에 있어 1등 공신은 ffmpeg-devel 메일링리스트의 [이 글](http://lists.mplayerhq.hu/pipermail/ffmpeg-devel/2006-December/020223.html)인데, ffmpeg을 svn trunk 것을 쓰는 내게 간만에 linux c를 다시 건드리는 삽질이 필요했다. 아무튼 이래저리 빌드 성공했고, KTF에서 올린 동영상도 제대로 지원한다.

### KTF는 QCELP만 쓰는 게 아니다

이렇게 KTF/LGT(LGT는 KTF와 동일한 포맷을 쓴다. 실제 코드에서도 1개의 if else 처리밖에 필요로 하지 않는다) 지원을 완료했다고 생각했을 무렵..
YosHi 님의 리포팅으로 새로운 사실을 알게 됐다. 어랏 KTF에서 AMR 코덱도 쓰네?
가볍게 configure 에 --enable-libamr-[n|w]b 넣고 rebuild 하여 지원 성공.

### 완성도 높이기

사용자가 폰카로 동영상을 찍어 vpost at xrath dot com 으로 올리면 download via pop3 ssl, encode with ffmpeg, upload to youtube upload, post to me2day 가 순서대로 진행된다. 그런데 FLV로 인코딩해서 업로드 했음에도 불구하고 엄-청난 시간이 걸린다. 짧게는 1분 길게는 20분 정도.. 유튜브에 완전히 포스팅 되기 전에 me2day 에 올라가면 길게는 20분동안 사용자들이 동영상을 볼 수 없기 때문에 '이거 뭐에요? 까만 화면 나오는데.. sorry 래요!' 라는 댓글을 받아야 된다. 
그럴 순 없으니, 20초마다 youtube public url 에 http request 때리면서 publish 완료됐는지 체크 -_-

### 마지막 손질

미투데이 [만박님](http://me2day.net/sumanpark), [꽃띠앙님](http://me2day.net/codian)의 초스피드 지원을 받아 **프리미엄 제휴 파트너**만 쓸 수 있다는 완소 parameter 인 [callback_url, icon_url, content_type](http://codian.springnote.com/pages/164476)을 날릴 수 있는 권한을 얻었다.

그리하여~
ffmpeg으로 44x44 크기의 thumbnail을 만들고 이를 thumbnail 서버에 ftp로 밀어넣는 등의 작업을 거쳐 아래와 같은 예쁜 모습을 갖추게 되었다.

![](/img/me2video_preview.jpg)

아핫핫핫- xrath.com은 미투데이의 프리미엄 제휴 파트너인거야? :$
아무튼 이로서, me2video 개발은 일단락 지어졌다. 요새 나 회사일 무지 바쁘다. 이쯤에서 트랜잭션 끝내야 나중에 롤백 코스트 덜 든다.

### MMS로 보내야 된다는데, 휴대폰 요금 왕창 나오는 거 아닙니까

SKT는 동영상 포스트 용량에 관계없이 [1건당 100원](http://bbs.nate.com/BBS?p_bbs_id=sktsms&p_pagenum=4&p_action=qry&p_num=74&p_rnum=36&p_listkind=1&p_prevnext_fg=&p_direct=&p_page_top0=116&p_page_top10=EMPTY&p_page_seq0=9999&p_page_seq10=EMPTY&p_page_num0=999999999&p_page_num10=0&p_page_send_dt0=99991231&p_page_send_dt10=EMPTY)이다. SKT 만세 :$
KTF나 LGT는 SKT보다 비싸서 그런지 도대체 비용관련 내용을 웹에서 찾기가 쉽지 않은데, 건당 200원이라는 말도 있고 동영상 duration 별 과금표도 보인다. 어찌됐든 패킷 과금은 확실히 사라진 듯 한데 전화해서 물어보지 않았으니 장담할 수 없다.

그럼 me2video 사용해보기
 [me2video.xrath.com](http://me2video.xrath.com/) 에서 휴대폰 번호와 자신의 YouTube 계정정보 입력 폰카로 동영상 촬영 (전송용으로) 받는 사람 부분에 email 입력으로 vpost at xrath dot com 입력 전송~  포스트 완료 알람 sms 수신~ 

그럼 자신의 YouTube 계정에 동영상이 올라간 것을 확인할 수 있고,
미투에 올라간 포스트의 아이콘을 클릭하면 미투데이에 임베드되어 재생되는 YouTube 영상을 볼 수 있게 된다~

### 도움주신 분들

```
linux
ffmpeg 
commons-dbcp
commons-net
google apps
gdata-youtube
javamail
me2api-java
rath-sms
elle's-delicious-food
mysql 
```

이녀석들 덕분에 me2video 소스코드는 아래의 import 구문을 포함하여 600줄 미만으로 마무리지었다.


```java
import java.io.*;
import java.net.URL;
import java.util.*;
import java.util.regex.*;
import java.text.SimpleDateFormat;
import javax.activation.*;
import javax.mail.*;
import javax.mail.internet.*;
import com.google.gdata.client.youtube.*;
import com.google.gdata.data.media.*;
import com.google.gdata.data.media.mediarss.*;
import com.google.gdata.data.youtube.*;
import com.sun.mail.pop3.POP3SSLStore;
import net.me2day.java.*;
import rath.util.*;
import org.apache.log4j.*;
import org.apache.commons.net.*;
import org.apache.commons.net.ftp.*;
```


매시업이란 이런것? -_- 

### Next

me2photo와는 달리 me2video는 여러가지 절차를 거치기 때문에 me2video mms 전송 후 미투 포스팅까지 평균 7~8분이 걸린다. 여기의 대부분을 차지하는 YouTube publishing 대기 시간을 제거하기 위해 storage를 구하고, 별도 Flash Player를 만드는 것을 생각해볼 수 있겠다.

그리고.. 토큰 10,000개 받고 미투데이에 팔기 -_-?

### Thanks to...

- 신혼인데 밤샘 코딩을 허용해준 사랑스런 와이프 [elle](http://me2day.net/stranger) (미안해! 앞으로도 그럴꺼야! (L))
- 프리미엄 제휴 파트너 기능 열어주신 [만박](http://me2day.net/sumanpark)님, [코디안](http://me2day.net/codian)님 
- KTF 샘플 보내준 [topRay](http://me2day.net/iibiibii)
- KTF 테스트 해준 [갱](http://me2day.net/ratm01)
- LGT 테스트 해주신 [똥파리](http://me2day.net/flyoung)님
- EVRC 함께 고민해주며 열정에 불붙여준 [이슈타르](http://me2day.net/ishtar) 형
- AMR 코덱 이슈를 제기해주신 [YosHi](http://me2day.net/yoshi)님
- 그 외 me2video를 자발적으로 테스트해주신 [제닉스](http://me2day.net/xenix/2008/06/30#19:22:30)님, [고이고이](http://me2day.net/goigoi)님, [펭도](http://me2day.net/pengdo)님, [Ze's](http://me2day.net/112)님, [마야](http://me2day.net/maya)님, [쭈라니](http://me2day.net/jjoorany) 누나, [PETER](http://me2day.net/jackpeter)님, [백일몽](http://me2day.net/stadia)님, [케니군](http://me2day.net/kenny), [핑소년](http://me2day.net/nomadology)님, [지저깨비](http://me2day.net/zizukabi)님, [유에](http://me2day.net/forpurity)님, [불타는삼나무](http://me2day.net/heytree)님 이 포스트를 빌어 감사의 말씀 올립니다.

## Comments

### jong10
*http://www.jong10.com/*
*2008-07-09T06:43:20.000Z*

멋져요. 역시 초고수 래쓰님..

---

### rath
*http://xrath.com/*
*2008-07-09T06:47:23.000Z*

아잉 몰라요

---

### 지저깨비
*http://zizukabi.blogspot.com*
*2008-07-09T18:24:53.000Z*

앗! 제 이름도 들어있다니 말입니다. 감사합니다. ^^
저는 mms로 보내는 것이 아닌, 미투포투처럼 사진찍고 글쓰고 바로 올리는 것으로 했으면 좋겠어요. mms로 메일로 글 쓰기가 귀찮다는... ㅡ.ㅡ (그렇게 안되나요? ^^)

---

### ㄴㅇㄱ
*http://wookay.egloos.com*
*2008-07-12T05:21:33.000Z*

멋지십니다 ^^

---

### elle
*http://elle.myid.net/*
*2008-07-14T07:38:13.000Z*

지저깨비// 옹? 미투포토도 mms 아닌가요?-.-;; VM이야기인가..

---

### 지저깨비
*http://zizukabi.blogspot.com*
*2008-07-15T03:20:40.000Z*

[elle] 
mms로 보내는 것이 아니라, 프로그랭방식 (VM인가요?)으로 보내는 방식을 말씀드린 것입니다. 저는 SKT사용자이고,mms로 미투포토를 올린 적이 없어서 말입니다. ㅡ.ㅡa;;;;

헉! 했다가 잠시 생각하고 찾아보니....
<a href="http://me2day.net/me2/help/posts/phfcf">휴대폰 카메라에서 사진 바로 올리는 미투포토 이용방법</a>

---

### rath
*http://xrath.com/*
*2008-07-15T07:26:13.000Z*

-ㅇ-;;

---

### kfmes
*2008-08-06T15:21:46.000Z*

역시 rath님은 외계인!!

---

### 핑소년
*http://nomadology.myid.net/*
*2008-08-27T14:00:28.000Z*

헉..저도 이름이 들어가 있네요. me2video 뒷이야기.. 재미있게 읽었습니다. 만박님은 복많은 분.

---

### 고이고이
*http://goigoi.tistory.com*
*2008-08-28T08:59:12.000Z*

와 내이름 으하하 덕분에 하루가 즐겁습니다 100원의 행복

---

### topRay
*2008-09-03T02:20:09.000Z*

짱이라능 ㅋㅋ

---

### rath
*http://xrath.com/*
*2008-09-03T23:19:19.000Z*

미투데이가 더 짱이라능. ㅋㅋㅋ

---
