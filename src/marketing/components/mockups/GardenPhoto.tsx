import { useId } from 'react';

/**
 * « Photo » de jardin illustrée en SVG (aucune image externe, aucun droit d'auteur).
 * Remplaçable par une vraie photo sous licence : voir public/images/README.md.
 * annotated : contours de zones détectées (gazon, terrasse, clôture) alignés sur le dessin.
 */
export function GardenPhoto({
  annotated = false,
  scan = false,
  className = '',
  title = 'Photo d’un jardin avant travaux',
}: {
  annotated?: boolean;
  scan?: boolean;
  className?: string;
  title?: string;
}) {
  const id = useId().replace(/:/g, '');
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <svg viewBox="0 0 360 300" preserveAspectRatio="xMidYMid slice" className="block h-full w-full"
        role={title ? 'img' : undefined}
        aria-label={title || undefined}
        aria-hidden={title ? undefined : true}
      >
        <defs>
          <linearGradient id={`${id}sky`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#bcd8e4" />
            <stop offset="1" stopColor="#eef3ea" />
          </linearGradient>
          <linearGradient id={`${id}lawn`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#8fbf6e" />
            <stop offset="1" stopColor="#5b944a" />
          </linearGradient>
          <linearGradient id={`${id}wall`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#e7dfcf" />
            <stop offset="1" stopColor="#d9cfbb" />
          </linearGradient>
          <radialGradient id={`${id}sun`} cx="0.8" cy="0.1" r="0.9">
            <stop offset="0" stopColor="#fff8e1" stopOpacity="0.55" />
            <stop offset="1" stopColor="#fff8e1" stopOpacity="0" />
          </radialGradient>
          <linearGradient id={`${id}shade`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0.6" stopColor="#000" stopOpacity="0" />
            <stop offset="1" stopColor="#0b1a12" stopOpacity="0.35" />
          </linearGradient>
        </defs>

        <rect width="360" height="300" fill={`url(#${id}sky)`} />
        {/* arbres au loin */}
        <g fill="#5d8a60">
          <circle cx="150" cy="104" r="26" />
          <circle cx="182" cy="96" r="30" />
          <circle cx="222" cy="106" r="24" />
          <circle cx="300" cy="92" r="34" />
          <circle cx="340" cy="104" r="26" />
        </g>
        <g fill="#4a7650">
          <circle cx="262" cy="110" r="22" />
          <circle cx="200" cy="116" r="20" />
          <circle cx="322" cy="118" r="20" />
        </g>
        {/* clôture existante au fond (à remplacer) */}
        <g stroke="#b9a584" strokeWidth="3">
          {Array.from({ length: 22 }, (_, i) => (
            <line key={i} x1={128 + i * 10.6} y1={128} x2={128 + i * 10.6} y2={146} />
          ))}
        </g>
        <line x1="124" y1="132" x2="360" y2="132" stroke="#a8936f" strokeWidth="2" />
        {/* haie */}
        <path d="M112 150 Q140 138 170 146 T230 144 T300 142 T360 140 V160 H112 Z" fill="#3f6f45" />
        {/* maison */}
        <rect x="-4" y="36" width="122" height="170" fill={`url(#${id}wall)`} />
        <rect x="-4" y="30" width="130" height="10" fill="#8c7b66" />
        <rect x="22" y="70" width="46" height="54" rx="2" fill="#9fb9c4" stroke="#fff" strokeWidth="4" />
        <line x1="45" y1="70" x2="45" y2="124" stroke="#fff" strokeWidth="3" />
        <rect x="80" y="112" width="30" height="92" fill="#7b6a57" />
        {/* pelouse */}
        <path d={`M112 158 L360 150 L360 300 L0 300 L0 206 L118 190 Z`} fill={`url(#${id}lawn)`} />
        {/* bandes de tonte */}
        <g fill="#ffffff" opacity="0.07">
          <path d="M150 158 L190 157 L150 300 L80 300 Z" />
          <path d="M230 156 L270 155 L270 300 L205 300 Z" />
          <path d="M310 153 L350 152 L360 300 L330 300 Z" />
        </g>
        {/* terrasse à créer : zone terre battue */}
        <path d="M0 206 L118 190 L150 232 L0 262 Z" fill="#b69a74" />
        <path d="M0 206 L118 190 L150 232 L0 262 Z" fill="#000" opacity="0.06" />
        <g stroke="#9c7f5a" strokeWidth="1" opacity="0.6">
          <path d="M20 204 L40 256" />
          <path d="M60 199 L88 249" />
          <path d="M98 193 L128 240" />
        </g>
        {/* allée en gravier */}
        <path d="M150 232 C180 220 200 200 214 168 L232 166 C224 206 206 248 196 300 L118 300 C136 270 146 250 150 232 Z" fill="#e4d9c4" />
        <g fill="#cdbfa5">
          {[
            [170, 250],
            [182, 232],
            [196, 212],
            [210, 190],
            [160, 280],
            [176, 270],
            [205, 228],
            [218, 178],
          ].map(([x, y]) => (
            <circle key={`${x}-${y}`} cx={x} cy={y} r="2" />
          ))}
        </g>
        {/* massifs / arbustes */}
        <g>
          <ellipse cx="300" cy="176" rx="34" ry="16" fill="#a0785a" />
          <circle cx="286" cy="168" r="10" fill="#3f7a4a" />
          <circle cx="306" cy="164" r="12" fill="#4c8a52" />
          <circle cx="322" cy="172" r="9" fill="#3f7a4a" />
          <circle cx="306" cy="164" r="3" fill="#e8b4c0" />
        </g>
        <rect width="360" height="300" fill={`url(#${id}sun)`} />
        <rect width="360" height="300" fill={`url(#${id}shade)`} />

        {annotated && (
          <g fill="none" strokeWidth="2" strokeLinejoin="round">
            <path d="M232 160 L352 156 L352 290 L206 290 C214 250 226 206 232 160 Z" stroke="#ffffff" strokeDasharray="6 5" className="flow-line" />
            <path d="M6 210 L114 195 L142 230 L6 256 Z" stroke="#fcd672" strokeDasharray="6 5" className="flow-line" />
            <path d="M128 128 L356 128" stroke="#8fcf9f" strokeWidth="3" strokeDasharray="6 5" className="flow-line" />
            <circle cx="232" cy="160" r="3.5" fill="#fff" />
            <circle cx="352" cy="156" r="3.5" fill="#fff" />
            <circle cx="6" cy="210" r="3.5" fill="#fcd672" />
            <circle cx="142" cy="230" r="3.5" fill="#fcd672" />
          </g>
        )}
      </svg>
      {scan && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-1/4">
          <div className="animate-scan h-full w-full bg-gradient-to-b from-transparent via-leaf/25 to-leaf/60 [border-bottom:2px_solid_rgb(143_207_159)]" />
        </div>
      )}
    </div>
  );
}
