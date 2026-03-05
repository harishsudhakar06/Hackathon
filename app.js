// ===== BIZNEST — app.js =====

// ===== SAMPLE DATA =====
const PRODUCTS = [
  { id:1, name:"Organic Honey", store:"Nature's Best", price:320, rating:4.8, category:"food", emoji:"🍯", reviews:124 },
  { id:2, name:"Handloom Kurta", store:"Weaves of India", price:890, rating:4.6, category:"fashion", emoji:"👘", reviews:87 },
  { id:3, name:"Terracotta Vase", store:"Clay Craft Studio", price:550, rating:4.9, category:"crafts", emoji:"🏺", reviews:63 },
  { id:4, name:"Bluetooth Speaker", store:"Tech Local", price:1200, rating:4.4, category:"electronics", emoji:"🔊", reviews:201 },
  { id:5, name:"Herbal Face Pack", store:"Glow Organics", price:299, rating:4.7, category:"beauty", emoji:"🧴", reviews:156 },
  { id:6, name:"Mango Pickle", store:"Grandma's Kitchen", price:180, rating:4.9, category:"food", emoji:"🥭", reviews:312 },
  { id:7, name:"Block Print Saree", store:"Rajasthani Threads", price:2200, rating:4.8, category:"fashion", emoji:"🎨", reviews:45 },
  { id:8, name:"Bamboo Pen Stand", store:"Green Crafts", price:240, rating:4.5, category:"crafts", emoji:"🎋", reviews:78 },
  { id:9, name:"Wooden Phone Stand", store:"Craftwood", price:450, rating:4.3, category:"electronics", emoji:"📱", reviews:99 },
  { id:10, name:"Coconut Hair Oil", store:"Kerala Naturals", price:199, rating:4.8, category:"beauty", emoji:"🥥", reviews:234 },
  { id:11, name:"Mixed Dry Fruits", store:"Nutri Corner", price:680, rating:4.6, category:"food", emoji:"🥜", reviews:167 },
  { id:12, name:"Hand-painted Pot", store:"Art by Priya", price:380, rating:4.9, category:"crafts", emoji:"🎭", reviews:51 },
];

const ORDERS = [
  { id:"#ORD-4521", customer:"Meena R.", product:"Organic Honey", amount:"₹320", status:"delivered", emoji:"🍯" },
  { id:"#ORD-4520", customer:"Suresh K.", product:"Handloom Kurta", amount:"₹890", status:"processing", emoji:"👘" },
  { id:"#ORD-4519", customer:"Anita S.", product:"Terracotta Vase", amount:"₹550", status:"pending", emoji:"🏺" },
  { id:"#ORD-4518", customer:"Raj T.", product:"Herbal Face Pack", amount:"₹299", status:"delivered", emoji:"🧴" },
  { id:"#ORD-4517", customer:"Kavya P.", product:"Mango Pickle", amount:"₹180", status:"processing", emoji:"🥭" },
  { id:"#ORD-4516", customer:"Venkat M.", product:"Bluetooth Speaker", amount:"₹1200", status:"pending", emoji:"🔊" },
  { id:"#ORD-4515", customer:"Deepa L.", product:"Coconut Hair Oil", amount:"₹199", status:"delivered", emoji:"🥥" },
  { id:"#ORD-4514", customer:"Arjun N.", product:"Mixed Dry Fruits", amount:"₹680", status:"delivered", emoji:"🥜" },
];

const INVENTORY = [
  { name:"Organic Honey", cat:"Food", price:320, stock:14, emoji:"🍯" },
  { name:"Handloom Kurta", cat:"Fashion", price:890, stock:32, emoji:"👘" },
  { name:"Terracotta Vase", cat:"Crafts", price:550, stock:8, emoji:"🏺" },
  { name:"Bluetooth Speaker", cat:"Electronics", price:1200, stock:21, emoji:"🔊" },
  { name:"Herbal Face Pack", cat:"Beauty", price:299, stock:3, emoji:"🧴" },
  { name:"Mango Pickle", cat:"Food", price:180, stock:67, emoji:"🥭" },
  { name:"Block Print Saree", cat:"Fashion", price:2200, stock:5, emoji:"🎨" },
  { name:"Bamboo Pen Stand", cat:"Crafts", price:240, stock:40, emoji:"🎋" },
  { name:"Coconut Hair Oil", cat:"Beauty", price:199, stock:2, emoji:"🥥" },
  { name:"Mixed Dry Fruits", cat:"Food", price:680, stock:28, emoji:"🥜" },
];

