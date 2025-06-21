---
title: "Eclipse SWT & JFace API 문서 합본"
date: Tue May 12 2009 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2009/05/eclipse-swt-jface-api-documents
lang: ko
tags: ["technology", "java", "swt", "jface"]
---

몇해전 어느날, [jmsn-swt](http://jmsn.cvs.sourceforge.net/viewvc/jmsn/jmsn-swt/)를 만진 이후로 나로부터 버림받은 SWT.. 


프리랜서 프로젝트 하나를 진행중이라 swing질을 하고 있는데, 이녀석은 어떻게 된일인지 아직도 Generic 지원할 생각이 없다.  그나마 하나 찾은게 JTree 클래스에 있는 [Enumeration<TreePath> getExpandedDescendants( TreePath )](/javase/ko/6/docs/ko/api/javax/swing/JTree.html#getExpandedDescendants(javax.swing.tree.TreePath)) 뿐이다. DefaultMutableTreeNode의 set/getUserObject 정도는 제네릭 지원해줘도 되는거 아닌가. 

그렇게  투덜거리다 [미투데이에 투덜거리는 글](http://me2day.net/rath/2009/05/07#11:13:15)을 올렸고, 친구들이 SWT/JFace로 넘어오라는 댓글들에 힘입어,

**The Definitive Guide to SWT and JFace**

를 질렀습니다! (하지만 정작 SWT/JFace 에도 Generic 지원은 없음; )

 

그런데 SWT 랑 JFace API 문서만 보려니 어딨는지 모르겠어서..

```
cvs -d :pserver:anonymous@dev.eclipse.org/cvsroot/eclipse co org.eclipse.jface 
cvs -d :pserver:anonymous@dev.eclipse.org/cvsroot/eclipse co org.eclipse.swt 
vim build.xml, ... <javadoc ... excludepackagenames="org.eclipse.swt.internal.*" ... >
```

한 곳으로 묶어봤습니다.

 

이에 [공유](/devdoc/swt-jface/index.html)합니다.

다운로드는 [여기(4.8M)](/devdoc/swt-jface-javadoc-20090513.jar)서.

## Comments

### rath
*http://xrath.com/*
*2009-05-12T19:37:29.000Z*

기념으로 jmsn-swt을 다시 손보고 있습니다. 호호.

---

### 김성안
*http://www.pragmatic.kr*
*2009-05-13T00:08:53.000Z*

꼬시면서 Generic 지원 없다고 말 안해줘서 뜨끔하네요;

---

### 김성안
*http://www.pragmatic.kr*
*2009-05-13T00:11:43.000Z*

관련 JavaDoc은 플러그인 개발 버전 다운로드 받으시면 eclipse\plugins 폴더에 org.eclipse.platform.doc.isv_3.5.0.v20090311-0800.jar와 비슷한 이름의 문서 플러그인이 있어요.

그거 압축 푸시면 reference\api 폴더안에 SWT/JFace부터 eclipse 프레임웍 API 문서까지 다 들어있습니다.

---

### rath
*http://xrath.com/*
*2009-05-13T01:52:31.000Z*

오랜만에 jmsn-swt 컴파일을 해보니 extends Tree 안되게 바뀌었다. final class로 선언하시덩가!

---

### rath
*http://xrath.com/*
*2009-05-13T01:59:12.000Z*


> 김성안 :
>
> 관련 JavaDoc은 플러그인 개발 버전 다운로드 받으시면 eclipse\plugins 폴더에 org.eclipse.platform.doc.isv_3.5.0.v20090311-0800.jar와 비슷한 이름의 문서 플러그인이 있어요.
>
> 그거 압축 푸시면 reference\api 폴더안에 SWT/JFace부터 eclipse 프레임웍 API 문서까지 다 들어있습니다.

풀 통합본이네요. SWT/JFace만 따로 있는 것이 필요했습니다. ㅎㅎ

---

### rath
*http://xrath.com/*
*2009-05-13T02:42:12.000Z*


> 김성안 :
>
> 꼬시면서 Generic 지원 없다고 말 안해줘서 뜨끔하네요;

헤헤; 덕분에 SWT and JFace 책 재미나게 보고 있습니다. 무엇보다 osx에서 실행속도가 너무 맘에 드네요!

---
