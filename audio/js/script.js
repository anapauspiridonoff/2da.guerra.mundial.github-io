/* =========================================================
   1944: UNA VENTANA AL PASADO
   script.js — lógica compartida de todas las páginas
   ========================================================= */

/* ---------------------------------------------------------
   1. ESCENA 360° — ilustración vectorial de una calle europea
   en 1944. Se dibuja con SVG en lugar de una foto para que el
   proyecto funcione sin depender de archivos de imagen.
   Si más adelante quieres usar una fotografía panorámica real,
   revisa el archivo LEEME.md incluido: allí se explica cómo
   reemplazar esta función por una imagen equirectangular.
   --------------------------------------------------------- */

function buildSceneSVG() {
  return `
  <svg viewBox="0 0 3200 900" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMax slice">
    <defs>
      <linearGradient id="sky" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#D8C9A3"/>
        <stop offset="55%" stop-color="#C6B489"/>
        <stop offset="100%" stop-color="#AE9A6E"/>
      </linearGradient>
      <linearGradient id="ground" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stop-color="#8C7A5A"/>
        <stop offset="100%" stop-color="#5C4E36"/>
      </linearGradient>
    </defs>

    <rect x="0" y="0" width="3200" height="900" fill="url(#sky)"/>
    <rect x="0" y="620" width="3200" height="280" fill="url(#ground)"/>

    <!-- niebla / profundidad -->
    <rect x="0" y="500" width="3200" height="160" fill="#C9BB9C" opacity="0.35"/>

    <!-- siluetas de edificios lejanos -->
    <g fill="#5B5138" opacity="0.55">
      <rect x="50" y="330" width="90" height="300"/>
      <rect x="180" y="300" width="70" height="330"/>
      <rect x="600" y="280" width="100" height="350"/>
      <rect x="1050" y="310" width="80" height="320"/>
      <rect x="1500" y="290" width="110" height="340"/>
      <rect x="1900" y="300" width="90" height="330"/>
      <rect x="2350" y="270" width="100" height="360"/>
      <rect x="2750" y="310" width="90" height="320"/>
      <rect x="2980" y="290" width="120" height="340"/>
    </g>

    <!-- fachadas principales -->
    <g stroke="#241F1A" stroke-width="3">
      <rect x="0" y="360" width="260" height="270" fill="#6B5C40"/>
      <rect x="260" y="330" width="230" height="300" fill="#7A6A48"/>
      <rect x="900" y="340" width="260" height="290" fill="#6B5C40"/>
      <rect x="1160" y="300" width="300" height="330" fill="#7A6A48"/>
      <rect x="1750" y="350" width="240" height="280" fill="#6B5C40"/>
      <rect x="2100" y="320" width="280" height="310" fill="#7A6A48"/>
      <rect x="2550" y="360" width="250" height="270" fill="#6B5C40"/>
      <rect x="2860" y="300" width="300" height="330" fill="#7A6A48"/>
    </g>

    <!-- ventanas -->
    <g fill="#241F1A" opacity="0.75">
      <rect x="40" y="400" width="40" height="55"/><rect x="120" y="400" width="40" height="55"/><rect x="40" y="480" width="40" height="55"/><rect x="120" y="480" width="40" height="55"/>
      <rect x="300" y="380" width="45" height="60"/><rect x="400" y="380" width="45" height="60"/><rect x="300" y="470" width="45" height="60"/><rect x="400" y="470" width="45" height="60"/>
      <rect x="940" y="390" width="40" height="55"/><rect x="1020" y="390" width="40" height="55"/><rect x="940" y="470" width="40" height="55"/><rect x="1020" y="470" width="40" height="55"/>
      <rect x="1200" y="350" width="45" height="60"/><rect x="1300" y="350" width="45" height="60"/><rect x="1200" y="440" width="45" height="60"/><rect x="1300" y="440" width="45" height="60"/><rect x="1400" y="350" width="45" height="60"/><rect x="1400" y="440" width="45" height="60"/>
      <rect x="1800" y="400" width="40" height="55"/><rect x="1890" y="400" width="40" height="55"/><rect x="1800" y="480" width="40" height="55"/><rect x="1890" y="480" width="40" height="55"/>
      <rect x="2150" y="370" width="45" height="60"/><rect x="2250" y="370" width="45" height="60"/><rect x="2150" y="460" width="45" height="60"/><rect x="2250" y="460" width="45" height="60"/>
      <rect x="2600" y="400" width="40" height="55"/><rect x="2690" y="400" width="40" height="55"/><rect x="2600" y="480" width="40" height="55"/><rect x="2690" y="480" width="40" height="55"/>
      <rect x="2910" y="350" width="45" height="60"/><rect x="3010" y="350" width="45" height="60"/><rect x="2910" y="440" width="45" height="60"/><rect x="3010" y="440" width="45" height="60"/>
    </g>

    <!-- torre de iglesia (zona calendario, extremo derecho) -->
    <g transform="translate(2760,150)">
      <rect x="0" y="0" width="90" height="480" fill="#584A32" stroke="#241F1A" stroke-width="3"/>
      <polygon points="-15,0 105,0 45,-90" fill="#4A3E2A" stroke="#241F1A" stroke-width="3"/>
      <circle cx="45" cy="60" r="26" fill="#EDE6D6" stroke="#241F1A" stroke-width="4"/>
      <line x1="45" y1="60" x2="45" y2="40" stroke="#241F1A" stroke-width="3"/>
      <line x1="45" y1="60" x2="58" y2="62" stroke="#241F1A" stroke-width="3"/>
    </g>

    <!-- calle empedrada -->
    <rect x="0" y="700" width="3200" height="200" fill="#4A4130"/>
    <g stroke="#3A331F" stroke-width="2" opacity="0.5">
      ${Array.from({length: 64}).map((_,i)=>`<line x1="${i*50}" y1="700" x2="${i*50-40}" y2="900"/>`).join('')}
    </g>

    <!-- farola (zona radio, x~300) -->
    <g transform="translate(300,560)">
      <rect x="-6" y="0" width="12" height="140" fill="#241F1A"/>
      <circle cx="0" cy="-6" r="16" fill="#E8D9A0"/>
      <rect x="-40" y="10" width="80" height="60" fill="#8C6B3E" stroke="#241F1A" stroke-width="2"/>
      <text x="0" y="45" text-anchor="middle" font-family="Georgia, serif" font-size="15" fill="#241F1A">AVISO</text>
    </g>

    <!-- kiosco de periódico (x~740) -->
    <g transform="translate(700,600)">
      <rect x="0" y="0" width="120" height="90" fill="#3F4B37" stroke="#241F1A" stroke-width="3"/>
      <rect x="10" y="10" width="100" height="45" fill="#EDE6D6" stroke="#241F1A" stroke-width="2"/>
      <text x="60" y="35" text-anchor="middle" font-family="Georgia, serif" font-size="13" fill="#241F1A">DIARIO</text>
    </g>

    <!-- mesa de mapas tras ventana (x~1290) -->
    <g transform="translate(1230,560)">
      <rect x="0" y="0" width="140" height="90" fill="#223250" opacity="0.85" stroke="#241F1A" stroke-width="3"/>
      <rect x="15" y="15" width="110" height="60" fill="#DCD0B4" stroke="#241F1A" stroke-width="2"/>
    </g>

    <!-- sacos de arena + petate (x~1830) -->
    <g transform="translate(1770,650)">
      <ellipse cx="0" cy="20" rx="34" ry="18" fill="#8C7A5A" stroke="#241F1A" stroke-width="2"/>
      <ellipse cx="40" cy="15" rx="34" ry="18" fill="#7A6A48" stroke="#241F1A" stroke-width="2"/>
      <rect x="70" y="-20" width="50" height="35" fill="#5B6B4E" stroke="#241F1A" stroke-width="2"/>
    </g>

    <!-- fachada de casa civil (x~2260) -->
    <g transform="translate(2200,560)">
      <rect x="0" y="0" width="130" height="140" fill="#7A6A48" stroke="#241F1A" stroke-width="3"/>
      <rect x="45" y="70" width="40" height="70" fill="#3F4B37" stroke="#241F1A" stroke-width="2"/>
      <rect x="15" y="20" width="30" height="35" fill="#241F1A" opacity="0.7"/>
      <rect x="85" y="20" width="30" height="35" fill="#241F1A" opacity="0.7"/>
    </g>

    <!-- pájaros lejanos, detalle de ambiente -->
    <g stroke="#241F1A" stroke-width="2" fill="none" opacity="0.4">
      <path d="M400,150 q10,-10 20,0 q10,-10 20,0"/>
      <path d="M1600,120 q10,-10 20,0 q10,-10 20,0"/>
      <path d="M2500,160 q10,-10 20,0 q10,-10 20,0"/>
    </g>
  </svg>`;
}

