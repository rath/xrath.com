---
title: "Acer의 Android Netbook이 도착했습니다."
date: Wed Nov 11 2009 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2009/11/purchased-acer-android-netbook
lang: ko
tags: ["android", "netbook", "hardware-review", "mobile-technology"]
---

[Acer가 만든 10.1인치 안드로이드 넷북](http://www.amazon.com/gp/product/B002P8M7BA/ref=ox_ya_oh_product)을 구입하였습니다.

![](http://farm3.static.flickr.com/2749/4094366312_648af0189c.jpg)

Acer가 빌드한 안드로이드라 조금 커스터마이징이 되어있습니다. 박스를 뜯고 바로 전원을 넣으면 안드로이드가 뜨지 않고 윈도우즈 XP가 뜹니다. 여기서 Acer가 만든 Android Manager 프로그램을 띄워서 업데이트를 하는 등.. 의 작업을 하고 난 뒤에야 안드로이드로 부팅할 수 있습니다.

그럼 부팅! Print Screen 버튼을 눌러 찍은 스크린샷들을 보시지요. (스크린샷 이미지를 클릭하면 원본 크기의 이미지를 볼 수 있습니다)

![](http://farm3.static.flickr.com/2617/4094356702_23ae29383e.jpg)

빰빰. 1024x600의 안드로이드가 부팅되었습니다. 버전을 확인하기 위해 정보보는 화면을 찾아보았으나 Acer의 Android 빌드 넘버만 나오고 SDK 버전 몇이 탑재되어있는지 확인할 수가 없었습니다.

그래서 android.os.Builder.VERSION 클래스를 이용해 버전을 확인해보니, Android SDK 1.5를 지원하고 있네요.

다음에는 브라우저를 띄워 페이스북 게임을 실행해보았습니다. 안타깝게도 플래시 플레이어가 설치되어있지 않군요.

![](http://farm3.static.flickr.com/2694/4094356976_1c243eeb8c.jpg)

좌측 상단에 뭐라고 줄줄.. 나온 것은 You must download and install latest version of Adobe Flash Player 입니다. 안타깝네요. Acer 가 나쁜 놈이지요, 뭐.

다음엔 이메일 클라이언트를 띄워 보았습니다. 검은 바탕에 회색 글씨가 아주 기품있습니다.

![](http://farm3.static.flickr.com/2760/4093593311_6f70a2216e.jpg)

이번엔 구글톡을 실행해보지요.

![](http://farm3.static.flickr.com/2524/4093593585_98abfbf378.jpg)

네 그렇습니다. U.S. shipping only 제품이지만, 한글 표시에 문제가 없습니다.

물론 아래 화면처럼 한글 입력에도 문제가 없습니다.

![](http://farm3.static.flickr.com/2659/4093593365_4af538e314.jpg)

단, IME 완성도가 좋지 않습니다. 종성이 없는 글자를 제대로 인식하지 못합니다. 예를 들어 '안녕하세요 여러분' 을 입력하면 '안녕핫ㅔ요 열ㅓ분' 이 됩니다. 그래서 종성이 없는 글자를 입력할 때에는 글자 완성 후 공백을 하나 입력하고 백스페이스를 누르는 노가다를 해줘야합니다. 좋지 않아요..

카메라 화질, 좋지 않습니다.

![](http://farm3.static.flickr.com/2433/4093593645_ea5e59796a.jpg)

입 삐죽 나온 거 보이시죠? 화질 안좋다는 표정입니다.

안드로이드 플랫폼에는 별도의 Shutdown 기능이 존재하지 않습니다. 하지만 Acer의 Android Netbook은 윈도우XP와 안드로이드 둘 사이의 듀얼부트를 지원하기 때문에, 안드로이드에서 윈도우로 복귀하는 메뉴가 필요하지요. 화면 좌측 상단을 누르면 아래와 같은 다이얼로그가 표시됩니다.

![](http://farm3.static.flickr.com/2632/4094357054_af5054fe3d.jpg)

마지막으로 [지난 포스팅에서 만들었던 안드로이드 계산기](/2009/11/android-스터디-계산기-만들기/)를 실행시켜보았습니다. 가로가 너무 넓은 바람에.. 버튼의 너비가 길쭉 길쭉하여 영 보기 좋지 않습니다.

![](http://farm3.static.flickr.com/2662/4093593541_464f0e3709.jpg)

버튼이 너무 넓어요.. 세로 보기를 지원하지 않아서 멋진 스크린샷을 찍을 수 없었습니다.

결정적으로 Acer 안드로이드 넷북의 큰 단점이 있다면, **안드로이드 마켓을 쓸 수 없다는 것**입니다. 메뉴얼을 봐도, 리뷰를 봐도, 플랫폼을 샅샅이 뒤져봐도 안드로이드 마켓을 이용할 수 있게 해주는 부분이 없습니다. 자신이 만든 프로그램을 설치하려면 USB로 업로드하고 디버깅하는 환경을 누릴 수도 없습니다. 그저 **브라우저를 띄우고 apk 파일의 URL을 직접 입력해서 설치하는 수 밖에** 없습니다. 참 불편하지요.

윈도우로 부팅했을 때 Android Platform Update 메뉴가 있긴 한데.. 패치 3개 정도밖에 없네요. 세로보기 지원을 바라지는 않지만, SD 카드에서 어플리케이션을 설치한다거나, 안드로이드 마켓을 이용할 수 있게 해준다거나 (Free 앱이라도), Android SDK 1.6 이나 2.0을 사용할 수 있게 얼른 업데이트를 제공했으면 합니다.

지금은 영.. 부족합니다.

Acer 안드로이드 넷북의 초간단 리뷰였습니다.

## Comments

### chaeso
*http://twitter.com/chaeso*
*2009-11-11T09:35:03.000Z*

저도 구매하려고 했었는데 안드로이드 마켓 이용이 안된다니요 ㅜ.ㅜ
그런데 어떻게 사셨나요? 아마존에서 사려고 했더니 한국으로는 shipping 이 안된다고 하더군요

---

### 수아기
*http://suakii.egloos.com*
*2009-11-11T12:24:00.000Z*

우와 멋진데요. 안드로이드라는 말만 들어보았지 하나도 몰라서 ..
암튼 새로운 놋북 축하드려요.^^

---

### hjazz
*2009-11-11T23:51:34.000Z*

우왕. 예쁘다. 
울나라에선 잘 안쓰이겠군.

---

### Jang-Ho Hwang
*http://xrath.com/*
*2009-11-12T00:29:44.000Z*

[@chaeso ](#comment-3523) 
U.S. shipping only 더라고요. 미국에 사는 누나에게 부탁해서 구매했습니다. ^^; 마켓 이용이 안되니 정말 할 게 없네요..

---

### Jang-Ho Hwang
*http://xrath.com/*
*2009-11-12T00:30:24.000Z*

[@hjazz ](#comment-3526) 
그러게 말이야. 아직 쓸만해지려면 먼 듯해.

---

### Jang-Ho Hwang
*http://xrath.com/*
*2009-11-12T00:30:55.000Z*

[@수아기 ](#comment-3524) 
감사합니다. ^^

---

### yoong
*2009-11-12T09:43:34.000Z*

오.. 구글톡 스샷에 제가 있군요..
영광입니다 ^^

---

### Jang-Ho Hwang
*http://xrath.com/*
*2009-11-12T12:23:57.000Z*

[@yoong ](#comment-3532) 
영광이라니요~ ^^;

---
