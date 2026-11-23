'use strict';
const { LANG_LABELS } = require('./defaults');

/* ---------------- helpers ---------------- */
const esc = (s) =>
  String(s ?? '').replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
// *italic*, **bold**, line breaks
const inline = (s) =>
  esc(s)
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    .replace(/\n/g, '<br>');
const rich = (s) =>
  String(s ?? '')
    .split(/\n{2,}/)
    .filter((p) => p.trim())
    .map((p) => '<p>' + inline(p.trim()) + '</p>')
    .join('');
const plain = (s) => String(s ?? '').replace(/\*/g, '');
const tr = (obj, lang) => (obj && typeof obj === 'object' ? obj[lang] || obj.en || Object.values(obj).find(Boolean) || '' : obj || '');
const pad = (n) => String(n).padStart(2, '0');
const attr = (s) => esc(s);
const ICON = {
  out: '<svg class="ico" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 3h8v8M13 3 3 13" fill="none" stroke="currentColor" stroke-width="1.2"/></svg>',
  whatsapp: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm0 18.2a8.2 8.2 0 0 1-4.2-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8s-.4-.1-.6.1l-.8 1c-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4.2-.4.7-1.4.1-.2 0-.3 0-.4l-.8-1.8c-.2-.5-.4-.4-.6-.4h-.5a1 1 0 0 0-.7.3 3 3 0 0 0-.9 2.2 5.2 5.2 0 0 0 1.1 2.7 11.8 11.8 0 0 0 4.6 4c1.7.7 2.3.8 3.2.6a2.7 2.7 0 0 0 1.8-1.2 2.2 2.2 0 0 0 .1-1.3c0-.1-.2-.2-.4-.3Z"/></svg>',
  telegram: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M21.9 4.3 18.7 19.5c-.2 1-.9 1.3-1.7.8l-4.8-3.6-2.3 2.2c-.3.3-.5.5-1 .5l.3-4.9 8.9-8c.4-.3-.1-.5-.6-.2L6.5 13.2 1.8 11.7c-1-.3-1-1 .2-1.5l18.5-7.1c.9-.3 1.6.2 1.4 1.2Z"/></svg>',
  phone: '<svg viewBox="0 0 24 24" aria-hidden="true"><path fill="currentColor" d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1A17 17 0 0 1 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.3.2 2.5.6 3.6.1.3 0 .7-.2 1l-2.3 2.2Z"/></svg>',
};
const isVideo = (u) => /\.(mp4|webm|mov|m4v)(\?|$)/i.test(u || '');

function fontsHref(f) {
  const fam = (name, axes) => (name ? 'family=' + encodeURIComponent(name.trim()).replace(/%20/g, '+') + (axes ? ':' + axes : '') : '');
  const parts = [fam(f.heading, f.headingAxes), fam(f.body, f.bodyAxes), fam(f.fallback, f.fallbackAxes)].filter(Boolean);
  const unique = [...new Set(parts)];
  return unique.length ? 'https://fonts.googleapis.com/css2?' + unique.join('&') + '&display=swap' : '';
}

/* ---------------- layout ---------------- */
function layout(ctx, { title, titleOverride, description, body, path = '', ogImage, transparentHeader = false, noindex = false }) {
  const { lang, c, s } = ctx;
  const th = s.theme;
  const col = th.colors;
  const fonts = th.fonts;
  const base = ctx.baseUrl;
  const fullTitle = titleOverride ? plain(titleOverride) : title ? plain(title) + (c.meta.titleSuffix || '') : plain(c.meta.siteName);
  const langs = s.languages.enabled;
  const fh = `"${fonts.heading}", "Cormorant Garamond", Garamond, serif`;
  const fb = `"${fonts.body}"${fonts.fallback ? `, "${fonts.fallback}"` : ''}, "Helvetica Neue", Arial, sans-serif`;
  const og = ogImage || s.media.ogImage;
  const nav = navItems(ctx);
  const href = fontsHref(fonts);

  return `<!doctype html>
<html lang="${lang === 'uk' ? 'uk' : lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(fullTitle)}</title>
<meta name="description" content="${attr(plain(description || c.home.seo.description))}">
${noindex || s.seo.noindex ? '<meta name="robots" content="noindex">' : ''}
<link rel="canonical" href="${attr(base + '/' + lang + path)}">
${langs.map((l) => `<link rel="alternate" hreflang="${l}" href="${attr(base + '/' + l + path)}">`).join('\n')}
<link rel="alternate" hreflang="x-default" href="${attr(base + '/' + s.languages.default + path)}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${attr(c.meta.siteName)}">
<meta property="og:title" content="${attr(fullTitle)}">
<meta property="og:description" content="${attr(plain(description || c.home.seo.description))}">
${og ? `<meta property="og:image" content="${attr(og.startsWith('http') ? og : base + og)}">` : ''}
<meta name="theme-color" content="${attr(col.bg)}">
<link rel="icon" href="${attr(th.logo)}">
${href ? `<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link rel="stylesheet" href="${attr(href)}">` : ''}
<style>:root{--bg:${col.bg};--bg2:${col.bg2};--ink:${col.ink};--sand:${col.sand};--stone:${col.stone};--white:${col.white};--fh:${fh};--fb:${fb};--hcase:${th.headingCase === 'none' ? 'none' : 'uppercase'};--hscale:${Number(th.headingScale) || 1};--logo-h:${Number(th.logoHeight) || 56}px;--sp:${{ compact: 0.6, normal: 0.8, airy: 1 }[th.spacing] || 0.8}}</style>
<link rel="stylesheet" href="/assets/css/site.css?v=${ctx.version}">
${th.customCss ? `<style>${th.customCss.replace(/<\/style/gi, '')}</style>` : ''}
${s.seo.customHead || ''}
</head>
<body class="${th.animations === false ? 'no-anim' : 'anim'}">
${th.animations === false ? '' : '<div class="progress" aria-hidden="true"><span id="progress"></span></div>'}
${ctx.preview ? `<div class="pbar">Ви бачите сайт як адміністратор: чернетки позначені «Чернетка» і відвідувачам не показуються · <a href="/admin">Адмін-панель</a></div>` : ''}
<a class="skip" href="#main">${esc(c.ui.skip)}</a>
<header class="hdr" id="hdr">
  <div class="hdr__in">
    <nav class="hdr__nav hdr__nav--l" aria-label="Main">
      ${nav.slice(0, 3).map((n) => `<a href="${n.href}"${ctx.active === n.key ? ' aria-current="page"' : ''}>${esc(n.label)}</a>`).join('')}
    </nav>
    <a class="hdr__logo" href="/${lang}/" aria-label="${attr(c.meta.siteName)}"><img src="${attr(th.logo)}" alt="${attr(c.meta.siteName)}"></a>
    <div class="hdr__right">
      <nav class="hdr__nav hdr__nav--r" aria-label="More">${nav.slice(3).map((n) => `<a href="${n.href}"${ctx.active === n.key ? ' aria-current="page"' : ''}>${esc(n.label)}</a>`).join('')}</nav>
      ${langs.length > 1 ? `<div class="langs">${langs.map((l) => `<a href="/${l}${path}" hreflang="${l}"${l === lang ? ' aria-current="true"' : ''}>${LANG_LABELS[l]}</a>`).join('')}</div>` : ''}
      <a class="btn btn--line btn--sm hdr__cta" href="/${lang}/enquire">${esc(c.nav.enquire)}</a>
      <button class="burger" id="burger" aria-expanded="false" aria-controls="drawer"><span></span><span></span><span class="sr">${esc(c.nav.menu)}</span></button>
    </div>
  </div>
</header>
<div class="drawer" id="drawer" hidden>
  <nav aria-label="Mobile">
    ${nav.map((n) => `<a href="${n.href}">${esc(n.label)}</a>`).join('')}
    <a href="/${lang}/enquire">${esc(c.nav.enquire)}</a>
  </nav>
  ${langs.length > 1 ? `<div class="langs langs--drawer">${langs.map((l) => `<a href="/${l}${path}"${l === lang ? ' aria-current="true"' : ''}>${LANG_LABELS[l]}</a>`).join('')}</div>` : ''}
  <div class="drawer__contact">${contactLines(ctx)}</div>
</div>
<main id="main">
${body}
</main>
${footer(ctx)}
${floatButton(ctx)}
${s.cookieBanner ? `<div class="cookie" id="cookie" hidden><p>${esc(c.ui.cookieText)} <a href="/${lang}/cookie-policy">${esc(c.footer.cookies)}</a></p><button class="btn btn--solid btn--sm" id="cookieOk">${esc(c.ui.cookieAccept)}</button></div>` : ''}
<script src="/assets/js/site.js?v=${ctx.version}" defer></script>
</body>
</html>`;
}

