---
title: "Java NIO 삽질록"
date: 2004-12-06
slug: 2004/12/java-nio-삽질록
lang: ko
---

요즘 하는 알바중에 [nio](http://java.sun.com/j2se/1.4.2/docs/guide/nio/) 쓰는 일이 있습니다.
금년 여름에도 nio기반의 p2p 파일공유 프레임워크쪽 알바를 했었기에 이번에도 거침없이 뛰어들었습니다. 
그렇게 뛰어들은지 어느덧 2주가 되어갑니다. 

Selector에 등록한 SelectableChannel을 상속받은 SocketChannel을 분명히 close 했는데 어이없게 **안끊기는** 겁니다. 혹시나 하며 패킷을 캡춰해봤지만 FIN도 안보내고 RST조차
안보냅니다. 우어어 T-T

안끊겼다는 것을 판단한 기준은 Destination host에서 자신이 끊긴줄 모른다는 것이고, TCP Layer에선 FIN/RST가 가지 않았다는 것입니다. 
socket.close()를 하고 isClosed를 출력해봐도 true고...

코드를 살펴보다보니, 위같은 상황은 select loop thread가 아닌 곳에서 해당 채널을 닫았을때만 일어나는 상황이였습니다.
그렇다면 Selector.select()가 block 되어있을때 SocketChannel.close를 불러봐야 blocking이 안풀린다는 건가 봅니다. 아니 그래도!! 
최소한 SocketChannel을 닫았으면 FIN은 가야하는거 아닙니까 --?

여차여차해서 java.net.Socket의 shutdownInput, shutdownOutput을 쓰게 되었습니다. shutdownInput은 단지 InputStream이나 read쪽에 EOF를 대체해줍니다. 최소한 Selector가 OP_READ를 던지게 해줄수 있는데, shutdownInput만 하고 close했는데 여전히 반응 없습니다.
shutdownOutput을 함께 해주고 close하니까.. 앗싸! 바로 닫히긴 하는데, OP_READ에서 EOF가 좀 오랫동안 (0.1초정도) 지속된 후에 닫힙니다. 결국 shutdownIn/Output을 한 후에 close하면 바로 상대쪽에서 끊깁니다. 그러나.. 뒤가 찝찝해서 이것저것 문서를 더 뒤져봅니다.

java.nio.channels.Selector의 class-doc을 보니, select 메서드에서 blocking 되어있을때 이를 빠져나오게 하는데 3가지 케이스가 있다합니다.

By invoking the selector's wakeup method.
By invoking the selector's close method, or
By invoking the blocked thread's interrupt method, in which case its interrupt status will be set and the selector's wakeup method will be invoked

2, 3번째 방법은 select loop를 종료시켜버립니다. 결국 wakeup을 사용해보기로 결정!

아아 잘됩니다. 정상적으로 OP_READ를 받아서 close처리가 되고 FIN도 잘 보냅니다. 
클라이언트도 정상적으로 종료됩니다. 그런데 채널의 close 메서드에서 허구헌날 Selector.wakeup을 부르는건 말도 안되므로 current thread가 Select하는 thread가 아닐 경우에만 wakeup을 하도록 했습니다. 얏호오

그렇게 어느덧 또 AM 03:35가 되버린것 입니다.