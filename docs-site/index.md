---
layout: home

hero:
  name: "Scrapling Design"
  text: "自适应 Web 爬虫框架"
  tagline: "基于 D4Vinci/Scrapling 的设计文档站 — 让现代 Web 爬取变得简单"
  image:
    src: /banner.png
    alt: Scrapling Architecture
  actions:
    - theme: brand
      text: 架构分析 →
      link: /architecture
    - theme: brand
      text: Fetchers →
      link: /fetchers
    - theme: alt
      text: GitHub →
      link: https://github.com/D4Vinci/Scrapling

features:
  - icon: 🕷️
    title: Spider 爬虫框架
    details: Scrapy-like API、并发爬取、暂停/恢复、流式输出
    link: /spiders
  - icon: ⚡
    title: 多模式 Fetchers
    details: HTTP / Stealthy / Dynamic 三种模式、支持反爬虫绕过
    link: /fetchers
  - icon: 🔄
    title: 自适应解析
    details: 智能元素追踪、网站结构变化自动适应
    link: /parser
  - icon: 🤖
    title: MCP 集成
    details: 内置 MCP Server、AI 辅助 Web 爬取
    link: /mcp-integration
  - icon: 🚀
    title: 极致性能
    details: 10x JSON序列化、50x Selectolax、784x BS4
    link: /benchmark
  - icon: 💻
    title: CLI 工具
    details: 无需编程、命令行直接提取网页内容
    link: /cli
---
