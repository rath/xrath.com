---
title: "오랜만에 JMSN을 만지작"
date: Fri Dec 03 2004 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2004/12/오랜만에-jmsn을-만지작
lang: ko
tags: ["bug-tracking", "application-development", "software-maintenance"]
---

JMSN을 만들어낸지도 어언 2년 8개월이 지났습니다.
그동안 정말 불성실한 Application 개발자로 -_- 지냈습니다.
혹 JMSN을 사용하며 '도움 -> 버그신고하기' 메뉴를 사용해 보신적이 있나요?

그렇습니다. 만들어놓고, 초반에만 "아 기능이 잘 돌아가는군 좋았어!" 라고 생각한 뒤, 한번도 버그 목록을 확인한적이 없습니다.

지난 2004년 7월 제 서버 /home 에 마운트된 hdd가 날라간 후, 더이상 bug와 feature request를 submit 받는 jsp가 없어져서 4-5개월간 버그와 기능추가 목록을 받지 못했지만, 간만에 버그목록을 확인했습니다. 

**298**개의 버그가 그동안 보고되었습니다. 
2002년 3월부터 2004년 7월까지의 합산입니다. 
물론 각 보고자분들은 보고된 버그들의 목록을 확인할 수 없게 해두었기 때문에 중복된 버그들도 있었고, 제 필요에 의해 시간에 흐름에 따라 자동수정된 버그들도 있었습니다.

아무튼 중복된 것을 체크하고 간추린 결과 (아직 존재하거나 알 수 없는 버그) 현재 **46**개의 버그가 남아있습니다.
주 OS는 Linux, MacOSX, FreeBSD, Windows, OS/2 순서였고, MSNP9 이후에 ssl 라이브러리가 없는 jdk1.3으로 접속이 안된다는 버그들은 모두 지웠습니다. 
(그당시 sourceforge에 공지하였으므로)

이 버그들을 고치고, MSNP10을 어느정도 지원해서 공개사진도 원활히 하고, 파일 송수신도 MSNSLP로 바꾸게하고 싶네요. 
BUGFIX가 제 1번 TODO! (이지만 일단 생업을 좀 해결하고..)
