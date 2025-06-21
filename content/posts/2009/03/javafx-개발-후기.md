---
title: "JavaFX 개발 후기"
date: Tue Mar 10 2009 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2009/03/javafx-개발-후기
lang: ko
tags: ["technology", "javafx", "programming", "software-development"]
---

믿거나 말거나, 사람들은 자기가 어떤 일을 하게 된 이유를 그 일을 하고난 후에서야 알 수 있다고 한다. 일을 마친 후에는 전후 사정을 고려하여 이야기를 만들어 내기가 쉽다. 그래서 '나 이거 공부해봐야지!' 하는 어떠한 포스팅이나 announce 없이 JavaFX를 공부하며 열심히 코딩을 하고, 이제 다른 플랫폼으로 도망치는 시점이 되어 후기를 남겨본다.

아주 화려함에도 불구하고 마땅히 쓸 곳이 없는 것들을 나는 대단히 싫어한다. 어떤 트라우마가 있는 것은 아니고, 그저 그것이 아무짝에도 쓸모가 없기 때문이다. 그리고 그 화려함들은 우리의 주의력을 분산시키고 원래의 목적과 의도를 상실하게 하는데 많은 도움을 주기까지 한다. 이런 것들은 신기하게도 많은 공통점을 가지고 있는데, 그들이 주장하는 화려함 자체도 근거가 없다는 것이다. 마치 광고 같다.

모두가 다 그런 것은 아니지만, 화려함은 그 화려함 때문에 그 속은 더욱 저급한 것으로 비치기 쉽다. 바로 옆에 붙어있는 것들은 비교하기가 쉽기 때문이다.

