---
title: "Hibernate로 프로젝트를 진행하며 느낀 점들"
date: Tue Sep 29 2009 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2009/09/generated-emotions-when-i-use-hibernate-framework
lang: ko
tags: ["technology", "hibernate", "java", "database"]
---

c3p0을 썼을 때 DB가 안떠있으면 정상적으로 connection refused가 뜨기도 하지만, 어이없게도 deadlock이 의심된다는 예외가 뜰 때가 있다.  

org.hibernate의 로그 레벨을 DEBUG로 하면 1초만에 1.3MB, TRACE로 하면  5MB의 로그파일이 생겼다.  
@OneToOne, @OneToMany, @ManyToMany, @ManyToOne 과 친해지면 시간을 절약할 수 있다.  
Cascade를 제대로 이해하지 못해서 삽질 제대로 했다. 신물나는 삽질의 결과로 깨달음을 얻긴 했다.  
Cascade는 타이핑 하기 어렵다.  
FetchType.LAZY 와 FetchType.EAGER 를 적절히 사용하기가 쉽지 않다. pros and cons 가 있는 듯 하다. best practice는 그다지 도움되지 않는다.  
EJB3 annotation (javax.persistence.*)으로 묶은 POJO들을 JSON/XML bind도 하면서 AMF로 Flex 클라이언트에게 보내다보면, POJO가 클라이언트 끝에서 백엔드 끝까지 한큐에 왔다갔다하는 기쁨을 누릴 수 있다. 단, 그지경까지 가려면 선행 학습과 약간의 try-and-error가 필요하다.  
FetchType.LAZY로 뽑은 녀석들을 함부로 Serialize 해버리는 것은 위험하다. 경고나 예외가 발생하지 않는다. 프록시 오브젝트들도 함께 Serialize 되버린다. 물론 그것들을 뽑을 때(Hibernate session이 없는 곳에서) 낭패를 본다. 주의가 필요하다. Hibernate.initialize() 메서드는 달갑지 않다.  

c3p0를 JMX로 관리할 의도가 전혀 없을 경우, 시스템 프로퍼티 *com.mchange.v2.c3p0.management.ManagementCoordinator*에 *com.mchange.v2.c3p0.management.NullManagementCoordinator*를 넣어주지 않으면 startup 시마다 access denied 스텍트레이스 4종 세트를 만나게 된다. hibernate.cfg.xml 에 이리저리 이름 바꿔보며 찡겨넣어봐야 소용없다.  
HQL을 쓸 때, from myentity where user.email=? 하면 에러. from myentity as m where m.user.email=? 은 통과한다. as가 인기 좋은 것은 hibernate 세상에서도 여전한가보다.  
L2 cache는 선택할 수 있지만 L1 cache는 없애버릴 수 없음을 잊지 말자. 무지 큰 레코드셋을 핸들링하려면 Session.evict()와 친해져야만 한다.  
레거시 데이터를 처리하려면 Session.save, update, saveOrUpdate 뿐만아니라 Session.merge와도 친해지는 것이 좋다.  
hibernate.cfg.xml 에서 show_sql 켜놓으면 점점 쓰기 싫어진다. 한창 개발을 진행하고 있을 때는 정신건강을 위해 꼭 꺼두도록 하자.

## Comments

### 갱
*2009-09-30T05:35:50.000Z*

Cascade 쳐보고 '아하!' 했어. ㅋㅋㅋ

---

### Jang-Ho Hwang
*http://xrath.com/*
*2009-09-30T10:05:18.000Z*

[@갱 ](#comment-3182) 
크하하하. 쳐본 사람만이 알 수 있는 즐거움 (..)

---

### 권남
*2009-10-01T01:25:13.000Z*

하이버네이트는 Dirty Checking 때문에 세션별로 캐시를 만들고 원본 데이터와 실제 사용자가 사용하는 데이터를 함께 이중으로 저장합니다(L1 캐시). 이것 때문에 별다른 update() 메소드 호출없이 객체의 변경 사항이 자동 체크되고 세션이 끝날 때 자동 update가 일어납니다.
하지만 이 때문에 대용량 데이터 로딩시에 메모리가 꽉차는 현상이 발생할 수도 있습니다.
L1 캐시를 없애는 방법은 없지만, 캐시를 안하게는 할 수 있습니다. Query.setReadOnly(), Session.setReadOnly()를 보세요.

---

### Jang-Ho Hwang
*http://xrath.com/*
*2009-10-01T11:46:25.000Z*

[@권남 ](#comment-3190) 
좋은 정보 감사합니다.

---
