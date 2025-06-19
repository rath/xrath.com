---
title: "iBATIS 접견 그 이후"
date: 2008-06-01
slug: 2008/06/ibatis-접견-그-이후
lang: ko
---

[iBATIS 접견](/2008/06/ibatis-접견) 그 이후.

작년 이맘때쯤 미투데이를 이용하다가 [펭도님](http://p-paradigm.com/plog/)에게 thinkgeek 에서 구입한 [Shower Shock Caffeinated Soap](http://www.thinkgeek.com/caffeine/accessories/5a65/)을 선물하기 위해 가볍게 만들기 시작했던 [OpenID 귓속말](http://whisper.playmaru.net/) 백엔드에 iBATIS를 적용했습니다.

몇가지 아쉬운 점이라면!

## 첫번째
sqlmap.xml 파일에 문법 오류가 있을 때.. 왜 라인수는 안가르켜주는 겁니까 ㅡ,.ㅡ  
샵 열고 샵 안닫았다가 발생하는 오류 NoSuchElementException .. 열고 안닫았다고 알려주면 좋을텐데, 뭐 google 의 도움으로 # 안닫았은거라는 거 까지는 알 수 있었지만 (좀 더 오류메시지가 친절했더라면) 문제는 900라인에 가까운 sqlmap.xml 파일에서 그놈을 찾기란 -_-...  
게다가 아주 간단히 property 를 proeprty로 오타쳤다고 했을 때도, property 속성이 꼭 있어야 한다는 친절한 메시지까지는 좋은데.. 라인 수 좀 알려달라고요 T_T  

## 두번째
cacheModel 관련된 것입니다. 이건 어디까지나 iBATIS 적용 대상 서비스가 귓속말이여서 그런 것이지만 flushOnExecute에 update, delete, insert 의 id가 들어가는 것이 보통인데, 전체 이용자가 함께 공유해서 보는 view 가 없다보니.. 사용자별 cache를 할 수가 없습니다.  
A란 사용자의 '새로 도착한 메시지 개수' api인 /api/hasunread (이것은 [귓속말 API 문서](http://dev.springnote.com/pages/1094582)에는 없고 Firefox Extension 에서만 사용하는 API 입니다 :$) 의 경우 콜수가 초당 xx개에 육박하기 때문에 cache가 적용되면 참 좋을 녀석인데, B에게 새로운 메시지가 도착해도 A의 cache가 날라가 버리니 원.. ToT  

iBATIS의 cache는 충분히 훌륭하지만, 약간만 머리를 굴리면 지금의 iBATIS에도 프로퍼티별(?) cache를 가능하게 할 수 있을 듯 해서 많이 아쉽습니다.

그래도 너무너무 좋아요! 아직 Hibernate 세상에는 안들어갔지만 이렇게 배우기 쉽고 쓸만한 sql mapper를 알게 되어 기쁩니다 (H)
