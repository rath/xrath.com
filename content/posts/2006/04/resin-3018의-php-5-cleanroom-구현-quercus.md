---
title: "Resin 3.0.18의 PHP 5 Cleanroom 구현 Quercus"
date: Sat Apr 08 2006 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2006/04/resin-3018의-php-5-cleanroom-구현-quercus
lang: ko
tags: ["php", "java", "web-development", "technology"]
---

[http://wiki.caucho.com/Quercus](http://wiki.caucho.com/Quercus)

Caucho가 자바로 클린룸 형태의 PHP 5를  구현했다!

비록 내 홈페이지에서 사용하는 블로그인 Soojung을 바로 포팅하는데는 실패했지만, 기본적인 php 함수 (내가 아는 한도내에서)들은 모두 잘 돌아간다. 별거없이 web.xml 에서 다음처럼 servlet-mapping 하나만 더 해주면 된다.

```xml
<web-app xmlns="[http://caucho.com/ns/resin](http://caucho.com/ns/resin)">
  </servlet-mapping>
</web-app>
```

으하하하 caucho 만세!

## Comments

### rath
*http://xrath.com*
*2006-04-09T02:03:42.000Z*

Soojung을 Quercus에 올리면서 생기는 문제점들이 꽤 있다.

여태까지 발견한 것들은 모두 Soojung이 사용하는 Smarty에서 생겼다.

o new 키워드 인자로 -> 키워드가 불가.

o forearch 키워드의 in에 -> 키워드 불가.

o 그 외 다수 --;

Smarty를 사용하지 않는 TT(테터툴즈)인 경우 mysql밖에 사용하지 않아서 그런지 코드수정없이 단박에 Quercus 위에 올라갔다.

이 기회에 tt로 바꿀까..? -_-;

---

### rath
*http://xrath.com*
*2006-04-09T02:04:37.000Z*

분명 Soojung이나 Smarty의 잘못은 아니지만, Quercus를 건드리기 시작하면 명랑연애생활과 바른회사생활에 문제가 생길것이 분명하다 ㅡ.ㅡ

---

### rath
*http://xrath.com*
*2006-04-09T02:13:52.000Z*

설치된 태터툴즈가 잘 보여지길래 tt는 잘되는구나.. 했었는데, 테터툴즈 setup을 하다보니 다음과 같은 에러가 발생하는군요 흑흑

함수가 설치되어야 합니다 

checkdate 

gmstrftime 

strncasecmp 

xml_get_error_code 

그냥 블로그 만들어야 되나봐요 ㅠ.ㅠ

---

### 다즐링
*http://iz4u.net/blog/*
*2006-04-10T01:14:35.000Z*

ㅎㅎ 

이기회에 자바 오픈소스 블로그를!!

---

### rath
*http://xrath.com*
*2006-04-10T15:35:06.000Z*

오옷 해볼만한 일이겠군요 ㅎㅎ

---
