"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";
import { contactFormSchema, ContactFormData } from "@/lib/validation";
import { STORE_SETTINGS } from "@/data/store";
import { Button } from "@/components/ui/button";

export default function ContactPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setIsSubmitted(true);
    reset();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16 space-y-3">
        <span className="text-xs font-bold uppercase tracking-widest text-[#F95721]">
          We&apos;re Here to Help
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-950 tracking-tight">
          Client Care & Inquiries
        </h1>
        <p className="text-sm text-neutral-500 leading-relaxed">
          Have a question regarding an order, sizing, or styling advice? Reach out to our Bengaluru concierge team below.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
        {/* Contact Info (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs space-y-6">
            <h2 className="text-lg font-bold text-neutral-900 pb-3 border-b border-neutral-100">
              Studio Details
            </h2>

            <div className="space-y-4 text-xs text-neutral-600">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#F95721] flex items-center justify-center shrink-0 mt-0.5">
                  <Mail className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-bold text-neutral-900 block">Email Support</span>
                  <a
                    href={`mailto:${STORE_SETTINGS.supportEmail}`}
                    className="hover:text-[#F95721] transition-colors"
                  >
                    {STORE_SETTINGS.supportEmail}
                  </a>
                  <p className="text-[11px] text-neutral-400 mt-0.5">Average response: &lt; 2 hours</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#F95721] flex items-center justify-center shrink-0 mt-0.5">
                  <Phone className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-bold text-neutral-900 block">Phone Support</span>
                  <a
                    href={`tel:${STORE_SETTINGS.supportPhone}`}
                    className="hover:text-[#F95721] transition-colors"
                  >
                    {STORE_SETTINGS.supportPhone}
                  </a>
                  <p className="text-[11px] text-neutral-400 mt-0.5">Toll-free across India</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#F95721] flex items-center justify-center shrink-0 mt-0.5">
                  <MapPin className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-bold text-neutral-900 block">Design Flagship</span>
                  <p className="leading-relaxed">{STORE_SETTINGS.address}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-lg bg-orange-50 text-[#F95721] flex items-center justify-center shrink-0 mt-0.5">
                  <Clock className="h-4 w-4" />
                </div>
                <div>
                  <span className="font-bold text-neutral-900 block">Concierge Hours</span>
                  <p>{STORE_SETTINGS.workingHours}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-neutral-200/90 shadow-xs">
          <h2 className="text-lg font-bold text-neutral-900 mb-6">
            Send an Inquiry
          </h2>

          {isSubmitted ? (
            <div className="py-12 text-center space-y-4 animate-in fade-in">
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-sm">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-neutral-900">
                Message Dispatched Successfully!
              </h3>
              <p className="text-xs sm:text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed">
                Thank you for contacting us. A client care advisor will review your message and reply via email within 24 hours.
              </p>
              <div className="pt-2">
                <Button
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                  className="text-xs font-semibold"
                >
                  Send Another Message
                </Button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-700">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your full name"
                    {...register("name")}
                    className={`w-full h-11 px-3.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-colors ${
                      errors.name ? "border-rose-400 ring-1 ring-rose-400" : "border-neutral-200 focus:border-neutral-900"
                    }`}
                  />
                  {errors.name && (
                    <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-neutral-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    {...register("email")}
                    className={`w-full h-11 px-3.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-colors ${
                      errors.email ? "border-rose-400 ring-1 ring-rose-400" : "border-neutral-200 focus:border-neutral-900"
                    }`}
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
                      <AlertCircle className="h-3 w-3" />
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-700">
                  Subject *
                </label>
                <input
                  type="text"
                  placeholder="e.g. Order Tracking, Sizing Guidance, Return Question"
                  {...register("subject")}
                  className={`w-full h-11 px-3.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-colors ${
                    errors.subject ? "border-rose-400 ring-1 ring-rose-400" : "border-neutral-200 focus:border-neutral-900"
                  }`}
                />
                {errors.subject && (
                  <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.subject.message}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-neutral-700">
                  Message *
                </label>
                <textarea
                  rows={5}
                  placeholder="How can our concierge team assist you today?"
                  {...register("message")}
                  className={`w-full p-3.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none transition-colors ${
                    errors.message ? "border-rose-400 ring-1 ring-rose-400" : "border-neutral-200 focus:border-neutral-900"
                  }`}
                />
                {errors.message && (
                  <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
                    <AlertCircle className="h-3 w-3" />
                    {errors.message.message}
                  </p>
                )}
              </div>

              <Button
                type="submit"
                variant="primary"
                size="lg"
                disabled={isSubmitting}
                className="w-full font-bold gap-2 text-sm shadow-sm"
              >
                <Send className="h-4 w-4" />
                <span>{isSubmitting ? "Transmitting..." : "Send Message"}</span>
              </Button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

