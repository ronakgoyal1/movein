/* ===================================================
   WISOR — Application Logic (v2, editorial redesign)
   =================================================== */
(function () {
  'use strict';

  /* ── State ─────────────────────────────────────── */
  const S = {
    college: null,
    kitId: null,
    selections: {},
    step: 0,
    open: false,
  };

  const STEPS = ['college', 'kit', 'customize', 'review', 'checkout'];
  const STEP_LABELS = [
    'Which college?',
    'Choose a kit',
    'Customise essentials',
    'Review your order',
    'Confirm delivery',
  ];
  const NEXT_LABELS = [
    'Choose College',
    'Choose Kit',
    'Continue',
    'Review Order',
    'Confirm on WhatsApp',
  ];

  /* ── DOM refs ───────────────────────────────────── */
  const overlay  = document.getElementById('builder-overlay');
  const backdrop = document.getElementById('builder-backdrop');
  const nextBtn  = document.getElementById('sheet-next');
  const backBtn  = document.getElementById('sheet-back');
  const stepLabel = document.getElementById('builder-step-label');
  const footerPrice = document.getElementById('footer-price');
  const panels   = document.querySelectorAll('.step-panel');
  const progSteps = document.querySelectorAll('[data-prog-step]');
  const progConns = document.querySelectorAll('.prog-connector');

  /* ── Builder open / close ───────────────────────── */
  function openBuilder() {
    S.open = true;
    document.body.style.overflow = 'hidden';
    overlay.classList.add('active');
    renderCurrentStep();
  }

  function closeBuilder() {
    S.open = false;
    document.body.style.overflow = '';
    overlay.classList.remove('active');
  }

  /* ── Navigation ─────────────────────────────────── */
  function goTo(i, back = false) {
    S.step = i;
    panels.forEach((p, idx) => {
      p.classList.toggle('active', idx === i);
      if (idx === i && back) p.classList.add('going-back');
      else p.classList.remove('going-back');
    });
    updateProgress();
    updateFooter();
    // Scroll body to top on step change
    const body = document.querySelector('.sheet-body');
    if (body) body.scrollTop = 0;
  }

  function advance() {
    if (!canAdvance()) return;
    const next = S.step + 1;
    if (next === 2) buildCustomizeStep();
    if (next === 3) buildReviewStep();
    if (S.step < STEPS.length - 1) goTo(next, false);
  }

  function retreat() {
    if (S.step > 0) goTo(S.step - 1, true);
  }

  function canAdvance() {
    if (S.step === 0) return !!S.college;
    if (S.step === 1) return !!S.kitId;
    return true;
  }

  function renderCurrentStep() {
    goTo(S.step);
    if (S.step === 0) buildCollegeStep();
    if (S.step === 1) buildKitStep();
    if (S.step === 2) buildCustomizeStep();
  }

  /* ── Progress ───────────────────────────────────── */
  function updateProgress() {
    progSteps.forEach((dot, i) => {
      const circle = dot.querySelector('.prog-dot');
      dot.classList.remove('active', 'done');
      if (i < S.step) {
        dot.classList.add('done');
        circle.innerHTML = svgCheck(10);
      } else if (i === S.step) {
        dot.classList.add('active');
        circle.textContent = i + 1;
      } else {
        circle.textContent = i + 1;
      }
    });
    progConns.forEach((c, i) => c.classList.toggle('done', i < S.step));
    if (stepLabel) stepLabel.textContent = STEP_LABELS[S.step] || '';
  }

  function svgCheck(size) {
    return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`;
  }

  /* ── Footer ─────────────────────────────────────── */
  function updateFooter() {
    backBtn.style.display = S.step > 0 ? 'flex' : 'none';

    if (S.step === STEPS.length - 1) {
      nextBtn.style.display = 'none';
    } else {
      nextBtn.style.display = 'inline-flex';
      nextBtn.textContent = NEXT_LABELS[S.step];
      const ok = canAdvance();
      nextBtn.disabled = !ok;
      nextBtn.style.opacity = ok ? '1' : '0.4';
    }

    const total = calcTotal();
    if (footerPrice) {
      footerPrice.textContent = S.kitId ? '₹' + total.toLocaleString('en-IN') : '—';
    }
  }

  /* ── Step 0: College ────────────────────────────── */
  function buildCollegeStep() {
    const el = document.getElementById('college-opts');
    if (!el) return;
    el.innerHTML = '';
    WISOR_DATA.colleges.forEach(col => {
      const btn = document.createElement('button');
      btn.className = 'college-opt' + (S.college === col.id ? ' sel' : '');
      btn.setAttribute('aria-pressed', S.college === col.id ? 'true' : 'false');
      btn.type = 'button';
      btn.innerHTML = `
        <div class="college-opt-emoji">${col.shortName === 'IIIT-A' ? '🏛️' : '⚙️'}</div>
        <div class="college-opt-body">
          <div class="college-opt-name">${col.name}</div>
          <div class="college-opt-desc">${col.description}</div>
        </div>
        <div class="college-opt-radio">${S.college === col.id ? svgCheck(10) : ''}</div>
      `;
      btn.addEventListener('click', () => {
        S.college = col.id;
        buildCollegeStep();
        updateFooter();
      });
      el.appendChild(btn);
    });
  }

  /* ── Step 1: Kit ────────────────────────────────── */
  function buildKitStep() {
    const el = document.getElementById('kit-opts');
    if (!el) return;
    el.innerHTML = '';
    WISOR_DATA.kits.forEach(kit => {
      const isSelected = S.kitId === kit.id;
      const isFeatured = kit.badge === 'Most Popular';
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'kit-opt' + (isSelected && isFeatured ? ' sel-featured' : isSelected ? ' sel' : '');
      btn.setAttribute('aria-pressed', isSelected ? 'true' : 'false');
      const tags = kit.includes.slice(0, 4);
      const more = kit.includes.length - 4;
      btn.innerHTML = `
        ${kit.badge ? `<div class="kit-opt-badge"><span class="badge ${isFeatured ? 'badge-dark' : 'badge-acc'}">${kit.badge}</span></div>` : ''}
        <div class="kit-opt-top">
          <div>
            <div class="kit-opt-name">${kit.name}</div>
            <div class="kit-opt-tagline">${kit.tagline}</div>
          </div>
          <div>
            <div class="kit-opt-price">₹${kit.basePrice.toLocaleString('en-IN')}</div>
            <div class="kit-opt-price-sub">onwards</div>
          </div>
        </div>
        <div class="kit-opt-desc">${kit.description}</div>
        <div class="kit-opt-tags">
          ${tags.map(t => `<span class="kit-opt-tag">${t}</span>`).join('')}
          ${more > 0 ? `<span class="kit-opt-tag">+${more} more</span>` : ''}
        </div>
      `;
      btn.addEventListener('click', () => {
        S.kitId = kit.id;
        // Seed default selections
        S.selections = {};
        WISOR_DATA.categories.forEach(cat => {
          const avail = cat.products.filter(p => p.tier.includes(kit.id));
          if (avail.length) S.selections[cat.id] = avail[0].id;
          else if (cat.products.length) S.selections[cat.id] = cat.products[0].id;
        });
        buildKitStep();
        updateFooter();
      });
      el.appendChild(btn);
    });
  }

  /* ── Step 2: Customise ──────────────────────────── */
  function buildCustomizeStep() {
    const el = document.getElementById('prod-cats');
    if (!el || !S.kitId) return;
    el.innerHTML = '';

    WISOR_DATA.categories.forEach((cat, catIdx) => {
      const group = document.createElement('div');
      group.className = 'prod-cat-group';
      group.setAttribute('role', 'listitem');

      const selId = S.selections[cat.id];
      const selProd = cat.products.find(p => p.id === selId);

      const header = document.createElement('button');
      header.type = 'button';
      header.className = 'prod-cat-btn' + (catIdx === 0 ? ' open' : '');
      header.setAttribute('aria-expanded', catIdx === 0 ? 'true' : 'false');
      header.innerHTML = `
        <span class="prod-cat-label">
          ${cat.icon}
          <span>${cat.name}</span>
          ${selProd ? `<span class="badge badge-acc" style="font-size:0.6rem;">${selProd.name}</span>` : ''}
        </span>
        <svg class="prod-cat-chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><polyline points="6 9 12 15 18 9"/></svg>
      `;

      const itemsWrap = document.createElement('div');
      itemsWrap.className = 'prod-items';

      cat.products.forEach(prod => {
        const isSel = S.selections[cat.id] === prod.id;
        const isFree = prod.price === 0;
        const inTier = prod.tier.includes(S.kitId);

        const item = document.createElement('button');
        item.type = 'button';
        item.className = 'prod-item' + (isSel ? ' sel' : '');
        item.setAttribute('aria-pressed', isSel ? 'true' : 'false');
        item.innerHTML = `
          <div class="prod-radio"></div>
          <div class="prod-content">
            <div class="prod-name">${prod.name}${!inTier ? '<span style="font-size:0.7rem;color:var(--c-text-3);margin-left:0.3rem;">(upgrade)</span>' : ''}</div>
            <div class="prod-outcome">${prod.outcome}</div>
            ${prod.recommendation ? `<div class="prod-rec">✦ ${prod.recommendation}</div>` : ''}
          </div>
          <div class="prod-price ${isFree && inTier ? 'incl' : ''}">
            ${isFree && inTier ? 'Included' : '+₹' + prod.price.toLocaleString('en-IN')}
          </div>
        `;
        item.addEventListener('click', () => {
          S.selections[cat.id] = prod.id;
          buildCustomizeStep();
          updateFooterPrice();
        });
        itemsWrap.appendChild(item);
      });

      header.addEventListener('click', () => {
        const isOpen = header.classList.contains('open');
        el.querySelectorAll('.prod-cat-btn.open').forEach(h => {
          h.classList.remove('open');
          h.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          header.classList.add('open');
          header.setAttribute('aria-expanded', 'true');
        }
      });

      group.appendChild(header);
      group.appendChild(itemsWrap);
      el.appendChild(group);
    });

    updateFooterPrice();
  }

  function updateFooterPrice() {
    if (footerPrice && S.kitId) {
      footerPrice.textContent = '₹' + calcTotal().toLocaleString('en-IN');
    }
  }

  /* ── Step 3: Review ─────────────────────────────── */
  function buildReviewStep() {
    const college = WISOR_DATA.colleges.find(c => c.id === S.college);
    const kit = WISOR_DATA.kits.find(k => k.id === S.kitId);

    // College tag
    const tagEl = document.getElementById('review-college-tag');
    if (tagEl && college && kit) {
      tagEl.innerHTML = `
        <div class="review-badge">
          <svg xmlns="http://www.w3.org/2000/svg" width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
          ${college.name} &nbsp;·&nbsp; ${kit.name}
        </div>
      `;
    }

    // Items
    const itemsEl = document.getElementById('review-items');
    if (!itemsEl || !kit) return;
    itemsEl.innerHTML = '';

    // Base kit row
    const baseRow = makeReviewRow(kit.name, 'Base kit', `₹${kit.basePrice.toLocaleString('en-IN')}`);
    itemsEl.appendChild(baseRow);

    // Upgrades
    Object.entries(S.selections).forEach(([catId, prodId]) => {
      const cat  = WISOR_DATA.categories.find(c => c.id === catId);
      const prod = cat?.products.find(p => p.id === prodId);
      if (!prod || prod.price === 0) return;
      itemsEl.appendChild(makeReviewRow(prod.name, cat.name + ' · upgrade', `+₹${prod.price.toLocaleString('en-IN')}`));
    });

    // Total
    const totalEl = document.getElementById('review-total');
    if (totalEl) totalEl.textContent = '₹' + calcTotal().toLocaleString('en-IN');
  }

  function makeReviewRow(name, cat, price) {
    const row = document.createElement('div');
    row.className = 'review-row';
    row.innerHTML = `
      <div>
        <div class="review-row-name">${name}</div>
        <div class="review-row-cat">${cat}</div>
      </div>
      <div class="review-row-price">${price}</div>
    `;
    return row;
  }

  /* ── Calc total ─────────────────────────────────── */
  function calcTotal() {
    const kit = WISOR_DATA.kits.find(k => k.id === S.kitId);
    let total = kit?.basePrice || 0;
    Object.entries(S.selections).forEach(([catId, prodId]) => {
      const cat  = WISOR_DATA.categories.find(c => c.id === catId);
      const prod = cat?.products.find(p => p.id === prodId);
      if (prod) total += prod.price;
    });
    return total;
  }

  /* ── WhatsApp checkout ──────────────────────────── */
  function handleCheckout(e) {
    e.preventDefault();
    const form = e.target;
    const name    = form.querySelector('#f-name').value.trim();
    const phone   = form.querySelector('#f-phone').value.trim();
    const college = form.querySelector('#f-college').value;
    const hostel  = form.querySelector('#f-hostel').value.trim();
    const room    = form.querySelector('#f-room').value.trim();
    const date    = form.querySelector('#f-date').value;

    if (!name || !phone || !college) {
      alert('Please fill in your name, phone number, and college.');
      return;
    }

    const kit       = WISOR_DATA.kits.find(k => k.id === S.kitId);
    const collegeD  = WISOR_DATA.colleges.find(c => c.id === S.college);
    const total     = calcTotal();

    const selLines = [];
    Object.entries(S.selections).forEach(([catId, prodId]) => {
      const cat  = WISOR_DATA.categories.find(c => c.id === catId);
      const prod = cat?.products.find(p => p.id === prodId);
      if (prod) selLines.push(`• ${cat.name}: ${prod.name}`);
    });

    const msg = [
      `Hi Wisor! I'd like to place an order for my hostel move-in kit.`,
      ``,
      `*My Details*`,
      `Name: ${name}`,
      `Phone: ${phone}`,
      `College: ${college}`,
      hostel ? `Hostel: ${hostel}` : null,
      room   ? `Room: ${room}`     : null,
      date   ? `Move-in date: ${date}` : null,
      ``,
      `*Kit Selected*`,
      `${kit?.name || ''} — ${collegeD?.name || ''}`,
      ``,
      `*Customisations*`,
      ...selLines,
      ``,
      `*Estimated Total: ₹${total.toLocaleString('en-IN')}*`,
      ``,
      `Please confirm availability and delivery. Thank you!`
    ].filter(l => l !== null).join('\n');

    const url = `https://wa.me/${WISOR_DATA.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  /* ── Render homepage kits list ──────────────────── */
  function renderKitsList() {
    const el = document.getElementById('kits-list');
    if (!el) return;
    el.innerHTML = '';

    WISOR_DATA.kits.forEach((kit, idx) => {
      const isFeatured = kit.badge === 'Most Popular';
      const row = document.createElement('div');
      row.className = 'kit-row reveal' + (isFeatured ? ' featured' : '') + (idx > 0 ? ' reveal-d' + idx : '');
      row.setAttribute('role', 'listitem');
      const tags4 = kit.includes.slice(0, 5);
      const more = kit.includes.length - 5;
      row.innerHTML = `
        <div class="kit-row-body">
          <div class="kit-row-header">
            <span class="kit-row-num">${String(idx + 1).padStart(2, '0')}</span>
            <div>
              ${kit.badge ? `<span class="badge ${isFeatured ? 'badge-dark' : 'badge-acc'}" style="margin-bottom:0.5rem;display:inline-flex;">${kit.badge}</span><br/>` : ''}
              <div class="kit-row-name">${kit.name}</div>
              <div class="kit-row-tagline">${kit.tagline}</div>
            </div>
          </div>
          <div class="kit-row-desc">${kit.description}</div>
          <div class="kit-row-tags">
            ${tags4.map(t => `<span class="kit-tag">${t}</span>`).join('')}
            ${more > 0 ? `<span class="kit-tag">+${more} more</span>` : ''}
          </div>
        </div>
        <div class="kit-row-aside">
          <div>
            <div class="kit-price-from">From</div>
            <div class="kit-price-amount">₹${kit.basePrice.toLocaleString('en-IN')}</div>
          </div>
          <button class="btn ${isFeatured ? 'btn-accent' : 'btn-outline'} kit-row-btn" data-kit="${kit.id}">
            Customise Kit
          </button>
        </div>
      `;
      row.querySelector('.kit-row-btn').addEventListener('click', () => {
        openBuilder();
        setTimeout(() => {
          S.kitId = kit.id;
          // seed defaults
          S.selections = {};
          WISOR_DATA.categories.forEach(cat => {
            const avail = cat.products.filter(p => p.tier.includes(kit.id));
            if (avail.length) S.selections[cat.id] = avail[0].id;
          });
          goTo(0);
          buildCollegeStep();
          updateFooter();
        }, 60);
      });
      el.appendChild(row);
    });
  }

  /* ── Render testimonials ────────────────────────── */
  function renderTestimonials() {
    const el = document.getElementById('testimonials-container');
    if (!el) return;
    el.innerHTML = '';
    WISOR_DATA.testimonials.forEach((t, i) => {
      const item = document.createElement('div');
      item.className = 'testimonial-item reveal reveal-d' + (i + 1);
      item.setAttribute('role', 'listitem');
      item.innerHTML = `
        <div class="testimonial-open-quote" aria-hidden="true">&ldquo;</div>
        <p class="testimonial-quote-text">${t.quote}</p>
        <div class="testimonial-byline">
          <div class="testimonial-avatar">${t.avatar}</div>
          <div>
            <div class="testimonial-name">${t.name}</div>
            <div class="testimonial-meta">${t.college} &nbsp;·&nbsp; ${t.batch}</div>
          </div>
        </div>
      `;
      el.appendChild(item);
    });
  }

  /* ── Render FAQ ─────────────────────────────────── */
  function renderFAQ() {
    const el = document.getElementById('faq-list');
    if (!el) return;
    el.innerHTML = '';
    WISOR_DATA.faqs.forEach((faq, i) => {
      const item = document.createElement('div');
      item.className = 'faq-item reveal';
      item.setAttribute('role', 'listitem');
      item.innerHTML = `
        <button class="faq-trigger" aria-expanded="false" id="faq-q-${i}" type="button">
          <span>${faq.question}</span>
          <div class="faq-icon" aria-hidden="true">
            <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
          </div>
        </button>
        <div class="faq-body" role="region" aria-labelledby="faq-q-${i}">
          <div class="faq-body-inner">${faq.answer}</div>
        </div>
      `;
      item.querySelector('.faq-trigger').addEventListener('click', () => {
        const isOpen = item.classList.contains('open');
        el.querySelectorAll('.faq-item.open').forEach(x => {
          x.classList.remove('open');
          x.querySelector('.faq-trigger').setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('open');
          item.querySelector('.faq-trigger').setAttribute('aria-expanded', 'true');
        }
      });
      el.appendChild(item);
    });
  }

  /* ── Populate checkout college selector ─────────── */
  function populateCollegeSel() {
    const sel = document.getElementById('f-college');
    if (!sel) return;
    // Remove existing options except placeholder
    while (sel.options.length > 1) sel.remove(1);
    WISOR_DATA.colleges.forEach(c => {
      const opt = document.createElement('option');
      opt.value = c.id;
      opt.textContent = c.name;
      sel.appendChild(opt);
    });
  }

  /* ── Scroll animations ──────────────────────────── */
  function initReveal() {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -32px 0px' });
    document.querySelectorAll('.reveal').forEach(el => obs.observe(el));
  }

  /* ── Sticky CTA ─────────────────────────────────── */
  function initStickyCTA() {
    const cta = document.getElementById('sticky-cta');
    const hero = document.querySelector('.hero');
    if (!cta || !hero) return;
    const obs = new IntersectionObserver(([entry]) => {
      cta.classList.toggle('vis', !entry.isIntersecting);
      cta.setAttribute('aria-hidden', entry.isIntersecting ? 'true' : 'false');
    }, { threshold: 0.2 });
    obs.observe(hero);
    document.getElementById('sticky-cta-btn')?.addEventListener('click', openBuilder);
  }

  /* ── Nav scroll ─────────────────────────────────── */
  function initNav() {
    const nav = document.getElementById('main-nav');
    if (!nav) return;
    const update = () => nav.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  /* ── Mobile nav ─────────────────────────────────── */
  function initMobileNav() {
    const burger = document.getElementById('hamburger');
    const menu   = document.getElementById('mobile-nav');
    if (!burger || !menu) return;

    function close() {
      burger.classList.remove('open');
      menu.classList.remove('open');
      menu.setAttribute('aria-hidden', 'true');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    }

    burger.addEventListener('click', () => {
      const open = burger.classList.toggle('open');
      menu.classList.toggle('open', open);
      menu.setAttribute('aria-hidden', open ? 'false' : 'true');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
      document.body.style.overflow = open ? 'hidden' : '';
    });

    menu.querySelectorAll('[data-close-mobile]').forEach(el => {
      el.addEventListener('click', close);
    });
  }

  /* ── Wire all events ────────────────────────────── */
  function initEvents() {
    // Open builder buttons
    document.querySelectorAll('[data-open-builder]').forEach(btn =>
      btn.addEventListener('click', openBuilder)
    );
    // Close
    document.getElementById('builder-close')?.addEventListener('click', closeBuilder);
    backdrop?.addEventListener('click', closeBuilder);
    // Navigation
    nextBtn?.addEventListener('click', advance);
    backBtn?.addEventListener('click', retreat);
    // Checkout
    document.getElementById('checkout-form')?.addEventListener('submit', handleCheckout);
    // Keyboard
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && S.open) closeBuilder();
    });
  }

  /* ── Hero image subtle zoom ─────────────────────── */
  function initHeroZoom() {
    const img = document.querySelector('.hero-img');
    if (!img) return;
    // Tiny scale on load for premium feel
    img.style.transform = 'scale(1.04)';
    img.addEventListener('load', () => {
      img.style.transition = 'transform 3s cubic-bezier(0.25,0.46,0.45,0.94)';
      img.style.transform = 'scale(1)';
    });
    if (img.complete) {
      setTimeout(() => {
        img.style.transition = 'transform 3s cubic-bezier(0.25,0.46,0.45,0.94)';
        img.style.transform = 'scale(1)';
      }, 100);
    }
  }

  /* ── Init ───────────────────────────────────────── */
  function init() {
    renderKitsList();
    renderTestimonials();
    renderFAQ();
    populateCollegeSel();
    buildCollegeStep();
    buildKitStep();
    goTo(0);
    initEvents();
    initNav();
    initMobileNav();
    initStickyCTA();
    initHeroZoom();

    requestAnimationFrame(() => setTimeout(initReveal, 80));
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
