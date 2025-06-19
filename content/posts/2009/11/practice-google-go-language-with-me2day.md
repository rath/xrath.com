---
title: "Google이 발표한 새로운 시스템 프로그래밍 언어 Go 써보기"
date: 2009-11-12
slug: 2009/11/practice-google-go-language-with-me2day
lang: ko
---

구글이 새로운 시스템 프로그래밍 언어인 [Go](http://golang.org/)를 발표했습니다.

이것이 무엇인가.. 에 대한 글은 인터넷에 마구마구 퍼져있으니 찾아보시면 되고요, 어제 Google Go를 보고 제가 미투데이에 남겼던 기록들은 [여기](http://me2day.net/rath/tag/go)에서 볼 수 있습니다.

안타깝게도 release revision의 json 모듈에 버그가 있어서 2시간정도 삽질을 했습니다. 그것이 버그인지 감별하는데 대부분의 시간을 보냈고, 실제로 버그를 고치는데는 30분 정도가 걸린 듯 하네요.

$GOROOT/src/pkg/json/parse.go 에서 유니코드 문자열 처리를 위해 \u를 만났을때 다음 4바이트를 읽어 int로 변환하는 _UnHex 펑션에서 start, end offset을 받게 해놓고, caller는 start, length를 불러서 생긴 어처구니 없는 버그였습니다. 영광스럽게 패치를 보내려고 하니.. current revision에는 이미 고쳐있지 뭐에요. 별 수 있나요. 울었습니다.

문법에 익숙해지는데 꽤 시간이 걸렸지만, 깔끔합니다.

시험삼아 미투데이에서 내게 달린 최근 댓글을 확인하는 콘솔 프로그램을 만들어보며 학습을 했는데, me2comment.go 파일을 한 번 둘러보시지요.

## me2comment.go
```go
package main 

import (
  "io";
  "http";
  "json";
  "fmt";
  "regexp";
  "flag";
)

func filter_html(str string) string { 
    remove_anchor := regexp.MustCompile("<[^>]+>");
    var s string = remove_anchor.ReplaceAllString(str, "");
    s = regexp.MustCompile("<").ReplaceAllString(s, "<");
    s = regexp.MustCompile(">").ReplaceAllString(s, ">");
    return s;
}

func main() {
    var username string;
    flag.StringVar(&username, "username", "rath", "Your ID of the me2DAY.");
    flag.Parse();

    url := fmt.Sprintf("[http://me2day.net/api/track_comments/%s.json](http://me2day.net/api/track_comments/%s.json)", username);
    r, _, err := http.Get(url);
    if err!=nil { 
        fmt.Printf("Error: %v\n", err);
        return;
    }

    buf, err := io.ReadAll(r.Body);
    ret, ok, errtok := json.StringToJson(string(buf));  
    if !ok {
        fmt.Printf("Error: %v\n", errtok);
    } else {
        to_me := ret.Get("comment_to_mes");
        var last_post string = "";
        for i:=0; i<to_me.Len(); i++ {
            e := to_me.Elem(i);

            nickname := json.Walk(e, "comment/author/nickname");
            body := filter_html(json.Walk(e, "comment/body").String());
            post_body := filter_html(json.Walk(e, "post/body").String());

            if post_body!=last_post {
                var to_print string = post_body;
                if len(post_body)>50 {
                    to_print = post_body[0:50]
                } 
                fmt.Printf("* %s\n", to_print);
            } 
            fmt.Printf("   ㄴ%s: %s\n", nickname, body);
            last_post = post_body;
        }
    }

    r.Body.Close();
}
```

실행시키면 ..

```
Jang-Ho-Hwangs-iMac:tmp rath$ ./me2comment 

* 그녀의 요리 실력은 나날이 업그레이?
   ㄴ2Z[이지]: 영국이라는 게 믿기지 않아요! @.@
   ㄴJB♥: 와웅 보쌈코기 같이생겼어용ㅋㅋ뭔가맛나보이는 덮밥입니다ㅋㅋ
   ㄴ바람달: 하앍
   ㄴK-Dog: 크아!!
   ㄴtomato: 소스는 없이 먹는건가요?

* $GOROOT/src/pkg/json/parse.go 에서 \u를 만났?
   ㄴ솥아: 난 왜 최신 언어들에는 관심이 없는걸까 -.-  [글보러가기]

* 그녀의 요리 실력은 나날이 업그레이?
   ㄴ_wonhui: 맛있어 보입니다 -ㅁ-

* $GOROOT/src/pkg/json/parse.go 에서 \u를 만났?
   ㄴK-Dog: 꺅 더 좋은 세상을 위해 애쓰시는군요 
   ㄴ다즐링: 이 님하 고고씽 삼매경.. ㅠㅠ 이러지마셈 흑흑..

* 버그 찾았다
```

이렇게 최근 내게 달린 댓글을 출력해주는 간단한 프로그램입니다.

go가 의존성을 모두 날려버리고 하나의 binary로 만들어주는 기특한 녀석이기 때문에, 이런 간단한 프로그램의 바이너리가 1.2MB나 된답니다. (darwin/amd64 빌드임)

만만한게 미투데이라 ^_^ 시스템 프로그래밍과 전혀 무관한 미투데이 클라이언트를 만들어보았는데요, 다음에 기회가 되면 go의 자랑 기능인 [동시성 지원](http://golang.org/doc/effective_go.html#concurrency)부분을 써보고 싶네요.

## Comments

### K-Dog
*2009-11-12T23:32:35.000Z*

흐악. 바이너리 만들어 주는거, 예술!!

---

### Jang-Ho Hwang
*http://xrath.com/*
*2009-11-12T23:55:50.000Z*

[@K-Dog ](#comment-3536) 
매력적이에요. 사이즈가 다소 크긴하지만, 시스템 프로그래밍용임을 감안하면 문제될 일도 아니고요. 
문법에 익숙해지는 게.. 은근 시간 많이 잡아먹네요!

---

### hey
*http://me2day.net/heycalmdown*
*2009-11-13T00:53:46.000Z*

멋있어요 +_+ 나도 뭔가 만들어보고 싶은데 소재가 없어영. 헬로 세계나 계속 찍어야겠다.

---

### hey
*http://me2day.net/heycalmdown*
*2009-11-13T00:58:24.000Z*

복사해서 돌려봤는데 한글 출력이 이상해용. 인코딩이 깨졌나?

---

### 오스카
*http://www.oscarplex.net*
*2009-11-13T01:26:39.000Z*

문법이 정말... 왕 짜증나는 ... 

오브젝티브 C 처음 봤을 때도 이 정도로 난감하지는 않았던 거 같네요. 이건 뭐, C 기반에다가 모듈라에 파스칼에... -0-

---

### Jang-Ho Hwang
*http://xrath.com/*
*2009-11-13T02:20:56.000Z*

[@hey ](#comment-3539) 
기본 인코딩이 UTF-8이라 그럴 일은 없을거에요. 
단.. 제가 붙여둔 소스코드에 인코딩이 깨져있었네요. 죄송해요.

* 본문 내용 중얼중얼
  ㄴ 헤이: 잇힝~

댓글 지시자로 한글 니은(ㄴ)을 썼는데 그 부분이 소스코드에 깨져있었어요. 54라인이고요, 고쳐놓았습니다. 꿉벅.

---

### Jang-Ho Hwang
*http://xrath.com/*
*2009-11-13T03:09:23.000Z*

[@오스카 ](#comment-3540) 
인터페이스 한 번 넘기려고 하면 더더욱 난감하더랍니다. 

type A interface { 
  Foo(value int) string;
}

이런 인터페이스가 있다고 치고, 특정 함수에 인터페이스를 넘기기 위해 구현을 하려면..

type B struct {
}

func (b B) Foo(value int) string {
  ...
}

으로 구현해줘야 하더군요. 도대체 어디에도.. B가 A를 구현한다는 것이 명시적으로 나와있지 않아서, 꽤나 당황했더라지요..

---

