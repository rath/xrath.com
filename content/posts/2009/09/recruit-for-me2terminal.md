---
title: "me2terminal 프로젝트를 도와주실 분을 찾습니다."
date: 2009-09-18
slug: 2009/09/recruit-for-me2terminal
lang: ko
---

몇년동안 제쳐놓게 되는 일들이 있습니다. 그 중 하나가 제겐 ncurses를 이용한 프로그래밍이였지요. api가 간단하여 만들기 제일 만만한(?) 미투데이 클라이언트를 만들기로 하고 오랜만에 python을 열어 ncurses로 콘솔 베이스 미투데이 클라이언트를 만들었습니다.

[me2terminal은 github 위에서 오픈소스 프로젝트](http://github.com/rath/me2terminal)로 진행되고 있는데요, 로그에도 나와있듯이 2일간 커밋이 없는 상태입니다. 몇가지 이슈들이 있는데 다른 일들에 치이다보니 python 경험이 거의 없어서 휙휙 앞으로 나아가지 못하고 있네요.

제 개발환경은 Mac OS X 이고, 기본 탑재된 Python의 curses 모듈이 wide-character를 지원하지 않아 파이썬 2.6 소스코드를 내려받아 제 장비에서 빌드해서 쓰고 있습니다. 그런데 me2terminal을 쓰려는 사용자에게 .. "*저기, python.org 사이트에 가셔서요. 소스를 받으시고요. configure 하시고 make; make install 하시면 되요. 아, 그리고 만약 시스템에 libcursesw 가 없으면요, 그거 받은 다음 파이썬을 빌드해야됩니다*." 라고 말하는 것은 센스빵점이잖아요? [오픈소스가 안팔리는 이유 중 하나가 설치와 설정이 어렵다](http://developers.slashdot.org/story/09/09/12/0634251/Why-Users-Drop-Open-Source-Apps-For-Proprietary-Alternatives)는 말도 있습니다.

제 로컬에 설치되어있는 이슈트래커를 보면 me2terminal 프로젝트 다음과 같은 할 일이 남아있습니다.

	미투포토를 출력하기 위한 Image to ASCII 변환 알고리즘 찾기 & 적용
	네비게이션 히스토리 관리 (브라우저의 back / forward 와 같은)
	미투 박스와 댓글 창에서 미친의 미투데이로 갈 수 있도록 keymap 넣기
	me2API socket timeout 시 오류처리
	**파이썬 프로그램을 적절히 배포할 방법 찾기**
	데스크탑 쉬운 인증 넣기
	me2API.track_comments 기능 넣기
	터미널 크기 변경시 이를 감지하여 자동으로 화면을 갱신하기.
	본문에 포함된 링크에 밑줄을 표시하고, a 키를 누르면 URL을 표시하기. 만약 내부링크면 해당 포스트로 점프하기.
	[stomppy](http://code.google.com/p/stomppy/)로 알리미 API 적용 (세부 계획 없는 상태)

무엇보다 배포 문제가 지금 제 마음을 꾹 틀어막고 있습니다. 배포 문제가 머리속에 들어온 뒤로 어떠한 이슈 해결도 안하고 있습니다. 열심히 만들어서 혼자 쓰기가 아까워서요!

배포 문제가 깔끔히 해결되지 않는다면, 일괄포팅에 문제가 없도록 일단 파이썬으로 구현을 마친 뒤, 쉬운 배포를 위해 c로 포팅하여 ncurses를 static link한 플랫폼별 바이너리를 만들까도 생각중입니다. 윈도우즈에서 curses가 어느정도의 캐퍼를 보이는지도 궁금하고요.

관심있으신 분들의 참여를 부탁드리겠습니다. 파이썬 프로그램 배포에 대한 어떠한 조언도 환영합니다.

## Comments

### kfmes
*http://blog.kfmes.com*
*2009-09-18T11:57:40.000Z*

도움을 드리고싶긴 하지만 파이썬은 저도 쌩초보라 어렵겠네요~

---

### hardboil
*http://hardboil.textcube.com*
*2009-09-18T13:02:56.000Z*

파이썬을...갈쳐주세요.. - -;

---

### hey
*http://me2day.net/heycalmdown*
*2009-09-18T13:03:16.000Z*

음. '어차피 사용자 환경은 윈도우일테니' 라고 가정하고 py2exe로 빌드하면 되잖아요. ㅎㅎ

---

### 엔하늘
*http://skyfac.com*
*2009-09-18T13:07:18.000Z*

나도 파이썬은 전혀 모르는데;

---

### jong10
*http://www.jong10.com/*
*2009-09-18T13:25:32.000Z*

태그가 무려 recruit ㄷㄷ

---

### 호야지기
*http://hoyajigi.com*
*2009-09-18T13:39:16.000Z*

해보고 싶지만 뭔지 모른겠다랄까...

---

### nakada
*http://seapy.com*
*2009-09-18T14:07:46.000Z*

py2exe 로 어느정도 되지 않을까요? 가끔 문제도 있는거 같지만 우선은 py2exe 로 해보심이...

---

### rath
*http://xrath.com/*
*2009-09-19T03:58:46.000Z*

[@nakada ](#comment-9706)
[@hey ](#comment-9702)
py2exe를 시도해보겠습니다. 윈도우즈 Python에 포함된 curses 모듈이 얼마나 잘 돌아가는지 먼저 확인해볼께요.

---

### rath
*http://xrath.com/*
*2009-09-19T03:59:54.000Z*

[@kfmes ](#comment-9700)
[@hardboil ](#comment-9701)
[@엔하늘 ](#comment-9703)
저도 파이썬은 잘 못하는데.. -.-; 2001년에 퍼키님 어깨너머로 조금 배운 게 전부에요. :$

---

### rath
*http://xrath.com/*
*2009-09-19T04:00:49.000Z*

[@호야지기 ](#comment-9705)
제가 글 쓰기 연습을 덜 해서 그래요. 다음번엔 좀 더 쉽게 쓰도록 노력할께요 ^^;

---

### rath
*http://xrath.com/*
*2009-09-19T04:01:02.000Z*

[@jong10 ](#comment-9704)
뭐 큰 의미는 없고요.. ㅎㅎ

---

### 다즐링
*2009-09-21T16:46:20.000Z*

뭘하면됨;;? 이슈트래커와 설계 방향을 공개하시오.

---

### Jang-Ho Hwang
*http://xrath.com/*
*2009-09-21T21:34:57.000Z*

[@다즐링 ](#comment-3130) 
이슈트래커는 아직 로컬에서 운영중이라 바로 공개는 힘드니, 내일 중에 github의 이슈트래커에 다 퍼다 옮기도록 하지요. 위에 표시된 대부분의 TODO들중 대부분은 코드몽키로 변신해서 끝낼 수 있는게 대부분인데, 마음에 걸리는 이슈들을 뽑아보자면.

- 파이썬 프로그램 배포하는 방법. best practice는 무엇일까. 
- 윈도우 플랫폼을 지원할 것인가. 윈도우용 파이썬에는 curses 모듈이 존재하지 않는다.
- ASCII 출력 로직을 작성하였는데, 알고리즘은 간단하지만 먼저 이미지를 긁고, 이미지의 Raster를 가져와서 픽셀별 rgb를 가져올 수 있어야 함. PIL을 통해 import Imaging을 할 수 있으나, 이러면 또 PIL 모듈에 대한 의존성이 생김
- 네트웍 상태가 꽝인 유저를 위해 httplib connect에 timeout을 줬으나 2.6 에 추가된 기능이라.. 어찌해야할지. (optional)
- 알리미 API : 이 부분은 편의성이나 UX를 고려한 것이 아니라, 세부 계획이나 로드맵이 전혀 없음.

이정도에요. 다즐옹 만나러 가려면 IRC로 가면 되나요~

---

### Jooncheol Park
*2009-09-29T02:49:07.000Z*

장호씨 오랜만이에요~ ㅎㅎ
윈도에서는 py2exe도 괜찮지만 cxFreeze 도 괜찮은 선택이에요. cxFreeze가 좀더 빨리 실행 되요.
그리고 호환성 문제는 cygwin과 cygwin용 python 을 쓰면 해결되지 않을까 싶네요.
cygwin1.dll 만 포함시키면 됩니다.
cygwin 용 midnight commander와 mc 등이 있기 때문에 뭐 검증은 필요 없을듯 싶어요.
그럼 화이링!

---

### Jooncheol Park
*2009-09-29T02:53:05.000Z*

midnight commander 과 mc -> midnight commander과  linm  ㅎㅎ

---

### Jang-Ho Hwang
*http://xrath.com/*
*2009-09-29T04:02:32.000Z*

[@Jooncheol Park ](#comment-3175) 
와, 가려운 부분을 마구마구 긁어주셔서 정말 고마워요! ㅎㅎ 
막연히 cygwin은 무거우니 일반 사용자에게 배포는 무리라고 생각했었는데 잘못된 생각이였군요. mc의 존재로부터 큰 자신감을 얻었어요. cxFreeze도 살펴봐야겠네요. ^_^

준철형 만세~

---

