# Fetchers

> Scrapling provides three fetcher types for different scraping scenarios.

## 1. Fetcher Overview

| Fetcher | Speed | Stealth | JavaScript | Use Case |
|---------|-------|---------|------------|----------|
| `Fetcher` | ⚡⚡⚡ | ⚡⚡ | ❌ | Fast HTTP, TLS fingerprint |
| `StealthyFetcher` | ⚡⚡ | ⚡⚡⚡⚡ | ✅ | Cloudflare bypass |
| `DynamicFetcher` | ⚡ | ⚡⚡⚡ | ✅ | Full browser automation |

## 2. Fetcher

Fast HTTP requests with TLS fingerprint impersonation.

### Basic Usage
```python
from scrapling.fetchers import Fetcher, FetcherSession

# One-off request
page = Fetcher.get('https://quotes.toscrape.com/')
quotes = page.css('.quote .text::text').getall()

# With session
with FetcherSession(impersonate='chrome') as session:
    page = session.get('https://quotes.toscrape.com/', stealthy_headers=True)
```

### Features
- **TLS Fingerprint** — Impersonate Chrome, Firefox, Safari, etc.
- **HTTP/3 Support** — `http3=True`
- **Session Management** — Persistent cookies and state
- **Headers** — Auto-generated realistic headers

### Impersonate Targets
```python
session.get(url, impersonate='chrome')      # Latest Chrome
session.get(url, impersonate='firefox135')  # Specific version
session.get(url, impersonate='safari15_5') # Safari
```

## 3. StealthyFetcher

Advanced stealth mode with Cloudflare bypass.

### Basic Usage
```python
from scrapling.fetchers import StealthyFetcher, StealthySession

# One-off request
page = StealthyFetcher.fetch('https://nopecha.com/demo/cloudflare')
data = page.css('#padded_content a').getall()

# With session
with StealthySession(headless=True, solve_cloudflare=True) as session:
    page = session.fetch('https://nopecha.com/demo/cloudflare')
```

### Features
- **Cloudflare Turnstile** — Automatic solving
- **Headless Browser** — Uses browser for difficult targets
- **Stealth Headers** —spoofs webdriver properties
- **Session Persistence** — Keep browser open

### Options
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `headless` | bool | True | Run headless |
| `solve_cloudflare` | bool | False | Auto-solve Turnstile |
| `google_search` | bool | False | Handle Google search |
| `max_pages` | int | None | Max pages per session |

## 4. DynamicFetcher

Full browser automation with Playwright.

### Basic Usage
```python
from scrapling.fetchers import DynamicFetcher, DynamicSession

# One-off request
page = DynamicFetcher.fetch('https://quotes.toscrape.com/')
quotes = page.css('.quote .text::text').getall()

# With session
with DynamicSession(headless=True, network_idle=True) as session:
    page = session.fetch('https://quotes.toscrape.com/')
```

### Features
- **Full Browser** — Chromium/Chrome automation
- **Network Idle** — Wait for dynamic content
- **Disable Resources** — Block images/css for speed
- **Ad Blocking** — Built-in ~3,500 ad domains

### Options
| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `headless` | bool | True | Run headless |
| `disable_resources` | bool | False | Block images/css |
| `network_idle` | bool | False | Wait for network idle |
| `load_dom` | bool | True | Wait for DOM ready |

## 5. Session Classes

### FetcherSession
```python
with FetcherSession(impersonate='chrome', http3=True) as session:
    page1 = session.get(url1)
    page2 = session.get(url2, impersonate='firefox')  # Override
```

### StealthySession
```python
with StealthySession(headless=True, max_pages=5) as session:
    # Session reuses same browser instance
    for url in urls:
        page = session.fetch(url)
```

### DynamicSession
```python
with DynamicSession(headless=True, network_idle=True) as session:
    page = session.fetch(url)
    stats = session.get_pool_stats()  # Browser tab status
```

## 6. Async Sessions

```python
import asyncio
from scrapling.fetchers import (
    AsyncFetcherSession,
    AsyncStealthySession,
    AsyncDynamicSession
)

async def main():
    async with AsyncStealthySession(max_pages=3) as session:
        tasks = [session.fetch(url) for url in urls]
        results = await asyncio.gather(*tasks)
```

## 7. Proxy Rotation

### Built-in ProxyRotator
```python
from scrapling.fetchers import FetcherSession
from scrapling.fetchers._utils import ProxyRotator

rotator = ProxyRotator(
    proxies=['http://proxy1:port', 'http://proxy2:port'],
    strategy='cyclic'  # or 'random'
)

with FetcherSession(proxy_rotator=rotator) as session:
    page = session.get(url)
```

### Per-Request Override
```python
session.get(url, proxy='http://specific:proxy:port')
```

## 8. Session Management

### Multi-Session in Spider
```python
from scrapling.spiders import Spider
from scrapling.fetchers import FetcherSession, AsyncStealthySession

class MultiSessionSpider(Spider):
    name = "multi"
    start_urls = ["https://example.com/"]

    def configure_sessions(self, manager):
        manager.add("fast", FetcherSession(impersonate="chrome"))
        manager.add("stealth", AsyncStealthySession(headless=True), lazy=True)

    async def parse(self, response: Response):
        for link in response.css('a::attr(href)').getall():
            if "protected" in link:
                yield Request(link, sid="stealth")  # Route to stealth session
            else:
                yield Request(link, sid="fast")
```

## 9. Blocked Request Detection

```python
class MySpider(Spider):
    name = "demo"
    blocked_threshold = 0.3  # 30% blocked = considered blocked

    async def parse(self, response: Response):
        # Automatically detects and retries blocked requests
        yield {"data": response.css('.data::text').get()}
```

## 10. DNS Leak Prevention

```python
with FetcherSession(dns_over_doh='https://cloudflare-dns.com/dns-query') as session:
    page = session.get(url)  # DNS queries go through DoH
```
