---
title: "URL로 ftp 접근하기"
date: Sat Nov 27 2004 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2004/11/url로-ftp-접근하기
lang: ko
tags: ["ftp", "java", "url-connection", "networking"]
---

언제부터 이렇게 된건지 모르겠지만.

```java
URL url = new URL("**ftp://rath:********@xrath.com/hehefile.zip**");
URLConnection con = url.openConnection();
InputStream in = con.getInputStream();
out.println( in.available() );
in.close();
```

이렇게 되더라.
위처럼 ftp도 되고, ftp, jar, http, https 다 되더라.
jar일 경우는 spec이 어떻게 지원되는지는 모르겠지만,
뒤에 !가 붙고 그 안에서 protocol을 또 넣을 수 있군.

## Comments

### pistos
*2004-11-27T14:15:49.000Z*

오호.. 좋은정보!

---
