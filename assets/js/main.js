/* =========================================================
   VENTUCCIO — main.js
   Frontend funcional (cliente). Los envíos reales de formulario
   se conectan al backend donde está marcado con  // >> BACKEND
   Datos de carta y reseñas: reales del restaurante (web oficial + Google).
   ========================================================= */
'use strict';

/* ---------- Iconos SVG (Lucide-style, sin emojis) ---------- */
const SVG = {
  heart:'<svg class="icn" viewBox="0 0 24 24" aria-hidden="true"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',
  leaf:'<svg class="icn" viewBox="0 0 24 24" aria-hidden="true"><path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z"/><path d="M2 21c0-3 1.85-5.36 5.08-6"/></svg>',
};

/* ---------- ESPECIALIDADES (destacados reales de la carta oficial) ----------
   NOTA FOTOS: imágenes de stock de la MISMA categoría de plato.
   Sustitúyelas por fotos reales de tus platos en 'assets/img/…'. */
const DISHES = [
  {n:'Pizza Siciliana', c:'Pizza', p:'12,40', veg:false,
   img:'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=700&q=80',
   alt:'Pizza Siciliana de Ventuccio con mozzarella de búfala, mortadela siciliana, tomate cherry y rúcula',
   d:'Búfala, mortadela siciliana, tomate cherry, rúcula y aceite de trufa.'},
  {n:'Pizza Frutti di Mare', c:'Pizza', p:'11,90', veg:false,
   img:'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=700&q=80',
   alt:'Pizza Frutti di Mare con gambas, mejillones y langostinos recién salida del horno de piedra',
   d:'Gambas, cigala, mejillones, langostinos, perejil, aceite y ajo.'},
  {n:'Lasagna de Carne Gratinada', c:'Gratinado', p:'11,90', veg:false,
   img:'https://images.unsplash.com/photo-1619895092538-128341789043?auto=format&fit=crop&w=700&q=80',
   alt:'Ración de lasaña de carne boloñesa gratinada al horno, servida en plato',
   d:'Nuestra lasaña boloñesa, gratinada al horno de piedra.'},
  {n:'Pasta Carbonara', c:'Pasta', p:'desde 11,40', veg:false,
   img:'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&w=700&q=80',
   alt:'Plato de pasta carbonara con nata, huevo, parmesano y bacon',
   d:'Nata, huevo, parmesano y bacon. Elígela en grano duro, al huevo o rellena.'},
  {n:'Ensalada Ventuccio', c:'Ensalada', p:'10,00', veg:true,
   img:'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=700&q=80',
   alt:'Ensalada Ventuccio con queso de cabra, cebolla caramelizada y nueces',
   d:'Queso de cabra, cebolla caramelizada, nueces y vinagre gourmet.'},
  {n:'Tiramisú de la Casa', c:'Postre', p:'4,90', veg:true,
   img:'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=700&q=80',
   alt:'Tiramisú casero de Ventuccio con mascarpone, café y cacao espolvoreado',
   d:'El clásico italiano hecho en casa. Mascarpone, café y cacao.'},
];

/* ---------- MENÚ COMPLETO (carta oficial) ---------- */
/* ---------- SISTEMA DE PASTAS (salsa × tipo de pasta) ----------
   Precios reales de la carta: [grano duro, al huevo, rellena] */
