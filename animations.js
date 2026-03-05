// ===== BIZNEST — animations.js =====

// ===== PARTICLE SYSTEM =====
function initParticles() {
  const canvas = document.getElementById('particleCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: Math.random() * 2 + 0.5,
    vx: (Math.random() - 0.5) * 0.4,
    vy: (Math.random() - 0.5) * 0.4,
    alpha: Math.random() * 0.5 + 0.1,
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(233,69,96,${p.alpha})`;
      ctx.fill();
      p.x += p.vx;
      p.y += p.vy;
      if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
      if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
    });
    // Draw connecting lines
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(233,69,96,${0.08 * (1 - dist / 120)})`;
          ctx.lineWidth = 0.5;
          ctx.stroke();
        }
      }
    }
    requestAnimationFrame(draw);
  }
  draw();
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ===== CUSTOM CURSOR =====
function initCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  let mx = 0, my = 0, rx = 0, ry = 0;
  document.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
  function animCursor() {
    dot.style.left = mx + 'px'; dot.style.top = my + 'px';
    rx += (mx - rx) * 0.15;
    ry += (my - ry) * 0.15;
    ring.style.left = rx + 'px'; ring.style.top = ry + 'px';
    requestAnimationFrame(animCursor);
  }
  animCursor();
  document.querySelectorAll('button, a, .ibtn, .pay-method, .advisor-card').forEach(el => {
    el.addEventListener('mouseenter', () => { ring.style.transform = 'translate(-50%,-50%) scale(1.6)'; ring.style.borderColor = 'rgba(233,69,96,0.8)'; });
    el.addEventListener('mouseleave', () => { ring.style.transform = 'translate(-50%,-50%) scale(1)'; ring.style.borderColor = 'rgba(233,69,96,0.5)'; });
  });
}

// ===== SCROLL REVEAL =====
function initScrollReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        if (entry.target.classList.contains('counter-section')) startCounters();
        // Stagger child fanim-cards
        entry.target.querySelectorAll('.fanim-card').forEach(c => c.classList.add('revealed'));
        // Timeline items
        entry.target.querySelectorAll('.tl-item').forEach((item, i) => {
          setTimeout(() => item.classList.add('revealed'), i * 150);
        });
        // Counter fills
        entry.target.querySelectorAll('.counter-fill').forEach(fill => {
          setTimeout(() => { fill.style.width = fill.style.width; }, 100);
        });
      }
    });
  }, { threshold: 0.15 });

  document.querySelectorAll('.reveal-section, .counter-section').forEach(el => observer.observe(el));
}

// ===== COUNTERS =====
let countersStarted = false;
function startCounters() {
  if (countersStarted) return;
  countersStarted = true;
  const cards = document.querySelectorAll('.counter-card');
  cards.forEach((card, i) => {
    const target = parseInt(card.dataset.target);
    const suffix = card.dataset.suffix || '';
    const el = card.querySelector('.counter-num');
    const fill = card.querySelector('.counter-fill');
    let start = 0;
    const duration = 1800;
    const step = target / (duration / 16);
    if (fill) fill.style.width = fill.getAttribute('style').match(/width:([^%]+%)/)?.[1] || '80%';
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      el.textContent = Math.floor(start) + suffix;
      if (start >= target) clearInterval(timer);
    }, 16);
  });
}

// ===== INTERACTIVE BUTTONS =====
function btnFeedback(btn, msg) {
  const orig = btn.innerHTML;
  btn.innerHTML = '✅ ' + msg;
  btn.style.background = '#27ae60';
  setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; }, 1500);
  showToast('✅ ' + msg);
}

function toggleSuccess(btn) {
  btn.classList.toggle('clicked');
  btn.textContent = btn.classList.contains('clicked') ? '✅ Delivered!' : '✅ Mark Delivered';
  showToast('📦 Status updated!');
}

function toggleWarning(btn) {
  btn.style.animation = 'shake 0.4s';
  btn.addEventListener('animationend', () => btn.style.animation = '', { once: true });
  showToast('⚠️ Low stock alert sent to manager!');
}