/* Coordenadas de los 6 puntos interactivos, relativas al viewBox 3200x900 */
const HOTSPOTS = [
  {
    id: 'radio', x: 1210, y: 480, icon: '📻',
    title: 'La radio en tiempos de guerra',
    fecha: '1939 – 1945',
    texto: 'La radio fue la principal fuente de información —y de propaganda— durante la guerra. Los gobiernos la usaron para informar, pero también para mantener la moral alta, ocultar derrotas y difundir mensajes políticos. Millones de familias se reunían cada noche alrededor del aparato para escuchar las noticias del frente.'
  },
  {
    id: 'periodico', x: 1550, y: 300, icon: '📰',
    title: 'El diario del 6 de junio',
    fecha: '6 de junio de 1944',
    texto: 'Este día, conocido como el "Día D", las fuerzas aliadas desembarcaron en las playas de Normandía, Francia. Fue una de las operaciones militares más grandes de la historia y marcó el comienzo de la liberación de Europa occidental del control nazi.'
  },
  {
    id: 'mapa', x: 2130, y: 450, icon: '🗺️',
    title: 'La mesa de operaciones',
    fecha: '1939 – 1945',
    texto: 'Sobre esta mesa se planificaban los movimientos de tropas en los distintos frentes: el frente occidental, el frente oriental (entre Alemania y la URSS) y el frente del Pacífico. Puedes ver el mapa completo e interactivo en la sección "Historia" de este sitio.'
  },
  {
    id: 'equipo', x: 2300, y: 760, icon: '🎒',
    title: 'El petate del soldado',
    fecha: 'Vida cotidiana, 1939 – 1945',
    texto: 'El equipo de un soldado incluía lo mínimo para sobrevivir: manta, cantimplora, botiquín, raciones enlatadas y cartas de casa. La vida en el frente no era solo combate: eran largas esperas, frío, cartas escritas a la luz de una vela y la nostalgia por la familia.'
  },
  {
    id: 'casa', x: 2645, y: 600, icon: '🏠',
    title: 'La casa de la familia Duval',
    fecha: 'Francia ocupada, 1940 – 1944',
    texto: 'Millones de civiles vivieron la guerra desde sus propias casas: racionamiento de alimentos, apagones nocturnos, refugios antiaéreos y la incertidumbre de tener familiares en el frente. Esta vivienda representa a una familia común que intentó mantener su vida cotidiana en medio del conflicto.'
  },
  {
    id: 'calendario', x: 3000, y: 300, icon: '📅',
    title: 'El calendario de la torre',
    fecha: '1939 – 1945',
    texto: 'Seis años cambiaron el mundo para siempre. Desde la invasión de Polonia en 1939 hasta la rendición de Japón en 1945, cada año trajo eventos que definieron el curso de la historia contemporánea. Explora la línea de tiempo completa en la sección "Historia".'
  }
];

