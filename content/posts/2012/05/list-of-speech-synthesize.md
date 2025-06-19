---
title: "TextToSpeech API 구축 방안들"
date: 2012-05-30
slug: 2012/05/list-of-speech-synthesize
lang: ko
---

작년말에 [Neospeech](http://neospeech.com/) 에서 TTS 엔진을 구매했다. 한국어 Voice 인 유미, 준우 이렇게 2개를 구매했고 Voice 당 USD $138 를 줬다. Windows 전용이라 (리눅스 + API 버전은 가격이 정해져있지 않고, 마케팅 담당자를 계속 괴롭혀봤으나 혼자 쓸꺼라니까 안판다고 하고, 얼마면 되냐고 USD $1,000 까지 제시해봤으나 모호한 답만 나오는걸로 보아 욕심쟁이인듯해서 안쓰기로 함) Windows OS 라이센스가 필요하다. 중고로 구매해도 $50 정도 필요하다.

그런데 응용프로그램이 GUI 형태로 제공된다. GUI 응용프로그램으로 API 를 만들어야하므로 UI Automation 을 위해 USD $39.95 를 주고 [Macro Express](http://www.macroexpress.com/) 를 구매했다.

그래서 한글 텍스트를 mp3 파일로 변환하려면

1) 서버가 text 를 받음
2) 해당 텍스트를 VMware 속의 Windows 소켓 서버로 보냄
3) 소켓 서버는 해당 텍스트를 클립보드에 넣고
4) Macro Express로 작성된 매크로를 실행함 (GUI 찾고, Focus 잡고, 클립보드 붙이고, 저장 버튼 눌러서 wav 로 떨구고)
5) 떨궈진 wav 파일을 VMware 밖으로 리턴하여 재생
6) 필요하다면 ffmpeg 으로 mp3 변환후 스마트폰으로 전송하여 재생

위의 과정을 거친다. 라이센스 비용만 $138 + $50 + $39.95 = $227.95 고, 각 브리징 코드들을 작성하는 인건비를 계산해보자. 내 연봉이 4천만원이라 치고 위에 열거된 브리징 프로세스를 생각하고 작성하는데 4시간 이상이 걸렸으니(Macro Express 공부가 컸음) 인건비로 8만원이 들어간거다. 그러면 인건비 $100 라 치고 총 개발비 USD $327.95 . 여기에 물리적 장비 비용은 포함되지 않았다. 똥컴이여도 되지만 아무튼 필요하다.

==========

안드로이드 TTS Engine 인 [SVOX Korean](https://play.google.com/store/apps/details?id=com.svox.classic.langpack.kor_kor_fem) 을 구매한다. Voice 당 1.99 파운드다. 대략 USD $3.

1) 서버가 text 를 받음
2) 해당 텍스트를 [C2DM](https://developers.google.com/android/c2dm/) payload 로 보냄
3) C2DM BroadcastReceiver 에서 TextToSpeech.speak 으로 재생
4) 필요하다면 TextToSpeech.synthesizeToFile 로 떨궈서 외부로 리턴

라이센스 비용은 총 USD $3. 위 과정의 브리징 코드 작성에는 30분도 안걸리므로 인건비는 1만원. 총 개발비 USD $12. 안드로이드 사용자는 추가 물리적 장비가 필요없지만, 구지 따로 돌리고 싶다면 삼성 갤럭시 미니 정도가 좋다. 내가 자주 가는 마트에서 99 파운드 (대략 18만원, USD $150 정도).

==========

Neospeech 의 Yumi 보다 SVOX 의 Sora 의 음성 퀄리티가 떨어지긴 한다. Voice DB 파일 크기가 Yumi 의 경우 63MB, Sora 는 18MB 인데 딱 그만큼의 퀄리티 차이가 나는 느낌.

## Comments

### 이진우
*2015-01-18T13:46:28.000Z*

안녕하세요. 
영어 텍스트를 mp3로 변환해주는 서버용 api찾던중 님의 글을 알게되어 도움을 청하고 싶어 글을 남겨요.
영어학습을 위한 서비스사이트를 제작해볼려고 합니다.
선생님들의 웹페이지에서 텍스트를 입력하고(붙여넣고) submit을 하면 서버에 mp3파일이 생성되어
학생들이 선생님이 등록한 글을 음성으로 들어볼수 있게하는 기능이 주입니다.
개발언어는 asp 또는 asp.net으로 할려고 하는데 발음이 좋은 서버용 api를 제공해주는 tts 는 어떤게 있나요?
도움 좀 부탁드립니다.

---