const PASTA_TIPOS = [
  {id:'gd', n:'Grano duro',  d:'La clásica italiana, al dente'},
  {id:'ah', n:'Al huevo',    d:'Más tierna y sedosa'},
  {id:'rl', n:'Rellena',     d:'Artesana, rellena al momento'},
];
const SALSAS = [
  {n:'Pomodoro', d:'Tomate italiano', pr:['9,90','10,90','12,40'], veg:true},
  {n:'Ajo, Aceite y Guindilla', d:'Aglio, olio e peperoncino', pr:['9,90','10,90','12,40'], veg:true},
  {n:'Boloñesa', d:'Tomate y carne picada', pr:['11,40','12,40','14,40']},
  {n:'Cuatro Quesos Italianos', d:'Mezcla de quesos italianos', pr:['11,40','12,40','14,40'], veg:true},
  {n:'Carbonara', d:'Nata, huevo, parmesano y bacon', pr:['11,40','12,40','14,40']},
  {n:'Pesto Genovés', d:'Albahaca, piñones, aceite de oliva y parmesano', pr:['11,40','12,40','14,40'], veg:true},
  {n:'Pesto Genovés y Pomodoro', d:'Pesto con tomate italiano', pr:['11,40','12,40','14,40'], veg:true},
  {n:'Alfredo', d:'Nata, parmesano, mascarpone y perejil', pr:['11,40','12,40','14,40'], veg:true},
  {n:'Sofía', d:'Nata, tomate, bacon y cebolla', pr:['11,40','12,40','14,40']},
  {n:'Verduras', d:'Berenjena, calabacín, pimiento rojo, cebolla, ajo, tomate y pesto', pr:['11,40','12,40','14,40'], veg:true},
  {n:'Arrabiata', d:'Tomate, ajo, aceite, perejil y guindilla', pr:['11,40','12,40','14,40'], veg:true},
  {n:'Amatriciana', d:'Tomate, bacon, cebolla y queso pecorino', pr:['11,40','12,40','14,40']},
  {n:'Puttanesca', d:'Anchoas, alcaparras, aceitunas, ajo, perejil y tomate', pr:['11,40','12,40','14,40']},
];
const SALSAS_GOURMET = [
  {n:'Tomate, Gambas y Champiñón', d:'', pr:['11,90','12,90','14,40']},
  {n:'Curry y Gamberetti', d:'Salsa al curry con gambas', pr:['11,90','12,90','14,40']},
  {n:'Gambas, Ajo y Aceite', d:'', pr:['11,90','12,90','14,40']},
  {n:'Crema Tartufo y Funghi', d:'Crema de trufa y setas', pr:['12,40','13,40','14,40'], veg:true},
  {n:'Gorgonzola con Nueces', d:'', pr:['12,40','12,90','14,40'], veg:true},
  {n:'Salmón', d:'Salsa de salmón', pr:['12,40','13,40','14,40']},
  {n:'Gambas, Cigala y Mejillón', d:'Con tomate, ajo y perejil', pr:['12,70','13,70','14,40']},
];

const MENU_NOTES = {
  'Pastas':'También de nuestro horno, con precio cerrado:',
  'Pizzas':'Pizzas finas y crujientes, cocinadas en horno de piedra con masa natural.',
};

