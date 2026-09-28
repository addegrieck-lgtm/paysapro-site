import type { LucideIcon } from 'lucide-react';

export function IconTile({ icon: Icon, tone = 'mint', size = 'md' }: { icon: LucideIcon; tone?: 'mint' | 'forest' | 'white'; size?: 'md' | 'lg' }) {
  const tones = {
    mint: 'bg-mint text-forest',
    forest: 'bg-forest text-leaf',
    white: 'bg-white text-brand ring-1 ring-line',
  };
  return (
    <span className={`inline-flex shrink-0 items-center justify-center rounded-2xl ${tones[tone]} ${size === 'lg' ? 'h-14 w-14' : 'h-11 w-11'}`}>
      <Icon className={size === 'lg' ? 'h-7 w-7' : 'h-5 w-5'} aria-hidden="true" strokeWidth={1.8} />
    </span>
  );
}

export function FeatureCard({ icon, title, text, className = '' }: { icon: LucideIcon; title: string; text: string; className?: string }) {
  return (
    <article
      className={`group flex h-full gap-4 rounded-3xl bg-white p-5 ring-1 ring-line transition duration-300 hover:-translate-y-1 hover:shadow-card hover:ring-brand/25 motion-reduce:hover:translate-y-0 sm:block sm:p-6 ${className}`}
    >
      <IconTile icon={icon} />
      <div>
        <h3 className="text-lg font-bold text-ink sm:mt-5">{title}</h3>
        <p className="mt-1 text-[0.97rem] leading-relaxed text-muted sm:mt-2">{text}</p>
      </div>
    </article>
  );
}
