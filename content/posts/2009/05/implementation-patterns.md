---
title: "Implementation Patterns 보다가"
date: 2009-05-12
slug: 2009/05/implementation-patterns
lang: ko
---

Kent Beck이 쓴 [Implementation Patterns](http://www.amazon.com/Implementation-Patterns/dp/B000XPRRVM/ref=sr_1_2?ie=UTF8&s=books&qid=1242091955&sr=8-2)을 보다가

Cost(total) = Cost(develop) + Cost(maintain)

Cost(maintain) = Cost(understand) + Cost(change) + Cost(test) + Cost(deploy)

마이크로 레벨로 생각해보게 됐다. 나는 initial development 주기에 change, test, deploy는 꽤 신경쓰는 편이지만, understand는 신경쓰지 않는다는 것을 깨달았다. 왜냐하면 코드를 작성하는 시점에서는 모조리 이해하고 있으니까.


> Learning what the current code does is the expensive part.  (Location 627 [Kindle location])


일단 이해를 하면 (여기에 코딩하던 순간의 context를 머리속에 로드하는 것까지 합쳐서) 고치고 고친 것을 테스트하고 (테스트도 딱히 신경쓰는 것은 아니지만) 배포하는 것은 쉬운 일이다. 하지만 understand context는 선행조건일 뿐이고.

내 코드를 보며 이해하는데 시간을 많이 쏟은 사람들에게 이 자리를 빌어 사과의 메시지를.
