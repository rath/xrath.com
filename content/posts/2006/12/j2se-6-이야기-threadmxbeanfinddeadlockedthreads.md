---
title: "J2SE 6 이야기 - ThreadMXBean.findDeadlockedThreads()"
date: 2006-12-04
slug: 2006/12/j2se-6-이야기-threadmxbeanfinddeadlockedthreads
lang: ko
---

이번엔 [윤종현님](http://blog.naver.com/neoctrl)이 놀라움을 표현해주신 '데드락 스레드를 찾을 수 있는 함수!'에 대해 자세히 살펴보겠습니다.

[테스트 해볼 수 있는 예제 코드](/files/Deadlock.java.html)

돌려보니 정말로 잘 찾아냅니다.   
오해로 뒤엉켜 사랑에서 빠져나오지 못하는 가슴 아픈 두 스레드를 검출해줍니다.  
메서드 이름이 충분히 직관적이라 별다른 설명은 필요없지만 예제코드 89라인에서  
interrupt()로 데드락을 빠져나와보려는 무의미한 시도를 해본 것처럼   
결과적으로 검출해서 뭐하지? (7) 하는 생각이 들지 않을 수 없습니다.  
이에 method-doc 에는 이렇게 써있습니다.

This method is designed for troubleshooting use, but not for synchronization control. It might be an expensive operation. 

그렇습니다. 데드락을 찾아서 뭔가 해결을 해줄 수 있다면야, MXBean 계열에 이녀석이 포함되어있지도 않았을 것입니다. :( 아무튼 synchronized 키워드의 blocking을 강제로 피하게 할 수 없다는 것은 여전히 슬픈 일입니다.  
ReetrantLock.tryLock은 timeout을 받을 수 있고 interruptable 이므로 데드락 검출시 이를 해결해줄 수   
있겠다는 생각을 하여 ReetrantLock을 사용하여 [Deadlock2 예제](/files/Deadlock2.java.html)를 만들어보았습니다.

와와 데드락 검출 후 해당 thread.interrupt()로 데드락을 붕괘시키는데 성공했습니다! ㅎㅎ  
한가지 아쉬운 것은, 스레드가 데드락인지 검출할 수 있다면 pair로 찾거나 서로 엉킨 녀석들을 세트로 묶어 리턴해준다면 더 좋았지 않았을까 하는 생각이 듭니다.  
데드락 특성상 한 놈만 포기해주면 나머지가 행복해질 수 있는거니 말입니다.  

생각해보니, 데드락된 스레드들의 stack을 덤프해다 담당 프로그래머에게 던져주며 "야 :@" 하면 되겠군요..(@)

## Comments

### 스카리
*http://scari.net*
*2006-12-05T01:47:34.000Z*

'오해로 뒤엉켜 사랑에서 빠져나오지 못하는 가슴 아픈 두 스레드' -.-b

---

### tolkien
*http://tolkien.withseha.net*
*2006-12-05T02:15:47.000Z*

그것은 스카리와 래쓰옹의 사랑. :p~

---

### rath
*2006-12-05T02:21:57.000Z*

아니 왜들 이러시옵니까! ㅎㅎ

---

### pistos
*2006-12-07T03:07:44.000Z*

오해로 뒤엉켜서라도 사랑에서 빠져나오지 못하면 해피한것 같은데.. :)
아.. 외로운 겨울이다....

---

### rath
*2006-12-07T05:47:58.000Z*

해피하지 않을거 같아요 ㅎㅎ 아우.. 전 피곤한 겨울예요 -,.-

---

