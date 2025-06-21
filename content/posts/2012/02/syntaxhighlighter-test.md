---
title: "SyntaxHighlighter 테스트"
date: Wed Feb 15 2012 01:00:00 GMT+0100 (Central European Standard Time)
slug: 2012/02/syntaxhighlighter-test
lang: ko
tags: ["programming", "syntax-highlighting", "tools"]
---

무슨 깡으로 블로그에 [SyntaxHighlighter](https://github.com/alexgorbatchev/SyntaxHighlighter) 테스트를 하는지 모르겠으나, ANSI 컬러로 SQL colorize하는 소스코드를 붙여본다.


```java
/*
 * Copyright (c) 1999-2012, Jang-Ho Hwang, rath@xrath.com.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * Redistributions of source code must retain the above copyright notice,
 * this list of conditions and the following disclaimer. Redistributions in
 * binary form must reproduce the above copyright notice, this list of
 * conditions and the following disclaimer in the documentation and/or
 * other materials provided with the distribution. Neither the name of the
 * Jang-Ho Hwang nor the names of its contributors may be used to endorse or
 * promote products derived from this software without specific prior written
 * permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
 * ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE
 * LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
 * CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
 * SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
 * CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 * ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF
 * THE POSSIBILITY OF SUCH DAMAGE.
 */
package rath.adrenaline.tool.colorize;

import rath.adrenaline.pcre.MatchResult;
import rath.adrenaline.pcre.Pattern;
import rath.adrenaline.pcre.Replacer;
import rath.adrenaline.pcre.Substitution;
import rath.adrenaline.util.ANSI;

/**
 * Created by IntelliJ IDEA.
 * User: rath
 * Date: 21/01/2011
 * Time: 22:13
 */
public class SqlColorize {
	private static Pattern keywordsPattern = Pattern.compile(
		"\\b(SELECT|FROM|INSERT|INTO|VALUES|UPDATE|SET|DELETE|VALUES|WHERE|" +
		"LIKE|AND|ORDER BY|OR|GROUP BY|HAVING|UNION|LIMIT|USING|JOIN|OUTER|IS|NOT|ASC|DESC)\\b",
		Pattern.CASE_INSENSITIVE);
	private static Pattern constantPattern = Pattern.compile(
		"\\b([0-9]+|NULL|true|false)\\b", Pattern.CASE_INSENSITIVE
	);
	private static Pattern stringPattern = Pattern.compile("('[^']+')");
	private static Pattern functionPattern = Pattern.compile(
			"\\b(COUNT|CONCAT|LENGTH|LOWER|UPPER|SUBSTRING|TRIM|" +
					"ADDDATE|ADDTIME|CURDATE|NOW|DATE)\\b",
			Pattern.CASE_INSENSITIVE);

	private static Replacer keywordsReplacer = keywordsPattern.replacer(new Substitution() {
			public void append(MatchResult matchResult, StringBuilder buf) {
				String keyword = matchResult.group(1);
				buf.append(ANSI.CYAN_BOLD);
				buf.append(keyword);
				buf.append(ANSI.RESET);
			}
		});
	private static Replacer constantReplacer = constantPattern.replacer(new Substitution() {
		public void append(MatchResult matchResult, StringBuilder buf) {
			String constant = matchResult.group(1);
			buf.append(ANSI.GREEN);
			buf.append(constant);
			buf.append(ANSI.RESET);
		}
	});
	private static Replacer stringReplacer = stringPattern.replacer(new Substitution() {
		public void append(MatchResult matchResult, StringBuilder buf) {
			String constant = matchResult.group(1);
			buf.append(ANSI.MAGENTA);
			buf.append(constant);
			buf.append(ANSI.RESET);
		}
	});

	private static Replacer functionReplacer = functionPattern.replacer(new Substitution() {
		public void append(MatchResult matchResult, StringBuilder buf) {
			String constant = matchResult.group(1);
			buf.append(ANSI.YELLOW);
			buf.append(constant);
			buf.append(ANSI.RESET);
		}
	});

	public static String colorize(String sql) {
		sql = constantReplacer.replace(sql);
		sql = keywordsReplacer.replace(sql);
		sql = stringReplacer.replace(sql);
		sql = functionReplacer.replace(sql);
		return sql;
	}
}
```

워드프레스 [LightWord 테마](http://wordpress.org/extend/themes/lightword)때문에 80 컬럼 안지킨거 딱 걸려서 테마설정 Layout settings => wider로 바꿨다. 
Java에서는 120컬럼 정도가 어떠할지.

## Comments

### CHANN
*http://chann.kr*
*2012-02-25T09:00:31.000Z*

오... 뭔가 예쁘네요 ㅎㅎ

---
