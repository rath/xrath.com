---
title: "Mock up 환경에 DNS 도 꾸겨 넣기"
date: 2012-07-13
slug: 2012/07/mock-up-environment-with-dns
lang: ko
---

**동기**

	dev.servername.com 같은 주소 사용하기 싫어서
	목업 환경에 기기 한대밖에 없다면 모를까 /etc/hosts 혹은 Windows/system32/drivers/etc/hosts 수정은 한계가 있다.
	소스코드를 수정할 수 없는 프로그램들에게 훼이크 먹이기 위해.

**해결책**

포터블한 적당한 오픈소스 DNS를 구한다. 나는 아무래도 Java 가 제일 편해서 [dnsjava](http://www.xbill.org/dnsjava/) 를 사용하기로 했다. 지금 이 글을 쓰는 시점 최신버전은 2011년 10월 24일에 릴리즈된 2.1.3 이다.

압축을 풀면 살짝 머리가 아프다. 루트 디렉토리에 jnamed 란 클래스가 있다. 이녀석은 jnamed.conf 파일을 필요로 하는데 예제 파일이 존재하지 않는다. jnamed.java 소스를 보면 되는데 이것 역시 귀찮은 사람들은 아래와 같이 한 줄 적어주시면 되겠다.


```
primary 도메인명 zone파일명
```


도메인명이 service.com 이고 zone 파일 이름이 service.com.zone 이라면


```
primary service.com service.com.zone
```


zone 파일은 [ISC BIND](http://www.isc.org/software/bind/) 의 zone 파일을 그대로 사용할 수 있으니 추가 설명은 생략한다.

한가지 문제. dnsjava 는[ forward 기능](http://technet.microsoft.com/en-us/library/cc782142(v=ws.10).aspx)을 제공하지 않는 것만 같다. 즉, 이 dns 에 등록되지 않은 룩업이 생기면 NXDOMAIN (Non-Existent Domain) 을 리턴하게 된다. 지극히 정상적인 행동이지만 목업 환경에는 어울리지 않는 모습이다. 오픈소스이기도 하니 성급히 고치는 전략을 택한다.

일단 org.xbill.DNS.Message.java 에 아래와 같은 메소드를 꾸겨 넣는다.



```java
public boolean didFind() {
		boolean found = false;
		for (List section : sections) {
			if (section == null)
				continue;
			for (Object aSection : section) {
				Record record = (Record) aSection;
				if (!(record instanceof EmptyRecord)) {
					found = true;
					break;
				}
			}
		}
		return found;
	}
```



레코드를 찾았는지 못찾았는지 확인하는 메소드를 만들어봤다. 이제 jnamed.java 의 generateReply 메서드 마지막에 방금 만든 didFind()를 꾸겨넣자. canonical name 을 무시하는 어이없음은 귀엽게 봐주시길. 



```java
response.setTSIG(tsig, Rcode.NOERROR, queryTSIG);

		if( !response.didFind() ) {
			Record[] run = new Lookup(queryRecord.getName(), queryRecord.getType()).run();
			if( run!=null ) {
				for (Record record : run) {
					response.addRecord(record.withName(queryRecord.getName()), Section.ANSWER);
				}
			}
		}

		return response.toWire(maxLength);
```



이제 네트워크 환경설정에서 DNS 서버를 하나 추가하자. 주소는 127.0.0.1. 이렇게되면 Forward Query 를 보낼 DNS 서버 주소가 localhost 가 되서 쿼리가 뺑이치게 된다. 이를 방지하기 위해 jnamed.java 의 main 메서드 맨 위에 아래와 같은 코드를 넣어준다.



```java
Lookup.setDefaultResolver(new ExtendedResolver(new String[]{"8.8.8.8", "168.126.63.1"}));
```



300KB 짜리 목업 DNS 서버 구축 끝.

## Comments

### ruseel
*2013-07-22T23:19:36.000Z*

이 글 덕분에, 처음으로 직접 바로 바로 고칠 수 있는 DNS를 써 보았네요. Android에서 웹을 만들고 있는데 제 컴퓨터로 접속하기 위해서 dns만 올려주신 것 처럼 띄우고 잘 쓰고 있습니다. 감사합니다~

---