const MENU = {
  'Antipasti':[
    {n:'Provoletta', d:'Queso provolone fundido y orégano', p:'8,90', veg:true},
    {n:'Carpaccio con Parmigiano', d:'Finas láminas de ternera con parmesano', p:'10,90'},
    {n:'Insalata Caprese', d:'Mozzarella, tomate y albahaca', p:'8,50', veg:true},
    {n:'Ensalada César', d:'Lechuga, huevo duro, bacon, dados de queso, costrones y salsa de mostaza', p:'9,00'},
    {n:'Ensalada "Detolavida"', d:'Lechuga, tomate, jamón, queso, huevo duro, olivas y maíz', p:'9,00'},
    {n:'Ensalada "Ventuccio"', d:'Lechuga, tomate, queso de cabra, cebolla caramelizada, nueces y vinagre gourmet', p:'10,00', veg:true},
    {n:'Ensalada Módena', d:'Lechuga, zanahoria, tomate, queso, albahaca, aceto balsámico de Módena y AOVE', p:'9,00', veg:true},
    {n:'Ensalada Salsa Roquefort', d:'Lechuga variada, nueces, zanahoria, bacon, parmesano, costrones y salsa roquefort', p:'9,50'},
    {n:'Pan Grissini', d:'', p:'2,40', veg:true},
    {n:'Pan Pizza', d:'', p:'5,30', veg:true},
    {n:'3 Tostadas de bacon, verdura y queso', d:'', p:'7,90'},
    {n:'2 Tostadas de gambas y tomate con cebolla', d:'', p:'7,90'},
  ],
  'Risottos':[
    {n:'Trufas y Setas', d:'Arroz cremoso con trufa y setas', p:'11,50', veg:true},
    {n:'Cuatro Quesos', d:'Arroz cremoso con selección de quesos italianos', p:'11,50', veg:true},
    {n:'Negro-Sepia', d:'Arroz negro con sepia', p:'12,00'},
    {n:'Gorgonzola con Nueces', d:'Crema, gorgonzola y nueces', p:'12,00', veg:true},
    {n:'Mar y Monte', d:'Crema tartufo y funghi, champiñón y gambas', p:'12,50'},
  ],
  'Pastas':[
    {n:'Lasagna de Carne Gratinada', d:'Gratinada de nuestro horno', p:'11,90'},
    {n:'Canelones de Espinacas', d:'Gratinados de nuestro horno', p:'11,90', veg:true},
  ],
  'Pizzas':[
    {n:'Margarita', d:'Tomate, mozzarella y albahaca', p:'7,90', veg:true},
    {n:'Jamón y Queso', d:'Tomate, mozzarella y jamón', p:'9,40'},
    {n:'Napolitana', d:'Tomate, mozzarella, anchoas, alcaparras y orégano', p:'10,30'},
    {n:'Vegetal', d:'Tomate, mozzarella, berenjena, calabacín, pimiento rojo y cebolla', p:'10,30', veg:true},
    {n:'Pizza Ensalada', d:'Tomate, mozzarella, parmigiano, jamón, albahaca, lechuga, AOVE y vinagre de Módena', p:'10,30'},
    {n:'Jamón y Champiñones', d:'Tomate, mozzarella, jamón y champiñón', p:'10,40'},
    {n:'Atún', d:'Tomate, mozzarella, atún y cebolla', p:'10,90'},
    {n:'Tropical', d:'Tomate, mozzarella, jamón y piña', p:'10,90'},
    {n:'Bianca Carbonara', d:'Mozzarella, salsa carbonara, parmesano, bacon y cebolla', p:'11,30'},
    {n:'Cuatro Quesos', d:'Tomate, mozzarella, fontina, gorgonzola y roquefort', p:'11,30', veg:true},
    {n:'Capricciosa', d:'Tomate, mozzarella, champiñón, chorizo picante y olivas', p:'11,30'},
    {n:'Cuatro Estaciones', d:'Tomate, mozzarella, champiñón, jamón, anchoas, alcachofas y olivas', p:'11,30'},
    {n:'Bolognese (Ragú)', d:'Tomate, mozzarella y carne a la boloñesa', p:'11,30'},
    {n:'Tutta Vitta', d:'Tomate, mozzarella, jamón, champiñón y huevo', p:'11,30'},
    {n:'Bianca Ventuccio', d:'Mozzarella, cebolla, tomate fresco, bacon y aceite al ajo', p:'11,40'},
    {n:'Frutti di Mare', d:'Tomate, mozzarella, gambas, cigala, mejillones, langostinos, perejil, aceite y ajo', p:'11,90'},
    {n:'Andaluso', d:'Tomate, mozzarella, jamón serrano, tomate cherry, rúcula y aceite de ajo', p:'12,40'},
    {n:'Siciliana', d:'Tomate, mozzarella, búfala, mortadela siciliana, tomate cherry, rúcula y aceite de trufa', p:'12,40'},
    {n:'Daniele', d:'Tomate, mozzarella, champiñón, bacon, queso de cabra y cebolla caramelizada', p:'12,40'},
    {n:'Calzone Jamón y Queso', d:'Tomate, mozzarella, jamón y albahaca (masa tradicional)', p:'10,30'},
  ],
  'Carnes':[
    {n:'Escalope 4 Quesos', d:'', p:'11,40'},
    {n:'Escalope Trufas y Setas', d:'', p:'11,40'},
  ],
  'Postres':[
    {n:'Tiramisú de la Casa', d:'', p:'4,90', veg:true},
    {n:'Panna Cotta', d:'Con caramelo, frutti di bosco o cioccolato fuso', p:'4,90', veg:true},
    {n:'Brownie casero', d:'Con helado de vainilla y caramelo fundido', p:'5,90', veg:true},
    {n:'Helado hundido en café espresso', d:'', p:'4,90', veg:true},
    {n:'Helados (vainilla o chocolate)', d:'Con opción de chocolate fundido', p:'4,90', veg:true},
    {n:'Degustación variada de postres', d:'Brownie, helado, tiramisú y panna cotta', p:'10,90', veg:true},
    {n:'Profiteroles', d:'', p:'4,90', veg:true},
    {n:'Sorbete con alcohol', d:'', p:'4,00', veg:true},
    {n:'Sorbete sin alcohol', d:'', p:'3,50', veg:true},
  ],
  'Bebidas':[
    {n:'Agua Mineral / Con gas', d:'', p:'1,50'},
    {n:'Cerveza (jarra)', d:'', p:'3,00'},
    {n:'Cerveza Moretti / Peroni / Alhambra 1925', d:'Cervezas italianas y premium', p:'3,50'},
    {n:'Cerveza sin alcohol', d:'', p:'2,00'},
    {n:'Refrescos', d:'', p:'2,50'},
    {n:'Zumos variados', d:'', p:'2,00'},
    {n:'Limoncello / Amaretto', d:'Copa', p:'3,50'},
    {n:'Orujo / Orujo de hierbas', d:'Copa', p:'3,00'},
    {n:'Combinados y copas', d:'Premium 6,00 €', p:'4,50'},
    {n:'Cafés (espresso, cortado, capuccino…)', d:'Carajillo 2,00 €', p:'1,50'},
    {n:'Té e infusiones', d:'', p:'1,50'},
  ],
  'Vinos':[
    {n:'Azabache · D.O. Rioja', d:'Tinto joven Tempranillo · copa 2,00 €', p:'10,00'},
    {n:'Almenada · D.O. Tierra de Castilla', d:'Tinto roble Tempranillo · copa 2,00 €', p:'10,00'},
    {n:'El Arte de Vivir · D.O. Ribera del Duero', d:'Crianza Tempranillo', p:'15,00'},
    {n:'Azabache Crianza · D.O. Rioja', d:'Crianza Tempranillo', p:'15,00'},
    {n:'Azabache Rosado · D.O. Rioja', d:'Garnacha / Viura · copa 2,00 €', p:'10,00'},
    {n:'Camino del Sur · D.O. Rueda', d:'Blanco Sauvignon Blanc · copa 2,00 €', p:'10,00'},
    {n:'Lambrusco Bellavite', d:'Espumoso tinto o rosado, amabile', p:'9,50'},
    {n:'Moscato de Fresa · Santero', d:'', p:'12,00'},
  ],
};

