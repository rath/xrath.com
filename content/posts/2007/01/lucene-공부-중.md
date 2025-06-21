---
title: "Lucene 공부 중"
date: Tue Jan 16 2007 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2007/01/lucene-공부-중
lang: ko
tags: ["technology", "programming", "search-engine", "lucene"]
---

월요일부터 [Apache Lucene](http://lucene.apache.org)을 공부중이다.
검색엔진에 대한 개념이 없어서 많은 시간을 들여 이것저것 해보고 있다.
단기 목표는 xrath.com에 검색창을 붙여 보는 것 (H)

범주(블로그 범주말고)를 blog, taja_sentence, blog-comment 등으로 분리했고..
블로그던 타자방 문구들이던 몽땅 다 mysql에 있으니 주우욱 import할 색인기를 만들었다.

TOKENIZE 하는 필드는 제목이랑 내용 전체인데 뭐 글이 313개밖에 없어서 -_- 
(이거 포함 314개) 검색 속도를 측정하기가 어렵다.
CLI 툴 하나 만들어서 java, 사랑, 성격등을 검색해보니 다 1~2ms로 나온다. 

포스트 1개당 1500번 루프를 돌려서 넣어봤다. 
인덱스하는데 소요된 시간은 9시간 20분. 생성된 인덱스 파일은 


```
-rw-r--r-- 1 rath dev 1095326060  1월 16 20:21 _b6ln.cfs
-rw-r--r-- 1 rath dev          4  1월 16 20:21 deletable
-rw-r--r-- 1 rath dev         30  1월 16 20:19 segments
```


문서 수는 313 * 1500 = 469,500 개이다.
인덱스 파일이 저렇게 큰 것은 글 내용을 모두 Field.Store.YES 했기 때문.

1~2ms의 1500배가 나오면 어떻게하나 하고 한 5초간 고민했었는데 그런 일은 일어나지 않았다 --

java
** 54000 matches ** (10 ms)
jdk
** 24000 matches ** (5 ms)
사랑
** 43500 matches ** (8 ms)

대략 다행. 아무래도 같은 내용이 1500개가 들어갔으니 검색에 이점이 있을지도 모르겠으나 큰 차이는 없을거라 추측해본다. 

검색에 관련된 일을 해본 적이 없어서 그런지 너무나도 재미있다.
ADD, REMOVE, MODIFY, SEARCH 명령어들을 tcp로 받아 결과를 처리할 검색엔진 데몬은 다 만들었고
테스트도 했으니.. 이제 웹에서 사용할 클라이언트 컴포넌트들 만들어야겠다. 

그나저나 월요일 03시부터 시작해서.. 첫날 6시간 자고 두번째 날은 12시간 자고..
아직 밖에 나가질 않았다. 아! 중간에 루씬 인 액션 책 사러 잠깐 서점 갔었다. ㅎㅎ
이거 하느라 밀린 포스팅이 무지 많은데.. 밀린 일들 할 생각하니 벌써부터 깜깜 -_-
