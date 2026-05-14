# Spiders

> Full-featured crawling framework with Scrapy-like API.

## 1. Overview

The Spider framework provides:
- **Scrapy-like API** — Familiar patterns for Scrapy users
- **Async/Await** — Modern Python concurrency
- **Concurrency Control** — Per-domain throttling
- **Pause/Resume** — Checkpoint-based persistence
- **Streaming** — Real-time item streaming
- **Multi-Session** — Route to different session types

## 2. Basic Spider

```python
from scrapling.spiders import Spider, Response

class QuotesSpider(Spider):
    name = "quotes"
    start_urls = ["https://quotes.toscrape.com/"]
    concurrent_requests = 10

    async def parse(self, response: Response):
        for quote in response.css('.quote'):
            yield {
                "text": quote.css('.text::text').get(),
                "author": quote.css('.author::text').get(),
                "tags": quote.css('.tag::text').getall(),
            }

        # Follow pagination
        next_page = response.css('.next a')
        if next_page:
            yield response.follow(next_page[0].attrib['href'])

# Run spider
result = QuotesSpider().start()
result.items.to_json("quotes.json")
```

## 3. Spider Settings

```python
class MySpider(Spider):
    name = "demo"

    #Concurrency
    concurrent_requests = 16          # Max concurrent requests
    concurrent_requests_per_domain = 8  # Per-domain limit

    # Throttling
    download_delay = 0.5             # Seconds between requests

    # Robots.txt
    robots_txt_obey = True           # Respect robots.txt

    # Checkpoint
    crawldir = "./crawl_data"        # For pause/resume
```

## 4. Request and Response

### Request
```python
from scrapling.spiders import Request, Response

# Basic request
yield Request("https://example.com/page2")

# With callback
yield Request(url, callback=self.parse_detail)

# With session routing
yield Request(url, sid="stealth")  # Use stealth session

# With meta
yield Request(url, meta={'item_id': 123})
```

### Response
```python
async def parse(self, response: Response):
    # CSS/XPath selection
    items = response.css('.item')

    # Follow links
    for link in response.css('a::attr(href)').getall():
        yield response.follow(link)

    # Access meta
    item_id = response.meta['item_id']
```

## 5. Session Management

### Configure Sessions
```python
from scrapling.spiders import Spider
from scrapling.fetchers import FetcherSession, AsyncStealthySession

class MultiSessionSpider(Spider):
    name = "multi"
    start_urls = ["https://example.com/"]

    def configure_sessions(self, manager):
        # Add fast HTTP session
        manager.add("fast", FetcherSession(impersonate="chrome"))

        # Add stealth session (lazy - only created when needed)
        manager.add("stealth", AsyncStealthySession(headless=True), lazy=True)

    async def parse(self, response: Response):
        for link in response.css('a::attr(href)').getall():
            if "protected" in link:
                # Route to stealth session for protected pages
                yield Request(link, sid="stealth")
            else:
                # Use fast session
                yield Request(link, sid="fast")
```

## 6. Pause and Resume

### Running with Checkpoints
```python
# Start spider with checkpoint directory
MySpider(crawldir="./crawl_data").start()

# Press Ctrl+C to pause gracefully
# Progress saved automatically
```

### Resuming
```python
# Same crawldir - resumes from last checkpoint
MySpider(crawldir="./crawl_data").start()
```

## 7. Streaming Mode

Stream items in real-time without waiting for crawl to complete:

```python
async for item in spider.stream():
    print(f"Got item: {item}")
    # Process item immediately
    await save_to_database(item)
```

### With Real-time Stats
```python
async for item, stats in spider.stream(with_stats=True):
    print(f"Progress: {stats.crawled}/{stats.total}")
    print(f"Speed: {stats.items_per_minute} items/min")
```

## 8. Middleware

### Built-in Middleware
- `RobotsTxtMiddleware` — Respect robots.txt
- `BlockedRequestMiddleware` — Detect and retry blocked requests
- `StatsMiddleware` — Collect crawl statistics

### Custom Middleware
```python
from scrapling.spiders import SpiderMiddleware

class MyMiddleware(SpiderMiddleware):
    async def process_request(self, request):
        # Modify request before sending
        request.meta['custom'] = 'value'
        return request

    async def process_response(self, response):
        # Process response
        if 'blocked' in response.text:
            # Retry with different session
            return response.follow(response.url, sid="stealth")
        return response

# Add to spider
class MySpider(Spider):
    name = "demo"
    spider_middlewares = [MyMiddleware()]
```

## 9. Export

### Built-in JSON/JSONL
```python
result = MySpider().start()

# JSON array
result.items.to_json("data.json")

# JSON Lines
result.items.to_jsonl("data.jsonl")

# Access directly
for item in result.items:
    print(item)
```

### Custom Pipeline
```python
async def save_item(item):
    await database.insert(item)

result = MySpider(start_urls=urls).start()

# Process items
for item in result.items:
    await save_item(item)
```

## 10. Development Mode

Cache responses to disk for faster iteration:

```python
class MySpider(Spider):
    name = "dev"
    cache_responses = True  # Cache on first run

    async def parse(self, response: Response):
        # On subsequent runs, responses loaded from cache
        # No network requests made
        yield {"data": response.css('.item::text').get()}
```

## 11. Blocked Request Detection

```python
class MySpider(Spider):
    name = "demo"
    blocked_threshold = 0.3  # 30% blocked = blocked
    max_blocked_retries = 3

    async def parse(self, response: Response):
        # Blocked requests automatically detected
        # and retried with different approach
        yield {"data": response.css('.data::text').get()}
```

## 12. Robots.txt Compliance

```python
class MySpider(Spider):
    name = "respectful"
    robots_txt_obey = True
    # Respects:
    # - Disallow directives
    # - Crawl-delay
    # - Request-rate
    # Per-domain caching
```

## 13. Concurrency Control

```python
class MySpider(Spider):
    name = "controlled"

    # Global limit
    concurrent_requests = 5

    # Per-domain limit
    concurrent_requests_per_domain = 2

    # Delay between requests
    download_delay = 1.0
```

## 14. Complete Example

```python
from scrapling.spiders import Spider, Request, Response
from scrapling.fetchers import FetcherSession, AsyncStealthySession

class EcommerceSpider(Spider):
    name = "ecommerce"
    start_urls = ["https://example.com/category/"]

    concurrent_requests = 8
    download_delay = 0.5
    robots_txt_obey = True

    def configure_sessions(self, manager):
        manager.add("default", FetcherSession(impersonate="chrome"))
        manager.add("protected", AsyncStealthySession(headless=True), lazy=True)

    async def parse(self, response: Response):
        # Extract product links
        for product in response.css('.product-card'):
            yield {
                "name": product.css('.name::text').get(),
                "price": product.css('.price::text').get(),
                "url": product.css('a::attr(href)').get(),
            }

        # Follow pagination
        next_page = response.css('.pagination .next::attr(href)').get()
        if next_page:
            yield response.follow(next_page)

    async def parse_product(self, response: Response):
        # Detail page parsing
        yield {
            "name": response.css('.product-name::text').get(),
            "description": response.css('.description::text').get(),
            "images": response.css('.gallery img::attr(src)').getall(),
        }

# Run
result = EcommerceSpider(crawldir="./ecommerce_crawl").start()
result.items.to_jsonl("products.jsonl")
```
