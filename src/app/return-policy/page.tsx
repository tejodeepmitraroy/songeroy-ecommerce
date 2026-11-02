import type { Metadata } from "next";
import { RotateCcw, CheckCircle2, ShieldCheck } from "lucide-react";

export const metadata: Metadata = {
  title: "Return & Exchange Policy",
  description: "Hassle-free 14-day doorstep return and exchange guidelines.",
};

export default function ReturnPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      <div className="space-y-3 pb-8 border-b border-neutral-200">
        <span className="text-xs font-bold uppercase tracking-widest text-[#F95721]">
          Customer Satisfaction
        </span>
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          Return & Exchange Policy
        </h1>
        <p className="text-xs text-neutral-400">
          Simple 14-day window with complimentary doorstep pickup
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-2">
          <RotateCcw className="h-5 w-5 text-[#F95721]" />
          <h3 className="font-bold text-sm text-neutral-900">14-Day Window</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Request an exchange or full refund within 14 calendar days of parcel delivery.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-2">
          <CheckCircle2 className="h-5 w-5 text-[#F95721]" />
          <h3 className="font-bold text-sm text-neutral-900">Doorstep Pickup</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Our logistics team collects the package directly from your address at zero extra cost.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-2">
          <ShieldCheck className="h-5 w-5 text-[#F95721]" />
          <h3 className="font-bold text-sm text-neutral-900">Prompt Refund</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Refunds are credited to your original payment method within 3–5 business days after inspection.
          </p>
        </div>
      </div>

      <div className="space-y-6 text-sm text-neutral-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-neutral-900">Eligibility Criteria</h2>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-neutral-600">
            <li>Garments must be unworn, unwashed, and odor-free with all original tags attached.</li>
            <li>Footwear must be tried on carpeted surfaces and returned with original shoebox and dust bags.</li>
            <li>Electronics and mechanical gear must include all cords, keys, and accessories in original packaging.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-neutral-900">How to Initiate a Return</h2>
          <p>
            Visit our <a href="/contact" className="text-[#F95721] font-semibold underline">Contact Portal</a> or email support with your Order ID (e.g., KCK-123456) and the reason for exchange. Our team will schedule the reverse courier pickup within 24 hours.
          </p>
        </section>
      </div>
    </div>
  );
}

