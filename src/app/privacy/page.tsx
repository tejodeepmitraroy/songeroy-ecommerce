import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Notice",
  description: "How KICKZ & CO. handles and protects customer information.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="space-y-3 pb-8 border-b border-neutral-200">
        <span className="text-xs font-bold uppercase tracking-widest text-[#F95721]">
          Sample Policy
        </span>
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          Privacy Policy
        </h1>
        <p className="text-xs text-neutral-400">
          Last revised: February 2026 • Demo Store Policy
        </p>
      </div>

      <div className="prose prose-neutral max-w-none pt-8 space-y-6 text-sm text-neutral-700 leading-relaxed">
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 font-medium">
          Note: This document represents a sample demonstration privacy notice for the KICKZ store. Before production deployment, update with formal legal counsel.
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-neutral-900">1. Information We Collect</h2>
          <p>
            When you visit or place a simulated order through our website, we collect information necessary to fulfill your request, including your name, email address, phone number, shipping address, and simulated payment method preferences.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-neutral-900">2. How Your Data is Used</h2>
          <p>
            Your information is used solely to process checkout requests, provide simulated status tracking updates, communicate important policy notices, and personalize your shopping bag experience via client-side storage.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-neutral-900">3. Cookies and Local Storage</h2>
          <p>
            We use browser localStorage to maintain your active shopping cart items, applied promotional discount codes, and saved shipping preferences across browser reloads without requiring intrusive tracking cookies.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-neutral-900">4. Third-Party Sharing</h2>
          <p>
            We do not sell, trade, or transfer your personal data to third parties. In a production store, data would only be shared with verified courier delivery partners and PCI-DSS compliant payment gateways.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-neutral-900">5. Contact Our Privacy Officer</h2>
          <p>
            For questions or data deletion requests, email us at <strong className="text-neutral-900">privacy@kickz-store.demo</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}

