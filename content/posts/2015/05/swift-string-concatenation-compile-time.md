---
title: "Swift 1.2에서 긴 문자열 연결 시 컴파일 속도 저하 문제"
date: Wed May 13 2015 10:42:00 GMT+0900
slug: 2015/05/swift-string-concatenation-compile-time
lang: ko
tags: ["swift", "string-literal", "compile-time"]
---
Swift 1.2로 작성된 파일에서 아무 문자열 리터럴 뒤에

> "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" + "" +

와 같이 덧붙이면, 컴파일 시간이 무려 2분(!!!!!!!) 정도 더 걸린다.

하지만

> "" as String + "" as String + "" as String + "" as String + "" as String + "" as String + "" as String + "" as String + "" as String + "" as String + "" as String + "" as String + "" as String +

과 같이 각 문자열에 as String을 명시해주면 컴파일 속도가 정상으로 돌아온다.

별 생각 없이 Swift 코드 안에 SQL을 아래와 같이
```swift
"CREATE TableName ( " +
"  field1 integer not null, " +
"  field2 integer not null, " +
"  field3 integer not null, " +
"  field4 integer not null, " +
") " + ...
```
형태로 넣었다가, 컴파일 속도가 엄청나게 느려지는 현상을 겪고서야 이 문제를 발견했다.

에라이, 미친 애플
