import { Mesh, Section, Stats } from '@/components/shared';
import { BarChart, DotPlot } from '@/components/charts';
import Agenda from '@/components/Agenda';

/*
 * Figures below are computed from the registration export (95 responses, de-duplicated
 * to one record per person, keeping their latest submission) and the post-meeting
 * survey export (10 responses). Only aggregates are published — no names, emails or
 * dietary information. Session summaries are drawn from the Zoom transcripts of the
 * main room; parallel rooms that weren't recorded list their agenda only.
 */
const REGISTERED = 87;

const CENTERS = [
  { label: 'Data (DRC)', value: 11 },
  { label: 'Coordination (ICC)', value: 10 },
  { label: 'Cloud Workspace (CWIC)', value: 7 },
  { label: 'Knowledge (KC)', value: 6 },
  { label: 'Training (TC)', value: 3 },
];

const PROGRAMS = [
  { label: 'Metabolomics Workbench', value: 10 },
  { label: 'HuBMAP', value: 7 },
  { label: 'Bridge2AI', value: 7 },
  { label: 'SenNet', value: 6 },
  { label: 'IDG', value: 4 },
  { label: 'Kids First', value: 4 },
  { label: 'GlyGen', value: 4 },
  { label: 'MoTrPAC', value: 3 },
  { label: 'SPARC', value: 3 },
  { label: '4D Nucleome', value: 2 },
  { label: 'exRNA', value: 1 },
];

const PARTNERS = [
  'BiomarkerKB', 'CIMDAR-HIVE short course', 'Community Visualization Hub', 'COMPLEMENT-ARIE', 'H3Africa',
  'HHEAR', 'ProKN', 'SysBio FAIRplex', 'Undiagnosed Diseases Network', 'UniProt',
];

const ORGS = [
  'Argonne National Laboratory', 'Baylor College of Medicine', 'Broad Institute', 'Caltech',
  "Children's Hospital of Philadelphia", 'Emory University', 'George Washington University', 'Harvard Medical School',
  'Icahn School of Medicine at Mount Sinai', 'Indiana University', 'Informed Minds', 'Johns Hopkins University',
  'NASA Jet Propulsion Laboratory', 'National Institutes of Health', 'NYU Langone Health',
  'Oak Ridge Associated Universities', 'Pittsburgh Supercomputing Center', 'Texas Advanced Computing Center',
  'UC San Diego', 'UCLA', 'UMass Chan Medical School', 'UNC Chapel Hill', 'University of Alabama at Birmingham',
  'University of Arizona', 'University of Colorado Anschutz', 'University of Delaware', 'University of Georgia',
  'University of Illinois Chicago', 'University of New Mexico', 'Stanford University', 'Velsera', 'Verily',
];

// Post-meeting survey, 1–5 stars, sorted high to low. `top` = respondents who gave 4 or 5.
const SURVEY = [
  { label: 'Overall satisfaction', mean: 4.9, n: 10, top: 10 },
  { label: 'Dates, times & length', mean: 4.89, n: 9, top: 9 },
  { label: 'Venue, food & technology', mean: 4.8, n: 10, top: 10 },
  { label: 'Organization & communication', mean: 4.7, n: 10, top: 10 },
  { label: 'Share of the meeting attended', mean: 4.7, n: 10, top: 10 },
  { label: 'Relevance to my work', mean: 4.3, n: 10, top: 8 },
  { label: 'My questions answered', mean: 4.2, n: 10, top: 9 },
  { label: 'How much I participated', mean: 4.2, n: 10, top: 7 },
  { label: 'How engaged I was', mean: 4.1, n: 10, top: 6 },
  { label: 'New connections & collaborations', mean: 4.1, n: 10, top: 7 },
  { label: 'Likely to use the resources', mean: 4.1, n: 10, top: 6 },
];

