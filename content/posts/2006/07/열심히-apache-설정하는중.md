---
title: "열심히 Apache 설정하는중"
date: Mon Jul 03 2006 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2006/07/열심히-apache-설정하는중
lang: ko
tags: ["web-server", "apache", "security", "web-configuration"]
---

블로그를 개장한게 겨우 2일밖에 안되었는데,
어제 붙인 카운터가 400을 넘는 기이한 현상을 발견했습니다.

카운팅도 Browser shutdown 시 사라지는 쿠키를 사용했기 땜에 마구 새로고침해서 올라갈 수 있는 것도 아닌데...

그렇습니다. 400을 넘을리가 없습니다. 온 사람들 다 합쳐야 손에 꼽을 수 있을겁니다 -_- 아파치 로그를 보니 예전 xrath.com 때부터 계속 제 사이트에 광고들을 날리던 녀석들이었습니다.

얌얌 오랜만에 아파치 설정을 공부하고 재미있는 시간을 보냈습니다.


```
<VirtualHost *:80>
    DocumentRoot /home/rath/html
    ServerName xrath.com
    ServerAlias www.xrath.com rath.xrath.com

    SetEnvIf Remote_Addr 66.230.130.94 fuck_robot
    SetEnvIf Remote_Addr 217.235.116.43 fuck_robot
    <Directory />
        Deny from env=fuck_robot
    </Directory>
    CustomLog logs/xrath.com.access_log combined env=!fuck_robot
    ErrorLog logs/xrath.com.error_log
    ResinConfigServer localhost 6802
</VirtualHost>
```



제 사이트 설정 부분이 점점 커질 것 같은 예감이 드네요.
Referer도 거르고 요리조리 다 걸러야겠습니다. 평온한 사이트에 하루 방문자수 400이 왠말이냐 -_-

## Comments

### 서문교
*http://pmy.lv*
*2006-07-04T05:03:56.000Z*

귀염둥이 황장호군!!!

---

### 이성수
*2006-07-04T14:10:49.000Z*

안녕하세요? 몇일전에는 페이지가 닫혔던것 다시 열렸네요.
깔끔하고 좋네요. 멋진 블로그 되세요~

---

### rath
*2006-07-04T15:30:02.000Z*

사실 거의 반년정도 닫혀있었다가 7월 2일에 재개장했어요. 성수씨 진짜 오랜만~! :D

---
