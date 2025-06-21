---
title: "놀고 있다가 J2SE 1.5.0 Update 8 나온거 이제 알았네~"
date: Thu Aug 10 2006 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2006/08/놀고-있다가-j2se-150-update-8-나온거-이제-알았네
lang: ko
tags: ["java", "software-update", "programming"]
---

놀고 있다가 J2SE 1.5.0 Update 8 나온거 이제 알았네~
언제 나왔니

[http://java.sun.com/j2se/1.5.0/ReleaseNotes.html](http://java.sun.com/j2se/1.5.0/ReleaseNotes.html)

고쳐진 버그들 중 몇개만~

```
6348207  java  classes_io  File.length() reports a length of 0 for special files hiberfil.sys and pagefile.sys (win)  
5074577  hotspot  compiler2  Bad performance when HotSpot cannot optimize polymorphic calls  
```

Vista에서도 테스트 많이 하나보다~
```
6400685  java  classes_2d  Font2DTest.jar is failing for Arabic-Majalla UI on Windows-Vista  
6319603  java  classes_swing  Win L&F: WindowsFileChooserUI broken on Windows Vista Beta 1  
6213540  java  classes_swing  Win L&F: WindowsFileChooserUI Does Not Support Windows 2003, Windows Vista  
6399303  java  classes_awt  Non-Focusble window steals focus from other applications.  
4368790  java  classes_swing  JButton stays pressed when focus stolen 
5098176  java  imageio  Some PNGs fail to load with ImageIO  
```

느린것도 잘못이 되는..
```
6364346  java  classes_util_jarzip  GZIPOutputStream is slower on 1.4.2_11-b02 than on 1.4.2_09  
5105922  java  build  Linux build does not optimize AWT and other essential libraries  
```

하아아암~
