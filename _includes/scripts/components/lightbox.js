(function () {
  var images = Array.prototype.filter.call(
    document.querySelectorAll('.page__content .article__content img'),
    function (img) {
      return !img.classList.contains('lightbox-ignore') && !img.closest('a');
    }
  );
  if (!images.length) return;

  var overlay = document.createElement('div');
  overlay.className = 'wf-lightbox';
  overlay.setAttribute('role', 'dialog');
  overlay.setAttribute('aria-modal', 'true');
  overlay.setAttribute('aria-label', 'Image viewer');
  overlay.hidden = true;
  overlay.innerHTML =
    '<figure class="wf-lightbox__figure">' +
      '<img class="wf-lightbox__img" alt="">' +
      '<figcaption class="wf-lightbox__caption"></figcaption>' +
    '</figure>' +
    '<p class="wf-lightbox__count" aria-live="polite"></p>' +
    '<button type="button" class="wf-lightbox__btn wf-lightbox__prev" aria-label="Previous image"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M15.5 5l-7 7 7 7"/></svg></button>' +
    '<button type="button" class="wf-lightbox__btn wf-lightbox__next" aria-label="Next image"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M8.5 5l7 7-7 7"/></svg></button>' +
    '<button type="button" class="wf-lightbox__btn wf-lightbox__close" aria-label="Close image viewer"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M6 6l12 12M18 6L6 18"/></svg></button>';
  document.body.appendChild(overlay);

  var bigImage = overlay.querySelector('.wf-lightbox__img');
  var caption = overlay.querySelector('.wf-lightbox__caption');
  var count = overlay.querySelector('.wf-lightbox__count');
  var prevButton = overlay.querySelector('.wf-lightbox__prev');
  var nextButton = overlay.querySelector('.wf-lightbox__next');
  var closeButton = overlay.querySelector('.wf-lightbox__close');
  var buttons = [prevButton, nextButton, closeButton];
  var current = 0;
  var opener = null;

  if (images.length < 2) {
    prevButton.hidden = true;
    nextButton.hidden = true;
    buttons = [closeButton];
  }

  function captionFor(img) {
    var figure = img.closest('figure');
    var figcaption = figure && figure.querySelector('figcaption');
    return figcaption ? figcaption.textContent.trim() : '';
  }

  function show(index) {
    current = (index + images.length) % images.length;
    var img = images[current];
    bigImage.src = img.currentSrc || img.src;
    bigImage.alt = img.alt;
    caption.textContent = captionFor(img);
    caption.hidden = !caption.textContent;
    count.textContent = (current + 1) + ' of ' + images.length;
  }

  function open(index) {
    opener = document.activeElement;
    show(index);
    overlay.hidden = false;
    document.documentElement.classList.add('wf-lightbox-open');
    closeButton.focus();
  }

  function close() {
    overlay.hidden = true;
    document.documentElement.classList.remove('wf-lightbox-open');
    bigImage.removeAttribute('src');
    if (opener && opener.focus) opener.focus();
  }

  images.forEach(function (img, index) {
    img.classList.add('popup-image');
    img.setAttribute('tabindex', '0');
    img.setAttribute('role', 'button');
    img.setAttribute('aria-label', 'View larger: ' + (img.alt || captionFor(img) || 'image'));
    img.addEventListener('click', function () { open(index); });
    img.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        open(index);
      }
    });
  });

  prevButton.addEventListener('click', function () { show(current - 1); });
  nextButton.addEventListener('click', function () { show(current + 1); });
  closeButton.addEventListener('click', close);

  overlay.addEventListener('click', function (event) {
    if (event.target === overlay || event.target.classList.contains('wf-lightbox__figure')) close();
  });

  document.addEventListener('keydown', function (event) {
    if (overlay.hidden) return;
    if (event.key === 'Escape') {
      event.preventDefault();
      close();
    } else if (event.key === 'ArrowLeft' && images.length > 1) {
      event.preventDefault();
      show(current - 1);
    } else if (event.key === 'ArrowRight' && images.length > 1) {
      event.preventDefault();
      show(current + 1);
    } else if (event.key === 'Tab') {
      var index = buttons.indexOf(document.activeElement);
      event.preventDefault();
      var nextIndex = event.shiftKey ? index - 1 : index + 1;
      if (index === -1) nextIndex = 0;
      buttons[(nextIndex + buttons.length) % buttons.length].focus();
    }
  });
})();
