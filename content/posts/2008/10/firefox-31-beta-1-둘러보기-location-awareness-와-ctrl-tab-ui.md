---
title: "Firefox 3.1 beta 1 둘러보기, Location awareness 와 Ctrl-Tab UI"
date: 2008-10-15
slug: 2008/10/firefox-31-beta-1-둘러보기-location-awareness-와-ctrl-tab-ui
lang: ko
---

[iPAQ hx4700 덕](/2006/04/ipaq-hx4700)분에 잘 읽지 못하고 휙휙 넘겼던 RSS feed 들을 많이 읽다보니 자연스레 관심사가 바뀌어 [이 글](http://lifehacker.com/5063202/firefox-31-beta-1-now-available-for-download-first-look)을 보고 나도 파폭 3.1 베타 써보자.. 하고 요리조리 둘러본 후기를 남겨봅니다. 다운로드는 [여기](http://www.mozilla.com/en-US/firefox/all-beta.html)서 할 수 있습니다.&#13;

 &#13;
**목차**&#13;
&#13;
&#13;
[Faster Javascript](#toc_0)&#13;
&#13;
[Firefox 3.1 beta 1 (with javascript.options.jit.content=true)](#toc_1)&#13;
&#13;
&#13;
[Location Awareness](#toc_2)&#13;
[Ctrl-Tab 탭 이동 인터페이스 개선](#toc_3)&#13;
[Addon 호환 문제](#toc_4)&#13;
&#13;
&#13;
Faster Javascript[#](#toc_0)&#13;

자바스크립트가 빨라졌다고 합니다. 뭔고 하니 [TraceMonkey](https://wiki.mozilla.org/JavaScript:TraceMonkey)가 탑재됐는데 about:config에 가서 활성화 시켜주는 수고를 해줘야 합니다. javascript.options.jit.content 랑 javascript.options.jit.chrome 을 true로 바꿔주면 된다는데 false로 테스트 해봐도 true로 테스트 해봐도 별반 차이가 없네요? (option의 chrome은 google chrome과 아무런 관계가 없습니다.)&#13;

 &#13;

다음은 영문 Windows XP SP2, AMD 애슬론 3200+, 1G 메모리에서 테스트한 결과입니다.&#13;
Firefox 3.1 beta 1 (with javascript.options.jit.content=true)[#](#toc_1)&#13;

 13ms Try/Catch with errors&#13;

 34ms Layer movement&#13;

  6ms Random number engine&#13;

 26ms Math engine&#13;

 69ms DOM speed&#13;

  7ms Array functions&#13;

  7ms String functions&#13;

 23ms Ajax declaration&#13;

**185ms** Total Duration&#13;

 &#13;

Run Test 버튼을 여러번 눌러보았지만 javascript.options.jit.content를 켰을 때와 껐을 때의 차이가 거의 안보입니다. 더불어 Firefox 3.0.3과의 차이도 별로 없어보입니다.&#13;

Google Chrome 0.2.149.30 에서 돌려보니 total duration이 452ms 가 나왔고 Firefox 2.0.0.7 에서는 1392ms 가 나왔습니다.&#13;

Lifehacker에서 테스트한 [Beta Browser Speed Test: Which Is Fastest?](http://lifehacker.com/5044668/beta-browser-speed-tests-which-is-fastest) 도 있습니다.&#13;

 &#13;
Location Awareness[#](#toc_2)&#13;

사용자의 위치 인식을 도와주는 [Mozilla Labs의 Geode](http://labs.mozilla.com/2008/10/introducing-geode/)가 Firefox 3.1에 기본으로 들어갔습니다. Geode와 Firefox 3.1의 Geolocation은 동일한 [W3C API for Geolocation](http://dev.w3.org/geo/api/spec-source.html)을 쓴다고 하니 개발자들은 차이가 없다고 합니다. Geode를 써본 적이 없었는데 이번 기회에 잘 구경했습니다. [me2day API create_post](http://codian.springnote.com/pages/164476)의 위도/경도 파라미터를 드디어 쓸 수 있게 됐습니다!&#13;

그러나 안타깝게도 아직 Firefox 3.1 기본 geolocation 데이터 프로바이더가 없습니다. 그러나 사제 Data Provider 를 설치하여 테스트 해볼 수는 있습니다. Doug Turner가 만든 [Geolocation 0.4.1](https://addons.mozilla.org/en-US/firefox/addon/8420)을 설치하면 수동으로 -_- 자신의 위치를 구글맵에서 선택하는 geolocation 데이터 프로바이더를 써볼 수 있지요. (그런데 한국 주소를 써넣으니 잘 인식이 안되네요. 기껏해야 seoul 정도)&#13;

 &#13;

실제 코딩은 geolocation을 지원하고자 하는 사이트에 아래와 같은 자바스크립트 코드만 넣으면 됩니다. 아유 신기해요 :$&#13;
&#13;
navigator.geolocation.getCurrentPosition(function(pos) {&#13;
  alert(pos.latitude + ", " + pos.longitude);&#13;
})&#13;
&#13;

geolocation.getCurrentPosition의 두번째 파라미터로 error callback을 넣을 수 있는데, Doug Turner의 프로바이더 없이 실행해보니 code=1, message=빈값 이 떨어졌습니다. 에이~ 나빠!&#13;

만약 geolocation 데이터 프로바이더를 설치했다면 우측 버튼을 눌러 위도, 경도를 체크해볼 수 있습니다. 아주 간단한 구글맵 매쉬업! &#13;

 &#13;

버튼을 누르면 브라우저 상단에 '당신의 위치를 요청합니다.' 라고 뜨고, 보낸다고 응답할 경우 해당 위도/경도에 맞는 구글맵 위성지도를 zoom level 12로 보여주게 해놨습니다. 아래 지도는 Doug Turner 의 애드온으로 Seoul 을 입력한 뒤 받은 위도/경도로 그려진 지도입니다.&#13;

  

![](http://maps.google.com/staticmap?center=37.550263,126.997083&zoom=12&size=512x512&maptype=satellite&key=ABQIAAAA5RYI8fLPMdhpoUHUQerAJRTVEszcQJ_GtUB7ROyXP0qPpCktnxQU8LU28zZCzeHmeV-ZFO82gXIxog)

&#13;

누군가 야후 지도를 매쉬업하여 geolocation 데이터 프로바이더를 만들어준다면 감동 받고 paypal로 $10 도네이션 할 마음이 있습니다. 누구 없나요? :$ (요즘 환율에 $10, 작은 돈 아닙니다!)&#13;

 &#13;

이번엔 geolocation api를 사용하는 [Yahoo Fire eagle](http://fireeagle.yahoo.net/) 에 가봤습니다.&#13;

 

![fireeagle-seohyun.png](http://rath.springnote.com/pages/1934834/attachments/861540)

&#13;

 &#13;

아이고 이쁜 것. 지도가 꾸리꾸리하여 정확히 인식할 수 없어서 국내 최고의 지도 서비스인 [야후 맵](http://kr.gugi.yahoo.com/map/)으로 다시 찾아보니, 검은 테두리  좌측 상단에 턱걸이로 -_- 저희집이 들어가 있었습니다.&#13;

   

![punglimiwantplus-yahoomaps.png](http://rath.springnote.com/pages/1934834/attachments/861544)

&#13;

 &#13;

이 기회에 GPS를 질러야 되나..&#13;

 &#13;
Ctrl-Tab 탭 이동 인터페이스 개선[#](#toc_3)&#13;

별로 예쁘지도 않고 딱히 맘에 들지도 않습니다. Ctrl-[1-9] 보다는 Ctrl-Tab을 자주 쓰는 편이라 이 개선된 Ctrl-Tab 인터페이스를 자주 보게 되는데, 자꾸 화면 정중앙에 떠 대서 주의가 산만해지는 기분입니다. 게다가 페이지 썸네일이 Opera나 Chrome의 그것처럼 페이지 전체를 보여주는 게 아니라 좌측 상단 일부분만 보여주기 때문에 페이지 식별에도 어려움이 많습니다. 뭐.. 정식 릴리즈 때에는 개선될 거라고 믿고 있습니다.&#13;

 &#13;

![firefox-ctrltab-interface.png](http://rath.springnote.com/pages/1934834/attachments/861550)

&#13;

 &#13;

딱 봐도.. 스프링노트가 스프링노트처럼 안보이고 야후 이글이 야후 이글처럼 안보이고 야후 맵도 야후 맵처럼 안보이고.. 좌우 탭들의 썸네일만 보여주는 게 아니라 탭 이름까지 보여주기만 했어도 이것보단 좋지 않았을까 생각이 드네요.&#13;

 &#13;

듀얼모니터를 사용할 경우 secondary monitor 에 Firefox 를 띄워놓고 Ctrl-Tab을 누르면 전환창이 화면 좌측에 붙어버리는 버그가 있네요. 얼른 고쳐지기를 바랍니다.&#13;

   

![ctrltab-firefox-bug.png](http://rath.springnote.com/pages/1934834/attachments/861552)

&#13;

 &#13;
Addon 호환 문제[#](#toc_4)&#13;

버전이 3.0.* 에서 3.1로 바뀌었습니다. Firefox Addon 만들었던 분들은 아시겠지만 배포될 xpi에 포함되는 install.rdf 파일의 targetApplication > maxVersion 에 max version 을 기입해야합니다. 얼마전에 윈도우를 새로 깔아서 [귓속말](http://whisper.playmaru.net/)과 [delicious 버튼](http://delicious.com/help/quicktour/firefox)만 설치해놨었는데 둘 다 사용할 수 없다고 나오네요! :-( 내친김에 귓속말 애드온 em:maxVersion 부분에 3.1.* 이라고 고쳐서 [1.0.7로 업데이트](https://addons.playmaru.net/whisper/openid-whisper.xpi) 했습니다. 아무런 기능 추가도 없으니 이해부탁드립니다 -_-;;&#13;

아아 딜리셔스 버튼 쓰고 싶어 ㅠ.ㅠ&#13;

 &#13;

이 외에도 [Firefox 3.1 Adds Keyword Filters to the AwesomeBar](http://lifehacker.com/5063481/firefox-31-adds-keyword-filters-to-the-awesomebar)도 참조해보세요. &#13;

이 글은 [스프링노트](http://rath.springnote.com/pages/1934834)에서 작성되었습니다.

## Comments

### hey
*http://me2day.net/heycalmdown*
*2008-10-16T01:03:56.000Z*

이런.. 댓글이 스프링노트에 조금 여기에 조금..

---

### rath
*http://xrath.com/*
*2008-10-16T04:50:15.000Z*

스프링노트 댓글 API 열어달라고 해야겠어요 :$

---

