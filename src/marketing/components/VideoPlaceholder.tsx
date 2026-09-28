import { Play } from 'lucide-react';
import { DEMO_VIDEO_URL } from '../config/marketing';
import { GardenPhoto } from './mockups/GardenPhoto';

/**
 * Vidéo de démonstration. Renseigner VITE_DEMO_VIDEO_URL :
 *  - fichier .mp4/.webm (ex. /videos/demo.mp4 dans public/) → lecteur natif ;
 *  - URL d'intégration (YouTube « embed », Vimeo « player ») → iframe chargée à la demande.
 * Vide → placeholder propre.
 */
export function VideoPlaceholder({ url = DEMO_VIDEO_URL }: { url?: string }) {
  const frame = 'relative aspect-video w-full overflow-hidden rounded-[2rem] bg-forest shadow-float ring-1 ring-black/10';
  if (url && /\.(mp4|webm)(\?.*)?$/i.test(url)) {
    return (
      <div className={frame}>
        <video src={url} controls preload="none" playsInline className="h-full w-full object-cover">
          Votre navigateur ne peut pas lire cette vidéo.
        </video>
      </div>
    );
  }
  if (url) {
    return (
      <div className={frame}>
        <iframe
          src={url}
          title="Démonstration de Paysapro AI"
          loading="lazy"
          allow="accelerometer; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          className="h-full w-full border-0"
        />
      </div>
    );
  }
  return (
    <div className={frame}>
      <GardenPhoto className="absolute inset-0 opacity-40" title="" />
      <div className="absolute inset-0 bg-gradient-to-t from-forest via-forest/60 to-transparent" aria-hidden="true" />
      <div className="relative flex h-full flex-col items-center justify-center gap-4 p-6 text-center text-white">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/15 ring-1 ring-white/30 backdrop-blur">
          <Play className="ml-1 h-7 w-7" aria-hidden="true" />
        </span>
        <p className="font-display text-xl font-bold sm:text-2xl">Vidéo de démonstration bientôt disponible</p>
        <p className="max-w-md text-sm text-white/70">En attendant, parcourez les étapes ci-dessous ou essayez directement l’application.</p>
      </div>
    </div>
  );
}
