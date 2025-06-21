---
title: "Resin 3.1.9 Quercus 한글 문제"
date: Wed Sep 09 2009 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2009/09/resin-319-quercus-한글-문제
lang: ko
tags: ["java", "resin", "quercus", "character-encoding"]
---

지난 2월 Resin 3.2.0에 포함된 [Quercus 한글 문제를 수정한 바](/2009/02/quercus-%ed%95%9c%ea%b8%80-%eb%ac%b8%ec%a0%9c%eb%a5%bc-%ed%95%b4%ea%b2%b0%ed%95%98%ea%b3%a0-wordpress%eb%a1%9c-%ea%b0%88%ec%95%84%ed%83%80%eb%8b%a4/) 있었습니다.

그런데 며칠전 서버에 GWT app을 올리다가, mod_caucho 뒤의 Resin 3.2.x 에서 생기는 [ServletRequest.getContentLength 가 항상 -1을 리턴하는 버그](/2009/03/resin-servlet-request-getcontentlength-bug/)를 다시 만났습니다. 그래서 에라이~ 하고 서버의 resin을 3.1.9로 낮춰버렸었지요.

그래서 한글 문제를 다시 수정하려고 resin 3.1.9 소스코드를 열어보니.. 지난번에 수정했던 코드 블럭들이 온데간데 없더라고요. 그래서 혹시 비슷한 문제를 가지고 계신 분들을 위해 다시 수정한 소스코드를 공유하고자 합니다.

resin-3.1.9 소스코드의 modules/quercus/src/com/caucho/quercus/lib/db/JdbcConnectionResource.java 에서 347라인의 getCharacterSetName() 메서드를 수정해주시면 됩니다.


```
341   /**
342    * Returns the client encoding.
343    *
344    * XXX: stubbed out. has to be revised once we
345    * figure out what to do with character encoding
346    */
347   public String getCharacterSetName()
348   {
349     return "latin-1"; "utf-8";
350   }
```


수정하신 후 편히 컴파일 하시려면 lib/db 디렉토리에서

> $ javac -cp "$RESIN_HOME/lib/*" JdbcConnectionResource.java

로 class 파일을 생성한 뒤, 배포본의 quercus.jar 를 jar xvf 로 풀어헤치고 com/caucho/quercus/lib/db에 새로 컴파일한 JdbcConncetionResource*class 를 복사한 뒤 다시 묶으면 됩니다.

```
$ cd $RESIN_HOME
$ mkdir workspace
$ jar xvf ../lib/quercus.jar
$ cp JdbcConnectionResource*.class com/caucho/quercus/lib/db
$ jar cvfm ../lib/quercus.jar META-INF/MANIFEST.MF .
$ cd ../bin/
$ ./httpd.sh restart
```
