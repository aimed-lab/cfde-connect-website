import { Link } from 'react-router-dom';
import { PageHero, Section } from '@/components/shared';

export default function News() {
  return (
    <>
      <PageHero
        eyebrow="CFDE CONNECT"
        title="News"
        sub="Stories and updates from across the Common Fund Data Ecosystem community."
      />

      <Section kicker="Latest" title="Recent stories">
        <div className="newsgrid">
          <Link className="newscard" to="/news/cfde-at-ashg-2025">
            <img src="/images/news/ashg-booth.jpeg" alt="The CFDE booth at ASHG 2025" />
            <div className="newscard__body">
              <time dateTime="2025-10">October 2025</time>
              <h3>CFDE at ASHG 2025: Fostering Collaboration and Community Connections</h3>
              <p>
                The CFDE made a strong impact at the American Society of Human Genetics 2025 Annual
                Meeting in Boston, MA — networking, learning, and collaboration across the community.
              </p>
              <span>Read the story →</span>
            </div>
          </Link>
        </div>
        <p className="finenote">More stories coming soon — stay tuned.</p>
      </Section>
    </>
  );
}
