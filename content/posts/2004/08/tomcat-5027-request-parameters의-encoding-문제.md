---
title: "Tomcat 5.0.27 Request Parameters의 Encoding 문제"
date: 2004-08-01
slug: 2004/08/tomcat-5027-request-parameters의-encoding-문제
lang: ko
---

GET/POST 로 일반적인 form-data를 넘겼을 때, 한글 파라미터가 작살나는 일이 있습니다.
Connector 환경설정에서 *URI Encoding*이나 *Use Body Encoding for URI Query Parameters* 를 사용하면 변경될줄 기대했으나, 
org.apache.tomcat.util.http.Parameters 인스턴스의 setQueryStringEncoding만 변경하고, 실제로 setEncoding을 변경하지 않아 tomcat 5.0.27 소스코드를 둘러보니org.apache.coyote.Request 의 getCharacterEncoding 을 사용하고 있었습니다. 

이 값 null 일 경우 org.apache.coyote.Constants.DEFAULT_CHARACTER_ENCODING (ISO8859-1)을
사용하는 것을 알았습니다. (게다가 언제나 null이더군요)
결국 org.apache.coyote.Request의 getCharaceterEncoding 메서드를 수정하였습니다.

>> charEncoding = System.getProperty("file.encoding");

사실상 위의 코드는 charEncoding이 null 일 경우에만 통과되는 코드이므로, 
file.encoding을 참조하게 해도 무관할듯 싶습니다. 

수정된 [tomcat-coyote.jar (18K)](/dist/tomcat-coyote.jar) 를
$(TOMCAT5)/server/lib 에 넣으시면 적용됩니다.
컴파일러는 j2sdk 5 beta 3를 사용하였지만, source와 target을 모두 1.3으로 주었습니다.

그런데 어느덧 Tomcat 5.0.28 이 나와버렸군요 -_-;
