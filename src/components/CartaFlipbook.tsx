'use client';

/**
 * CartaFlipbook — Carta digital interactiva tipo libro para Perlawasi
 * ------------------------------------------------------------------
 * Sin dependencias externas. Funciona en Next.js (App o Pages Router) y en React puro.
 *
 * Uso rápido:
 *   const [abierto, setAbierto] = useState(false);
 *   <button onClick={() => setAbierto(true)}>Ver La Carta</button>
 *   <CartaFlipbook open={abierto} onClose={() => setAbierto(false)} />
 *
 * Requisitos: copiar la carpeta public/carta/ a tu proyecto.
 */

import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type PointerEvent as ReactPointerEvent, type TouchEvent as ReactTouchEvent } from 'react';

type Pagina = { src: string; webp: string; titulo: string };

type CartaFlipbookProps = {
  open?: boolean;
  onClose?: () => void;
  paginas?: Pagina[];
  pdfUrl?: string | null;
  whatsapp?: string | null;
};

/* ------------------------------------------------------------------ */
/*  Páginas de la carta — edita aquí si cambias el diseño              */
/* ------------------------------------------------------------------ */
const PAGINAS: Pagina[] = [
  { src: '/carta/carta-1.jpg', webp: '/carta/carta-1.webp', titulo: 'Portada' },
  { src: '/carta/carta-2.jpg', webp: '/carta/carta-2.webp', titulo: 'Platos Típicos · Pescados · Pollos' },
  { src: '/carta/carta-3.jpg', webp: '/carta/carta-3.webp', titulo: 'Paiches · Ceviches · Cerdo · Extras' },
  { src: '/carta/carta-4.jpg', webp: '/carta/carta-4.webp', titulo: 'Para Compartir · Guarniciones' },
  { src: '/carta/carta-5.jpg', webp: '/carta/carta-5.webp', titulo: 'Refrescos · Cervezas · Calientes' },
  { src: '/carta/carta-6.jpg', webp: '/carta/carta-6.webp', titulo: 'Tragos · Licores · Cócteles' },
  { src: '/carta/carta-7.jpg', webp: '/carta/carta-7.webp', titulo: 'Cafés Ozzo · Frappés · Infusiones' },
];

const PDF_URL = '/carta/carta-perlawasi-2026.pdf';
const RATIO = 1871 / 1323; // proporción real de cada página (ancho / alto)
const DURACION = 780; // ms de la animación de volteo

