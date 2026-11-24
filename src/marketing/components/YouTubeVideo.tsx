import { useState } from 'react';
import { Play } from 'lucide-react';
import { youtubeEmbedUrl, youtubeThumbnail, type SiteVideo } from '../data/videos';

/**
 * Lecteur YouTube « au clic » : seule la miniature est affichée au chargement de la page.
 * Le lecteur (domaine youtube-nocookie.com) ne se charge qu'après un clic : pas de cookie ni de script YouTube
 * tant que le visiteur ne lance pas la vidéo, et une page plus rapide.
 */
export function YouTubeVideo({ video }: { video: SiteVideo }) {
  const [playing, setPlaying] = useState(false);
  const frame = 'relative aspect-video w-full overflow-hidden rounded-[2rem] bg-forest shadow-float ring-1 ring-black/10';
  if (playing) {
    return (
      <div className={frame}>
        <iframe
          src={`${youtubeEmbedUrl(video)}?autoplay=1&rel=0`}
          title={video.title}
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; fullscreen"
          allowFullScreen
          className="h-full w-full border-0"
        />
      </div>
    );
  }
  return (
    <button type="button" onClick={() => setPlaying(true)} className={`${frame} group block cursor-pointer`} aria-label={`Lire la vidéo : ${video.title}`}>
      <img src={youtubeThumbnail(video)} alt="" loading="lazy" decoding="async" width={480} height={360} className="absolute inset-0 h-full w-full object-cover" />
      <span className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/20 to-transparent" aria-hidden="true" />
      <span className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
        <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/90 text-forest shadow-float transition-transform group-hover:scale-105">
          <Play className="ml-1 h-7 w-7" />
        </span>
      </span>
      <span className="absolute inset-x-0 bottom-0 p-5 text-left font-display text-lg font-bold text-white sm:text-xl">{video.title}</span>
    </button>
  );
}
