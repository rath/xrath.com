---
title: "Projects 메뉴 오픈!"
date: 2005-01-11
slug: 2005/01/projects-메뉴-오픈
lang: ko
---

1월 3일부터 어딘가에 출퇴근을 하고 있습니다. 계약당시 서로간의 합의하에 출퇴근 시간은 유연하게 했지만, 근 2년만에 '어딘가로' 출퇴근 하는 거라.. 왠만하면 아침에 출근을 하고 있습니다.

제가 프로그래밍 바닥에서 제일 싫어하는 웹-_-하는 회사인데, 회사의 주력은 3D 그래픽 쪽이라 나름대로 재미있게 작업하고 있습니다. 이것을 기회로.. 다시 웹 바닥에 진출할 생각입니다 -_-v
요새는 웹쪽에도 넣을만한 재미있는 기술도 많고 부가가치가 높은 분야도 많기 때문에, 뛰어들어볼만 한 듯해서요 이히히

이제 jdk 1.5 한글 API Document 다운로드 서블릿을 만들어야겠습니다...

(3시간이 지났다)

프로젝트 메뉴를 열었습니다. 파일 다운로드와 다운로드 카운트를 하는 서블릿밖에 없지만, 메뉴를 하나 오픈했다는 크나큰 의미가!

mod_jk 에서 /x/* 를 핸들하도록 하고 servlet container에서는 uri-mapping을 /x/* 로 하여 rath.servlet.XZone 이란 서블릿으로 모두 요청을 받도록 합니다. /x/ 밑에서는 URI에 무슨 개짓-_-을 해도 다 XZone 이 받으니 뭔가 X 스럽고.. 호호 -_-
XZone 에서는 QueryString을 검사하여 'download' 이면 특정 폴더로부터 해당 파일을 찾아 보내주고 'count' 이면 다운로드 한 수를 text/plain 으로 반환하도록 만들었습니다. http://xrath.com/x/melong.zip?download 라고 요청했을 경우
실제로 melong.zip 이란 파일은 DocumentRoot 쪽에 없지만, 브라우저 입장에서는 DocumentRoot 서브에 있는 파일을 직접 요청한 것과 URL 인터페이스가 동일하기 때문에, application/octet-stream; filename= 등의 뻘짓을 하지 않아서 좋습니다. 그러면서 DB에 로깅도 다 하고.. 얼쑤

?download, ?count 는 제가 요새 하도 웹을 안해서.. 요새는 어떻게들 하나.. 하고 sourceforge.net 에 놀러갔더니 ?download 방식을 사용하길래.. 잽싸게 그것을 꿀꺽 -ㅠ-

그리고 jsp compiler로 이제 internal이 아닌 jikes로 교체! (서버가 절라 구려서 체감속도가 엄청남)