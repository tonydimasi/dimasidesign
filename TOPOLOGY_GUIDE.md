# Masterclass: Creare un Sfondo Interattivo "Vanta Topology" in WebGL + React
Questo documento offre una spiegazione tecnica approfondita, matematica e ingegneristica per spiegare come abbiamo costruito l'effetto di sfondo interattivo ultra-premium ispirato a **VantaJS Topology** con deformazione 3D e grana cinematografica analogica.

---

## 🚀 Panoramica del Design & Architettura
L'obiettivo era superare la classica simulazione di fluido caotica per ottenere un'estetica **strutturata, architettonica ed elegante**, basata su curve di livello parallele (concentriche) che si deformano matematicamente in base alle interazioni del cursore e alle forze ambientali sotterranee.

Il sistema è suddiviso in 3 pilastri principali:
1. **WebGL Fragment Shader custom**: Esegue il calcolo parallelo su ogni singolo pixel ad altissime prestazioni (60 FPS fluidi), calcolando i rumori di perlin di dominio e tracciando curve di livello vettoriali super-nitide con una palette basata sugli esatti colori sociali specificati (`#4be8f2` per le linee, `#1d1d1d` per lo sfondo).
2. **Fisica ed Interazione in React (CPU)**: Gestisce la posizione del mouse ed i punti di attrazione ambientale.
3. **Effetto Parallasse 3D Elastico (CSS hardware-accelerated)**: Applica una rotazione prospettica e una traslazione alla tela (canvas) basata sulla pendenza del mouse rispetto al centro dello schermo.

---

## Directives Ingegneristiche Chiave

### 1. Inigo Quilez Domain Warping (Deformazione di Dominio)
Nel Fragment Shader, per simulare un terreno montuoso coerente e curvilineo, invece di usare una semplice funzione di rumore, applichiamo quello che Inigo Quilez chiama *Domain Warping*:
```glsl
// Calcoliamo una coordinata ausiliaria 'r' che è l'offset accumulato del rumore
vec2 r;
float drift = u_time * 0.018;
r.x = fbm(p + drift);
r.y = fbm(p + vec2(4.5, 2.3) - drift);

// Usiamo 'r' per mappare la coordinata d'altezza finale 'f'
float f = fbm(p + r * 1.1 + drift * 0.5);
```
Questo crea l'effetto di "vallate elastiche" in cui le curve sembrano assecondare dei flussi coerenti invece di muoversi in direzioni casuali e frastagliate.

### 2. Generazione delle Curve di Livello (Contour Lines)
Per convertire un campo di altezza continuo `f` in linee separate e parallele nitidissime senza artefatti di aliasing (pixel scalettati), applichiamo la funzione periodica sinusoidale combinata con un filtro di smoothing personalizzato:
```glsl
// Generiamo tantissimi cerchi concentrici distorti (mappati su 105 fasce)
float contour_coord = f * 105.0;
float s = sin(contour_coord * 3.14159265);

// Anti-aliasing manuale con smoothstep
float line_s = abs(s);
float line_core = smoothstep(0.06, 0.0, line_s);         // Linea vettoriale finissima e solida
float line_glow = smoothstep(0.18, 0.0, line_s) * 0.06;   // Lievissimo alone neon per un look hi-tech
float total_line = clamp(line_core + line_glow, 0.0, 1.0);
```

### 3. Allineamento 1:1 Pixel-Mouse (Warp Matching)
Per evitare che la deformazione generata dal cursore sembrasse "allontanarsi" dal cursore fisico (effetto di offset disallineato dovuto a zoom geometrici), abbiamo differenziato le coordinate:
- Calcoliamo la vicinanza del mouse sulla griglia originale normalizzata `p_raw`.
- Eseguiamo l'operazione di offset localizzata del mouse `warp_offset`.
- Applichiamo la riduzione di zoom macro (es: `p *= 0.56;`) **soltanto dopo** aver dedotto la distorsione del cursore.

In questo modo il raggio di influenza dell'interazione del mouse è calibrato in prospettiva 1:1 millimetrica sotto il puntatore, mentre lo sfondo decorativo mantiene una densità fantastica a larga scala.

---