/* ---------------------------------------------------------
   2. MOTOR DE LA ESCENA 360 — arrastrar para mirar alrededor,
   rueda / botones para hacer zoom, clic en un punto para
   abrir su ficha de expediente (dossier).
   --------------------------------------------------------- */
function initScene(containerId, opts = {}) {
  const wrap = document.getElementById(containerId);
  if (!wrap) return;

  const pan = wrap.querySelector('.scene-pan');
  // pan.innerHTML = buildSceneSVG();

  // Colocar los hotspots (se omiten si opts.hotspots === false)
  if (opts.hotspots !== false) {
    HOTSPOTS.forEach(h => {
      const btn = document.createElement('button');
      btn.className = 'hotspot';
      btn.style.left = (h.x / 3200 * 100) + '%';
      btn.style.top = (h.y / 900 * 100) + '%';
      btn.setAttribute('aria-label', h.title);
      btn.innerHTML = h.icon;
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        playHotspotSound(h.id);
        openDossier(h);
      });
      pan.appendChild(btn);
    });
  }

  let panWidth = opts.panWidth || 3200; // px lógicos del SVG mapeados al ancho real del .scene-pan
  let offsetX = -( (opts.startWidth || wrap.clientWidth * 3) / 2 - wrap.clientWidth / 2 );
  let scale = 1;
  let isDown = false;
  let startX = 0;
  let startOffset = 0;

  function clampOffset(val, currentScale) {
    const panRealWidth = pan.offsetWidth * currentScale;
    const min = wrap.clientWidth - panRealWidth;
    const max = 0;
    return Math.min(max, Math.max(min, val));
  }

  function apply() {
    offsetX = clampOffset(offsetX, scale);
    pan.style.transform = `translateX(${offsetX}px) scale(${scale})`;
  }

  // posición inicial: centrado
  requestAnimationFrame(() => {
    offsetX = -(pan.offsetWidth - wrap.clientWidth) / 2;
    apply();
  });

  function pointerDown(clientX) {
    isDown = true;
    startX = clientX;
    startOffset = offsetX;
    wrap.classList.add('dragging');
  }
  function pointerMove(clientX) {
    if (!isDown) return;
    offsetX = startOffset + (clientX - startX);
    apply();
  }
  function pointerUp() {
    isDown = false;
    wrap.classList.remove('dragging');
  }

  wrap.addEventListener('mousedown', e => pointerDown(e.clientX));
  window.addEventListener('mousemove', e => pointerMove(e.clientX));
  window.addEventListener('mouseup', pointerUp);

  wrap.addEventListener('touchstart', e => pointerDown(e.touches[0].clientX), {passive: true});
  wrap.addEventListener('touchmove', e => pointerMove(e.touches[0].clientX), {passive: true});
  wrap.addEventListener('touchend', pointerUp);

  wrap.addEventListener('wheel', e => {
    e.preventDefault();
    scale = Math.min(1.8, Math.max(1, scale - e.deltaY * 0.001));
    apply();
  }, {passive: false});

  const zoomIn = wrap.parentElement.querySelector('[data-zoom-in]');
  const zoomOut = wrap.parentElement.querySelector('[data-zoom-out]');
  if (zoomIn) zoomIn.addEventListener('click', () => { scale = Math.min(1.8, scale + 0.15); apply(); });
  if (zoomOut) zoomOut.addEventListener('click', () => { scale = Math.max(1, scale - 0.15); apply(); });

  window.addEventListener('resize', apply);
}

