import { Header } from '@/components/layout/header';

export const metadata = {
  title: 'Terms of Service - CareerFit Quiz',
  description: 'Terms of service for CareerFit Quiz',
};

export default function TermsPage() {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900">Terms of Service</h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: December 2024</p>

        <div className="mt-8 prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Acceptance of Terms
            </h2>
            <p className="text-slate-600">
              By using CareerFit Quiz, you agree to these Terms of Service. If you
              do not agree to these terms, please do not use the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Service Description
            </h2>
            <p className="text-slate-600">
              CareerFit Quiz is an educational tool that provides career guidance
              suggestions based on quiz responses. The service uses AI to analyze
              your answers and suggest potential career paths that may be a good
              fit for you.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Important Disclaimers
            </h2>
            <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-4">
              <p className="text-amber-800 font-medium">
                This service is for informational and educational purposes only.
              </p>
            </div>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>
                Results are suggestions, not definitive career decisions or
                professional advice.
              </li>
              <li>
                This tool does not make hiring recommendations or employment
                decisions.
              </li>
              <li>
                This is not a psychological, medical, or mental health assessment.
              </li>
              <li>
                Results should be used alongside advice from qualified career
                counselors.
              </li>
              <li>
                We use probabilistic language - results indicate what you
                &ldquo;may be well-suited for,&rdquo; not what you &ldquo;will&rdquo;
                or &ldquo;should&rdquo; do.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              User Responsibilities
            </h2>
            <p className="text-slate-600 mb-4">When using this service, you agree to:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Provide honest and thoughtful responses to quiz questions</li>
              <li>Use the service for personal career exploration only</li>
              <li>
                Not attempt to manipulate or reverse-engineer the assessment
                algorithms
              </li>
              <li>Not use the service for discriminatory purposes</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Intellectual Property
            </h2>
            <p className="text-slate-600 mb-4">
              Career data displayed in this application is sourced from:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>
                <strong>O*NET OnLine:</strong> O*NET&reg; is a trademark of the
                U.S. Department of Labor/Employment and Training Administration
                (USDOL/ETA). Used under the CC BY 4.0 license.
              </li>
              <li>
                <strong>Bureau of Labor Statistics:</strong> Occupational Outlook
                Handbook data is in the public domain.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Limitation of Liability
            </h2>
            <p className="text-slate-600">
              The service is provided &ldquo;as is&rdquo; without warranties of any
              kind. We are not liable for any decisions made based on quiz results,
              career outcomes, or any damages arising from use of the service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Changes to Terms
            </h2>
            <p className="text-slate-600">
              We may update these terms from time to time. Continued use of the
              service after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Contact
            </h2>
            <p className="text-slate-600">
              For questions about these terms, please contact us through the
              application.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