// Agenda & session summaries, one entry per session. Summaries come from the main-room
// recordings; parallel rooms that weren't recorded list their agenda only.
const DAYS = [
  {
    id: 'day1',
    label: 'Day 1',
    date: 'Tuesday, October 13',
    sessions: [
      {
        id: 'welcome',
        time: '8:45 AM',
        tag: 'Opening',
        name: 'Welcome',
        where: 'Atkinson Pavilion · 8:45 – 9:00 AM',
        who: 'Jake Chen (UAB) and Shankar Subramaniam (UC San Diego)',
        points: [
          'Introduced the new CFDE meeting portal — agenda, attendees, photo sharing and an activity leaderboard — built by the ICC and open to the whole consortium.',
          'Host Shankar Subramaniam welcomed attendees to UC San Diego and offered a post-meeting campus walk.',
        ],
      },
      {
        id: 'nih',
        time: '9:00 AM',
        tag: 'Opening',
        name: 'NIH Opening Remarks',
        where: 'Atkinson Pavilion · 9:00 – 9:20 AM',
        who: 'Chris Kinsinger (NIH)',
        cards: [
          { label: 'Leadership', body: 'Vivian Ota Wang is now the permanent Director of the Common Fund.' },
          {
            label: 'Scale',
            body: <p>18 Common Fund programs now engage with CFDE, with over 10 million data files, data from over 2 million biosamples and over 1.2 million knowledge assertions. The CFDE flagship paper has been accepted in <em>Patterns</em>.</p>,
          },
          { label: 'Why it matters now', body: "NIH's BioGenesis initiative (part of the federal Genesis Mission for AI in science) and the Virtual Biology Initiative with DOE and the Chan Zuckerberg Initiative both depend on coordinated, harmonized data — the work CFDE has done since 2020. Other NIH efforts are now borrowing the CFDE model." },
          { label: 'New programs', body: "Welcomed SysBio FAIRplex and the COMPLEMENT-ARIE NAM Hub, and asked for impact stories ahead of CFDE's renewal." },
        ],
      },
      {
        id: 's1',
        time: '9:20 AM',
        tag: 'Session 1',
        name: 'Center Highlights',
        where: 'Atkinson Pavilion · 9:20 – 10:30 AM',
        who: 'Moderator: Christy Kano (NIH)',
        cards: [
          {
            label: "Data Resource Center — “The DRC in the Age of AGI” (Avi Ma'ayan)",
            body: <p>A redesigned CFDE Workbench and metadata Explorer; datasets now flow from the Workbench into Galaxy in the Cloud Workspace; a Liver Resource built with the Knowledge Center; natural-language cohort building; and Perturb-Seqr, which integrates 16 connectivity maps. The DRC also showed a skills-based research agent and <strong>Bio.Autoxiv</strong>, a preprint server for AI-generated articles that already holds 85 articles from six agents. Verifying AI output was the open question from the floor.</p>,
          },
          { label: 'Knowledge Center', body: "REVEAL links CFDE gene sets to human genetics; every gene set now carries a provenance graph, a persistent identifier and a landing page. An early benchmark against 10 published papers was encouraging — in a kidney-disease study, REVEAL both supported the findings and extended them to two more genes — and a wet-lab collaboration is now testing its hypotheses. REVEAL also joined NSF's Proto-OKN, a new Biomarker Connector traces disease mechanisms to biomarkers, and GA4GH has welcomed the Scientific Interoperability Incubator as a strategic partner." },
          { label: 'Integration & Coordination Center (Jake Chen)', body: "A revamped cfdeconnect.org with ORCID-linked profiles, “round-trip” event promotion, a metrics dashboard from the Evaluation Core, and the Sustainability Core's work making digital assets AI-ready and FAIR." },
          { label: 'Training Center (LaFrancis Gibson, ORAU)', body: 'In FY26 — 17 events, 11 podcast episodes, 17 hands-on trainings, 314 participants, 19 collaborations and partnerships and the first DECODE Summer Training Institute. Coming next: CFDE 102, an Early Career Research Associates program, EduHacks for educators and a data-science training unconference.' },
          { label: 'Cloud Workspace (James Carson, TACC)', body: 'Its first production year — free for Common Fund data, now on Galaxy 26.1 with an AI assistant and an MCP server, GA4GH DRS support, and an exascale system with thousands of new GPUs. A Research Authorization Service for protected data is in testing.' },
        ],
      },
      {
        id: 's2',
        time: '11:00 AM',
        tag: 'Session 2',
        name: 'Emerging Partnership Opportunities',
        where: 'Atkinson Pavilion · 11:00 AM – 12:00 PM',
        who: 'Moderator: Christy Kano (NIH)',
        cards: [
          { label: 'SysBio FAIRplex — Hal Skinner (Verily)', body: 'One federated search across the FNIH Accelerating Medicines Partnerships, over data harmonized to an OMOP-based common data model, working toward a single access request across programs. The beta portal is live at sysbio.bio; full launch is planned for June 2027, and CFDE groups are invited to beta-test and join its working groups.' },
          { label: 'COMPLEMENT-ARIE NAM Hub — Gustavo Stolovitzky (NYU, remote)', body: 'The data hub for human-based New Approach Methodologies — organoids, organs-on-chips and in-silico models — across eight technology development centers and an FNIH validation network, aimed at reducing animal testing. DREAM Challenges offer a ready way to collaborate.' },
        ],
        note: 'A partnership funding opportunity is expected in early 2027 to build bridges within and beyond CFDE.',
      },
      {
        id: 's3',
        time: '1:00 PM',
        tag: 'Session 3',
        name: 'Tech Showcase',
        title: 'Tech Showcase — 13 live demos',
        where: 'Four parallel rooms · 1:00 – 2:00 PM',
        cards: [
          {
            label: 'Track A — Knowledge Graphs & Semantic Integration (Moderator: Jake Chen)',
            body: (
              <ul>
                <li><strong>CFDE Talent Knowledge Graph</strong> — Jake Chen &amp; Zhandos Sembay (UAB): connects people, papers, datasets and tools; for this meeting it mapped all 87 attendees from 32 institutions and can suggest collaborators.</li>
                <li><strong>Data Distillery</strong> — Deanne Taylor (CHOP, remote): CFDE's first cross-program knowledge graph, a new natural-language query skill, and “portable assertion records” to attach evidence to every link.</li>
                <li><strong>UniProt partnership / ProKN</strong> — Chuming Chen (University of Delaware, remote): a protein knowledge network of ~4 million nodes, now reachable by AI agents through an MCP server.</li>
              </ul>
            ),
          },
          {
            label: 'Track B — Data Portals & Knowledgebases',
            body: <ul><li>Liver Portal — Shankar Subramaniam</li><li>BiomarkerKB — Jeet Vora</li><li>KG2ML-RAG — Praveen Kumar &amp; Jeremy Yang</li></ul>,
          },
          {
            label: 'Track C — Visualization & User Interfaces',
            body: <ul><li>Community Visualization Hub — Morgan Turner, Nils Gehlenborg &amp; Nezar Abdennur</li><li>Antibody Panel Designer — Daniel Bolin &amp; Andreas Bueckle</li><li>CFDE Workbench Explorer &amp; Perturb-Seqr — John Erol Evangelista &amp; John Gardner</li></ul>,
          },
          {
            label: 'Track D — Compute Platforms & Cross-DCC Analysis',
            body: <ul><li>CFDE Cloud Workspace — James Carson &amp; Shava Smallen</li><li>Bio.Autoxiv — Daniel Clarke</li><li>Metabotyping Humans — Hardik Dodia</li></ul>,
          },
        ],
        note: 'Track A ran in the recorded main room and is summarized; Tracks B–D are listed from the agenda.',
      },
      {
        id: 's4',
        time: '2:00 PM',
        tag: 'Session 4',
        name: 'Pan-NIH Incubator',
        where: 'Atkinson Pavilion · 2:00 – 3:00 PM',
        who: 'Moderator: Noël Burtt (Broad Institute)',
        cards: [
          {
            label: 'The premise',
            body: <p><em>Data interoperability does not imply scientific interoperability.</em> The July Scientific Interoperability Incubator brought about 80 people from NIH resources and AI companies together; their top priority was a shared, NIH-endorsed gateway that lets AI agents reach NIH resources while crediting the people who built them.</p>,
          },
          { label: 'The scientific claim', body: 'The proposed foundation: a statement tied to its data, code, context and evidence so anyone — human or agent — can reproduce it. A draft standard (DAPR) and a shared claim repository were proposed.' },
          { label: 'Live demo — Claim the Gap', body: 'Turned curated disease-mechanism knowledge gaps into structured, traceable claims from CFDE data — and showed how much provenance work remains. A follow-up event is planned for January 2027, modelled on how GA4GH builds standards.' },
        ],
      },
      {
        id: 's5',
        time: '3:30 PM',
        tag: 'Session 5',
        name: 'Council of Councils Planning',
        where: 'Atkinson Pavilion · 3:30 – 5:00 PM',
        who: 'Moderator: Christy Kano (NIH)',
        cards: [
          { label: 'The timeline', body: "As the Common Fund's infrastructure investment, CFDE isn't capped at ten years but renews its concept every five. A working group of NIH leaders and outside experts will meet in December; the concept for the next phase (2029–2034) goes to the Council of Councils in spring 2027." },
          { label: 'Stories to tell', body: "Cross-resource use cases such as the Liver Resource, bridging animal and human research, CFDE's unusually deep collaboration across programs, experimental validation of CFDE-derived hypotheses, and what CFDE offers that general AI “co-scientists” cannot." },
          { label: 'Machine users count', body: 'The Evaluation Core noted that human use of CFDE resources grew under 2× over recent years, while automated bot traffic grew 4–10× a year — a sign that machine users, AI agents included, are worth measuring in their own right.' },
        ],
      },
    ],
  },
  {
    id: 'day2',
    label: 'Day 2',
    date: 'Wednesday, October 14',
    sessions: [
      {
        id: 's6',
        time: '9:00 AM',
        tag: 'Session 6',
        name: 'Working Group Breakouts',
        where: 'Four parallel rooms · 9:00 – 10:30 AM',
        intro: 'Five working groups met in parallel: Knowledge Graph (Deanne Taylor), Training (Laurel Brown & LaFrancis Gibson), Communication & Outreach (Noël Burtt & MacKenzie Brandes), Ontology (Mano Maurya, Srinivasan Ramachandran & Daniel Clarke) and Evaluation (Casey Greene).',
        cards: [
          { label: 'Knowledge Graph WG', body: "Bernard de Bono presented SPARC's ApiNATOMY — a single model that maps structures from membrane channels to organs. The group agreed to link it to the Human Reference Atlas and the Data Distillery, discussed a JSON exchange format so CFDE knowledge graphs can share data, and how licensing currently limits a public MCP server for the Data Distillery." },
        ],
        note: "Only the Knowledge Graph room was recorded. Every group's outcomes were reported back in Session 7.",
      },
      {
        id: 's7',
        time: '10:45 AM',
        tag: 'Session 7',
        name: 'Emerging Opportunities',
        where: 'Atkinson Pavilion · 10:45 AM – 12:00 PM',
        who: 'Moderator: Peipei Ping (University of Arizona)',
        intro: 'Working-group readouts, then a hands-on session on agentic AI.',
        cards: [
          { label: 'Evaluation', body: "One shared CFDE rule for telling human from bot traffic, and an OpenTelemetry service so AI-agent use of CFDE's MCP servers becomes a tracked metric." },
          { label: 'Training + Communication & Outreach', body: "A shared #CFDE hashtag and LinkedIn group, invited CFDE talks at member institutions, one place for all CFDE events, and telling CFDE's story through its users." },
          { label: 'Ontology', body: 'CC0 for metadata, with clearer licensing guidance needed for primary data; the XMT specification finalized with provenance; and an alpha natural-language search for finding datasets.' },
          { label: 'Knowledge Graph', body: 'Connecting ApiNATOMY, the Human Reference Atlas and the Data Distillery, and building shared evidence levels for knowledge-graph assertions.' },
          { label: "Agentic AI Skills — Avi Ma'ayan & Daniel Clarke (Mount Sinai)", body: 'Attendees pointed their own AI agents at CFDE use-case templates and published the resulting articles to Bio.Autoxiv in real time. It sparked a frank debate on error propagation and labelling, and a call for CFDE to publish guidance on responsible AI use.' },
        ],
      },
      {
        id: 's8',
        time: '1:30 PM',
        tag: 'Session 8',
        name: 'Future Directions for CFDE',
        where: 'Atkinson Pavilion · 1:30 – 2:30 PM',
        who: 'Moderator: Shankar Subramaniam (UC San Diego)',
        cards: [
          { label: 'The challenge', body: <p>Move from evaluating CFDE to <em>validating</em> it — as a consortium, as a set of products, and as a source of hypotheses that hold up in the lab.</p> },
          { label: 'Evaluation (Casey Greene)', body: "Measure CFDE's impact on AI agents as well as people, and capture events and communities of practice — not just citations and GitHub stars." },
          {
            label: 'Sustainability (Peipei Ping & Wei Wang)',
            body: <p>An interactive MATCH Sankey that pairs programs with long-term repositories; <strong>VITAL</strong>, a framework of procedures to make datasets AI-ready and measurably trustworthy; and a second Sustainability Core survey that scores each dataset's sustainability.</p>,
          },
          { label: 'Growing the user base', body: "Reach early-career researchers and students, cross-promote CFDE on every program's site, and present CFDE to each program's own consortium." },
        ],
      },
      {
        id: 'wrap',
        time: '2:30 PM',
        tag: 'Closing',
        name: 'Wrap-Up',
        where: 'Atkinson Pavilion · 2:30 PM',
        who: 'Christy Kano (NIH) & Jake Chen (UAB)',
        points: [
          'Thanks to the host team and AV crew, and congratulations to the meeting-portal leaderboard winners — Jeremy Yang, James Carson and Shava Smallen.',
        ],
      },
    ],
  },
];