function toggleDanger(btn) {
  btn.classList.add('shaking');
  btn.addEventListener('animationend', () => btn.classList.remove('shaking'), { once: true });
  if (confirm('Are you sure you want to delete this item?')) {
    showToast('🗑️ Item deleted!');
  }
}

function triggerLoader(btn) {
  if (btn.classList.contains('loading')) return;
  const origText = btn.textContent;
  btn.classList.add('loading');
  btn.innerHTML = '<div class="btn-spinner"></div> Generating...';
  setTimeout(() => {
    btn.classList.remove('loading');
    btn.innerHTML = '✅ Report Ready!';
    showToast('📊 Report generated successfully!');
    setTimeout(() => { btn.innerHTML = origText; }, 2000);
  }, 2500);
}

function triggerProgress(btn) {
  if (btn.dataset.running) return;
  btn.dataset.running = 'true';
  const wrap = document.createElement('div');
  wrap.className = 'progress-bar-wrap';
  btn.appendChild(wrap);
  const origText = btn.childNodes[0].textContent || btn.textContent;
  btn.childNodes[0].textContent = '📤 Uploading...';
  setTimeout(() => { wrap.style.width = '100%'; }, 50);
  setTimeout(() => {
    btn.removeChild(wrap);
    btn.textContent = '✅ Uploaded!';
    delete btn.dataset.running;
    showToast('✅ Products uploaded!');
    setTimeout(() => { btn.textContent = origText; }, 2000);
  }, 2200);
}

function toggleFeedback(input, label) {
  showToast(input.checked ? `✅ ${label} enabled` : `🔕 ${label} disabled`);
}

// Ripple effect
document.addEventListener('click', function (e) {
  const btn = e.target.closest('.ibtn-ripple');
  if (!btn) return;
  const rect = btn.getBoundingClientRect();
  const ripple = document.createElement('span');
  ripple.className = 'ripple-effect';
  const size = Math.max(rect.width, rect.height);
  ripple.style.cssText = `width:${size}px;height:${size}px;left:${e.clientX - rect.left - size / 2}px;top:${e.clientY - rect.top - size / 2}px`;
  btn.appendChild(ripple);
  ripple.addEventListener('animationend', () => ripple.remove());
});

// ===== ANIMATED WORD =====
function initAnimWord() {
  const el = document.getElementById('animWord');
  if (!el) return;
  const words = ['Launch? 🚀', 'Grow? 📈', 'Scale? 🌍', 'Succeed? 🏆'];
  let i = 0;
  setInterval(() => {
    i = (i + 1) % words.length;
    el.style.opacity = '0';
    el.style.transform = 'translateY(-10px)';
    setTimeout(() => {
      el.textContent = words[i];
      el.style.opacity = '1';
      el.style.transform = 'translateY(0)';
      el.style.transition = 'all 0.4s';
    }, 300);
  }, 3000);
}

// ===== PAYMENT FLOW =====
let currentPayStep = 1;
let selectedPayMethod = 'upi';

function goToPayStep(step) {
  // Validate step 1
  if (step === 2 && currentPayStep === 1) {
    const name = document.getElementById('delivName')?.value;
    const phone = document.getElementById('delivPhone')?.value;
    if (!name || !phone) { showToast('⚠️ Please fill in your name and phone'); return; }
  }

  // Hide all steps
  document.querySelectorAll('.pay-form-step').forEach(s => s.classList.remove('active'));
  // Show target
  document.getElementById('pay-step-' + step)?.classList.add('active');

  // Update step indicators
  for (let i = 1; i <= 3; i++) {
    const ind = document.getElementById('step-ind-' + i);
    if (!ind) continue;
    ind.classList.remove('active', 'done');
    if (i < step) ind.classList.add('done');
    else if (i === step) ind.classList.add('active');
  }

  currentPayStep = step;

  // Step 3: simulate processing
  if (step === 3) simulatePayment();
}

