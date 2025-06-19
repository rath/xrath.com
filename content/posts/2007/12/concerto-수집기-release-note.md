---
title: "Concerto 수집기 Release Note"
date: 2007-12-27
slug: 2007/12/concerto-수집기-release-note
lang: ko
---

Firefox 확장 개발을 시작하게 된 프로젝트 [Concerto](http://concerto.playmaru.net/) 의 수집기가 1.0.13 로 릴리즈 되었습니다.

아니.. 아직 Concerto 가 뭔지 모르신다구요? -_- 

![](/img/concerto_shot_01.jpg)

그렇습니다. Firefox 확장을 설치하고 웹서핑을 샥샥- 하다가 
웹페이지에 동영상이 발견되면 Concerto Button이 **반짝반짝** 빛나고
살며시 꾸욱- 눌러주시면 수집이 됩니다.

수집된 동영상은 순서를 정해 **채널**로 만들 수 있구요.
이러한 작업들은 올 플래시 [Concerto 사이트](http://concerto.playmaru.net)에서 드래그 앤 드롭으로 편리하게 구성할 수 있습니다.

이렇게 구성한 채널들은- Copy Code로 자신의 블로그에 임베드 할 수도 있구요 ㅎㅎ

다음은 릴리즈 노트~

한 페이지의 여러개 동영상을 순차적으로 수집할 경우 2번째부터 아이콘이 (+)로 바뀌어 더 수집할 수 없었던 버그 수정 (AJAX로 동영상을 계속 로드하던 곳도 이제 잘됩니다) 
브라우저에 캐시된 동영상을 수집기가 인식하지 못하던 버그 수정 
Response Content-Type 에 기존 video/flv, video/x-flv 외에도 video/flash 추가 (Yahoo Video가 video/flash를 사용합니다)
YouTube 수집률 향상 ([블로그에 퍼간 동영상](http://s2day.com/post/20558287)이나, [롤링리스트에 퍼간 동영상](http://queenof21c.rollinglist.com/list/view.do?listId=21251&updDate=1197513327000)들 모두 동작)
수집 시 같은 동영상이 2번씩 담아지던 버그 수정
성능 개선 (체감은 어려울 듯 싶습니다)
툴바 버튼의 My Channel 에서 채널이 1개밖에 표시되지 않던 버그 수정
수집기 지원 사이트 확장 (네이트 판TV, 프리챌, 하나포스 앤유, Yahoo Video 등 다수)

개발자이기도 하지만, 사용자 측면에서 참 좋은 기능이 있는데..
위 스샷 메뉴에서도 잠깐 나왔는데 아래처럼 Sidebar를 켤 수가 있습니다.

![](/img/concerto_shot_02.jpg)

사이드바 켜놓고 동영상 보면서 (혹은 음악만 들으면서 ㅎㅎ) 웹서핑하는 것, 색다른 사용자 경험입니다. 아직 가입안해서 채널이 없어서 걱정이라면.. Hot 채널과 New 채널이 있으니 그거 보면서 하시는 것도 좋구요.

IE 확장도 거의 완성되어 갑니다. [이곳](http://concerto.playmaru.net/concerto.exe)에서 다운로드 & 설치하실 수 있습니다.

## Comments

### 세형
*2007-12-27T12:41:05.000Z*

우왕ㅋ굳ㅋ

---

### rath
*http://xrath.com/*
*2007-12-27T15:19:57.000Z*

오랜만에 긴 통화 재밌었다. ㅋㅋ

---

### 이승훈
*http://intsix.com*
*2007-12-31T01:00:09.000Z*

이젠 별의 별걸 다 만드는구나

---

### rath
*http://xrath.com/*
*2007-12-31T11:34:05.000Z*

평소에 안하던 짓 해서 힘들어 죽겠어 -_-

---

### 지꼴
*http://jiggol.myid.net/*
*2007-12-31T12:47:25.000Z*

형님 올해도 몇시간 남지 않았군요.. 내년은 올해보다 더 좋은 한 해 보내시길 바랍니다. ^^

---

### rath
*http://xrath.com/*
*2007-12-31T13:21:22.000Z*

응 2008년은 왠지 신나는 일이 가득할 거 같아.
지꼴이도 새해 福 많이 받기를!

---

