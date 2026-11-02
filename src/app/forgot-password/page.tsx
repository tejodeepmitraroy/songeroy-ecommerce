"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail, ArrowLeft, CheckCircle2, AlertCircle, ShieldAlert } from "lucide-react";
import { forgotPasswordSchema, ForgotPasswordFormData } from "@/lib/validation";
import { Button } from "@/components/ui/button";

export default function ForgotPasswordPage() {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordFormData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsSuccess(true);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
      {/* Demo Warning Notice */}
      <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 mb-6 flex items-start gap-3">
        <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800 leading-relaxed">
          <strong className="block font-bold">Simulated Recovery:</strong>
          This is a simulated demo. No actual password reset emails will be sent.
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
            Reset Password
          </h1>
          <p className="text-xs text-neutral-500">
            Enter your account email to receive demo recovery instructions.
          </p>
        </div>

        {isSuccess ? (
          <div className="py-8 text-center space-y-4 animate-in fade-in">
            <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-neutral-900">
              Demo Reset Link Dispatched
            </h3>
            <p className="text-xs text-neutral-500 max-w-xs mx-auto">
              In a production system, a cryptographic reset token would be emailed. For this demo, your account remains active.
            </p>
            <div className="pt-2">
              <Button asChild variant="primary">
                <Link href="/login">Return to Sign In</Link>
              </Button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-neutral-700">
                Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  placeholder="name@example.com"
                  {...register("email")}
                  className={`w-full h-11 pl-10 pr-3.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none ${
                    errors.email ? "border-rose-400 ring-1 ring-rose-400" : "border-neutral-200 focus:border-neutral-900"
                  }`}
                />
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              </div>
              {errors.email && (
                <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.email.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="w-full font-bold text-sm shadow-md"
            >
              {isSubmitting ? "Generating Link..." : "Send Reset Instructions"}
            </Button>
          </form>
        )}

        <div className="text-center pt-2">
          <Link
            href="/login"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-neutral-600 hover:text-neutral-900"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

