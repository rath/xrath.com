---
title: "스프링노트 Java API"
date: Sat May 05 2007 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2007/05/스프링노트-java-api
lang: ko
tags: ["technology", "java", "api", "springnote"]
---

개인 위키이자, 온라인 메모장으로 최근 선풍적(?)인 인기를 끌고 있는 스프링노트를 이용한 응용 어플리케이션을 만들기 위한 **스프링노트 Java API** 를 완성했습니다.

2주전 정도에 스프링노트 Java API를 만들어 [스프링노트 커뮤니티 게시판](http://www.springnote.com/post/2061)에 포스트 했었습니다.
하지만 그때는 첨부파일 업/다운로드 및 삭제 기능이 없었고, 이번에는 첨부파일을 핸들링하는 부분까지 넣었습니다. 

 [View SpringNote API Documents](/devdoc/springnote/)  [Download SpringNote API Jar](/files/springnote-api.jar)  (18.7KB) 
스프링노트 Java API를 가지고 스프링노트 관련 매쉬업을 개발하려면 Application-Key/Id를 받아야 하는데 어려운 절차가 없이 [개발자 커뮤니티에 등록](http://www.springnote.com/ko/dev_register_apikey/)만 하면 됩니다. :$

자세한 사용법이나 예제코드는 [여기](http://www.springnote.com/post/2388)를 참조하시고, 
궁금한 점이나 Test.java 같은 코드가 필요하면 이 글에 댓글로 담아주시기 바랍니다.

  페이지 만들기 (CREATE)페이지 읽기 (RETRIVE)페이지 변경 (UPDATE)페이지 삭제 (DELETE)첨부파일 추가첨부파일 삭제첨부파일 읽기

첨부파일 관련 메서드 목록SpringNote.**addAttachment**( Attachment at, File file )SpringNote.**addAttachment**( Attachment at, InputStream in )SpringNote.**removeAttachment**( Attachment at )SpringNote.**getAttachments**( PageMeta pm )SpringNote.**getAttachments**( int pageId )SpringNote.**downloadAttachment**( Attachment at, File file )SpringNote.**downloadAttachment**( Attachment at, OutputStream out )  

첨부파일 관련 클래스 목록rath.toys.springnote.**Attachment**
rath.toys.springnote.**event.ProgressEvent**rath.toys.springnote.**event.ProgressListener**  

자세한 설명은 API Documents 에 포함되어 있으며, ProgressEvent 는 용량이 큰 파일을 업로드/다운로드 하는 과정을 표시하는 프로그램을 만들 때 유용하게 사용하실 수 있습니다.

```java
import rath.toys.springnote.*;
import rath.toys.springnote.event.*;

SpringNote sn = new SpringNote();
sn.setOpenID( new URL("[http://rath.myid.net")](http://rath.myid.net) );
sn.setUsername( "rath" ); // 노트이름
sn.setUserKey("a8........................f808");
sn.setApplicationId("xx");
sn.setApplicationKey("34d6............e234");

Page createdPage = sn.**addPage**("스프링노트 자료실", "<p>여기는 자료실 입니다</p>");
sn.**updatePage**(createdPage.getId(), "<p>자료실 입니다</p>"); // 페이지 내용 변경

File f = new File("baseball.avi");
Attachment at = new **Attachment**();
at.**setPageId**( createdPage.getId() ); // 어느 페이지에 첨부할 것인지 꼭 알려주어야 함.

at.setTitle( f.getName() );
at.setFileSize( f.length() );
at.**addProgressListener**( new ProgressListener() { // 16KB 전송될때마다 이벤트 수신. 관심없을 경우 Listener를 부착할 필요 없음. 

  public void transferProgress( ProgressEvent e ) {
    System.out.println( String.format("* Progress: %9d/%9d",
      e.getTransferredBytes(), e.getTotalBytes()) ); // 16KB 마다 얼만큼 받았는지 STDOUT에 출력

  }
});
sn.**addAttachment**( at, f ); // 파일 업로드
sn.**downloadAttachment**( at, new File("baseball-test.avi") ); // 파일 다운로드
sn.**removeAttachment**( at ); // 파일 삭제
sn.**removePage**(createdPage.getId());  // 페이지 삭제
```
