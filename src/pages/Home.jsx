import { Link } from 'react-router-dom';
import { Mesh, Section, ArrowIcon } from '@/components/shared';
import CfdeWheel from '@/components/CfdeWheel';

const CORES = [
  {
    to: '/cores/administrative',
    title: 'Administrative Core',
    org: 'University of Alabama at Birmingham',
    text: 'Facilitating inter-consortium communication and events through efficient operations and team science.',
  },
  {
    to: '/cores/evaluation',
    title: 'Evaluation Core',
    org: 'University of Colorado Anschutz Medical Campus',
    text: 'Developing standard metrics across Common Fund projects to demonstrate the impact of the ecosystem.',
  },
  {
    to: '/cores/sustainability',
    title: 'Sustainability Core',
    org: 'UCLA · University of Arizona',
    text: 'Facilitating the successful transition of Common Fund program digital assets, datasets, tools, and workflows.',
  },
];

export default function Home() {
  return (
    <>
      {/* ══════ Hero ══════ */}
      <section className="hero" id="top">
        <video
          className="hero__video"
          src="/videos/hero.mp4"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        />
        <Mesh />
        <div className="wrap hero__inner">
          <p className="hero__eyebrow">Integration &amp; Coordination Center</p>
          <h1 className="hero__title">CONNECT ICC</h1>
          <p className="hero__sub">
            Transforming Data Into Discovery: Building a Connected Biomedical Future
          </p>
          <div className="hero__actions">
            <a className="btn btn--primary" href="https://forms.gle/8T5W9BnLo5Vzz5Gt5" target="_blank" rel="noopener noreferrer">
              Join / Collaborate
              <ArrowIcon />
            </a>
            <Link className="btn btn--ghost" to="/meetings/fall-2026">
              CFDE Fall 2026 Meeting
            </Link>
          </div>
        </div>
      </section>

      {/* ══════ Mission ══════ */}
      <Section kicker="Our role" title="Coordinating the Common Fund Data Ecosystem">
        <div className="grid-2" style={{ gap: 'clamp(28px,5vw,56px)' }}>
          <div className="prose">
            <p>
              Connect ICC&rsquo;s role in coordinating the activities of various stakeholders and
              facilitating collaboration significantly enhances the CFDE&rsquo;s potential to
              revolutionize biomedical research. Our Center is integral to the mission of the
              Common Fund Data Ecosystem.
            </p>
            <p>
              This collaborative network, nurtured by the ICC, provides a platform for leveraging
              the collective expertise of these stakeholders, which is crucial to unlocking the
              potential value of the CFDE&rsquo;s data assets.
            </p>
            <p>
              By fostering efficient operations, promoting continuous quality improvement, and
              ensuring data sustainability, the ICC drives transformative biomedical discoveries,
              facilitates collaborative research, and accelerates the impact of the CFDE.
            </p>
            <p>
              Through the expertise and dedication of our team, the CONNECT ICC is poised to help
              CFDE revolutionize the biomedical research landscape and advance the mission of the
              Common Fund.
            </p>
          </div>
          <div className="stack">
            <div className="quote">
              <p>
                &ldquo;The mission of the Common Fund Data Ecosystem is to connect common fund data
                sets to power AI-driven medicine&rdquo;
              </p>
            </div>
            <div className="card">
              <h3 className="card__title"><span className="ico">3</span>ICC&rsquo;s innovation harmoniously integrates 3 cores</h3>
              <ul className="ticks">
                <li><Link to="/cores/administrative">Administration (UAB)</Link></li>
                <li><Link to="/cores/evaluation">Evaluation (Colorado Anschutz Medical Campus)</Link></li>
                <li><Link to="/cores/sustainability">Sustainability (UCLA &amp; University of Arizona)</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </Section>

      {/* ══════ CFDE Wheel ══════ */}
      <Section
        tint
        id="wheel"
        className="wheel-section"
        kicker="The ecosystem"
        title="Explore the CFDE"
        lede="Five CFDE centers — Data, Knowledge, Cloud, Training, and Coordination — working with the Common Fund data programs. Select a petal or a program to learn more."
      >
        <CfdeWheel />
      </Section>

      {/* ══════ Cores ══════ */}
      <Section kicker="How we work" title="Three integrated cores">
        <div className="grid-3">
          {CORES.map((core) => (
            <Link key={core.to} to={core.to} className="card card--hover" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
              <h3 className="card__title" style={{ marginBottom: 6 }}>{core.title}</h3>
              <p className="pill pill--teal pill--wrap" style={{ alignSelf: 'flex-start', marginBottom: 12 }}>{core.org}</p>
              <p style={{ flex: 1 }}>{core.text}</p>
              <p style={{ marginTop: 14, color: 'var(--blue-dark)', fontWeight: 650, fontSize: '.92rem' }}>Learn more →</p>
            </Link>
          ))}
        </div>
      </Section>

      {/* ══════ Partners ══════ */}
      <Section tint tight>
        <div className="partners">
          <a href="https://www.uab.edu/" target="_blank" rel="noopener noreferrer"><img src="/images/logos/uab.png" alt="The University of Alabama at Birmingham" /></a>
          <a href="https://www.ucla.edu/" target="_blank" rel="noopener noreferrer"><img src="/images/logos/ucla.png" alt="UCLA" /></a>
          <a href="https://www.cuanschutz.edu/" target="_blank" rel="noopener noreferrer"><img src="/images/logos/cu-anschutz.png" alt="University of Colorado Anschutz Medical Campus" /></a>
          {/* Awaiting an official brand asset — see README. */}
          <a className="partners__name" href="https://www.arizona.edu/" target="_blank" rel="noopener noreferrer">University of Arizona</a>
        </div>
      </Section>

      {/* ══════ Closing ══════ */}
      <section className="closing">
        <div className="wrap closing__inner">
          <h2>Connect with the CFDE community</h2>
          <p>Meetings, working groups, and collaboration across the Common Fund Data Ecosystem.</p>
          <a className="btn btn--invert btn--lg" href="https://forms.gle/8T5W9BnLo5Vzz5Gt5" target="_blank" rel="noopener noreferrer">
            Join / Collaborate
            <ArrowIcon />
          </a>
          <p className="closing__contact">
            Questions? Contact <a href="mailto:cfde.icc@gmail.com">cfde.icc@gmail.com</a>
          </p>
        </div>
      </section>
    </>
  );
}
