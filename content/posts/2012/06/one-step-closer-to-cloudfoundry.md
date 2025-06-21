---
title: "CloudFoundry 구조 살펴보기 시작"
date: Tue Jun 19 2012 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2012/06/one-step-closer-to-cloudfoundry
lang: ko
tags: ["cloudfoundry", "architecture", "web-development", "devops"]
---

지난번 [CloudFoundry 소개글](/2012/06/an-overview-of-cloudfoundry/)에 이어 이번에는 CloudFoundry 구조를 살펴본다.

일단 rightscale 블로그 글에 첨부된 이미지를 무단 링크하고 시작한다.

![](http://rightscale.files.wordpress.com/2011/04/cloudfoundry2.png)

항목 별로 간단히 나열해보면,

	Router
	Cloud Controller
	Droplet Execution Agent (그림에서의 App Exec Engine)
	Services

이렇게 나눠볼 수 있다. Health Manager는 각 구성요소들이 잘 동작하는지 주기적으로 체크하다가 이상한 녀석이 있으면 신고해주는 역할을 하므로 설명을 생략한다. 각 구성요소들이 어떤 역할을 하는지 알아보기전에 사용자 기준 시나리오를 설명하는 것으로 시작하는게 좋을 것 같다.

먼저 CloudFoundry를 주도적으로 사용하는 웹개발자 입장에서의 흐름을 살펴본다.

	VMC -> Router -> Cloud Controller -> (요청 종류에 따라 분기)

VMC는 CloudFoundry 이용자(웹개발자)가 사용하는 CLI 툴이다. VMC를 통해 로그인도 하고, 웹 어플리케이션을 업로드 하기도 하고, 인스턴스 수를 늘렸다 줄이기도 하고, 새 서비스(mysql, mongodb 등)를 자신이 올린 앱과 bind 하기도 한다. 로그파일을 보는 것도 vmc 로 한다. 지금 언급한 vmc 의 기능들은 모두 Cloud Controller 속에 구현되어있다. 그런데 왜 Router를 거치는가? 아니 Router 가 도대체 무엇인가?

Router 는 우리가 알고 있는 하드웨어 라우터가 아니다. Ruby 로 만들어진 HTTP 라우터 서버다. Host 헤더를 보고 어느 서버로 포워드해야하는지만을 알고 있는 녀석이다. 이 Ruby 로 만들어진 Router 는 이슈가 좀 있지만 어찌됐든 오직 하나의 목적을 가지고 있다. 외부에서 HTTP 요청이 오면 이 요청을 담당하는 서버가 어디있는지 알려주는 것이다.

Cloud Controller의 기능들도 모두 HTTP로 제공되기 때문에 구지 Cloud Controller를 Router 밖으로 분리할 이유가 없기 때문에 Router 아래에 위치한 것이다. 이 설정은 얼마든지 바꿀 수 있다. Cloud Controller 설정파일을 보면 use_nginx: true|false 가 있기도 하다. Router랑 안붙이고 독립 웹서버(Nginx)에 붙일 수도 있고, 아무것도 없이 Cloud Controller 가 80 포트를 바인드해서 서비스를 해도 (이중화 문제가 생기겠지만) 된다.

 

이제 CloudFoundry를 투명하게 사용하게 되는 엔드유저 입장에서의 흐름을 살펴보자.

	웹브라우저 -> Router -> Droplet Execution Agent -> Services

Drop Execution Agent (이하 DEA)는 Web Application Server 라고 보면 된다. 실제로 apache2+php 가 돌거나 python, ruby vm이 돌거나 Tomcat 이 돌아가는 곳이다.

Services는 WAS에 붙어있는 MySQL 이라고 이해하면 된다. 실제로는 MySQL 말고 NoSQL이 될 수도 있고 memcached 나 RabbitMQ 가 될 수도 있다. WAS가 사용하는 백엔드 서비스들을 총칭하는 것이 Service 이다.

딱히 이해하기 어려운 부분이 없다. 그런데 앱이 여러개이고 앱당 WAS 인스턴스가 늘어나게 되면 그 숫자만큼 DEA 가 필요할텐데 앱을 적당한 DEA에 배포하고 이를 Router 에게 알려주고 하는 등의 작업들은 누가 할까. Cloud Controller 가 한다. Cloud Controller 는 정말로 많은 일을 한다. 다행히 엔드유저의 요청을 처리할 때는 Cloud Controller 가 조금도 관여하지 않기 때문에 논리적으로 기능상 병목이 될 수는 있을지언정 트래픽이 몰려서 엔드유저가 사용하는 웹서비스가 느려진다거나 하는 등의 일은 발생하지 않는다.

잠깐, 위 그림에도 없고 아직 언급하지 않았지만 CloudFoundry 에서 아주 중요한 것 하나를 생략했다. 그것은 [NATS](https://github.com/derekcollison/nats) 이다. NATS는 CloudFoundry를 설계한 Derek Collison 이 만든 메시지 버스로  경량 publish, subscribe 프로토콜 및 그 구현체이다.  CloudFoundry의 모든 컴포넌트들 (Router, Health Manager, Cloud Controller, Droplet Execution Agent, Services) 의 설정파일에 mbus: nats://1.2.3.4:4222/ 이렇게 NATS 서버 주소를 쓰게 되어있다. 그래서 새 DEA를 동적으로 붙인다던지, 잘 동작하던 DEA 서버 하나를 종료한다던지 할 경우 NATS를 통해 온 시스템에 해당 이벤트가 전파된다.

이렇게 보면 CloudFoundry 에서 NATS 가 없다면 절대로 돌아가지 않는, CloudFoundry 각 구성요소들을 한데 묶어주는 중요한 역할을 하는 것이다. 그러나 다행히도 NATS 또한 Cloud Controller 처럼 엔드유저의 요청수와 무관하다. 그렇기 때문에 DEA 인스턴스 2,000여개가 돌면서 NATS 에게 이벤트를 발송하더라도 딱히 문제 될 것은 없다. 게다가 publish-subscribe 특성상 메시지가 쌓이는 일도 없다. NATS 서버가 여러개고 각 메시지가 idempotent 라면 서버 하나 몇시간 죽었다 올라와도 전체 시스템에 영향을 미칠 수 없는 것이다.

여기에 하나 더, 각 컴포넌트 내에서 비동기 작업큐로 사용하는 [Resque](https://github.com/defunkt/resque) 가 있다.  CloudFoundry 각 컴포넌트들이 거의 다 Ruby 로 작성되어있기도 하고 (Ruby는 타언어에 비해 쓰레드 처리가 약하다), 경량 pubsub 인 nats 에 실어보내기엔 꽤 규모가 되지만 그렇다고 persist 할 필요가 없는 대부분의 작업들에 대해 Resque 를 사용한다. Resque 는 Redis backed 므로 CloudFoundry 인스턴스 내 어딘가에 Redis 가 하나 돌고있어야 한다.

Router 에 관련하여 하나 더. 초반에 말했듯이 CloudFoundry Router 는 Ruby 로 작성되어있다. 사용자 요청을 Ruby 가 바로 받는다니 어쩐지 이상하지 않은가? 실제 환경에서는 당연히 Router 앞에 Nginx 가 붙어있다. Router version 1의 경우 Nginx 가 HTTP 요청을 제일 먼저 받아서 유닉스 소켓을 통해 Ruby router 에게 by pass 하고 Router 는 HTTP 헤더를 보고 어느 DEA로 분기해야하는지 잡아서 그 DEA로 입력스트림을 포워드하고 응답이 올때가지 기다렸다가 이를 받아 다시 Nginx 로 보내고 웹브라우저로 리턴되는 식이였다. 아니 이게 말이 되는가, Ruby Router 의 i/o 병목 어쩔건가. Nginx 웹서버는 로그분석이랑 SSL 처리를 위해 쓴다고 하면 할 말이 없지만 이름(Router)에 어울리지 않는 일을 하고 있었다.

그래서 Router version 2 가 나왔다. Router version 2에는 CloudFoundry 용 Nginx Lua 모듈이 있다. 이 모듈의 역할이 무엇인가하면, HTTP 호스트 헤더를 받아 Ruby Router에게 JSON over HTTP로 묻는다. '이 Host 가려고 하는데 위치가 어디니?' 하면 위치만 리턴한다. 그러면 Nginx Lua 모듈이 이 일련의 과정을 처리하여 proxy_pass 에 들어갈 최종 host/port를 넘기는 것이다. 뭔가 복잡하게 보일수도 있지만 최소한 더이상 Ruby Router가 웹어플리케이션의 i/o를 파이프라이닝 하는 일은 없다. 정말 라우팅 테이블만 관리하는 컴포넌트가 된 것이다.

독자도 지치고 나도 지치고.

## Comments

### 정원희
*2013-03-28T21:07:47.000Z*

설명 깔끔하네요. :)

---