export default function CartaFlipbook({
  open = true,
  onClose,
  paginas = PAGINAS,
  pdfUrl = PDF_URL,
  whatsapp = '51914795381',
}: CartaFlipbookProps) {
  const total = paginas.length;
  const [actual, setActual] = useState(0);
  const [indice, setIndice] = useState(false);
  const [zoom, setZoom] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [cargadas, setCargadas] = useState<Record<number, boolean>>({});
  const [movil, setMovil] = useState(false);
  const bloqueo = useRef(false);
  const touch = useRef<{ x: number; y: number; t: number } | null>(null);
  const arrastre = useRef<{ x: number; y: number; px: number; py: number } | null>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  /* ---------------- responsive ---------------- */
  useEffect(() => {
    const check = () => setMovil(window.matchMedia('(max-width: 820px)').matches);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  /* ---------------- navegación ---------------- */
  const ir = useCallback(
    (destino: number) => {
      const n = Math.max(0, Math.min(total - 1, destino));
      if (n === actual || bloqueo.current) return;
      bloqueo.current = true;
      setZoom(false);
      setPan({ x: 0, y: 0 });
      setActual(n);
      setTimeout(() => {
        bloqueo.current = false;
      }, DURACION * 0.55);
    },
    [actual, total]
  );

  const siguiente = useCallback(() => ir(actual + 1), [ir, actual]);
  const anterior = useCallback(() => ir(actual - 1), [ir, actual]);

  /* ---------------- teclado ---------------- */
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'PageDown') { e.preventDefault(); siguiente(); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); anterior(); }
      else if (e.key === 'Home') ir(0);
      else if (e.key === 'End') ir(total - 1);
      else if (e.key === 'Escape') { if (zoom) setZoom(false); else if (indice) setIndice(false); else onClose?.(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, siguiente, anterior, ir, total, onClose, zoom, indice]);

  /* ---------------- bloquear scroll del body ---------------- */
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, [open]);

  /* ---------------- precarga ---------------- */
  useEffect(() => {
    if (!open) return;
    [actual, actual + 1, actual + 2, actual - 1].forEach((i) => {
      const p = paginas[i];
      if (!p || cargadas[i]) return;
      const img = new Image();
      img.src = p.src;
      img.onload = () => setCargadas((c) => ({ ...c, [i]: true }));
    });
  }, [actual, open, paginas, cargadas]);

  /* ---------------- gestos táctiles ---------------- */
  const onTouchStart = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (zoom) return;
    const t = e.touches[0];
    touch.current = { x: t.clientX, y: t.clientY, t: Date.now() };
  };
  const onTouchEnd = (e: ReactTouchEvent<HTMLDivElement>) => {
    if (!touch.current || zoom) return;
    const t = e.changedTouches[0];
    const dx = t.clientX - touch.current.x;
    const dy = t.clientY - touch.current.y;
    const dt = Date.now() - touch.current.t;
    touch.current = null;
    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy) * 1.4 && dt < 900) {
      dx < 0 ? siguiente() : anterior();
    }
  };

  /* ---------------- pan con zoom ---------------- */
  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!zoom) return;
    arrastre.current = { x: e.clientX, y: e.clientY, px: pan.x, py: pan.y };
    e.currentTarget.setPointerCapture?.(e.pointerId);
  };
  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!zoom || !arrastre.current) return;
    const lim = 260;
    setPan({
      x: Math.max(-lim, Math.min(lim, arrastre.current.px + (e.clientX - arrastre.current.x))),
      y: Math.max(-lim, Math.min(lim, arrastre.current.py + (e.clientY - arrastre.current.y))),
    });
  };
  const onPointerUp = () => { arrastre.current = null; };

  const progreso = useMemo(() => ((actual + 1) / total) * 100, [actual, total]);

  if (!open) return null;

  return (
    <div
      className="pw-overlay"
      ref={overlayRef}
      role="dialog"
      aria-modal="true"
      aria-label="Carta digital Perlawasi"
      onClick={(e) => { if (e.target === overlayRef.current) onClose?.(); }}
    >
      <Estilos />

      {/* ---------- barra superior ---------- */}
      <header className="pw-top">
        <div className="pw-brand">
          <span className="pw-dot" />
          <div>
            <strong>Carta Gastronómica</strong>
            <small>Perlawasi · Rioja — San Martín</small>
          </div>
        </div>

        <div className="pw-tools">
          <button className="pw-btn" onClick={() => setIndice((v) => !v)} aria-label="Índice de páginas">
            <IconGrid /> <span className="pw-lbl">Índice</span>
          </button>
          <button className="pw-btn" onClick={() => { setZoom((v) => !v); setPan({ x: 0, y: 0 }); }} aria-label="Acercar página">
            {zoom ? <IconZoomOut /> : <IconZoomIn />} <span className="pw-lbl">{zoom ? 'Alejar' : 'Zoom'}</span>
          </button>
          {pdfUrl && (
            <a className="pw-btn" href={pdfUrl} target="_blank" rel="noopener noreferrer" aria-label="Descargar carta en PDF">
              <IconDownload /> <span className="pw-lbl">PDF</span>
            </a>
          )}
          {onClose && (
            <button className="pw-btn pw-close" onClick={onClose} aria-label="Cerrar carta">
              <IconX />
            </button>
          )}
        </div>
      </header>

      {/* ---------- libro ---------- */}
      <div className="pw-stage" onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
        <button className="pw-nav pw-prev" onClick={anterior} disabled={actual === 0} aria-label="Página anterior">
          <IconChevron dir="left" />
        </button>

        <div
          className={`pw-book ${zoom ? 'is-zoom' : ''} ${movil ? 'is-movil' : ''}`}
          style={{ '--ratio': RATIO, '--dur': `${DURACION}ms` } as CSSProperties}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onDoubleClick={() => { setZoom((v) => !v); setPan({ x: 0, y: 0 }); }}
        >
          <div
            className="pw-book-inner"
            style={{ transform: zoom ? `scale(1.9) translate(${pan.x / 1.9}px, ${pan.y / 1.9}px)` : 'none' }}
          >
            {paginas.map((p, i) => {
              const volteada = i < actual;
              // se oculta apenas termina de voltear, para no dejar un montón de páginas a la izquierda
              const lejos = i < actual || i > actual + 1;
              return (
                <div
                  key={p.src}
                  className={`pw-hoja ${volteada ? 'is-volteada' : ''}`}
                  style={{
                    zIndex: volteada ? i : total - i,
                    opacity: lejos ? 0 : 1,
                    transitionDelay: lejos ? `${DURACION}ms, 0ms` : '0ms, 0ms',
                    pointerEvents: i === actual ? 'auto' : 'none',
                  }}
                  aria-hidden={i !== actual}
                >
                  {/* cara frontal */}
                  <div className="pw-cara pw-frente">
                    {Math.abs(i - actual) <= 2 && (
                      <picture>
                        <source srcSet={p.webp} type="image/webp" />
                        <img src={p.src} alt={`Carta Perlawasi — ${p.titulo}`} draggable="false" loading={i === 0 ? 'eager' : 'lazy'} />
                      </picture>
                    )}
                    {!zoom && actual > 0 && <span className="pw-zona pw-zona-izq" onClick={anterior} />}
                    {!zoom && actual < total - 1 && <span className="pw-zona pw-zona-der" onClick={siguiente} />}
                    <span className="pw-lomo" />
                    <span className="pw-brillo" />
                  </div>

                  {/* reverso del papel */}
                  <div className="pw-cara pw-reverso">
                    <span className="pw-marca">Perlawasi</span>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="pw-sombra" />
        </div>

        <button className="pw-nav pw-next" onClick={siguiente} disabled={actual === total - 1} aria-label="Página siguiente">
          <IconChevron dir="right" />
        </button>

        {zoom && (
          <button className="pw-salir-zoom" onClick={() => { setZoom(false); setPan({ x: 0, y: 0 }); }}>
            <IconZoomOut /> Alejar
          </button>
        )}
      </div>

      {/* ---------- barra inferior ---------- */}
      <footer className="pw-bottom">
        <div className="pw-titulo">{paginas[actual].titulo}</div>
        <div className="pw-pager">
          <span>{actual + 1}</span> / {total}
        </div>
        <div className="pw-barra"><span style={{ width: `${progreso}%` }} /></div>
        <div className="pw-hint">← anterior · siguiente → · o usa los botones ‹ › de los costados</div>
        {whatsapp && (
          <a className="pw-cta" href={`https://wa.me/${whatsapp}?text=${encodeURIComponent('¡Hola Perlawasi! Vi la carta y quiero reservar una mesa.')}`} target="_blank" rel="noopener noreferrer">
            Reservar mesa
          </a>
        )}
      </footer>

      {/* ---------- índice de páginas ---------- */}
      {indice && (
        <div className="pw-indice" onClick={() => setIndice(false)}>
          <div className="pw-indice-box" onClick={(e) => e.stopPropagation()}>
            <h3>Índice de la carta</h3>
            <div className="pw-thumbs">
              {paginas.map((p, i) => (
                <button
                  key={p.src}
                  className={`pw-thumb ${i === actual ? 'is-activa' : ''}`}
                  onClick={() => { ir(i); setIndice(false); }}
                >
                  <picture>
                    <source srcSet={p.webp} type="image/webp" />
                    <img src={p.src} alt={p.titulo} loading="lazy" />
                  </picture>
                  <span>{i + 1}. {p.titulo}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ================================================================== */
/*  Iconos                                                            */
/* ================================================================== */
const svg = { width: 18, height: 18, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 2, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const };
const IconChevron = ({ dir }: { dir: 'left' | 'right' }) => (
  <svg {...svg} width="26" height="26"><polyline points={dir === 'left' ? '15 18 9 12 15 6' : '9 18 15 12 9 6'} /></svg>
);
const IconGrid = () => (<svg {...svg}><rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" /><rect x="3" y="14" width="7" height="7" /><rect x="14" y="14" width="7" height="7" /></svg>);
const IconZoomIn = () => (<svg {...svg}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="11" y1="8" x2="11" y2="14" /><line x1="8" y1="11" x2="14" y2="11" /></svg>);
const IconZoomOut = () => (<svg {...svg}><circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" /><line x1="8" y1="11" x2="14" y2="11" /></svg>);
const IconDownload = () => (<svg {...svg}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>);
const IconX = () => (<svg {...svg}><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>);

/* ================================================================== */
/*  Estilos                                                           */
/* ================================================================== */
function Estilos() {
  return (
    <style>{`
.pw-overlay{position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;
  background:radial-gradient(120% 90% at 50% 0%,#1d2a1f 0%,#0d1410 55%,#070a08 100%);
  color:#f4f1ea;font-family:ui-sans-serif,system-ui,-apple-system,"Segoe UI",Roboto,sans-serif;
  animation:pw-fade .35s ease both;overscroll-behavior:contain}
@keyframes pw-fade{from{opacity:0}to{opacity:1}}

/* ---- barra superior ---- */
.pw-top{position:relative;z-index:30;display:flex;align-items:center;justify-content:space-between;gap:12px;
  padding:14px clamp(12px,3vw,28px);flex:0 0 auto;background:rgba(7,10,8,.72);backdrop-filter:blur(10px)}
.pw-brand{display:flex;align-items:center;gap:10px;min-width:0}
.pw-brand strong{display:block;font-size:15px;letter-spacing:.2px}
.pw-brand small{display:block;font-size:11.5px;color:#9fb3a4;letter-spacing:.4px}
.pw-dot{width:10px;height:10px;border-radius:50%;background:#e23b45;box-shadow:0 0 0 4px rgba(226,59,69,.18)}
.pw-tools{display:flex;align-items:center;gap:8px}
.pw-btn{display:inline-flex;align-items:center;gap:7px;padding:9px 13px;border-radius:999px;cursor:pointer;
  background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);color:#f4f1ea;
  font-size:13px;font-weight:600;text-decoration:none;transition:.22s;backdrop-filter:blur(8px);white-space:nowrap}
.pw-btn:hover{background:rgba(46,160,90,.9);border-color:transparent;transform:translateY(-1px)}
.pw-close:hover{background:#e23b45}
@media(max-width:820px){.pw-lbl{display:none}.pw-btn{padding:9px}}

/* ---- escenario ---- */
.pw-stage{position:relative;flex:1 1 auto;display:flex;align-items:center;justify-content:center;
  padding:0 clamp(6px,2vw,24px);min-height:0;overflow:hidden}
.pw-nav{position:absolute;top:50%;transform:translateY(-50%);z-index:15;
  width:48px;height:48px;border-radius:50%;display:grid;place-items:center;cursor:pointer;
  background:rgba(0,0,0,.5);border:1px solid rgba(255,255,255,.22);color:#fff;transition:.22s;
  backdrop-filter:blur(6px)}
.pw-prev{left:clamp(6px,2vw,22px)}
.pw-next{right:clamp(6px,2vw,22px)}
.pw-nav:hover:not(:disabled){background:#2ea05a;border-color:transparent;transform:translateY(-50%) scale(1.08)}
.pw-nav:disabled{opacity:.2;cursor:default}
@media(max-width:820px){.pw-nav{width:40px;height:40px}}

/* ---- libro ---- */
.pw-book{position:relative;margin:auto;perspective:2400px;perspective-origin:50% 50%;touch-action:pan-y;
  aspect-ratio:var(--ratio);height:auto;
  width:min(100%, calc((100dvh - 230px) * var(--ratio)), calc(100vw - 130px))}
.pw-book.is-zoom{cursor:grab;touch-action:none}
.pw-book.is-zoom:active{cursor:grabbing}
.pw-book-inner{position:relative;width:100%;height:100%;transform-style:preserve-3d;
  transition:transform .45s cubic-bezier(.22,1,.36,1)}
.pw-sombra{position:absolute;left:6%;right:6%;bottom:-26px;height:34px;border-radius:50%;
  background:radial-gradient(ellipse at center,rgba(0,0,0,.6),transparent 70%);filter:blur(6px);pointer-events:none}

.pw-hoja{position:absolute;inset:0;transform-origin:left center;transform-style:preserve-3d;
  transform:rotateY(0deg);
  transition:transform var(--dur) cubic-bezier(.55,.06,.3,1), opacity .01s linear;
  will-change:transform}
.pw-hoja.is-volteada{transform:rotateY(-176deg)}

.pw-cara{position:absolute;inset:0;backface-visibility:hidden;-webkit-backface-visibility:hidden;
  border-radius:8px;overflow:hidden;box-shadow:0 26px 60px rgba(0,0,0,.55),0 2px 0 rgba(255,255,255,.05) inset}
.pw-frente{background:#0b0b0b}
.pw-frente img{width:100%;height:100%;object-fit:contain;display:block;user-select:none}
.pw-reverso{transform:rotateY(180deg);
  background:linear-gradient(115deg,#14100c,#241c14 45%,#100d0a);display:grid;place-items:center}
.pw-marca{font-family:Georgia,"Times New Roman",serif;font-size:clamp(20px,4vw,44px);letter-spacing:6px;
  color:rgba(255,255,255,.07);text-transform:uppercase}

.pw-lomo{position:absolute;left:0;top:0;bottom:0;width:9%;pointer-events:none;
  background:linear-gradient(90deg,rgba(0,0,0,.55),rgba(0,0,0,.16) 45%,transparent)}
.pw-brillo{position:absolute;inset:0;pointer-events:none;
  background:linear-gradient(105deg,transparent 55%,rgba(255,255,255,.07) 78%,transparent 92%)}

/* zonas clicables para pasar página */
.pw-zona{position:absolute;top:0;bottom:0;width:26%;cursor:pointer;z-index:3;
  display:grid;place-items:center;opacity:0;transition:opacity .2s}
.pw-zona:hover{opacity:1}
.pw-zona::after{width:46px;height:46px;border-radius:50%;display:grid;place-items:center;
  background:rgba(0,0,0,.5);border:1px solid rgba(255,255,255,.28);color:#fff;font-size:28px;line-height:1}
.pw-zona-izq{left:0}
.pw-zona-izq::after{content:'‹'}
.pw-zona-der{right:0}
.pw-zona-der::after{content:'›'}
@media(hover:none){.pw-zona{display:none}}

/* móvil: sin volteo 3D, deslizamiento lateral */
.pw-book.is-movil .pw-hoja{transition:transform var(--dur) cubic-bezier(.22,1,.36,1),opacity .3s linear}
.pw-book.is-movil .pw-hoja.is-volteada{transform:translateX(-118%) rotateY(-14deg)}
.pw-book.is-movil .pw-reverso{display:none}

/* ---- barra inferior ---- */
.pw-bottom{position:relative;z-index:30;flex:0 0 auto;display:flex;align-items:center;justify-content:center;
  gap:14px;flex-wrap:wrap;padding:16px clamp(12px,3vw,28px) 22px;background:rgba(7,10,8,.72);backdrop-filter:blur(10px)}

/* botón flotante para salir del zoom */
.pw-salir-zoom{position:absolute;z-index:16;bottom:16px;left:50%;transform:translateX(-50%);
  display:inline-flex;align-items:center;gap:8px;padding:11px 20px;border-radius:999px;cursor:pointer;
  background:#e23b45;border:0;color:#fff;font-size:13px;font-weight:700;font-family:inherit;
  box-shadow:0 10px 26px rgba(0,0,0,.5)}
.pw-salir-zoom:hover{background:#c22f38}
.pw-titulo{font-size:14px;font-weight:700;color:#e9e4d8;letter-spacing:.3px;text-align:center}
.pw-pager{font-size:13px;color:#9fb3a4;font-variant-numeric:tabular-nums}
.pw-pager span{color:#2ea05a;font-weight:700}
.pw-barra{position:relative;width:min(240px,40vw);height:3px;border-radius:99px;background:rgba(255,255,255,.12);overflow:hidden}
.pw-barra span{position:absolute;left:0;top:0;bottom:0;background:linear-gradient(90deg,#2ea05a,#8dc63f);
  border-radius:99px;transition:width .45s ease}
.pw-hint{font-size:11.5px;color:#7d8f83}
.pw-cta{padding:10px 20px;border-radius:999px;background:#2ea05a;color:#fff;font-size:13px;font-weight:700;
  text-decoration:none;transition:.2s;box-shadow:0 8px 22px rgba(46,160,90,.32)}
.pw-cta:hover{background:#24864a;transform:translateY(-1px)}
@media(max-width:820px){.pw-hint{display:none}.pw-titulo{width:100%;font-size:12.5px}}

/* ---- índice ---- */
.pw-indice{position:absolute;inset:0;z-index:20;background:rgba(5,8,6,.82);backdrop-filter:blur(6px);
  display:grid;place-items:center;padding:24px;animation:pw-fade .25s ease both}
.pw-indice-box{width:min(940px,100%);max-height:80vh;overflow:auto;background:rgba(20,26,21,.96);
  border:1px solid rgba(255,255,255,.1);border-radius:18px;padding:22px}
.pw-indice-box h3{margin:0 0 16px;font-size:16px;letter-spacing:.3px}
.pw-thumbs{display:grid;grid-template-columns:repeat(auto-fill,minmax(190px,1fr));gap:14px}
.pw-thumb{background:none;border:2px solid transparent;border-radius:12px;padding:0;cursor:pointer;
  overflow:hidden;text-align:left;transition:.2s;color:inherit}
.pw-thumb img{width:100%;aspect-ratio:1871/1323;object-fit:cover;display:block;border-radius:10px}
.pw-thumb span{display:block;padding:8px 6px 10px;font-size:11.5px;color:#a9bcae;line-height:1.35}
.pw-thumb:hover{border-color:rgba(46,160,90,.6);transform:translateY(-2px)}
.pw-thumb.is-activa{border-color:#2ea05a}
.pw-thumb.is-activa span{color:#8dc63f}

@media(prefers-reduced-motion:reduce){
  .pw-hoja,.pw-book-inner,.pw-barra span{transition-duration:.01ms!important}
}
    `}</style>
  );
}
