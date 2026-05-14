# Parser

> The adaptive parsing engine that survives website changes.

## 1. Overview

Scrapling's parser learns from website changes and automatically relocates elements. It provides multiple selection methods with a Parsel-compatible API.

## 2. Quick Start

```python
from scrapling.parser import Selector

# Parse HTML directly
page = Selector("<html><body><div class='quote'>...</div></body></html>")
quotes = page.css('.quote .text::text').getall()

# Or use from Fetcher response
page = Fetcher.get('https://example.com/')
elements = page.css('.item')
```

## 3. Selection Methods

### 3.1 CSS Selectors
```python
# Basic CSS
quotes = page.css('.quote')
authors = page.css('.author::text').getall()

# Chained selectors
quote_text = page.css('.quote').css('.text::text').get()

# Pseudo-elements (Scrapy/Parsel compatible)
links = page.css('a::attr(href)').getall()  # Get href attribute
text = page.css('p::text').get()             # Get text content
```

### 3.2 XPath Selectors
```python
# XPath expressions
quotes = page.xpath('//div[@class="quote"]')
text = page.xpath('//span[@class="text"]/text()')

# Combined with CSS
elements = page.xpath('//div[@class="quote"]').css('.text::text').getall()
```

### 3.3 BeautifulSoup-Style
```python
# find_all with dict
items = page.find_all('div', {'class': 'quote'})
items = page.find_all(class_='quote')

# With tag filter
items = page.find_all(['div', 'span'], class_='quote')

# find by text
quotes = page.find_by_text('quote', tag='div')
```

### 3.4 Text Search
```python
# Find elements containing text
element = page.find_by_text('Hello World')
elements = page.find_all_by_text('price', tag='span')
```

### 3.5 Regex Search
```python
import re
# Regex on text content
prices = page.find_all(re.compile(r'\$\d+\.\d{2}'))
```

## 4. Adaptive Scraping

### auto_save — Save Element Signatures
```python
# Save element structure for future recovery
products = page.css('.product', auto_save=True)

# Later, even if website changes structure,
# Scrapling can find the element by similarity
```

### adaptive — Auto-Relocate Elements
```python
# After website redesign, pass adaptive=True
products = page.css('.product', adaptive=True)

# Scrapling will:
# 1. Look for saved signature of '.product'
# 2. Find similar elements using ML similarity
# 3. Return the relocated elements
```

### find_similar — Find Similar Elements
```python
# Find elements similar to a given element
first_product = page.css('.product')[0]
similar_products = first_product.find_similar()
```

## 5. Element Navigation

### Parent/Child
```python
# Get parent
container = element.parent

# Get children
children = element.children

# Get direct children only
direct = element.css('> .child')
```

### Siblings
```python
# Next sibling
next_elem = element.next_sibling

# Previous sibling
prev_elem = element.prev_sibling

# All siblings
siblings = element.siblings

# CSS selector on sibling
author = element.next_sibling.css('.author::text')
```

### Traversal
```python
# All descendants
descendants = element.descendants

# Below elements
below = element.below_elements()

# Get root (document)
root = element.root
```

## 6. Element Attributes

```python
# Get attribute
href = element.attrib['href']  # or element['href']
href = element.attrib.get('href', 'default')

# Get all attributes
attrs = element.attrib

# Check attribute exists
if 'href' in element.attrib:
    ...
```

## 7. Text Content

```python
# Get text (with cleanup)
text = element.get()          # First match
texts = element.getall()      # All matches

# Get raw text (preserves whitespace)
raw = element.getraw()

# Regex on text
matches = element.re(r'\d+\.\d{2}')

# Clean text
clean = element.re_first(r'\d+\.\d{2}', default='0.00')
```

## 8. Serialization

### Fast JSON (10x stdlib)
```python
# Serialize single element
json_str = element.to_json()

# Serialize all matching elements
json_str = page.css('.item').to_json()

# JSON lines format
jsonl = page.css('.item').to_jsonl()
```

### Other Formats
```python
# Dictionary
data = element.to_dict()

# XML
xml = element.to_xml()

# URL-encoded
encoded = element.to_urlencoded()
```

## 9. Selector Generation

Generate robust CSS/XPath selectors for any element:

```python
# Generate CSS selector
css = element.css_selectors()

# Generate XPath
xpath = element.xpath_selectors()

# Get best selector (shortest unique)
selector = element.selector()
```

## 10. Performance

### Benchmark Results

**Text Extraction (5000 nested elements):**

| Library | Time (ms) | vs Scrapling |
|---------|-----------|--------------|
| Scrapling | 2.02 | 1.0x |
| Parsel/Scrapy | 2.04 | 1.01x |
| Raw Lxml | 2.54 | 1.26x |
| PyQuery | 24.17 | ~12x |
| Selectolax | 82.63 | ~41x |
| BS4 + Lxml | 1584.31 | ~784x |

**Element Similarity Search:**

| Library | Time (ms) | vs Scrapling |
|---------|-----------|--------------|
| Scrapling | 2.39 | 1.0x |
| AutoScraper | 12.45 | 5.2x |

## 11. Complete Example

```python
from scrapling.fetchers import Fetcher

# Fetch with adaptive parsing
page = Fetcher.get('https://quotes.toscrape.com/')

# Extract all quotes
for quote in page.css('.quote'):
    text = quote.css('.text::text').get()
    author = quote.css('.author::text').get()
    tags = quote.css('.tag::text').getall()

    # Find similar quotes
    similar = quote.find_similar()

    print(f"{text} — {author} [{', '.join(tags)}]")
```
