/* Scaffold Studio · renders shared header/footer and each page from data.js */
(function () {
  const S = window.SITE;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const svg = id => `<svg aria-hidden="true"><use href="#${id}"/></svg>`;
  const ORDER = Object.keys(S.services);
  const app = $('#app');
  const PAGE = app.dataset.page;
  const SVC = app.dataset.service || null;
  const HOME = './';

  /* ---------- Small storage helpers (per-browser convenience only) ---------- */
  const store = {
    get(k, d) { try { const v = localStorage.getItem(k); return v ? JSON.parse(v) : d; } catch (e) { return d; } },
    set(k, v) { try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {} }
  };
  let plan = store.get('scaffold-plan', {});
  let currency = store.get('scaffold-cur', 'usd');
  const savePlan = () => { store.set('scaffold-plan', plan); updatePill(); };
  const fmt = n => currency === 'usd' ? '$' + n.toLocaleString('en-US') : '₹' + n.toLocaleString('en-IN');
  const per = k => S.services[k].billing === 'monthly' ? ' /mo' : '';
  const mmss = s => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
  const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

  /* ---------- Scenes: animated stand-ins when no video is set ---------- */
  const SCENES = {
    web: `<div class="scene"><div class="browser"><div class="bar"><i></i><i></i><i></i></div><div class="pg"><div class="blk h"></div><div class="blk"></div><div class="blk s"></div><div class="row"><div class="blk"></div><div class="blk"></div></div></div></div></div>`,
    app: `<div class="scene"><div class="dash"><div class="kpis"><div class="kpi"></div><div class="kpi"></div><div class="kpi"></div></div><div class="bars"><i></i><i></i><i></i><i></i><i></i><i></i></div></div></div>`,
    bot: `<div class="scene"><div class="flow"><span class="pulse"></span><div class="nd"><b>LEAD</b><span></span></div><div class="nd"><b>AI</b><span></span></div><div class="nd"><b>CRM</b><span></span></div></div></div>`,
    reel: `<div class="scene"><div class="phone"><div class="screen"><div class="segs"><i></i><i></i><i></i></div><div class="cap"><i></i><i></i></div><svg class="heart"><use href="#i-heart"/></svg></div></div></div>`,
    blog: `<div class="scene"><div class="doc"><div class="t"></div><div class="img"></div><span class="seo">SEO 96</span><div class="l"></div><div class="l"></div><div class="l"></div></div></div>`,
    growth: `<div class="scene"><svg viewBox="0 0 220 180" aria-hidden="true"><line class="gr" x1="0" y1="40" x2="220" y2="40"/><line class="gr" x1="0" y1="90" x2="220" y2="90"/><line class="gr" x1="0" y1="140" x2="220" y2="140"/><path class="ar" d="M0 150 L40 138 L80 128 L120 100 L160 70 L200 30 L200 160 L0 160Z"/><path class="ln" d="M0 150 L40 138 L80 128 L120 100 L160 70 L200 30"/><text class="big" x="0" y="24">+410%</text><text class="lbl" x="0" y="176">JAN</text><text class="lbl" x="180" y="176">DEC</text></svg></div>`
  };
  const SCENE_CLS = { web: 'sc-web', app: 'sc-app', bot: 'sc-bot', reel: 'sc-reel', blog: 'sc-blog', growth: 'sc-growth' };

  /* ---------- Shared chrome ---------- */
  document.body.insertAdjacentHTML('afterbegin', `<svg width="0" height="0" style="position:absolute" aria-hidden="true">
  <defs>
    <symbol id="i-web" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01M7 13h6M7 16h4"/></symbol>
    <symbol id="i-stack" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="m8 8-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/></symbol>
    <symbol id="i-ai" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3v3M12 18v3M3 12h3M18 12h3"/><rect x="7" y="7" width="10" height="10" rx="2.5"/><path d="M10 12h.01M14 12h.01M10.5 14.5h3"/></symbol>
    <symbol id="i-pen" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20h4L19 9a2.8 2.8 0 0 0-4-4L4 16v4Z"/><path d="m13.5 6.5 4 4M14 20h6"/></symbol>
    <symbol id="i-social" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 12a8 8 0 0 1-11.6 7.1L4 20l1-4.2A8 8 0 1 1 20 12Z"/><path d="M8.5 12h.01M12 12h.01M15.5 12h.01"/></symbol>
    <symbol id="i-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M13 6l6 6-6 6"/></symbol>
    <symbol id="i-left" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H5M11 6l-6 6 6 6"/></symbol>
    <symbol id="i-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="m5 12.5 4.5 4.5L19 7.5"/></symbol>
    <symbol id="i-play" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4.5v15a1 1 0 0 0 1.5.86l12.5-7.5a1 1 0 0 0 0-1.72L8.5 3.64A1 1 0 0 0 7 4.5Z"/></symbol>
    <symbol id="i-x" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"><path d="M6 6l12 12M18 6 6 18"/></symbol>
    <symbol id="i-plus" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"><path d="M12 5v14M5 12h14"/></symbol>
    <symbol id="i-star" viewBox="0 0 24 24" fill="currentColor"><path d="m12 2.8 2.8 5.8 6.3.9-4.6 4.4 1.1 6.3L12 17.2l-5.6 3 1.1-6.3-4.6-4.4 6.3-.9L12 2.8Z"/></symbol>
    <symbol id="i-mail" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="5" width="18" height="14" rx="2.5"/><path d="m4 7 8 6 8-6"/></symbol>
    <symbol id="i-phone" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"/></symbol>
    <symbol id="i-clock" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></symbol>
    <symbol id="i-menu" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M4 7h16M4 12h16M4 17h10"/></symbol>
    <symbol id="i-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5Z"/></symbol>
    <symbol id="i-heart" viewBox="0 0 24 24" fill="currentColor"><path d="M12 20.5s-8-4.6-8-10.6A4.4 4.4 0 0 1 12 7.4a4.4 4.4 0 0 1 8 2.5c0 6-8 10.6-8 10.6Z"/></symbol>
    <symbol id="i-instagram" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/></symbol>
    <symbol id="i-linkedin" viewBox="0 0 24 24" fill="currentColor"><path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4V21H3V9.75Zm6.5 0h3.8v1.6h.06c.53-1 1.84-2.05 3.78-2.05 4.04 0 4.86 2.6 4.86 6v5.7h-4v-5.05c0-1.2-.02-2.75-1.7-2.75-1.7 0-1.95 1.3-1.95 2.66V21h-4V9.75Z"/></symbol>
    <symbol id="i-facebook" viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 21v-7.5h2.6l.4-3.1h-3V8.5c0-.9.25-1.5 1.55-1.5h1.6V4.2a21 21 0 0 0-2.35-.12c-2.3 0-3.9 1.4-3.9 4v2.3H7.8v3.1h2.6V21h3.1Z"/></symbol>
    <symbol id="i-x-logo" viewBox="0 0 24 24" fill="currentColor"><path d="M17.75 3h3.07l-6.7 7.66L22 21h-6.17l-4.83-6.32L5.47 21H2.4l7.17-8.2L2 3h6.33l4.37 5.77L17.75 3Zm-1.08 16.2h1.7L7.4 4.73H5.58L16.67 19.2Z"/></symbol>
    <symbol id="i-chev" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></symbol>
    <symbol id="i-ext" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M14 4h6v6M20 4l-9 9M18 14v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V7a1 1 0 0 1 1-1h5"/></symbol>
    <symbol id="i-bag" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M5 8h14l-1 12H6L5 8Z"/><path d="M9 8V6a3 3 0 0 1 6 0v2"/></symbol>
  </defs>
</svg>`);

  function header() {
    const svcActive = PAGE === 'service';
    const cur = p => (PAGE === p ? ' aria-current="page"' : '');
    return `<header class="top">
      <div class="wrap nav">
        <a class="logo" href="${HOME}" aria-label="${S.brand} home"><span class="logo-mark" aria-hidden="true"><i></i><i></i><i></i></span>Scaffold</a>
        <ul class="nav-links" id="navLinks">
          <li><a href="${HOME}"${cur('home')}>Home</a></li>
          <li class="has-dd" id="ddWrap">
            <button class="dd-btn${svcActive ? ' current' : ''}" id="ddBtn" aria-expanded="false" aria-controls="ddMenu">Services ${svg('i-chev')}</button>
            <div class="dd" id="ddMenu">
              <div class="dd-grid">
                ${ORDER.map(k => { const s = S.services[k]; return `<a class="dd-item" href="${s.page}"${SVC === k ? ' aria-current="page"' : ''}><span class="ic">${svg(s.icon)}</span><span><b>${s.long}</b><span>${s.short}</span></span></a>`; }).join('')}
                <a class="dd-item" href="work.html"><span class="ic">${svg('i-play')}</span><span><b>All projects</b><span>Every website, app and campaign</span></span></a>
              </div>
              <a class="dd-foot" href="pricing.html">Compare all packages ${svg('i-arrow')}</a>
            </div>
          </li>
          <li><a href="work.html"${cur('work')}>Work</a></li>
          <li><a href="stories.html"${cur('stories')}>Success stories</a></li>
          <li><a href="approach.html"${cur('approach')}>Approach</a></li>
          <li><a href="pricing.html"${cur('pricing')}>Pricing</a></li>
          <li><a href="contact.html"${cur('contact')}>Contact</a></li>
        </ul>
        <div class="nav-right">
          <a class="plan-pill" id="planPill" href="pricing.html#plan" hidden>${svg('i-bag')}<span>Plan</span><b id="pillN">0</b></a>
          <button class="icon-btn" id="themeBtn" aria-label="Toggle dark mode">${svg('i-moon')}</button>
          <a class="btn btn-primary btn-cta" href="contact.html">Book a call</a>
          <button class="icon-btn menu-btn" id="menuBtn" aria-label="Open menu" aria-expanded="false" aria-controls="navLinks">${svg('i-menu')}</button>
        </div>
      </div>
    </header>`;
  }

  const socialLinks = cls => `<div class="${cls}">${S.social.map(s => `<a href="${s.url}" target="_blank" rel="noopener" aria-label="${s.label}">${svg(s.key === 'x' ? 'i-x-logo' : 'i-' + s.key)}</a>`).join('')}</div>`;

  function footer() {
    return `<footer>
      <div class="wrap">
        <div class="ft">
          <div>
            <a class="logo" href="${HOME}"><span class="logo-mark" aria-hidden="true"><i></i><i></i><i></i></span>Scaffold</a>
            <p>We build and grow businesses from scratch: websites, apps, automation, content and social, under one roof.</p>
            ${socialLinks('ft-soc')}
          </div>
          <div><h5>Services</h5><ul>${ORDER.map(k => `<li><a href="${S.services[k].page}">${S.services[k].long}</a></li>`).join('')}</ul></div>
          <div><h5>Studio</h5><ul><li><a href="work.html">Projects</a></li><li><a href="pricing.html">Pricing</a></li><li><a href="contact.html">Contact</a></li><li><a href="stories.html">Success stories</a></li><li><a href="approach.html">Our approach</a></li></ul></div>
          <div><h5>Legal</h5><ul><li><a href="terms.html">Terms of Service</a></li><li><a href="privacy.html">Privacy Policy</a></li><li><a href="refund.html">Refund &amp; Cancellation</a></li></ul></div>
          <div><h5>Follow</h5><ul>${S.social.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.label}</a></li>`).join('')}</ul></div>
        </div>
        <div class="ft-word" aria-hidden="true">Scaffold</div>
        <div class="ft-base"><span>© ${new Date().getFullYear()} ${S.brand}. All rights reserved.</span><span class="ft-legal"><a href="terms.html">Terms</a><a href="privacy.html">Privacy</a><a href="refund.html">Refunds</a></span></div>
      </div>
    </footer>
    <dialog class="player" id="player" aria-labelledby="plTitle">
      <button class="pl-close" id="plClose" aria-label="Close">${svg('i-x')}</button>
      <div class="pl-grid">
        <div class="pl-stage" id="plStage"></div>
        <div class="pl-info">
          <span class="eyebrow" id="plTag"></span>
          <h3 id="plTitle"></h3>
          <p id="plDesc"></p>
          <div class="pl-stats" id="plStats"></div>
          <a class="more" id="plMore" href="#">See the service ${svg('i-arrow')}</a>
          <div class="pl-bar" id="plBar"><span id="plCur">0:00</span><div class="track"><div class="fill" id="plFill"></div></div><span id="plDur">0:00</span></div>
        </div>
      </div>
    </dialog>
    <div class="toast" id="toast" role="status"></div>`;
  }

  /* ---------- Components ---------- */
  const secHead = (eyebrow, title, text) => `<div class="sec-head"><span class="eyebrow">${eyebrow}</span><h2>${title}</h2>${text ? `<p>${text}</p>` : ''}</div>`;

  function shortCard(s, i, opts = {}) {
    const svcName = S.services[s.svc].name;
    const media = s.video
      ? `<video src="${s.video}" muted loop playsinline autoplay preload="metadata"></video>`
      : (SCENES[s.scene] || SCENES.web);
    return `<button class="${opts.reel ? 'reel' : 'short'}" data-short="${S.shorts.indexOf(s)}" aria-label="Play: ${esc(s.title)}"${opts.clone ? ' aria-hidden="true" tabindex="-1"' : ''}>
      <div class="poster ${SCENE_CLS[s.scene] || ''}" style="--c1:${s.bg || ''}">${media}<span class="tag">${svcName}</span>${opts.rank ? `<span class="rank">${i + 1}</span>` : ''}<span class="play">${svg('i-play')}</span><span class="dur">${mmss(s.dur)}</span></div>
      <div><span class="meta">${s.stats ? s.stats[0].join(' ') : svcName}</span><h3>${esc(s.title)}</h3><p>${esc(s.desc)}</p></div>
    </button>`;
  }

  function mockup(p) {
    switch (p.kind) {
      case 'app': return `<div class="mk"><div class="mk-win"><div class="mk-bar"><i></i><i></i><i></i><u></u></div><div class="mk-side"><i></i><div><div class="mk-kp"><i></i><i></i><i></i></div><div class="mk-ch"><i style="height:40%"></i><i style="height:70%"></i><i style="height:55%"></i><i style="height:90%"></i><i style="height:65%"></i><i style="height:100%"></i></div></div></div></div></div>`;
      case 'flow': return `<div class="mk-flow"><i>INPUT</i><i>AI</i><i>CRM</i></div>`;
      case 'doc': return `<div class="mk-doc"><div class="t"></div><div class="im"></div><div class="l"></div><div class="l"></div><div class="l"></div><div class="l"></div></div>`;
      case 'grid': return `<div class="mk-ig">${'<i></i>'.repeat(10)}</div>`;
      default: return `<div class="mk"><div class="mk-win"><div class="mk-bar"><i></i><i></i><i></i><u></u></div><div class="mk-in"><div class="mk-nav"><i></i><s></s></div><div class="mk-heroB"></div><div class="mk-cols"><i></i><i></i><i></i></div></div></div></div>`;
    }
  }
  const KIND_LABEL = { site: 'Website', app: 'Web app', flow: 'Automation', doc: 'Content', grid: 'Social' };

  function projectCard(p) {
    const [a, b] = p.colors || ['#2840F0', '#E7EAFB'];
    const link = p.url ? `<a class="visit" href="${p.url}" target="_blank" rel="noopener">${p.kind === 'grid' ? 'View profile' : p.kind === 'site' ? 'Visit website' : 'View project'} ${svg('i-ext')}</a>` : `<span class="visit" style="color:var(--muted)">Private client system</span>`;
    return `<article class="proj">
      <div class="proj-prev" style="--a:${a};--b:${b}">${p.image ? `<img src="${p.image}" alt="${esc(p.title)} screenshot" loading="lazy">` : mockup(p)}<span class="kind">${KIND_LABEL[p.kind] || 'Project'}</span></div>
      <div class="proj-body">
        <div class="proj-top"><span>${S.services[p.svc].name}</span><span>${p.year || ''}</span></div>
        <h3>${esc(p.title)}</h3>
        <p>${esc(p.desc)}</p>
        ${p.result ? `<span class="result">${esc(p.result)}</span>` : ''}
        <div class="tags">${(p.tags || []).map(t => `<span>${esc(t)}</span>`).join('')}</div>
        ${link}
      </div>
    </article>`;
  }

  const stars = Array(5).fill(svg('i-star')).join('');
  const tCard = t => `<figure class="tcard"><div class="stars" aria-label="5 out of 5 stars">${stars}</div><blockquote>${esc(t.q)}</blockquote>${t.m ? `<span class="metric">${esc(t.m)}</span>` : ''}<figcaption class="who"><span class="av">${t.i}</span><div><b>${esc(t.n)}</b><span>${esc(t.r)}</span></div></figcaption></figure>`;

  function tierCards(k, cls) {
    const s = S.services[k];
    return s.tiers.map((t, i) => {
      const added = plan[k] === i;
      return `<div class="tier${t.pop ? ' pop' : ''}">
        ${t.pop ? '<span class="badge">Most popular</span>' : ''}
        <h4>${t.t}</h4>
        <p class="desc">${t.d}</p>
        <div class="price">${fmt(t[currency])}<small>${s.billing === 'monthly' ? ' /month' : ' one-time'}</small></div>
        <ul>${t.f.map(x => `<li>${svg('i-check')}<span>${x}</span></li>`).join('')}</ul>
        <button class="btn btn-primary add${added ? ' added' : ''}" data-svc="${k}" data-i="${i}">${added ? svg('i-check') + ' In your plan' : svg('i-plus') + ' Add to plan'}</button>
      </div>`;
    }).join('');
  }
  function bindTierButtons(root, rerender) {
    $$('.add', root).forEach(b => b.addEventListener('click', () => {
      const k = b.dataset.svc, i = +b.dataset.i, s = S.services[k];
      if (plan[k] === i) { delete plan[k]; toast(`${s.name} removed from your plan`); }
      else { plan[k] = i; toast(`${s.name} · ${s.tiers[i].t} added to your plan`); }
      savePlan(); rerender();
    }));
  }
  const curToggle = () => `<div class="cur" role="group" aria-label="Currency"><button data-cur="usd" aria-pressed="${currency === 'usd'}">USD $</button><button data-cur="inr" aria-pressed="${currency === 'inr'}">INR ₹</button></div>`;
  function bindCur(root, rerender) {
    $$('[data-cur]', root).forEach(b => b.addEventListener('click', () => {
      currency = b.dataset.cur; store.set('scaffold-cur', currency);
      $$('[data-cur]').forEach(x => x.setAttribute('aria-pressed', x.dataset.cur === currency));
      rerender();
    }));
  }

  const faqBlock = list => `<div class="faq">${list.map(([q, a], i) => `<details${i === 0 ? ' open' : ''}><summary>${q}<span class="pm">${svg('i-plus')}</span></summary><p>${a}</p></details>`).join('')}</div>`;

  const ctaBand = (title, text) => `<section class="band tight"><div class="wrap"><div class="cta-band"><div><h2>${title}</h2><p>${text}</p></div><div class="btns"><a class="btn btn-primary" href="contact.html">Book a free call ${svg('i-arrow')}</a><a class="btn btn-ghost" href="pricing.html">See pricing</a></div></div></div></section>`;

  const wm = c => `<span class="wm ${c.c}">${c.c === 'wm-5' ? '<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><circle cx="12" cy="12" r="5"/></svg>' : ''}${c.n}</span>`;

  function slider(list) {
    return `<div class="tm-wrap" id="tmWrap">
      <div class="tm-stage">${list.map((t, i) => `<figure class="tm${i === 0 ? ' on' : ''}" role="tabpanel" id="tm-${i}" style="margin:0"><div class="stars" aria-label="5 out of 5 stars">${stars}</div><blockquote>${esc(t.q)}</blockquote><figcaption class="who"><span class="av">${t.i}</span><div><b>${esc(t.n)}</b><span>${esc(t.r)}</span></div></figcaption></figure>`).join('')}</div>
      <div class="tm-side" role="tablist" aria-label="Choose a testimonial">${list.map((t, i) => `<button class="tm-pick" role="tab" aria-controls="tm-${i}" aria-selected="${i === 0}" data-i="${i}"><span class="av">${t.i}</span><div><b>${esc(t.n)}</b><span>${esc(t.r)}</span></div><span class="prog"><i></i></span></button>`).join('')}</div>
    </div>`;
  }
  function bindSlider() {
    const wrap = $('#tmWrap'); if (!wrap) return;
    const DUR = 7000; wrap.style.setProperty('--tmdur', DUR + 'ms');
    const n = $$('.tm', wrap).length;
    let cur = 0, timer, paused = false, remaining = DUR, started = Date.now();
    const show = i => {
      cur = (i + n) % n;
      $$('.tm', wrap).forEach((el, k) => el.classList.toggle('on', k === cur));
      $$('.tm-pick', wrap).forEach((el, k) => { el.setAttribute('aria-selected', k === cur); const b = el.querySelector('.prog i'); b.style.animation = 'none'; void b.offsetWidth; b.style.animation = ''; });
      schedule(DUR);
    };
    const schedule = ms => { clearTimeout(timer); remaining = ms; started = Date.now(); if (!paused) timer = setTimeout(() => show(cur + 1), ms); };
    $$('.tm-pick', wrap).forEach(b => b.addEventListener('click', () => show(+b.dataset.i)));
    wrap.addEventListener('mouseenter', () => { paused = true; clearTimeout(timer); remaining -= Date.now() - started; wrap.classList.add('paused'); });
    wrap.addEventListener('mouseleave', () => { paused = false; wrap.classList.remove('paused'); schedule(Math.max(remaining, 400)); });
    if (!matchMedia('(prefers-reduced-motion: reduce)').matches) schedule(DUR); else paused = true;
  }

  const fromPrice = k => fmt(S.services[k].tiers[0][currency]) + per(k);
  function servicesGrid() {
    return `<div class="svc-grid">${ORDER.map(k => {
      const s = S.services[k];
      const np = S.projects.filter(p => p.svc === k).length;
      return `<article class="svc">
        <div class="svc-top"><span class="ic">${svg(s.icon)}</span><span class="from">from<b data-from="${k}">${fromPrice(k)}</b></span></div>
        <h3>${s.long}</h3>
        <p>${s.lead}</p>
        <ul>${s.deliver.slice(0, 3).map(d => `<li>${d}</li>`).join('')}</ul>
        <a class="link" href="${s.page}">${np} projects · 3 shorts ${svg('i-arrow')}</a>
      </article>`;
    }).join('')}</div>`;
  }

  /* ---------- Diagrams & stories ---------- */
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function problemMap() {
    return `<div class="pmap" id="pmap">
      <svg class="pm-lines" id="pmLines" aria-hidden="true"></svg>
      <div class="pm-col"><h4 class="pm-h">Problems clients came with</h4>${S.problems.map((p, i) => `<button class="pm-node pm-p" data-i="${i}"><span class="pm-x">${svg('i-x')}</span><span><b>${esc(p.p)}</b><small class="pm-inline">${S.services[p.svc].name} → ${S.outcomes[p.out]}</small></span></button>`).join('')}</div>
      <div class="pm-col pm-mid"><h4 class="pm-h">What we build</h4>${ORDER.map(k => `<a class="pm-node pm-s" href="${S.services[k].page}" data-svc="${k}"><span class="ic">${svg(S.services[k].icon)}</span><b>${S.services[k].name}</b></a>`).join('')}</div>
      <div class="pm-col"><h4 class="pm-h">What changes</h4>${S.outcomes.map((o, i) => `<div class="pm-node pm-o" data-o="${i}"><span class="pm-ok">${svg('i-check')}</span><b>${o}</b></div>`).join('')}</div>
    </div>
    <p class="pm-legend"><span>Hover or tap a problem to trace how we solve it.</span><a class="more" href="approach.html">Our approach ${svg('i-arrow')}</a></p>`;
  }
  function bindPmap() {
    const map = $('#pmap'); if (!map) return;
    const lines = $('#pmLines', map);
    let cur = 0, auto = true, timer;
    const hot = i => {
      cur = i; const p = S.problems[i]; map.classList.add('focus');
      $$('.pm-p', map).forEach(n => n.classList.toggle('hot', +n.dataset.i === i));
      $$('.pm-s', map).forEach(n => n.classList.toggle('hot', n.dataset.svc === p.svc));
      $$('.pm-o', map).forEach(n => n.classList.toggle('hot', +n.dataset.o === p.out));
      $$('.pm-path', map).forEach(n => n.classList.toggle('hot', +n.dataset.i === i));
    };
    const draw = () => {
      if (getComputedStyle(lines).display === 'none') return;
      const R = map.getBoundingClientRect();
      lines.setAttribute('viewBox', `0 0 ${R.width} ${R.height}`);
      const pt = (el, side) => { const r = el.getBoundingClientRect(); return [(side === 'r' ? r.right : r.left) - R.left, r.top - R.top + r.height / 2]; };
      const curve = ([x1, y1], [x2, y2]) => { const m = (x1 + x2) / 2; return `M${x1} ${y1} C${m} ${y1} ${m} ${y2} ${x2} ${y2}`; };
      lines.innerHTML = S.problems.map((p, i) => {
        const a = $(`.pm-p[data-i="${i}"]`, map), s = $(`.pm-s[data-svc="${p.svc}"]`, map), o = $(`.pm-o[data-o="${p.out}"]`, map);
        return `<path class="pm-path" data-i="${i}" d="${curve(pt(a, 'r'), pt(s, 'l'))}"/><path class="pm-path" data-i="${i}" d="${curve(pt(s, 'r'), pt(o, 'l'))}"/>`;
      }).join('');
      hot(cur);
    };
    $$('.pm-p', map).forEach(b => { const go = () => { auto = false; hot(+b.dataset.i); }; b.addEventListener('mouseenter', go); b.addEventListener('focus', go); b.addEventListener('click', go); });
    map.addEventListener('mouseleave', () => { auto = true; });
    draw();
    if (window.ResizeObserver) new ResizeObserver(draw).observe(map);
    if (document.fonts) document.fonts.ready.then(draw);
    if (!reduced) timer = setInterval(() => { if (auto) hot((cur + 1) % S.problems.length); }, 2600);
  }

  function approachCycle() {
    const A = S.approach, pos = [[180, 46], [314, 180], [180, 314], [46, 180]];
    return `<div class="ap" id="ap">
      <div class="ap-fig"><svg viewBox="0 0 360 360" role="img" aria-label="Our approach: ${A.map(a => a.t).join(', then ')}, repeating every month">
        <circle class="ap-track" cx="180" cy="180" r="134"/>
        <circle class="ap-flow" cx="180" cy="180" r="134"/>
        ${[45, 135, 225, 315].map(d => `<path class="ap-arrow" d="M-6 -6 L4 0 L-6 6Z" transform="rotate(${d} 180 180) translate(180 46) translate(0 0)" />`).join('')}
        <g class="ap-orbit" id="apOrbit"><circle class="ap-dot" cx="180" cy="46" r="8"/></g>
        ${A.map((a, i) => `<g class="ap-node${i === 0 ? ' on' : ''}" data-i="${i}" tabindex="0" role="button" aria-label="${a.t}"><circle cx="${pos[i][0]}" cy="${pos[i][1]}" r="38"/><text x="${pos[i][0]}" y="${pos[i][1] - 5}" class="ap-n">0${i + 1}</text><text x="${pos[i][0]}" y="${pos[i][1] + 13}" class="ap-t">${a.t}</text></g>`).join('')}
        <text x="180" y="176" class="ap-c1">Repeat</text><text x="180" y="200" class="ap-c2">every month</text>
      </svg></div>
      <div class="ap-side">${A.map((a, i) => `<button class="ap-step" data-i="${i}" aria-expanded="${i === 0}"><span class="ap-num">0${i + 1}</span><span class="ap-b"><b>${a.t}</b><small>${a.wk}</small><span class="ap-d">${a.d}</span><span class="chipset">${a.out.map(o => `<span>${o}</span>`).join('')}</span></span></button>`).join('')}</div>
    </div>`;
  }
  function bindAp() {
    const ap = $('#ap'); if (!ap) return;
    let cur = 0, rot = 0, auto = true;
    const set = i => {
      const step = ((i - cur) % 4 + 4) % 4; rot += step * 90; cur = i;
      $('#apOrbit').style.setProperty('--rot', rot + 'deg');
      $$('.ap-node', ap).forEach(n => n.classList.toggle('on', +n.dataset.i === i));
      $$('.ap-step', ap).forEach(n => n.setAttribute('aria-expanded', +n.dataset.i === i));
    };
    $$('.ap-node, .ap-step', ap).forEach(n => {
      n.addEventListener('click', () => { auto = false; set(+n.dataset.i); });
      n.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); auto = false; set(+n.dataset.i); } });
    });
    if (!reduced) setInterval(() => { if (auto && !document.hidden) set((cur + 1) % 4); }, 4500);
  }

  const num = v => v.toLocaleString('en-US');
  function bars(m, color) {
    const max = Math.max(m.b, m.a), w = v => Math.max(1.5, v / max * 100);
    return `<div class="mt"><div class="mt-h"><span>${m.l}</span>${m.lower ? '<em>lower is better</em>' : ''}</div>
      <div class="mt-row"><span class="mt-k">Before</span><div class="mt-bar"><i class="b" style="--w:${w(m.b)}%"></i></div><span class="mt-v">${num(m.b)}</span></div>
      <div class="mt-row"><span class="mt-k">After</span><div class="mt-bar"><i class="a" style="--w:${w(m.a)}%"></i></div><span class="mt-v">${num(m.a)}</span></div></div>`;
  }
  function storyBlock(s, full) {
    return `<article class="story" style="--sc:${s.color}">
      <div class="st-top"><div><span class="st-client">${esc(s.client)}</span><span class="st-ind">${s.ind} · ${s.time}</span></div><div class="st-svcs">${s.svcs.map(k => `<a href="${S.services[k].page}">${S.services[k].name}</a>`).join('')}</div></div>
      <h3>${esc(s.title)}</h3>
      <div class="st-heads">${s.headline.map(([a, b]) => `<div><b data-count>${a}</b><span>${b}</span></div>`).join('')}</div>
      <div class="st-grid">
        <div class="st-flow" aria-label="From problem to result">
          <div class="sf sf-c"><span class="sf-k">The problem</span><p>${esc(s.challenge)}</p></div>
          <div class="sf sf-s"><span class="sf-k">Our approach</span><ol>${s.steps.map(x => `<li>${esc(x)}</li>`).join('')}</ol></div>
          <div class="sf sf-r"><span class="sf-k">The result</span><p><b>${s.headline.map(h => h.join(' ')).join(' · ')}</b></p></div>
        </div>
        <div class="st-metrics"><span class="sf-k">Before vs after</span>${s.metrics.map(m => bars(m, s.color)).join('')}</div>
      </div>
      ${full ? `<figure class="st-quote"><span class="qm">“</span><div><blockquote>${esc(s.quote)}</blockquote><figcaption>${esc(s.who)}, ${esc(s.client)}</figcaption></div></figure>` : ''}
    </article>`;
  }
  function storiesSection() {
    return `<section class="band tight" id="stories"><div class="wrap">
      <div class="sub-head">${secHead('Success stories', 'Real problems. Measurable results.', 'How clients went from stuck to growing, step by step.')}<a class="more" href="stories.html">All success stories ${svg('i-arrow')}</a></div>
      <div class="tabs light st-tabs" role="tablist" id="stTabs">${S.stories.map((s, i) => `<button class="tab" role="tab" data-i="${i}" aria-selected="${i === 0}">${esc(s.client)}</button>`).join('')}</div>
      <div id="stPanel">${storyBlock(S.stories[0], true)}</div>
    </div></section>`;
  }
  function bindStoryTabs() {
    const tabs = $$('#stTabs .tab'); if (!tabs.length) return;
    tabs.forEach(t => t.addEventListener('click', () => {
      tabs.forEach(x => x.setAttribute('aria-selected', x === t));
      const panel = $('#stPanel');
      panel.innerHTML = storyBlock(S.stories[+t.dataset.i], true);
      const st = panel.firstElementChild; st.classList.add('in');
      $$('[data-count]', st).forEach(countUp);
    }));
  }
  function problemRows(k) {
    return `<div class="pr">${S.services[k].problems.map(([p, f, r]) => `<div class="pr-row"><div class="pr-c pr-p"><span class="sf-k">Problem</span><b>${p}</b></div><span class="pr-arr">${svg('i-arrow')}</span><div class="pr-c pr-f"><span class="sf-k">What we do</span><p>${f}</p></div><span class="pr-arr">${svg('i-arrow')}</span><div class="pr-c pr-r"><span class="sf-k">Result</span><b>${r}</b></div></div>`).join('')}</div>`;
  }

  /* ---------- Motion: reveal on scroll, counters, progress bar, word rise ---------- */
  function countUp(el) {
    if (el._counted || reduced) return; el._counted = true;
    const txt = el.textContent, m = txt.match(/\d[\d,]*(\.\d+)?/); if (!m) return;
    const raw = m[0], target = parseFloat(raw.replace(/,/g, '')), dec = (raw.split('.')[1] || '').length, comma = raw.includes(',');
    const pre = txt.slice(0, m.index), post = txt.slice(m.index + raw.length), t0 = performance.now(), D = 1400;
    const f = v => { let s = v.toFixed(dec); if (comma) s = Number(s).toLocaleString('en-US', { minimumFractionDigits: dec, maximumFractionDigits: dec }); return s; };
    const tick = now => { const p = Math.min(1, (now - t0) / D), e = 1 - Math.pow(1 - p, 3); el.textContent = pre + f(target * e) + post; if (p < 1) requestAnimationFrame(tick); else el.textContent = txt; };
    requestAnimationFrame(tick);
  }
  function splitWords(el) {
    let i = 0;
    const walk = node => {
      [...node.childNodes].forEach(n => {
        if (n.nodeType === 3) {
          const frag = document.createDocumentFragment();
          n.textContent.split(/(\s+)/).forEach(part => {
            if (!part) return;
            if (/^\s+$/.test(part)) frag.appendChild(document.createTextNode(part));
            else { const s = document.createElement('span'); s.className = 'w'; s.style.setProperty('--i', i++); s.textContent = part; frag.appendChild(s); }
          });
          n.replaceWith(frag);
        } else if (n.nodeType === 1 && !n.classList.contains('hl')) walk(n);
        else if (n.nodeType === 1) { n.classList.add('w'); n.style.setProperty('--i', i++); }
      });
    };
    walk(el);
  }
  function motion() {
    const bar = document.createElement('div'); bar.className = 'progress'; document.body.appendChild(bar);
    const onScroll = () => { const h = document.documentElement.scrollHeight - innerHeight; bar.style.setProperty('--p', h > 0 ? scrollY / h : 0); };
    addEventListener('scroll', onScroll, { passive: true }); onScroll();
    $$('.hero, .p-hero').forEach(h => h.insertAdjacentHTML('afterbegin', '<span class="orb o1"></span><span class="orb o2"></span><span class="orb o3"></span>'));
    $$('.hero-meta b, .spot-stats b').forEach(b => b.setAttribute('data-count', ''));
    if (reduced || !('IntersectionObserver' in window)) return;
    $$('.hero h1, .p-hero h1').forEach(splitWords);
    const SEL = '.sec-head, .svc, .proj, .short, .tcard, .cl, .step, .incl-box, .tier, .story, .pmap, .ap, .spot, .cta-band, .faq details, .soc, .pr-row, .case, .legal-sec, .ct, .dd-grid > .dd-item, .reel-head .car-ctrl';
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target; el.classList.remove('rv-wait'); el.classList.add('in');
      $$('[data-count]', el).forEach(countUp); io.unobserve(el);
    }), { rootMargin: '0px 0px -8% 0px' });
    const vh = innerHeight;
    $$(SEL).forEach(el => {
      el.classList.add('rv');
      if (el.getBoundingClientRect().top > vh * 0.9) {
        const sibs = [...el.parentElement.children].filter(c => c.matches(SEL));
        el.style.setProperty('--d', (Math.max(0, sibs.indexOf(el)) % 4) * 0.09 + 's');
        el.classList.add('rv-wait'); io.observe(el);
      } else el.classList.add('in');
    });
    $$('[data-count]').forEach(el => { if (el.getBoundingClientRect().top < vh && !el.closest('.rv-wait')) countUp(el); });
  }

  /* Moving shorts carousel: drifts on its own, pauses on hover, touch or focus */
  function autoCarousel(track) {
    if (!track) return;
    const prev = $('#prevReel'), next = $('#nextReel');
    const items = () => $$('.reel', track);
    const half = () => { const n = items().length / 2; const it = items(); return it[n] ? it[n].offsetLeft - it[0].offsetLeft : track.scrollWidth / 2; };
    const step = () => (items()[0]?.getBoundingClientRect().width || 300) + 20;
    let pos = 0, paused = false, hold = 0, visible = true;
    const wrapPos = () => { const h = half(); if (pos >= h) pos -= h; if (pos < 0) pos += h; };
    const nudge = dir => { hold = performance.now() + 900; pos = track.scrollLeft + dir * step(); wrapPos(); track.scrollTo({ left: pos, behavior: 'smooth' }); };
    prev.addEventListener('click', () => nudge(-1));
    next.addEventListener('click', () => nudge(1));
    if (reduced) { $$('.reel[aria-hidden="true"]', track).forEach(c => c.hidden = true); return; }
    track.classList.add('auto');
    const stop = () => { paused = true; }, go = () => { paused = false; pos = track.scrollLeft; };
    track.addEventListener('mouseenter', stop); track.addEventListener('mouseleave', go);
    track.addEventListener('focusin', stop); track.addEventListener('focusout', go);
    track.addEventListener('touchstart', stop, { passive: true }); track.addEventListener('touchend', () => setTimeout(go, 1500), { passive: true });
    track.addEventListener('wheel', () => { hold = performance.now() + 1200; }, { passive: true });
    if ('IntersectionObserver' in window) new IntersectionObserver(([e]) => { visible = e.isIntersecting; }).observe(track);
    let last = performance.now();
    const loop = now => {
      const dt = Math.min(64, now - last); last = now;
      if (!paused && visible && !document.hidden) {
        if (now < hold) pos = track.scrollLeft;
        else { pos += dt * 0.045; wrapPos(); track.scrollLeft = pos; }
      }
      requestAnimationFrame(loop);
    };
    requestAnimationFrame(loop);
  }

  /* ---------- Pages ---------- */
  function pageHome() {
    const featured = S.projects.filter(p => p.featured);
    S.projects.forEach(p => { if (featured.length < 6 && !featured.includes(p)) featured.push(p); });
    const bestShorts = ORDER.map(k => S.shorts.filter(s => s.svc === k)).flatMap(a => a.slice(0, 2));
    const contentT = S.testimonials.filter(t => t.svc === 'content').slice(0, 2);
    const sliderList = ORDER.map(k => S.testimonials.find(t => t.svc === k)).filter(Boolean);
    const slabs = ORDER.slice().reverse().map((k, i) => { const s = S.services[k]; return `<a class="slab${i === 0 ? ' top-slab' : ''}" href="${s.page}"><span class="ic">${svg(s.icon)}</span><div><strong>${s.name}</strong><small>${s.short}</small></div><span class="lv">L${ORDER.length - i}</span></a>`; }).join('');
    return `
    <section class="hero">
      <div class="wrap hero-grid">
        <div class="hero-copy">
          <span class="eyebrow">Full-service growth studio</span>
          <h1>From blank page to <span class="hl">booked out.</span> <span class="stroke">We build it all.</span></h1>
          <p class="hero-sub">Website, product, automation, content and social, built and run by one team. Start with a single service or hand us the whole launch.</p>
          <div class="hero-ctas"><a class="btn btn-primary" href="pricing.html">Build my plan ${svg('i-arrow')}</a><a class="btn btn-ghost" href="work.html">${svg('i-play')} See our projects</a></div>
          <div class="hero-meta"><div><b>140+</b><span>businesses launched</span></div><div><b>21 days</b><span>average site go-live</span></div><div><b>4.9/5</b><span>client rating</span></div></div>
        </div>
        <div class="stack" aria-label="The five layers we build"><span class="chip-float"><span class="dot"></span>Site live · 0.8s load</span>${slabs}</div>
      </div>
    </section>
    <section class="trusted" aria-label="Clients"><div class="wrap trusted-inner"><span class="label">Teams we've built for</span><div class="marquee"><div class="marquee-track">${S.clients.concat(S.clients).map(wm).join('')}</div></div></div></section>
    <section class="band"><div class="wrap">${secHead('Services', 'Five services. Buy one, or stack them.', 'Each service has its own page with our best shorts, projects and packages.')}${servicesGrid()}</div></section>
    <section class="band tight" id="problems"><div class="wrap">${secHead('Problems we solve', 'The problems clients bring us, and what changes.', 'Every project starts with a business problem, not a tech wish list.')}${problemMap()}</div></section>
    <section class="band tight" id="shorts">
      <div class="wrap reel-head">${secHead('Best shorts', 'See the work in motion.', '<span class="reel-live"><i></i>Auto-playing</span> Hover to pause, tap any short to play.')}<div class="car-ctrl"><button id="prevReel" aria-label="Previous">${svg('i-left')}</button><button id="nextReel" aria-label="Next">${svg('i-arrow')}</button></div></div>
      <div class="reels" id="reels">${bestShorts.map((s, i) => shortCard(s, i, { reel: true })).join('')}${bestShorts.map((s, i) => shortCard(s, i, { reel: true, clone: true })).join('')}</div>
    </section>
    <section class="band tight"><div class="wrap">
      <div class="sub-head">${secHead('Selected projects', 'Websites, apps and automations we\'ve shipped.')}<a class="more" href="work.html">All projects ${svg('i-arrow')}</a></div>
      <div class="proj-grid">${featured.map(projectCard).join('')}</div>
    </div></section>
    ${storiesSection()}
    <section class="band tight" id="content"><div class="wrap"><div class="spot">
      <div class="spot-l">
        <span class="eyebrow">Content marketing</span>
        <h2>Content that keeps bringing in customers.</h2>
        <p>SEO articles, landing pages and newsletters, researched and written for your industry every month.</p>
        <div class="spot-stats"><div><b>+410%</b><span>organic traffic</span></div><div><b>34</b><span>page-1 keywords</span></div><div><b>1,100</b><span>trials from content</span></div></div>
        <a class="btn btn-ghost" href="${S.services.content.page}">Content marketing ${svg('i-arrow')}</a>
      </div>
      <div class="spot-r">${contentT.map(t => `<figure class="spot-q"><blockquote>“${esc(t.q)}”</blockquote><figcaption><span class="av">${t.i}</span><div><b>${esc(t.n)}</b><span>${esc(t.r)}</span></div></figcaption></figure>`).join('')}</div>
    </div></div></section>
    <section class="band tight" id="approach"><div class="wrap">${secHead('Our approach', 'One cycle, repeated every month.', 'We build, launch, measure and improve. Each cycle feeds the next one.')}${approachCycle()}</div></section>
    <section class="band tight" id="clients"><div class="wrap">${secHead('Our clients', 'Companies that grow with us.', 'Clinics, cafés, startups and manufacturers. Most started with one service and now run three or more with us.')}
      <div class="cl-grid">${S.clients.map(c => `<div class="cl"><small>${c.ind}</small>${wm(c)}<span class="res">${c.res}</span></div>`).join('')}</div></div></section>
    <section class="band tm-band" id="reviews"><div class="wrap">${secHead('Testimonials', 'Owners who stopped worrying about marketing.')}${slider(sliderList)}<p class="tm-note">Sample testimonials, client names and results shown for layout. Replace with your own before launch.</p></div></section>
    ${ctaBand("Let's build your business.", 'Book a free 20-minute call. We reply within one business day.')}`;
  }

  function pageService(k) {
    const s = S.services[k];
    const shorts = S.shorts.filter(x => x.svc === k).slice(0, 3);
    const projects = S.projects.filter(p => p.svc === k);
    const tms = S.testimonials.filter(t => t.svc === k);
    const projTitle = { web: 'Websites we\'ve built', fullstack: 'Apps we\'ve built', ai: 'Automations we\'ve built', content: 'Content we\'ve created', social: 'Accounts we manage' }[k];
    const isContent = k === 'content';
    const story = S.stories.find(x => x.svcs[0] === k) || S.stories.find(x => x.svcs.includes(k));
    const contentClients = isContent ? S.clients.filter(c => S.projects.some(p => p.svc === 'content' && p.title.startsWith(c.n.split(' ')[0]))) : [];
    document.title = `${s.long} · ${S.brand}`;
    return `
    <section class="p-hero"><div class="wrap p-hero-grid">
      <div class="p-hero-copy">
        <nav class="crumbs" aria-label="Breadcrumb"><a href="${HOME}">Home</a><span>/</span><span>Services</span><span>/</span><span>${s.long}</span></nav>
        <span class="eyebrow">${s.long}</span>
        <h1>${s.headline}</h1>
        <p class="lead">${s.lead}</p>
        <div class="hero-ctas"><a class="btn btn-primary" href="#packages">See packages ${svg('i-arrow')}</a><a class="btn btn-ghost" href="#shorts">${svg('i-play')} Watch shorts</a></div>
        <div class="hero-meta">${s.stats.map(([a, b]) => `<div><b>${a}</b><span>${b}</span></div>`).join('')}</div>
      </div>
      <div class="poster ${s.sceneCls}">${SCENES[s.scene]}<span class="tag">From ${fromPrice(k)}</span></div>
    </div></section>

    <section class="band tight" id="problems"><div class="wrap">
      ${secHead('Problems we solve', `What ${s.name.toLowerCase()} clients struggle with, and how we fix it.`)}
      ${problemRows(k)}
    </div></section>

    <section class="band tight" id="shorts"><div class="wrap">
      ${secHead('Top 3 shorts', `Our best ${s.name.toLowerCase()} work, in under a minute.`, 'Tap a short to play it with the results.')}
      <div class="shorts">${shorts.map((x, i) => shortCard(x, i, { rank: true })).join('')}</div>
    </div></section>

    <section class="band tight" id="projects"><div class="wrap">
      <div class="sub-head">${secHead('Projects', projTitle, `${projects.length} recent ${s.name.toLowerCase()} projects.`)}<a class="more" href="work.html#${k}">Browse all work ${svg('i-arrow')}</a></div>
      <div class="proj-grid">${projects.length ? projects.map(projectCard).join('') : '<div class="empty-note">Projects coming soon. Add yours in data.js.</div>'}</div>
    </div></section>

    <section class="band tight"><div class="wrap">
      ${secHead("What's included", 'Everything you need, handled by one team.')}
      <div class="incl">
        <div class="incl-box"><h3>Deliverables</h3><ul class="incl-list">${s.deliver.map(d => `<li>${svg('i-check')}<span>${d}</span></li>`).join('')}</ul></div>
        <div class="incl-box"><h3>Tools we use</h3><div class="chipset">${s.tools.map(t => `<span>${t}</span>`).join('')}</div></div>
      </div>
    </div></section>

    <section class="band tight" id="packages"><div class="wrap">
      <div class="pk-bar">${secHead('Packages', `${s.long} packages`, s.billing === 'monthly' ? 'Monthly plans. No long contracts, 30 days notice to change or cancel.' : 'One-time project fee. Fixed quote before we start.')}${curToggle()}</div>
      <div class="svc-tiers" id="svcTiers">${tierCards(k)}</div>
    </div></section>

    ${story ? `<section class="band tight" id="story"><div class="wrap">
      <div class="sub-head">${secHead('Success story', 'How one client solved it.')}<a class="more" href="stories.html">More success stories ${svg('i-arrow')}</a></div>
      ${storyBlock(story, true)}
    </div></section>` : ''}

    ${isContent ? `<section class="band tight" id="content-clients"><div class="wrap">
      ${secHead('Content marketing clients', 'Brands whose content we write every month.', 'What our content clients say about rankings, leads and working with our writers.')}
      <div class="cl-grid" style="margin-bottom:28px">${contentClients.map(c => `<div class="cl"><small>${c.ind}</small>${wm(c)}<span class="res">${c.res}</span></div>`).join('')}</div>
      <div class="tgrid">${tms.map(tCard).join('')}</div>
    </div></section>` : `<section class="band tight" id="reviews"><div class="wrap">
      ${secHead('Client testimonials', `What ${s.name.toLowerCase()} clients say.`)}
      <div class="tgrid">${tms.map(tCard).join('')}</div>
    </div></section>`}

    <section class="band tight"><div class="wrap faq-grid">
      ${secHead('FAQ', `${s.name} questions`, 'Anything else? Ask us on a free call.')}
      ${faqBlock(s.faq)}
    </div></section>

    <section class="band tight"><div class="wrap">
      ${secHead('Other services', 'Add the next layer when you\'re ready.')}
      <div class="dd-grid" style="grid-template-columns:repeat(auto-fit,minmax(240px,1fr))">${ORDER.filter(x => x !== k).map(x => { const o = S.services[x]; return `<a class="dd-item" href="${o.page}" style="background:var(--surface);border:1px solid var(--line)"><span class="ic">${svg(o.icon)}</span><span><b>${o.long}</b><span>${o.short}</span></span></a>`; }).join('')}</div>
    </div></section>
    ${ctaBand(`Ready to start your ${s.name.toLowerCase()} project?`, 'Book a free call and get a fixed quote within 48 hours.')}`;
  }

  function pageWork() {
    const counts = k => S.projects.filter(p => k === 'all' || p.svc === k).length;
    return `
    <section class="p-hero" style="padding-bottom:24px"><div class="wrap p-hero-copy">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="${HOME}">Home</a><span>/</span><span>Work</span></nav>
      <h1>Our projects.</h1>
      <p class="lead">Websites, web apps, AI automations, content and social campaigns. Filter by service.</p>
    </div></section>
    <section class="band tight"><div class="wrap">
      <div class="filter-bar"><div class="tabs light" role="tablist" id="workTabs">
        ${['all', ...ORDER].map(k => `<button class="tab" role="tab" data-k="${k}" aria-selected="${k === 'all'}">${k === 'all' ? 'All' : S.services[k].name}<span class="n">${counts(k)}</span></button>`).join('')}
      </div></div>
      <div class="proj-grid" id="workGrid"></div>
      <div style="margin-top:clamp(56px,7vw,96px)">${secHead('Shorts', 'Project shorts', 'Quick walkthroughs for the projects above.')}</div>
      <div class="shorts" id="workShorts"></div>
    </div></section>
    ${ctaBand('Have a project in mind?', 'Tell us about it and get a fixed quote within 48 hours.')}`;
  }
  function bindWork() {
    const tabs = $$('#workTabs .tab');
    const show = k => {
      if (k !== 'all' && !S.services[k]) k = 'all';
      tabs.forEach(t => t.setAttribute('aria-selected', t.dataset.k === k));
      const list = S.projects.filter(p => k === 'all' || p.svc === k);
      $('#workGrid').innerHTML = list.map(projectCard).join('');
      const sh = k === 'all' ? ORDER.map(x => S.shorts.find(s => s.svc === x)).filter(Boolean).slice(0, 3).concat(ORDER.map(x => S.shorts.filter(s => s.svc === x)[1]).filter(Boolean).slice(0, 3)) : S.shorts.filter(s => s.svc === k);
      $('#workShorts').innerHTML = sh.map((s, i) => shortCard(s, i)).join('');
      bindShorts($('#workShorts'));
    };
    tabs.forEach(t => t.addEventListener('click', () => show(t.dataset.k)));
    show((location.hash || '#all').slice(1));
  }

  function pagePricing() {
    return `
    <section class="p-hero" style="padding-bottom:24px"><div class="wrap p-hero-copy">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="${HOME}">Home</a><span>/</span><span>Pricing</span></nav>
      <h1>Packages &amp; pricing.</h1>
      <p class="lead">Pick one package per service and build your own plan. Combine three or more services and we take 10% off the total.</p>
    </div></section>
    <section class="band pk-band" id="plan"><div class="wrap">
      <div class="pk-bar"><div class="tabs" role="tablist" id="tabs">${ORDER.map((k, i) => `<button class="tab" role="tab" id="tab-${k}" data-k="${k}" aria-selected="${i === 0}">${S.services[k].name}</button>`).join('')}</div>${curToggle()}</div>
      <div class="pk-layout">
        <div class="tiers" id="tiers" role="tabpanel"></div>
        <aside class="plan" aria-live="polite">
          <h4>Your plan <span id="planCount">0 services</span></h4>
          <div class="plan-empty" id="planEmpty">Add a package to start your plan.</div>
          <ul class="plan-list" id="planList"></ul>
          <div class="totals" id="totals" hidden></div>
          <div class="plan-hint" id="planHint"></div>
          <a class="btn btn-primary" id="sendPlan" href="contact.html">Get this plan ${svg('i-arrow')}</a>
        </aside>
      </div>
    </div></section>
    <section class="band"><div class="wrap faq-grid">
      ${secHead('FAQ', 'Pricing questions', 'Every quote is fixed before work starts.')}
      ${faqBlock([
        ['Can I buy just one service?', 'Yes. Every service has its own packages. Many clients start with a website and add content or social later.'],
        ['How does the bundle discount work?', 'Choose packages from three or more different services and we take 10% off both the one-time and monthly totals.'],
        ['Do you take payment in instalments?', 'One-time projects are paid 50% upfront and 50% at launch. Larger apps can be split into monthly milestones.'],
        ['Are monthly plans locked in?', 'No long contracts. Content and social plans run month to month with 30 days notice.']
      ])}
    </div></section>`;
  }
  function bindPricing() {
    let active = ORDER.includes((location.hash || '').slice(1)) ? location.hash.slice(1) : ORDER[0];
    const renderTiers = () => {
      $$('#tabs .tab').forEach(b => b.setAttribute('aria-selected', b.dataset.k === active));
      $('#tiers').setAttribute('aria-labelledby', 'tab-' + active);
      $('#tiers').innerHTML = tierCards(active);
      bindTierButtons($('#tiers'), () => { renderTiers(); renderPlan(); });
    };
    const renderPlan = () => {
      const items = ORDER.filter(k => k in plan);
      $('#planCount').textContent = items.length + (items.length === 1 ? ' service' : ' services');
      $('#planEmpty').hidden = items.length > 0;
      $('#planList').innerHTML = items.map(k => { const t = S.services[k].tiers[plan[k]]; return `<li><div><b>${S.services[k].name}</b><span>${t.t} · ${S.services[k].billing}</span></div><span class="amt">${fmt(t[currency])}${per(k)}</span><button class="rm" data-k="${k}" aria-label="Remove ${S.services[k].name}">${svg('i-x')}</button></li>`; }).join('');
      $$('#planList .rm').forEach(b => b.addEventListener('click', () => { delete plan[b.dataset.k]; savePlan(); renderTiers(); renderPlan(); }));
      let once = 0, monthly = 0;
      items.forEach(k => { const v = S.services[k].tiers[plan[k]][currency]; S.services[k].billing === 'monthly' ? monthly += v : once += v; });
      const disc = items.length >= 3, d = v => Math.round(v * 0.9), tot = $('#totals');
      tot.hidden = !items.length;
      tot.innerHTML = !items.length ? '' :
        (once ? `<div><span>One-time builds</span><span>${fmt(once)}</span></div>` : '') +
        (monthly ? `<div><span>Monthly services</span><span>${fmt(monthly)} /mo</span></div>` : '') +
        (disc ? `<div class="save"><span>Bundle discount (10%)</span><span>−${fmt(once - d(once) + monthly - d(monthly))}</span></div>` : '') +
        (once ? `<div class="grand"><span>Due at start</span><span>${fmt(disc ? d(once) : once)}</span></div>` : '') +
        (monthly ? `<div class="${once ? '' : 'grand'}"><span>${once ? 'Then monthly' : 'Monthly'}</span><span>${fmt(disc ? d(monthly) : monthly)} /mo</span></div>` : '');
      const left = 3 - items.length;
      $('#planHint').textContent = disc ? 'Bundle discount applied. Nice stack.' : `Add ${left} more service${left === 1 ? '' : 's'} to unlock 10% off.`;
    };
    $$('#tabs .tab').forEach(b => b.addEventListener('click', () => { active = b.dataset.k; renderTiers(); }));
    bindCur(document, () => { renderTiers(); renderPlan(); });
    renderTiers(); renderPlan();
  }


  function pageStories() {
    return `
    <section class="p-hero" style="padding-bottom:24px"><div class="wrap p-hero-copy">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="${HOME}">Home</a><span>/</span><span>Success stories</span></nav>
      <h1>Success stories.</h1>
      <p class="lead">The problem each client came with, the approach we took, and the numbers before and after.</p>
      <div class="hero-meta"><div><b>140+</b><span>businesses launched</span></div><div><b>18 hrs</b><span>saved weekly, on average</span></div><div><b>4.9/5</b><span>client rating</span></div></div>
    </div></section>
    <section class="band tight"><div class="wrap">
      <div class="filter-bar"><div class="tabs light" role="tablist" id="storyTabs">${['all', ...ORDER].map(k => `<button class="tab" role="tab" data-k="${k}" aria-selected="${k === 'all'}">${k === 'all' ? 'All' : S.services[k].name}</button>`).join('')}</div></div>
      <div class="stories-list" id="storiesList">${S.stories.map(s => storyBlock(s, true)).join('')}</div>
    </div></section>
    ${ctaBand('Want results like these?', 'Tell us the problem. We will show you the plan.')}`;
  }
  function bindStories() {
    const tabs = $$('#storyTabs .tab');
    const show = k => {
      if (k !== 'all' && !S.services[k]) k = 'all';
      tabs.forEach(t => t.setAttribute('aria-selected', t.dataset.k === k));
      const list = S.stories.filter(s => k === 'all' || s.svcs.includes(k));
      $('#storiesList').innerHTML = list.length ? list.map(s => storyBlock(s, true)).join('') : '<div class="empty-note">No stories for this service yet.</div>';
      $$('#storiesList .story').forEach(st => { st.classList.add('in'); $$('[data-count]', st).forEach(countUp); });
    };
    tabs.forEach(t => t.addEventListener('click', () => show(t.dataset.k)));
    if (location.hash) show(location.hash.slice(1));
  }

  function pageApproach() {
    return `
    <section class="p-hero" style="padding-bottom:24px"><div class="wrap p-hero-copy">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="${HOME}">Home</a><span>/</span><span>Approach</span></nav>
      <h1>Our approach.</h1>
      <p class="lead">We start from the problem your business has, pick the smallest set of services that fixes it, then improve it every month.</p>
    </div></section>
    <section class="band tight"><div class="wrap">${secHead('Problems clients faced', 'From problem to outcome.', 'The problems we hear most, the service that fixes each one, and what changes for the business.')}${problemMap()}</div></section>
    <section class="band tight"><div class="wrap">${secHead('How we work', 'One cycle, repeated every month.', 'Discover, build, launch, grow. Then measure and start again.')}${approachCycle()}</div></section>
    <section class="band tight"><div class="wrap">${secHead('By service', 'Common problems, by service.')}
      <div style="display:grid;gap:40px">${ORDER.map(k => `<div><div class="sub-head" style="margin-bottom:16px"><h3 style="font-size:26px;font-weight:600">${S.services[k].long}</h3><a class="more" href="${S.services[k].page}">See service ${svg('i-arrow')}</a></div>${problemRows(k)}</div>`).join('')}</div>
    </div></section>
    ${ctaBand('Not sure where to start?', 'Tell us the problem on a free call. We will suggest the smallest plan that fixes it.')}`;
  }

  function pageLegal(key) {
    const L = S.legal[key] || S.legal.terms;
    document.title = `${L.title} · ${S.brand}`;
    const others = Object.entries(S.legal).filter(([k]) => k !== key);
    return `
    <section class="p-hero" style="padding-bottom:24px"><div class="wrap p-hero-copy">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="${HOME}">Home</a><span>/</span><span>Legal</span><span>/</span><span>${L.title}</span></nav>
      <h1>${L.title}</h1>
      <p class="lead">${L.intro}</p>
      <p class="legal-meta">Last updated ${S.updated} · ${S.legalName}</p>
    </div></section>
    <section class="band tight"><div class="wrap legal">
      <aside class="legal-toc"><h5>On this page</h5><ol>${L.sections.map(([h], i) => `<li><a href="#s${i + 1}">${h}</a></li>`).join('')}</ol>
        <div class="legal-other">${others.map(([k, d]) => `<a href="${k}.html">${d.title} →</a>`).join('')}</div></aside>
      <article class="legal-body">${L.sections.map(([h, t], i) => `<section class="legal-sec" id="s${i + 1}"><h2><span>${i + 1}.</span>${h}</h2><p>${t}</p></section>`).join('')}</article>
    </div></section>`;
  }

  function pageContact() {
    return `
    <section class="p-hero" style="padding-bottom:24px"><div class="wrap p-hero-copy">
      <nav class="crumbs" aria-label="Breadcrumb"><a href="${HOME}">Home</a><span>/</span><span>Contact</span></nav>
      <h1>Contact us.</h1>
      <p class="lead">Tell us where your business is today. We reply within one business day with next steps and a rough quote.</p>
    </div></section>
    <section class="band tight" style="padding-top:24px"><div class="wrap"><div class="ct">
      <div class="ct-l">
        <span class="eyebrow">Start a project</span>
        <h2>Let's build your business.</h2>
        <p>Prefer social? Message us on Instagram, LinkedIn, Facebook or X. We answer DMs too.</p>
        <ul class="ct-list">
          <li>${svg('i-mail')}<span id="emailTxt">${S.email}</span><button class="copy" data-copy="emailTxt">Copy</button></li>
          <li>${svg('i-phone')}<span id="phoneTxt">${S.phone}</span><button class="copy" data-copy="phoneTxt">Copy</button></li>
          <li>${svg('i-clock')}<span>${S.hours}</span></li>
        </ul>
        ${socialLinks('ct-soc')}
      </div>
      <form class="ct-r" id="contactForm" novalidate>
        <div class="row2">
          <div class="fld"><label for="fName">Your name</label><input id="fName" name="name" autocomplete="name" required placeholder="Aanya Kapoor"></div>
          <div class="fld"><label for="fEmail">Email</label><input id="fEmail" name="email" type="email" autocomplete="email" required placeholder="you@company.com"></div>
        </div>
        <div class="row2">
          <div class="fld"><label for="fCompany">Business name</label><input id="fCompany" name="company" autocomplete="organization" placeholder="Your company"></div>
          <div class="fld"><label for="fBudget">Budget</label><select id="fBudget" name="budget"><option>Under $1,000</option><option>$1,000 – $5,000</option><option>$5,000 – $15,000</option><option>$15,000+</option><option>Not sure yet</option></select></div>
        </div>
        <fieldset class="fld" style="border:0;padding:0;margin:0"><legend style="font-size:13px;font-weight:600;margin-bottom:6px">What do you need?</legend>
          <div class="chips">${ORDER.map(k => `<label><input type="checkbox" id="need-${k}" name="need" value="${k}"${k in plan ? ' checked' : ''}><span>${S.services[k].name}</span></label>`).join('')}</div>
        </fieldset>
        <div class="fld"><label for="fMsg">Project details</label><textarea id="fMsg" name="message" placeholder="A few lines about your business and goals"></textarea></div>
        <div class="form-msg" id="formMsg" hidden></div>
        <button class="btn btn-primary" type="submit" style="justify-self:start">Send enquiry ${svg('i-arrow')}</button>
      </form>
    </div></div></section>
    <section class="band tight"><div class="wrap">
      ${secHead('Follow us', 'Find us on social.', 'Project shorts, behind-the-scenes and growth tips every week.')}
      <div class="socials">${S.social.map(s => `<a class="soc" href="${s.url}" target="_blank" rel="noopener" style="--brand:${s.brand}"><span class="si">${svg(s.key === 'x' ? 'i-x-logo' : 'i-' + s.key)}</span><div><b>${s.label}</b><span>${s.handle}</span></div></a>`).join('')}</div>
    </div></section>`;
  }
  function bindContact() {
    const items = ORDER.filter(k => k in plan);
    if (items.length) $('#fMsg').value = 'I would like this plan:\n' + items.map(k => `• ${S.services[k].name}: ${S.services[k].tiers[plan[k]].t} (${fmt(S.services[k].tiers[plan[k]][currency])}${per(k)})`).join('\n') + '\n\nAbout my business: ';
    $$('.copy').forEach(b => b.addEventListener('click', () => {
      const el = document.getElementById(b.dataset.copy), txt = el.textContent;
      const fallback = () => { const r = document.createRange(); r.selectNodeContents(el); const s = getSelection(); s.removeAllRanges(); s.addRange(r); toast('Selected. Press Ctrl/Cmd + C to copy'); };
      try { navigator.clipboard.writeText(txt).then(() => toast('Copied ' + txt), fallback); } catch (e) { fallback(); }
    }));
    $('#contactForm').addEventListener('submit', e => {
      e.preventDefault();
      const msg = $('#formMsg'), name = $('#fName').value.trim(), email = $('#fEmail').value.trim();
      msg.hidden = false;
      if (!name || !/^\S+@\S+\.\S+$/.test(email)) { msg.textContent = 'Please add your name and a valid email so we can reply.'; (!name ? $('#fName') : $('#fEmail')).focus(); return; }
      msg.textContent = `Thanks, ${name.split(' ')[0]}. This form isn't connected to an inbox yet, so please also email us at ${S.email}.`;
    });
  }

  /* ---------- Shared behaviour ---------- */
  function toast(m) { const t = $('#toast'); t.textContent = m; t.classList.add('show'); clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2600); }
  function updatePill() { const n = Object.keys(plan).length, p = $('#planPill'); if (!p) return; p.hidden = !n; $('#pillN').textContent = n; }

  let raf = 0;
  function openShort(s) {
    const player = $('#player'), st = $('#plStage');
    st.className = 'pl-stage ' + (s.video ? '' : SCENE_CLS[s.scene] || '');
    st.style.setProperty('--c1', s.bg || '#121826');
    st.innerHTML = s.video ? `<video src="${s.video}" controls autoplay playsinline style="width:100%;height:100%;object-fit:cover;display:block"></video>` : SCENES[s.scene];
    $('#plTag').textContent = S.services[s.svc].long;
    $('#plTitle').textContent = s.title;
    $('#plDesc').textContent = s.desc;
    $('#plStats').innerHTML = (s.stats || []).map(([a, b]) => `<div><b>${a}</b><span>${b}</span></div>`).join('');
    const more = $('#plMore'); more.href = S.services[s.svc].page; more.hidden = PAGE === 'service' && SVC === s.svc;
    $('#plBar').hidden = !!s.video;
    $('#plDur').textContent = mmss(s.dur);
    cancelAnimationFrame(raf);
    if (!s.video) {
      const t0 = performance.now();
      const tick = now => { const el = ((now - t0) / 1000) % s.dur; $('#plFill').style.width = (el / s.dur * 100) + '%'; $('#plCur').textContent = mmss(el); raf = requestAnimationFrame(tick); };
      raf = requestAnimationFrame(tick);
    }
    player.showModal ? player.showModal() : player.setAttribute('open', '');
  }
  function bindShorts(root = document) {
    $$('[data-short]', root).forEach(b => b.addEventListener('click', () => openShort(S.shorts[+b.dataset.short])));
  }

  function bindChrome() {
    const header = $('header.top');
    addEventListener('scroll', () => header.classList.toggle('scrolled', scrollY > 8), { passive: true });
    const menuBtn = $('#menuBtn'), navLinks = $('#navLinks'), dd = $('#ddWrap'), ddBtn = $('#ddBtn');
    menuBtn.addEventListener('click', () => { const o = navLinks.classList.toggle('open'); menuBtn.setAttribute('aria-expanded', o); });
    ddBtn.addEventListener('click', e => { e.stopPropagation(); const o = dd.classList.toggle('open'); ddBtn.setAttribute('aria-expanded', o); });
    document.addEventListener('click', e => { if (!dd.contains(e.target)) { dd.classList.remove('open'); ddBtn.setAttribute('aria-expanded', false); } });
    document.addEventListener('keydown', e => { if (e.key === 'Escape') { dd.classList.remove('open'); ddBtn.setAttribute('aria-expanded', false); } });
    $$('#navLinks a').forEach(a => a.addEventListener('click', () => { navLinks.classList.remove('open'); dd.classList.remove('open'); }));
    $('#themeBtn').addEventListener('click', () => {
      const root = document.documentElement;
      const cur = root.dataset.theme || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
      root.dataset.theme = cur === 'dark' ? 'light' : 'dark';
      store.set('scaffold-theme', root.dataset.theme);
    });
    const savedTheme = store.get('scaffold-theme', null); if (savedTheme) document.documentElement.dataset.theme = savedTheme;
    const player = $('#player');
    const close = () => { cancelAnimationFrame(raf); $('#plStage').innerHTML = ''; player.close ? player.close() : player.removeAttribute('open'); };
    $('#plClose').addEventListener('click', close);
    player.addEventListener('click', e => { if (e.target === player) close(); });
    player.addEventListener('close', () => { cancelAnimationFrame(raf); $('#plStage').innerHTML = ''; });
    updatePill();
  }

  /* ---------- Boot ---------- */
  const body = { home: pageHome, service: () => pageService(SVC), work: pageWork, pricing: pagePricing, contact: pageContact, stories: pageStories, approach: pageApproach, legal: () => pageLegal(app.dataset.doc) }[PAGE] || pageHome;
  app.innerHTML = header() + `<main>${body()}</main>` + footer();
  bindChrome();
  bindShorts();
  bindSlider();
  if (PAGE === 'service') {
    const rerender = () => { $('#svcTiers').innerHTML = tierCards(SVC); bindTierButtons($('#svcTiers'), rerender); };
    bindTierButtons($('#svcTiers'), rerender);
    bindCur(document, rerender);
  }
  if (PAGE === 'home') autoCarousel($('#reels'));
  if (PAGE === 'work') bindWork();
  if (PAGE === 'pricing') bindPricing();
  if (PAGE === 'contact') bindContact();
  if (PAGE === 'stories') bindStories();
  bindPmap();
  bindAp();
  bindStoryTabs();
  motion();
  if (location.hash && !['work', 'pricing', 'stories'].includes(PAGE)) { const t = document.getElementById(location.hash.slice(1)); if (t) setTimeout(() => t.scrollIntoView(), 50); }
})();
