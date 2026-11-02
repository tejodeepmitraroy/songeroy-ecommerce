import type { Metadata } from "next";
import { Truck, Clock, ShieldCheck } from "lucide-react";
import { FREE_SHIPPING_THRESHOLD, STANDARD_SHIPPING_FEE } from "@/lib/pricing";
import { formatCurrency } from "@/lib/currency";

export const metadata: Metadata = {
  title: "Shipping & Delivery Policy",
  description: "Information regarding domestic shipping rates, delivery timelines, and courier tracking.",
};

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 space-y-10">
      <div className="space-y-3 pb-8 border-b border-neutral-200">
        <span className="text-xs font-bold uppercase tracking-widest text-[#F95721]">
          Logistics Guide
        </span>
        <h1 className="text-3xl font-extrabold text-neutral-900 tracking-tight">
          Shipping & Delivery Policy
        </h1>
        <p className="text-xs text-neutral-400">
          Complimentary express delivery across India on orders over {formatCurrency(FREE_SHIPPING_THRESHOLD)}
        </p>
      </div>

      {/* Highlights Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-2">
          <Truck className="h-5 w-5 text-[#F95721]" />
          <h3 className="font-bold text-sm text-neutral-900">Complimentary Delivery</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Free on all orders over {formatCurrency(FREE_SHIPPING_THRESHOLD)}. Standard shipping of {formatCurrency(STANDARD_SHIPPING_FEE)} applies below.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-2">
          <Clock className="h-5 w-5 text-[#F95721]" />
          <h3 className="font-bold text-sm text-neutral-900">2–4 Business Days</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Metro destinations (Bengaluru, Mumbai, Delhi, Hyderabad) delivered within 48-96 hours.
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white border border-neutral-200/80 shadow-xs space-y-2">
          <ShieldCheck className="h-5 w-5 text-[#F95721]" />
          <h3 className="font-bold text-sm text-neutral-900">Full Transit Insurance</h3>
          <p className="text-xs text-neutral-500 leading-relaxed">
            Every shipment is double-boxed, tamper-sealed, and insured from our hub to your doorstep.
          </p>
        </div>
      </div>

      <div className="space-y-6 text-sm text-neutral-700 leading-relaxed">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-neutral-900">Fulfillment Hubs</h2>
          <p>
            All shipments originate from our climate-controlled fulfillment center in Indiranagar, Bengaluru. Orders placed before 1:00 PM IST on weekdays are packed and dispatched on the same calendar day.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-neutral-900">Order Tracking</h2>
          <p>
            As soon as courier pickup occurs, an automated email and SMS notification containing your air waybill (AWB) number and live tracking link will be sent to the contact details provided at checkout.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-neutral-900">Damaged or Tampered Parcels</h2>
          <p>
            If the outer tamper-evident seal is broken or visibly damaged upon delivery, please reject the package and notify client service immediately at <strong className="text-neutral-900">support@kickz-store.demo</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}

