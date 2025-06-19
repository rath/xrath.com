---
title: "JSR-45 보는중"
date: 2005-07-08
slug: 2005/07/jsr-45-보는중
lang: ko
---

JSR-45 Debugging Other Languages 를 보고 똑딱똑딱 구현해보는중이다.
목적은 SMAP 파일 디코드하기 -ㅅ- 

JSP 디버깅을 위한 stacktrace에 난

     _jsp._test._err_0no__jsp._jspService(**test/err_no.jsp:13**)

이렇게 보고 싶지 

    _jsp._test._err_0no__jsp._jspService(**_err_0no__jsp.java:40**)

이렇게 보고 싶지 않기 때문이다 -_- 얼마나 귀찮은지 아는가 ㅜ.ㅜ
요새 다니는 회사에서 WAS를 Resin으로 채택하여 밀고 있다.
Tomcat 은 아직 smap을 지원하지 않지만, Resin은 오래전부터 지원하고 있다.
어차피 smap을 잘 까서 보여주는데 왜 내가 이것을 보고 있을까.

웹페이지에서 에러를 출력해버리면 잘 나오지만, getStackTrace를 하거나
코드에서 바로 e.printStackTrace() 를 하면 (resin을 통해 트레이스를 보지 않으면)
smap으로 변환되지 않기 때문.. 

이 내역을 다 타장비의 error logging 서버로 보내기 때문에, smap으로 변환된 
코드가 없으면 매우매우 불편하다. work 폴더의 변환된 java 소스가 없으면 
귀찮은걸 떠나서 어디서 예외가 났는지 '추측' 할 수밖에 없기 때문이다.

어찌되었든 JSR-45를 보고 간단히 만들 수 있을것 같다. 클래스 이름이 _jsp 로 
시작하면 smap을 찾도록 만들어야지~

## Comments

### pistos
*2005-07-09T16:25:40.000Z*

오오옷!!! 이거 필요해~~!!

---

### rath
*http://xrath.com*
*2005-07-10T07:53:46.000Z*

흐흐 Resin 용 smap 파서 다 만들어서 적용끝~

Tomcat은 smap자체를 안만들어주니, jsp compile time에 smap gen도 해야하니 할일이 많은데.. resin 만세~ ㅎㅎ

---

### rath
*http://xrath.com*
*2005-07-10T07:54:20.000Z*

생각해보니 resin 용이 아니라 JSR-45 디코더 부분이라고 말하는게 더 맞겠네요.. 읏흥

---

### rath
*http://xrath.com*
*2005-07-10T10:45:50.000Z*

tomcat도 dumpSmap을 true로 하면 생기네요 물렁

---

### rath
*http://xrath.com*
*2005-07-10T10:53:35.000Z*

resin은 .java.smap으로 생기는데 tomcat은 .class.smap 으로 생기는 차이가 있고..

둘다 JSR-45에 맞긴하지만 조금은 다르네요

resin은 jsp 파일의 수에 관계없이 #FileRef가 있는데 tomcat은 파일이 1개면 #FileRef 생략..

아아 역시 tomcat은 설정을 잘해야 좋은건가보다 -ㅅ-

---

### pistos
*2005-07-10T16:35:50.000Z*

톰캣도 삽질하면 가능하다라는거네? 어제 이거 보고 잠시 구글님께 물어보니.. Tomcat과 Smap으로 검색되는 넘들이 많이 나오는것으로 보아 안되지는 않을거라고까지는 예상했었지만.. 

틈틈히 보고 톰캣쪽을 함 파보아야겠... ;;;

(가능할까 ㅡㅡa)

---

