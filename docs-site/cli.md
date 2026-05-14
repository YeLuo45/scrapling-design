# CLI Tools

> Scrape without code — directly from the terminal.

## 1. Overview

Scrapling provides a powerful CLI for common scraping tasks:
- **Interactive Shell** — IPython-based scraping shell
- **Extract Command** — Extract pages without writing code
- **MCP Server** — AI-assisted scraping

## 2. Interactive Shell

Launch an IPython shell with Scrapling integration:

```bash
scrapling shell
```

### Features
- **Auto-complete** — Tab completion for CSS selectors
- **Shortcuts** — Quick commands for common tasks
- **Browser Preview** — View results in browser
- **Curl to Scrapling** — Convert curl commands

### Example Session
```
scrapling> page = fetch.get('https://quotes.toscrape.com/')
scrapling> quotes = page.css('.quote .text::text').getall()
scrapling> len(quotes)
scrapling> view(quotes)  # Open in browser
```

## 3. Extract Command

Extract content without writing Python code:

### Basic Usage
```bash
# Extract to markdown
scrapling extract get 'https://example.com' content.md

# Extract to text
scrapling extract get 'https://example.com' content.txt

# Extract to HTML
scrapling extract get 'https://example.com' content.html
```

### With CSS Selector
```bash
# Extract specific element
scrapling extract get 'https://example.com' main.md \
    --css-selector '#main-content'

# Extract list of elements
scrapling extract get 'https://quotes.toscrape.com/' quotes.md \
    --css-selector '.quote'
```

### Browser Fetching
```bash
# Use DynamicFetcher (full browser)
scrapling extract fetch 'https://example.com' content.md \
    --no-headless

# Use StealthyFetcher
scrapling extract stealthy-fetch 'https://nopecha.com/demo' result.md \
    --solve-cloudflare \
    --css-selector '#content'
```

### Options

| Option | Description |
|--------|-------------|
| `--css-selector` | CSS selector to extract |
| `--xpath` | XPath selector to extract |
| `--impersonate` | Browser to impersonate (chrome/firefox/etc) |
| `--headless` | Run headless (default: True) |
| `--solve-cloudflare` | Solve Cloudflare challenges |
| `--proxy` | Proxy URL |

## 4. MCP Server

Start the MCP server for AI integration:

```bash
scrapling mcp-server
```

### With Custom Host/Port
```bash
scrapling mcp-server --host 0.0.0.0 --port 8080
```

## 5. Browser Installation

Install Chromium and dependencies:

```bash
# Install all browsers
scrapling install

# Force reinstall
scrapling install --force
```

Or from Python:
```python
from scrapling.cli import install

install([], standalone_mode=False)          # Normal
install(["--force"], standalone_mode=False) # Force
```

## 6. Shell Shortcuts

### Navigation
```python
fetch.get(url)              # Fetcher.get
fetch.post(url, data)      # Fetcher.post
fetch.session()             # New FetcherSession
```

### Selection
```python
css(selector)               # page.css(selector)
xpath(expr)                 # page.xpath(expr)
find(text)                  # page.find_by_text(text)
```

### Utilities
```python
view(items)                 # Open in browser
curl(url)                   # Print as curl command
json(data)                  # Pretty print JSON
```

## 7. Complete Examples

### Extract Articles
```bash
scrapling extract fetch 'https://news.example.com/' articles.md \
    --css-selector 'article.post' \
    --headless
```

### Extract with Proxy
```bash
scrapling extract get 'https://example.com' data.md \
    --proxy 'http://proxy:8080'
```

### Stealth Extract
```bash
scrapling extract stealthy-fetch 'https://cloudflare-protected.com/' out.md \
    --solve-cloudflare \
    --css-selector '.content'
```

## 8. Environment Variables

| Variable | Description |
|----------|-------------|
| `SCRAPLING_BROWSERS_PATH` | Custom browser install path |
| `SCRAPLING_CACHE_DIR` | Cache directory for dev mode |
| `SCRAPLING_HEADLESS` | Default headless mode |
