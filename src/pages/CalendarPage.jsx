import { PageHero, Section, ArrowIcon } from '@/components/shared';

const CALENDAR_EMBED =
  'https://calendar.google.com/calendar/embed?height=600&wkst=1&ctz=America%2FChicago&showPrint=0&src=M2U4MWIwZjgwMzViNGU4M2I5Mzk0MzAwMTQ0ZmNkMjkwYzAzNGY5YTVjOWQxZDAwYTNiYjJhNzFkMTQzNzg1ZEBncm91cC5jYWxlbmRhci5nb29nbGUuY29t&color=%237986cb';

export default function CalendarPage() {
  return (
    <>
      <PageHero
        eyebrow="CFDE CONNECT"
        title="Calendar"
        sub="Meetings, working groups, and events from across the CFDE community."
      >
        <div className="hero__actions">
          <a className="btn btn--primary" href="https://forms.gle/U7LZBMy8dXy74ysN7" target="_blank" rel="noopener noreferrer">
            Send Event to Calendar
            <ArrowIcon />
          </a>
        </div>
      </PageHero>

      <Section tight>
        <div className="calframe">
          <iframe
            src={CALENDAR_EMBED}
            title="CFDE community calendar"
            loading="lazy"
          />
        </div>
        <p className="finenote">
          Our calendar is in beta and may have hiccups (loading, time-zone mismatches,
          missing/duplicate events). To report any issues, please email{' '}
          <a href="mailto:cfde.icc@gmail.com">cfde.icc@gmail.com</a> with a brief description,
          event details, and any screenshots.
        </p>
      </Section>
    </>
  );
}
