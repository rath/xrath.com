---
title: "Windows Live OpenID 체험기"
date: 2008-10-01
slug: 2008/10/windows-live-openid-체험기
lang: ko
---

**Windows Live ID Becomes an OpenID Provider**

MS의 Windows Live가 OpenID 프로바이더를 제공합니다. 구글앱도 OpenID 프로바이더를 제공하고, 야후도 OpenID 프로바이더를 제공하고.. 뭐 이리 많습니까 -_- 이렇게 프로바이더가 많을 필요가 있나..

암튼 만들어봤습니다.
Windows Live 에서 얻은 OpenID는 [http://openid.live-int.com/rath](http://openid.live-int.com/rath) 이것입니다.
클릭해보셔도 상관없습니다. 빈 페이지일 뿐이고, 소스보기를 해보면 그저 HEAD 에 


```

```


가 있을 뿐입니다. 재미있는 것은.. 주소 확인 메일이 도착했는데, 컨펌하지 않아도 사용할 수 있었다는 것. -_-

OpenID 2.0을 제대로 follow up 하지 않아서 잘 모르겠지만, 어찌된 일인지 [sreg](http://openid.net/specs/openid-simple-registration-extension-1_0.html)를 쓰고 있는 대부분의 사이트들에 대해 아무런 응답도 해주지 않고 있습니다. 
오픈아이디 주소가 영~ 안이쁘긴 하지만, 암튼 어디어디에 쓸 수 있을지 확인해보기로 했습니다.

**plaxo.com**

잘됩니다. OpenID 2.0 에서 sreg가 어떻게 바뀌었는지 모르겠지만 암튼 이메일 주소를 제대로 가져오지 못하네요. 하여튼 로그인 성공.

**[myID.net](http://www.myid.net/)**

myID를 테스트 해봤습니다. myID.net은 프로바이더만 제공하는 것이 아니라 컨슈머 역할도 합니다. 그런데.. 로그인 시도를 했더니 500 에러가 났네요.

**[미투데이](http://me2day.net/)**

마찬가지로 '확인할 수 없는 오픈아이디' 라고 나옵니다. 

**[귓속말](http://whisper.playmaru.net/)**

비밀번호 확인 후 500 오류 페이지가 표시됩니다. 직접 만든 서비스라 오류 로그를 살펴볼 수 있었는데요. 귓속말은 codesxip의 openid4java 0.9.3을 쓰는데 
org.openid4java.message.MessageException: Invalid Key-Value form, colon missing:
이런 오류가 발생하네요. [openid4java](http://code.google.com/p/openid4java/) 0.9.4는 OpenID 2.0도 지원한다고 하니 f/u 해야겠습니다.

**[lifepod](http://www.lifepod.co.kr/)**

오픈아이디 형식을 잘 지켜달라는 javascript alert 창이 뜨며 로그인이 안됩니다.

**[ISBNshop](http://mania.isbnshop.com/)**

로그인 후 '일시적인 오류로..' 메시지가 담긴 오류 페이지가 뜹니다. 안타깝네요.

**[스프링노트](http://www.springnote.com/)**

오오! Windows Live OpenID로 로그인도 잘되고 가입도 잘 됩니다. >_< 스프링노트 짱짱!!

**[롤링리스트](http://www.rollinglist.com/)**

대부분의 사이트와 마찬가지로 로그인 직후 '시스템 오류' 페이지가 표시됩니다. 

**RevU**

오픈아이디 서버가 인증을 거부했다고 표시합니다.

마지막으로 제 홈피.. 귓속말과 똑같이 openid4java 0.9.3을 쓰고 있어서 그런지 오류는 안나지만.. 어쨌든 verification 오류로 로그인이 안되네요.

이상, Windows Live OpenID 체험기였습니다.
