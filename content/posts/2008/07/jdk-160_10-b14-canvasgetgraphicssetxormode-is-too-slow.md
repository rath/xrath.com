---
title: "jdk 1.6.0_10 b14: Canvas.getGraphics().setXORMode is too slow"
date: 2008-07-14
slug: 2008/07/jdk-160_10-b14-canvasgetgraphicssetxormode-is-too-slow
lang: ko
---

야밤을 틈타 옛 생각에 물들어.. 한창 애플릿 클라이언트 만들던 2000-2001년 시절 백업해둔 시디를 뒤져보다가, [겨니](http://me2day.net/masterpc)와 열심히 만들던 가빠채팅 -_- 을 찾게 되었다.

암튼 

java.awt.Canvas 클래스 내 EventDispatchThread (EDT) 안에서 getGraphics로 graphics context 를 가져온 뒤 여기다 setXORMode 를 입히고 fillRect 를 하면 엄청난 성능저하를 볼 수 있다.
(setXORMode를 빼보니 빠르게 동작한다. 다른 부분은 아직 테스트해보지 않았음)

**700x24 짜리 fillRect 하는데 2,000 ms 이상 걸린다**고 하면 믿을 수 있겠는가 -_-
offscreen buffer 에도 똑같이 setXORMode로 그려본 결과 이 부분에서는 전혀 성능 저하가 없다.
그나저나 2000년에 만든 코드여서 그런지 createGraphics 로 offscreen buffer를 만드는 등의 코드들이 여기저기 널려있는데, JDK 1.4부터 추가된 Canvas.createBufferStrategy 덕분에 createGraphics 는 더이상 쓸모가 없어보인다 -.-;

아무튼 미치고 팔짝 뛰겠다.

내 JRE 버전은 1.6.0_10 b14  
위 코드가 멀쩡히 돌아가던 시절의 JRE는 MS JVM 1.1 -_-  
참고로 옆 pc 에 깔려있던 jre 1.5 에서는 아무런 문제없이 작동한다.

테스트 코드


```java
import java.awt.*;
public class test extends Canvas
{
        public void paint( Graphics g )
        {
                g.setColor( Color.black );
                g.fillRect( 0, 0, 400, 20 );
                g.setXORMode( Color.red );
                g.setColor( Color.yellow );
                g.fillRect( 0, 0, 400, 20 );
                g.setPaintMode();
        }

        public static void main( String[] args ) throws Exception
        {
                Frame f = new Frame("-_-");
                f.setSize( 400, 400 );
                f.setLayout(new BorderLayout());
                f.add( new test() );
                f.setVisible(true);
        }
}
```



테스트 결과 jdk 1.6.0_10 계열에서만 생기는 문제인 듯 하다.
1.6.0_07 이하 버전에는 XORMode 가 정상적으로 동작한다.

GWT 1.5 RC1 도 그렇고.. 버전 올라가면서 느려지는 게 왜케 많아;;

## Comments

### rath
*http://xrath.com/*
*2008-07-14T22:59:59.000Z*

jdk 1.6.10 b25에서도 똑같음 -_-

---

### rath
*http://xrath.com/*
*2008-07-14T23:01:46.000Z*

뭔가 이상하다 -.- JPanel.paintComponent 로 해도 똑같네 ;;

---

### rath
*http://xrath.com/*
*2008-07-14T23:12:35.000Z*

jdk 1.6.0_07 에서는 정상 작동한다. 음.. 아직은 Update 10 못쓰겠군!

---

### rath
*http://xrath.com/*
*2008-07-14T23:28:43.000Z*

jdk 7 b30에서도 잘 돌아간다. 근데 FF3 에서 애플릿을 띄우니까 브라우저가 죽네 -.- 베타는 이래서 쓰면 안되는건가!

---

### rath
*http://xrath.com/*
*2008-07-16T05:42:10.000Z*

jdk 1.6.0_10 b23 인데 Linux 64bit 용에서는 잘 돌아간다. 1.6.0_10과 directdraw 궁합 문제인거냐!

---

### jong10
*http://www.jong10.com/*
*2008-08-07T04:54:43.000Z*

심오하네요.. -0-

---

### 오스카
*http://www.oscarplex.net*
*2008-08-10T17:03:02.000Z*

700x24면 직접 픽셀 루프를 돌면서 처리해도 그 정도는 안 걸리는데(정도가 아니라 순식간) ... 혹시 _10 windows JDK 빌드에 이상한 디버깅 코드가 들어가 있는 건 아닐런지? ㄷㄷㄷ

---

### rath
*http://xrath.com/*
*2008-08-16T16:09:12.000Z*

그러게요 1024x768 몇장 그려도 덜 걸릴텐데 말이에요 -.-;

---

### 오스카
*http://www.oscarplex.net*
*2008-11-13T14:39:27.000Z*

java 쪽 살짝 개발할 일 있어서, jdk 1.6.0_10 받아서 봤는데, 문서에 Swing이나 Java2D 쪽이 Windows에서 D3D 하드웨어 가속 처리가 기본이라고 하네요. D3D 인터페이스에서 직접적으로 XOR 연산을 지원하지 않아서 그런 경우 더 느려진다고 하는 듯...

근데 최신 그래픽 드라이버에 DirectX 9.0c 이상, Shader 2.0 이상의 VGA 요구 사항이 있는데, 이 정도면 Shader로 발라주면 될텐데... 아마 나중에는 고쳐서 나올 듯?

---

