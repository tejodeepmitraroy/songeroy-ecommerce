"use client";

import React, { useState } from "react";
import { CartProvider } from "@/context/CartContext";
import { AnnouncementBar } from "./AnnouncementBar";
import { Header } from "./Header";
import { MobileNavigation } from "./MobileNavigation";
import { CartDrawer } from "./CartDrawer";
import { Footer } from "./Footer";
import { ToastContainer } from "@/components/ui/toast";

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-[#FAFAFA] text-[#111111]">
        <AnnouncementBar />
        <Header onOpenMobileMenu={() => setIsMobileMenuOpen(true)} />
        <MobileNavigation
          open={isMobileMenuOpen}
          onOpenChange={setIsMobileMenuOpen}
        />
        <CartDrawer />
        <ToastContainer />
        <main className="flex-1">{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
}

