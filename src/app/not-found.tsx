import Link from "next/link";
import { Compass, Home, ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="max-w-xl mx-auto px-4 py-20 sm:py-32 text-center space-y-6">
      <div className="w-20 h-20 rounded-full bg-neutral-100 flex items-center justify-center mx-auto text-neutral-400 mb-2">
        <Compass className="h-10 w-10 text-[#F95721]" />
      </div>

      <div className="space-y-2">
        <span className="text-xs font-bold uppercase tracking-widest text-[#F95721]">
          Error 404
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-neutral-900 tracking-tight">
          Page Could Not Be Located
        </h1>
        <p className="text-sm text-neutral-500 max-w-sm mx-auto leading-relaxed">
          The requested URL does not exist or may have been relocated. Discover our latest collections or head back home.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
        <Button asChild variant="primary" size="lg" className="w-full sm:w-auto font-bold gap-2">
          <Link href="/">
            <Home className="h-4 w-4" />
            <span>Back to Home</span>
          </Link>
        </Button>

        <Button asChild variant="outline" size="lg" className="w-full sm:w-auto font-semibold gap-2">
          <Link href="/shop">
            <ShoppingBag className="h-4 w-4" />
            <span>Explore Collections</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
    </div>
  );
}

