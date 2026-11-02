import { HeroSection } from "@/components/home/HeroSection";
import { FeaturedCategories } from "@/components/home/FeaturedCategories";
import { BestSellersSection } from "@/components/home/BestSellersSection";
import { NewArrivalsSection } from "@/components/home/NewArrivalsSection";
import { PromotionalBanner } from "@/components/home/PromotionalBanner";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";

export default function HomePage() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <FeaturedCategories />
      <BestSellersSection />
      <PromotionalBanner />
      <NewArrivalsSection />
      <TestimonialsSection />
    </div>
  );
}
