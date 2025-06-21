---
title: "ServletRequest.getContentLength() always returns -1 on Resin"
date: Sun Mar 22 2009 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2009/03/resin-servlet-request-getcontentlength-bug
lang: ko
tags: ["technology", "java", "web-development", "bug-fix"]
---

## [Resin 3.2의 getContentLength() 버그](http://bugs.caucho.com/view.php?id=2995)

Resin 3.2.x를 mod_caucho 뒤에서 사용시 ServletResponse.getContentLength() 가 항상 -1를 리턴한다. 올초에 버그 리포팅 되어 고쳐졌고 4.0 브랜치에 적용했다고 한다. 3.1.x 까지만 해도 없던 버그라고 함. 위 링크에는 https에서 생기는 문제라고 했지만 http 에서도 똑같이 **안된다**.

어휴, 이래서 함부로 WAS 버전 올리면 안되는 것인가.

물론 getHeader("Content-Length")로 가져오면 정상 작동한다. 어쩌라구.

Content-Length must be specified.

p.s. mantis를 잘 보면, 버그 리포팅된지 3개월만에 고쳐준거다. 난 고쳐진지 2달후에야 발견했으니 얼마나 다행인가.
