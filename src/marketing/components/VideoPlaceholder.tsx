import { DEMO_VIDEO_URL } from '../config/marketing';
import { YouTubeVideo } from './YouTubeVideo';
import { DEVIS_VIDEO } from '../data/videos';

/**
 * Vidéo de démonstration. Renseigner VITE_DEMO_VIDEO_URL :
 *  - fichier .mp4/.webm (ex. /videos/demo.mp4 dans public/) → lecteur natif ;
 *  - URL d'intégration (YouTube « embed », Vimeo « player ») → iframe chargée à la demande.
 * Vide → la vidéo YouTube de démonstration (data/videos.ts).
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
  return <YouTubeVideo video={DEVIS_VIDEO} />;
}
