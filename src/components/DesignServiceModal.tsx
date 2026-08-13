'use client'

import { useEffect } from 'react'
import { FiX, FiMessageCircle } from 'react-icons/fi'
import { FaPalette, FaBullhorn, FaGlobe } from 'react-icons/fa'

interface Props {
  open: boolean
  onClose: () => void
}

const services = [
  { icon: FaPalette,  label: 'Identidad visual y logos memorables' },
  { icon: FaBullhorn, label: 'Materiales publicitarios que captan la atención' },
  { icon: FaGlobe,    label: 'Páginas web adaptadas a cualquier dispositivo' },
]

export default function DesignServiceModal({ open, onClose }: Props) {
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 flex items-center justify-center px-4"
      style={{ zIndex: 9999, background: 'rgba(10,14,26,0.72)', backdropFilter: 'blur(8px)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-[440px] bg-white rounded-[2rem] overflow-hidden"
        style={{ boxShadow: '0 32px 80px -8px rgba(0,0,0,0.4)' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Close ─────────────────────────────── */}
        <button
          onClick={onClose}
          aria-label="Cerrar"
          className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full flex items-center justify-center
            bg-white/10 border border-white/20 text-white
            hover:bg-white/20 active:scale-95 transition-all duration-150"
        >
          <FiX size={15} />
        </button>

        {/* ── Ilustración abstracta ─────────────── */}
        <div className="relative h-[200px] overflow-hidden bg-zinc-950">
          {/* Orbs de color */}
          <div className="absolute -top-6 -left-6 w-48 h-48 rounded-full bg-rose-500/40    blur-[60px]" />
          <div className="absolute top-4   right-0  w-40 h-40 rounded-full bg-amber-400/35  blur-[55px]" />
          <div className="absolute bottom-0 left-1/3 w-44 h-44 rounded-full bg-sky-500/30   blur-[60px]" />
          <div className="absolute -bottom-4 right-4 w-36 h-36 rounded-full bg-emerald-500/30 blur-[50px]" />

          {/* Grid de puntos */}
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: 'radial-gradient(rgba(255,255,255,0.8) 1px, transparent 1px)',
              backgroundSize: '22px 22px',
            }}
          />

          {/* Swatches de color */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2 flex gap-2.5">
            {['#F43F5E','#F59E0B','#10B981','#3B82F6','#8B5CF6'].map((c, i) => (
              <div
                key={i}
                className="w-7 h-7 rounded-full border-2 border-white/30 shadow-lg"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>

          {/* Ícono central */}
          <div className="absolute inset-0 flex items-center justify-center pb-6">
            <div
              className="w-14 h-14 rounded-2xl flex items-center justify-center
                bg-white/10 border border-white/20"
              style={{ backdropFilter: 'blur(12px)' }}
            >
              <FaPalette className="text-white w-6 h-6" />
            </div>
          </div>

          <div className="absolute top-4 left-4">
            <span className="text-[9px] font-extrabold tracking-[0.18em] text-white/50 uppercase">
              Servicios Creativos
            </span>
          </div>
        </div>

        {/* ── Contenido ────────────────────────── */}
        <div className="px-7 pt-6 pb-7 space-y-5">
          <div>
            <h2 className="text-xl font-bold text-zinc-900 leading-snug">
              Servicios Profesionales<br />de Diseño Gráfico
            </h2>
            <p className="mt-3 text-sm text-zinc-500 leading-relaxed">
              Transformamos tu marca en una presencia visual que comunica, conecta y vende.
              Diseños a medida con enfoque estratégico y estético.
            </p>
          </div>

          <ul className="space-y-3">
            {services.map(({ icon: Icon, label }, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-7 h-7 flex-shrink-0 rounded-lg bg-zinc-100 flex items-center justify-center mt-0.5">
                  <Icon className="w-3.5 h-3.5 text-zinc-500" />
                </span>
                <span className="text-sm text-zinc-600 leading-snug pt-1">{label}</span>
              </li>
            ))}
          </ul>

          <div className="h-px bg-zinc-100" />

          <div className="flex gap-3">
            <a
              href="https://wa.me/51928141669?text=Hola,%20quiero%20información%20sobre%20servicios%20de%20diseño%20gráfico"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl
                bg-zinc-900 text-white text-sm font-bold tracking-wide
                hover:bg-zinc-800 active:scale-[0.98] transition-all duration-150"
            >
              <FiMessageCircle size={15} />
              CONTÁCTANOS
            </a>
            <button
              onClick={onClose}
              className="px-5 py-3 rounded-xl text-sm font-semibold text-zinc-400
                hover:text-zinc-700 hover:bg-zinc-50 active:scale-[0.98] transition-all duration-150"
            >
              CERRAR
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
