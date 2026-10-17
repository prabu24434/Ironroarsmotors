'use strict';
const BIKES = [
  {id:'rk',name:'Road King Special',cat:'Grand American Touring',engine:'Milwaukee-Eight 114',cc:1868,year:2026,price:845000000,torque:'155 Nm @ 3.000 rpm',tank:'22,7 L',seat:'700 mm',weight:'378 kg',safety:'ABS, TSC, alarm keamanan',colors:[['Hitam Vivid','#161616'],['Merah Bara','#8c1c13'],['Biru Baja','#27415f']]},
  {id:'sg',name:'Street Glide Special',cat:'Grand American Touring',engine:'Milwaukee-Eight 114',cc:1868,year:2026,price:920000000,torque:'163 Nm @ 3.000 rpm',tank:'22,7 L',seat:'690 mm',weight:'378 kg',safety:'ABS, TSC, cruise control',colors:[['Hitam Vivid','#161616'],['Abu Granit','#4a4f55'],['Putih Mutiara','#d9d9d4']]},
  {id:'fb',name:'Fat Boy 114',cat:'Cruiser',engine:'Milwaukee-Eight 114',cc:1868,year:2025,price:690000000,torque:'161 Nm @ 3.000 rpm',tank:'18,9 L',seat:'675 mm',weight:'317 kg',safety:'ABS, TSC, alarm keamanan',colors:[['Hitam Vivid','#161616'],['Perak Krom','#a8adb3'],['Merah Bara','#8c1c13']]},
  {id:'sb',name:'Softail Standard',cat:'Cruiser',engine:'Milwaukee-Eight 107',cc:1745,year:2025,price:480000000,torque:'145 Nm @ 3.000 rpm',tank:'13,2 L',seat:'680 mm',weight:'297 kg',safety:'ABS, TSC',colors:[['Hitam Vivid','#161616'],['Biru Baja','#27415f'],['Oranye Bara','#c24a0a']]},
  {id:'rs',name:'Nightster Special',cat:'Sport',engine:'Revolution Max 975T',cc:975,year:2026,price:410000000,torque:'95 Nm @ 5.000 rpm',tank:'11,7 L',seat:'705 mm',weight:'222 kg',safety:'ABS, TCS, mode berkendara',colors:[['Hitam Vivid','#161616'],['Hijau Zaitun','#4d5a3a'],['Abu Granit','#4a4f55']]},
  {id:'sp',name:'Sportster S',cat:'Sport',engine:'Revolution Max 1250T',cc:1252,year:2026,price:520000000,torque:'127 Nm @ 6.000 rpm',tank:'11,8 L',seat:'735 mm',weight:'228 kg',safety:'ABS, TCS, cornering ABS',colors:[['Hitam Vivid','#161616'],['Merah Bara','#8c1c13'],['Perak Krom','#a8adb3']]},
  {id:'pa',name:'Pan America 1250 Special',cat:'Adventure Touring',engine:'Revolution Max 1250',cc:1252,year:2026,price:690000000,torque:'128 Nm @ 6.750 rpm',tank:'21,2 L',seat:'850 mm',weight:'258 kg',safety:'Cornering ABS, TPMS, semi-active suspension',colors:[['Oranye Bara','#c24a0a'],['Hitam Vivid','#161616'],['Pasir Gurun','#a8916b']]},
  {id:'tg',name:'Tri Glide Ultra',cat:'Trike',engine:'Milwaukee-Eight 114',cc:1868,year:2025,price:1050000000,torque:'167 Nm @ 3.250 rpm',tank:'24,6 L',seat:'735 mm',weight:'566 kg',safety:'ABS, TSC, rem parkir, gigi mundur',colors:[['Hitam Vivid','#161616'],['Biru Baja','#27415f'],['Putih Mutiara','#d9d9d4']]}
];
const CATS = ['Semua','Grand American Touring','Cruiser','Sport','Adventure Touring','Trike'];
const BOOKING_FEE = 5000000;
const $ = id => document.getElementById(id);
const rp = n => 'Rp ' + Math.round(n).toLocaleString('id-ID');
const state = {cat:'Semua', q:'', sort:'', cart:[]};
try { state.cart = JSON.parse(localStorage.getItem('irCart') || '[]'); } catch(e) { state.cart = []; }

