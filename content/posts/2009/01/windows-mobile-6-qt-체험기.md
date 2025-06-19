---
title: "Windows Mobile 6 - Qt 체험기"
date: 2009-01-03
slug: 2009/01/windows-mobile-6-qt-체험기
lang: ko
---

노키아가 인수한 Qt가 버전 4.5부터는(지금은 4.4.3) LGPL로 바뀐다고 해서 GUI 프로그래밍으로 먹고 살던 시절, 호기심으로 찝쩍거렸던 Qt를 기억해보다가.. 윈도우용이라도 받아서 이것저것 데모 프로그램들을 돌려보다보니 간지가 좔좔 흐르길래 :$ 책도 다시 읽고 이것저것 디깅을 해봤습니다. &#13;

# 개발 환경 만들기가 아주 그냥

Qt for WinCE를 내려받고 대상 플랫폼에 맞춰 configure & nmake를 해줘야 합니다. 타겟 플랫폼에 맞춰서 깡그리 빌드하는 것이라 시간이 꽤 걸립니다. 저는 Windows XP에서 대상 플랫폼을 wincewm60standard-msvc2005로 맞춰서 빌드 했습니다. 40분 정도 걸렸습니다. qt-embedded 에서 제공하는 mkspec은..&#13;

```
wince50standard-armv4i-msvc2005
wince50standard-armv4i-msvc2008
wince50standard-mipsii-msvc2005
wince50standard-mipsii-msvc2008
wince50standard-mipsiv-msvc2005
wince50standard-mipsiv-msvc2008
wince50standard-sh4-msvc2005
wince50standard-sh4-msvc2008
wince50standard-x86-msvc2005
wince50standard-x86-msvc2008
wince60standard-armv4i-msvc2005
wincewm50pocket-msvc2005
wincewm50pocket-msvc2008
wincewm50smart-msvc2005
wincewm50smart-msvc2008
wincewm60professional-msvc2005
wincewm60professional-msvc2008
wincewm60standard-msvc2005
wincewm60standard-msvc2008
```

이만큼 있으니 입맛에 맞춰서 하면 됩니다.  저는 wincewm60standard-msvc2005 였고요.&#13;

이제는 qmake와 lupdate, lrelease 등과 친해져야 합니다. 두 문단 정도로 간략히 소개를 할까 했으나 누구나 1시간 정도 집중해서 삽질하면 알 수 있을 내용이니 넘어가겠습니다. 아무튼 Xcode 쓰다가 Qt 할려니까 답답하기 짝이 없습니다. -_- &#13;

 &#13;

# 환경 세팅 그 후 

&#13;

다국어 처리를 위해 qmake/lupdate/lrelease 콤보를 공부해야 합니다. Xcode는 쉽던데 쳇.. 아무튼 Qt는 그만큼 플랫폼간 유연성이 좋은거니까, 봐줍시다.&#13;

그리고 디버깅 환경을 잡으면 됩니다. qDebug() 에 1.93M&#13;

```
QtGui4.dll 6.29M
QtNetwork4.dll 504K
```

Qt를 실행하기 위한 필수 DLL들만 다 합쳤는데 8.6 메가입니다. 아이고 이런 -_-;;&#13;

내장 메모리에 복사하고 실행시켰을 때 startup 시간은 5-6초, SD 카드에서 바로 실행했을 때는 12~16초가 걸립니다. SD에서 실행했을 때는 거대한 크기의 필수 DLL들을 메모리에 올리느라 이렇게 오래 걸렸겠지요. 아이폰이랑 너무 비교됩니다. &#13;

원래 제 windows mobile 장비가 느린거 아니냐고요? 아닙니다. Pocket IE나 TCPMP는 0.5초 이내에 실행됩니다. Qt lib들도 빌드 됐던데 static build하면 좀 괜찮으려나요..

# 느낌

1. 기업용/개인용 소프트웨어나 만들어야지. 엔드유저용 만들었다가는 굶어 죽기 딱 좋겠네.
2. 그래 아이폰이나 하자.

