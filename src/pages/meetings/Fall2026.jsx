import { Mesh, Section, ArrowIcon } from '@/components/shared';

const REGISTER_URL = 'https://forms.gle/APutb85vMVu5AA2A8';

const HOTELS = [
  {
    name: 'Estancia La Jolla Hotel & Spa',
    pill: 'Walk to campus', walk: true,
    text: 'Resort-style hotel directly across from UC San Diego on North Torrey Pines Road.',
    href: 'https://www.estancialajolla.com/', domain: 'estancialajolla.com',
  },
  {
    name: 'Hilton La Jolla Torrey Pines',
    pill: 'Walk to campus', walk: true,
    text: 'On the edge of campus overlooking the Torrey Pines Golf Course.',
    href: 'https://www.hilton.com/en/hotels/santphh-hilton-la-jolla-torrey-pines/', domain: 'hilton.com',
  },
  {
    name: 'Sheraton La Jolla Hotel',
    pill: 'Short drive',
    text: 'Heated outdoor pool and tropical garden setting in the La Jolla Village area.',
    href: 'https://www.marriott.com/en-us/hotels/sanjs-sheraton-la-jolla-hotel/overview/', domain: 'marriott.com',
  },
  {
    name: 'Residence Inn San Diego La Jolla',
    pill: 'Short drive',
    text: 'Pet-friendly all-suite hotel with kitchenettes — good for longer stays.',
    href: 'https://www.marriott.com/en-us/hotels/lajca-residence-inn-san-diego-la-jolla/overview/', domain: 'marriott.com',
  },
  {
    name: 'Hyatt Regency La Jolla at Aventine',
    pill: 'Short drive',
    text: 'Full-service hotel near UC San Diego and La Jolla beaches, with on-site dining.',
    href: 'https://www.hyatt.com/hyatt-regency/en-US/jolla-hyatt-regency-la-jolla-at-aventine', domain: 'hyatt.com',
  },
  {
    name: 'Embassy Suites by Hilton San Diego La Jolla',
    pill: 'Short drive',
    text: 'Two-room suites with complimentary made-to-order breakfast.',
    href: 'https://www.hilton.com/en/hotels/sanljes-embassy-suites-san-diego-la-jolla/', domain: 'hilton.com',
  },
];