/* ---------------------------------------------------------
   3. DOSSIER MODAL (ficha emergente de cada punto interactivo)
   --------------------------------------------------------- */
function openDossier(h) {
  const overlay = document.getElementById('dossierOverlay');
  if (!overlay) return;
  overlay.querySelector('.dossier__icon-title').textContent = h.icon + '  ' + h.title;
  overlay.querySelector('.dossier__date').textContent = h.fecha;
  overlay.querySelector('.dossier__body').textContent = h.texto;
  overlay.classList.add('open');
  overlay.querySelector('.dossier__close').focus();
}
function closeDossier() {
  const overlay = document.getElementById('dossierOverlay');
  if (overlay) overlay.classList.remove('open');
}

function setupDossierOverlay() {
  const overlay = document.getElementById('dossierOverlay');
  if (!overlay) return;
  overlay.addEventListener('click', e => { if (e.target === overlay) closeDossier(); });
  overlay.querySelector('.dossier__close').addEventListener('click', closeDossier);
  document.addEventListener('keydown', e => { if (e.key === 'Escape') closeDossier(); });
}

/* ---------------------------------------------------------
   4. LÍNEA DE TIEMPO (historia.html)
   --------------------------------------------------------- */
const TIMELINE = [
  { year: '1939', title: 'Inicio de la guerra', text: 'Alemania invade Polonia el 1 de septiembre. Días después, Francia y el Reino Unido le declaran la guerra, marcando el comienzo formal del conflicto.' },
  { year: '1940', title: 'Caída de Francia y expansión alemana', text: 'Alemania ocupa Dinamarca, Noruega, los Países Bajos, Bélgica y Francia en cuestión de meses. Comienza la Batalla de Inglaterra en el aire.' },
  { year: '1941', title: 'Barbarroja y Pearl Harbor', text: 'Alemania invade la Unión Soviética (Operación Barbarroja) en junio. En diciembre, Japón ataca la base naval de Pearl Harbor y Estados Unidos entra en guerra.' },
  { year: '1942–1943', title: 'El punto de inflexión', text: 'Batallas decisivas como Stalingrado y El Alamein frenan el avance del Eje. Los Aliados comienzan a recuperar la iniciativa en varios frentes.' },
  { year: '1944', title: 'Desembarco de Normandía', text: 'El 6 de junio, tropas aliadas desembarcan en las playas de Normandía. Comienza la liberación de Francia y de Europa occidental.' },
  { year: '1945', title: 'El fin de la guerra', text: 'Alemania se rinde en mayo tras la caída de Berlín. En agosto, Japón se rinde tras los bombardeos atómicos de Hiroshima y Nagasaki, poniendo fin al conflicto.' }
];