function simulatePayment() {
  const processing = document.getElementById('payProcessing');
  const success = document.getElementById('paySuccess');
  if (!processing || !success) return;
  processing.style.display = 'block';
  success.style.display = 'none';
  setTimeout(() => {
    processing.style.display = 'none';
    success.style.display = 'block';
    // Mark step 3 as done
    document.getElementById('step-ind-3')?.classList.add('done');
    showToast('🎉 Payment of ₹2,447 successful!');
  }, 2800);
}

function selectPayMethod(el, method) {
  document.querySelectorAll('.pay-method').forEach(m => m.classList.remove('active'));
  document.querySelectorAll('.pm-panel').forEach(p => p.classList.remove('active'));
  el.classList.add('active');
  selectedPayMethod = method;
  const panel = document.getElementById('panel-' + method);
  if (panel) panel.classList.add('active');
}

function verifyUPI() {
  showToast('✅ UPI ID verified successfully!');
}

function selectUPIApp(btn, app) {
  document.querySelectorAll('.upi-app-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  showToast('📱 ' + app.charAt(0).toUpperCase() + app.slice(1) + ' selected');
}

function selectBank(btn) {
  document.querySelectorAll('.bank-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  showToast('🏦 ' + btn.textContent + ' selected');
}

function selectWallet(btn) {
  document.querySelectorAll('.wallet-btn').forEach(b => b.classList.remove('selected'));
  btn.classList.add('selected');
  showToast('👛 ' + btn.textContent.trim() + ' selected');
}

function formatCard(input) {
  let val = input.value.replace(/\D/g, '').slice(0, 16);
  input.value = val.replace(/(.{4})/g, '$1 ').trim();
}

function formatExpiry(input) {
  let val = input.value.replace(/\D/g, '').slice(0, 4);
  if (val.length >= 3) val = val.slice(0, 2) + '/' + val.slice(2);
  input.value = val;
}

function updateCardDisplay() {
  const num = document.querySelector('#panel-card input[type=text]')?.value || '';
  const display = num.padEnd(19, '•').slice(0, 19).replace(/[0-9]/g, d => d).replace(/\s/g, ' ');
  const el = document.getElementById('cardNumDisplay');
  if (el) el.textContent = num || '•••• •••• •••• ••••';
}

function applyPromo() {
  const code = document.getElementById('promoInput')?.value.trim().toUpperCase();
  const msg = document.getElementById('promoMsg');
  if (!msg) return;
  if (code === 'BIZNEST10') {
    msg.textContent = '✅ Promo applied! ₹272 off';
    msg.style.color = '#27ae60';
    showToast('🎁 Promo code applied!');
  } else if (code === '') {
    msg.textContent = '⚠️ Please enter a promo code';
    msg.style.color = '#e67e22';
  } else {
    msg.textContent = '❌ Invalid promo code. Try: BIZNEST10';
    msg.style.color = '#e74c3c';
  }
}

function selectPlan(btn, plan) {
  showToast('🎉 ' + plan + ' plan selected! Redirecting to payment...');
  setTimeout(() => goToPayStep && goToPayStep(1), 500);
}

// ===== EXPERT PAGE =====
const EXPERTS = [
  { name: 'Dr. Priya Venkatesh', title: 'Senior Finance Advisor', rating: '4.9 ★ (312 reviews)', tags: ['Finance', 'GST', 'Funding'], bio: '15+ years helping small businesses with financial planning, GST compliance, and startup funding. Former CFO of a ₹50Cr company.', sessions: '1,240 sessions', price: '₹499/hr', color: '#e94560' },
  { name: 'Karan Malhotra', title: 'Digital Marketing Expert', rating: '4.8 ★ (287 reviews)', tags: ['SEO', 'Social Media', 'Ads'], bio: 'Built digital presence for 200+ local businesses. Specialist in Instagram, Google Ads, and WhatsApp marketing for SMBs.', sessions: '987 sessions', price: '₹399/hr', color: '#2980b9' },
  { name: 'Lakshmi Iyer', title: 'Operations & Supply Chain', rating: '4.9 ★ (198 reviews)', tags: ['Inventory', 'Logistics', 'Ops'], bio: 'Expert in optimizing supply chains and inventory management for small manufacturers and retail businesses in South India.', sessions: '743 sessions', price: '₹449/hr', color: '#27ae60' },
  { name: 'Rahul Nambiar', title: 'Tech & E-Commerce Advisor', rating: '4.7 ★ (156 reviews)', tags: ['Tech', 'E-Commerce', 'Automation'], bio: 'Helps traditional businesses go digital. Expert in setting up online stores, payment systems, and business automation tools.', sessions: '621 sessions', price: '₹549/hr', color: '#8e44ad' },
  { name: 'Advocate S. Sharma', title: 'Business Legal Advisor', rating: '4.8 ★ (134 reviews)', tags: ['Legal', 'Compliance', 'Contracts'], bio: 'Specializes in business law, MSME registration, trademark, and contract drafting for entrepreneurs and small business owners.', sessions: '512 sessions', price: '₹699/hr', color: '#e67e22' },
  { name: 'Meghna Kapoor', title: 'Brand & Sales Strategist', rating: '4.9 ★ (223 reviews)', tags: ['Marketing', 'Branding', 'Sales'], bio: 'Former brand manager at a top FMCG company. Now coaches local businesses to build memorable brands and boost sales.', sessions: '891 sessions', price: '₹399/hr', color: '#16a085' },
];

const EXPERT_CATEGORIES = { finance: [0, 4], marketing: [1, 5], operations: [2], tech: [3], legal: [4] };

function renderAdvisors(list) {
  const grid = document.getElementById('advisorsGrid');
  if (!grid) return;
  grid.innerHTML = list.map(e => `
    <div class="advisor-card">
      <div class="advisor-top">
        <div class="advisor-avatar" style="background:${e.color}">${e.name.split(' ').slice(0,2).map(w=>w[0]).join('')}</div>
        <div>
          <div class="advisor-name">${e.name}</div>
          <div class="advisor-title">${e.title}</div>
          <div class="advisor-rating">${e.rating}</div>
        </div>
      </div>
      <div class="advisor-tags">${e.tags.map(t => `<span class="advisor-tag">${t}</span>`).join('')}</div>
      <div class="advisor-bio">${e.bio}</div>
      <div class="advisor-footer">
        <div>
          <div class="advisor-sessions">📊 ${e.sessions}</div>
          <div class="advisor-price">${e.price}</div>
        </div>
        <button class="book-btn" onclick="bookExpert('${e.name}')">Book Session</button>
      </div>
    </div>
  `).join('');
}

function filterExperts(cat, btn) {
  document.querySelectorAll('.expert-filter-bar .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  if (cat === 'all') { renderAdvisors(EXPERTS); return; }
  const indices = EXPERT_CATEGORIES[cat] || [];
  renderAdvisors(indices.map(i => EXPERTS[i]));
}

function bookExpert(name) {
  showToast(`📅 Booking session with ${name}...`);
  setTimeout(() => showToast(`✅ Session booked! Check your email.`), 1800);
}

// ASK FORM
function submitAsk() {
  const name = document.getElementById('askName')?.value.trim();
  const biz = document.getElementById('askBizType')?.value;
  const topic = document.getElementById('askTopic')?.value;
  const question = document.getElementById('askQuestion')?.value.trim();
  if (!name || !biz || !topic || !question) {
    showToast('⚠️ Please fill all fields');
    return;
  }
  const experts = ['Dr. Priya Venkatesh', 'Karan Malhotra', 'Lakshmi Iyer', 'Rahul Nambiar'];
  const matched = experts[Math.floor(Math.random() * experts.length)];
  document.getElementById('matchedExpert').textContent = matched;
  document.getElementById('askFormInner').style.display = 'none';
  document.getElementById('askSuccess').style.display = 'block';
  showToast('✅ Your question has been submitted!');
}

function resetAsk() {
  document.getElementById('askFormInner').style.display = 'flex';
  document.getElementById('askSuccess').style.display = 'none';
  ['askName','askQuestion'].forEach(id => { const el = document.getElementById(id); if(el) el.value = ''; });
}

// CHAT MODULE
let chatOpen = false;
function toggleChat() {
  chatOpen = !chatOpen;
  const win = document.getElementById('chatWindow');
  const notif = document.querySelector('.chat-notif');
  if (win) win.classList.toggle('open', chatOpen);
  if (notif && chatOpen) notif.style.display = 'none';
}

const BOT_REPLIES = {
  'revenue': 'Great question! To increase revenue, focus on 3 things: (1) Increase average order value with bundles, (2) Bring back repeat customers with loyalty programs, and (3) Use WhatsApp marketing to reach local customers. Shall I elaborate on any of these?',
  'cash flow': 'Cash flow is the lifeblood of any small business! Key tips: Track daily receipts vs expenses, maintain a 30-day emergency fund, offer early payment discounts to customers, and negotiate longer payment terms with suppliers. Want a detailed cash flow template?',
  'loan': 'For small business loans, I recommend: (1) MUDRA Loan — up to ₹10L, no collateral needed. (2) CGTMSE scheme for MSMEs. (3) Local cooperative banks often have better rates. Your eligibility depends on business vintage and turnover. Book a session with me for a personalized loan strategy!',
  'default': "That's a great question for your business! Based on what you've shared, I'd suggest booking a full consultation session for a detailed strategy. In the meantime, have you checked the BizNest dashboard analytics? It often reveals quick wins. 😊"
};

function sendChat() {
  const input = document.getElementById('chatInput');
  if (!input || !input.value.trim()) return;
  const msg = input.value.trim();
  input.value = '';

  // User message
  appendChatMsg(msg, 'user');

  // Hide quick replies
  document.getElementById('quickReplies').style.display = 'none';

  // Bot typing
  const typingEl = document.createElement('div');
  typingEl.className = 'chat-msg bot';
  typingEl.innerHTML = '<div class="chat-typing"><div class="typing-dot"></div><div class="typing-dot"></div><div class="typing-dot"></div></div>';
  document.getElementById('chatMessages').appendChild(typingEl);
  scrollChat();

  setTimeout(() => {
    typingEl.remove();
    const lower = msg.toLowerCase();
    let reply = BOT_REPLIES.default;
    if (lower.includes('revenue') || lower.includes('sales') || lower.includes('increase')) reply = BOT_REPLIES['revenue'];
    else if (lower.includes('cash') || lower.includes('flow') || lower.includes('money')) reply = BOT_REPLIES['cash flow'];
    else if (lower.includes('loan') || lower.includes('fund') || lower.includes('capital')) reply = BOT_REPLIES['loan'];
    appendChatMsg(reply, 'bot');
  }, 1400);
}

function sendQuick(msg) {
  document.getElementById('chatInput').value = msg;
  sendChat();
}

function appendChatMsg(text, type) {
  const container = document.getElementById('chatMessages');
  const now = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
  const div = document.createElement('div');
  div.className = 'chat-msg ' + type;
  div.innerHTML = `<div class="chat-bubble">${text}</div><div class="chat-time">${now}</div>`;
  container.appendChild(div);
  scrollChat();
}

function scrollChat() {
  const msgs = document.getElementById('chatMessages');
  if (msgs) msgs.scrollTop = msgs.scrollHeight;
}

// ===== UPDATE NAV IN OLD PAGES =====
function updateNavLinks() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    a.classList.remove('active');
    const href = a.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });
}

// ===== INIT ALL =====
document.addEventListener('DOMContentLoaded', () => {
  initParticles();
  initCursor();
  initScrollReveal();
  initAnimWord();
  updateNavLinks();

  // Expert page
  if (document.getElementById('advisorsGrid')) {
    renderAdvisors(EXPERTS);
  }

  // Payment page — init first method panel
  const firstPanel = document.getElementById('panel-upi');
  if (firstPanel) firstPanel.classList.add('active');
});
