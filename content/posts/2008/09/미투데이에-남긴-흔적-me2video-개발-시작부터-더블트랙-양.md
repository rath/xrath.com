---
title: "미투데이에 남긴 흔적 - me2video 개발 시작부터 더블트랙 양도까지"
date: Tue Sep 09 2008 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2008/09/미투데이에-남긴-흔적-me2video-개발-시작부터-더블트랙-양
lang: ko
tags: ["video-development", "mms", "java", "software-development"]
---

토큰을 두둑히 챙기게 해준 me2video. 여러모로 좋은 경험이었습니다. :$

    
* 'MMS용 동영상' 찍는 게 있는 줄도 모르고 계속 EVRC 디코더 찾다가 찾을 필요가 없음을 깨닫고 me2video 만드는 중. 뚝딱뚝딱(me2video devel thanks_to_elle_and_kkung)[2008-06-30 01:03:22](http://me2day.net/rath/2008/06/30#01:03:22)

* me2video single-user 완성! 6시간만에 만들 수 있었던 것은 ffmpeg, gdata-java-client, me2api-java, JavaMail (그리고 elle) 덕분.(me2video alpha release special_thanks_to elle 고기사준 kkung)[2008-06-30 04:38:49](http://me2day.net/rath/2008/06/30#04:38:49)

* me2video 완성! me2video.xrath.com 에서 계정 연동 후 폰카로 찍은 동영상을 vpost@xrath.com로 보내면, YouTube 동영상과 함께 미투데이에 글을 올릴 수 있습니다! (본인 YouTube 계정과 연동 가능, 아직 SKT 전용)(me2video skt release youtube mms 웹기반쉬운인증은오후쯤오픈)[2008-06-30 10:14:36](http://me2day.net/rath/2008/06/30#10:14:36)

* me2video 가 웹기반 쉬운 인증과 함께 '사용자키 복사' 없이 등록하기 편해졌습니다. 클릭후, '수락' 버튼 누른 후 휴대폰 번호만 입력하면 끝!(me2video notice)[2008-06-30 11:40:59](http://me2day.net/rath/2008/06/30#11:40:59)

* KTF에서 동영상 mms로 쏘면 audio format이 sqcp 네요. 바로 ffmpeg으로는 못하겠고 디코더 따로 거쳐서 먹싱해야됩니다. 회사업무가 많으니 일단 audio 없이(MUTE)라도 me2video 쓸 수 있게 할까요?(me2video survey 근데왜multipart의bodypart에multipart를또넣고지랄이냐이녀석들은)[2008-06-30 14:02:16](http://me2day.net/rath/2008/06/30#14:02:16)

* KTF me2video 음소거 모드로 임시 업데이트 해놨습니다. 샘플 보내준 topRay 감사! KTF 사용자들도 me2video 써보세요~(me2video ktf mute)[2008-06-30 14:59:55](http://me2day.net/rath/2008/06/30#14:59:55)

* 2시 회의를 앞두고 잠시 me2video 업글 중. KTF audio 코덱 거의 다 붙였고, LGT mms 샘플 떠다 분석 시작. LGT 샘플 떠주신 똥파리님 감사! (me2video shortterm-burning)[2008-07-01 13:22:07](http://me2day.net/rath/2008/07/01#13:22:07)

* me2video 에 공용 동영상을 내 youtube 계정으로 하다보니 내 facebook minifeed에 동영상이 넘 많이 올라간다 -.-(me2video facebook youtube issue)[2008-07-01 17:53:19](http://me2day.net/rath/2008/07/01#17:53:19)

* [me2video] 사내 어떤 분. me2video KTF 업로드 테스트(me2video youtube)[2008-07-02 04:04:19](http://me2day.net/rath/2008/07/02#04:04:19)

* 이로써 me2video는 국내 이통 3사(SKT/KTF/LGT)를 모두 지원합니다. me2video.xrath.com 에서 미투 연동 후 폰카로 촬영한 동영상을 mms를 통해 vpost@xrath.com로 전송하세요~!(me2video skt ktf lgt release)[2008-07-02 04:18:15](http://me2day.net/rath/2008/07/02#04:18:15)

* me2video 이용률이 적어 동영상 mms 요금을 조사해봤습니다. SKT의 경우 MMS 동영상 용량이나 첨부파일 개수에 상관없이 건당 100원입니다. tworld 에서 어제요금 계산해보니 mms 2건 200원이라고 찍혀있네요. (me2video notice 요금 별도 요금제따위필요없음 ktf_lgt는 아직 모름)[2008-07-02 14:51:46](http://me2day.net/rath/2008/07/02#14:51:46)

* me2video KTF 동영상 메일의 경우 무지 비싸네요. 동영상 5초미만 300원, 10초미만 700원, 11초이상 1,200원 입니다. 별도 요금제가 있는건지.. (me2video notice ktf 비싸다)[2008-07-02 15:02:33](http://me2day.net/rath/2008/07/02#15:02:33)

* [me2video] 삼성플라자에서 장 보는중. 오늘은 특별히 과자도 산다.(me2video youtube 식미투)[2008-07-03 19:48:43](http://me2day.net/rath/2008/07/03#19:48:43)

* [me2video] 지금 열차가 들어오고 있습니다. 빰빰 삼성역 가는중.(me2video youtube)[2008-07-06 20:17:54](http://me2day.net/rath/2008/07/06#20:17:54)

* YosHi님 덕분에 me2video가 amr audio 를 지원하게 되었습니다. 보너스로 전송완료 및 포스팅완료 시점에 sms로 me2video 업로드 현황을 알려줍니다. 성공하면 총 2건의 sms를 받게 되요. 토큰 안다는거니까 걱정마시구요 ㅎㅎ(me2video amr bonus update)[2008-07-07 09:29:31](http://me2day.net/rath/2008/07/07#09:29:31)

* ias 횽아가 me2day for i그 결과 토큰마 Phone 구동 화면 보여줬다. 세상에 ㄱ- me2video 로 올린 동영상도 클릭 한방에 바로 재생되더라. 여보 미안, 나 아이폰 사야겠어!(me2day iphone ias)[2008-08-22 20:29:24](http://me2day.net/rath/2008/08/22#20:29:24)

* 이로써 제가 운영하던 me2video 는 2달 후 문을 닫습니다. 만박님한테 토큰 왕창 받고 넘겼어요 >ㅁ(me2video)[2008-08-28 17:47:48](http://me2day.net/rath/2008/08/28#17:47:48)


이 글은 [rath](http://me2day.net/rath)님의 [2008년 6월 29일](http://me2day.net/rath/2008/06/29#16:03:22)에서 [2008년 8월 28일](http://me2day.net/rath/2008/08/28#08:47:48)까지의 미투데이 내용입니다.
