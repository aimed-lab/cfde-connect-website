import { Link } from 'react-router-dom';
import { PageHero, Section } from '@/components/shared';

export default function Ashg2025() {
  return (
    <>
      <PageHero
        eyebrow="News · October 2025"
        title="CFDE at ASHG 2025"
        sub="Fostering Collaboration and Community Connections"
      />

      <Section>
        <div className="article">
          <div className="prose">
            <p>
              The Common Fund Data Ecosystem (CFDE) made a strong impact at the American Society of
              Human Genetics (ASHG) 2025 Annual Meeting in Boston, MA, bringing researchers, data
              scientists, and community members together through networking, learning, and
              collaboration.
            </p>
          </div>

          <div>
            <h2 className="h3">A vibrant kickoff</h2>
            <div className="prose">
              <p>
                The CFDE kicked off ASHG 2025 with a networking session on October 14, drawing an
                impressive crowd of nearly 200 participants. Attendees mingled, exchanged ideas, and
                explored scientific posters from across the CFDE community, setting an energetic
                tone for the week. The event provided an invaluable opportunity for members to
                connect and discuss ongoing research and data-sharing efforts across multiple Common
                Fund programs.
              </p>
            </div>
          </div>

          <div className="photogrid">
            <img src="/images/news/ashg-1.jpg" alt="Attendees networking at the CFDE ASHG 2025 kickoff session" />
            <img src="/images/news/ashg-2.jpg" alt="Poster discussions at the CFDE networking session" />
            <img src="/images/news/ashg-3.jpg" alt="CFDE community members exchanging ideas at ASHG 2025" />
            <img src="/images/news/ashg-4.jpg" alt="Crowd at the CFDE ASHG 2025 networking event" />
          </div>

          <div>
            <h2 className="h3">Engaging booth presence</h2>
            <div className="prose">
              <p>
                Throughout the conference, the CFDE booth saw exceptional engagement during the
                three exhibit days (October 16–18). Representatives from the Knowledge Center,
                Training Center, ICC, GTEx, SPARC, and exRNA programs were on hand to share
                insights, answer questions, and showcase the expanding CFDE ecosystem. Many
                attendees stopped by to inquire about specific datasets and resources, which
                organically led to broader discussions about cross-program collaboration and data
                integration.
              </p>
            </div>
          </div>

          <div className="photogrid">
            <img src="/images/news/ashg-booth.jpeg" alt="The CFDE booth at ASHG 2025" />
            <img src="/images/news/ashg-5.jpeg" alt="CFDE representatives engaging with attendees at the booth" />
          </div>

          <div>
            <h2 className="h3">Ancillary session highlights</h2>
            <div className="prose">
              <p>
                On October 16, CFDE hosted an ancillary session that provided a deeper look into the
                ecosystem&rsquo;s current initiatives. The session featured presentations from the
                CFDE Overview Team, Knowledge Center, SMaHT, and the Training Center. Participants
                engaged in lively discussions, and many later visited the booth to continue
                conversations and explore collaboration opportunities.
              </p>
            </div>
          </div>

          <div className="photogrid">
            <img src="/images/news/ashg-ancillary-1.jpeg" alt="Presentations at the CFDE ancillary session" />
            <img src="/images/news/ashg-ancillary-2.jpeg" alt="Audience at the CFDE ancillary session at ASHG 2025" />
          </div>

          <div>
            <h2 className="h3">Strengthening the CFDE community</h2>
            <div className="prose">
              <p>
                The opportunity to gather in person was invaluable. Being able to connect directly
                with both familiar faces and new collaborators reinforced the importance of
                community engagement within the CFDE and beyond. The enthusiasm and energy
                throughout the conference underscored a shared commitment to advancing open science,
                data sharing, and integrative biomedical research.
              </p>
            </div>
          </div>

          <p>
            <Link to="/news">← Back to News</Link>
          </p>
        </div>
      </Section>
    </>
  );
}
