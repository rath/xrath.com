---
title: "리버스가 잘 안되서 JVM 소스 구경중"
date: 2005-01-01
slug: 2005/01/리버스가-잘-안되서-jvm-소스-구경중
lang: ko
---

여러가지 일이 겹쳤다는 핑계를 둘러댄다 할지라도, 아무튼 -- V-Share 및 역어셈블에 대한 진도가 정말 조금씩밖에 못나가고 있고, V-Share의 SGM.dll 은 이번달 안에는 힘들다고 확신을 하게 될 지경이 되었습니다 -_-

그래서 화풀이로.. 다른 것들을 하고 있습니다. 완성되면 그때 다시 블로그에 남기겠지만, JVM 소스코드를 보던중 System.currentTimeMillis()의 리눅스쪽 코드를 보게 되었습니다.

```
1072 jlong os::javaTimeMillis() {
   1073   timeval time;
   1074   int status = gettimeofday(&time, NULL);
   1075   assert(status != -1, "linux error");
   1076   return jlong(time.tv_sec) * 1000  +  jlong(time.tv_usec / 1000);
   1077 }
```

음.. 그래도 뭔가 다른 것을 원했는데 [세컨드 * 1000 + 나노세컨드 / 1000] 이라니 -_-;;
이번엔 win32 소스코드를 구경해봅니다.
 

```
617 jlong windows_to_java_time(FILETIME wt) {     
    618   jlong a = jlong_from(wt.dwHighDateTime, wt.dwLowDateTime);
    619   return (a - offset()) / 10000;
    620 }
    631 jlong os::javaTimeMillis() {
    632   if (UseFakeTimers) {
    633     return fake_time++;
    634   } else {
    635     FILETIME wt;
    636     GetSystemTimeAsFileTime(&wt);
    637     return windows_to_java_time(wt);
    638   }
    639 <span style="font-family: arial,verdana,sans-serif;">}</span>
```


GetSystemTimeAsFileTime으로 DWORD 2개짜리 FILETIME 구조체로 시스템 시간을 얻어옵니다. 이 값을 jlong으로 변환한 뒤, 이 시간이 100 나노세컨드의 정밀도를 가지므로 이것을 10000 으로  나눕니다. 으음.. 

Solaris 코드도 봤는데, 리눅스쪽과 구현이 동일하네요. 아아 그런것이였어 그런거였어.. -_-; 시스템에서 제공되는 코어 API 부분들에 대한 소스코드를 보면 느껴지는 허무함은 여전합니다. 2년전쯤 [perky](http://openlook.org)님이 보여주신 realloc 의 코드의 기억이 납니다.  realloc 요청된 크기만큼 새로 malloc 한다음 이전것은 free 하고 memcpy 하던 소스코드.. 

환상을 없애는 그 날까지 아잣!