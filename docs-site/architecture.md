# Architecture

> Scrapling 核心架构：模块化、自适应、高性能

## 1. Overview

| 指标 | 数值 |
|------|------|
| Python 版本 | 3.10+ |
| 测试覆盖 | 92% |
| 类型覆盖 | 100% (PyRight + MyPy) |
| JSON 序列化 | 10x faster than stdlib |
| 文本提取 | 50x Selectolax, 784x BS4 |

## 2. Core Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                        Scrapling                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                   │
│  ┌─────────────┐    ┌─────────────┐    ┌─────────────┐        │
│  │   Fetchers  │───►│   Parser    │───►│   Spiders   │        │
│  │  (网络层)   │    │  (解析层)   │    │  (框架层)   │        │
│  └─────────────┘    └─────────────┘    └─────────────┘        │
│         │                  │                  │                  │
│         ▼                  ▼                  ▼                  │
│  ┌─────────────────────────────────────────────────────┐       │
│  │              Core / Engines / CLI                    │       │
│  └─────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

## 3. Module Structure

```
scrapling/
├── __init__.py              # Main package
├── cli.py                   # CLI entry point
├── parser.py                # Adaptive parser engine
│
├── fetchers/                # Network fetching
│   ├── __init__.py
│   ├── _core.py            # Base fetcher classes
│   ├── _session.py         # Session management
│   ├── _abc.py             # Abstract base classes
│   ├── _defaults.py        # Default settings
│   ├── _decorator.py       # Decorators
│   ├── _types.py           # Type definitions
│   ├── _utils.py           # Utilities
│   ├── sessions.py         # Session classes
│   ├── fetcher.py          # Fetcher classes
│   ├── stealthy.py         # StealthyFetcher
│   └── dynamic.py          # DynamicFetcher
│
├── parser/                  # Parsing engine
│   ├── __init__.py
│   ├── _adaptor.py        # Adaptive element tracking
│   ├── _defaults.py
│   ├── _serializers.py    # Fast JSON serialization
│   └── ...
│
├── spiders/                # Spider framework
│   ├── __init__.py
│   ├── _abc.py
│   ├── _core.py           # Spider core
│   ├── _manager.py        # Session manager
│   ├── _request.py        # Request/Response
│   ├── _middleware.py     # Middleware
│   ├── _runner.py         # Runner
│   └── ...
│
├── core/                   # Core utilities
│   ├── translator.py      # CSS/XPath translator
│   └── ...
│
└── engines/               # Search engines
```

## 4. Fetcher Types

| Fetcher | Type | Use Case |
|---------|------|----------|
| `Fetcher` | HTTP | Fast, stealth HTTP requests with TLS fingerprint |
| `StealthyFetcher` | HTTP + Stealth | Bypass Cloudflare Turnstile |
| `DynamicFetcher` | Browser | Full browser automation (Playwright) |

### Session Classes
| Session | Fetcher | Features |
|---------|---------|----------|
| `FetcherSession` | Fetcher | Persistent cookies, HTTP/3 |
| `StealthySession` | Stealthy | Headless browser, solve Cloudflare |
| `DynamicSession` | Dynamic | Chrome/Chromium automation |

## 5. Parser Features

### Selection Methods
- **CSS selectors** — via Parsel-compatible syntax
- **XPath selectors** — full XPath 1.0 support
- **BeautifulSoup-style** — `find_all()` API
- **Text search** — `find_by_text()`
- **Regex** — built-in regex support

### Adaptive Scraping
```python
# auto_save=True — saves element signature for future recovery
products = page.css('.product', auto_save=True)

# adaptive=True — auto-relocates elements after site changes
products = page.css('.product', adaptive=True)
```

## 6. Spider Architecture

```
Spider
  ├── start_urls: List[str]
  ├── concurrent_requests: int
  ├── download_delay: float
  ├── crawldir: str (checkpoint directory)
  │
  ├── configure_sessions()
  │     └── Add FetcherSession/StealthySession/DynamicSession
  │
  └── parse(response: Response)
        └── Yields items or new Requests
```

### Features
- **Concurrency** — Configurable per-domain throttling
- **Pause/Resume** — Checkpoint-based with Ctrl+C
- **Streaming** — `async for item in spider.stream()`
- **Multi-Session** — Route requests to different sessions by ID
- **Proxy Rotation** — Built-in `ProxyRotator`

## 7. MCP Integration

Scrapling provides an MCP server for AI-assisted scraping:

```bash
scrapling mcp-server
```

### MCP Capabilities
- **fetch** — Fetch URL with various fetchers
- **extract** — Extract content using CSS/XPath
- **browse** — Interactive browsing with AI

## 8. CLI Tools

```bash
# Interactive shell
scrapling shell

# Extract without code
scrapling extract get 'https://example.com' content.md
scrapling extract fetch 'https://example.com' content.md --css-selector '#main'
```

## 9. Technology Stack

| Layer | Technology |
|-------|------------|
| HTTP Client | httpx, curl_cffi |
| Browser | Playwright (Chromium) |
| Parsing | lxml, Parsel |
| Async | asyncio |
| CLI | click |
| MCP | FastMCP |
