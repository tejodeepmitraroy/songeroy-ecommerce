import Image from "next/image";
import { Star } from "lucide-react";
import { TESTIMONIALS } from "@/data/testimonials";

export function TestimonialsSection() {
  return (
    <section className="py-16 sm:py-24 bg-neutral-100/70 border-t border-neutral-200/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
          <span className="text-xs font-bold uppercase tracking-widest text-[#F95721]">
            Verified Feedback
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-neutral-900 mt-1">
            Loved by Designers, Creators & Collectors
          </h2>
          <p className="text-sm text-neutral-500 mt-2">
            See what customers have to say about the fit, texture, and durability of our pieces.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((testimonial) => (
            <div
              key={testimonial.id}
              className="flex flex-col justify-between rounded-2xl bg-white p-6 shadow-xs border border-neutral-200/80 transition-shadow hover:shadow-md"
            >
              <div>
                <div className="flex items-center gap-1 mb-4 text-amber-400">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-neutral-700 leading-relaxed italic mb-4">
                  &quot;{testimonial.content}&quot;
                </p>
              </div>

              <div className="pt-4 border-t border-neutral-100 flex items-center gap-3">
                <div className="relative h-10 w-10 rounded-full overflow-hidden bg-neutral-200 shrink-0">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    sizes="40px"
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-neutral-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-[11px] text-neutral-500">{testimonial.role}</p>
                  <p className="text-[10px] text-neutral-400 font-medium">
                    {testimonial.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

