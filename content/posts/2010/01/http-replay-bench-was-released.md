---
title: "http-replay-bench 첫 릴리즈"
date: 2010-01-09
slug: 2010/01/http-replay-bench-was-released
lang: ko
---

4주전에 포스트했던 [테스트와 벤치마크 도구를 통해 용자 되기](/2009/12/be-a-brave-programmer-with-test-and-benchmark/)에서 소개드렸던 [http-replay-bench](http://github.com/rath/http-replay-bench/)의 초안을 완성했습니다.

[README](http://github.com/rath/http-replay-bench/blob/master/README) 파일을 영문으로 작성해뒀으니 해석하기 귀찮으신 분들을 위해 블로그에도 간단히 소개하자면,

http-replay-bench는 github에서 오픈소스로 개발하고 있는 프로젝트로, 웹요청을 기록해뒀다가 기록된 HTTP 요청파일들고 다른 서버에 요청을 마구 날리는 도구입니다.

[지난번 포스트](/2009/12/be-a-brave-programmer-with-test-and-benchmark/)에서도 말했던 것처럼, 기존에 잘 동작하고 있던 웹어플리케이션을, 인터페이스를 건드리지 않고 속을 뜯어고치는 일은 적지 않은 용기를 필요로 하는 일입니다. 왜냐하면 어찌됐든 '잘' 동작하던 프로그램에 칼을 대다가 욕먹기 쉽상이기 때문이지요. 게다가 저를 포함하여, 개발자들은 테스트 하기를 싫어하기 때문입니다. 훌륭한 테스터라 하더라도 수많은 사용자들이 던지는 중구난방 시나리오들을 다 커버하기는 어려운 것이 현실이지요.

http-replay-bench는 실운영 환경에서 유저들이 보낸 각 http request들을 파일에 저장해두는 rb-capture-plugin.jar과, 저장된 요청파일을 읽어 서버에 다시 요청하는 rb.jar 2개로 구성되어있습니다.

먼저 rb-capture-plugin.jar (4KB)를 실서버 WEB-INF/lib에 넣고 web.xml에 아래와 같이 필터를 하나 추가합니다.


```xml
<filter>
    <filter-name>request-capture</filter-name>
    <filter-class>com.xrath.benchmark.http.plugins.RequestCaptureFilter</filter-class>
    <init-param>
      <param-name><strong>output-directory</strong></param-name>
      <param-value><strong>/tmp</strong></param-value>
    </init-param>
  </filter>

  <filter-mapping>
    <filter-name>request-capture</filter-name>
    <url-pattern>/*</url-pattern>
  </filter-mapping>
```


그리고 이 WAS를 upstream 서버로 잠깐 등록을 합니다. 그러면 모든 요청들이 /tmp 디렉토리에 /tmp/request-n.log 형식으로 남겨지게 됩니다. 적당한 시점이 됐다고 생각되면.. (10분~20분) WAS를 내려주시고요, tmp 디렉토리에 가보시면 request-$(THREAD-ID).log 형태를 띄는 파일들이 생겨있는 것을 볼 수 있을겁니다. 이것들은 사용자들이 보낸 http-request 들인데, 이것들을 적절히 테스트 환경으로 가져오시고..

이제 이 파일들을 rb.jar (20KB)를 실행할 장비로 옮겨옵니다.

속을 많이 뜯어고쳐 많은 케이스에 대해 정상작동할지 걱정이 되는.. 서버를 띄워놓은 곳이 wanna-be-real.com 이라고 가정하고, 캡춰한 http-request 들을 복사해온 디렉토리를 ./samples 라고 가정하면

$ **java -jar rb.jar -c 16 -d ./samples -n unlimited http://wanna-be-real.com/**
1886 http requests were loaded in 934ms
sorted in 17ms

위와 같은 명령행을 입력하여 wanna-be-real.com 서버에, 실운영서버에서 기록한 요청들을 재생시킬 수 있습니다. 실행을 시키면.. 기록된 요청파일들을 읽고 시간순으로 정렬했다는 메시지가 2줄 출력되고 아무런 응답이 없을텐데요, 그 상황이 계속 요청을 보내고 있는 상태입니다. 이제 그만 보내야겠다.. 싶으면 Ctrl-C 를 눌러 (osx이면 Cmd-C) 프로그램 종료 신호를 보냅니다. 그러면 아래와 같은 형식으로 결과를 보고해줍니다.


```
^C

* Number of sent requests
14,761

* Total time to consume
00h 01m 50s

                   min     avg     max
Response time     31ms   239ms  2190ms

* Response codes
OK           200:               14,761  (100.00%)
Moved        302:                    0  (  0.00%)
Forbidden    403:                    0  (  0.00%)
Not found    404:                    0  (  0.00%)
Server error 500:                    0  (  0.00%)
Bad gateway  502:                    0  (  0.00%)
Down         503:                    0  (  0.00%)

* Errors
Connection refused                   0
Request timeout                      0
Unknown                              0
```


에러가 없어서 결과가 좀 싱겁네요. 그래도 에러가 하나도 없으니 기뻐하셔도 좋을 듯 합니다. 여기서 가장 중요한 것은 실제 유저들의 요청들을 그대로 반복하면서 서버를 마음대로 내렸다 올렸다 할 수 있다는 겁니다. 오류가 나면 오류를 고치고 다시 테스트해보면 되고요.

http-replay-bench는 요청을 기록할 때 사용자가 실제로 요청을 던진 시간을 함께 기록합니다. 하지만 요청을 replay 할 때는 이 시간들은 요청 순서를 지키는 목적으로만 사용되고, 정렬된 모든 요청을 쉬지 않고 순서대로 던지게 됩니다. 그래서 웹어플리케이션 성능 테스트 목적으로도 사용할 수 있습니다. (그래서 프로젝트 이름에 bench가 들어간 것이지요) 게다가 thread concurrency를 32로 설정해놨다면 32개 스레드가 모든 요청을 병렬로 실행합니다. 이는 여러 요청이 한 트랜잭션으로 물려있는 웹 어플리케이션에는 적합하지 않습니다. 적합하지 않다는 것이 중요한 점입니다. 깨진 트랜잭션을 시뮬레이션 할 수 있게 해주기 때문입니다. :-)

rb.jar 를 실행할 때는 3가지 옵션을 줄 수 있습니다.  java -jar rb.jar http://foo.bar 만 입력하면 아래와 같이 옵션 사용법이 출력됩니다.

 
```
usage: java -jar rb.jar -d samples -c 10 -n unlimited http://test.org
 -c,--concurrency <arg>   concurrency. number of multiple requests to
                          replay at a time. Default is one request at a
                          time. The default implementation is built with
                          n-thread.
 -d,--dir <arg>           A directory pathname that includes captured
                          http-requests in file formats.
 -n,--repeat <arg>        Number of requests to replay for benchmarking
                          session. this number is belong to each thread to
                          replay http-requests.
option 'dir' must be given.
```

다른 옵션은 설명이 필요없을 듯 하고요, -n 옵션에는 unlimited를 줄 수 있습니다. 이렇게 하면 총 기록된 요청이 1,000개였을 경우 1001번째에는 다시 첫번째 요청부터 다시 재생하는 식입니다.

그럼 [http-replay-bench](http://github.com/rath/http-replay-bench/)와 함께 두려움없는 프로그래밍하시길 바랍니다.

p.s. 바이너리 배포는 하지 않습니다. github에서 [소스 체크아웃](http://github.com/rath/http-replay-bench/zipball/master) 후 [ant](http://ant.apache.org/)로 빌드하여 사용하세요.

## Comments

### 화니
*http://dogfeet.tistory.com*
*2010-01-09T09:53:56.000Z*

와우.. 유용하게 쓸 수 있을것 같습니다..

손의 수고를 덜어주어 잡생각에 도움이 클것 같습니다. ^^

---

### 한석균
*http://www.facebook.com/han.seokkyun*
*2010-01-09T12:09:19.000Z*

유용한 도구네요 와우....영국생활은 어떠세요? ^^

저도 만들어본 경험이....ㅋㅋ
웹요청을 받아서 기록하고, 기록한 파일을 스토리지를 통해서 반대편 으로 보내고, 
반대편의 미들웨어가 기록을 다시
읽어서 단절된 네트웍에 있는 WAS에 던져 응답을 재전송하던 프로그램이었지요.
SI로 유명한 대기업에서 보안을 생각해서 만든 방법이라고 개발해 달라더군요. ^^
잼있죠? ㅋㅋㅋㅋ 보안상이라는 말에...쓰러지는줄 알았죠

---

### iolo
*http://iolo.pe.kr*
*2010-01-10T14:36:31.000Z*

캡쳐받은 것과 같은 파일을 직접 만들 수 있으면 더욱 유용할 듯~ 하지만...
그렇게 되면 더 이상 replay가 아닌거군요^^;
jmeter는 테스트할 때 배치로 돌리기가 번거로웠는데.... 이 녀석 쓰면 꽤 편할 듯~
당장은 백수라... 테스트할 일이 없다는게 문제라면 문제-.-ㅋ

---

### neonatas
*2010-01-18T08:49:36.000Z*

이런.. 용자 같으니라고.

---

