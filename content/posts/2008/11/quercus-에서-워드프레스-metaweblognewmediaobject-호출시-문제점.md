---
title: "Quercus 에서 워드프레스 metaWeblog.newMediaObject 호출시 문제점"
date: Sun Nov 02 2008 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2008/11/quercus-에서-워드프레스-metaweblognewmediaobject-호출시-문제점
lang: ko
tags: ["wordpress", "quercus", "php", "java-integration"]
---

Resin 3.2.0 의 Quercus 위에서 WordPress 2.6.3 을 돌렸다.

얼핏 보니 잘 돌아간다. UTF-8도 잘 되고~
디비 설정에 문제도 없고~

그런데!

[metaWeblog.newMediaObject](http://www.xmlrpc.com/metaWeblogNewMediaObject)로 파일을 첨부하면 정상적으로 업로드 되는... 척만 하고 업로드된 파일 내용이 틀리다.
metaWeblog.getCategories, metaWeblog.newPost/editPost/getPost 다 잘 되면서...

이것땜에 2시간 넘게 삽질하고.. 혹시나해서 **c php 로 돌려보니 잘 돌아간다**.
caucho 블로그 보면 Quercus 좋다고 자랑에 자랑을 하던데.. 속도 빠른 것도 좋아.. 
아직 발전해나가는 Quercus니까 뭐 좋다고.. php api 몇개 제대로 안되서 에러나는 것도 좋다고..
근데 에러는 하나도 없고, 업로드된 파일 내용이 다르면 안되겠지 -_-?

뭐.. 내 팔자겠지 ㅠ_ㅠ

## Comments

### 오스카
*http://www.oscarplex.net*
*2008-11-03T01:46:01.000Z*

Resin에서 wordpress를 어케 돌렸나 했더니, Quercus 라... Java에서 PHP를 돌려주는 건가 보네요? 호...

---

### rath
*2008-11-03T02:08:31.000Z*

가끔 디테일에서 문제가 생기긴 하지만.. 쓸만해요. phpMyAdmin도 잘 돌아가고요 ^^

---