const CUSTOMERS = [
  { name:"Meena Raghavan", email:"meena@mail.com", orders:12, spent:"₹4,320", color:"#e94560" },
  { name:"Suresh Kumar", email:"suresh@mail.com", orders:7, spent:"₹2,890", color:"#2980b9" },
  { name:"Anita Sharma", email:"anita@mail.com", orders:19, spent:"₹8,750", color:"#27ae60" },
  { name:"Raj Tiwari", email:"raj@mail.com", orders:4, spent:"₹1,480", color:"#8e44ad" },
  { name:"Kavya Pillai", email:"kavya@mail.com", orders:22, spent:"₹11,200", color:"#e67e22" },
  { name:"Venkat Murthy", email:"venkat@mail.com", orders:3, spent:"₹3,600", color:"#16a085" },
  { name:"Deepa Lakshmanan", email:"deepa@mail.com", orders:15, spent:"₹5,990", color:"#c0392b" },
  { name:"Arjun Nair", email:"arjun@mail.com", orders:9, spent:"₹6,120", color:"#2c3e50" },
];

const TOP_PRODUCTS = [
  { name:"Mango Pickle", sales:312, revenue:"₹56,160", emoji:"🥭", pct:95 },
  { name:"Coconut Hair Oil", sales:234, revenue:"₹46,566", emoji:"🥥", pct:75 },
  { name:"Organic Honey", sales:124, revenue:"₹39,680", emoji:"🍯", pct:55 },
  { name:"Herbal Face Pack", sales:156, revenue:"₹46,644", emoji:"🧴", pct:70 },
  { name:"Bluetooth Speaker", sales:201, revenue:"₹2,41,200", emoji:"🔊", pct:85 },
];

const WEEKLY_DATA = [65, 72, 55, 90, 78, 88, 95];
const ANALYTICS_DATA = [40, 55, 48, 62, 58, 74, 65, 80, 72, 88, 79, 95, 82, 90, 76, 100, 85, 92, 78, 96, 83, 89, 75, 94, 88, 97, 84, 93, 80, 98];

// ===== CART STATE =====
let cart = [];
let currentCategory = 'all';

// ===== HELPERS =====
function stars(rating) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5;
  let s = '★'.repeat(full);
  if(half) s += '½';
  return `<span style="color:#f5a623">${s}</span> <span style="color:#aaa">(${rating})</span>`;
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if(!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 2500);
}

// ===== PRODUCTS PAGE =====
function renderProducts(list) {
  const grid = document.getElementById('productsGrid');
  if(!grid) return;
  if(list.length === 0) {
    grid.innerHTML = '<p style="color:var(--muted);text-align:center;padding:60px;grid-column:1/-1">No products found.</p>';
    document.getElementById('productCount').textContent = 'Showing 0 products';
    return;
  }
  document.getElementById('productCount').textContent = `Showing ${list.length} product${list.length !== 1 ? 's' : ''}`;
  grid.innerHTML = list.map(p => `
    <div class="product-card">
      <div class="product-img">${p.emoji}</div>
      <div class="product-body">
        <div class="product-category">${p.category}</div>
        <div class="product-name">${p.name}</div>
        <div class="product-store">🏪 ${p.store}</div>
        <div class="product-rating">${stars(p.rating)} · ${p.reviews} reviews</div>
        <div class="product-footer">
          <div class="product-price">₹${p.price}</div>
          <button class="add-cart-btn" onclick="addToCart(${p.id})">+ Add</button>
        </div>
      </div>
    </div>
  `).join('');
}

