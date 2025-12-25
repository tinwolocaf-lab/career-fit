import { Header } from '@/components/layout/header';

export const metadata = {
  title: 'Privacy Policy - CareerFit Quiz',
  description: 'Privacy policy for CareerFit Quiz',
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <div className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-slate-900">Privacy Policy</h1>
        <p className="mt-4 text-sm text-slate-500">Last updated: December 2024</p>

        <div className="mt-8 prose prose-slate max-w-none">
          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Information We Collect
            </h2>
            <p className="text-slate-600 mb-4">
              When you use CareerFit Quiz, we collect the following information:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>
                <strong>Quiz Responses:</strong> Your answers to quiz questions,
                including multiple-choice selections and written responses.
              </li>
              <li>
                <strong>Session Data:</strong> Anonymous session identifiers to
                allow you to resume your quiz progress.
              </li>
              <li>
                <strong>AI Evaluation Results:</strong> The analysis generated
                based on your responses.
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              How We Use Your Information
            </h2>
            <p className="text-slate-600 mb-4">
              We use your information solely to:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Generate your personalized career fit assessment</li>
              <li>Allow you to resume an incomplete quiz session</li>
              <li>Improve our assessment algorithms and question quality</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Data Storage and Security
            </h2>
            <p className="text-slate-600 mb-4">
              Your quiz data is stored securely using industry-standard encryption.
              Session data is retained for 30 days to allow quiz completion, after
              which it may be anonymized for research purposes or deleted.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              AI Processing
            </h2>
            <p className="text-slate-600 mb-4">
              Your responses are processed by AI systems to generate career fit
              scores and recommendations. This processing is done securely, and
              your responses are not used to train AI models without your explicit
              consent.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Third-Party Services
            </h2>
            <p className="text-slate-600 mb-4">
              We use the following third-party services:
            </p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>
                <strong>OpenAI:</strong> For AI-powered analysis of your responses
              </li>
              <li>
                <strong>Supabase:</strong> For secure data storage
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Your Rights
            </h2>
            <p className="text-slate-600 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-slate-600 space-y-2">
              <li>Request a copy of your data</li>
              <li>Request deletion of your data</li>
              <li>Opt out of non-essential data processing</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-xl font-semibold text-slate-900 mb-4">
              Contact Us
            </h2>
            <p className="text-slate-600">
              If you have questions about this privacy policy or your data, please
              contact us through the application.
            </p>
          </section>
        </div>
      </div>
    </>
  );
}
