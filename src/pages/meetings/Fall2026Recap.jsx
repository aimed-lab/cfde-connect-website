import { Mesh, Section, Stats, Session, DayHead } from '@/components/shared';
import { BarChart, DotPlot } from '@/components/charts';

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

const PHOTOS = '/images/meetings/fall2026';

export default function Fall2026Recap() {
  return (
    <>
      {/* ══════ Hero ══════ */}
      <section className="hero pagehero">
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
      <Section kicker="Agenda & summaries" title="Session summaries">
        <DayHead title="Day 1" date="Tuesday, October 13, 2026" />

        <Session time="8:45 – 9:00 AM" where="Atkinson Pavilion" title="Welcome — Jake Chen (UAB) and Shankar Subramaniam (UC San Diego)">
          <ul>
            <li>Introduced the new CFDE meeting portal — agenda, attendees, photo sharing and an activity leaderboard — built by the ICC and open to the whole consortium.</li>
            <li>Host Shankar Subramaniam welcomed attendees to UC San Diego and offered a post-meeting campus walk.</li>
          </ul>
        </Session>

        <Session time="9:00 – 9:20 AM" where="Atkinson Pavilion" title="NIH Opening Remarks — Chris Kinsinger (NIH)">
          <ul>
            <li><strong>Leadership:</strong> Vivian Ota Wang is now the permanent Director of the Common Fund.</li>
            <li><strong>Scale:</strong> 18 Common Fund programs now engage with CFDE, with over 10 million data files, data from over 2 million biosamples and over 1.2 million knowledge assertions. The CFDE flagship paper has been accepted in <em>Patterns</em>.</li>
            <li><strong>Why it matters now:</strong> NIH's BioGenesis initiative (part of the federal Genesis Mission for AI in science) and the Virtual Biology Initiative with DOE and the Chan Zuckerberg Initiative both depend on coordinated, harmonized data — the work CFDE has done since 2020. Other NIH efforts are now borrowing the CFDE model.</li>
            <li>Welcomed two new programs — SysBio FAIRplex and the COMPLEMENT-ARIE NAM Hub — and asked for impact stories ahead of CFDE's renewal.</li>
          </ul>
        </Session>

        <Session time="9:20 – 10:30 AM" where="Atkinson Pavilion" title="Session 1 — Center Highlights (Moderator: Christy Kano, NIH)">
          <ul>
            <li>
              <strong>Data Resource Center — “The DRC in the Age of AGI” (Avi Ma'ayan):</strong> a redesigned CFDE
              Workbench and metadata Explorer; datasets now flow from the Workbench into Galaxy in the Cloud
              Workspace; a Liver Resource built with the Knowledge Center; natural-language cohort building; and
              Perturb-Seqr, which integrates 16 connectivity maps. The DRC also showed a skills-based research agent
              and <strong>Bio.Autoxiv</strong>, a preprint server for AI-generated articles that already holds 85
              articles from six agents. Verifying AI output was the open question from the floor.
            </li>
            <li>
              <strong>Knowledge Center:</strong> REVEAL links CFDE gene sets to human genetics; every gene set now
              carries a provenance graph, a persistent identifier and a landing page. An early benchmark against 10
              published papers was encouraging — in a kidney-disease study, REVEAL both supported the findings and
              extended them to two more genes — and a wet-lab collaboration is now testing its hypotheses. REVEAL also joined NSF's Proto-OKN, and a new
              Biomarker Connector traces disease mechanisms to biomarkers.
            </li>
            <li>
              <strong>Integration &amp; Coordination Center (Jake Chen):</strong> a revamped cfdeconnect.org with
              ORCID-linked profiles, “round-trip” event promotion, a metrics dashboard from the Evaluation Core, and
              the Sustainability Core's work making digital assets AI-ready and FAIR.
            </li>
            <li>
              <strong>Training Center (LaFrancis Gibson, ORAU):</strong> in FY26 — 17 events, 11 podcast episodes,
              17 hands-on trainings, 314 participants, 19 collaborations and partnerships and the first DECODE Summer Training
              Institute. Coming next: CFDE 102, an Early Career Research Associates program, EduHacks for educators
              and a data-science training unconference.
            </li>
            <li>
              <strong>Cloud Workspace (James Carson, TACC):</strong> its first production year — free for Common Fund
              data, now on Galaxy 26.1 with an AI assistant and an MCP server, GA4GH DRS support, and an exascale
              system with thousands of new GPUs. A Research Authorization Service for protected data is in testing.
            </li>
          </ul>
        </Session>

        <Session time="11:00 AM – 12:00 PM" where="Atkinson Pavilion" title="Session 2 — Emerging Partnership Opportunities (Moderator: Christy Kano, NIH)">
          <ul>
            <li>
              <strong>SysBio FAIRplex — Hal Skinner (Verily):</strong> one federated search across the FNIH
              Accelerating Medicines Partnerships, over data harmonized to an OMOP-based common data model, working
              toward a single access request across programs. The beta portal is live at sysbio.bio; full launch is planned
              for June 2027, and CFDE groups are invited to beta-test and join its working groups.
            </li>
            <li>
              <strong>COMPLEMENT-ARIE NAM Hub — Gustavo Stolovitzky (NYU, remote):</strong> the data hub for human-based
              New Approach Methodologies — organoids, organs-on-chips and in-silico models — across eight technology
              development centers and an FNIH validation network, aimed at reducing animal testing. DREAM Challenges
              offer a ready way to collaborate.
            </li>
            <li>A partnership funding opportunity is expected in early 2027 to build bridges within and beyond CFDE.</li>
          </ul>
        </Session>

        <Session time="1:00 – 2:00 PM" where="Four parallel rooms" title="Session 3 — Tech Showcase (13 demos)">
          <p><strong>Track A — Knowledge Graphs &amp; Semantic Integration</strong> (Moderator: Jake Chen)</p>
          <ul>
            <li><strong>CFDE Talent Knowledge Graph</strong> — Jake Chen &amp; Zhandos Sembay (UAB): connects people, papers, datasets and tools; for this meeting it mapped all 87 attendees from 32 institutions and can suggest collaborators.</li>
            <li><strong>Data Distillery</strong> — Deanne Taylor (CHOP, remote): CFDE's first cross-program knowledge graph, a new natural-language query skill, and “portable assertion records” to attach evidence to every link.</li>
            <li><strong>UniProt partnership / ProKN</strong> — Chuming Chen (University of Delaware, remote): a protein knowledge network of ~4 million nodes, now reachable by AI agents through an MCP server.</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            <strong>Track B — Data Portals &amp; Knowledgebases:</strong> Liver Portal (Shankar Subramaniam), BiomarkerKB (Jeet Vora), KG2ML-RAG (Praveen Kumar &amp; Jeremy Yang).
            {' '}<strong>Track C — Visualization &amp; User Interfaces:</strong> Community Visualization Hub (Morgan Turner, Nils Gehlenborg &amp; Nezar Abdennur), Antibody Panel Designer (Daniel Bolin &amp; Andreas Bueckle), CFDE Workbench Explorer &amp; Perturb-Seqr (John Erol Evangelista &amp; John Gardner).
            {' '}<strong>Track D — Compute Platforms &amp; Cross-DCC Analysis:</strong> CFDE Cloud Workspace (James Carson &amp; Shava Smallen), Bio.Autoxiv (Daniel Clarke), Metabotyping Humans (Hardik Dodia).
          </p>
        </Session>

        <Session time="2:00 – 3:00 PM" where="Atkinson Pavilion" title="Session 4 — Pan-NIH Incubator (Moderator: Noël Burtt, Broad)">
          <ul>
            <li>
              Opened on one premise: <em>data interoperability does not imply scientific interoperability</em>. The
              July Scientific Interoperability Incubator brought about 80 people from NIH resources and AI companies
              together; their top priority was a shared, NIH-endorsed gateway that lets AI agents reach NIH resources
              while crediting the people who built them.
            </li>
            <li>
              The proposed foundation is the <strong>scientific claim</strong>: a statement tied to its data, code,
              context and evidence so anyone — human or agent — can reproduce it. A draft standard (DAPR) and a
              shared claim repository were proposed.
            </li>
            <li>
              A live demo, <strong>Claim the Gap</strong>, turned curated disease-mechanism knowledge gaps into
              structured, traceable claims from CFDE data — and showed how much provenance work remains. A follow-up
              event is planned for January 2027, modelled on how GA4GH builds standards.
            </li>
          </ul>
        </Session>

        <Session time="3:30 – 5:00 PM" where="Atkinson Pavilion" title="Session 5 — Council of Councils Planning (Moderator: Christy Kano, NIH)">
          <ul>
            <li>
              As the Common Fund's infrastructure investment, CFDE isn't capped at ten years but renews its concept
              every five. A working group of NIH leaders and outside experts will meet in December; the concept
              for the next phase (2029–2034) goes to the Council of Councils in spring 2027.
            </li>
            <li>
              The room brainstormed the stories to tell: cross-resource use cases such as the Liver Resource,
              bridging animal and human research, CFDE's unusually deep collaboration across programs, experimental
              validation of CFDE-derived hypotheses, and what CFDE offers that general AI “co-scientists” cannot.
            </li>
            <li>
              The Evaluation Core noted that human use of CFDE resources grew under 2× over recent years, while
              automated bot traffic grew 4–10× a year — a sign that machine users, AI agents included, are worth
              measuring in their own right.
            </li>
          </ul>
        </Session>

        <DayHead title="Day 2" date="Wednesday, October 14, 2026" />

        <Session time="9:00 – 10:30 AM" where="Four parallel rooms" title="Session 6 — Working Group Breakouts">
          <p>
            Five working groups met in parallel: Knowledge Graph (Deanne Taylor), Training (Laurel Brown &amp;
            LaFrancis Gibson), Communication &amp; Outreach (Noël Burtt &amp; MacKenzie Brandes), Ontology (Mano
            Maurya, Srinivasan Ramachandran &amp; Daniel Clarke) and Evaluation (Casey Greene).
          </p>
          <ul>
            <li>
              <strong>Knowledge Graph WG:</strong> Bernard de Bono presented SPARC's ApiNATOMY — a single model that
              maps structures from membrane channels to organs. The group agreed to link it to the Human Reference
              Atlas and the Data Distillery, discussed a JSON exchange format so CFDE knowledge graphs can share
              data, and how licensing currently limits a public MCP server for the Data Distillery.
            </li>
          </ul>
        </Session>

        <Session time="10:45 AM – 12:00 PM" where="Atkinson Pavilion" title="Session 7 — Emerging Opportunities (Moderator: Peipei Ping, University of Arizona)">
          <ul>
            <li><strong>Evaluation:</strong> one shared CFDE rule for telling human from bot traffic, and an OpenTelemetry service so AI-agent use of CFDE's MCP servers becomes a tracked metric.</li>
            <li><strong>Training + Communication &amp; Outreach:</strong> a shared #CFDE hashtag and LinkedIn group, invited CFDE talks at member institutions, one place for all CFDE events, and telling CFDE's story through its users.</li>
            <li><strong>Ontology:</strong> CC0 for metadata, with clearer licensing guidance needed for primary data; the XMT specification finalized with provenance; and an alpha natural-language search for finding datasets.</li>
            <li><strong>Knowledge Graph:</strong> connecting ApiNATOMY, the Human Reference Atlas and the Data Distillery, and building shared evidence levels for knowledge-graph assertions.</li>
            <li>
              <strong>Agentic AI Skills — Avi Ma'ayan &amp; Daniel Clarke (Mount Sinai):</strong> a hands-on session in
              which attendees pointed their own AI agents at CFDE use-case templates and published the resulting
              articles to Bio.Autoxiv in real time. It sparked a frank debate on error propagation and labelling, and
              a call for CFDE to publish guidance on responsible AI use.
            </li>
          </ul>
        </Session>

        <Session time="1:30 – 2:30 PM" where="Atkinson Pavilion" title="Session 8 — Future Directions for CFDE (Moderator: Shankar Subramaniam, UC San Diego)">
          <ul>
            <li><strong>The challenge:</strong> move from evaluating CFDE to <em>validating</em> it — as a consortium, as a set of products, and as a source of hypotheses that hold up in the lab.</li>
            <li><strong>Evaluation (Casey Greene):</strong> measure CFDE's impact on AI agents as well as people, and capture events and communities of practice — not just citations and GitHub stars.</li>
            <li>
              <strong>Sustainability (Peipei Ping &amp; Wei Wang):</strong> an interactive MATCH Sankey that pairs
              programs with long-term repositories; <strong>VITAL</strong>, a framework of procedures to make datasets
              AI-ready and measurably trustworthy; and a second Sustainability Core survey that scores each dataset's
              sustainability.
            </li>
            <li><strong>Growing the user base:</strong> reach early-career researchers and students, cross-promote CFDE on every program's site, and present CFDE to each program's own consortium.</li>
          </ul>
        </Session>

        <Session time="2:30 PM" where="Atkinson Pavilion" title="Wrap-Up — Christy Kano (NIH) & Jake Chen (UAB)">
          <p>
            Thanks to the host team and AV crew, and congratulations to the meeting-portal leaderboard winners —
            Jeremy Yang, James Carson and Shava Smallen.
          </p>
        </Session>
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
            <img src={`${PHOTOS}/banner.jpg`} alt="CFDE Fall 2026 Meeting banner over a view of the La Jolla coastline" loading="lazy" />
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
            <img src={`${PHOTOS}/atkinson-pavilion.jpg`} alt="Speaker at the podium with the Fall 2026 Meeting title slide, attendees seated at round tables" loading="lazy" />
            <figcaption>The Atkinson Pavilion, home to the main sessions on both days.</figcaption>
          </figure>
          <figure>
            <img src={`${PHOTOS}/discussion.jpg`} alt="Attendee asking a question with a handheld microphone" loading="lazy" />
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