![](http://farm4.static.flickr.com/3642/3344163979_d6a03bfba9_o.jpg)

위에 보이는 시계는 압박 시계이다. 각 시/분/초 숫자 위에서 마우스 휠을 돌려 시간을 설정하고 시작을 하면, 째깍째깍 소리와 함께 00:00:00 을 향해 달려가는 시계이다. 이것을 만드는 코드는 대단히 짧다. 시간을 adjust 할 때 틱틱 소리를 내기 위해, 0초를 향해 달려가는 째깍째깍 소리를 위해 sound clip들도 구매했고, 7 segment를 구현하기 위해 Adobe Illustrator 에서 안되는 디자인 실력으로 열심히 segment들을 그려 fxz로 export하기도 하고, 색상 조화를 맞추기 위해 kuler 띄워다가 무한 삽질을 하기도 했다. 각 segment의 drop shadow effect, 시계 전체에 대한 reflection effect, 하단 버튼 패널 easing 구현을 다 합쳐봐야 (왜냐하면 각각 2~3줄이니까) 500라인도 안되는 작은 프로그램이다. (그러고보니 최근 몇년간 2,000라인 넘는 코드를 작성해본 기억이 없다)

나름 시계부 역할도 해주긴 하지만, 네트워크를 쓰는 코드들은 javafx script가 아닌 java 클래스를 사용했으므로 여기서는 언급하지 않도록 하겠다.

JavaFX는 에니메이션 효과를 다루는 데 있어 timeline / keyframe 개념을 사용한다. flash나 flex를 만져본 사람은 0.5초만에 javafx의 animation 개념을 소화할 수 있을 것이다. 이녀석들은 꽤 잘 돌아간다. CPU가 심한 괴로움을 느끼고 있을 때 멈칫 멈칫 거리기는 하지만 ugly 하게 깨지지는 않는다. 그냥 flash 라고 생각해도 될 정도이다. flex에 대해 아는 바가 거의 없어서 flex도 같은 개념을 쓰는지는 모르겠지만 javafx는 scene graph 개념을 사용한다. 화면에 표시되는 모든 것들은 Node 이다. 그리고 Node 들은 Group 으로 묶일 수 있다. 여기까지만 들으면 awt나 swing에서 넘어온 프로그래머들이 Component/Container 랑 매치하려고 할텐데 몇가지 다른 점들이 있다. javafx scene graph의 node들은 명시적인 rectangle boundary를 가지지 않는다. 보수적인 사람 입장에서는 노드들이 참 질서가 없는 것이다. 아무튼 scene graph 개념을 사용하는 사람들은 rectangle boundary를 원하지 않을 것이므로 javafx는 scene graph를 사용한다는 것만 알고 있으면 된다. 저 시계 숫자의 각 segment 들은 각각 다 노드이다. 시간과 분, 초를 시각적으로 편리하게 구분할 수 있도록 나타낸 delimiter 조차도 rectangle < Node 이다. Illustrator 에서 export 될 때부터 이미 7개의 노드로 분리되어 나온다.

Effect는 그 대상이 Node나 Group일 경우 아무런 제약없이 적용할 수 있다. 위 시계는 7개의 노드를 가지는 7 segment를 포장한 custom node 하나이고, 각 숫자들은 HBox로 묶여있다. 나는 이 HBox에 Reflection effect를 적용했고, 그 결과 거울에 비친듯한 효과를 아무 어려움없이 볼 수 있었다.

또한 Node나 Group에 대해 Transform 속성을 줄 수 있는데 이녀석을 통해 가변 크기를 가지는 프로그램을 쉽게 구현할 수 있다. 위의 사진에 찍힌 압박 시계는 fullscreen: true 속성을 준 것이다. 하지만 500x180으로 해도 같은 비율을 유지하며, 250x90로 해도 같은 비율을 유지할 수 있다.

JavaFX 1.1에서 주장하는 매력적인 부분 중 하나는 같은 소스코드로 모바일과 데스크탑 모두에서 돌릴 수 있다는 것이다. 이것은 J2ME와 J2SE의 구분과는 달리 매력적인 요소로 보인다. 하지만.. JavaFX도 완전한 호환성을 제공하는 것은 아니다. JavaFX reference documentation을 보면 common profile, desktop profile 로 나뉘어 있다. 다행히도 많은 부분이 common profile에 적용되어있지만 매력적인 effect 들은 mobile에서 사용할 수 없다. 이런 면에서 Josuah Marinacci의 JavaFX 모바일이란 것은 없어요. JavaFX만 있을 뿐이에요 는 명백히 홍보성 포스팅이라고 생각할 수 밖에 없을 것이다.

작업을 하면서 나를 가장 괴롭혔던 것 중 하나는 Sound 였다. JavaFX는 MediaPlayer 라는 클래스를 제공한다. 내 twitter나 facebook을 주시하는 사람이라면 벌써 봤겠지만 난 이녀석 때문에 많은 괴로움을 느꼈다. 짧은 duration을 가지는 sound clip을 재생하려고 하면 Invalid stop time specified 란 오류와 함께 미디어를 읽어들이지 못한다. sun forum을 보니 나와 비슷한 문제로 고생하는 사람이 있었는데 그는 Applet의 sound play 기능을 쓰는 것으로 회피했다. 나는 javafx의 문제가 아니고, 내가 뭔가 잘못한거겠거니- 하고 포맷을 계속 바꿔가면서 여러가지 시도를 해보았지만 여전히 벗어날 수 없었다. 짜증이 솟구친 나는 javax.sound.sampled 패키지를 사용하는 것으로 회피해버렸다. 아무튼 잘 돌아간다. 하지만 JavaFX의 은총은 분명히 아니다.

성능에 관한 팁.

Node를 상속하는 모든 클래스들은 boolean 값을 가지는 cache 란 속성을 사용할 수 있다. 이 속성이 해주는 것이 무엇이냐하면 컴포넌트의 모습을 bitmap으로 떠버리는 것이다. trade off 측면에서는 더블버퍼링을 떠올려도 상관없지만, 바보처럼 이미지만 덜렁 떠놓는 것은 아니다. 다음은 API 문서에서 cache에 대해 설명한 부분이다.


> A performance hint to the system to indicate that this Node should be cached as a bitmap. Rendering a bitmap representation of a node will be faster than rendering primitives in many cases, especially in the case of primitives with effects applied (such as a blur). However, it also increases memory usage. This hint indicates whether that trade-off (increased memory usage for increased performance) is worthwhile. Also note that on some platforms such as GPU accelerated platforms there is little benefit to caching Nodes as bitmaps when blurs and other effects are used since they are very fast to render on the GPU.


압박 시계를 전체 화면(1280x1024)으로 놓고 49개의 폴리곤들이 온갖 이펙트를 먹고 그라데이션 먹은 배경화면 위에서 0.1초에 한번씩 움직이는 상황에서 .cache 속성 없이는 어려움을 겪게 된다. 물론 cache를 활성화하더라도 내 macbook air 에서는 시계가 돌아가는 내내 65%의 CPU를 사용하지만, cache를 껐을 경우 0.1초에 한번씩 실행되기를 기대했던 keyframe은 당신의 기대를 져버릴 것이다.

마지막으로, 압박 시계는 생산성을 올리기 위해 개인적으로 만들어 쓰는 프로그램이다. 이 프로그램은 생산성에 영향을 주는 것이므로 압박 자체에 너무 집중해서는 안되기 때문에 최대한 작업 중에 이 시계를 들여다보지 않도록 해야만 했다. 그래서 특별한 시각에는 몇분 남았다, 몇초 남았다고 읽어주도록 해놨는데 처음에는 이것을 mp3로 재생하게 (그조차도 MediaPlayer의 오류로 wav로 변환 후 javax.sound를 통해 재생하도록 바꿨지만) 했었다. 하지만 계속 써보다보니 설정 시각에 따라 다른 지점에서 시각을 읽어주는 기능이 필요했고 TTS를 넣기 위해 freetts를 훑어봤는데 퀄리티가 너무 개판이라 mbrola voice 설치를 시도하게 되었다. 어허, 이거 native 바이너리네. 디플로이가 최악이다. freetts조차도 jsapi는 따로 설치하도록 되어있다. 웁. 그렇다고 내 서버에서 tts streaming을 구축하고 압박 시계는 그저 음원을 받아가게만 만든다면.. mp3를 내장하는 것보다 좋은 것이 무엇인가. 없다. 기껏해봐야 시계 주제에 런타임에 네트워크를 필요로 한다는 게 말이 되는가. (그나저나 osx에 기본 내장된 speech synthesis의 퀄리티는 참으로 훌륭하더라)

위와 같은 이유로, production level 에서의 javafx 사용은 좌초되었다. 게다가 JavaFX 프로그램의 배포를 위해서는 jnlp를 사용해야 하는데 인증서 살 돈이 없다. self signed 인증서는 부끄럽다.

## Comments

### rath
*http://xrath.com/*
*2009-03-10T20:23:35.000Z*

도입부를 다시 읽어보다가 덧붙이고 싶은 말이 떠올랐다.
루소는 '인간 불평등 기원론'에서 우리가 아무리 독립적 정신을 갖추고 있다 해도 자신의 요구를 이해하는 능력은 위험할 정도로 낮은 수준이라고 전제했다. 이게 다 문명의 발달 때문겠지만, 고통을 견디고 꾸준히 노력하면 어떤 일을 시작하기 전에도 자기가 무엇을 하는지 알아차릴 수 있을지 모른다. 물론 그럴만한 가치가 있어야겠지만.

---

### 하루하루
*http://jslee.tistory.com*
*2009-03-11T02:08:11.000Z*

Java 에는 관심이 없어서, 그냥 포스팅을 읽어내려갔지만, 압박시계 부분에서 오히려 재미있게 읽었어요.
효과음이라던가, 음원은 어디서 구매하시나요?
압박시계 관련해서 아이폰App 으로 개발해도 훌륭한 공부가 되곘다 싶어요.
다음 프로젝트 결정입니다. ㅋㅋ 열심히 하시는 모습 보기좋아요 ^^

---

### rath
*http://xrath.com/*
*2009-03-11T02:39:33.000Z*

저는 http://www.audiosparx.com/ 여기서 구매했어요. 퀄리티가 썩 좋지는 않은데 검색해서 하나씩 들어보는 재미가 솔솔해요 ^^
압박시계를 다음 프로젝트로 하신다니 흥미롭네요. 저도 만들고 있는데 비슷한 app으로 경쟁하면 새로운 *압박*을 주고 받으며 생산성을 듀얼로 올릴 수 있겠습니다. ㅎㅎ


---

### Ryan
*2011-04-26T15:24:28.000Z*

궁금한 점이 있는데, 웹 개발시에 Java FX 로 관리자 페이지 화면단을 개발하는 것에 관해 어떻게 생각하십니까? JSP 로 하면 관리자 페이지 디자인을 조립하는 단계를 한번 거쳐야 되고 어쨌든 시간 뺐기거든요. Java FX 로 화면을 쓱쓱 그리고 WAS와 통신해서 결과를 뿌려주는 식으로 하는게 JSP 로 관리자 화면을 개발하는데 있어서는 이점이 있지 않을까요?

의견이 어떠신지 궁금합니다.

---
