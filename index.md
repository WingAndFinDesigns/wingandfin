---
title: Home
show_title: false
---

<img class="site-logo" src="{{ '/assets/images/logo.png' | relative_url }}" alt="Wing &amp; Fin Designs">

<p class="intro"><a href="{{ '/about/' | relative_url }}">Becky Finch</a> of Wing &amp; Fin Designs is a painter and cartoonist who creates works of art with a focus on birds and fish. All products in the <a href="{{ site.social.shop }}">shop</a> are hand drawn by Becky and include stickers, paintings, bookmarks, mugs and greeting cards.</p>

## Latest News

{% assign latest_news = site.categories.news | slice: 0, 3 %}
{% include article-list.html articles=latest_news type='item' show_info=true show_excerpt=true show_readmore=true %}

[All news &rarr;]({{ '/news/' | relative_url }})
