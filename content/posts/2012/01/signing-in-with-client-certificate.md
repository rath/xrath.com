---
title: "클라이언트 인증서로 로그인 하려면"
date: 2012-01-27
slug: 2012/01/signing-in-with-client-certificate
lang: ko
---

[앞 글](/2012/01/issues-on-authenticating-client-certificate/)에서 클라이언트 인증서 이야기를 꺼낸김에 [OpenSSL](http://openssl.org/)을 이용해 환경구축하는 방법을 간략히 설명한다.

*** Prerequisite**

	OpenSSL
	Nginx

*** [CA](http://en.wikipedia.org/wiki/Certificate_authority) 만들기 **

0) 디렉토리 구조를 언급하고 시작하겠다. CA 인증서를 비롯 사용자의 인증서까지 모조리 ./certs 디렉토리를 쓸 것이다.

$ mkdir ca; cd ca
$ touch openssl.cnf (아래 2번에 있는 내용을 복사해서 붙이시길)
$ touch index.txt
$ echo "00" > serial
$ mkdir certs

1) 일단 CA 인증서를 만들어야 한다. self signed 여도 아무 문제 없다. 구매하는 실수를 저지르지 마시길.


```
$ openssl req -x509 -nodes -days 3650 -newkey rsa:1024 -keyout certs/ca.key -out certs/ca.cert
```


-nodes는 CA키를 암호화하지 않겠다는 것이다. 웬만하면 넣어라. 나중에 귀찮다.
-days 는 대충 10년 넘게 하시고, 1024는 얼마든지 올려도 좋다. 그 뒤 파라미터들은 만들 CA 인증서와 CA 비밀키 파일명이다.

위처럼 입력하고 엔터를 치면 국가코드, 주, 도시, 조직명, 부서명, 이름, 이메일주소 등을 물어본다. 아무거나 때려박으시라.

2) openssl.conf 가 필요하다.


```
[ ca ]
default_ca = CA_default

[ CA_default ]
dir = .
certs = $dir/certs
crl_dir = $dir/crl
database = $dir/index.txt
serial = $dir/serial
new_certs_dir = $dir/certs

certificate = $certs/ca.cert # The CA certificate
private_key = $certs/ca.key

name_opt = ca_default # Subject Name options
cert_opt = ca_default # Certificate field options

default_days = 3650 # how long to certify for
default_crl_days= 30 # how long before next CRL
default_md = default # use public key default MD
preserve = no # keep passed DN ordering
policy = policy_match

# For the CA policy
[ policy_match ]
countryName = match
stateOrProvinceName = optional
organizationName = optional
organizationalUnitName = optional
commonName = supplied
emailAddress = optional
```


중간에 # The CA certificate 부분 2줄에 집중한다. 조금전에 만든 CA키, CA인증서 파일의 경로를 쓴다. policy_match 섹션은 모두 optional로 둬도 된다. 우리는 사용자에게 직접 csr 파일을 보내라고 하지 않을테고 사용자와  CA의 국가가 달라도 문제될 건 없다.

3) 사용자 인증서 생성

사용자가 막 인증서를 만들어낼 수는 없다. 사용자는 그저 인증서 서명 요청서(CSR)를 작성할 수 있을 뿐이다.


```
$ openssl req -new -newkey rsa:1024 -nodes -keyout my.key -out my.csr
```


그러면 CA 인증서를 만들었을때처럼 국가코드부터 이것저것 물어본다. 다 대충쓰시고 Common Name을 신경써서 작성해야 한다. 아이디라고 생각하는 것이 좋다. (웹서버 인증서라면 hostname이 되는 부분임) 중복 아이디들은 조직명, 부서명을 이용하여 해결해도 되고 Common Name 다음에 물어보는 email 주소를 사용할 수도 있겠다.

4) CA가 CSR에 서명함

이제 서명한다. 서명은 쉽다. 입력할 게 거의 없기 때문이다.


```
$ openssl ca -config openssl.conf -in my.csr
```


정말 서명할꺼냐고 물으면 쿨하게 y 를 눌러주자. 그럼 CA 서명까지 들어간 사용자 인증서가 만들어진다. 생성된 인증서는 serial 파일내용의 숫자.pem 으로 certs 디렉토리에 생성된다. serial 파일속의 숫자는 openssl ca가 자동으로 1씩 증가시켜준다.

5) 사용자 인증서 합체

3번에서 만든 my.key 파일과 certs/$(serial).pem 을 합쳐서 자웅동체 PKCS12 인증서를 만들 시간이다. my.csr 파일은 지워버려도 좋다. 0)에서 제시한대로 serial 파일을 만들었다면 생성된 인증서는 certs/00.pem 에 있을 것이다. 그러면


```
$ openssl pkcs12 -in certs/00.pem -inkey my.key -export -out my.p12
```


하면 export password를 정해달라고 한다. 고객님의 소중한 인증서이므로 비밀번호를 정해두자. 이제 최종 결과물인 my.p12이 생겼다. 짝짝짝

6) 사용자 인증서 설치

윈도우즈라면 아마 확장자를 pfx로 바꿔야할지도 모르겠고, Mac OSX 이라면 .p12 그대로 둬도 좋다. 탐색기나 Finder 에서 더블클릭하여 간단한 절차를 따라주면 시스템에 이 인증서가 설치된다. 이 과정에서 5)에서 지정했던 비밀번호를 묻게 된다. 입력해주자.

7) Nginx 설정 변경

SSL 기본설정은 되어있다고 가정하고, 클라이언트 인증서를 체크하기 위한 부분만 설명한다. 일단 1) 에서 만든 CA 인증서 파일을 적당한 디렉토리 ($nginx/conf/certs)로 복사한다. 이 파일명이 ca.cert 일 경우


```
ssl_client_certificate  certs/ca.cert;
ssl_verify_client on;
ssl_verify_depth 1;
```


을 추가한다. 이러면 사용자들 인증서들의 Issuer (인증서 발급해준 분)가 ca.cert 이기 때문에  4) 과정을 거친 사용자인증서들만 verify가 성공하고 나머지는 모두 실패하게 된다.

이제 application_server로 가는 proxy_pass가 있는 location 블럭에 헤더 하나를 추가한다.


```
proxy_set_header  X-SSL-Subject  $ssl_client_s_dn;
```


이로서 Nginx 설정 끝

8 ) Application Server 에서 사용자 DN 가져오기

request.headers['X-SSL-Subject']에 클라이언트 인증서의 DN이 담겨온다. 이런식이다.


```
/C=GB, ST=England, O=Adrenaline, OU=Users, CN=rath /emailAddress=rath@xrath.com
```


여기서 필요한 부분만 파싱해서 쓰면 된다. 파싱하기 가장 편한 /emailAddress=(.*) 추천.

## Comments

### 아가
*2012-02-20T11:28:50.000Z*

위의 방법으로 하면 정말 인증서를 구매하지 않고 https:// 로 접근이 가능한가요??

참고로 전 2008 서버 , iis 7.0 입니다.

해보았는데 안되서 문의 드립니다. 
메일 주소를 알려주시면 왜 안되는지 상세하게 보내드리고 싶습니다.

---

### Jang-Ho Hwang
*http://xrath.com/*
*2012-02-20T14:43:30.000Z*

아니요. 이 포스트는 클라이언트 인증서에 대한 이야기입니다. 클라이언트 인증서를 verify하는 서버측 인증서는 야매 인증서여도 무관하지만, 서버 인증서는 당연히 구매하셔야 합니다.

---

