---
title: "Oracle 10g for Windows 나쁘다"
date: 2006-07-24
slug: 2006/07/oracle-10g-for-windows-나쁘다
lang: ko
---

회사에서 개발중인 미들웨어 제품에 백엔드로 Oracle을 지원하기 위해
어제 회사 데스크탑에 열심히 오라클 10g를 설치했다.

그리고 어제 하루 MySQL로 되어있던 스키마와 쿼리 
거의 다 새로짜놓고 기분좋게 퇴근했다.

오늘 출근해서 컴을 켰는데.. -_- JVM이 쇼를 하네?

D:/foo/bar/sibong.jar <- 이 파일

```java
File f = new File("D:/foo/bar/sibong.jar");
System.out.println( f.getAbsolutePath() );
System.out.println( f.exists() );
```

위 코드가 포함된 메서드를 1-2초 간격으로 3번 불렀을뿐인데
처음에는 exists true 더니 그 담엔 false 랜다.
파일이 지워졌나? 보니까 잘 있네.. 테스트 프로그램을 재실행해보면
또 true, false, false. 이런 미친 허접쩝쩝같은.

평소에 잘 먹히던 System.loadLibrary("path/to") 도 링크에러나서
System.load( absolutePath )로 바꾸고.. 그래 또라이 오라클도 
같이 지원해주는게 올바른 프로그래머의 모습일꺼야.. 하고 하나하나 
해주고 있었는데.. 뭐? true, false, false? 이 미친!!! -_-

15분정도 열받아 하다가, 
환경변수 PATH에서 oracle을 버리니까 예전처럼 잘 된다.

아 아침부터 짜증~ 짜증~ 짜증~ 났었다 ㅠ.ㅠ

=========================================
2006/07/25 20:12분에 수정

삽질해서 찾은 결과 ora/product/10.2.0/db_1/bin에 orauts.dll 이
문제라는 것을 알아냈습니다. DLL들 하나씩 다 지워봐서 찾았어요-_-
dumpbin으로 orauts.dll을 훑어보니

```
ReadFile (forwarded to KERNEL32.ReadFile)
ReadFileEx (forwarded to KERNEL32.ReadFileEx)
LoadLibraryA (forwarded to KERNEL32.LoadLibraryA)
LoadLibraryExA (forwarded to KERNEL32.LoadLibraryExA)
CreateFileA (forwarded to KERNEL32.CreateFileA)
CreateFileW (forwarded to KERNEL32.CreateFileW)
```

아까 증상 이상해진 것에 대한 원천 API가 보이는군요. 
에이 미친 오라클 시스템을 병신 만들고 지랄이야!

## Comments

### 다즐링
*http://iz4u.net/blog*
*2006-07-25T02:10:23.000Z*

저도 윈도우때문에 짜증;; 오라클이 설치되면서.. jvm이라던가 패승등을 꼬아둬서..

---

### rath
*2006-07-25T02:36:44.000Z*

패스가 꼬였으면 조용히 java -version 했을때 1.1.8이나 1.3으로 나와서 사용자를 불안하게 만들면 되는데.. 왜 1.5로 나와서 의심도 못하게 한다음 뒤통수를 치는지 모르겠어요 ㅠ.ㅠ 
그리고 oracle/product/10.2.0/db_1/bin 에는 자바와 관련된 DLL도 없고.. 그리고 VM 버젼이 달라진거면 Magic number error 부터 딱 떠줘야 바로 알고 고치는데.. 조용히 1.5로 잘 뜬담에 저런 말도 안되는 짓을 하다니 정말 뒤통수..-_-;

---

### 다즐링
*http://iz4u.net/blog*
*2006-07-25T09:38:32.000Z*

흑흑 맞아요 오라클 미워요!

---

### rath
*2006-07-25T09:48:16.000Z*

오라클 미워요!

---

### rath
*2006-07-25T11:18:40.000Z*

아이고 해결해서 즐겁네요 룰루랄라

---

### 방문자
*2006-08-16T11:48:14.000Z*

윈도우 환경변수 설정에서 Java 의 Path 설정을 Oracle 보다 앞에 놓으면 해결되지 않나요?

---

### rath
*2006-08-16T13:51:17.000Z*

해봤는데 안되더라구요 ;ㅁ;

---

