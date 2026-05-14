# Code Structure

> Complete directory structure of Scrapling.

## 1. Top-Level Structure

```
Scrapling/
├── scrapling/                # Main package
│   ├── __init__.py           # Exports
│   ├── cli.py               # CLI entry point
│   └── parser.py            # Adaptive parser
│
├── fetchers/                # Network layer
├── parser/                  # Parsing engine
├── spiders/                # Spider framework
├── core/                   # Core utilities
├── engines/                # Search engines
│
├── tests/                   # Test suite
├── docs/                    # Documentation
├── images/                  # Assets
├── agent-skill/             # AI agent skill
│
├── pyproject.toml           # Project config
├── setup.cfg               # Setup config
└── tox.ini                 # Tox config
```

## 2. Main Package

```
scrapling/
├── __init__.py              # Main exports
│     from scrapling import Fetcher, Spider, Selector
│
├── cli.py                   # 700+ lines CLI
│     ├── shell             # Interactive shell
│     ├── extract           # Extract command
│     ├── install           # Browser installation
│     └── mcp_server        # MCP server
│
└── parser.py                # 57KB adaptive parser
      ├── Selector          # Main parser class
      ├── Element           # Element class
      └── Adaptation        # Auto-save/adaptive logic
```

## 3. Fetchers Module

```
fetchers/
├── __init__.py
│     Fetcher, StealthyFetcher, DynamicFetcher
│     FetcherSession, StealthySession, DynamicSession
│     AsyncFetcherSession, AsyncStealthySession, AsyncDynamicSession
│
├── _core.py                 # Core functionality
├── _session.py             # Session base
├── _abc.py                 # Abstract bases
├── _defaults.py            # Default settings
├── _decorator.py           # Decorators
├── _types.py               # Type definitions
├── _utils.py               # Utilities
│       └── ProxyRotator    # Proxy rotation
│
├── sessions.py             # Sync session classes
├── fetcher.py             # Fetcher classes
├── stealthy.py            # StealthyFetcher
└── dynamic.py             # DynamicFetcher
```

## 4. Parser Module

```
parser/
├── __init__.py
├── _adaptor.py            # Adaptive element tracking
├── _defaults.py
├── _serializers.py        # Fast JSON serialization
└── ...
```

## 5. Spiders Module

```
spiders/
├── __init__.py
│     Spider, Request, Response
│
├── _abc.py                 # Abstract base
├── _core.py               # Spider implementation
├── _manager.py            # Session manager
├── _request.py            # Request/Response objects
├── _middleware.py         # Middleware system
├── _runner.py             # Spider runner
├── _stats.py             # Statistics
└── ...
```

## 6. Core Module

```
core/
├── translator.py          # CSS ↔ XPath translation
└── ...
```

## 7. Key Files

| File | Lines | Purpose |
|------|-------|---------|
| `parser.py` | ~1800 | Adaptive parser |
| `cli.py` | ~700 | CLI tools |
| `fetchers/fetcher.py` | ~500 | HTTP fetcher |
| `spiders/_core.py` | ~400 | Spider framework |

## 8. Test Structure

```
tests/
├── test_parser.py         # Parser tests
├── test_fetchers.py      # Fetcher tests
├── test_spiders.py       # Spider tests
├── test_adaptation.py    # Adaptive tests
└── ...
```

## 9. Configuration Files

| File | Purpose |
|------|---------|
| `pyproject.toml` | Project metadata, deps |
| `setup.cfg` | Setup config |
| `tox.ini` | Test across Python versions |
| `.pre-commit-config.yaml` | Pre-commit hooks |
| `ruff.toml` | Linting rules |

## 10. Dependencies

### Core
- `lxml` — XML/HTML parsing
- `parsel` — CSS/XPath selection
- `httpx` — HTTP client

### Fetchers
- `curl_cffi` — TLS fingerprinting
- `playwright` — Browser automation
- `BrowserForge` — Browser management

### CLI
- `click` — CLI framework
- `IPython` — Interactive shell

### MCP
- `fastmcp` — MCP server

## 11. Type Coverage

Scrapling has:
- **100% type hints** — Full PyRight + MyPy coverage
- **.pyi stub files** — For all modules
- `py.typed` marker — PEP 561 compliant

## 12. Extension Points

| Component | Override | Purpose |
|-----------|----------|---------|
| `Spider.parse` | Subclass | Custom parsing logic |
| `SpiderMiddleware` | Subclass | Request/response processing |
| `ProxyRotator` | Subclass | Custom proxy strategy |
| `Fetcher` | Subclass | Custom fetching |
