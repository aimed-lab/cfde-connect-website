export default function Terms() {
  return (
    <div className="py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Terms of Use</h1>
        <p className="text-muted-foreground text-sm mb-10">Last updated: April 2025</p>

        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Acceptance of Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            By accessing or using CFDE Connect (cfdeconnect.org) and the CFDE Connect member portal,
            you agree to be bound by these Terms of Use. If you do not agree, please do not use
            this platform.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Intended Use</h2>
          <p className="text-muted-foreground leading-relaxed">
            CFDE Connect is intended for use by members of the NIH Common Fund Data Ecosystem
            community — including researchers, staff, and collaborators affiliated with CFDE
            programs and centers. Access to the member portal requires authorization.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">User Conduct</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            Users of the CFDE Connect platform agree to:
          </p>
          <ul className="space-y-2 text-muted-foreground list-disc pl-5">
            <li>Provide accurate information in their member profile</li>
            <li>Use the platform for professional and community purposes only</li>
            <li>Respect the privacy and professional boundaries of other community members</li>
            <li>Not share portal login credentials with others</li>
            <li>Not use the platform for commercial solicitation or spam</li>
            <li>Comply with NIH policies and applicable law</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Intellectual Property</h2>
          <p className="text-muted-foreground leading-relaxed">
            Content on this site produced by the CFDE ICC is generally available for reuse consistent
            with NIH open-science policies. Content contributed by community members (profiles,
            meeting notes, etc.) remains the property of the respective contributors. Do not reproduce
            or redistribute member content without permission.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Disclaimers</h2>
          <p className="text-muted-foreground leading-relaxed">
            This platform is provided "as is" without warranties of any kind. The CFDE ICC does not
            guarantee uninterrupted access or the accuracy of all content. External links are
            provided for convenience; we do not endorse external sites or their content.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Changes to Terms</h2>
          <p className="text-muted-foreground leading-relaxed">
            We may update these terms periodically. Continued use of the platform after changes
            constitutes acceptance of the revised terms. The "last updated" date at the top of this
            page reflects the most recent revision.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            Questions about these terms? Please use the{' '}
            <a href="/contact" className="text-primary hover:underline">contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
