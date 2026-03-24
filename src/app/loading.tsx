import { Skeleton, ProductCardSkeleton } from "@/components/skeleton";

export default function HomeLoading() {
  return (
    <div>
      {/* Hero skeleton */}
      <section className="relative overflow-hidden bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-28">
          <div className="max-w-2xl">
            <Skeleton className="w-48 h-6 rounded-full mb-4 sm:mb-6" />
            <Skeleton className="w-full h-10 sm:h-14 mb-3" />
            <Skeleton className="w-3/4 h-10 sm:h-14 mb-4 sm:mb-6" />
            <Skeleton className="w-full h-5 mb-2" />
            <Skeleton className="w-2/3 h-5 mb-6 sm:mb-8" />
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <Skeleton className="w-40 h-12 rounded-xl" />
              <Skeleton className="w-36 h-12 rounded-xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Trust bar skeleton */}
      <section className="border-y border-border bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="flex items-center gap-2 sm:gap-3">
                <Skeleton className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg flex-shrink-0" />
                <div>
                  <Skeleton className="w-24 h-4 mb-1" />
                  <Skeleton className="w-20 h-3" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Products grid skeleton */}
      <section className="py-12 sm:py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 sm:mb-12">
            <Skeleton className="w-48 h-8 mx-auto mb-3" />
            <Skeleton className="w-80 h-5 mx-auto" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
