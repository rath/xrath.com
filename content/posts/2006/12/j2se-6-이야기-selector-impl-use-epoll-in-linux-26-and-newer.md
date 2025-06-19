---
title: "J2SE 6 이야기 - Selector impl use epoll in Linux 2.6 and newer"
date: 2006-12-03
slug: 2006/12/j2se-6-이야기-selector-impl-use-epoll-in-linux-26-and-newer
lang: ko
---

많은 사용자가 붙는 서버를 만들 일이 많지 않았지만, 꽤 괜찮은 내용을 찾았다.

The epoll facility is available in the Linux 2.6, and newer, kernels. The new epoll-based SelectorProvider implementation is more scalable than the traditional poll-based SelectorProvider implementation when there are thousands of SelectableChannels registered with a Selector.

Sun 문서에는 위처럼 너무 간단하게 나왔다.  
리눅스 2.6 커널일 경우 디폴트로 poll 이 아닌 epoll 을 써서 확장성이 더 좋다. 이 뿐.

그래서 좀 더 자세한 글을 찾아보려 구글님께 자문을 구해보았다.   
[Alan Bateman 씨의 포스트](http://blogs.sun.com/alanb/entry/epoll)가 검색되었다.

요샌 다들 커널 2.6을 쓰고 있을테니 대부분의 서버 프로그래머들이 즐거워할 일인듯 하다.  
정말 어느정도의 차이가 나는지 테스트를 해보려면 다음과 같이 강제로 poll을 쓰도록 switching 할 수 있다.  
**System.setProperty("java.nio.channels.spi.SelectorProvider", "sun.nio.ch.PollSelectorProvider");**  
커널 2.4에서도 epoll을 쓸 수 있는 패치가 있다지만, 이녀석을 감지하진 못한단다.  
mustang 깔란 얘기다. (7) 근데 j2se 1.5.0_09 에서도 이 기능이 포함되었다고 한다.  
대신 default로 epoll을 사용하지 않기 때문에    
**System.setProperty("java.nio.channels.spi.SelectorProvider", "sun.nio.ch.EPollSelectorProvider");**  
를 해주어 수동으로 켜 주어야만 한다.

이 포스트에 달린 코멘트 임팩트가 아주 제대로다.

works great for me. With b59, on one of our perf tests, I am seeing system CPU go down from 40% with JDK 1.5.0_05 to 6-7% system in b59 with 10000 connections.   
Posted by anandp on November 05, 2005 at 09:06 AM PST # 

6배의 성능 향상!

## Comments

### rath
*2006-12-03T16:03:21.000Z*

충격적인 메서드 이름 ThreadMXBean.findDeadlockedThreads -_- 
세상 참 좋아졌네요 :$

---

### rath
*2006-12-03T16:23:56.000Z*

jrunscript 엔터치고 감동 받음. 이제 beanshell 안써도 되나 (7)

---

### pistos
*2006-12-04T03:33:53.000Z*

아앗... 2.6커널에서 디폴트로 epoll 아니었던거야??? 젠장..;;

---

### pistos
*2006-12-04T03:35:34.000Z*

아.. 2.4에서의 얘기군아... 젠장.. 코멘트 삭제가 안되!!

---

### 윤종현
*2006-12-04T09:01:32.000Z*

음.. epoll을 쓰게 할 수도 있군요;;; 예전 팀의 서버 개발자는 jvm에서 epoll을 nio로 쓸 수 있게 직접 고친다고 삽질 참 많이 했었는데. -0-

---

### 윤종현
*2006-12-04T09:02:42.000Z*

근데 데드락 스레드를 찾을 수 있는 함수가 있다?... 좀 잇힝;;; -0-

---

### rath
*2006-12-04T12:19:35.000Z*

pistos: 코멘트 삭제 기능을 만들어 넣어야겠네요 --;

---

### rath
*2006-12-04T12:20:41.000Z*

윤종현: 미리 그런 시도를 해보는 행위가 대단한 것 같아요. ㅎㅎ 데드락 스레드 찾는 함수는 꼭 테스트해보고 다시 결과 말씀드리지요~

---

### rath
*2006-12-04T18:46:47.000Z*

윤종현: 오~ 테스트해보니 정말 데드락 스레드를 찾아주는군요 +_+
문서를 보니 trying acquire 스레드중 서로를 마주보고 있는 것들을 골라주는 
거라네요.. 들어보니 이론상 구현하기는 어렵지 않은것 같은데, 테스트 코드를 
돌리며 제일 난해했던게.. 찾긴 찾았는데, 풀어줄 방법이 애매했다는 -_-;;;

---

### rath
*2006-12-04T19:46:29.000Z*

지금 다시 읽어보니 스펀지에나 나올법한 말이네요. 
네이버 검색창에다.. "데드락 스레드를 찾을 수 있는 함수가 있다???" 쳐봐야할 것 같아요 --;

---

### 다즐링
*http://iz4u.net/blog*
*2006-12-05T14:35:59.000Z*

이제;; resin 에서는 디폴트로 epoll 쓰려나;; ㅠ_ㅠ 아름답겠다..

---

### rath
*2006-12-05T23:57:24.000Z*

아름다운 세상~

---