## 4. Effetto Leva / Parallasse 3D Elastico
Per dare l'idea che l'intera sezione della pagina sia un piano tridimensionale pesante "sospeso" nello spazio su cui il mouse esercita una forza gravitazionale, applichiamo un calcolo geometrico in React nel ciclo di rendering principal (`requestAnimationFrame`):

```typescript
// 1. Calcoliamo di quanto il mouse dista dal centro esatto dello schermo (normalizzato da -1.0 a 1.0)
const centerX = rect.width / 2;
const centerY = rect.height / 2;
const normX = (clientX - (rect.left + centerX)) / centerX;
const normY = (clientY - (rect.top + centerY)) / centerY;

// 2. Calcoliamo l'inclinazione e la traslazione bersaglio (Target)
const maxTiltY = 5.5;   // Rotazione massima attorno all'asse Y in gradi
const maxTiltX = 5.5;   // Rotazione massima attorno all'asse X in gradi
const maxShiftX = 16.0; // Spostamento laterale sul piano orizzontale in pixel
const maxShiftY = 16.0; // Spostamento sul piano verticale in pixel

state.targetTiltX = normX * maxTiltY;
state.targetTiltY = -normY * maxTiltX; // Invertito per far pendere il piano verso il mouse
state.targetOffsetX = normX * maxShiftX;
state.targetOffsetY = normY * maxShiftY;
```

Nel ciclo di animazione CPU, applichiamo una formula di **Lerp (Esecuzione Esponenziale Attrito)** per attenuare il movimento in modo organico e renderlo burroso, per poi iniettarlo via CSS Matrix Hardware:

```typescript
// Formula di inerzia fisica indipendente dai Frame-per-secondo (Hz)
const lerpFactor = 1.0 - Math.exp(-3.5 * frameDtSec); 
state.currentTiltX += (state.targetTiltX - state.currentTiltX) * lerpFactor;
state.currentTiltY += (state.targetTiltY - state.currentTiltY) * lerpFactor;
state.currentOffsetX += (state.targetOffsetX - state.currentOffsetX) * lerpFactor;
state.currentOffsetY += (state.targetOffsetY - state.currentOffsetY) * lerpFactor;

// Trasformiamo la viewport 3D con prospettiva hardware
canvasRef.current.style.transform = `
  perspective(1000px) 
  rotateX(${state.currentTiltY}deg) 
  rotateY(${state.currentTiltX}deg) 
  translate3d(${state.currentOffsetX}px, ${state.currentOffsetY}px, 0) 
  scale(1.06)
`;
```

---

## 5. Rumore di Grana Cinematografica / Analog Noise
Per rimuovere la sensazione di "lucido sterile" tipica dei rendering digitali e dare una texture organica simile a carta d'archivio o pellicola cinematografica, inseriamo all'interno dello shader due tipologie di rumore ad altissima frequenza:

```glsl
// Grana statica basata sulla posizione assoluta del pixel
float static_grain = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453123);

// Grana dinamica temporizzata che simula il bollore della pellicola (a 24 fotogrammi al secondo)
float moving_grain = fract(sin(dot(gl_FragCoord.xy, vec2(73.140693, 2.665144) + mod(u_time * 24.0, 100.0))) * 43758.5453123);

// Mescoliamo i due tipi per un disturbo bilanciato ma materico
float combined_grain = mix(static_grain, moving_grain, 0.50);

// Applichiamo la grana additivamente sullo sfondo senza lavare o sbiadire i colori principali
final_color += (combined_grain - 0.5) * 0.062;
```

---

## 💡 Consigli per la tua Lezione Personale
Se vuoi ricreare questo effetto da zero, procedi in questi passi:
1. **Studia il rumore di Perlin / Fractional Brownian Motion (FBM)**: Capire come sommare rumore a frequenze raddoppiate e ampiezze dimezzate per creare colline naturali.
2. **Controlla il seno**: Il segreto delle linee a topologia sta nell'applicare la funzione `sin(altezza * N)` sulla texture d'altitudine. Ogni picco d'onda diventa una linea!
3. **Usa matrici di prospettiva CSS**: Usare `transform: perspective(Xpx) rotateX(...) rotateY(...)` è 100 volte più leggero ed efficiente per la CPU rispetto a ruotare la camera all'interno di librerie 3D pesanti come Three.js, mantenendo le linee vettoriali fluide e performanti al massimo grado.
