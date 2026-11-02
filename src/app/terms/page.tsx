import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions governing the use of KICKZ & CO.",
};

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
      <div className="space-y-3 pb-8 border-b border-neutral-200">
        <span className="text-xs font-bold uppercase tracking-widest text-[#F95721]">
          Sample Terms
        </span>
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          Terms & Conditions
        </h1>
        <p className="text-xs text-neutral-400">
          Last revised: February 2026 • Demo Store Terms
        </p>
      </div>

      <div className="prose prose-neutral max-w-none pt-8 space-y-6 text-sm text-neutral-700 leading-relaxed">
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 font-medium">
          Note: This website operates as a functional frontend demonstration. All product listings, prices in INR (₹), inventory counters, and payment flows are simulated.
        </div>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-neutral-900">1. Agreement to Terms</h2>
          <p>
            By accessing or browsing this website, you agree to be bound by these sample Terms of Service. If you disagree with any part of these terms, please discontinue use immediately.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-neutral-900">2. Store Pricing and Currency</h2>
          <p>
            All prices are shown in Indian Rupees (₹ INR). Prices are inclusive of simulated GST taxes where indicated. We reserve the right to correct typographical pricing errors without liability.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-neutral-900">3. Orders and Payment Simulation</h2>
          <p>
            Orders placed on this site trigger simulated transactions through our fake payment service. No actual credit card debits or banking fund transfers will take place.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-neutral-900">4. Intellectual Property</h2>
          <p>
            All typography, imagery, product designs, trademarks, and interface layouts are property of KICKZ & CO. or used under royalty-free demonstration licenses.
          </p>
        </section>
      </div>
    </div>
  );
}

