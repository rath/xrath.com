---
title: "Apache Lucene 2.9.0 릴리즈 소식"
date: 2009-09-27
slug: 2009/09/apache-lucene-2-9-0-released
lang: ko
---

지난 9월 25일 [Apache Lucene Java 가 2.9.0 로 릴리즈](http://lucene.apache.org/java/docs/index.html#25+September+2009+-+Lucene+Java+2.9.0+available) 되었습니다.


> While we generally try and maintain full backwards compatibility between major versions, Lucene 2.9 has a variety of breaks that are spelled out in the 'Changes in backwards compatibility policy' section of CHANGES. We recommend that you recompile your application with Lucene 2.9 rather than attempting to “drop” it in. This will alert you to any issues you may have to fix if you are affected by one of the backward compatibility breaks.


릴리즈 뉴스에 따르면 많은 feature들과 성능을 위해 ([CHANGES](http://lucene.apache.org/java/2_9_0/changes/Changes.html#2.9.0) 를 보면 알 수 있듯이) 완벽한 하위호환성을 지킬 수 없었다고 합니다. 2.4.1에서 단번에 2.9.0으로 띄웠으니 그럴만도 하네요.

	Per segment searching and caching (can lead to much faster reopen among other things)
	Near real-time search capabilities added to IndexWriter
	New Query types
	Smarter, more scalable multi-term queries (wildcard, range, etc)
	A freshly optimized Collector/Scorer API
	Improved Unicode support and the addition of Collation contrib
	A new Attribute based TokenStream API
	A new QueryParser framework in contrib with a core QueryParser replacement impl included.
	Scoring is now optional when sorting by Field, or using a custom Collector, gaining sizable performance when scores are not required.
	New analyzers (PersianAnalyzer, ArabicAnalyzer, SmartChineseAnalyzer)
	New fast-vector-highlighter for large documents
	Lucene now includes high-performance handling of numeric fields. Such fields are indexed with a trie structure, enabling simple to use and much faster numeric range searching without having to externally pre-process numeric values into textual values.

[CHANGES 내역](http://lucene.apache.org/java/2_9_0/changes/Changes.html#2.9.0)을 보면 API 변경 38개, 버그 수정 26개, 새 기능 36개, 최적화 13개, 하위호환 정책 변경 7개, 런타임 동작 변경 15개 등으로 많고, 그 내용을 제가 전혀 해독할 수 없어서 옮기지 않았고요. 뉴스에 포함된 summary만 옮겨두었습니다.

Lucene 으로 서비스 운영하시던 분들은 작업해야할 것들이 많이 늘었겠네요.

고생하시길 바랍니다.