function bikeSVG(color, trike) {
  const wheel = x => `<g transform="translate(${x} 150)"><circle r="38" fill="#0a0a0a" stroke="#9aa0a6" stroke-width="6"/><circle r="20" fill="none" stroke="#555" stroke-width="3"/><circle r="5" fill="#9aa0a6"/></g>`;
  return `<svg viewBox="0 0 400 200" role="img" aria-label="Ilustrasi motor"><ellipse cx="200" cy="192" rx="170" ry="7" fill="#000" opacity=".5"/>
  ${wheel(80)}${wheel(320)}${trike ? wheel(250) : ''}
  <path d="M80 150 L150 105 L215 105 L320 150 L300 150 L215 122 L150 122 L100 150Z" fill="#6d737a"/>
  <path d="M135 100 Q150 62 205 66 L250 78 Q262 100 230 108 L150 110Z" fill="${color}" stroke="#9aa0a6" stroke-width="2"/>
  <path d="M150 112 h70 l-8 24 h-52z" fill="#8a9097"/>
  <path d="M255 84 L300 55 L318 58 M300 55 L310 90" stroke="#c7ccd1" stroke-width="5" fill="none" stroke-linecap="round"/>
  <path d="M105 96 Q130 84 150 98 L146 108 L100 106Z" fill="#222"/>
  <circle cx="318" cy="64" r="7" fill="#ffd9a0"/></svg>`;
}

function visible() {
  let list = BIKES.filter(b => (state.cat === 'Semua' || b.cat === state.cat) &&
    (b.name + ' ' + b.engine).toLowerCase().includes(state.q.toLowerCase()));
  const [k, d] = state.sort.split('-');
  if (k) list.sort((a, b) => (d === 'asc' ? 1 : -1) * ((k === 'price' ? a.price - b.price : k === 'cc' ? a.cc - b.cc : a.year - b.year)));
  return list;
}

function renderGrid() {
  const list = visible();
  $('empty').classList.toggle('hidden', list.length > 0);
  $('grid').innerHTML = list.map(b => `
    <article class="card bike-card">
      <div class="p-4 bg-ink">${bikeSVG(b.colors[0][1], b.cat === 'Trike')}</div>
      <div class="p-5">
        <p class="text-xs text-zinc-500">${b.cat} · ${b.year}</p>
        <h3 class="font-display text-xl">${b.name}</h3>
        <p class="text-sm text-zinc-400">${b.engine}</p>
        <p class="text-orange font-display text-xl my-3">${rp(b.price)}</p>
        <button class="btn-ghost w-full" data-id="${b.id}">Detail Spesifikasi</button>
      </div>
    </article>`).join('');
}

function renderChips() {
  $('chips').innerHTML = CATS.map(c => `<button class="chip ${c === state.cat ? 'active' : ''}" data-cat="${c}">${c}</button>`).join('');
}

function toast(msg, isError) {
  const t = $('toast');
  t.textContent = msg;
  t.className = 'toast show' + (isError ? ' error' : '');
  clearTimeout(toast.t);
  toast.t = setTimeout(() => t.className = 'toast', 3200);
}

/* Modal */
let current = null, colorIdx = 0;
function openModal(id) {
  current = BIKES.find(b => b.id === id); colorIdx = 0;
  $('mTitle').textContent = current.name;
  $('mEngine').textContent = current.engine + ' · ' + current.cc + ' cc · ' + current.year;
  $('mPrice').textContent = rp(current.price);
  const rows = [['Torsi', current.torque], ['Tangki', current.tank], ['Tinggi jok', current.seat], ['Bobot', current.weight], ['Keamanan', current.safety]];
  $('mSpecs').innerHTML = rows.map(([k, v]) => `<div class="card p-3 ${k === 'Keamanan' ? 'col-span-2' : ''}"><dt class="text-xs text-zinc-500">${k}</dt><dd>${v}</dd></div>`).join('');
  $('mSwatches').innerHTML = current.colors.map((c, i) => `<button class="swatch ${i ? '' : 'active'}" style="background:${c[1]}" data-i="${i}" aria-label="${c[0]}"></button>`).join('');
  paintBike();
  $('overlay').classList.remove('hidden'); $('modal').classList.remove('hidden');
  $('mClose').focus();
}
function paintBike() {
  $('mBike').innerHTML = bikeSVG(current.colors[colorIdx][1], current.cat === 'Trike');
  $('mColorName').textContent = current.colors[colorIdx][0];
  document.querySelectorAll('.swatch').forEach((s, i) => s.classList.toggle('active', i === colorIdx));
}
function closeAll() {
  $('modal').classList.add('hidden'); $('cart').classList.remove('open');
  $('overlay').classList.add('hidden');
}

/* Kredit */
function calc() {
  const b = BIKES.find(x => x.id === $('cModel').value) || BIKES[0];
  const dpPct = +$('cDp').value, rate = Math.max(0, +$('cRate').value || 0), n = +$('cTenor').value;
  const dp = b.price * dpPct / 100, loan = b.price - dp, r = rate / 1200;
  const m = r === 0 ? loan / n : loan * r / (1 - Math.pow(1 + r, -n));
  $('dpLabel').textContent = dpPct + '%';
  $('cResult').textContent = rp(m);
  $('cPrice').textContent = rp(b.price); $('cDpAmt').textContent = rp(dp);
  $('cLoan').textContent = rp(loan); $('cInterest').textContent = rp(m * n - loan);
}

