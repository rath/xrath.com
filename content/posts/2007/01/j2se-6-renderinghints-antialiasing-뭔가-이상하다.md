---
title: "J2SE 6 RenderingHints antialiasing 뭔가 이상하다"
date: 2007-01-19
slug: 2007/01/j2se-6-renderinghints-antialiasing-뭔가-이상하다
lang: ko
---

xrath.com 서버에 너무 무관심 했었어서 간만에 쭈우욱 버전 업을 해줬다.

- Ant 1.6.5 => Ant 1.7.0
- J2SE 1.5.0_08 => J2SE 1.6.0
- Apache 1.3.36 => Apache 1.3.37
- Resin 3.0.18 => Resin 3.0.22

원래 하려고 했던 것은 j2se 1.5를 1.6으로 바꾸는 거였다. 
데스크탑에서 좀 오래 쓰다보니 맘에 드는 구석이 넘 많았기 때문.
무엇보다 데스크탑용으로는 [Provide true double buffering](/2006/12/j2se-6-이야기-provide-true-double-buffering)을 확확! 체감할 수 있다.

타볼 풀고 심볼릭 링크 바꿔걸고 기존 자바 프로세스들 다 새로 띄웠다.
그러고보니 512MB 램에 개깡따구로 -_- 스왑도 안잡아놨던 서버에다가 (뭉고 쉿 -o-) Resin, James, 타자봇, 검색서버.. 이렇게 4개나 띄워놨었다.

jdk 올린 담에 예의상 apache도 하나 올려주고 resin도 예의상 2일전에 올려줬다.
ant는 원래 올릴 생각이 없었다. 그런데 뭐가 꼬인건지 jdk 업 후 갑자기 ant launcher 클래스를 못찾길래 당황하다가 ant 1.7로 바꿔봤더니 잘 돌길래 안심. 이제 서비스들 잘 돌아가는지 확인해볼까 했더니만.

우엑 내 이쁜 한글 캡챠(captcha)가 네모로 깨지잖아! -_-
황급히 gulim.ttc를 jre/lib/fonts 에 복사 후 resin을 다시 실행했다.

휴- 한글은 나오는데.. 뭔가 심상치 않다. 이게 뭔 짓이람

![](/img/broken_obs01.png)

![](/img/broken_obs04.png)

![](/img/broken_obs05.png)

ObfuscateImageServlet을 급히 뒤지다 보니 원인은 이 부분이였다.

g.setRenderingHint( RenderingHints.KEY_ANTIALIASING, 
  RenderingHints.VALUE_ANTIALIAS_ON )
g.setRenderingHint( RenderingHints.KEY_TEXT_ANTIALIASING, 
  RenderingHints.VALUE_TEXT_ANTIALIAS_ON )

antialiasing을 켜면 멀쩡하던 한글이 위아래도 쭉쭉 스트레칭을 하다니 이게 왠 날벼락이란 말인가;
렌더링 힌트에 안티앨리어싱만 걸었는데 이런 일이 생기다니 영문을 알 수 없지만
다행히 KEY_RENDERING은 켜도 괜찮으니 일단 ANTIALIASING OFF로 운영해야겠다. 

미워 :@