function renderTimeline() {
  const el = document.getElementById('timeline');
  if (!el) return;
  el.innerHTML = TIMELINE.map(t => `
    <div class="timeline__item">
      <div class="timeline__year">${t.year}</div>
      <h4>${t.title}</h4>
      <p>${t.text}</p>
    </div>
  `).join('');
}

/* ---------------------------------------------------------
   5. MAPA INTERACTIVO SIMPLIFICADO DE EUROPA
   --------------------------------------------------------- */
const MAP_REGIONS = {
  alemania: { name: 'Alemania y potencias del Eje', bloque: 'Eje', text: 'Alemania, junto con Italia y Japón, formó las llamadas "Potencias del Eje". Buscaban expandir su territorio e influencia, lo que llevó a la invasión de varios países vecinos.' },
  reinounido: { name: 'Reino Unido', bloque: 'Aliados', text: 'Resistió los bombardeos alemanes durante la Batalla de Inglaterra y fue una base clave para la posterior liberación de Europa.' },
  francia: { name: 'Francia', bloque: 'Zona de conflicto', text: 'Ocupada por Alemania desde 1940, fue liberada progresivamente a partir del desembarco de Normandía en 1944.' },
  urss: { name: 'Unión Soviética', bloque: 'Aliados', text: 'El frente oriental, entre la URSS y Alemania, fue uno de los más extensos y con mayor número de víctimas de toda la guerra.' },
  eeuu: { name: 'Estados Unidos', bloque: 'Aliados', text: 'Entró en guerra en 1941 tras el ataque a Pearl Harbor y aportó recursos militares e industriales decisivos para los Aliados.' },
  italia: { name: 'Italia', bloque: 'Eje', text: 'Aliada de Alemania al inicio de la guerra, cambió de bando en 1943 tras la caída del régimen de Mussolini.' }
};

