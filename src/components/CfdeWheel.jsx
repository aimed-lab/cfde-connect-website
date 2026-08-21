/*
 * Interactive CFDE wheel — a native React port of the cfde-wheel WordPress
 * plugin on cfdeconnect.org. Five center "petals" (Cloud, Knowledge, Training,
 * Data, Coordination) surrounded by a ring of the 18 Common Fund DCC programs.
 * Geometry (radius, petal offsets, rotations) mirrors the original plugin.
 */

const SIZE = 700;
const CENTER = SIZE / 2;
const RING_RADIUS = 280;
const DCC_BTN = 90;

const DCCS = [
  { label: 'Kids First', icon: 'dcc-kidsfirst.png', href: 'https://info.cfde.cloud/dcc/Kids First', desc: 'Data, tools, and resources empowering pediatric research' },
  { label: 'A2CPS', icon: 'dcc-a2cps.png', href: 'https://info.cfde.cloud/dcc/A2CPS', desc: 'Understanding the complex biological processes underlying chronic pain' },
  { label: 'HuBMAP', icon: 'dcc-hubmap.png', href: 'https://info.cfde.cloud/dcc/HuBMAP', desc: 'Cellular spatial atlas of the human body' },
  { label: '4DN', icon: 'dcc-4dn.png', href: 'https://info.cfde.cloud/dcc/4DN', desc: 'Nuclear organization in space and time' },
  { label: 'LINCS', icon: 'dcc-lincs.png', href: 'https://info.cfde.cloud/dcc/LINCS', desc: 'Omics signatures for drug & target discovery' },
  { label: 'IDG', icon: 'dcc-idg.png', href: 'https://info.cfde.cloud/dcc/IDG', desc: 'Illuminating GPCRs, kinases, ion channels, & other drug targets' },
  { label: 'NPH', icon: 'dcc-nph.png', href: 'https://commonfund.nih.gov/nutritionforprecisionhealth', desc: 'Predictive algorithms to advance nutrition research' },
  { label: 'GlyGen', icon: 'dcc-glygen.png', href: 'https://info.cfde.cloud/dcc/GlyGen', desc: 'Computational and informatics resources for glycoscience' },
  { label: 'Bridge2AI', icon: 'dcc-bridge2ai.png', href: 'https://info.cfde.cloud/dcc/Bridge2AI', desc: 'Biomedical AI ↔ people, data & ethics' },
  { label: 'MoTrPAC', icon: 'dcc-motrpac.png', href: 'https://info.cfde.cloud/dcc/MoTrPAC', desc: 'The molecular map of exercise' },
  { label: 'Metabolomics', icon: 'dcc-metabolomics.png', href: 'https://info.cfde.cloud/dcc/Metabolomics', desc: 'Metabolomics' },
  { label: 'SCGE', icon: 'dcc-scge.png', href: 'https://commonfund.nih.gov/editing', desc: 'Reducing the burden of diseases caused by genetic changes' },
  { label: 'SPARC', icon: 'dcc-sparc.svg', href: 'https://info.cfde.cloud/dcc/SPARC', desc: 'Bridging the body and brain' },
  { label: 'SMaHT', icon: 'dcc-smaht.png', href: 'https://info.cfde.cloud/dcc/SMaHT', desc: "Mapping somatic mutations' health implications" },
  { label: 'HMP', icon: 'dcc-hmp.png', href: 'https://info.cfde.cloud/dcc/HMP', desc: 'Human microbiome in health and disease' },
  { label: 'GTEx', icon: 'dcc-gtex.png', href: 'https://info.cfde.cloud/dcc/GTEx', desc: 'Gene expression and regulation across human tissues' },
  { label: 'SenNet', icon: 'dcc-sennet.png', href: 'https://info.cfde.cloud/dcc/SenNet', desc: 'Mapping senescent cells' },
  { label: 'ExRNA', icon: 'dcc-exrna.png', href: 'https://info.cfde.cloud/dcc/ExRNA', desc: 'Extracellular RNA communication' },
];

/* Petal offsets replicate the original plugin layout (px, in a 700×700 frame). */
const PETALS = [
  { label: 'cloud', href: 'https://info.cfde.cloud/centers/CWIC', left: 390, top: 215, rotate: '-72deg', text: { top: 80, left: '50%' }, icon: { top: 90, left: '20%' } },
  { label: 'knowledge', href: 'https://info.cfde.cloud/centers/KC', left: 363, top: 354, rotate: '0deg', text: { top: 125, left: '10%' }, icon: { top: 53, left: '13%' } },
  { label: 'training', href: 'https://info.cfde.cloud/centers/TC', left: 222, top: 372, rotate: '72deg', text: { top: 105, left: '15%' }, icon: { top: 35, left: '45%' } },
  { label: 'data', href: 'https://info.cfde.cloud/centers/DRC', left: 162, top: 243, rotate: '144deg', text: { top: 50, left: '25%' }, icon: { top: 65, left: '55%' } },
  { label: 'coordination', href: 'https://info.cfde.cloud/centers/ICC', left: 266, top: 145, rotate: '216deg', text: { top: 60, left: '23%' }, icon: { top: 100, left: '47%' } },
];

export default function CfdeWheel() {
  return (
    <div className="wheel-scaler">
      <div className="wheel" role="group" aria-label="CFDE ecosystem wheel: five CFDE centers surrounded by the Common Fund data programs">
        {DCCS.map((dcc, i) => {
          const angle = (2 * Math.PI * i) / DCCS.length;
          const x = CENTER + RING_RADIUS * Math.cos(angle) - DCC_BTN / 2;
          const y = CENTER + RING_RADIUS * Math.sin(angle) - DCC_BTN / 2;
          return (
            <a
              key={dcc.label}
              className="wheel__dcc"
              style={{ left: x, top: y }}
              href={dcc.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${dcc.label} — ${dcc.desc}`}
            >
              <img src={`/images/wheel/${dcc.icon}`} alt="" loading="lazy" />
              <span className="wheel__tip">{dcc.desc}</span>
            </a>
          );
        })}

        {PETALS.map((p) => (
          <a
            key={p.label}
            className="wheel__petal"
            style={{ left: p.left, top: p.top }}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`CFDE ${p.label} center`}
          >
            <img
              className="petalimg"
              src={`/images/wheel/petal-${p.label}.png`}
              alt=""
              loading="lazy"
              style={{ transform: `rotate(${p.rotate})` }}
            />
            <b style={{ top: p.text.top, left: p.text.left }}>{p.label}</b>
            <img
              className="petalicon"
              src={`/images/wheel/icon-${p.label}.png`}
              alt=""
              loading="lazy"
              style={{ top: p.icon.top, left: p.icon.left }}
            />
          </a>
        ))}

        <a
          className="wheel__hub"
          style={{ left: CENTER - 65, top: CENTER - 65 }}
          href="https://info.cfde.cloud/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Common Fund Data Ecosystem"
        >
          <img src="/images/wheel/cfde-center-logo.png" alt="CFDE" />
        </a>
      </div>
    </div>
  );
}
