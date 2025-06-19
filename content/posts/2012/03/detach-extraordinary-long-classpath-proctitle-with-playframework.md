---
title: "Play! 프로세스 제목이 너무 길어서"
date: 2012-03-10
slug: 2012/03/detach-extraordinary-long-classpath-proctitle-with-playframework
lang: ko
---

[Play! framework](http://www.playframework.org/)에 한가지 불만이 있다면 $ ps -ef | grep play.server 의 결과가 너무 길다는 것이다. 내 개발환경에서는 4KB가 넘는다.


```bash
$ ps -ef | grep play.server
501 35419 35418 0 9:13pm ttys001 0:01.93 /Library/Java/Home/bin/java -javaagent:/Users/rath/work/dist/play-1.2.4/framework/play-1.2.4.jar -XX:-UseSplitVerifier -Dfile.encoding=utf-8 -Xdebug -Xrunjdwp:transport=dt_socket,address=8000,server=y,suspend=n -Dplay.debug=yes -classpath /Users/rath/work/goethe-play/conf:/Users/rath/work/dist/play-1.2.4/framework/play-1.2.4.jar:/Users/rath/work/goethe-play/lib/jakarta-regexp-1.4.jar:/Users/rath/work/goethe-play/lib/lucene-analyzers-3.5.0.jar:/Users/rath/work/goethe-play/lib/lucene-core-3.5.0.jar:/Users/rath/work/goethe-play/lib/lucene-queries-3.5.0.jar:/Users/rath/work/goethe-play/lib/rath-adrenaline-0.8.5.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/activation-1.1.1.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/antlr-2.7.6.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/asm-all-3.3.1.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/async-http-client-1.6.5.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/bcprov-jdk15-1.45.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/c3p0-0.9.1.2.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/cglib-nodep-2.2.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/commons-beanutils-1.8.3.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/commons-codec-1.4.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/commons-collections-3.2.1.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/commons-email-1.2.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/commons-fileupload-1.2.2.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/commons-io-2.0.1.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/commons-javaflow-1066591.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/commons-lang-2.6.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/commons-logging-1.1.1.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/dom4j-1.6.1.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/ehcache-core-2.0.0.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/ezmorph-1.0.3.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/geronimo-servlet_2.5_spec-1.2.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/groovy-all-1.7.10.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/gson-1.7.1.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/h2-1.3.149.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/hibernate-commons-annotations-3.2.0.Final.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/hibernate-core-3.6.1.Final.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/hibernate-entitymanager-3.6.0.Final.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/hibernate-jpa-2.0-api-1.0.0.Final.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/ivy-2.2.0.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/jamon-2.7.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/javassist-3.9.0.GA.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/javax.inject-1.0.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/jaxen-1.1.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/jj-imaging.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/jj-simplecaptcha.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/jj-textile.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/jj-wikitext.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/joda-time-2.0.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/jregex-1.2_01.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/jsr107cache-1.0.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/jta-1.1.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/junit-4.8.1.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/log4j-1.2.16.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/mail-1.4.3.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/memcached-2.6.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/mysql-connector-java-5.1.13.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/netty-3.2.5.Final.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/org.eclipse.jdt.core-3.8.0.v_C03.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/oval-1.50.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/postgresql-9.0.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/signpost-core-1.2.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/slf4j-api-1.6.1.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/slf4j-log4j12-1.6.1.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/snakeyaml-1.7.jar:/Users/rath/work/dist/play-1.2.4/framework/lib/xstream-1.3.jar -Dapplication.path=/Users/rath/work/goethe-play -Dplay.id= play.server.Server
```


프레임워크에서 제공하는 각 모듈들이 절대경로로 들어가 있어서 서버에서 돌고 있는 java 프로세스들을 확인하기 위해 ps -ef | grep java 만 하더라도 짜증이 솟구치게 된다.

그래서 Python으로 작성된 구동 스크립트에서 classpath를 환경변수로 떼버리도록 살짝 고쳤다.

$PLAY/framework/pym/play/utils.py 파일에 추가 


```python
def detach_classpath(cmd):
  i = cmd.index('-classpath')
  classpath = cmd[i+1]
  del cmd[i+1]
  del cmd[i]
  env = os.environ
  env['CLASSPATH'] = classpath
  return cmd
```



이제 $PLAY/framework/pym 에서 


```bash
$ grep -rn "subprocess.Popen" play/commands
./play/commands/base.py:139:        process = subprocess.Popen(java_cmd, env=os.environ)
./play/commands/base.py:214:        play_process = subprocess.Popen(java_cmd, env=os.environ, stdout=sout)
./play/commands/daemon.py:47:        pid = subprocess.Popen(app.java_cmd(args), stdout=sout, env=os.environ).pid
./play/commands/daemon.py:90:        pid = subprocess.Popen(java_cmd, stdout=sout, env=os.environ).pid
```


로 검색하여 각 Popen 첫번째 인자를 아래와 같이 detach_classpath로 묶어준다. 



```python
subprocess.Popen(detach_classpath(app.java_cmd(args)), stdout=sout, env=os.environ).pid
```



detach_classpath 함수의 목표는 java_cmd 리스트에서 -classpath 다음 요소를 찾아 os.environ['CLASSPATH']에 넣고 원래 list에서는 이를 지워버리는 것이다. os.environ을 런타임에 조작하는 애드혹 패치를 저지르긴 했지만 child process에게 넘겨질 os.environ을 수정하는 것이므로 별다른 문제는 없다.

## Comments

### Jang-Ho Hwang
*http://xrath.com/*
*2012-03-11T00:11:01.000Z*

손으로 고치기 귀찮으신 분들은 cd $PLAY_HOME 후 
$ curl http://xrath.com/files/detach-classpath-into-env.patch | patch -p1
하셔도 됩니다.

---

