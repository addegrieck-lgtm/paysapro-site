/**
 * « Photo » de jardin illustrée en SVG (aucune image externe, aucun droit d'auteur).
 * Le dessin est un fichier unique (public/images/jardin-avant-travaux.svg) : le navigateur le télécharge une
 * seule fois, au lieu de répéter ~5 Ko de SVG dans le HTML à chaque occurrence (jusqu'à 9 sur l'accueil).
 * Remplaçable par une vraie photo sous licence : voir public/images/README.md.
 * annotated : contours de zones détectées (gazon, terrasse, clôture), superposés et alignés sur le dessin.
 */
const SRC = `${import.meta.env.BASE_URL}images/jardin-avant-travaux.svg`;

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
  return (
    <div className={`relative overflow-hidden ${className}`}>
      <img src={SRC} alt={title} width={360} height={300} loading="lazy" decoding="async" className="block h-full w-full object-cover" />
      {annotated && (
        <svg viewBox="0 0 360 300" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 block h-full w-full" aria-hidden="true">
          <g fill="none" strokeWidth="2" strokeLinejoin="round">
            <path d="M232 160 L352 156 L352 290 L206 290 C214 250 226 206 232 160 Z" stroke="#ffffff" strokeDasharray="6 5" className="flow-line" />
            <path d="M6 210 L114 195 L142 230 L6 256 Z" stroke="#fcd672" strokeDasharray="6 5" className="flow-line" />
            <path d="M128 128 L356 128" stroke="#8fcf9f" strokeWidth="3" strokeDasharray="6 5" className="flow-line" />
            <circle cx="232" cy="160" r="3.5" fill="#fff" />
            <circle cx="352" cy="156" r="3.5" fill="#fff" />
            <circle cx="6" cy="210" r="3.5" fill="#fcd672" />
            <circle cx="142" cy="230" r="3.5" fill="#fcd672" />
          </g>
        </svg>
      )}
      {scan && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-1/4">
          <div className="animate-scan h-full w-full bg-gradient-to-b from-transparent via-leaf/25 to-leaf/60 [border-bottom:2px_solid_rgb(143_207_159)]" />
        </div>
      )}
    </div>
  );
}
