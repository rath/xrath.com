---
title: "iPhone app 개발을 위한 준비운동, Cocoa programming"
date: Thu Jul 31 2008 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2008/08/iphone-app-개발을-위한-준비운동-cocoa-programming
lang: ko
tags: ["iphone-development", "cocoa", "objective-c", "mobile"]
---

iPhone 국내 출시에 대한 루머가 바글바글한 상황이지만, 국내 출시가 안되면 뭐 어떻습니까.
큰 시장에서 놀아야죠. 한글 지원.. 까이꺼 안하면 됩니다 -_-. 지난번 포스팅에서 나름 iTunes App Store에 부정적인 입장을 표시했지만 전 코딩을 좋아하는 개발자로서 -.- 이것을 계기로 Cocoa(영어 사전 찾아보니 발음이 코우코우- 던데..!) 코딩도 해볼 수 있으니 그걸로 만족합니다.

SK 컴즈에서 영업방해로 신고할지 모르지만 잽싸 네이트온 클라이언트 만들어서, 돈은 안되겠지만 $0.99에 팔아도 좋을 거 같고.. (10,000명이상이 구매해준다면야 추석연휴를 활용, 불철주야로 버닝하여 만들어야죠 :$) 인기있는 Facebook iPhone 처럼 Cyworld iPhone 만들어서 SK가 안만든 티 팍팍내놓고(디자인 리소스를 대폭 줄여서) $0.99에 판다거나 -_- 여러가지 방법이 있겠습니다. 저처럼 전략/기획 능력이 없는 프로그래머는 잘나가는 서비스에 옵션 만들어 먹고 살기 좋을 듯 합니다.

몇주전 iPod Touch를 구입했고, 여기에 올라가는 app을 만들려면 어떻게 해야하나- 하다가 가장 큰 걸림돌로 다가온 것은

**어머나 난 맥북이 없어서 iPhone SDK를 못깔아!**

였습니다 :'( 

그런데 잘 생각해보니 2002년에 구입한 iBook G3 600도 있고, [Jenix](http://jinhyung.org/) 님이 번역하신 [코코아 프로그래밍](http://www.yes24.com/Goods/FTGoodsView.aspx?goodsNo=2692954)이 있었네요. 점심시간 틈틈히 읽어보니 Objective-C 학습 코스트가 그리 높지 않은편입니다. 제가 평가하기엔 javascript 로 firefox extension 개발하는 게 훨씬 어려운 거 같은데 -_-.. 암튼 중요한 건 생각보다 어렵지 않다는 것입니다. [Xcode](http://developer.apple.com/tools/xcode/) 는 1시간 정도 둘러본 결과.. not bad 네요. 7년째 이클립스 안쓰기 운동을 벌이다 몇주전에 승복했는데 IDE 사용하기에 거부감이 없어져서 Xcode가 괜찮게 보인 것일지도 모르겠습니다. apple이 만들었으니, 좋겠죠 뭐 ( -.-)

공부 시작한지 며칠안된 개발자 입장에서 보면, Objective-C ... [object method:parameter] 랑 reference count release 만 알면 나머지는 뒤적거리면서 커버 가능한 수준으로 보이고 코코아에서 제공하는 클래스들 prefix로 NeXTSTEP의 약자인 'NS'가 덕지덕지 붙어있는 거 외엔 좋아보입니다. 

자.. iPhone/iPod Touch가 없어서 아직 개발을 시작하지 못하신 분들은 osx 데스크탑용 앱을 코코아로 코딩해보며 미리미리 준비해보세요 ~_~

p.s. [안드로이드 SDK](http://code.google.com/android/index.html)는 맥북 없이도 개발 가능하던데!
