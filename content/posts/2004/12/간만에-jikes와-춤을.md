---
title: "간만에 Jikes와 춤을!"
date: 2004-12-22
slug: 2004/12/간만에-jikes와-춤을
lang: ko
---

매우 빠른 IBM의 Java compiler가 어느덧 1.22 릴리즈가 되었다. (이 사실을 portage에서 확인;)
jikes 1.22의 configure --help를 보니 --enable-source15가 있었다.
그래서 --enable-source15를 켜고 컴파일해보니.. 안되는것이 아닌가!
일단 static import를 해보았다. 
오예 에러~

  2. import static java.lang.System.*;
            ^----^
*** Semantic Error: Static imports are only supported for '-source 1.5' or greater.(not yet implemented)

분명히 -source 1.5를 줬는데도.. 어랏 not yet implemented라니. jikes 코드를 뒤져본다.
decl.cpp에 아래와 같은 부분이 있다 ㅡ_ㅡ

![jikes-decl](/blog/img/jikes-decl.png)

어흑.. jikes 페이지에서 좀더 찾아보기로 했다. 
http://www-124.ibm.com/developerworks/patch/?group_id=10 에 보면 패치중에
Autoboxing support라는 것이 보였다. autoboxing 만 되는게 어디냐. 
diff를 복사해서 patch 한후 다시 컴파일 해봤다.

헉.. autoboxing만 되고 autounboxing은 안된다 -_-;;;
그래도 jikes 코드 전반적으로 jdk 1.5 generic에 대한 부분이 많이 있었다.
조만간 모두 지원되리라 굳게 믿는다!

## Comments

### 김영성
*2005-01-17T12:31:31.000Z*

안녕하세요...

이곳 저곳을 찾아 헤메다 여기까지 왔네요

혹시 jikes configure 실행시 나는 encoding 관련 문제에 대해서 알고 계신가요?

며칠째 이문제로 골머리를 앓고 있습니다.

제발 도와주세요~~

---

### rath
*http://xrath.com*
*2005-01-18T00:41:42.000Z*

오옹.. 어떤 문제가 있나요? 전 문제가 없어서..

---

### 김영성
*2005-01-18T06:05:29.000Z*

저...혹시

./configure 하실때, 파라미터 모모 해서 하시나요?

저는 ./configure --prefix=위치 CXX=/usr/bin/gcc 해서 하는데...

configure 하고 난 후 make install 하면

/usr/local/bin/gcc  -g -O2   -o jikes  ast.o body.o bytecode.o  case.o code.o control.o decl.o  definite.o depend.o diagnose.o double.o  dump.o error.o expr.o getclass.o  incrmnt.o init.o javaact.o jikes.o  jikesapi.o long.o lookup.o lpginput.o  modifier.o op.o option.o parser.o  scanner.o segment.o set.o stream.o  symbol.o system.o tab.o unparse.o  unzip.o zip.o platform.o  -lm

정의되지 않음                   첫번째 참조된 

 기호                       파일의

istream::get(char &)                incrmnt.o

ostream::operator<<(char const *)   bytecode.o

ostream::operator<<(char)           error.o

ostream::operator<<(int)            diagnose.o

cin                                 incrmnt.o

cerr                                incrmnt.o

cout                                option.o

ostream::flush(void)                diagnose.o

ld: 치명적: 기호 참조 오류. jikes에 출력이 기록되지 않음

collect2: ld returned 1 exit status

*** Error code 1

make: Fatal error: Command failed for target `jikes'

Current working directory /export/home/staff/yskim/jikes/jikes-1.13/src

*** Error code 1

make: Fatal error: Command failed for target `install-recursive'

에러가 나더라구요...

혹, 이 에러에 대해 집히는 것이 있는지요?

부탁드립니다.

---