/* ---------- TESTIMONIOS (reseñas reales de Google) ---------- */
const TESTIMONIALS = [
  {name:'Daniel CR', meta:'Local Guide · 106 reseñas', when:'Hace 8 meses', stars:5,
   txt:'Fuimos a comer al restaurante Ventuccio en Marbella y salimos encantados. Desde el primer momento la atención fue de diez, el camarero muy amable y atento; nos recomendó varias salsas para acompañar la pasta y acertó de pleno.'},
  {name:'Daniel Sánchez de León', meta:'Local Guide · 31 reseñas', when:'Hace 3 años', stars:5,
   txt:'Sin lugar a dudas, actualmente el mejor italiano de Marbella. Materia prima y precio excelente. Tamaños de los platos, grandes. Hemos ido en familia 2 veces en 4 días y el personal nos ha tratado de lujo.'},
  {name:'Alpalo', meta:'Local Guide · 130 reseñas', when:'Hace 5 meses', stars:5,
   txt:'Servicio súper rápido, la comida espectacular y en grandes cantidades, tanto de la pizza como de la pasta. La atención cordial y amable. Repetiré sin duda.'},
  {name:'Manuela Galván', meta:'Local Guide · 17 reseñas', when:'Hace 10 meses', stars:5,
   txt:'Fuimos con amigos en busca de unas buenas pastas y la experiencia superó todas nuestras expectativas. Las porciones son abundantes y los sabores realmente deliciosos.'},
  {name:'Jesús García', meta:'Local Guide · 80 reseñas', when:'Hace 5 años', stars:5,
   txt:'Sin duda, una de las mejores pizzerías de Málaga. Buen precio, buena calidad de los productos y lo que más llama la atención es la gran cantidad de comida que sirven.'},
];

