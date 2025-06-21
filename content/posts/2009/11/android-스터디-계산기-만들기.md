---
title: "Android 스터디: 계산기 만들기"
date: Tue Nov 10 2009 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2009/11/android-스터디-계산기-만들기
lang: ko
tags: ["android", "calculator-app", "ui-design", "android-development"]
---

[저번 포스트](/2009/10/android-2-0-sdk-%EC%B6%9C%EC%8B%9C%EB%A5%BC-%EA%B8%B0%EB%85%90%ED%95%98%EB%A9%B0/)에 이어 오늘은 Android로 계산기를 만들어보도록 하겠습니다.

[Eclipse 에 ADT 설치](http://developer.android.com/guide/developing/eclipse-adt.html)까지 마치셨나요? 그럼 [헬로월드](http://en.wikipedia.org/wiki/Hello_world_program) 실행도 성공하셨을테니, 바로 계산기를 만들어보도록 하겠습니다.

먼저 UI 설계를 하지요. [balsamiq](http://www.balsamiq.com/)을 사용하여 간단히 그려보았습니다.

![](/img/mockup_android_calculator.png)

설계가 끝났습니다. 초기화 버튼이 없는게 이상하지요? 숙제로 남겨두겠습니다. 적절히 넣을 자리를 찾아 배치하고 미리 만들어진 메서드와 연결시키면 됩니다.

그러면 위처럼 화면을 구현할 수 있도록 Layout을 만들어야 합니다. Android 1.5 까지는 iPhone처럼 오직 320x480 하나만 신경써도 되서 편했을텐데요, Android 1.6 부터는 [여러 해상도에 대한 지원](http://developer.android.com/guide/practices/screens_support.html)이  들어갔습니다. support-screen 엘리먼트를 이용하여 지원하고자하는 화면크기들을 각각 지정할 수 있고  각 해상도 (미리 정의된 small, normal, large)에 맞는 XML UI를 만들 수 있습니다.

그러나 저는 그렇게 할 생각이 없습니다. 화면 해상도와 Portrait/Landscape 에 맞춰 적절히 늘어나는 UI 코드를 작성할 계획입니다. 화면 크기별로 UI를 새로 만든다니.. 생각만해도 끔찍하지 않습니까? 그래서 [Common Layout Object](http://developer.android.com/guide/topics/ui/layout-objects.html)를 사용할 것입니다.

일단 완성된 Eclipse ADT가 만들어준 HelloActivity를 가지고 바로 시작해보겠습니다.


잠깐. 새 플랫폼 공부를 시작하려면 어떻게 디버그 로그를 출력하는지 아는 것이 중요합니다. Logcat을 통해 디버그 로그를 출력하는 방법을 알고 넘어갑시다. android.util.Log.i("my log", "중얼중얼") 하면 됩니다. android.util.Log 클래스엔 e(rror), w(arning), i(nfo), d(ebug), v(erbose) 메서드가 있습니다. 취향것 쓰시면 되고요, error나 warning의 경우 오류객체(Throwable)만 집어던져도 됩니다. Log 클래스를 쓰게되면 Android Debug Bridge로 해당 로그 메시지를 보내주므로 Eclipse 에서 로그메시지를 편하게 확인할 수 있습니다.

> Log.d("hehehe", "onCreate is executed");

를 onCreate 메서드에 적절히 넣으시고, 디버그를 시작하시면 Log 창에 뭔가 잔뜩 출력되는 것을 볼 수 있습니다. "hehehe"만 보시려면 + 버튼을 눌러 로그필터를 만드세요. by Log Tag 부분에 hehehe를 입력하시면 내가 찍은 로그만 따로 볼 수 있습니다.


Activity, 하나만 쓰겠습니다. 이번 목표는 동작하는 계산기를 만들어서 안드로이드 플랫폼에 자신감을 얻는 것이기 때문입니다. 완성된 소스코드는 [github에 올려뒀](http://github.com/rath/android-calculator/tree/master/src/com/xrath/training/android/calculator/)습니다.

먼저, UI를 구성하기 위해 어떠한 컴포넌트를 쓸지 결정하겠습니다. 입력중인 숫자들과 결과들이 출력될 컴포넌트는 TextView를 쓰고, 각 연산자들과 숫자들은 Button을 씁니다. 위부터 아래로 출력하기 위해 LinearLayout을 쓰겠습니다.


```java
LinearLayout view = new LinearLayout(this);
TextView activeNumber = new TextView(this);
activeNumber.setLayoutParams(new LinearLayout.LayoutParams(FILL_PARENT, WRAP_CONTENT, 0.0f));
```


여기까지 입력하고나니.. 버튼을 어떻게 추가해야할지 고민이 됩니다. LinearLayout을 사용하였으니 앞으로 추가하는 버튼들은 모두 세로로 표시될 것입니다. 이것은 원하던 결과가 아닙니다. 그래서 ButtonGroup 이란 클래스를 만들어 버튼들을 묶고 각 버튼들에 액션을 연결해두는 GridView를 하나 만들도록 하겠습니다.


```java
public class ButtonGroup extends GridView
{ 
 final int gravity = Gravity.CENTER;
 final float textSize = 36.0f;

 private Button[] nums = new Button[10];
 private Map operatorButtons = new HashMap();

 private ButtonActions action;

 public ButtonGroup(Context context, ButtonActions action)
 {
   super(context);
   this.action = action;
   setNumColumns(4);
   setHorizontalSpacing(1);
   setVerticalSpacing(1);     
   setStretchMode(GridView.STRETCH_COLUMN_WIDTH);
   createButtons();
   initLayout();
 }

 private void createButtons()
 {
   for(int i=0; inums.length; i++)
   {
     final int number = i;
     nums[i] = new Button(getContext());
     nums[i].setText(String.valueOf(number));
     nums[i].setGravity(gravity);
     nums[i].setTextSize(textSize);
     nums[i].setOnClickListener(new View.OnClickListener() { 
       public void onClick(View v) {
         action.processNumber(number);
       }
     });
   }

   for(final Operator op : Operator.values())
   {      
     Button button = new Button(getContext());
     button.setText(op.text());
     button.setGravity(gravity);
     button.setTextSize(textSize);
     button.setOnClickListener(new View.OnClickListener() {
       public void onClick(View v) {
         action.processOperator(op);
       }     
     });     
     operatorButtons.put(op, button);
   }
 }

 private void initLayout()
 {   
   // 7, 8, 9, /
   // 4, 5, 6, *
   // 1, 2, 3, -
   // ., 0, =, +      
   final Map ops = operatorButtons;
   setAdapter( new BaseAdapter() {
     private View[] buttons = {
       nums[7], nums[8], nums[9], ops.get(Operator.DIVIDE),
       nums[4], nums[5], nums[6], ops.get(Operator.MULTIPLY),
       nums[1], nums[2], nums[3], ops.get(Operator.MINUS),
       ops.get(Operator.DOT), nums[0], ops.get(Operator.RESULT), ops.get(Operator.PLUS)
     };
     public int getCount() {
       return nums.length + ops.size();
     }
     public Object getItem(int position) { 
       return null;
     }
     public long getItemId(int position) {
       return 0;
     }
     public View getView(int position, View convertView, ViewGroup parent) {
       View view = buttons[position];
       view.setLayoutParams(
         new GridView.LayoutParams(parent.getWidth()/4, (parent.getHeight()-40)/4));
       return view; 
     }
   });     
 }
}
```

GridView는 말그대로 그리드 형태로 컴포넌트를 배치시켜주는 공용 레이아웃 클래스입니다. 소스코드 하단의 BaseAdapter 구현부분이 핵심이지요. 총 배치될 컴포넌트의 개수(getCount), n번째에 있는 컴포넌트를 리턴하는 getView 메서드가 핵심입니다.

여기까지 했으면, 이제 이 ButtonGroup을 LinearLayout에 넣어보지요.


```java
View buttons = new ButtonGroup(this, actions);
buttons.setLayoutParams(
 new LinearLayout.LayoutParams(FILL_PARENT, FILL_PARENT, 1.0f));
view.addView(buttons);
```

ButtonGroup의 세로 크기는 화면에 꽉 차게 하고 싶으니 LayoutParams에 WRAP_CONTENT가 아닌 FILL_PARENT를 사용했습니다.

이제 각 버튼을 눌렀을 때의 처리를 만들어줘야 합니다. ButtonGroup 생성자에서 ButtonActions 객체를 받았는데요, [ButtonActions의 소스코드](http://github.com/rath/android-calculator/blob/master/src/com/xrath/training/android/calculator/ButtonActions.java)는 안드로이드 플랫폼과 무관하게 계산기 로직이 담긴 부분이므로 별도의 설명을 하지 않겠습니다.

그리고 ButtonActions에서는 입력중인 숫자와 결과값이 출력될 TextView의 레퍼런스를 넘겨서 각 버튼을 눌렀을 때의 결과를 출력할 수 있도록 했습니다.

![](/img/android_calculator_result.png)

끝났네요. 계산기가 만들어졌습니다.

## Comments

### endloop
*2009-11-11T01:20:17.000Z*

차주부터 진행하도록 하겠사옵니다.

---

### 기분째즈
*2009-11-11T15:34:11.000Z*

balsamiq 마음에 든다.

---

### Jang-Ho Hwang
*http://xrath.com/*
*2009-11-12T00:32:22.000Z*

[@기분째즈 ](#comment-3525) 
굿 툴. 평가판만으로도 충분!

---

### Jang-Ho Hwang
*http://xrath.com/*
*2009-11-12T00:32:38.000Z*

[@endloop ](#comment-3522) 
알겠습니다.

---

### 초보프로그래머
*2010-01-05T11:39:32.000Z*

에뮬레이터로 실행해서 계산기에서 숫자랑 dot누르면

the application Calculator(process com.xrath.training.android.calculator) has stopped 
unexpectedly.Please try again.

이렇게 에러가 나는데 왜그럴까요??
안드로이드 혼자 해볼려는데 모르겠다는....ㅜㅜ

---

### 김성안
*http://pragmatic.kr*
*2010-03-17T10:55:20.000Z*

Balsamiq은 착한일 하고 있다고 메일 보내면 정식 라이선스 보내줘요. 기부라던지 오픈소스 개발이라던지 요런거 하고 있다고 자랑 멜 하나 보내시면 됩니다.

---

### Jang-Ho Hwang
*http://xrath.com/*
*2010-03-17T19:55:42.000Z*

[@김성안 ](#comment-3993) 
정보 감사합니다. 소문은 들었는데 요새 GUI 오픈소스 개발하는 게 없어서 요청하지 못하겠네요 ^^;

---

### 초보
*2010-07-14T07:38:13.000Z*

이부분  Main.java에 넣어야하는거아닌가요?ㅠ

---

### 초보
*2010-07-14T07:39:44.000Z*

요부분 말입니다 ㅠㅠ 요부분에서부터 막혀요 위에서 말한대요 레이아웃의 메인.java에 넣는게아닌가요?;

---

### 초보
*2010-07-14T07:40:07.000Z*

""

**[초보 ](#comment-4725) :**요부분 말입니다 ㅠㅠ 요부분에서부터 막혀요 위에서 말한대요 레이아웃의 메인.java에 넣는게아닌가요?;

---

### 초보
*2010-07-14T07:40:47.000Z*

맨처음 ;inearlayout부터 막히네요 ㅠㅠ
**[초보 ](#comment-4726) :**“”
초보 :요부분 말입니다 ㅠㅠ 요부분에서부터 막혀요 위에서 말한대요 레이아웃의 메인.java에 넣는게아닌가요?;

---

### 왕초보
*2010-08-09T16:13:22.000Z*

저;; 그러면 main.xml파일은 어케 되는것이죠?

---

### freehawk
*2010-09-08T09:48:50.000Z*

도움 많이 되었습니다. 그런데 CalculatorActivity 에서 41번째줄 View buttons = new ButtonGroup(this, actions) 에서 에러가 발생합니다. ctrl+space 눌러봐도 뚜렷한 해답을 얻지 못하겠고. 하나의 버튼안에 context가 두 개 들어갈 수 있는지 궁금합니다.

---

### Begginer Class
*http://dreamchallenger.blogspot.com/*
*2011-01-05T06:01:27.000Z*

좋은 자료 감사합니다.

log 부분을 퍼갔는데 실례가 아닌지요?

문제가 된다면 삭제하도록 하겠습니다.

감사합니다.

---

### 미니어스
*2011-10-12T11:02:23.000Z*

main.xml 파일보고 빵 터졌습니다.

---
