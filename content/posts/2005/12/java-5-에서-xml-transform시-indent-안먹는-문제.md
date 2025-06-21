---
title: "Java 5 에서 xml transform시 indent 안먹는 문제"
date: Thu Dec 01 2005 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2005/12/java-5-에서-xml-transform시-indent-안먹는-문제
lang: ko
tags: ["technology", "java", "xml", "programming"]
---

[http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=6296446](http://bugs.sun.com/bugdatabase/view_bug.do?bug_id=6296446)

조합에 어거지가 보이지만 -_- 시키는대로 하니 인덴트가 잘 먹는다.
링크 클릭하기 귀찮은 사람을 위해 간단히 정리해본다.

TransformerFactory tff = TransformerFactory.newInstance();
tff.setAttribute("indent-number", new Integer(4));
Transformer tf = tff.newTransformer();
tf.setOutputProperty(OutputKeys.INDENT, "yes");

StreamResult sr = new StreamResult(new OutputStreamWriter(System.out, "melong"));
tf.transform(new DOMSource(e0), sr);

이 중 하나라도 삑사리나면 안된다.
setOutputProperty("{http://xml.apache.org/xslt}indent-amount", "4") 는 소용없다.
TransformerFactory에 setAttribute로 "indent-number"로 박아줘야 되고, 
OutputKeys.INDENT, "yes"는 모르는 사람이 없을테니 넘어가고..
StreamResult 생성시 Writer 형태가 아니여도 인덴트가 안먹는다.

아아 이게 얼마만에 개발관련 포스팅이냐 --;
