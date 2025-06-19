---
title: "xrath.com Servlet Container 교체"
date: 2004-08-01
slug: 2004/08/xrathcom-servlet-container-교체
lang: ko
---

3년간 아무 이상없이 사용하던 [Resin 2.x](http://www.caucho.com)를 버리고 
[Tomcat 5.0.27](http://jakarta.apache.org/tomcat/)에 [mod_jk2/2.0.4](http://jakarta.apache.org/tomcat/connectors-doc/jk2/) 로 바꾸었습니다.
워낙 J2EE나 웹쪽을 잘 몰라서, 삽질도 많이 했지만 아무튼 완성~*, 넓디넓은 J2EE 세계를 겪어보기 위해 Struts나 JSF 적용을 꽤하고 있는중입니다. 

결정적으로 바꾸게 된 계기는 JSTL 좀 써보려하는데, Resin 2.x 가 안도와줘서 Resin 3.x을 사용하려 했으나, 한 서버당 $500 라서.. Tomcat으로 전향하였습니다. 

 -server -o xrath.com
 == Rath World (http://xrath.com) ==
 Server : Apache/2.0.50 (Unix) PHP/4.3.8 mod_jk2/2.0.4