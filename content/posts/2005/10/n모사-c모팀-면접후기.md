---
title: "N모사 C모팀 면접후기"
date: Tue Oct 11 2005 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2005/10/n모사-c모팀-면접후기
lang: ko
tags: ["job-interview", "database", "career", "programming"]
---

N모사 C모팀에 1차 면접을 보고 왔습니다.

잡설은 뒤로하고, 감명깊었던 C모팀 면접관 중의 한 마디.

"DB에서 풀스캔하는거보다 느린게 있나?"

아아 당황스럽다.

참 여자친구는 N모사 합격!

## Comments

### pistos
*2005-10-11T17:40:29.000Z*

메신저팀 비추인뎅.. ;;

---

### rath
*http://xrath.com*
*2005-10-12T01:26:32.000Z*

엇 unix c 한다길래 재미있을줄 알았는데, 것도 아닌가보당;

---

### pistos
*2005-10-12T12:14:51.000Z*

응 unix c 하는건 맞아.

---

### rath
*http://xrath.com*
*2005-10-12T12:20:07.000Z*

먼가 다른게 있나보군요! 엠에센 들어가봐야겠당 잇힝

---

### rath
*http://xrath.com*
*2005-10-12T12:21:03.000Z*

안계시는군요 ㅡ_ㅢ

---

### nohmad
*2005-10-12T16:25:03.000Z*

그런데 답이 뭔가요? -.-

---

### rath
*http://xrath.com*
*2005-10-13T02:46:50.000Z*

A라는 테이블에 Z, X, C 컬럼 순서로 인덱스를 걸어놓은 상태에서, 검색조건 컬럼이 X, C 밖에 없는데 단지 풀스캔보다 인덱스를 태우는 것이 좋겠다 싶어서, Z>0 이나 Z>=0 이나 Z>=' '같은 것을 조건에 걸어두는 행위를 할 경우, Query Plan에서는 '인덱스 잘 탔어요' 라고 말하지만 실제로는 Z 컬럼에 대한 풀스캔이 이루어지는데 인덱스공간과 테이블공간을 왔다갔다하는데 필요한 오버헤드때문에 풀스캔보다 느린 상황이 생겨요.

---

### rath
*http://xrath.com*
*2005-10-13T02:49:58.000Z*

레코드수가 4천만건 정도일때 5배정도 느렸어요. DBMS는 Oracle 9.2.0.x

---

### pistos
*2005-10-18T01:14:02.000Z*

인덱스를 잘못태워서 풀스캔이 일어나는 전형적인 사례인것 같은데.

실서비스에서 저런거 나오면 바로 디비서버 뻗음 ㅡㅡ

쿼리를 만들때 인덱스를 태우는 관점에서 보느냐.. 결과적으로 풀스캔이 나는 관점에서 보느냐에 따라서 물어본사람의 의도와 같을수도 있고 다를수도 있겠네.

대략 세분중 누가 물어본건지 알것 같고.. 그분이 의도한거랑 장호가 얘기한거랑 결국 같은 얘기로 생각되는걸.

---

### rath
*http://xrath.com*
*2005-10-18T04:41:12.000Z*

그럴지도~

---
