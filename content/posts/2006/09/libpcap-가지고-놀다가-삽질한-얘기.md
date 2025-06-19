---
title: "libpcap 가지고 놀다가 삽질한 얘기"
date: 2006-09-21
slug: 2006/09/libpcap-가지고-놀다가-삽질한-얘기
lang: ko
---

무슨 바람이 들었는지 libpcap 가지고 놀았다.

캘리포니아대에서 만든 [jpcap](http://netresearch.ics.uci.edu/kfujii/jpcap/doc/index.html)을 사용했다.

소스포지에 도는 jpcap.sourceforge.net 도 있긴한데 
서로 이름만 같고 별 비슷한 점은 없다 -_-

구글에서 libpcap java 로 검색하면 uci.edu 것이 가장 먼저 나오는데,
jpcap 만으로 검색하면 소스포지의 것이 나온다.
uci.edu의 jpcap faq에 다음과 같은 항목도 있다.

Q: Is this Jpcap related to the Jpcap on sourceforge?
A:  No. They are independently developed, and thus are totally different products.

브라보~ (7)

아무튼 이 jpcap을 잘 가지고 놀다가.. 이녀석이 날 1시간 정도 삽질하게 
만들었다. 이유인 즉슨... 패킷 캡춰 및 필터링을 잘 하다가 아주 가끔씩!!!

```
#
# An unexpected error has been detected by HotSpot Virtual Machine:
#
#  EXCEPTION_ACCESS_VIOLATION (0xc0000005) at pc=0x6d75c5cc, pid=58640, tid=58616
#
# Java VM: Java HotSpot(TM) Client VM (1.5.0_08-b03 mixed mode, sharing)
# Problematic frame:
# V  [jvm.dll+0x9c5cc]
#
# An error report file with more information is saved as hs_err_pid58640.log
```

어우 이런거 싫어 싫어~ -_-
상세 로그 파일을 보면 

```
Stack: [0x00030000,0x00070000),  sp=0x0006f9a8,  free space=254k
Native frames: (J=compiled Java code, j=interpreted, Vv=VM code, C=native code)
V  [jvm.dll+0x9c5cc]

Java frames: (J=compiled Java code, j=interpreted, Vv=VM code)
j  jpcap.JpcapCaptor.loopPacket(ILjpcap/PacketReceiver; )I+0
j  XXXXXXX.main([Ljava/lang/String; )V+40
v  ~StubRoutines::call_stub
```

loopPacket은 native 메서드다. 한숨 쉬며 Visual Studio 띄운다 (씨익)

Debug Build 하여 Attach 해봐야 마지막에 죽은게 jvm.dll 이니 
날로 먹기는 글렀고.. 분명 winpcap에 에러가 있을리 없으니 jpcap의 
jni + c 코드 문제라고 확신하고 디깅하다가 쌩뚱맞은 코드 발견


```
void dispatcher_handler(u_char *id,const struct pcap_pkthdr *header,
			const u_char *data)
{
  jobject packet;
  int ID=(int)id;

  JNIEnv *env=jni_envs[ID];

  get_packet(*header,(u_char *)data,&packet,ID);
  (*env)->CallVoidMethod(env,jpcap_handlers[ID],<b>handleMID</b>,packet);
  DeleteLocalRef(packet);

  YIELD();
}
```


pcap_dispatch에 핸들러에서 Java 쪽 인터페이스를 부르길래 
자바쪽 callee 인터페이스 handleMID를 살펴보니 

public void receivePacket(Packet packet);

아.. 이런.. --; 자바쪽 리스너에서 익셉 떨어지면 다 무시하잖아!
게다가 익셉 처리하는 caller는 pcap_dispatcher 고

그렇다. 

아주 가끔 썰렁한 RuntimeException 새끼들이 발생한거였는데
이를 잡아주지 않아 위로 위로 올라가서 죽은것이 분명하리라.
자바쪽에서 private 메서드로 한 번 더 감싸고 try catch 하여 
예외처리용 핸들러로 예외를 던져버리게 하니 무리없이 돌아간다.

Visual Studio 띄울때만 해도 이렇게 끝날줄은 몰랐다. :$

아무튼 만들려던 툴을 완성하여
하고자 하던 일을 이것저것 하면서 스스로 (씨익) 하고 있다. 
그다지 떳떳한 용도의 어플리케이션이 아니므로 공개는 안할 계획이다. (@)

몇년전부터 libpcap 가지고 뭐 만들면 재밌겠다.. 생각만 하고 미루던 건데
이렇게 해치우고 나니 후련하고 좋다!

P.S.: 원저자에게 보고 해줄까?

## Comments

### 윤종현
*http://blog.naver.com/neoctrl*
*2006-09-22T02:53:16.000Z*

옹.. 그런건 피드백 해주시는게~

---

### rath
*2006-09-22T16:34:54.000Z*

해줘야겠네요~ 지금 하던거 끝나면요 ㅎㅎ 
종현님 여전히 잘 지내시지요?

---

### rath
*2006-09-25T09:38:28.000Z*

오래 사용하다보니.. 그것 말고도 문제가 꽤 있네요 ;ㅁ;
아아 밉다 밉다~

---