function renderMap() {
  const svgWrap = document.getElementById('mapSvg');
  const info = document.getElementById('mapInfo');
  if (!svgWrap) return;

  svgWrap.innerHTML = `
  <svg viewBox="0 0 600 420" xmlns="http://www.w3.org/2000/svg">
    <rect width="600" height="420" fill="#DCD0B4"/>
    <polygon id="reinounido" class="map-region" tabindex="0" role="button" aria-label="Reino Unido"
      points="60,90 110,80 120,130 80,150 55,120" fill="#223250" stroke="#241F1A" stroke-width="2"/>
    <polygon id="francia" class="map-region" tabindex="0" role="button" aria-label="Francia"
      points="130,160 200,150 220,220 160,250 120,210" fill="#5B6B4E" stroke="#241F1A" stroke-width="2"/>
    <polygon id="alemania" class="map-region" tabindex="0" role="button" aria-label="Alemania"
      points="230,120 300,110 310,180 250,190 220,160" fill="#7A3327" stroke="#241F1A" stroke-width="2"/>
    <polygon id="italia" class="map-region" tabindex="0" role="button" aria-label="Italia"
      points="260,200 300,195 320,280 290,300 265,250" fill="#A9813F" stroke="#241F1A" stroke-width="2"/>
    <polygon id="urss" class="map-region" tabindex="0" role="button" aria-label="Unión Soviética"
      points="330,70 560,60 570,220 400,240 320,180" fill="#223250" opacity="0.75" stroke="#241F1A" stroke-width="2"/>
    <polygon id="eeuu" class="map-region" tabindex="0" role="button" aria-label="Estados Unidos"
      points="10,260 90,250 100,320 40,340" fill="#223250" opacity="0.55" stroke="#241F1A" stroke-width="2"/>
    <text x="70" y="120" font-family="IBM Plex Mono, monospace" font-size="10" fill="#EDE6D6">UK</text>
    <text x="160" y="200" font-family="IBM Plex Mono, monospace" font-size="10" fill="#EDE6D6">FR</text>
    <text x="255" y="155" font-family="IBM Plex Mono, monospace" font-size="10" fill="#EDE6D6">DE</text>
    <text x="280" y="245" font-family="IBM Plex Mono, monospace" font-size="10" fill="#EDE6D6">IT</text>
    <text x="430" y="150" font-family="IBM Plex Mono, monospace" font-size="10" fill="#EDE6D6">URSS</text>
    <text x="35" y="300" font-family="IBM Plex Mono, monospace" font-size="9" fill="#EDE6D6">EE.UU.</text>
  </svg>`;

  function show(key) {
    const r = MAP_REGIONS[key];
    if (!r || !info) return;
    info.innerHTML = `<strong>${r.name} — ${r.bloque}</strong>${r.text}`;
    info.classList.add('show');
  }

  Object.keys(MAP_REGIONS).forEach(key => {
    const region = svgWrap.querySelector('#' + key);
    if (!region) return;
    region.addEventListener('click', () => show(key));
    region.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); show(key); } });
  });
}

/* ---------------------------------------------------------
   6. QUIZ FINAL
   --------------------------------------------------------- */
const QUIZ = [
  {
    q: '¿En qué año comenzó la Segunda Guerra Mundial?',
    options: ['1937', '1939', '1941', '1945'],
    correct: 1,
    explain: 'La guerra comenzó en 1939, con la invasión alemana de Polonia.'
  },
  {
    q: '¿Qué nombre recibe el desembarco aliado en Normandía?',
    options: ['Operación Barbarroja', 'Batalla de Stalingrado', 'Día D', 'Operación Market Garden'],
    correct: 2,
    explain: 'El 6 de junio de 1944 se conoce como el "Día D", inicio del desembarco en Normandía.'
  },
  {
    q: '¿Qué evento llevó a Estados Unidos a entrar en la guerra?',
    options: ['La caída de Francia', 'El ataque a Pearl Harbor', 'La invasión de Polonia', 'La Batalla de Inglaterra'],
    correct: 1,
    explain: 'El ataque japonés a Pearl Harbor en diciembre de 1941 llevó a EE. UU. a declarar la guerra.'
  },
  {
    q: '¿Cuáles eran las principales potencias del Eje?',
    options: ['Reino Unido, Francia y EE. UU.', 'Alemania, Italia y Japón', 'URSS, China y Polonia', 'España, Portugal y Suiza'],
    correct: 1,
    explain: 'Alemania, Italia y Japón formaron el llamado "Eje" durante la guerra.'
  },
  {
    q: '¿En qué año terminó la Segunda Guerra Mundial?',
    options: ['1943', '1944', '1945', '1946'],
    correct: 2,
    explain: 'La guerra terminó en 1945, con la rendición de Alemania en mayo y de Japón en agosto.'
  }
];

let quizState = { current: 0, answers: [] };

function renderQuiz() {
  const el = document.getElementById('quizContainer');
  if (!el) return;
  quizState = { current: 0, answers: [] };
  renderQuestion();
}

