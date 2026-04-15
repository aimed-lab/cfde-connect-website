export default function Privacy() {
  return (
    <div className="py-20 bg-background">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 prose prose-slate max-w-none">
        <h1 className="font-serif text-4xl font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-muted-foreground text-sm mb-10">Last updated: April 2025</p>

        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Overview</h2>
          <p className="text-muted-foreground leading-relaxed">
            CFDE Connect is operated by the NIH Common Fund Data Ecosystem Integration &amp;
            Coordination Center (ICC). This policy describes how we collect, use, and protect
            information when you use this website and the CFDE Connect member portal.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Information We Collect</h2>
          <p className="text-muted-foreground leading-relaxed mb-3">
            <strong className="text-foreground">Public website:</strong> We may collect standard web
            server logs (IP addresses, browser type, pages visited) for analytics and security
            purposes. We use cookies only as necessary for site functionality.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            <strong className="text-foreground">Member portal:</strong> When you register and use the
            member portal, we collect the profile information you provide (name, institution,
            department, research interests, etc.). This information is used to facilitate community
            collaboration and is visible to other authenticated portal members.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">How We Use Your Information</h2>
          <ul className="space-y-2 text-muted-foreground">
            <li>To provide and improve the CFDE Connect platform</li>
            <li>To facilitate member-to-member collaboration within the CFDE community</li>
            <li>To send community announcements and event notifications (where you have opted in)</li>
            <li>To comply with NIH reporting requirements for Common Fund programs</li>
          </ul>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Data Sharing</h2>
          <p className="text-muted-foreground leading-relaxed">
            We do not sell your personal information. Profile data in the member portal is accessible
            to authenticated CFDE community members only. Aggregate, non-identifiable usage statistics
            may be shared in NIH reporting.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Security</h2>
          <p className="text-muted-foreground leading-relaxed">
            We implement industry-standard security measures to protect your information. Access to
            the member portal requires authentication. However, no method of transmission over the
            internet is 100% secure.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Your Rights</h2>
          <p className="text-muted-foreground leading-relaxed">
            You may update or remove your profile information at any time through the member portal.
            To request deletion of your account, please{' '}
            <a href="/contact" className="text-primary hover:underline">contact us</a>.
          </p>
        </section>

        <section className="mb-8">
          <h2 className="font-serif text-2xl font-bold text-foreground mb-3">Contact</h2>
          <p className="text-muted-foreground leading-relaxed">
            Questions about this policy? Please reach out via the{' '}
            <a href="/contact" className="text-primary hover:underline">contact page</a>.
          </p>
        </section>
      </div>
    </div>
  );
}
