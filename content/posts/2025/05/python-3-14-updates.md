---
title: "Python 3.14 개발자 친화적 업데이트들"
date: Fri May 30 2025 09:56:00 GMT+0900
slug: 2025/05/python-3-14-updates
lang: ko
tags: ["python", "updates", "developer-experience"]
---

[Python 3.14 바뀐 점 재미있게 설명한 영상](https://www.youtube.com/watch?v=-Z-BDux-TRk). 개발자 경험 향상에 집중한 것 같다. 특히 beta-1부터 들어온 알록달록 컬러 지원 대만족. 영상은 3.14.0b1 기준이고, 2025년 5월 30일 기준, 최신 버전은 3.14.0b2.

- $ python -m json sample.json` << 컬러 지원!
- `argparse.ArgumentParser(color=True)` << 여기도 컬러 지원!
- `except AssertionError, ValueError` << 괄호 안 써도 된다!
- [t-strings](https://peps.python.org/pep-0750/)
- 이제 `class Person` 속 메서드에서 `-> Person` 리턴 가능!
- `a, b = 1, 2, 3` 했을 때 오류 메시지 친절해짐 (expected 2, got 3)
- `os.reload_environ()`
- `sys.remote_exec` 디버거 훌륭하다!