const GOOGLE_REVIEWS_URL = 'https://www.google.com/maps/search/?api=1&query=Restaurante+Ventuccio+Marbella';

/* ---------- Helpers ---------- */
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

let toastTimer;
function toast(msg){
  const t = $('#toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(()=>t.classList.remove('show'), 2200);
}

/* ---------- Favoritos (localStorage) ---------- */
const FAV_KEY = 'ventuccio_favs';
const getFavs = () => { try{ return JSON.parse(localStorage.getItem(FAV_KEY)) || []; }catch{ return []; } };
const setFavs = a => localStorage.setItem(FAV_KEY, JSON.stringify(a));
function toggleFav(name, btn){
  let favs = getFavs();
  if(favs.includes(name)){ favs = favs.filter(f=>f!==name); btn.classList.remove('active'); toast('Quitado de favoritos'); }
  else { favs.push(name); btn.classList.add('active'); toast('Añadido a favoritos'); }
  setFavs(favs);
}

/* ---------- Render: Especialidades ---------- */
function renderDishes(){
  const favs = getFavs();
  $('#dishGrid').innerHTML = DISHES.map((dish,i)=>{
    const isFav = favs.includes(dish.n);
    const price = dish.p.startsWith('desde') ? dish.p.replace('desde','<small>desde</small> ')+' €' : dish.p+' €';
    return `<article class="dish-card reveal d${(i%3)+1}">
      <div class="dish-img">
        <img src="${dish.img}" alt="${dish.alt||dish.n}" width="700" height="467" loading="lazy" decoding="async">
        <span class="dish-cat">${dish.c}</span>
        <button class="fav-btn ${isFav?'active':''}" data-name="${dish.n}" aria-label="Guardar ${dish.n} en favoritos" aria-pressed="${isFav}">${SVG.heart}</button>
      </div>
      <div class="dish-body">
        <h3>${dish.n}</h3>
        <p>${dish.d}</p>
        <div class="dish-foot">
          <span class="dish-price">${price}</span>
          ${dish.veg?`<span class="dish-tag">${SVG.leaf} Vegetariana</span>`:''}
        </div>
      </div>
    </article>`;
  }).join('');
  $$('#dishGrid .fav-btn').forEach(b=>b.addEventListener('click',()=>{
    toggleFav(b.dataset.name,b);
    b.setAttribute('aria-pressed', b.classList.contains('active'));
  }));
}

/* ---------- Render: Menú por categorías ---------- */
function renderMenu(){
  const cats = Object.keys(MENU);
  $('#menuTabs').innerHTML = cats.map((c,i)=>`<button class="menu-tab ${i===0?'active':''}" role="tab" aria-selected="${i===0}" data-cat="${c}">${c}</button>`).join('');
  $('#menuPanels').innerHTML = cats.map((c,i)=>`
    <div class="menu-panel ${i===0?'active':''}" role="tabpanel" data-panel="${c}">
      ${c==='Pastas'?pastaBuilderHTML():''}
      ${MENU_NOTES[c]?`<p class="menu-note">${MENU_NOTES[c]}</p>`:''}
      ${MENU[c].map(it=>`
        <div class="menu-item">
          <div class="mi-main">
            <div class="mi-head"><h3>${it.n}</h3>${it.veg?`<span class="mi-badge">${SVG.leaf} Vegetariana</span>`:''}</div>
            ${it.d?`<p class="mi-desc">${it.d}</p>`:''}
          </div>
          <span class="mi-dots"></span>
          <span class="mi-price">${it.p.startsWith('desde')?it.p.replace('desde','<small>desde</small>')+' €':it.p+' €'}</span>
        </div>`).join('')}
    </div>`).join('');
  $$('.menu-tab').forEach(tab=>tab.addEventListener('click',()=>{
    $$('.menu-tab').forEach(t=>{t.classList.remove('active');t.setAttribute('aria-selected','false');});
    $$('.menu-panel').forEach(p=>p.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected','true');
    $(`.menu-panel[data-panel="${tab.dataset.cat}"]`).classList.add('active');
    // En móvil las pestañas van en tira deslizable: la activa se centra
    // para que nunca quede a medias fuera de pantalla.
    const tira = tab.parentElement;
    if(tira.scrollWidth > tira.clientWidth){
      tab.scrollIntoView({behavior:'smooth', inline:'center', block:'nearest'});
    }
  }));
}

/* ---------- Componi la tua pasta: salsa × tipo de pasta ----------
   Refleja el sistema real de la carta: eliges la salsa y el tipo de pasta,
   y el precio se actualiza al instante. */
function salsaRow(s){
  return `<div class="menu-item salsa-row" data-veg="${!!s.veg}">
    <div class="mi-main">
      <div class="mi-head"><h3>${s.n}</h3>${s.veg?`<span class="mi-badge">${SVG.leaf} Vegetariana</span>`:''}</div>
      ${s.d?`<p class="mi-desc">${s.d}</p>`:''}
    </div>
    <span class="mi-dots"></span>
    <span class="mi-price" data-pr="${s.pr.join('|')}">${s.pr[0]} €</span>
  </div>`;
}
function pastaBuilderHTML(){
  return `<div class="pasta-builder">
    <div class="pb-head">
      <span class="pb-step">Paso 1</span>
      <h3 class="pb-title">Elige tu pasta</h3>
      <p class="pb-sub">Todas nuestras pastas se elaboran al momento. Cambia el tipo y verás el precio de cada salsa al instante.</p>
    </div>
    <div class="pb-tipos" id="pbTipos" role="radiogroup" aria-label="Tipo de pasta">
      ${PASTA_TIPOS.map((t,i)=>`
        <button type="button" class="pb-tipo ${i===0?'active':''}" role="radio" aria-checked="${i===0}" data-idx="${i}">
          <span class="pb-tipo-n">${t.n}</span>
          <span class="pb-tipo-d">${t.d}</span>
        </button>`).join('')}
    </div>
    <div class="pb-head pb-head-2">
      <span class="pb-step">Paso 2</span>
      <h3 class="pb-title">Elige tu salsa</h3>
    </div>
    <div class="pb-salsas">${SALSAS.map(salsaRow).join('')}</div>
    <div class="pb-gourmet-head"><span>Salsas Gourmet</span></div>
    <div class="pb-salsas">${SALSAS_GOURMET.map(salsaRow).join('')}</div>
  </div>`;
}
function setupPastaBuilder(){
  const wrap = $('.pasta-builder');
  if(!wrap) return;
  const tipos = $$('#pbTipos .pb-tipo');
  tipos.forEach(btn=>btn.addEventListener('click',()=>{
    const idx = +btn.dataset.idx;
    tipos.forEach(b=>{b.classList.remove('active');b.setAttribute('aria-checked','false');});
    btn.classList.add('active');
    btn.setAttribute('aria-checked','true');
    wrap.querySelectorAll('.mi-price[data-pr]').forEach(el=>{
      const price = el.dataset.pr.split('|')[idx];
      el.textContent = price+' €';
      el.classList.remove('price-flash');
      void el.offsetWidth;              // reinicia la animación
      el.classList.add('price-flash');
    });
  }));
}

/* ---------- Render: Testimonios ---------- */
function renderTestimonials(){
  $('#testiTrack').innerHTML = TESTIMONIALS.map(t=>`
    <article class="testi-card">
      <div class="testi-top">
        <span class="testi-google" title="Reseña de Google" aria-label="Google">G</span>
        <div class="testi-stars" aria-label="${t.stars} de 5 estrellas">${'★'.repeat(t.stars)}</div>
      </div>
      <p class="testi-text">"${t.txt}"</p>
      <div class="testi-user">
        <div class="testi-avatar" aria-hidden="true">${t.name.charAt(0)}</div>
        <div><h3>${t.name}</h3><span>${t.meta} · ${t.when}</span></div>
      </div>
    </article>`).join('');
}
function setupTestiNav(){
  const track = $('#testiTrack');
  const step = () => Math.min(380, (track.querySelector('.testi-card')?.offsetWidth || 354) + 26);
  $('#testiNext').onclick = ()=>track.scrollBy({left:step(),behavior:'smooth'});
  $('#testiPrev').onclick = ()=>track.scrollBy({left:-step(),behavior:'smooth'});
}

/* ---------- Indicador "Abierto ahora" (hora de Europe/Madrid) ---------- */
function setupOpenStatus(){
  const el = $('#openStatus');
  if(!el) return;
  const update = ()=>{
    let now;
    try{ now = new Date(new Date().toLocaleString('en-US',{timeZone:'Europe/Madrid'})); }
    catch{ now = new Date(); }
    const mins = now.getHours()*60 + now.getMinutes();
    const inService = (mins>=780 && mins<960) || (mins>=1200 && mins<1440); // 13-16 y 20-24
    let label;
    if(inService){ label = 'Abierto ahora'; }
    else if(mins < 780){ label = 'Cerrado · abre a las 13:00'; }
    else if(mins < 1200){ label = 'Cerrado · abre a las 20:00'; }
    else { label = 'Cerrado · abre mañana a las 13:00'; }
    el.classList.toggle('open', inService);
    el.querySelector('.os-text').textContent = label;
  };
  update();
  setInterval(update, 60000);
}

/* ---------- Header scroll + botón arriba ---------- */
function setupScrollUI(){
  const header = $('#site-header'), top = $('#toTop');
  const onScroll = ()=>{
    header.classList.toggle('scrolled', scrollY>40);
    top.classList.toggle('show', scrollY>500);
  };
  addEventListener('scroll', onScroll, {passive:true});
  onScroll();
  top.onclick = ()=>scrollTo({top:0,behavior:'smooth'});
}

/* ---------- Menú móvil ---------- */
function setupMobileMenu(){
  const menu=$('#mobileMenu'), mask=$('#mask'), burger=$('#hamburger');
  const open=()=>{menu.classList.add('open');mask.classList.add('show');burger.setAttribute('aria-expanded','true')};
  const close=()=>{menu.classList.remove('open');mask.classList.remove('show');burger.setAttribute('aria-expanded','false')};
  burger.onclick=open;
  $('#closeMenu').onclick=close;
  mask.onclick=close;
  menu.querySelectorAll('a').forEach(a=>a.addEventListener('click',close));
  addEventListener('keydown',e=>{ if(e.key==='Escape') close(); });
}

/* ---------- Selector de ciudad (hero <-> formulario) ---------- */
function setupCitySync(){
  const ubic = $('#ubicacion');
  const sync = city =>{
    ubic.value = city;
    $$('#locTabs button').forEach(x=>x.classList.toggle('active',x.dataset.city===city));
    $$('#heroLoc button').forEach(x=>x.classList.toggle('active',x.dataset.city===city));
  };
  $$('#heroLoc button, #locTabs button').forEach(b=>b.addEventListener('click',()=>sync(b.dataset.city)));
}

/* ---------- Acordeón ---------- */
function setupAccordion(){
  $$('#accordion .acc-head').forEach(head=>{
    head.addEventListener('click',()=>{
      const item = head.parentElement;
      const body = item.querySelector('.acc-body');
      const isOpen = item.classList.contains('open');
      $$('#accordion .acc-item').forEach(it=>{ it.classList.remove('open'); it.querySelector('.acc-body').style.maxHeight=null; it.querySelector('.acc-head').setAttribute('aria-expanded','false'); });
      if(!isOpen){ item.classList.add('open'); body.style.maxHeight = body.scrollHeight+'px'; head.setAttribute('aria-expanded','true'); }
    });
  });
  const first = $('#accordion .acc-item.open .acc-body');
  if(first) first.style.maxHeight = first.scrollHeight+'px';
}

/* ---------- Validación de formularios ---------- */
const RE = { tel:/^[0-9\s+()-]{9,}$/, email:/^[^\s@]+@[^\s@]+\.[^\s@]+$/ };
function validateField(el, test){
  const f = el.closest('.field');
  const ok = test(el.value.trim());
  if(f) f.classList.toggle('invalid', !ok);
  if(el) el.setAttribute('aria-invalid', !ok);
  return ok;
}

function setupReservaForm(){
  const form = $('#resForm');
  $('#fecha').min = new Date().toISOString().split('T')[0];
  form.addEventListener('submit', e=>{
    e.preventDefault();
    let ok = true;
    ok = validateField($('#fecha'), v=>!!v) && ok;
    ok = validateField($('#hora'), v=>!!v) && ok;
    ok = validateField($('#comensales'), v=>!!v) && ok;
    ok = validateField($('#nombre'), v=>v.length>=2) && ok;
    ok = validateField($('#telefono'), v=>RE.tel.test(v)) && ok;
    ok = validateField($('#email'), v=>RE.email.test(v)) && ok;
    if(!ok){ form.querySelector('.field.invalid input,.field.invalid select')?.focus(); return; }
    // >> BACKEND: enviar datos de la reserva (fetch a tu endpoint / servicio de reservas)
    const nombre = $('#nombre').value.trim();
    const ciudad = $('#ubicacion').value;
    form.style.display='none';
    $('#successMsg').textContent = `${nombre}, te confirmamos tu mesa en ${ciudad} por teléfono en menos de 1 hora. ¡Grazie!`;
    $('#resSuccess').style.display='block';
  });
  form.querySelectorAll('input,select').forEach(el=>el.addEventListener('input',()=>el.closest('.field').classList.remove('invalid')));
}

function setupContactForm(){
  const form = $('#contForm');
  if(!form) return;
  form.addEventListener('submit', e=>{
    e.preventDefault();
    let ok = true;
    ok = validateField($('#cNombre'), v=>v.length>=2) && ok;
    ok = validateField($('#cEmail'), v=>RE.email.test(v)) && ok;
    ok = validateField($('#cAsunto'), v=>v.length>=2) && ok;
    ok = validateField($('#cMsg'), v=>v.length>=5) && ok;
    if(!ok){ form.querySelector('.field.invalid input,.field.invalid textarea')?.focus(); return; }
    // >> BACKEND: enviar mensaje de contacto
    form.reset();
    $('#contOk').style.display='block';
    setTimeout(()=>$('#contOk').style.display='none', 6000);
  });
  form.querySelectorAll('input,textarea').forEach(el=>el.addEventListener('input',()=>{const f=el.closest('.field');if(f)f.classList.remove('invalid');}));
}

function setupNewsletter(){
  const form = $('#newsForm');
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const email = $('#newsEmail');
    if(!RE.email.test(email.value.trim())){ email.focus(); email.style.outline='3px solid rgba(255,255,255,.6)'; return; }
    // >> BACKEND: alta en newsletter
    form.style.display='none';
    $('#newsOk').style.display='block';
  });
}

function setupPdf(){
  $('#pdfBtn').addEventListener('click', e=>{
    e.preventDefault();
    // >> BACKEND: enlazar el PDF real del menú
    toast('El PDF del menú se enlazará aquí');
  });
}

/* ---------- Reveal on scroll (respeta prefers-reduced-motion) ---------- */
function setupReveal(){
  if(window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    $$('.reveal').forEach(el=>el.classList.add('visible'));
    return;
  }
  const io = new IntersectionObserver((entries)=>{
    entries.forEach(en=>{ if(en.isIntersecting){ en.target.classList.add('visible'); io.unobserve(en.target); } });
  }, {threshold:.12});
  $$('.reveal').forEach(el=>io.observe(el));
}

/* ---------- Init ---------- */
document.addEventListener('DOMContentLoaded', ()=>{
  renderDishes();
  renderMenu();
  setupPastaBuilder();
  renderTestimonials();
  setupTestiNav();
  setupOpenStatus();
  setupScrollUI();
  setupMobileMenu();
  setupCitySync();
  setupAccordion();
  setupReservaForm();
  setupContactForm();
  setupNewsletter();
  setupPdf();
  setupReveal();
});