function contactLines(ctx) {
  const k = ctx.s.contacts;
  const out = [];
  if (k.phone) out.push(`<a href="tel:${attr(k.phone.replace(/[^\d+]/g, ''))}">${esc(k.phone)}</a>`);
  if (k.email) out.push(`<a href="mailto:${attr(k.email)}">${esc(k.email)}</a>`);
  if (k.instagramUrl) out.push(`<a href="${attr(k.instagramUrl)}" target="_blank" rel="noopener">@${esc(k.instagramHandle || 'instagram')}</a>`);
  return out.join('');
}

function footer(ctx) {
  const { lang, c, s } = ctx;
  const co = s.company;
  const year = new Date().getFullYear();
  return `<footer class="ftr">
  <div class="wrap">
    <div class="ftr__top">
      <div class="ftr__brand">
        <img src="${attr(s.theme.logo)}" alt="${attr(c.meta.siteName)}">
        <p>${esc(c.footer.tagline)}</p>
      </div>
      <div class="ftr__col"><h4>${esc(c.footer.explore)}</h4>${navItems(ctx).map((n) => `<a href="${n.href}">${esc(n.label)}</a>`).join('')}<a href="/${lang}/approach">${esc(c.nav.approach)}</a><a href="/${lang}/faq">${esc(c.nav.faq)}</a><a href="/${lang}/enquire">${esc(c.nav.enquire)}</a></div>
      <div class="ftr__col"><h4>${esc(c.footer.services)}</h4>${c.services.map((sv) => `<a href="/${lang}/services/${attr(sv.slug)}">${esc(sv.title)}</a>`).join('')}</div>
      <div class="ftr__col"><h4>${esc(c.footer.contact)}</h4>${contactLines(ctx)}<span>${esc(c.contactPage.direct.studioValue)}</span></div>
    </div>
    <div class="ftr__bottom">
      <span>© ${year} ${esc(c.meta.siteName)}. ${esc(c.footer.rights)}${co.legalName ? ' · ' + esc(co.legalName) : ''}${co.nip ? ' · NIP ' + esc(co.nip) : ''}${co.address ? ' · ' + esc(co.address) : ''}</span>
      <span class="ftr__legal"><a href="/${lang}/privacy-policy">${esc(c.footer.privacy)}</a><a href="/${lang}/cookie-policy">${esc(c.footer.cookies)}</a><a href="/${lang}/terms">${esc(c.footer.terms)}</a></span>
    </div>
  </div>
</footer>`;
}

/* ---------------- shared blocks ---------------- */
const btn = (href, label, kind = 'solid') => (label ? `<a class="btn btn--${kind}" href="${attr(href)}">${esc(label)}</a>` : '');
const eyebrow = (t) => (t ? `<p class="eyebrow">${esc(t)}</p>` : '');

function pageHero(ctx, h, { image, cta } = {}) {
  if (!h) return '';
  if (image)
    return `<section class="psplit">
  <div class="psplit__panel"><div class="psplit__inner">
    ${eyebrow(h.eyebrow)}
    <h1 class="h3__title h3__title--page">${inline(h.title)}</h1>
    ${h.subtitle ? `<p class="h3__lead">${inline(h.subtitle)}</p>` : ''}
    ${(cta || '').replace(/btn--solid/g, 'btn--dark')}
  </div></div>
  <div class="psplit__media">${isVideo(image) ? `<video src="${attr(image)}" autoplay muted loop playsinline></video>` : `<img src="${attr(image)}" alt="" fetchpriority="high">`}</div>
</section>`;
  return `<section class="phero">
  <div class="wrap phero__in">
    ${eyebrow(h.eyebrow)}
    <h1 class="h-xl">${inline(h.title)}</h1>
    ${h.subtitle ? `<p class="lead">${inline(h.subtitle)}</p>` : ''}
    ${cta || ''}
  </div>
</section>`;
}

function mediaBg(url, poster) {
  if (isVideo(url))
    return `<video class="bgm" src="${attr(url)}" ${poster ? `poster="${attr(poster)}"` : ''} autoplay muted loop playsinline preload="metadata"></video>`;
  return `<img class="bgm" src="${attr(url)}" alt="" fetchpriority="high">`;
}

function ctaBand(ctx, cta, href) {
  if (!cta || !cta.title) return '';
  const img = ctx.s.media.ctaImage;
  return `<section class="ctab${img ? ' ctab--img' : ''}">
  ${img ? mediaBg(img) : ''}
  <div class="wrap ctab__in">
    <h2 class="h-l">${inline(cta.title)}</h2>
    ${cta.text ? `<p class="lead">${inline(cta.text)}</p>` : ''}
    ${btn(href || `/${ctx.lang}/enquire`, cta.button, 'solid')}
  </div>
</section>`;
}

function numberedList(items, cls = '') {
  return `<ol class="nlist ${cls}">${(items || [])
    .map((it, i) => `<li><span class="nlist__n">${pad(i + 1)}</span><div><h3 class="h-s">${inline(it.title)}</h3>${it.text ? `<p>${inline(it.text)}</p>` : ''}</div></li>`)
    .join('')}</ol>`;
}