function renderQuestion() {
  const el = document.getElementById('quizContainer');
  const i = quizState.current;
  const item = QUIZ[i];
  el.innerHTML = `
    <div class="quiz-progress">Pregunta ${i + 1} de ${QUIZ.length}</div>
    <div class="quiz-question">
      <h3>${item.q}</h3>
      ${item.options.map((opt, idx) => `<button class="quiz-option" data-idx="${idx}">${opt}</button>`).join('')}
    </div>
    <div class="quiz-nav"><button class="btn ghost-dark" id="quizNextBtn" disabled>Siguiente →</button></div>
  `;
  el.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', () => {
      el.querySelectorAll('.quiz-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      quizState.pending = parseInt(btn.dataset.idx, 10);
      document.getElementById('quizNextBtn').disabled = false;
    });
  });
  document.getElementById('quizNextBtn').addEventListener('click', () => {
    quizState.answers[i] = quizState.pending;
    if (i < QUIZ.length - 1) {
      quizState.current++;
      renderQuestion();
    } else {
      renderResult();
    }
  });
}

function renderResult() {
  const el = document.getElementById('quizContainer');
  let score = 0;
  const review = QUIZ.map((item, i) => {
    const ok = quizState.answers[i] === item.correct;
    if (ok) score++;
    return `<div class="quiz-review__item">
      <span class="tag ${ok ? 'ok' : 'bad'}">${ok ? 'CORRECTA' : 'A REVISAR'}</span>
      <strong>${item.q}</strong><br>${item.explain}
    </div>`;
  }).join('');

  let msg = '';
  if (score === QUIZ.length) msg = 'Excelente. Dominas los hechos clave de la Segunda Guerra Mundial.';
  else if (score >= QUIZ.length - 2) msg = 'Muy bien. Conoces bien los hechos principales, con algún detalle por repasar.';
  else msg = 'Vale la pena volver a explorar la experiencia para reforzar estos hechos.';

  el.innerHTML = `
    <div class="quiz-result">
      <div class="eyebrow">Resultado final</div>
      <div class="score">${score} / ${QUIZ.length}</div>
      <p>${msg}</p>
      <a href="index.html" class="btn">Volver a explorar</a>
      <div class="quiz-review">${review}</div>
    </div>
  `;
}

/* ---------------------------------------------------------
   7. AUDIO — sonido ambiental de guerra (VR) y sonidos de
   objetos interactivos (experiencia 360°).

   Para reemplazar cualquier audio, basta con guardar el nuevo
   archivo MP3 con el MISMO nombre en la misma carpeta. No hace
   falta tocar este archivo ni el HTML.
   --------------------------------------------------------- */

// Sonido ambiental único de la experiencia VR (audio/ambiente-guerra.mp3,
// referenciado directamente en la etiqueta <audio id="warSound"> de vr.html)
const VR_WAR_VOLUME = 0.1; // volumen equilibrado: audible pero no invasivo

// Un MP3 por cada objeto interactivo de la escena 360° (mismo id que en HOTSPOTS)
const HOTSPOT_SOUNDS = {
  radio:      'audio/objetos/radio.mp3',
  periodico:  'audio/objetos/periodico.mp3',
  mapa:       'audio/objetos/mapa.mp3',
  equipo:     'audio/objetos/equipo.mp3',
  casa:       'audio/objetos/casa.mp3',
  calendario: 'audio/objetos/calendario.mp3'
};

// Referencia al audio de objeto que está sonando, para poder detenerlo
// si el usuario presiona otro objeto mientras el anterior sigue reproduciéndose.
let currentHotspotAudio = null;

function playHotspotSound(id) {
  const src = HOTSPOT_SOUNDS[id];
  if (!src) return;

  // Si había un audio de otro objeto sonando, se detiene antes de iniciar el nuevo
  if (currentHotspotAudio) {
    currentHotspotAudio.pause();
    currentHotspotAudio.currentTime = 0;
  }

  currentHotspotAudio = new Audio(src);
  currentHotspotAudio.volume = 0.20;
  currentHotspotAudio.play().catch(err => {
    console.warn('No se pudo reproducir el audio del objeto "' + id + '":', src, err);
  });
}

