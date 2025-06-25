---
title: "WebP polyfill 험난했다"
date: Mon Mar 09 2020 03:30:00 GMT+0900
slug: 2020/03/webp-polyfill-rabbit-hole
lang: ko
tags: ["webp", "webassembly", "emscripten", "flutter"]
---

Flutter 하면서 WebP 이미지 도배했었다. WebP가 좋아 보였기 때문이다.
요새 웹 버전 만들다 보니까 WebP 미지원 브라우저 때문에 CDN 마이그레이션 해야 해서 좀 귀찮았다. 그래서 WebP polyfill을 찾았다.
이미지 디코딩은 잘 되지만 document에 의존성이 있고, package.json이 엉망이라 관리도 안 돼서 탈락이었다.
동시에 여러 이미지를 표시해야 해서 main 디코딩 스레드는 절대 쓸 수 없었다. 그래서 worker 스레드에서 돌아야 했다.

원본을 찾아보니까 구글이 만든 libwebp 기반이었다.
`libwebp-1.1.0.tar.gz` 찾아서 cmake로 빌드를 시작했다.
그런데 LLVM to JavaScript 컴파일러 없다고 에러가 났다.
문서 보고 Emscripten을 설치했다.
다시 libwebp를 빌드하려고 했는데 Emscripten 쪽에서 에러가 났다.
결국 Emscripten 파이썬 코드 일부를 수정했다.
그렇게 libwebp 빌드해서 겨우 `webp.js`를 뽑아냈는데, 웹킷에서 Atomics가 없어서 또 에러가 났다.
LLVM 말고 fastcomp 백엔드로 빌드해야 된다는 걸 몰라서 몇 시간을 더 날렸다.

그래도 결국엔 빌드 성공했고, 각종 브라우저에서 다 동작하는 것까지는 확인했다.
근데 libwebp가 제공한 `webp_to_sdl.c`로는 offscreen 드로잉도 안 되고, 리턴값도 전역 변수로 줘서 확장성이 1도 없었다.
잠깐 당황했지만, 어차피 이거 WebAssembly니까 괜찮다고 생각했다.
그래서 `webp_to_jpg.c` 만들기 시작했다.
하다 보니 resize도 하고 싶어져서 그 기능도 넣기 시작했다.
다 만들면 Emscripten이 알아서 내 C 코드를 JS로 만들어주겠지, 하고 생각했다.

잠깐만… CDN 마이그레이션 했으면 벌써 끝났을 텐데… 😔