function packageCards(ctx, full) {
  const { lang, c } = ctx;
  return `<div class="pkg-grid">${c.packagesPage.packages
    .map(
      (p) => `<article class="pkg" id="${attr(p.key)}">
      <h3 class="pkg__name">${esc(p.name)}</h3>
      <p class="pkg__sub">${inline(p.subtitle)}</p>
      ${full ? `<p class="pkg__text">${inline(p.text)}</p><p class="pkg__inc">${esc(p.includesTitle)}</p><ul class="ticks">${(p.includes || []).map((x) => `<li>${inline(x)}</li>`).join('')}</ul>` : ''}
      ${btn(`/${lang}/enquire?package=${encodeURIComponent(p.key)}`, full ? p.cta : c.nav.enquire, 'line')}
    </article>`
    )
    .join('')}</div>`;
}

function floatButton(ctx) {
  const k = ctx.s.contacts;
  const type = k.showWhatsappButton === false ? 'none' : k.floatButton || 'whatsapp';
  const digits = (v) => String(v || '').replace(/\D/g, '');
  let href = '';
  if (type === 'whatsapp' && (k.whatsapp || k.phone)) href = 'https://wa.me/' + digits(k.whatsapp || k.phone);
  if (type === 'telegram' && k.telegram) href = 'https://t.me/' + String(k.telegram).replace(/^@|https?:\/\/t\.me\//g, '');
  if (type === 'phone' && k.phone) href = 'tel:+' + digits(k.phone);
  if (!href) return '';
  const label = { whatsapp: 'WhatsApp', telegram: 'Telegram', phone: 'Call' }[type];
  return `<a class="wa wa--${type}" href="${attr(href)}"${type === 'phone' ? '' : ' target="_blank" rel="noopener"'} aria-label="${label}">${ICON[type]}</a>`;
}

function navItems(ctx) {
  const { lang, c, s } = ctx;
  const items = [
    { key: 'business', href: `/${lang}/services#business`, label: c.nav.business },
    { key: 'private', href: `/${lang}/services#private`, label: c.nav.private },
    { key: 'portfolio', href: `/${lang}/portfolio`, label: c.nav.cases },
    { key: 'packages', href: `/${lang}/packages`, label: c.nav.packages },
    { key: 'about', href: `/${lang}/about`, label: c.nav.about },
  ];
  if (s.calculator.enabled) items.push({ key: 'calculator', href: `/${lang}/estimate`, label: c.nav.prices });
  return items;
}

function mediaTag(url, cls = '', lazy = true) {
  if (!url) return '';
  if (isVideo(url)) return `<video class="${cls}" src="${attr(url)}" muted loop playsinline autoplay preload="metadata"></video>`;
  return `<img class="${cls}" src="${attr(url)}" alt="" ${lazy ? 'loading="lazy"' : 'fetchpriority="high"'} decoding="async">`;
}
const draftBadge = (x) => (x && x._draft ? '<span class="draft">Чернетка</span>' : '');

function serviceCards(ctx, list) {
  const { lang, c, s } = ctx;
  list = list || c.services;
  return `<div class="svc-grid svc-grid--${Math.min(list.length, 4)}">${list
    .map((sv, i) => {
      const img = s.media.serviceImages[sv.slug];
      return `<a class="svc${img ? ' svc--img' : ''}" href="/${lang}/services/${attr(sv.slug)}">
        ${mediaTag(img)}
        <span class="svc__n">${pad(i + 1)}</span>
        <span class="svc__body"><span class="svc__t">${esc(sv.title)}</span><span class="svc__d">${esc(sv.short)}</span><span class="svc__more">${esc(c.common.explore)} →</span></span>
      </a>`;
    })
    .join('')}</div>`;
}

function serviceRows(ctx, group) {
  const { lang, c, s } = ctx;
  return `<ul class="srows">${c.services
    .filter((sv) => (sv.group || 'private') === group)
    .map(
      (sv) => `<li><a href="/${lang}/services/${attr(sv.slug)}">
        <span class="srows__img">${mediaTag(s.media.serviceImages[sv.slug])}</span>
        <span class="srows__t">${esc(sv.title)}</span>
        <span class="srows__d">${esc(sv.short)}</span>
        <span class="srows__a" aria-hidden="true">→</span></a></li>`
    )
    .join('')}</ul>`;
}

function projectMeta(ctx, p) {
  const { lang, c } = ctx;
  const sv = c.services.find((x) => x.slug === p.category);
  return [sv ? sv.title : '', p.location].filter(Boolean).join(' · ');
}

function projectCards(ctx, list, rail = false) {
  const { lang, c } = ctx;
  const pp = c.portfolioPage;
  return `<div class="${rail ? 'rail' : 'prj-grid'}">${list
    .map((p) => {
      const prep = tr(p.prep, lang);
      return `<a class="prj" href="/${lang}/portfolio/${attr(p.slug)}" data-cat="${attr(p.category || '')}">
        <span class="prj__img">${mediaTag(p.cover)}<span class="prj__kind">${esc(p.kind === 'case' ? pp.kindCase : pp.kindConcept)}</span>${draftBadge(p)}</span>
        <span class="prj__meta">${esc(projectMeta(ctx, p))}</span>
        <span class="prj__t">${inline(tr(p.title, lang))}</span>
        <span class="prj__nums">${p.guests ? `<span><b>${esc(p.guests)}</b> ${esc(c.home.cases.guests)}</span>` : ''}${prep ? `<span><b>${esc(prep)}</b> ${esc(pp.prepLabel.toLowerCase())}</span>` : ''}</span>
      </a>`;
    })
    .join('')}</div>`;
}

function testimonialsBlock(ctx, head) {
  const list = ctx.testimonials;
  if (!list.length) return '';
  const bg = ctx.s.media.ctaImage;
  return `<section class="notes">
  ${bg ? mediaBg(bg) : ''}
  <div class="wrap notes__in">
    <div class="notes__head">${eyebrow(head.eyebrow)}<h2 class="h-l">${inline(head.title)}</h2></div>
    <div class="notes__track">${list
      .map(
        (t) => `<figure class="note">
        ${draftBadge(t)}
        <span class="note__stars" aria-hidden="true">✦ ✦ ✦ ✦ ✦</span>
        <blockquote>${rich(tr(t.text, ctx.lang))}</blockquote>
        <figcaption>${t.photo ? `<img src="${attr(t.photo)}" alt="" loading="lazy">` : ''}<span><b>${esc(t.name)}</b>${tr(t.event, ctx.lang) ? `<br>${esc(tr(t.event, ctx.lang))}` : ''}</span></figcaption>
      </figure>`
      )
      .join('')}</div>
  </div>
</section>`;
}

function teamBlock(ctx, head, cls = '') {
  const list = ctx.team;
  if (!list.length) return '';
  return `<section class="sec ${cls}">
  <div class="wrap">
    <div class="split split--head">${`<div>${eyebrow(head.eyebrow)}<h2 class="h-l">${inline(head.title)}</h2></div>`}${head.text ? `<p class="lead">${inline(head.text)}</p>` : ''}</div>
    <div class="team">${list
      .map(
        (m) => `<figure class="member">
        <span class="member__img">${m.photo ? mediaTag(m.photo) : `<span class="member__ph">${esc((m.name || 'S').replace(/[\[\]]/g, '').charAt(0))}</span>`}${draftBadge(m)}</span>
        <figcaption><b>${esc(m.name)}</b><span>${esc(tr(m.role, ctx.lang))}</span></figcaption>
      </figure>`
      )
      .join('')}</div>
  </div>
</section>`;
}

function statsBlock(ctx, st, cls = '') {
  if (!st || !st.items || !st.items.length) return '';
  return `<section class="stats ${cls}"><div class="wrap">
    ${eyebrow(st.eyebrow)}
    <dl class="stats__grid">${st.items.map((x) => `<div><dt>${esc(x.value)}</dt><dd>${inline(x.label)}</dd></div>`).join('')}</dl>
  </div></section>`;
}

function galleryBlock(ctx, imgs, head) {
  imgs = (imgs || []).filter(Boolean);
  if (!imgs.length) return '';
  const k = ctx.s.contacts;
  return `<section class="sec sec--ink">
  <div class="wrap">
    ${head ? `<div class="split split--head"><div>${eyebrow(head.eyebrow)}<h2 class="h-l">${inline(head.title)}</h2></div>${k.instagramUrl ? `<p class="lead"><a class="link link--ico" href="${attr(k.instagramUrl)}" target="_blank" rel="noopener">${esc(head.caption)} · @${esc(k.instagramHandle)} ${ICON.out}</a></p>` : ''}</div>` : ''}
    <div class="gal">${imgs.map((g, i) => (isVideo(g) ? `<div class="gal__i gal__i--${i % 6}">${mediaTag(g)}</div>` : `<a class="gal__i gal__i--${i % 6}" href="${attr(g)}" data-lightbox>${mediaTag(g)}</a>`)).join('')}</div>
  </div>
</section>`;
}

function marquee(text, cls = '') {
  const items = String(text || '').split('·').map((x) => x.trim()).filter(Boolean);
  if (!items.length) return '';
  const row = items.map((x) => `<span>${esc(x)}</span><i aria-hidden="true">✦</i>`).join('');
  return `<div class="marquee ${cls}" aria-label="${attr(items.join(', '))}"><div class="marquee__track" aria-hidden="true">${row}${row}</div></div>`;
}

/* ---------------- pages ---------------- */
/* Each home block can override background, text and heading colours and its top/bottom spacing (admin → Дизайн). */
function blockWrap(ctx, key, html) {
  if (!html) return '';
  const st = (ctx.s.blockStyles || {})[key] || {};
  const css = [];
  const data = [];
  const color = (v) => /^#[0-9a-f]{3,8}$/i.test(String(v || '').trim()) ? String(v).trim() : '';
  const px = (v) => (v === '' || v === null || v === undefined || isNaN(Number(v)) ? '' : Math.max(0, Math.min(400, Number(v))) + 'px');
  if (color(st.bg)) { css.push('--blk-bg:' + color(st.bg)); data.push('data-bg'); }
  if (color(st.fg)) { css.push('--blk-fg:' + color(st.fg)); data.push('data-fg'); }
  if (color(st.head)) { css.push('--blk-hd:' + color(st.head)); data.push('data-hd'); }
  if (px(st.padTop)) { css.push('--blk-pt:' + px(st.padTop)); data.push('data-pt'); }
  if (px(st.padBottom)) { css.push('--blk-pb:' + px(st.padBottom)); data.push('data-pb'); }
  return `<div class="blk" id="b-${attr(key)}" ${data.join(' ')}${css.length ? ` style="${css.join(';')}"` : ''}>${html}</div>`;
}

function home(ctx) {
  const { lang, c, s } = ctx;
  const h = c.home;
  const m = s.media;
  const g = (m.gallery || []).filter(Boolean);
  const col = (m.heroCollage || []).filter(Boolean);
  const pic = (i) => col[i] || g[i] || m.heroImage;
  const faqItems = (c.faqPage.items || []).slice(0, 6);
  const featured = ctx.projects.filter((p) => p.featured !== false);
  const svcByGroup = (grp) => c.services.filter((sv) => (sv.group || 'private') === grp);
  const svcCard = (sv, i) => `<a class="scard" href="/${lang}/services/${attr(sv.slug)}">
      <span class="scard__img">${mediaTag(s.media.serviceImages[sv.slug])}</span>
      <span class="scard__t"><sup>${pad(i + 1)}</sup>${esc(sv.title)}</span>
      <span class="scard__d">${esc(sv.short)}</span></a>`;

  const small = (k) => (s.theme.smallPhotos === false ? '' : (m.small || {})[k] || '');
  const blocks = {
    statement: () => `<section class="band">
      <div class="wrap band__in">
        <p class="band__text">${inline(h.statement && h.statement.text)}</p>
        ${small('band') ? `<figure class="band__pic">${mediaTag(small('band'))}</figure>` : ''}
      </div>
    </section>`,
    about: () => `<section class="split2">
      <div class="split2__media">${mediaTag(m.aboutImage || pic(1))}</div>
      <div class="split2__panel">
        ${eyebrow(h.about.eyebrow)}
        <h2 class="h-big">${inline(h.about.title)}</h2>
        <p class="split2__text">${inline(h.about.text)}</p>
        <ul class="lines">${c.services.map((sv) => `<li><a href="/${lang}/services/${attr(sv.slug)}">${esc(sv.title)}</a></li>`).join('')}</ul>
        <a class="arrow-link" href="/${lang}/about"><span>⟶</span> <em>${esc(h.about.link)}</em></a>
        ${small('about') ? `<figure class="tilt tilt--r">${mediaTag(small('about'))}</figure>` : ''}
      </div>
    </section>`,
    whatWeDo: () => `<section class="svc3">
      <div class="wrap">
        <p class="eyebrow center">${esc(h.whatWeDo.eyebrow)}</p>
        <h2 class="h-big center">${inline(h.whatWeDo.title)}</h2>
        <div class="svc3__group" id="business"><p class="svc3__label"><em>${esc(h.whatWeDo.business)}</em><span>${inline(h.whatWeDo.businessText)}</span></p><div class="scards">${svcByGroup('business').map(svcCard).join('')}</div></div>
        <div class="svc3__group" id="private"><p class="svc3__label"><em>${esc(h.whatWeDo.private)}</em><span>${inline(h.whatWeDo.privateText)}</span></p><div class="scards">${svcByGroup('private').map(svcCard).join('')}</div></div>
        <p class="center"><a class="arrow-link" href="/${lang}/packages"><span>⟶</span> <em>${esc(c.nav.packages)}</em></a></p>
      </div>
    </section>`,
    stats: () => statsBlock(ctx, h.stats, 'stats--light'),
    cases: () =>
      featured.length
        ? `<section class="cases3">
      <div class="wrap cases3__head">
        <div>${eyebrow(h.cases.eyebrow)}<h2 class="h-big">${inline(h.cases.title)}</h2></div>
        <div><p class="split2__text">${inline(h.cases.text)}</p><a class="arrow-link" href="/${lang}/portfolio"><span>⟶</span> <em>${esc(h.cases.cta)}</em></a></div>
      </div>
      <div class="rail-wrap">${projectCards(ctx, featured, true)}</div>
    </section>`
        : '',
    process: () => `<section class="split2 split2--rev">
      <div class="split2__panel">
        ${eyebrow(h.process.eyebrow)}
        <h2 class="h-big">${inline(h.process.title)}</h2>
        <ol class="steps3">${h.process.items.map((it, i) => `<li><sup>${pad(i + 1)}</sup><div><em>${esc(it.title)}</em><p>${inline(it.text)}</p></div></li>`).join('')}</ol>
        <a class="arrow-link" href="/${lang}/approach"><span>⟶</span> <em>${esc(h.process.cta)}</em></a>
      </div>
      <div class="split2__media">${mediaTag(pic(3))}${small('process') ? `<figure class="tilt tilt--l">${mediaTag(small('process'))}</figure>` : ''}</div>
    </section>`,
    gallery: () => galleryBlock(ctx, g, h.gallery),
    testimonials: () => testimonialsBlock(ctx, h.testimonials),
    why: () => `<section class="why3">
      <div class="wrap">${eyebrow(h.why.eyebrow)}<h2 class="h-big">${inline(h.why.title)}</h2>
        <ol class="why3__grid">${h.why.items.map((it, i) => `<li><span class="why3__n">${pad(i + 1)}</span><h3><em>${esc(it.title)}</em></h3><p>${inline(it.text)}</p></li>`).join('')}</ol>
      </div>
    </section>`,
    team: () => teamBlock(ctx, h.team, 'sec--bark'),
    packages: () => `<section class="sec sec--sand">
      <div class="wrap">${eyebrow(h.packages.eyebrow)}<h2 class="h-big">${inline(h.packages.title)}</h2><p class="lead">${inline(h.packages.text)}</p>${packageCards(ctx, false)}
      <p class="center"><a class="arrow-link" href="/${lang}/packages"><span>⟶</span> <em>${esc(h.packages.cta)}</em></a></p></div>
    </section>`,
    calculator: () =>
      s.calculator.enabled
        ? `<section class="band band--calc">
      <div class="wrap band__in">
        <div>${eyebrow(h.calculator.eyebrow)}<h2 class="h-big">${inline(h.calculator.title)}</h2></div>
        <div><p class="split2__text">${inline(h.calculator.text)}</p>${btn(`/${lang}/estimate`, h.calculator.cta, 'solid')}</div>
      </div>
    </section>`
        : '',
    faq: () =>
      faqItems.length
        ? `<section class="sec">
      <div class="wrap split">
        <div>${eyebrow(h.faq.eyebrow)}<h2 class="h-big">${inline(h.faq.title)}</h2><a class="arrow-link" href="/${lang}/faq"><span>⟶</span> <em>${esc(h.faq.cta)}</em></a></div>
        <div class="faq">${faqItems.map((it) => `<details><summary>${esc(it.q)}</summary><div class="prose">${rich(it.a)}</div></details>`).join('')}</div>
      </div>
    </section>`
        : '',
    partners: () => (h.partners && h.partners.items.length ? `<section class="partners"><p class="eyebrow center">${esc(h.partners.eyebrow)}</p>${marquee(h.partners.items.join(' · '), 'marquee--big')}</section>` : ''),
    cta: () => ctaBand(ctx, h.cta),
  };

  const big = m.heroVideo || pic(0);
  const hero = `<section class="h3">
    <div class="h3__panel">
      <div class="h3__inner">
        ${eyebrow(h.hero.eyebrow)}
        <h1 class="h3__title">${inline(h.hero.title)}</h1>
        <p class="h3__script"><em>${esc(h.hero.script || '')}</em></p>
        <p class="h3__lead">${inline(h.hero.subtitle)}</p>
        <div class="btns">${btn(`/${lang}/enquire`, h.hero.ctaPrimary, 'dark')}${btn(`/${lang}/portfolio`, h.hero.ctaSecondary, 'line-dark')}</div>
      </div>
      ${small('heroA') ? `<figure class="h3__float h3__float--a">${mediaTag(small('heroA'), '', false)}</figure>` : ''}
      ${small('heroB') ? `<figure class="h3__float h3__float--b">${mediaTag(small('heroB'), '', false)}</figure>` : ''}
    </div>
    <div class="h3__media">${isVideo(big) ? `<video src="${attr(big)}" autoplay muted loop playsinline${m.heroImage ? ` poster="${attr(m.heroImage)}"` : ''}></video>` : `<img src="${attr(big)}" alt="" fetchpriority="high">`}</div>
  </section>
  ${marquee(h.marquee)}`;

  const body = blockWrap(ctx, 'hero', hero) + s.homeSections.filter((x) => x.on && blocks[x.key]).map((x) => blockWrap(ctx, x.key, blocks[x.key]())).join('\n');
  return layout(ctx, { title: '', description: h.seo.description, body, path: '/', titleOverride: h.seo.title, ogImage: m.heroImage });
}

function about(ctx) {
  const { lang, c, s } = ctx;
  const a = c.about;
  const founder = s.media.founderImage;
  const body = `${pageHero(ctx, a.hero, { image: s.media.aboutImage })}
  <section class="sec"><div class="wrap split split--img">
    <div><h2 class="h-l">${inline(a.story.title)}</h2><div class="prose">${rich(a.story.text)}</div>${a.story.signature ? `<p class="sig">${esc(a.story.signature)}</p>` : ''}</div>
    <div class="frame">${mediaTag(founder || s.media.brandImage)}</div>
  </div></section>
  <section class="sec sec--ink"><div class="wrap">${eyebrow(a.essence.eyebrow)}<div class="essence"><p class="statement">${inline(a.essence.mission)}</p><p class="statement statement--sm">${inline(a.essence.vision)}</p></div></div></section>
  ${statsBlock(ctx, { eyebrow: a.stats.eyebrow, items: c.home.stats.items })}
  <section class="sec"><div class="wrap">${eyebrow(a.values.eyebrow)}<ol class="why why--5">${a.values.items.map((it, i) => `<li><span class="why__n">${pad(i + 1)}</span><h3 class="h-s">${inline(it.title)}</h3><p>${inline(it.text)}</p></li>`).join('')}</ol></div></section>
  ${teamBlock(ctx, a.team, 'sec--bark')}
  <section class="sec sec--sand"><div class="wrap split"><div><h2 class="h-l">${inline(a.manager.title)}</h2></div><div class="prose">${rich(a.manager.text)}</div></div></section>
  ${galleryBlock(ctx, (s.media.gallery || []).slice(0, 6), null)}
  ${ctaBand(ctx, a.cta)}`;
  return layout(ctx, { title: a.seo.title, description: a.seo.description, body, path: '/about', transparentHeader: !!s.media.aboutImage });
}

function servicesIndex(ctx) {
  const { c } = ctx;
  const p = c.servicesPage;
  const grp = (g) => c.services.filter((sv) => (sv.group || 'private') === g);
  const body = `${pageHero(ctx, p.hero)}
  <section class="sec sec--bark" id="business"><div class="wrap"><div class="split split--head"><h2 class="h-l">${inline(p.businessTitle)}</h2><p class="lead">${inline(p.businessText)}</p></div>${serviceCards(ctx, grp('business'))}</div></section>
  <section class="sec" id="private"><div class="wrap"><div class="split split--head"><h2 class="h-l">${inline(p.privateTitle)}</h2><p class="lead">${inline(p.privateText)}</p></div>${serviceCards(ctx, grp('private'))}</div></section>
  <section class="sec sec--ink"><div class="wrap split"><div><h2 class="h-l">${inline(p.fullService.title)}</h2></div><div class="prose">${rich(p.fullService.text)}</div></div></section>
  <section class="sec sec--sand"><div class="wrap"><h2 class="h-l">${inline(p.extras.title)}</h2><p class="lead">${inline(p.extras.text)}</p>
    <div class="cols3">${p.extras.items.map((it) => `<div class="cell"><h3 class="h-s">${inline(it.title)}</h3><p>${inline(it.text)}</p></div>`).join('')}</div></div></section>
  ${ctaBand(ctx, p.cta)}`;
  return layout(ctx, { title: p.seo.title, description: p.seo.description, body, path: '/services' });
}

function service(ctx, sv) {
  const { lang, c, s } = ctx;
  const img = s.media.serviceImages[sv.slug];
  const others = c.services.filter((x) => x.slug !== sv.slug);
  const related = ctx.projects.filter((p) => p.category === sv.slug);
  const body = `${pageHero(ctx, sv.hero, { image: img, cta: `<div class="btns">${btn(`/${lang}/enquire?type=${encodeURIComponent(sv.slug)}`, sv.hero.cta, 'solid')}</div>` })}
  <section class="sec"><div class="wrap narrow prose prose--lg">${rich(sv.intro)}</div></section>
  ${sv.items && sv.items.length ? `<section class="sec sec--bark"><div class="wrap"><h2 class="h-l">${inline(sv.listTitle)}</h2>${numberedList(sv.items, 'nlist--grid')}</div></section>` : ''}
  ${related.length ? `<section class="sec"><div class="wrap"><div class="split split--head"><div>${eyebrow(c.home.cases.eyebrow)}<h2 class="h-l">${inline(c.portfolioPage.moreTitle)}</h2></div></div></div><div class="rail-wrap">${projectCards(ctx, related, true)}</div></section>` : ''}
  ${sv.extraList && sv.extraList.length ? `<section class="sec sec--sand"><div class="wrap split"><div><h2 class="h-l">${inline(sv.extraTitle)}</h2></div><ul class="ticks ticks--lg">${sv.extraList.map((x) => `<li>${inline(x)}</li>`).join('')}</ul></div></section>` : ''}
  ${sv.noteTitle || sv.noteText ? `<section class="sec"><div class="wrap split"><div><h2 class="h-l">${inline(sv.noteTitle)}</h2></div><div class="prose">${rich(sv.noteText)}</div></div></section>` : ''}
  ${ctaBand(ctx, sv.cta, `/${lang}/enquire?type=${encodeURIComponent(sv.slug)}`)}
  <section class="sec sec--ink"><div class="wrap"><p class="eyebrow">${esc(c.common.allServices)}</p><div class="more-svc">${others.map((o) => `<a href="/${lang}/services/${attr(o.slug)}">${esc(o.title)} →</a>`).join('')}</div></div></section>`;
  return layout(ctx, { title: sv.seo.title, description: sv.seo.description, body, path: '/services/' + sv.slug, transparentHeader: !!img, ogImage: img && !isVideo(img) ? img : '' });
}

function portfolio(ctx) {
  const { c } = ctx;
  const p = c.portfolioPage;
  const cats = [...new Set(ctx.projects.map((x) => x.category).filter(Boolean))];
  const body = `${pageHero(ctx, p.hero)}
  <section class="sec"><div class="wrap">
    ${ctx.projects.length ? `${cats.length > 1 ? `<div class="filters" role="group"><button class="on" data-filter="">${esc(p.all)}</button>${cats.map((k) => `<button data-filter="${attr(k)}">${esc((c.services.find((x) => x.slug === k) || {}).title || k)}</button>`).join('')}</div>` : ''}${projectCards(ctx, ctx.projects)}` : `<p class="lead center">${inline(p.empty)}</p>`}
  </div></section>
  ${galleryBlock(ctx, ctx.s.media.gallery, c.home.gallery)}
  ${ctaBand(ctx, p.cta)}`;
  return layout(ctx, { title: p.seo.title, description: p.seo.description, body, path: '/portfolio' });
}

function project(ctx, pr) {
  const { lang, c } = ctx;
  const p = c.portfolioPage;
  const gallery = (pr.images || []).filter(Boolean);
  const prep = tr(pr.prep, lang);
  const more = ctx.projects.filter((x) => x.slug !== pr.slug).slice(0, 6);
  const block = (label, text) => (tr(text, lang) ? `<div><p class="eyebrow">${esc(label)}</p><div class="prose">${rich(tr(text, lang))}</div></div>` : '');
  const nums = [
    [pr.kind === 'case' ? p.kindCase : p.kindConcept, ''],
    pr.guests ? [pr.guests, c.home.cases.guests] : null,
    prep ? [prep, p.prepLabel] : null,
    pr.location ? [pr.location, ''] : null,
  ].filter(Boolean);
  const body = `${pageHero(ctx, { eyebrow: projectMeta(ctx, pr), title: tr(pr.title, lang), subtitle: tr(pr.summary, lang) }, { image: pr.cover })}
  <section class="stats stats--tight"><div class="wrap"><dl class="stats__grid">${nums.map((n) => `<div><dt>${esc(n[0])}</dt><dd>${esc(n[1])}</dd></div>`).join('')}</dl></div></section>
  <section class="sec"><div class="wrap cols3">${block(p.briefLabel, pr.brief)}${block(p.conceptLabel, pr.concept)}${block(p.detailsLabel, pr.details)}</div></section>
  ${pr.video ? `<section class="sec sec--ink"><div class="wrap"><video class="pvideo" src="${attr(pr.video)}" controls playsinline preload="metadata"${pr.cover && !isVideo(pr.cover) ? ` poster="${attr(pr.cover)}"` : ''}></video></div></section>` : ''}
  ${gallery.length ? `<section class="sec sec--ink"><div class="wrap"><p class="eyebrow">${esc(p.galleryLabel)}</p><div class="gal">${gallery.map((g, i) => (isVideo(g) ? `<div class="gal__i gal__i--${i % 6}">${mediaTag(g)}</div>` : `<a class="gal__i gal__i--${i % 6}" href="${attr(g)}" data-lightbox>${mediaTag(g)}</a>`)).join('')}</div></div></section>` : ''}
  ${more.length ? `<section class="sec"><div class="wrap"><div class="split split--head"><h2 class="h-l">${inline(p.moreTitle)}</h2><p><a class="link" href="/${lang}/portfolio">${esc(p.backLabel)} →</a></p></div></div><div class="rail-wrap">${projectCards(ctx, more, true)}</div></section>` : ''}
  ${ctaBand(ctx, p.cta)}`;
  return layout(ctx, { title: plain(tr(pr.title, lang)), description: plain(tr(pr.summary, lang)), body, path: '/portfolio/' + pr.slug, transparentHeader: !!pr.cover, ogImage: pr.cover && !isVideo(pr.cover) ? pr.cover : '' });
}

function packages(ctx) {
  const { lang, c, s } = ctx;
  const p = c.packagesPage;
  const rows = p.compare.rows || [];
  const body = `${pageHero(ctx, p.hero)}
  <section class="sec"><div class="wrap">${packageCards(ctx, true)}</div></section>
  <section class="sec sec--bark"><div class="wrap"><h2 class="h-l">${inline(p.compare.title)}</h2><p class="lead">${inline(p.compare.text)}</p>
    <div class="table-wrap"><table class="cmp"><thead><tr>${(p.compare.headers || []).map((x) => `<th>${esc(x)}</th>`).join('')}</tr></thead>
    <tbody>${rows.map((r) => `<tr>${r.map((cell, i) => (i === 0 ? `<th scope="row">${esc(cell)}</th>` : `<td>${esc(cell)}</td>`)).join('')}</tr>`).join('')}</tbody></table></div></div></section>
  <section class="sec sec--sand"><div class="wrap split"><div><h2 class="h-l">${inline(p.pricing.title)}</h2><p class="lead">${inline(p.pricing.text)}</p></div>
    <div><ul class="ticks">${p.pricing.factors.map((x) => `<li>${inline(x)}</li>`).join('')}</ul><div class="prose">${rich(p.pricing.after)}</div></div></div></section>
  <section class="sec"><div class="wrap narrow center"><h2 class="h-l">${inline(p.help.title)}</h2><p class="lead">${inline(p.help.text)}</p>
    <div class="btns btns--center">${btn(`/${lang}/enquire`, p.help.button, 'solid')}${s.calculator.enabled ? btn(`/${lang}/estimate`, p.help.calc, 'line') : ''}</div></div></section>`;
  return layout(ctx, { title: p.seo.title, description: p.seo.description, body, path: '/packages' });
}

function approach(ctx) {
  const { c } = ctx;
  const p = c.approachPage;
  const body = `${pageHero(ctx, p.hero)}
  <section class="sec"><div class="wrap"><ol class="timeline">${p.steps
    .map((st, i) => `<li><span class="timeline__n">${pad(i + 1)}</span><div><h3 class="h-m">${inline(st.title)}</h3><p>${inline(st.text)}</p></div></li>`)
    .join('')}</ol></div></section>
  <section class="sec sec--sand"><div class="wrap split"><div><h2 class="h-l">${inline(p.comms.title)}</h2></div><ul class="ticks ticks--lg">${p.comms.items.map((x) => `<li>${inline(x)}</li>`).join('')}</ul></div></section>
  ${ctaBand(ctx, p.cta)}`;
  return layout(ctx, { title: p.seo.title, description: p.seo.description, body, path: '/approach' });
}

function faq(ctx) {
  const { lang, c } = ctx;
  const p = c.faqPage;
  const body = `${pageHero(ctx, p.hero)}
  <section class="sec"><div class="wrap narrow faq">${p.items.map((it) => `<details><summary>${esc(it.q)}</summary><div class="prose">${rich(it.a)}</div></details>`).join('')}
  <p class="center faq__cta">${esc(p.cta.text)}</p><p class="center">${btn(`/${lang}/enquire`, p.cta.button, 'solid')}</p></div></section>`;
  return layout(ctx, { title: p.seo.title, description: p.seo.description, body, path: '/faq' });
}

function calculatorData(ctx) {
  const { lang, c, s } = ctx;
  const k = s.calculator;
  return {
    currency: k.currency,
    spread: Number(k.spread) || 0,
    locale: { en: 'en-GB', pl: 'pl-PL', uk: 'uk-UA', ru: 'ru-RU' }[lang],
    types: c.services.map((sv) => ({ key: sv.slug, label: sv.title, ...(k.types[sv.slug] || { base: 0, perGuest: 0 }) })),
    packages: c.packagesPage.packages.map((p) => ({ key: p.key, label: p.name, mult: Number(k.packages[p.key]) || 1 })),
    extras: (k.extras || []).map((e) => ({ key: e.key, label: tr(e.label, lang), price: Number(e.price) || 0, perGuest: !!e.perGuest })),
  };
}

function calculator(ctx, q) {
  const { lang, c, s } = ctx;
  const p = c.calculatorPage;
  const d = calculatorData(ctx);
  const k = s.calculator;
  const g = Math.min(k.maxGuests, Math.max(k.minGuests, Number(q.guests) || k.defaultGuests));
  const body = `${pageHero(ctx, p.hero)}
  <section class="sec"><div class="wrap calc" id="calc" data-lang="${lang}">
    <form class="calc__form" id="calcForm" onsubmit="return false">
      <fieldset><legend class="eyebrow">${esc(p.typeLabel)}</legend><div class="chips">${d.types.map((t, i) => `<label class="chip"><input type="radio" name="type" value="${attr(t.key)}" ${(q.type ? q.type === t.key : i === 0) ? 'checked' : ''}><span>${esc(t.label)}</span></label>`).join('')}</div></fieldset>
      <fieldset><legend class="eyebrow">${esc(p.guestsLabel)}: <output id="gOut">${g}</output></legend>
        <input type="range" id="guests" name="guests" min="${k.minGuests}" max="${k.maxGuests}" step="5" value="${g}" aria-label="${attr(p.guestsLabel)}"></fieldset>
      <fieldset><legend class="eyebrow">${esc(p.packageLabel)}</legend><div class="chips">${d.packages.map((pk, i) => `<label class="chip"><input type="radio" name="package" value="${attr(pk.key)}" ${i === 0 ? 'checked' : ''}><span>${esc(pk.label)}</span></label>`).join('')}</div></fieldset>
      ${d.extras.length ? `<fieldset><legend class="eyebrow">${esc(p.extrasLabel)}</legend><div class="chips">${d.extras.map((e) => `<label class="chip"><input type="checkbox" name="extras" value="${attr(e.key)}"><span>${esc(e.label)}</span></label>`).join('')}</div></fieldset>` : ''}
    </form>
    <aside class="calc__res" aria-live="polite">
      <p class="eyebrow">${esc(p.resultLabel)}</p>
      <p class="calc__sum"><span class="calc__lbl">${esc(p.fromLabel)}</span> <span id="low">—</span><br><span class="calc__lbl">${esc(p.toLabel)}</span> <span id="high">—</span></p>
      <p class="calc__pg" id="pg"></p>
      <p class="small">${inline(p.includes)}</p>
      <a class="btn btn--solid" id="calcSend" href="/${lang}/enquire">${esc(p.send)}</a>
      <p class="small muted">${inline(p.disclaimer)}</p>
      <p class="small">${esc(p.contact)} ${contactLines(ctx)}</p>
    </aside>
  </div></section>
  <script type="application/json" id="calcData">${JSON.stringify({ ...d, perGuest: p.perGuest }).replace(/</g, '\\u003c')}</script>`;
  return layout(ctx, { title: p.seo.title, description: p.seo.description, body, path: '/estimate' });
}

function enquire(ctx, q) {
  const { lang, c, s } = ctx;
  const p = c.contactPage;
  const f = p.form;
  const k = s.contacts;
  const sel = (name, label, opts, val, req) =>
    `<label class="fld"><span>${esc(label)}${req ? ' *' : ''}</span><select name="${name}" ${req ? 'required' : ''}><option value="">${esc(f.select)}</option>${opts
      .map((o) => (typeof o === 'string' ? { v: o, l: o } : o))
      .map((o) => `<option value="${attr(o.v)}"${o.v === val ? ' selected' : ''}>${esc(o.l)}</option>`)
      .join('')}</select></label>`;
  const inp = (name, label, type = 'text', req = false, extra = '') =>
    `<label class="fld"><span>${esc(label)}${req ? ' *' : ''}</span><input name="${name}" type="${type}" ${req ? 'required' : ''} ${extra}></label>`;
  const types = c.services.map((sv) => ({ v: sv.slug, l: sv.title })).concat([{ v: 'other', l: f.eventTypeOther }]);
  const pk = c.packagesPage.packages.map((x) => ({ v: x.key, l: x.name })).concat([{ v: 'not-sure', l: f.packageNotSure }]);
  const estimate = q.estimate ? String(q.estimate).slice(0, 200) : '';
  const guestsPrefill = q.guests ? String(q.guests).slice(0, 10) : '';
  const body = `${pageHero(ctx, p.hero)}
  <section class="sec"><div class="wrap enq">
    <form class="form" id="enqForm" method="post" action="/api/enquiry" novalidate>
      <input type="hidden" name="lang" value="${lang}">
      ${estimate ? `<input type="hidden" name="estimate" value="${attr(estimate)}"><div class="estimate"><span class="eyebrow">${esc(f.estimate)}</span><b>${esc(estimate)}</b>${guestsPrefill ? ` · ${esc(guestsPrefill)}` : ''}</div>` : ''}
      ${guestsPrefill ? `<input type="hidden" name="guestsExact" value="${attr(guestsPrefill)}">` : ''}
      <div class="hp" aria-hidden="true"><label>Website<input name="website" tabindex="-1" autocomplete="off"></label></div>
      <fieldset><legend class="eyebrow">${esc(f.aboutYou)}</legend>
        <div class="row2">${inp('name', f.name, 'text', true, 'autocomplete="name"')}${inp('email', f.email, 'email', true, 'autocomplete="email"')}</div>
        <div class="row2">${inp('phone', f.phone, 'tel', true, 'autocomplete="tel"')}${inp('company', f.company, 'text', false, 'autocomplete="organization"')}</div>
        ${sel('contactPref', f.contactPref, f.contactPrefOptions, '', false)}
      </fieldset>
      <fieldset><legend class="eyebrow">${esc(f.yourEvent)}</legend>
        <div class="row2">${sel('eventType', f.eventType, types, q.type || '', true)}${inp('date', f.date, 'text', true)}</div>
        <div class="row2">${sel('guests', f.guests, f.guestsOptions, '', false)}${sel('location', f.location, f.locationOptions, '', false)}</div>
        <div class="row2">${sel('venue', f.venue, f.venueOptions, '', false)}${sel('package', f.package, pk, q.package || '', false)}</div>
        ${sel('budget', f.budget, f.budgetOptions, '', false)}
        <label class="fld"><span>${esc(f.vision)} *</span><textarea name="vision" rows="5" required placeholder="${attr(f.visionPlaceholder)}"></textarea></label>
        ${sel('source', f.source, f.sourceOptions, '', false)}
      </fieldset>
      <label class="consent"><input type="checkbox" name="consent" value="yes" required><span>${esc(f.consent)} <a href="/${lang}/privacy-policy" target="_blank">${ICON.out}</a></span></label>
      <p class="form__err" id="formErr" hidden></p>
      <button class="btn btn--solid" type="submit" data-sending="${attr(c.ui.sending)}">${esc(f.submit)}</button>
      <p class="small muted">${esc(f.note)}</p>
    </form>
    <aside class="enq__side">
      <h2 class="h-m">${inline(p.direct.title)}</h2>
      <dl class="dl">
        ${k.phone ? `<dt>${esc(p.direct.phone)}</dt><dd><a href="tel:${attr(k.phone.replace(/[^\d+]/g, ''))}">${esc(k.phone)}</a>${k.whatsapp ? ` · <a href="https://wa.me/${attr(String(k.whatsapp).replace(/\D/g, ''))}" target="_blank" rel="noopener">WhatsApp</a>` : ''}${k.telegram ? ` · <a href="https://t.me/${attr(k.telegram.replace(/^@/, ''))}" target="_blank" rel="noopener">Telegram</a>` : ''}</dd>` : ''}
        ${k.email ? `<dt>${esc(p.direct.email)}</dt><dd><a href="mailto:${attr(k.email)}">${esc(k.email)}</a></dd>` : ''}
        ${k.instagramUrl ? `<dt>${esc(p.direct.instagram)}</dt><dd><a href="${attr(k.instagramUrl)}" target="_blank" rel="noopener">@${esc(k.instagramHandle)}</a></dd>` : ''}
        <dt>${esc(p.direct.studio)}</dt><dd>${esc(p.direct.studioValue)}</dd>
        <dt>${esc(p.direct.hours)}</dt><dd>${esc(p.direct.hoursValue)}</dd>
      </dl>
    </aside>
  </div></section>
  <script type="application/json" id="formMsg">${JSON.stringify({ err: c.ui.formError, send: c.ui.formSendError, thanks: `/${lang}/enquire/thank-you` }).replace(/</g, '\\u003c')}</script>`;
  return layout(ctx, { title: p.seo.title, description: p.seo.description, body, path: '/enquire' });
}

function thanks(ctx) {
  const { lang, c, s } = ctx;
  const t = c.contactPage.thanks;
  const body = `<section class="sec thanks"><div class="wrap narrow center">
    <img class="thanks__logo" src="${attr(s.theme.logo)}" alt="">
    <h1 class="h-xl">${inline(t.title)}</h1><p class="lead">${inline(t.text)}</p><p>${inline(t.text2)}</p>
    <div class="btns btns--center">${s.contacts.instagramUrl ? btn(s.contacts.instagramUrl, t.instagram, 'solid') : ''}${btn(`/${lang}/`, t.back, 'line')}</div>
  </div></section>`;
  return layout(ctx, { title: t.seoTitle, body, path: '/enquire/thank-you', noindex: true });
}

function legal(ctx, key, path) {
  const d = ctx.c.legal[key];
  const body = `${pageHero(ctx, { title: d.title })}<section class="sec"><div class="wrap narrow prose legal">${rich(d.body)}</div></section>`;
  return layout(ctx, { title: plain(d.title), body, path });
}

function notFound(ctx) {
  const { lang, c } = ctx;
  const body = `<section class="sec thanks"><div class="wrap narrow center"><p class="eyebrow">404</p><h1 class="h-xl">${inline(c.ui.notFoundTitle)}</h1><p class="lead">${inline(c.ui.notFoundText)}</p>${btn(`/${lang}/`, c.ui.backHome, 'solid')}</div></section>`;
  return layout(ctx, { title: '404', body, path: '/', noindex: true });
}

module.exports = { home, about, servicesIndex, service, packages, approach, portfolio, project, faq, calculator, enquire, thanks, legal, notFound, esc, tr, plain };
