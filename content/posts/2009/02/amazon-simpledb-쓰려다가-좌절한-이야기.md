---
title: "Amazon SimpleDB 쓰려다가 좌절한 이야기"
date: Sat Jan 31 2009 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2009/02/amazon-simpledb-쓰려다가-좌절한-이야기
lang: ko
tags: ["amazon-simpledb", "cloud-computing", "database"]
---

엔지니어링 일만 하면서는 내가 원하는 삶을 살 수 없기 때문에 [Amazon SimpleDB](http://aws.amazon.com/simpledb/)를 살펴봤다.

SimpleDB로 mass용 웹서비스를 만든다면 경제적으로 어떨지 모르겠지만, 개인용도로는 충분히 저렴하다고 생각해서 낼름 채택했다. 사용법은 무지 쉽다. 괜히 유료 서비스이겠는가. 

 

SimpleDB는 엑셀을 떠올리면 이해하기 쉽다. 워크시트가 있고(aws에서는 도메인이라고 부름) 하나의 워크시트는 여러개의 아이템을 가질 수 있다. 여기서부터는 살짝 엑셀과 달라지는데, 아이템이 가질 수 있는 것은 Dictionary다. key-value pair. SimpleDB에서는 attribute set이라고 하는데.. **value 길이에 제한**이 있다. 1024 limit !!

 

SimpleDB 라이브러리는 기본으로 UTF-8을 쓰므로 다국어 문제가 생기지 않는다. 그렇다면 1024 limit 을 줄 때 당연히 1024 characters 인줄 알았는데...

**1024 byte 다!!!** 공백 구두점 포함해서 대략 한글 400자로 뭘 어쩌.. 아, 그래. Simple 이지 Simple.

 

AWS 서비스들을 추상화하여 입력 attribute의 value가 1024 바이트가 넘을 경우, 알아서 [S3](http://aws.amazon.com/s3/)로 넘겨버리고 S3의 데이터 URL을 attribute value에 넣어주는 것을 만들어주면 좋겠다. 물론 이럴 경우 GET 하는 부분도 추상화가 되어야 하고.. 쿼리 스트링도 처리해줘야 겠고.. (ComplexDB가 되버린다)

2048 chars 만 되도, 아니 1024 chars 만 제공해줘도 바로 쓸텐데 말이야.

하지만 결국 1024 bytes로 타협하고 프로그램 스펙을 바꾸고 있는 나를 발견.

## Comments

### 오스카
*http://www.oscarplex.net*
*2009-02-01T12:46:29.000Z*

1024바이트... 흠... 전부 압축하삼. ㅋㅋㅋ

---

### rath
*http://xrath.com/*
*2009-02-02T23:32:49.000Z*

어우 그럼 select 할 때 어떻게 해요 ㅋㅋ;

---
