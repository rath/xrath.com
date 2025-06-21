---
title: "미투 구글리더 개발 후기 : Ext GWT"
date: Thu Sep 10 2009 02:00:00 GMT+0200 (Central European Summer Time)
slug: 2009/09/develop-story-about-me2googlereader-frontend
lang: ko
tags: ["technology", "web-development", "ext-gwt", "java"]
---

[미투 구글리더](/2009/09/introducing-me2googlereader-mashup/) 개발 후기입니다.

미투 구글리더는 3개월전에 개발되어 계속 혼자 써오던 것이였는데요. 런던에 온지 6주가 다 되어 가는데, 아무런 준비도 없이 온지라 딱히 직업도 없고 -_- 와이프는 학교 왔다갔다 하느라 혼자 있는 시간이 많아서 평소에 미뤄왔던 일들을 하나 둘씩 하다보니 이녀석을 개발하게 되었답니다.

미투 구글리더의 프론트엔드는 [Ext GWT](http://www.extjs.com/products/gxt/)를 이용해 만들었습니다. 3개월동안에는 허접한 HTML만으로 만든 페이지로 운영되었지만 뭐 혼자 쓰는 것이니 운영이랄 것도 없었지요. 아무래도 java awt/swing 으로 개발을 시작해서 그런지 swing 개발 스타일로 웹을 만들 수 있는 GWT가 많이 끌렸습니다. 그런데 제가 비주얼 디자인에 약하다보니.. 자연스럽게 GXT로 눈을 돌리게 되었지요. $329 라는 가격이 그리 만만한 가격은 아니지만 런던에서 첫 수입생기면 바로 지를 생각하고 ^^ 일단 개발을 시작했습니다.

프론트 엔드에서는 미투데이 아이콘을 가져오기 위한 me2DAY API get_person 을 이용하고, 구글리더 피드 주소를 쉽게 가져올 수 있게 하도록 GetGoogleReaderGRLD 란 클래스를 쓰고 있습니다. GetGoogleReaderGRLD가 뭐냐면, 구글리더 공유 피드 URL은

[http://www.google.com/reader/public/atom/user/12212200999016560865/state/com.google/broadcast](http://www.google.com/reader/public/atom/user/12212200999016560865/state/com.google/broadcast)

이런 형식으로 구성되어 있습니다. 다른 부분은 다 똑같은데.. /user/ 뒤의 숫자가 핵심인거지요. 이 숫자만 알면 사용자로 하여금 미투 구글리더를 쓰기 위해

1) 구글리더에 접속
2) 공유 피드 URL 주소가 어디에 있는지 뒤적뒤적
3) 이 URL이 맞는거 같지만 확신이 안서서 갈등
4) 복사해서 붙이기

