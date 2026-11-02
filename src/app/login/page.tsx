"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Lock, Mail, ShieldAlert, ArrowRight, CheckCircle2, AlertCircle } from "lucide-react";
import { loginSchema, LoginFormData } from "@/lib/validation";
import { Button } from "@/components/ui/button";

export default function LoginPage() {
  const router = useRouter();
  const [isSuccess, setIsSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleFillDemo = () => {
    setValue("email", "demo@kickz-store.com");
    setValue("password", "password123");
  };

  const onSubmit = async () => {
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSubmitting(false);
    setIsSuccess(true);
    setTimeout(() => {
      router.push("/shop");
    }, 1200);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 sm:py-24">
      {/* Demo Warning Notice */}
      <div className="rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4 mb-6 flex items-start gap-3">
        <ShieldAlert className="h-5 w-5 text-amber-600 shrink-0 mt-0.5" />
        <div className="text-xs text-amber-800 leading-relaxed">
          <strong className="block font-bold">Simulated Authentication:</strong>
          This is a frontend demonstration. No real server session is initiated.
        </div>
      </div>

      <div className="bg-white rounded-3xl border border-neutral-200/90 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-extrabold text-neutral-900 tracking-tight">
            Account Sign In
          </h1>
          <p className="text-xs text-neutral-500">
            Access your saved shipping profiles and simulated order records.
          </p>
        </div>

        {/* Quick Demo Credentials Fill Button */}
        <button
          type="button"
          onClick={handleFillDemo}
          className="w-full py-2 px-3 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-neutral-800 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
        >
          <span>Fill Demo Credentials (demo@kickz-store.com)</span>
        </button>

        {isSuccess ? (
          <div className="py-8 text-center space-y-3 animate-in fade-in">
            <CheckCircle2 className="h-10 w-10 text-emerald-600 mx-auto" />
            <h3 className="text-base font-bold text-neutral-900">
              Welcome back, Collector!
            </h3>
            <p className="text-xs text-neutral-500">
              Redirecting you to the catalog...
            </p>
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

            <div className="space-y-1.5">
              <div className="flex justify-between items-center text-xs">
                <label className="font-semibold text-neutral-700">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-neutral-500 hover:text-neutral-900 underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  placeholder="••••••••"
                  {...register("password")}
                  className={`w-full h-11 pl-10 pr-3.5 rounded-xl border bg-white text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none ${
                    errors.password ? "border-rose-400 ring-1 ring-rose-400" : "border-neutral-200 focus:border-neutral-900"
                  }`}
                />
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-neutral-400" />
              </div>
              {errors.password && (
                <p className="text-xs text-rose-600 font-medium flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="submit"
              variant="primary"
              size="lg"
              disabled={isSubmitting}
              className="w-full font-bold gap-2 text-sm shadow-md"
            >
              <span>{isSubmitting ? "Authenticating..." : "Sign In to Account"}</span>
              <ArrowRight className="h-4 w-4" />
            </Button>
          </form>
        )}

        <div className="text-center text-xs text-neutral-500 pt-2 border-t border-neutral-100">
          <span>Don&apos;t have an account yet? </span>
          <Link href="/register" className="font-bold text-[#F95721] hover:underline">
            Create an Account
          </Link>
        </div>
      </div>
    </div>
  );
}

