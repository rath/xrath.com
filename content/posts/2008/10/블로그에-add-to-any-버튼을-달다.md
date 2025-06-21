---
title: "블로그에 Add To Any 버튼을 달다"
date: Wed Oct 15 2008 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2008/10/블로그에-add-to-any-버튼을-달다
lang: ko
tags: ["social-sharing", "blogging-tools", "addtoany", "web-integration"]
---

블로그에 [Add To Any 버튼](http://www.addtoany.com/buttons/)을 달았습니다.

가입도 필요없고 그저 달면 되네요. :$

![](http://static.addtoany.com/buttons/share_save_256_24.gif)

퍼머링크를 공유하고 저장하는(흔히 딜리셔스에 아이템을 추가하는) 버튼과 구독 버튼을 제공하고 있습니다.

구독버튼은 이렇게 생겼군요

![](http://static.addtoany.com/buttons/subscribe_256_24.gif)

처음 방문한 사용자의 경우 저렇게 생긴 버튼이 있으면 누르기를 꺼릴 수도 있는데요, a 엘리먼트의 onmouseover/out 에 스크립트를 넣어 클릭하지 않아도 아이템을 담을 서비스를 선택할 수 있는 것이 특징입니다.

버튼 위에 마우스를 올리면 아래처럼 서비스 업체를 선택할 수 있는 레이어가 떠오릅니다.

![add_to_any_screenshot.png](http://rath.springnote.com/pages/1935428/attachments/861672)

제 입장에서 쓸만한 것은 딜리셔스, 페이스북 정도밖에 없지만 **지원하는 서비스가 무려 108개**나 됩니다! (이거 무슨 백팔번뇌도 아니고 -_-) 108개 서비스 둘러보면서 (이걸 세고 있었던 나도 참 -_-) '아 이런 서비스가 있었구나~' 하며 요리조리 눌러보는 즐거운 경험을 했습니다. 구글에 북마크 서비스도 있는 줄은 몰랐네요.

Share 서비스에 [미투데이](http://me2day.net/)도 있으면 좋겠다는 생각을 해봅니다. [FAQ](http://www.addtoany.com/buttons/faq/)의 Can I host the buttons myself? 의 answer가 Yes, please do! 인 것으로 볼 때 어렵지 않게 넣을 수 있지 않을까합니다. (108개인데 뭐..)

자신의 블로그에 Add To Any 버튼을 달려면 버튼을 노출한 곳에 아래와 같은 코드를 집어넣으면 됩니다.

```html
<a class="a2a_dd" onmouseover="a2a_show_dropdown(this)" onmouseout="a2a_onMouseOut_delay()"
 href="http://www.addtoany.com/share_save?linkname=페이지이름&amp;linkurl=링크주소">
 <img src="http://static.addtoany.com/buttons/share_save_171_16.gif" width="171" height="16" border="0" alt="Share/Save/Bookmark"/>
</a>
<script type="text/javascript">a2a_linkname="페이지 이름"; a2a_linkurl="링크주소";</script>
```

나름 [API](http://www.addtoany.com/buttons/api/)도 있고 [워드프레스 플러그인](http://wordpress.org/extend/plugins/add-to-any/)도 있고 [Blogger](http://www.blogger.com/)도 지원하니 관심있으신 분들은 한 번 써보실 것을 권장합니다.
