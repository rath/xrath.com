---
title: "생업에 치이느라 Java 7의 NIO.2에 관심없던 분들을 위한"
date: Fri Mar 02 2012 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2012/03/for-those-who-are-too-busy-to-look-around-whats-new-in-java7-nio2
lang: ko
tags: ["java", "nio", "java7", "file-io"]
---

Java 7 에 java.nio.file 패키지가 들어왔다.

java.io.File은 OS 에서 제공하는 다양한 파일시스템 특성들을 대부분 무시했기 때문에 쉘스크립트에서 $ cp src /path/to/dest 면 끝날 것을 꽤나 긴 코드를 쓰거나 [commons-io FileUtils.copyFile](http://commons.apache.org/io/api-release/org/apache/commons/io/FileUtils.html#copyFile%28java.io.File,%20java.io.File%29) 따위를 써야했었는데 이제는 java.nio.file.Files.[copy](http://docs.oracle.com/javase/7/docs/api/java/nio/file/Files.html#copy(java.nio.file.Path, java.nio.file.Path, java.nio.file.CopyOption...))(Path src, Path dest, CopyOption option)으로 작업을 마칠 수 있다. java.nio.file.Files.[move](http://docs.oracle.com/javase/7/docs/api/java/nio/file/Files.html#move(java.nio.file.Path, java.nio.file.Path, java.nio.file.CopyOption...))의 CopyOption은 자바답지 않게 무려 ATOMIC_MOVE를 지원하는데 이는 Windows OS인 경우 [MoveFileEx](http://msdn.microsoft.com/en-us/library/windows/desktop/aa365240(v=vs.85).aspx) 콜이고, Linux/Solaris의 경우 [rename(2)](http://www.kernel.org/doc/man-pages/online/pages/man2/rename.2.html) 콜이라, 동일 파티션 내의 큰 파일을 옮기더라도 광속이다.

Python의 open('.vimrc').readlines() 과 동일한 작업을 하는 Files.[readAllLines](http://docs.oracle.com/javase/7/docs/api/java/nio/file/Files.html#readAllLines(java.nio.file.Path, java.nio.charset.Charset))(Path, Charset) 도 반겨줄만하다.

이전에는 특정 디렉토리 밑의 모든 파일들에 대한 처리를 하기 위해 재귀호출을 하는 수고를 피할 수 없었는데 Files.[walkFileTree](http://docs.oracle.com/javase/7/docs/api/java/nio/file/Files.html#walkFileTree(java.nio.file.Path, java.nio.file.FileVisitor))(Path, FileVisitor<T>)를 통해 아래와 같이 간단히 처리할 수 있다.



```java
import java.nio.file.*;
import java.nio.file.attribute.*;
...
    FileSystem fs = FileSystems.getDefault();
    Files.walkFileTree(fs.getPath("./rust-0.1/"), new SimpleFileVisitor() {
        public FileVisitResult visitFile(Path file, BasicFileAttributes attrs)
            throws IOException {
            System.out.println(file);
            return FileVisitResult.CONTINUE;
        }
    });
```


마지막으로 언급하지 않을 수 없는 [WatchService](http://docs.oracle.com/javase/7/docs/api/java/nio/file/WatchService.html) ! 파일시스템 이벤트들을 받을 수 있다. 예를들어 특정 디렉토리 속에 임의의 파일이 생기고 지워지는 등의 각종 이벤트들 말이다. 리눅스의 경우 [inotify_add_watch(2) ](http://linux.die.net/man/2/inotify_add_watch)와 [poll(2) ](http://linux.die.net/man/2/poll)콜이고, 솔라리스는 <port.h> 속의 각종 port_create, port_associate, port_send 등이며, 윈도우즈는 kernel32.dll의 [ReadDirectoryChanges](http://msdn.microsoft.com/en-us/library/windows/desktop/aa365465(v=vs.85).aspx) 콜이다. WatchService를 잘 활용한다면 개발환경 품질 향상을 꾀할 수 있다. 상상은 각자 알아서.

NIO.2 소개는 여기까지다.

## Comments

### jude
*2012-03-03T01:06:03.000Z*

ㅎㅎ 잘봤습니다.

---

### 한석균
*http://www.facebook.com/seokkyun.han*
*2012-11-21T05:53:51.000Z*

간만에 글남기네요..잘봤습니다. ^^

---