// Inicia el sonido ambiental de guerra en la página VR (vr.html), en loop,
// apenas el usuario entra a la experiencia.
function initVRWarSound() {
  const warAudio = document.getElementById('warSound');
  if (!warAudio) return; // esta función solo aplica a vr.html

  warAudio.volume = VR_WAR_VOLUME;

  function tryPlay() {
    const playPromise = warAudio.play();
    if (playPromise) {
      playPromise.catch(() => {
        // Algunos navegadores bloquean el autoplay con sonido hasta que
        // hay una interacción del usuario dentro de la propia página.
        // En ese caso, arranca en el primer clic/toque.
        const startOnce = () => {
          warAudio.play().catch(() => {});
          document.removeEventListener('click', startOnce);
          document.removeEventListener('touchstart', startOnce);
        };
        document.addEventListener('click', startOnce, { once: true });
        document.addEventListener('touchstart', startOnce, { once: true });
      });
    }
  }

  tryPlay();
}

/* ---------------------------------------------------------
   8. INICIALIZACIÓN POR PÁGINA
   --------------------------------------------------------- */
document.addEventListener('DOMContentLoaded', () => {
  setupDossierOverlay();
  if (document.getElementById('scene360')) initScene('scene360');
  if (document.getElementById('sceneVrLeft')) initScene('sceneVrLeft', { hotspots: false });
  if (document.getElementById('sceneVrRight')) initScene('sceneVrRight', { hotspots: false });
  initVRWarSound();
  renderTimeline();
  renderMap();
  renderQuiz();
});
function initVRMotion() {
  const left = document.getElementById('sceneVrLeft');
  const right = document.getElementById('sceneVrRight');

  if (!left || !right) return;

  let lastGamma = null;
  let accumulatedX = 0;

  function moveScene(gamma) {
    if (lastGamma === null) {
      lastGamma = gamma;
      return;
    }

    const difference = gamma - lastGamma;

    // Evita movimientos demasiado bruscos
    if (Math.abs(difference) < 0.5) return;

    accumulatedX -= difference * 8;

    const leftPan = left.querySelector('.scene-pan');
    const rightPan = right.querySelector('.scene-pan');

    if (leftPan) {
      leftPan.style.transform = `translateX(${accumulatedX}px)`;
    }

    if (rightPan) {
      rightPan.style.transform = `translateX(${accumulatedX}px)`;
    }

    lastGamma = gamma;
  }

  window.addEventListener('deviceorientation', function(event) {
    if (event.gamma !== null) {
      moveScene(event.gamma);
    }
  });
}
// =====================================================
// CONTROL VR CON MOVIMIENTO DEL CELULAR
// =====================================================

function initVRMotion() {

  const left = document.getElementById('sceneVrLeft');
  const right = document.getElementById('sceneVrRight');

  if (!left || !right) return;

  const leftPan = left.querySelector('.scene-pan');
  const rightPan = right.querySelector('.scene-pan');

  let lastGamma = null;
  let offsetX = 0;

  const sensitivity = 6;

  function moveScene(event) {

    if (event.gamma === null) return;

    const gamma = event.gamma;

    if (lastGamma === null) {
      lastGamma = gamma;
      return;
    }

    let difference = gamma - lastGamma;

    // Evita pequeños movimientos del sensor
    if (Math.abs(difference) < 0.5) return;

    offsetX -= difference * sensitivity;

    // Limitar el movimiento
    offsetX = Math.max(-1000, Math.min(1000, offsetX));

    if (leftPan) {
      leftPan.style.transform =
        `translateX(${offsetX}px)`;
    }

    if (rightPan) {
      rightPan.style.transform =
        `translateX(${offsetX}px)`;
    }

    lastGamma = gamma;
  }


  function activateMotion() {

    window.addEventListener(
      'deviceorientation',
      moveScene,
      true
    );

  }


  // iPhone / iPad
  if (
    typeof DeviceOrientationEvent !== 'undefined' &&
    typeof DeviceOrientationEvent.requestPermission === 'function'
  ) {

    const button =
      document.getElementById('enableVRMotion');

    if (button) {

      button.addEventListener('click', async () => {

        try {

          const permission =
            await DeviceOrientationEvent.requestPermission();

          if (permission === 'granted') {

            activateMotion();

            button.textContent =
              '✓ Movimiento activado';

            button.disabled = true;

          }

        } catch (error) {

          console.error(error);

        }

      });

    }

  } else {

    // Android y otros navegadores
    activateMotion();

  }

}


// Activar solamente en la página VR
if (document.getElementById('sceneVrLeft')) {
  initVRMotion();
}