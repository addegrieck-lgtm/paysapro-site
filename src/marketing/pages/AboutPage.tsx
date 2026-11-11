import { Leaf, Smartphone, Users } from 'lucide-react';
import { Link } from 'react-router';
import { usePageMeta } from '../components/usePageMeta';
import { PageHeader } from '../components/PageHeader';
import { IconTile } from '../components/FeatureCard';
import { Container } from '../components/ui';
import { BetaSection } from '../sections/MiscSections';
import { FinalCTA } from '../sections/FinalCTA';

const VALUES = [
  { icon: Leaf, title: 'Spécialisé paysage', text: 'Un vocabulaire, des unités et des usages propres à votre métier : chantier, métrés, gazon, clôture, plantations.' },
  { icon: Smartphone, title: 'Conçu pour le terrain', text: 'Le téléphone d’abord, parce que les devis commencent dans le jardin du client, pas derrière un bureau.' },
  { icon: Users, title: 'Construit avec vous', text: 'Chaque évolution part des retours de professionnels qui utilisent l’outil au quotidien.' },
];

export default function AboutPage() {
  usePageMeta('/a-propos');
  return (
    <>
      <PageHeader
        eyebrow="À propos"
        title="Un outil moderne pour les professionnels du paysage."
        intro="Paysapro AI est né d’un constat simple : préparer un devis prend trop de temps, entre photos dispersées, calculs à refaire et documents à ressaisir."
      />
      <Container className="pb-20">
        {/* TODO : ajouter l'histoire réelle du projet et de l'équipe (ne rien inventer). */}
        <ul className="grid gap-5 md:grid-cols-3">
          {VALUES.map((v) => (
            <li key={v.title} className="rounded-3xl bg-white p-7 ring-1 ring-line">
              <IconTile icon={v.icon} />
              <h2 className="mt-5 text-lg font-bold text-ink">{v.title}</h2>
              <p className="mt-2 leading-relaxed text-muted">{v.text}</p>
            </li>
          ))}
        </ul>
        <p className="mx-auto mt-10 max-w-3xl text-center text-[1.05rem] leading-[1.75] text-muted">
          Paysapro AI est un logiciel de devis, de facturation et de suivi de chantier pour les paysagistes, les jardiniers et les entreprises d’aménagement extérieur.{' '}
          <Link to="/quest-ce-que-paysapro-ai" className="font-semibold text-brand underline underline-offset-4">
            Lire la présentation complète de Paysapro AI
          </Link>
          , ses fonctionnalités, ses limites et ses tarifs.
        </p>
      </Container>
      <BetaSection />
      <FinalCTA />
    </>
  );
}