/* Keranjang */
function saveCart() { try { localStorage.setItem('irCart', JSON.stringify(state.cart)); } catch(e) {} renderCart(); }
function renderCart() {
  $('cartCount').textContent = state.cart.length;
  $('cartTotal').textContent = rp(state.cart.length * BOOKING_FEE);
  $('cartItems').innerHTML = state.cart.length ? state.cart.map((it, i) => `
    <div class="card p-3 flex items-center gap-3">
      <span class="swatch" style="background:${it.hex};width:22px;height:22px"></span>
      <div class="flex-1 text-sm"><b>${it.name}</b><br><span class="text-zinc-500">${it.color} · ${rp(BOOKING_FEE)}</span></div>
      <button data-rm="${i}" aria-label="Hapus ${it.name}"><i class="fa-solid fa-trash text-zinc-400"></i></button>
    </div>`).join('') : '<p class="text-zinc-500 text-sm">Keranjang kosong. Buka detail motor lalu pilih Booking fee.</p>';
}

/* Form */
function validate() {
  const rules = [
    ['fName', v => v.trim().length >= 3, 'Isi nama lengkap, minimal 3 huruf.'],
    ['fPhone', v => /^(\+62|62|0)8[0-9]{8,11}$/.test(v.replace(/[\s-]/g, '')), 'Isi nomor seperti 08123456789.'],
    ['fModel', v => !!v, 'Pilih model motor.'],
    ['fDate', v => v && new Date(v + 'T00:00') >= new Date(new Date().toDateString()), 'Pilih tanggal hari ini atau setelahnya.'],
    ['fBranch', v => !!v, 'Pilih cabang dealer.']
  ];
  let ok = true;
  rules.forEach(([id, test, msg]) => {
    const el = $(id), pass = test(el.value);
    el.nextElementSibling.textContent = pass ? '' : msg;
    el.style.borderColor = pass ? '' : '#d33';
    if (!pass) ok = false;
  });
  return ok;
}

function init() {
  const opts = BIKES.map(b => `<option value="${b.id}">${b.name}</option>`).join('');
  $('cModel').innerHTML = opts;
  $('fModel').innerHTML = '<option value="">Pilih model</option>' + opts;
  $('heroBike').innerHTML = bikeSVG('#FF6600');
  $('fDate').min = new Date().toISOString().split('T')[0];
  renderChips(); renderGrid(); renderCart(); calc();

  $('chips').onclick = e => { const c = e.target.dataset.cat; if (c) { state.cat = c; renderChips(); renderGrid(); } };
  $('search').oninput = e => { state.q = e.target.value; renderGrid(); };
  $('sort').onchange = e => { state.sort = e.target.value; renderGrid(); };
  $('grid').onclick = e => { const id = e.target.dataset.id; if (id) openModal(id); };
  $('mSwatches').onclick = e => { if (e.target.dataset.i) { colorIdx = +e.target.dataset.i; paintBike(); } };
  $('mClose').onclick = closeAll; $('overlay').onclick = closeAll; $('cartClose').onclick = closeAll;
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeAll(); });
  $('mAdd').onclick = () => {
    const c = current.colors[colorIdx];
    state.cart.push({id: current.id, name: current.name, color: c[0], hex: c[1]});
    saveCart(); toast(current.name + ' masuk keranjang booking.');
  };
  $('mCalc').onclick = () => { $('cModel').value = current.id; calc(); closeAll(); $('kredit').scrollIntoView(); };
  ['cModel', 'cDp', 'cRate', 'cTenor'].forEach(id => $(id).addEventListener('input', calc));
  $('cartBtn').onclick = () => { $('cart').classList.add('open'); $('overlay').classList.remove('hidden'); };
  $('cartItems').onclick = e => {
    const btn = e.target.closest('[data-rm]');
    if (btn) { state.cart.splice(+btn.dataset.rm, 1); saveCart(); }
  };
  $('checkout').onclick = () => {
    if (!state.cart.length) return toast('Keranjang masih kosong.', true);
    const total = state.cart.length * BOOKING_FEE;
    state.cart = []; saveCart(); closeAll();
    toast('Booking fee ' + rp(total) + ' tercatat (simulasi). Tim kami akan menghubungi Anda.');
  };
  $('rideForm').onsubmit = e => {
    e.preventDefault();
    if (!validate()) return toast('Periksa kolom yang ditandai.', true);
    const name = $('fName').value.trim().split(' ')[0];
    e.target.reset();
    toast('Terima kasih, ' + name + '. Jadwal test ride terkirim, kami konfirmasi lewat WhatsApp.');
  };
  if ('serviceWorker' in navigator && location.protocol !== 'file:') navigator.serviceWorker.register('sw.js').catch(() => {});
}
document.addEventListener('DOMContentLoaded', init);
