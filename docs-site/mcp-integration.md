# MCP Integration

> Built-in MCP server for AI-assisted web scraping.

## 1. Overview

Scrapling provides an MCP (Model Context Protocol) server that enables AI assistants (Claude, Cursor, etc.) to perform web scraping tasks with minimal tokens and maximum control.

## 2. Quick Start

### Install
```bash
pip install "scrapling[ai]"
```

### Start Server
```bash
scrapling mcp-server
```

### Configure AI Client

Add to your MCP client configuration (Claude Code, Cursor, etc.):

```json
{
  "mcpServers": {
    "scrapling": {
      "command": "scrapling",
      "args": ["mcp-server"]
    }
  }
}
```

## 3. MCP Capabilities

### 3.1 fetch — Fetch Web Pages

```python
# Fetch a URL with specified fetcher
result = await scrapling.fetch({
    "url": "https://quotes.toscrape.com/",
    "fetcher": "stealthy",  // or "dynamic", "fetcher"
    "options": {
        "headless": True,
        "solve_cloudflare": True,
        "impersonate": "chrome"
    }
})
```

### 3.2 extract — Extract Content

```python
# Extract using CSS selector
result = await scrapling.extract({
    "html": "<html>...</html>",
    "selector": ".quote .text::text",
    "selector_type": "css"  // or "xpath", "text"
})
```

### 3.3 browse — Interactive Browse

```python
# Full browsing with AI guidance
result = await scrapling.browse({
    "url": "https://example.com",
    "task": "Find all product prices",
    "fetcher": "dynamic"
})
```

## 4. MCP Tools

| Tool | Description | Fetcher |
|------|-------------|---------|
| `fetch` | Fetch URL | All types |
| `extract` | Extract content | N/A (uses parser) |
| `browse` | AI-guided browse | Dynamic |
| `get_text` | Get text content | All |
| `get_links` | Extract links | All |

## 5. Fetcher Options by Type

### Fetcher (HTTP)
```json
{
    "fetcher": "fetcher",
    "impersonate": "chrome",
    "http3": false,
    "stealthy_headers": true
}
```

### StealthyFetcher (Bypass)
```json
{
    "fetcher": "stealthy",
    "headless": true,
    "solve_cloudflare": true,
    "max_pages": 5
}
```

### DynamicFetcher (Browser)
```json
{
    "fetcher": "dynamic",
    "headless": true,
    "network_idle": true,
    "disable_resources": false
}
```

## 6. Session Management

```python
# Create session for multi-page operations
session = await scrapling.create_session({
    "type": "fetcher",
    "impersonate": "chrome"
})

# Fetch multiple pages
for url in urls:
    result = await session.fetch(url)

# Close session
await session.close()
```

## 7. Adaptive Scraping

Leverage Scrapling's adaptive capabilities:

```python
# auto_save saves element signature
result = await scrapling.extract({
    "html": html,
    "selector": ".product",
    "auto_save": true
})

# adaptive=True auto-relocates after changes
result = await scrapling.extract({
    "html": html,
    "selector": ".product",
    "adaptive": true
})
```

## 8. Error Handling

```python
try:
    result = await scrapling.fetch({
        "url": "https://example.com",
        "timeout": 30
    })
except CloudflareBlock:
    # Retry with stealthy fetcher
    result = await scrapling.fetch({
        "url": "https://example.com",
        "fetcher": "stealthy"
    })
except JavaScriptRequired:
    # Retry with dynamic fetcher
    result = await scrapling.fetch({
        "url": "https://example.com",
        "fetcher": "dynamic"
    })
```

## 9. Complete Example

```python
# Claude Code / AI Assistant usage
from scrapling.fetchers import StealthyFetcher

async def scrape_quotes():
    # Fetch with stealth
    page = StealthyFetcher.fetch('https://quotes.toscrape.com/')

    # Extract quotes
    quotes = page.css('.quote .text::text').getall()

    # Extract authors
    authors = page.css('.quote .author::text').getall()

    return list(zip(quotes, authors))

# MCP server provides similar interface to AI clients
```

## 10. Benefits for AI

| Aspect | Without Scrapling | With Scrapling MCP |
|--------|-------------------|-------------------|
| Tokens | High (HTML is large) | Low (targeted extraction) |
| Reliability | AI may miss elements | Precise selection |
| Speed | Slow (full page) | Fast (targeted) |
| Cost | High | ~10x less |

## 11. Demo

See the MCP server in action:
[YouTube Demo](https://www.youtube.com/watch?v=qyFk3ZNwOxE)

## 12. Configuration

### Environment Variables
```bash
export SCRAPLING_MCP_HOST=0.0.0.0
export SCRAPLING_MCP_PORT=8080
export SCRAPLING_BROWSERS_PATH=/path/to/browsers
```

### Custom Browser Path
```bash
scrapling mcp-server --browser-path /custom/path
```