const PHOTOS = '/images/meetings/fall2026';

export default function Fall2026Recap() {
  return (
    <>
      {/* ══════ Hero ══════ */}
      <section className="hero pagehero hero--photo">
        <img className="hero__photo" src={`${PHOTOS}/scripps-pier.jpg`} alt="" />
        <Mesh />
        <div className="wrap hero__inner">
          <p className="hero__eyebrow">CFDE Meetings</p>
          <h1 className="hero__title">CFDE Fall 2026 Meeting Recap</h1>
          <p className="hero__sub">
            Two days at UC San Diego on agent-ready data, trustworthy AI, knowledge graphs that work
            together, and the next phase of the Common Fund Data Ecosystem.
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
              <dd>In person &amp; on Zoom<span>Hosted by Shankar Subramaniam, UC San Diego</span></dd>
            </div>
          </dl>
        </div>
        <p className="hero__credit">Photo: James Carson, TACC</p>
      </section>

      {/* ══════ Overview ══════ */}
      <Section kicker="Overview" title="The meeting in brief">
        <div className="grid-2" style={{ gap: 'clamp(28px,5vw,56px)', alignItems: 'center' }}>
          <div className="prose">
            <p>
              Principal investigators, technical leads, program managers and trainees from across the
              CFDE met on the UC San Diego campus in La Jolla, a West Coast change from the usual Bethesda-area
              venues. The agenda moved from center and partnership updates, a tech showcase with 13 live demos and
              five working groups, to two planning sessions on how CFDE renews and grows.
            </p>
            <p>
              One theme ran through almost every session: AI agents are now real users of CFDE
              resources, and the next challenge is making what they produce <strong>verifiable</strong> —
              traceable back to the data, the code and the people behind it.
            </p>
          </div>
          <figure className="figure">
            <img src={`${PHOTOS}/group-photo.jpg`} alt="Meeting attendees gathered for a group photo in front of the Sun God statue at UC San Diego" />
            <figcaption>The traditional group photo, taken at the Sun God statue after the Day 1 center highlights.</figcaption>
          </figure>
        </div>
      </Section>

      {/* ══════ Dashboard ══════ */}
      <Section tint kicker="By the numbers" title="Meeting dashboard">
        <div className="dash">
          <div className="dash__hero">
            <span className="dash__heroval">{REGISTERED}</span>
            <span className="dash__herolabel">people registered</span>
            <span className="dash__herosub">from 32 organizations — each person counted once</span>
          </div>
          <Stats items={[
            { value: '68', label: 'Joined in person' },
            { value: '19', label: 'Joined on Zoom' },
            { value: 'All 5', label: 'CFDE centers represented' },
            { value: '11', label: 'Common Fund programs represented' },
            { value: '13', label: 'Live demos across 4 tracks' },
            { value: '4.9/5', label: 'Overall satisfaction (survey)' },
          ]} />
        </div>
        <p className="dash__note">
          84 of the 87 registrants signed up for both days. Survey scores come from 10 post-meeting responses.
        </p>

        <div className="chart-grid">
          <BarChart
            title="CFDE centers in the room"
            subtitle="Registrants affiliated with each center (people could name more than one)"
            rows={CENTERS}
            unit="people"
            total={REGISTERED}
          />
          <BarChart
            title="Common Fund programs in the room"
            subtitle="Registrants affiliated with each program (people could name more than one)"
            rows={PROGRAMS}
            unit="people"
            total={REGISTERED}
          />
        </div>

        <h3 className="h3" style={{ marginTop: 36 }}>Partnerships &amp; other programs represented</h3>
        <ul className="orgs">{PARTNERS.map((p) => <li key={p}>{p}</li>)}</ul>

        <h3 className="h3" style={{ marginTop: 30 }}>Participating organizations</h3>
        <ul className="orgs">{ORGS.map((o) => <li key={o}>{o}</li>)}</ul>

        <h3 className="h3" style={{ marginTop: 36 }}>CFDE by the numbers</h3>
        <Stats items={[
          { value: '18', label: 'Common Fund programs engaged with CFDE' },
          { value: '10M+', label: 'Data files' },
          { value: '2M+', label: 'Biosamples with data' },
          { value: '1.2M+', label: 'Knowledge assertions' },
        ]} />
        <p className="dash__note">As reported in the NIH opening remarks.</p>
      </Section>

      {/* ══════ Sessions ══════ */}
      <Section
        kicker="Agenda & summaries"
        title="Session by session"
        lede="Pick a day, then a session, to see who presented and what was discussed."
      >
        <Agenda days={DAYS} idPrefix="f26" />
      </Section>

      {/* ══════ Themes ══════ */}
      <Section tint kicker="Cross-cutting themes" title="What we heard across the meeting">
        <div className="grid-3">
          <div className="card">
            <h3 className="card__title"><span className="ico">🤖</span>Agents are now users</h3>
            <p>Skills, MCP servers and agent-written articles were everywhere — from Galaxy and ProKN to Bio.Autoxiv. Automated traffic to CFDE resources is growing far faster than human use.</p>
          </div>
          <div className="card">
            <h3 className="card__title"><span className="ico">🔎</span>Trust is the new bottleneck</h3>
            <p>Scientific claims, provenance graphs and evidence levels aim to make every AI-assisted result traceable to its data, code and authors.</p>
          </div>
          <div className="card">
            <h3 className="card__title"><span className="ico">🔗</span>Knowledge graphs, together</h3>
            <p>The Data Distillery, REVEAL, ProKN, the Talent Knowledge Graph, ApiNATOMY and the Human Reference Atlas are being connected through shared exchange formats, the Human Reference Atlas and NSF's Proto-OKN.</p>
          </div>
          <div className="card">
            <h3 className="card__title"><span className="ico">🤝</span>New partners</h3>
            <p>SysBio FAIRplex and the COMPLEMENT-ARIE NAM Hub introduced themselves to the CFDE, with a partnership funding opportunity expected in early 2027.</p>
          </div>
          <div className="card">
            <h3 className="card__title"><span className="ico">🎓</span>Reaching new users</h3>
            <p>Early-career researchers, curricula, hackathons and program ambassadors — because at one recent hackathon, no participant had heard of CFDE at the start.</p>
          </div>
          <div className="card">
            <h3 className="card__title"><span className="ico">🧭</span>Preparing the next phase</h3>
            <p>A Council of Councils working group meets in December ahead of CFDE's 2029–2034 concept — with validation, sustainability and partnerships at its core.</p>
          </div>
        </div>
      </Section>

      {/* ══════ Survey ══════ */}
      <Section kicker="Participant feedback" title="What attendees told us">
        <div className="chart-grid" style={{ marginTop: 0 }}>
          <DotPlot
            title="Post-meeting survey ratings"
            subtitle="Average score, 1 (low) to 5 (high) — 10 responses (9 for dates & length)"
            rows={SURVEY}
          />
          <div className="stack">
            <Stats items={[
              { value: '9 of 10', label: 'Gave overall satisfaction 5 stars' },
              { value: '4.0 → 4.6', label: 'Familiarity with CFDE, before → after' },
            ]} />
            <div className="quote">
              <p>&ldquo;Great meeting!&rdquo;</p>
            </div>
            <div className="card">
              <h3 className="card__title">Most valuable</h3>
              <p>The evaluation discussion, the center updates, C2M2 and the Council of Councils preparation.</p>
              <h3 className="card__title" style={{ marginTop: 16 }}>Wished for in Spring 2027</h3>
              <p>More small-group and workshop time with less passive lecture, proteomics content, and a meeting in Bethesda.</p>
            </div>
          </div>
        </div>
        <p className="finenote">No respondent's familiarity with CFDE went down; four of ten rose by at least one star.</p>
      </Section>

      {/* ══════ What's next ══════ */}
      <Section tint kicker="What's next" title="Action items & upcoming dates">
        <div className="grid-cards">
          <div className="card"><h3 className="card__title"><span className="ico">📅</span>November 2026</h3><p>Council of Councils working-group orientation; BioData code-a-thon with the Training Center and Cloud Workspace at Cold Spring Harbor Laboratory.</p></div>
          <div className="card"><h3 className="card__title"><span className="ico">🧭</span>December 2026</h3><p>Two-day Council of Councils working-group workshop on CFDE's progress and next phase.</p></div>
          <div className="card"><h3 className="card__title"><span className="ico">🔬</span>January 2027</h3><p>Follow-up to the Scientific Interoperability Incubator on scientific claims and a shared AI gateway.</p></div>
          <div className="card"><h3 className="card__title"><span className="ico">🤝</span>Early 2027</h3><p>Partnership funding opportunity expected; next full Data Distillery release in the new JSON format.</p></div>
          <div className="card"><h3 className="card__title"><span className="ico">🌸</span>Spring 2027</h3><p>CFDE's next-phase concept goes to the Council of Councils; CFDE Spring 2027 Meeting.</p></div>
          <div className="card"><h3 className="card__title"><span className="ico">🚀</span>May – June 2027</h3><p>Bio-IT World hackathon (project pitches and team leads wanted); SysBio FAIRplex full launch.</p></div>
        </div>
        <h3 className="h3" style={{ marginTop: 34 }}>Asks for the community</h3>
        <ul className="ticks" style={{ maxWidth: '76ch', gap: 12 }}>
          <li>Run an MCP server? Expect a request to enable OpenTelemetry so agent use can be counted.</li>
          <li>Connect your web properties to the CFDE evaluation dashboard, and log your events on the CFDE calendar.</li>
          <li>Join the CFDE LinkedIn group and tag posts with #CFDE.</li>
          <li>Contribute agent skills to a shared CFDE skills library, and help draft CFDE guidance on responsible AI use.</li>
          <li>Watch for the second Sustainability Core survey; volunteer as a judge or mentor for DECODE and the DataViz Competition.</li>
        </ul>
      </Section>

      {/* ══════ Gallery ══════ */}
      <Section kicker="Photos" title="Scenes from La Jolla">
        <div className="gallery">
          <figure className="gallery__wide">
            <img src={`${PHOTOS}/scripps-pier.jpg`} alt="Early-morning view from the UC San Diego bluffs over Scripps Pier and La Jolla Shores, framed by a tree branch" loading="lazy" />
            <figcaption>Morning over Scripps Pier and La Jolla Shores on Day 1. Photo: James Carson, TACC.</figcaption>
          </figure>
          <figure>
            <img src={`${PHOTOS}/welcome-campus-walk.jpg`} alt="Speaker at the podium beside a slide inviting attendees on a campus walk" loading="lazy" />
            <figcaption>Host Shankar Subramaniam welcomes the CFDE to UC San Diego — and invites everyone on a campus walk.</figcaption>
          </figure>
          <figure>
            <img src={`${PHOTOS}/nih-opening.jpg`} alt="Chris Kinsinger speaking at the podium" loading="lazy" />
            <figcaption>Chris Kinsinger (NIH) delivers the NIH opening remarks.</figcaption>
          </figure>
          <figure>
            <img src={`${PHOTOS}/drc-update.jpg`} alt="Presentation slide titled The DRC in the Age of AGI" loading="lazy" />
            <figcaption>“The DRC in the Age of AGI” — the Data Resource Center update.</figcaption>
          </figure>
          <figure>
            <img src={`${PHOTOS}/kc-ga4gh.jpg`} alt="Speaker at the podium beside a slide titled GA4GH to support our coalition, welcome us as a Strategic Partner" loading="lazy" />
            <figcaption>The Knowledge Center update: GA4GH welcomes the Scientific Interoperability Incubator as a strategic partner.</figcaption>
          </figure>
          <figure>
            <img src={`${PHOTOS}/atkinson-pavilion.jpg`} alt="Speaker at the podium with the Fall 2026 Meeting title slide, attendees seated at round tables" loading="lazy" />
            <figcaption>The Atkinson Pavilion, home to the main sessions on both days.</figcaption>
          </figure>
          <figure>
            {/* Portrait shot: anchor the crop near the top so the standing speaker's head stays in frame. */}
            <img src={`${PHOTOS}/discussion.jpg`} alt="Attendee asking a question with a handheld microphone" loading="lazy" style={{ objectPosition: '50% 18%' }} />
            <figcaption>Discussion from the floor.</figcaption>
          </figure>
        </div>
      </Section>

      {/* ══════ Closing ══════ */}
      <section className="closing">
        <div className="wrap closing__inner">
          <h2>Moving forward together</h2>
          <p style={{ maxWidth: '72ch', marginInline: 'auto' }}>
            The Fall 2026 meeting showed a community building the foundation for AI-driven discovery — and
            insisting it be trustworthy. Thank you to our hosts at UC San Diego, to every presenter, and to everyone
            who joined in La Jolla and online.
          </p>
          <p className="closing__contact">
            Questions? Contact <a href="mailto:cfde.icc@gmail.com">cfde.icc@gmail.com</a>
          </p>
        </div>
      </section>
    </>
  );
}
