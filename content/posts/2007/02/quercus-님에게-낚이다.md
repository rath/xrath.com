---
title: "Quercus 님에게 낚이다"
date: Sat Feb 10 2007 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2007/02/quercus-님에게-낚이다
lang: ko
tags: ["programming", "php", "java", "opensource"]
---

수년간 위키를 한번도 안써봤다. 그런데 얼마전 들어간 회사에서는 위키를 쓴다.
써보니 좋네? 사람들에게 물어보니 moni 나 moinmoin 이 좋다고 한다.

그래 방명록도 없고 -_- 트랙백도 달 수 없으면서 블로그라고 우기는 이놈의 홈피. 위키를 써보는거야!
용도는 없지만 사용해가면서 찾아가면 되겠지. 좋아 위키를 깔자!

1차 시도는 사람들이 좋다고 한 [moniwiki](http://kldp.net/projects/moniwiki/) 받아보니 php. Quercus로 돌려보니 에러.

40초간 좌절하다가 [Quercus 위키 페이지](http://wiki.caucho.com/Quercus)에 가서 Quercus 에서 잘 돌아가는 소프트웨어 목록을 찾았다.

오.. KOEI님이 소개시켜준 [Mediawiki 1.9.0](http://www.mediawiki.org/wiki/MediaWiki)이 있다. 대신 Resin 3.1.1+ 가 필요하댄다.
눈씻고 찾아봐도 릴리즈된 버전은 3.1.0이다. 그래서 2월 7일짜 snapshot으로 resin 업했다.
이야 Mediawiki는 wikipedia.org 에서 사용하는 거였구나 :$

세팅이 쉽다. Quercus 아주 맘에 든다. 설정 끝나고 프론트 페이지에 가보니

com.caucho.quercus.QuercusExecutionException: java.util.regex.PatternSyntaxException
Unknown inline modifier near index 4
<H(?P<level>[1-6])(?P<attrib>.*?>)(?P<header>.*?)<\/H[1-6] *>

어쩌라구요 니마 -_- Quercus 에게 물먹었다. 어이 상실.
이번 기회에 Quercus 덕으로 php 기반 위키 깔아서 써보면서 좀 익숙해져보려 했으나 좌절 

[Java로 구현된 오픈소스 위키 엔진](http://java-source.net/open-source/wiki-engines)들도 간단히 훑어보았으나 맘에 드는 것 無 (7) 

===================================================
[Quercus](http://www.caucho.com/resin-3.1/doc/quercus.xtp) 가 뭔가요?

Quercus is Caucho Technology's fast, open-source, 100% Java implementation of the PHP language.
Quercus implements PHP 5 and is internationalization/localization (i18n/l10n) aware. Quercus natively supports Unicode and the new Unicode syntax of the up-and-coming PHP 6. Quercus implements a growing list of PHP extensions (i.e. APC, iconv, GD, gettext, JSON, MySQL, Oracle, PDF, Postgres, etc.). Many popular PHP applications will run as well as, if not better, than the standard PHP interpreter straight out of the box. The growing list of PHP software certified running on Quercus includes DokuWiki, Drupal, Gallery2, Joomla, Mambo, Mantis, **MediaWiki**, Phorum, phpBB, phpMyAdmin, PHP-Nuke, Wordpress, and XOOPS.

뻔뻔하게 MediaWiki를 적다니!! 난 어쩌라고! 흥 :@

## Comments

### 개굴
*2007-02-11T01:16:52.000Z*

아파치랑 PHP 묶고 그 위에 mod_caucho로 resin과 연동하면 안되나요? @_@a
될듯도 싶은데...

---

### rath
*2007-02-11T08:53:14.000Z*

Quercus에서 *.php 매핑 끄고 그렇게하면 되요.. 
그러려면 php 깔아야 되는데 그렇게 되면 원래 의도랑 좀 달라서 ~.~

---