이런 귀찮은 과정을 줄여줄 수 있습니다. 그래서 GetGoogleReaderGRLD 클래스가 하는 일은 [HttpClient](http://hc.apache.org/httpcomponents-client/index.html)를 이용하여 GRLD (/user/ 뒤의 숫자를 GRLD라고 지칭하더군요) 를 긁어오는 것입니다.

어쩔 수 없이 자신의 구글 아이디와 패스워드를 입력해야하는데요, 물론 저장은 하지 않습니다. 원래는 무조건 이 방법만을 강요하게 할까 하다가 아무래도 신뢰 문제가 걸려서 자신이 직접 공유피드URL를 입력할 수도 있게 해두었지요.

GXT와 함께 하는 프론트엔드 개발에서 가장 애를 많이 먹었던 것은 미투데이 아이콘을 표시해주는 ListView 를 개발하는 것이였는데요, 미투 아이콘은 44x44 라 아이콘 하나를 한줄에 표시하기에는 공간 낭비가 심해서 이를 가로로 나열하고 자동으로 wrap 되게 하고 싶었는데.. 생각대로 되지 않아서 애를 많이 먹었습니다. 결국 IE6 에서는 제대로 렌더링 되지 않는 display: inline-block 를 쓰고야 말았습니다. 구글링을 하다보니 inline-block 효과를 모든 브라우저에서 가능하게 하는 법들이 종종 보였는데요, 공간 낭비가 심해지는 디스플레이가 치명적인 결함도 아니고 해서 ^_^ 그냥 inline-block을 써버리고 말았지요.

프론트엔드에서 사용되는 RPC 콜은 총 5개 입니다. Eclipse의 Google plugin 덕분에 RPC 부분에서는 조금도 삽질을 하지 않았습니다.


```java
public interface UtilityServiceAsync {
  void setAccountEnabled(String me2id, boolean enable, AsyncCallback callback);
  void getMe2dayProfile(String userid, AsyncCallback callback);
  void getMe2dayIcons(String userid, AsyncCallback> callback);
  void getGoogleReaderAtomUrl(String email, String password, AsyncCallback callback);
  void updateAccount(String me2id, String atomURL, int me2dayIconIndex, boolean forwardWhenNote, boolean forwardWhenMe2day, AsyncCallback callback);
}
```


이 요청들을 처리하는 GWT의 RemoteServiceServlet 에서는 인증체크를 위한 세션과 쿠키 체크가 들어가있는 것 말고는 별 게 없습니다. 다만 여기서 파라미터로 [me2day-api java](http://code.google.com/p/me2day-api/) 의 Person 클래스와 Icon 클래스가 왔다갔다 하는 것을 보실 수 있는데요. 이것을 위해 [me2day-api java](http://code.google.com/p/me2day-api/)에 GWT 지원을 넣어 0.6 릴리즈를 하기도 했습니다.

GWT에서 legacy POJO를 RPC의 파라미터나 리턴값으로 쓰려면.. 일단 해당 클래스들이 GWT에서 제공하는 클래스 외의 것들을 쓰고 있는지 확인해야 합니다. me2day-api 의 경우에 가장 골치아팠던 점은 java.net.URL 클래스였지요. GWT 에서는 java.net.URL 클래스를 지원하지 않습니다. 그래서 URL 필드들을 모두 String 으로 바꿔야 되는 지경에 이르렀는데요, 그렇다고 GWT 와 상관없이 개발하는 사람들도 다 String을 써야한다는 것은 웃기는 일이지요. 그래서 기존 클래스들은 그대로 두고 각 클래스에 toGWT() 란 녀석을 하나 심어서 GWT 호환 객체로 clone 해주는 인터페이스를 만들었습니다. 이렇게 되면 하위호환성도 지키면서 GWT 지원 엔티티 클래스들도 확보할 수 있게 되지요.

하지만 이렇게 GWT 호환 클래스를 만드는 것만으로는 부족했습니다. GXT 에서는 MVC 모델을 적용하기 적합한 List, Tree, Table 에 대해서는 RpcProxy 란 것을 제공합니다. 이녀석이 뭔가 하니 각 컴포넌트의 모델 부분에 대해 네트워크 관련 코딩을 직접하지 않고 rpc 이름만 지정해주면 지가 혼자 알아서 요청도 날리고 데이터가 오면 뷰에 뿌려주기까지.. 하는 녀석이지요.


```java
RpcProxy> proxy = new RpcProxy>() {
  @Override
  protected void load(Object loadConfig, AsyncCallback> callback) {
    service.getMe2dayIcons(me2dayId, callback);
  }
};
ListLoader> loader = new BaseListLoader>(proxy, new BeanModelReader());
ListStore store = new ListStore(loader);
ListView view = new ListView();
view.setStore(store);
```


아이고 이렇게 예쁠 수가요. 그렇지만 이렇게 편한 방법을 쓰려면 POJO에 약간을 수정을 가해줘야 합니다. 물론 이점은 GWT 가 아니라 GXT 에서 제공하고 (강요하는) 것입니다.

1) POJO를 건드리지 않고, GXT 앱 프로젝트 위에 썰렁한 BeanModel 클래스를 지정하기


```java
import com.extjs.gxt.ui.client.data.BeanModelMarker;
import com.extjs.gxt.ui.client.data.BeanModelMarker.BEAN;

@BEAN(net.me2day.gwt.client.Icon.class)
public class IconBeanModel implements BeanModelMarker {
}
```


이렇게 어떤 POJO의 BeanModel 이다.. 라고 마커 클래스를 만들어두면 GWT compiler가 알아서 매핑해줍니다. 또 다른 방법은,

2) POJO를 건드리기

그저 POJO 에 메소드가 하나 없는 BeanModelTag 인터페이스를 하나 달아두면 됩니다.  이 부분에 대해서는 Ext JS Blog의 [Java Bean support with Ext GXT](http://www.extjs.com/blog/2008/07/14/preview-java-bean-support-with-ext-gwt/) 를 참조하시면 됩니다.

프론트엔드 부분은 이정도로 설명을 마치겠습니다.

아, 하나 더. 한창 jQuery를 써서 만들고 싶었는데 GWT 프로젝트를 하게 되서 아쉬움이 컸었는데요, 한을 풀었습니다. [gwtquery](http://code.google.com/p/gwtquery/)란 녀석이 있더군요. GWT 자바 소스코드에서 DOM 접근과 조작을 jQuery 처럼 할 수 있게 해줍니다. static으로 $란 이름을 가진 메서드를 제공해서 이 모든 것을 해결합니다. 하하 -_-


```java
VerticalPanel panel = new VerticalPanel() {
  protected void onRender( Element parent, int pos )
  {
    super.onRender(parent, pos);
    $("#profile-picture").load(new Function() {
      public boolean f(Event e)
      {
        $("#welcome-message-1").css("display", "block");
        $("#welcome-message-2").css("display", "block");
        return true;
      }
    });
  }
};
```


멋집니다. 자알 동작하네요! 이게 다 import static 덕분입니다. 하하.

프론트엔드는 이 정도로 줄이겠습니다. 백엔드는 다음 기회에 ^^

## Comments

### 엔하늘
*http://skyfac.com*
*2009-09-10T13:30:39.000Z*

멋지다! 뭔가 내용은 어렵지만 ㅋ

---

### rath
*http://xrath.com/*
*2009-09-10T17:41:21.000Z*

[@엔하늘 ](#comment-9646)
멋지다니 고마워, 헤.
어려운가.. '-'a 다음엔 꼭 Actionscript 3.0 쓸 일이 있기를~

---