function setCategory(cat, btn) {
  currentCategory = cat;
  document.querySelectorAll('.category-filters .filter-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  filterProducts();
}

function filterProducts() {
  const search = (document.getElementById('searchInput')?.value || '').toLowerCase();
  const sort = document.getElementById('sortSelect')?.value || 'default';

  let list = PRODUCTS.filter(p => {
    const matchCat = currentCategory === 'all' || p.category === currentCategory;
    const matchSearch = p.name.toLowerCase().includes(search) || p.store.toLowerCase().includes(search);
    return matchCat && matchSearch;
  });

  if(sort === 'price-low') list.sort((a,b) => a.price - b.price);
  else if(sort === 'price-high') list.sort((a,b) => b.price - a.price);
  else if(sort === 'rating') list.sort((a,b) => b.rating - a.rating);

  renderProducts(list);
}

function addToCart(id) {
  const p = PRODUCTS.find(x => x.id === id);
  if(!p) return;
  cart.push(p);
  updateCart();
  showToast(`🛒 ${p.name} added to cart!`);
}

function updateCart() {
  const count = document.getElementById('cartCount');
  if(count) count.textContent = cart.length;

  const items = document.getElementById('cartItems');
  const footer = document.getElementById('cartFooter');
  if(!items) return;

  if(cart.length === 0) {
    items.innerHTML = '<p class="empty-cart">Your cart is empty.</p>';
    if(footer) footer.innerHTML = '';
    return;
  }

  items.innerHTML = cart.map((p, i) => `
    <div class="cart-item">
      <div class="cart-item-icon">${p.emoji}</div>
      <div class="cart-item-info">
        <div class="cart-item-name">${p.name}</div>
        <div class="cart-item-store">${p.store}</div>
        <div class="cart-item-price">₹${p.price}</div>
      </div>
      <button class="cart-item-remove" onclick="removeFromCart(${i})">✕</button>
    </div>
  `).join('');

  const total = cart.reduce((sum, p) => sum + p.price, 0);
  if(footer) footer.innerHTML = `
    <div class="cart-total"><span>Total</span><span>₹${total.toLocaleString()}</span></div>
    <button class="checkout-btn" onclick="checkout()">Proceed to Checkout →</button>
  `;
}

function removeFromCart(idx) {
  cart.splice(idx, 1);
  updateCart();
}

function toggleCart() {
  document.getElementById('cartSidebar')?.classList.toggle('open');
  document.getElementById('cartOverlay')?.classList.toggle('show');
}

function checkout() {
  cart = [];
  updateCart();
  toggleCart();
  showToast('✅ Order placed successfully!');
}

// ===== DASHBOARD =====
function showSection(name, el) {
  document.querySelectorAll('.dash-section').forEach(s => s.classList.remove('active'));
  document.querySelectorAll('.dash-link').forEach(l => l.classList.remove('active'));
  const section = document.getElementById('section-' + name);
  if(section) section.classList.add('active');
  if(el) el.classList.add('active');
}

function renderDashboard() {
  // Date
  const dateEl = document.getElementById('dashDate');
  if(dateEl) {
    const now = new Date();
    dateEl.textContent = now.toLocaleDateString('en-IN', { weekday:'long', year:'numeric', month:'long', day:'numeric' });
  }

  // Revenue chart
  const chartArea = document.getElementById('revenueChart');
  if(chartArea) {
    chartArea.innerHTML = WEEKLY_DATA.map((h,i) =>
      `<div class="bar ${i === 6 ? 'active' : ''}" style="height:${h}%"></div>`
    ).join('');
  }

  // Recent orders
  const recentOrders = document.getElementById('recentOrders');
  if(recentOrders) {
    recentOrders.innerHTML = ORDERS.slice(0, 5).map(o => `
      <div class="order-item">
        <div class="order-icon">${o.emoji}</div>
        <div class="order-info">
          <div class="order-id">${o.id}</div>
          <div class="order-name">${o.customer} · ${o.product}</div>
        </div>
        <span class="order-status status-${o.status}">${o.status}</span>
        <div class="order-amount">${o.amount}</div>
      </div>
    `).join('');
  }

  // Top products
  const topProducts = document.getElementById('topProducts');
  if(topProducts) {
    topProducts.innerHTML = TOP_PRODUCTS.map((p, i) => `
      <div class="top-product-item">
        <div class="tp-rank">${String(i+1).padStart(2,'0')}</div>
        <div class="tp-icon">${p.emoji}</div>
        <div class="tp-info">
          <div class="tp-name">${p.name}</div>
          <div class="tp-sales">${p.sales} sales</div>
        </div>
        <div class="tp-bar-wrap">
          <div class="tp-bar"><div class="tp-bar-fill" style="width:${p.pct}%"></div></div>
        </div>
        <div class="tp-revenue">${p.revenue}</div>
      </div>
    `).join('');
  }

  // Orders table
  renderOrdersTable('all');

  // Inventory
  renderInventory();

  // Analytics
  renderAnalytics();

  // Customers
  renderCustomers();
}

let ordersFilter = 'all';
function filterOrders(status, btn) {
  ordersFilter = status;
  document.querySelectorAll('.orders-filter .filter-btn').forEach(b => b.classList.remove('active'));
  if(btn) btn.classList.add('active');
  renderOrdersTable(status);
}

function renderOrdersTable(status) {
  const tbody = document.getElementById('ordersTableBody');
  if(!tbody) return;
  const list = status === 'all' ? ORDERS : ORDERS.filter(o => o.status === status);
  tbody.innerHTML = list.map(o => `
    <tr>
      <td><strong>${o.id}</strong></td>
      <td>${o.customer}</td>
      <td>${o.emoji} ${o.product}</td>
      <td><strong>${o.amount}</strong></td>
      <td><span class="order-status status-${o.status}">${o.status}</span></td>
      <td>
        <button class="action-btn" onclick="updateOrderStatus('${o.id}')">Update Status</button>
      </td>
    </tr>
  `).join('');
}

function updateOrderStatus(id) {
  showToast(`📦 Order ${id} status updated!`);
}

function renderInventory() {
  const grid = document.getElementById('inventoryGrid');
  if(!grid) return;
  grid.innerHTML = INVENTORY.map(p => `
    <div class="inv-card">
      <div class="inv-emoji">${p.emoji}</div>
      <div class="inv-name">${p.name}</div>
      <div class="inv-cat">${p.cat}</div>
      <div class="inv-stats">
        <span class="inv-price">₹${p.price}</span>
        <span class="inv-stock ${p.stock <= 5 ? 'low' : 'ok'}">
          ${p.stock <= 5 ? '⚠️ ' : '✅ '}${p.stock} units
        </span>
      </div>
    </div>
  `).join('');
}

function showAddProduct() {
  document.getElementById('addProductModal')?.classList.add('open');
}

function closeModal() {
  document.getElementById('addProductModal')?.classList.remove('open');
}

function addProduct() {
  const name = document.getElementById('newProductName')?.value.trim();
  const cat = document.getElementById('newProductCat')?.value;
  const price = document.getElementById('newProductPrice')?.value;
  const stock = document.getElementById('newProductStock')?.value;

  if(!name || !price || !stock) {
    showToast('⚠️ Please fill all fields');
    return;
  }

  const emojis = { Food:'🍱', Fashion:'👗', Crafts:'🎨', Electronics:'📱', Beauty:'💅' };
  INVENTORY.unshift({ name, cat, price: parseInt(price), stock: parseInt(stock), emoji: emojis[cat] || '📦' });
  closeModal();
  renderInventory();
  showToast(`✅ ${name} added to inventory!`);

  // Clear form
  ['newProductName','newProductPrice','newProductStock','newProductDesc'].forEach(id => {
    const el = document.getElementById(id);
    if(el) el.value = '';
  });
}

function renderAnalytics() {
  // 30-day chart
  const aChart = document.getElementById('analyticsChart');
  if(aChart) {
    const max = Math.max(...ANALYTICS_DATA);
    aChart.innerHTML = ANALYTICS_DATA.map((v, i) =>
      `<div class="bar ${i === ANALYTICS_DATA.length - 1 ? 'active' : ''}" style="height:${(v/max)*100}%" title="Day ${i+1}: ₹${(v*180).toLocaleString()}"></div>`
    ).join('');
  }

  // Donut legend
  const legend = document.getElementById('donutLegend');
  if(legend) {
    const cats = [
      { label:'Food', pct:'35%', color:'#e94560' },
      { label:'Beauty', pct:'23%', color:'#27ae60' },
      { label:'Fashion', pct:'16%', color:'#2980b9' },
      { label:'Electronics', pct:'13%', color:'#f5a623' },
      { label:'Crafts', pct:'13%', color:'#8e44ad' },
    ];
    legend.innerHTML = cats.map(c =>
      `<div class="legend-item"><div class="legend-dot" style="background:${c.color}"></div>${c.label} <strong style="margin-left:auto">${c.pct}</strong></div>`
    ).join('');
  }

  // Heatmap
  const heatmap = document.getElementById('heatmap');
  if(heatmap) {
    const days = ['M','T','W','T','F','S','S'];
    const weeks = 4;
    let cells = '';
    const colors = ['#f0ebe1','#fbbcd1','#f56e88','#e94560','#c73652'];
    for(let w = 0; w < weeks; w++) {
      for(let d = 0; d < 7; d++) {
        const val = Math.floor(Math.random() * 5);
        const label = w === 0 ? days[d] : '';
        cells += `<div class="heat-cell" style="background:${colors[val]};opacity:${0.5 + val*0.1 + 0.3}" title="Revenue: ₹${(val*3000+1000).toLocaleString()}">${w===0?days[d]:''}</div>`;
      }
    }
    heatmap.innerHTML = cells;
  }
}

function renderCustomers() {
  const grid = document.getElementById('customersGrid');
  if(!grid) return;
  grid.innerHTML = CUSTOMERS.map(c => `
    <div class="customer-card">
      <div class="customer-avatar" style="background:${c.color}">${c.name.split(' ').map(w=>w[0]).join('')}</div>
      <div>
        <div class="customer-name">${c.name}</div>
        <div class="customer-email">${c.email}</div>
        <div class="customer-stats"><span>${c.orders} orders</span> · ${c.spent} spent</div>
      </div>
    </div>
  `).join('');
}

// ===== INIT =====
document.addEventListener('DOMContentLoaded', () => {
  // Products page
  if(document.getElementById('productsGrid')) {
    renderProducts(PRODUCTS);
    updateCart();
  }

  // Dashboard
  if(document.getElementById('section-overview')) {
    renderDashboard();
  }

  // Highlight current nav link
  const page = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a').forEach(a => {
    if(a.getAttribute('href') === page) a.classList.add('active');
  });
});
