---
title: "JDK 1.7 Build b16 으로 싹 교체"
date: 2007-07-21
slug: 2007/07/jdk-17-build-b16-으로-싹-교체
lang: ko
---

다 바꿔버렸다.

[https://jdk7.dev.java.net/](https://jdk7.dev.java.net/)

메모리 512MB 인 불쌍한 xrath.com 섭의 java process 8개도 다함께 업.

```
rath      7126 23924  0 02:26 pts/3    00:00:00 java -server -jar rath-search-daemon.jar
rath      7165  7162  0 02:27 pts/4    00:00:00 java -Xms128m -Xmx256m -Dsun.io.useCanonCaches=false -Dapplication.home=/opt/flex2/bin/.. -jar /opt/flex2/bin/../lib/fcsh.jar
rath      7190 24010  0 02:27 pts/5    00:00:03 java -jar TajaBot.jar
root      7221  7217  2 02:28 pts/1    00:00:30 /opt/java/bin/java -server -Djava.ext.dirs=/opt/james/lib -Djava.security.manager -Djava.ext.dirs=/opt/james/lib -Djava.security.manager -Djava.security.policy=jar:file:/opt/james/bin/phoenix-loader.jar!/META-INF/java.policy -Dphoenix.home=/opt/james -Djava.io.tmpdir=/opt/james/temp -jar /opt/james/bin/phoenix-loader.jar
rath      7264 13826  0 02:28 pts/10   00:00:00 java -server -jar me2photo-server.jar
rath      7284  7283  0 02:28 pts/6    00:00:00 java -jar mo-service.jar
rath      8147     1  3 02:50 pts/0    00:00:05 /opt/jdk1.7.0/bin/java -Djava.util.logging.manager=com.caucho.log.LogManagerImpl -Djava.system.class.loader=com.caucho.loader.SystemClassLoader -Djava.awt.headless=true -Dresin.home=/home/rath/resin/ -Dcom.sun.management.jmxremote com.caucho.boot.ResinWatchdogManager start
rath      8182  8147 21 02:50 pts/0    00:00:27 /opt/jdk1.7.0/bin/java -Djava.util.logging.manager=com.caucho.log.LogManagerImpl -Djava.system.class.loader=com.caucho.loader.SystemClassLoader -Djava.awt.headless=true -Dresin.home=/home/rath/resin/ -server -Xmx256m -Xss1m -Xdebug -Dcom.sun.management.jmxremote com.caucho.server.resin.Resin -socketwait 54462 start
```

아 개운하고 좋다.
Hotspot Server VM이나 구경하려고 -server 쳤다가 발견한 Tiered VM

```
[rath@ns bin]$ java -server -version
java version "1.7.0-ea"
Java(TM) SE Runtime Environment (build 1.7.0-ea-b16)
Java HotSpot(TM) **Tiered VM** (build 1.7.0-ea-b16, mixed mode)
```

[OpenJDK](http://openjdk.java.net/) 빌드도 해보고 싶은데..

교체 기념으로 [한글 CAPTCHA ](/2006/12/코멘트-쓰기의-captcha를-한글로-재구현하다)도 다시 살렸다. ;)
