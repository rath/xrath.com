---
title: "JMSN 파일보내기가 안될때"
date: Tue Nov 30 2004 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2004/12/jmsn-파일보내기가-안될때
lang: ko
tags: ["messaging-protocols", "networking", "java"]
---

JMSN은 MSNP9 이하 버젼의 파일전송 프로토콜을 사용합니다.
Direct 모드로 파일을 주고 받으며, 이는 결국 파일을 보내는 사람이 NAT에 있거나 방화벽등으로 public ip를 가지지 못한다면 파일을 보낼 수 없음을 의미합니다. 파일을 주고 받는데 사용하는 TCP 포트번호는 6891 부터 1씩 증가하도록 해두었으며, Microsoft의 MSN 또한 TCP/6891 포트를 사용합니다. 

하고자 하는 말인즉.. 파일을 보내려고 하는 사람의 PC에 랜카드가 여러장 있을 경우 JMSN은 무슨 주소를 사용해야하는지 혼란스러워합니다. JMSN에서는 단지 java.net.InetAddress 의 getLocalHost().getHostAddress()를 자신의 주소라고 판단하기 때문입니다. 이럴 경우 자신은 public ip 인 경우에도 파일을 보내지 못할 수 있습니다.

상대방에게 '내 주소는 여기니까 이리로 와서 파일을 받으렴' 하고 말하는데, 잘못된 주소를 넘겼다면 파일 송신이 정상적으로 될리 만무합니다. 그럴때 사용하는 System property가 있습니다. jmsn.file.host 입니다.
JMSN에서는 만약 jmsn.file.host 프로퍼티가 설정되어있다면 InetAddress.getLocalHost를 사용하지 않고 jmsn.file.host 의 값을 자신의 주소로 대입시키기 때문입니다. 

java -Djmsn.file.host=211.233.51.29 -jar jmsn.jar

이런식의 사용이 가능합니다. 이것은 잘 활용하면 NAT 에서도 파일을 보낼 잔머리를 굴릴 수도 있지요. JMSN을 사용하는 데스크탑의 아이피가 192.168.1.100 이지만, public ip를 가지면서 192.168.1.100 에 접근할수 있는 녀석이 있다면 (혹은 ssh의 -L 옵션을 사용한다면) jmsn.file.host는 public ip를 가지는 장비의 주소를 주고, 해당 장비에서 6891 포트로 들어오는 패킷을 192.168.1.100의 6891로 포워딩 해주면 파일을 잘 보낼수가 있지요!

이 프로퍼티는 위와 같은 상황에서 쓰려고 JMSN 초반인 2002년 초에 만들어둔 것이지만, 특별히 document 된적도 없기때문에 늦게나마 블로그로 올려봅니다. :D
