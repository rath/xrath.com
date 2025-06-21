---
title: "yGuard 만세!"
date: Wed Nov 03 2004 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2004/11/yguard-만세
lang: ko
tags: ["java", "bytecode-obfuscation", "yguard", "ant"]
---

문득 쓸만한 Java bytecode Obfuscaor 찾고 싶었다.
99~00년도에 사용하던 SourceGuard는 이제 더이상 [4thpass](http://www.4thpass.com/) 제품도 아니고,
SourceGuard는 GUI 기반이라 영 번거롭고 **'느리다'**.

간만에 이것저것 살펴보다가 [RetroLogic 社](http://www.retrologic.com)의 RetroGuard란 
제품을 발견하였다. 그러나.. RetroLogic 홈피 좌측편에 Google Ads에 
보이는 하나. 

**yGuard Obfuscastor**
Free Java(TM) Bytecode Obfuscator, integrates with Ant and many IDEs.

오우 Ant Task를 제공한단 말인가!

장점은.. **'공짜'**이고, **'Ant Task'**를 제공해주고, RetroGuard에서
생기던 문제점도 몇개 고쳤다고 한다. Ant에서 obfuscate해보니 
그저 mainclass attribute만 줘도 성공적으로 자알~ obfuscate 해주었다.

   

이상하게도 이녀석이 생성해주는 jar 파일은 jar로 압축이 풀리지 않는다;;;
zip format 인듯하여 다음과 같이 몇줄을 더 작성해주었다.

으하하 잘 된다.

89K 짜리가 82K가 되었다. 이정도면 사이즈도 많이 감소된 편이고,
패키지명 및 클래스명도 다음과 같이 변하였다.

```
com/leap/ckcc/A.class
com/leap/ckcc/B.class
com/leap/ckcc/C.class
com/leap/ckcc/D.class
com/leap/ckcc/E.class
com/leap/ckcc/F$_A.class
com/leap/ckcc/F.class
com/leap/ckcc/G.class
com/leap/ckcc/H.class
com/leap/ckcc/I.class
com/leap/ckcc/J.class
com/leap/ckcc/K.class
com/leap/ckcc/L.class
com/leap/ckcc/M.class
com/leap/ckcc/Main.class
com/leap/ckcc/N.class
com/leap/ckcc/O.class
com/leap/ckcc/P$1.class
com/leap/ckcc/P$2.class
com/leap/ckcc/P.class
com/leap/ckcc/Q.class
com/leap/ckcc/R.class
com/leap/ckcc/S.class
com/leap/ckcc/T.class
com/leap/ckcc/U.class
com/leap/ckcc/V.class
```

좋다.. mainclass attribute만 적어주면, 나머지 외부 라이브러리들은
알아서 detect 해준다.

Ant와 함께 즐거운 프로그래밍~*

## Comments

### back
*2005-01-05T02:31:39.000Z*

1

---

### 다크너구리
*2013-07-22T07:25:07.000Z*

제가 자바는 그리 익숙하지 않아서 ant로 빌드해야 된닫 말에 지금 yGuard 테스트를 못해보고 있는데요..

소스 코드 난독화는 어느정도까지 되나요?

실제 게임 프로젝트에 적용해서 어택커의 공격을 어느정도 막아낼수 있는 수준인지 좀 궁금하네요..

Proguard는 단순한 함수에서는 아예 난독화 도움이 안되더라구요..

이건 어느 정도 일까요?

---

### joeunjae
*2014-06-09T02:38:42.000Z*

죄송하지만 사용법좀 알려 주실 수 있으신가요.

---
