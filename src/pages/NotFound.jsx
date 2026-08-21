import { Link } from 'react-router-dom';
import { PageHero } from '@/components/shared';

export default function NotFound() {
  return (
    <PageHero eyebrow="404" title="Page not found" sub="The page you are looking for doesn't exist or has moved.">
      <div className="hero__actions">
        <Link className="btn btn--invert" to="/">Back to home</Link>
      </div>
    </PageHero>
  );
}
