---
title: "JMSN with SWT 0.1"
date: Sun Aug 01 2004 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2004/08/jmsn-with-swt-01
lang: ko
tags: ["jmsn", "swt", "java", "desktop-application"]
---

[SWT](http://www.eclipse.org/swt/) 라이브러리를 사용하는 JMSN 버젼을 개발중입니다. 초기 버젼이라 기능도 매우 미약한데다가 Win32 용으로만 패키징 된 상태입니다.

[이곳](/dist/jmsn-swt-win32-0.1.zip)에서 다운로드 받아 확인할 수 있습니다.

그저 압축을 풀고 jmsn-swt.jar 파일을 클릭하거나 *java -jar jmsn-swt.jar*를 커맨드창에서 입력하셔도 됩니다.

## Comments

### akira74
*2004-10-26T00:03:15.000Z*

JDK1.5 로 컴파일 하셨습니까?

이런 에러가 나오는 군요. 

 JDK1.4 로 컴파일 되었있는 버전은 없는지요?

```
Exception in thread "main" java.lang.UnsupportedClassVersionError: rath/jmsn/SWTMain (Unsupported major.minor version 49.0)
        at java.lang.ClassLoader.defineClass0(Native Method)
        at java.lang.ClassLoader.defineClass(ClassLoader.java:539)
        at java.security.SecureClassLoader.defineClass(SecureClassLoader.java:123)
        at java.net.URLClassLoader.defineClass(URLClassLoader.java:251)
        at java.net.URLClassLoader.access$100(URLClassLoader.java:55)
        at java.net.URLClassLoader$1.run(URLClassLoader.java:194)
        at java.security.AccessController.doPrivileged(Native Method)
        at java.net.URLClassLoader.findClass(URLClassLoader.java:187)
        at java.lang.ClassLoader.loadClass(ClassLoader.java:289)
        at sun.misc.Launcher$AppClassLoader.loadClass(Launcher.java:274)
        at java.lang.ClassLoader.loadClass(ClassLoader.java:235)
        at java.lang.ClassLoader.loadClassInternal(ClassLoader.java:302)
```

---

### 음
*2005-03-04T18:24:43.000Z*

전 이렇게 나오는데 어떻게 해야하는거죠

$ java -jar jmsn.jar

libgcj-java-placeholder.sh

```
This script is a placeholder for the /usr/bin/java
master link required by jpackage.org conventions.  libgcj's
rmiregistry, rmic and jar tools are now slave symlinks to these
masters, and are managed by the alternatives(8) system.
This change was necessary because the rmiregistry, rmic and jar tools
installed by previous versions of libgcj conflicted with symlinks
installed by jpackage.org JVM packages.

Exception in thread "main" java.lang.NoClassDefFoundError: while resolving class: rath.jmsn.Main
   at java.lang.VMClassLoader.resolveClass(java.lang.Class) (/usr/lib/libgcj.so.5.0.0)
   at java.lang.Class.initializeClass() (/usr/lib/libgcj.so.5.0.0)
   at java.lang.Class.forName(java.lang.String, boolean, java.lang.ClassLoader) (/usr/lib/libgcj.so.5.0.0)
   at java.lang.Class.forName(java.lang.String) (/usr/lib/libgcj.so.5.0.0)
   at gnu.gcj.runtime.FirstThread.run() (/usr/lib/libgcj.so.5.0.0)
   at _Jv_ThreadRun(java.lang.Thread) (/usr/lib/libgcj.so.5.0.0)
   at _Jv_RunMain(java.lang.Class, byte const, int, byte const, boolean) (/usr/lib/libgcj.so.5.0.0)
   at __libc_start_main (/lib/tls/libc-2.3.3.so)

Caused by: java.lang.ClassNotFoundException: rath.msnm.Debug not found in [file:jmsn.jar, core:/]
   at java.net.URLClassLoader.findClass(java.lang.String) (/usr/lib/libgcj.so.5.0.0)
   at gnu.gcj.runtime.VMClassLoader.findClass(java.lang.String) (/usr/lib/libgcj.so.5.0.0)
   at java.lang.ClassLoader.loadClass(java.lang.String, boolean) (/usr/lib/libgcj.so.5.0.0)
   at _Jv_FindClass(_Jv_Utf8Const, java.lang.ClassLoader) (/usr/lib/libgcj.so.5.0.0)
   at _Jv_PrepareCompiledClass(java.lang.Class) (/usr/lib/libgcj.so.5.0.0)
   at _Jv_WaitForState(java.lang.Class, int) (/usr/lib/libgcj.so.5.0.0)
   at java.lang.VMClassLoader.linkClass0(java.lang.Class) (/usr/lib/libgcj.so.5.0.0)
   at java.lang.VMClassLoader.resolveClass(java.lang.Class) (/usr/lib/libgcj.so.5.0.0)
   ...7 more
```
---
