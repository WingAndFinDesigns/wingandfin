---
title: Portfolio
excerpt: A selection of Becky's work in various styles and mediums.
lightbox: true
---

A selection of Becky's work in various styles and mediums.

<div class="portfolio-grid">
{%- for piece in site.data.portfolio %}
  <figure class="portfolio-grid__item">
    <img src="{{ '/assets/images/portfolio/' | append: piece.image | relative_url }}" alt="{{ piece.alt }}" loading="lazy">
    <figcaption>{{ piece.title }}</figcaption>
  </figure>
{%- endfor %}
</div>
