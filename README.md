# Scrapling Design

Design documentation site for [scrapling](https://github.com/HKUDS/scrapling) — a high-performance web scraping framework.

**GitHub Repository**: https://github.com/yeluo45/scrapling-design

## Project Structure

```
scrapling-design/
├── docs-site/                 # VitePress documentation site
│   ├── .vitepress/
│   │   ├── config.mjs         # VitePress configuration
│   │   ├── theme/             # Custom theme
│   │   └── public/            # Static assets
│   ├── index.md               # Home page
│   ├── architecture.md         # Architecture overview
│   ├── fetchers.md            # Fetcher types
│   ├── parser.md              # Adaptive parser
│   ├── spiders.md             # Spider framework
│   ├── cli.md                 # CLI tools
│   ├── mcp-integration.md     # MCP integration
│   ├── benchmark.md           # Performance benchmarks
│   └── code-structure.md      # Code structure
├── .github/
│   └── workflows/
│       └── deploy.yml         # GitHub Pages deployment
└── package.json
```

## Quick Start

```bash
cd docs-site
pnpm install
pnpm run dev      # Development preview
pnpm run build    # Production build
pnpm run preview  # Preview build
```

## Live Site

https://yeluo45.github.io/scrapling-design/

## Content

| Document | Description |
|----------|-------------|
| [Architecture](https://yeluo45.github.io/scrapling-design/architecture) | Core framework architecture |
| [Fetchers](https://yeluo45.github.io/scrapling-design/fetchers) | Fetcher/StealthyFetcher/DynamicFetcher |
| [Parser](https://yeluo45.github.io/scrapling-design/parser) | Adaptive parsing engine |
| [Spiders](https://yeluo45.github.io/scrapling-design/spiders) | Scrapy-like crawling framework |
| [CLI](https://yeluo45.github.io/scrapling-design/cli) | Command-line tools |
| [MCP Integration](https://yeluo45.github.io/scrapling-design/mcp-integration) | AI-assisted scraping |
| [Benchmark](https://yeluo45.github.io/scrapling-design/benchmark) | 10x faster than stdlib JSON |
| [Code Structure](https://yeluo45.github.io/scrapling-design/code-structure) | Complete directory structure |

## Key Features

| Feature | Description |
|---------|-------------|
| 🕷️ Spider Framework | Scrapy-like API with async support |
| ⚡ Multi Fetcher | HTTP / Stealthy / Dynamic modes |
| 🔄 Adaptive Parsing | Survives website changes |
| 🤖 MCP Integration | AI-assisted web scraping |
| 🚀 Performance | 784x faster than BS4 |

## Performance Highlights

| Metric | Value |
|--------|-------|
| JSON Serialization | 10x faster than stdlib |
| Text Extraction | 784x faster than BS4 |
| Element Similarity | 5x faster than AutoScraper |

## Based on

[D4Vinci/Scrapling](https://github.com/D4Vinci/Scrapling) — BSD-3-Clause License