export default function Fall2026() {
  return (
    <>
      {/* ══════ Hero ══════ */}
      <section className="hero">
        <Mesh />
        <div className="wrap hero__inner">
          <p className="hero__eyebrow">CFDE CONNECT presents</p>
          <h1 className="hero__title">CFDE Fall&nbsp;2026 Meeting</h1>
          <p className="hero__sub">
            Two days of cross-program collaboration, data-science showcases, and community planning
            for the Common Fund Data Ecosystem.
          </p>

          <dl className="hero__facts">
            <div>
              <dt>Dates</dt>
              <dd><time dateTime="2026-10-13">October 13–14, 2026</time></dd>
            </div>
            <div>
              <dt>Venue</dt>
              <dd>Ida &amp; Cecil Green Faculty Club<span>UC San Diego · La Jolla, CA</span></dd>
            </div>
            <div>
              <dt>Format</dt>
              <dd>In person<span>Remote link shared before the meeting</span></dd>
            </div>
          </dl>

          <div className="hero__actions">
            <a className="btn btn--primary" href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
              Register now
              <ArrowIcon />
            </a>
            <a className="btn btn--ghost" href="#venue">Venue &amp; travel</a>
          </div>
        </div>
      </section>

      {/* ══════ Registration ══════ */}
      <Section
        id="register"
        kicker="Step one"
        title="Registration"
      >
        <p className="lede">
          This meeting is intended for CFDE <strong>Principal Investigators</strong>,{' '}
          <strong>Technical Leads</strong>, and <strong>Program Managers</strong>. Registration is
          handled through a short Google Form — the same process used for previous CFDE meetings.
          Please register early so we can plan catering and seating.
        </p>
        <div className="regcard">
          <div className="regcard__body">
            <h3>CFDE Fall 2026 Meeting registration form</h3>
            <p>Takes about two minutes. You will need your name, institution, and CFDE program or DCC affiliation.</p>
            <ul className="ticks">
              <li>For CFDE PIs, Technical Leads, and Program Managers</li>
              <li>Registration helps us finalize headcount, catering, and room setup</li>
              <li>Remote participants: register too — the connection link is sent to registrants</li>
            </ul>
          </div>
          <div className="regcard__cta">
            <a className="btn btn--primary btn--lg" href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
              Open registration form
              <ArrowIcon />
            </a>
            <p className="regcard__note">Opens Google Forms in a new tab</p>
          </div>
        </div>
      </Section>

      {/* ══════ Agenda ══════ */}
      <Section tint id="agenda" kicker="Program" title="Agenda">
        <div className="soon">
          <span className="soon__badge">Coming soon</span>
          <p className="soon__text">
            The Fall 2026 agenda is still being finalized. The full two-day schedule — sessions,
            speakers, and breakouts — will be posted on this page as soon as it is confirmed.
          </p>
        </div>
      </Section>

      {/* ══════ Venue ══════ */}
      <Section id="venue" kicker="Getting there" title="Venue"
        lede="The meeting is hosted at the Ida and Cecil Green Faculty Club on the UC San Diego campus in La Jolla.">
        <div className="venue">
          <div className="card card--venue">
            <h3 className="card__title">Ida &amp; Cecil Green Faculty Club</h3>
            <address className="addr">
              UC San Diego<br />
              9500 Gilman Drive<br />
              La Jolla, CA 92093
            </address>
            <div className="linkrow">
              <a className="btn btn--outline" href="https://maps.app.goo.gl/GEszoHw7Tt52r4us6" target="_blank" rel="noopener noreferrer">
                Open in Google Maps
                <ArrowIcon />
              </a>
              <a className="btn btn--outline" href="https://facclub.ucsd.edu/directions/index.html" target="_blank" rel="noopener noreferrer">
                Official directions
                <ArrowIcon />
              </a>
            </div>
          </div>

          <div className="stack">
            <div className="card">
              <h3 className="card__title"><span className="ico">P</span>Parking</h3>
              <p>
                A permit is required on campus <strong>seven days a week</strong>. Lot&nbsp;P206
                sits next to the Faculty Club but has very limited spaces; the larger{' '}
                <strong>Scholars parking lot</strong> is the better bet. Allow extra time — nearby
                construction has reduced availability.
              </p>
            </div>
            <div className="card">
              <h3 className="card__title"><span className="ico">◎</span>Remote participation</h3>
              <p>
                A remote connection link will be circulated to registered participants ahead of the
                meeting. Register through the form above to receive it.
              </p>
            </div>
            <div className="card">
              <h3 className="card__title"><span className="ico">✈</span>Air travel</h3>
              <p>
                San Diego International Airport (SAN) is the closest airport, roughly a
                20–30&nbsp;minute drive to La Jolla depending on traffic.
              </p>
            </div>
          </div>
        </div>
      </Section>

      {/* ══════ Hotels ══════ */}
      <Section tint id="hotels" kicker="Where to stay" title="Hotel suggestions"
        lede={<>There is <strong>no room block</strong> for this meeting — please book directly with the hotel of your choice. The options below are all in La Jolla, near the UC San Diego campus.</>}>
        <ul className="hotels">
          {HOTELS.map((h) => (
            <li className="hotel" key={h.name}>
              <div className="hotel__top">
                <span className={`pill${h.walk ? ' pill--green' : ''}`}>{h.pill}</span>
                <h3>{h.name}</h3>
              </div>
              <p>{h.text}</p>
              <a href={h.href} target="_blank" rel="noopener noreferrer">
                {h.domain}
                <ArrowIcon />
              </a>
            </li>
          ))}
        </ul>
        <p className="finenote">
          Proximity labels are approximate and measured to the UC San Diego campus rather than to a
          specific building. Please confirm distance, rates, and availability directly with the hotel.
        </p>
      </Section>

      {/* ══════ Closing ══════ */}
      <section className="closing">
        <div className="wrap closing__inner">
          <h2>See you in La Jolla</h2>
          <p>October 13–14, 2026 · UC San Diego</p>
          <a className="btn btn--invert btn--lg" href={REGISTER_URL} target="_blank" rel="noopener noreferrer">
            Register for the meeting
            <ArrowIcon />
          </a>
          <p className="closing__contact">
            Questions about the meeting? Contact{' '}
            <a href="mailto:snthaker@uab.edu">Swathi Thaker — snthaker@uab.edu</a>
          </p>
        </div>
      </section>
    </>
  );
}
