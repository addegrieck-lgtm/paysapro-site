import { Camera, Check, Sparkles, TriangleAlert } from 'lucide-react';
import { AppBar, StatusBar } from './PhoneFrame';
import { GardenPhoto } from './GardenPhoto';
import { SAMPLE_PROJECT } from '../../data/sample';

/** Écran « photo analysée » : zones repérées, quantités proposées À CONFIRMER par le professionnel. */
export function PhotoAnalysisMockup({ scan = true }: { scan?: boolean }) {
  const { lawn, terrace, fence } = SAMPLE_PROJECT.dims;
  return (
    <>
      <StatusBar />
      <AppBar
        title="Jardin Martin"
        subtitle={`${SAMPLE_PROJECT.address}, Nantes`}
        right={
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-brand text-white">
            <Camera className="h-3.5 w-3.5" />
          </span>
        }
      />
      <div className="relative mx-3 mt-3 overflow-hidden rounded-2xl">
        <GardenPhoto annotated scan={scan} className="aspect-[4/3.3]" />
        <span className="absolute top-[52%] right-[6%] rounded-md bg-white/95 px-1.5 py-0.5 text-[9.5px] font-bold text-forest shadow">Gazon</span>
        <span className="absolute top-[70%] left-[4%] rounded-md bg-[#fcd672] px-1.5 py-0.5 text-[9.5px] font-bold text-ink shadow">Terrasse</span>
        <span className="absolute top-[35%] right-[18%] rounded-md bg-leaf px-1.5 py-0.5 text-[9.5px] font-bold text-forest shadow">Clôture</span>
      </div>
      <div className="mx-3 mt-2.5 flex items-center gap-1.5 text-[10.5px] font-semibold text-brand">
        <Sparkles className="h-3.5 w-3.5" /> 3 zones repérées · à vérifier
      </div>
      <ul className="mx-3 mt-2 space-y-1.5 text-[11px]">
        <Row label="Gazon" value={`${lawn.l} × ${lawn.w} m = ${lawn.l * lawn.w} m²`} ok />
        <Row label="Terrasse" value={`${terrace.l} × ${terrace.w} m = ${terrace.l * terrace.w} m²`} ok />
        <Row label="Clôture" value={`≈ ${fence} ml`} />
      </ul>
      <div className="mx-3 mt-auto mb-4 rounded-xl bg-brand py-2.5 text-center text-[11.5px] font-bold text-white">Préparer le devis</div>
    </>
  );
}

function Row({ label, value, ok }: { label: string; value: string; ok?: boolean }) {
  return (
    <li className="flex items-center justify-between gap-2 rounded-lg bg-white px-2.5 py-1.5 ring-1 ring-line">
      <span className="font-semibold text-ink">{label}</span>
      <span className="flex items-center gap-1 text-muted tabular-nums">
        {value}
        {ok ? <Check className="h-3 w-3 text-brand" /> : <TriangleAlert className="h-3 w-3 text-amber" />}
      </span>
    </li>
  );
}
