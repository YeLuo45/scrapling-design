import { defineConfig } from "vitepress";

export default defineConfig({
  title: "Scrapling Design",
  description: "Scrapling 自适应 Web 爬虫框架设计文档 — Effortless Web Scraping for the Modern Web",

  head: [
    ["link", { rel: "icon", type: "image/svg+xml", href: "/favicon.svg" }],
  ],

  themeConfig: {
    logo: "/logo.png",
    nav: [
      { text: "Home", link: "/" },
      { text: "Architecture", link: "/architecture" },
      { text: "Fetchers", link: "/fetchers" },
      { text: "Parser", link: "/parser" },
      { text: "Spiders", link: "/spiders" },
      { text: "MCP Integration", link: "/mcp-integration" },
    ],
    sidebar: [
      {
        text: "Documentation",
        items: [
          { text: "Home", link: "/" },
          { text: "架构分析", link: "/architecture" },
          { text: "Fetchers", link: "/fetchers" },
          { text: "Parser 解析器", link: "/parser" },
          { text: "Spiders 爬虫框架", link: "/spiders" },
          { text: "CLI 工具", link: "/cli" },
          { text: "MCP 集成", link: "/mcp-integration" },
          { text: "性能基准", link: "/benchmark" },
          { text: "代码结构", link: "/code-structure" },
        ],
      },
    ],
    socialLinks: [
      { icon: "github", link: "https://github.com/D4Vinci/Scrapling" }
    ],
    footer: {
      message: "基于 Scrapling 开源项目构建",
      copyright: "Copyright © 2024-present Scrapling Contributors"
    },
  },

  base: "/scrapling-design/",
});
