import { Skeleton } from "@/components/skeleton";

export default function ProductDetailLoading() {
  return (
    <div className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <Skeleton className="w-40 h-4 mb-6 sm:mb-8" />

        {/* Product hero */}
        <div className="grid lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12">
          {/* Image */}
          <Skeleton className="w-full min-h-[280px] sm:min-h-[350px] lg:min-h-[400px] rounded-2xl" />

          {/* Info */}
          <div>
            <Skeleton className="w-28 h-4 mb-2" />
            <Skeleton className="w-full max-w-sm h-9 sm:h-10 mb-2" />
            <Skeleton className="w-40 h-5 mb-4" />
            <Skeleton className="w-48 h-4 mb-6" />

            {/* Description */}
            <div className="space-y-2">
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-full h-4" />
              <Skeleton className="w-3/4 h-4" />
            </div>

            {/* Bulk pricing */}
            <div className="mt-6 sm:mt-8 p-3 sm:p-4 bg-zinc-50 rounded-xl">
              <Skeleton className="w-24 h-4 mb-3" />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-16 rounded-lg" />
                ))}
              </div>
            </div>

            {/* Add to cart */}
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row gap-3">
              <Skeleton className="h-12 w-32 rounded-xl" />
              <Skeleton className="h-12 flex-1 rounded-xl" />
            </div>

            {/* Specs */}
            <div className="mt-4 sm:mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
              <Skeleton className="h-14 rounded-lg" />
              <Skeleton className="h-14 rounded-lg" />
            </div>
          </div>
        </div>

        {/* Info cards */}
        <div className="mt-10 sm:mt-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="bg-white rounded-2xl border border-border p-4 sm:p-6">
              <Skeleton className="w-32 h-6 mb-4" />
              <div className="space-y-2">
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-3/4 h-4" />
              </div>
            </div>
          ))}
        </div>

        {/* Research */}
        <div className="mt-10 sm:mt-12">
          <Skeleton className="w-48 h-7 mb-6" />
          <div className="space-y-3 sm:space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <div key={i} className="bg-white rounded-xl border border-border p-4 sm:p-6">
                <Skeleton className="w-full h-5 mb-2" />
                <Skeleton className="w-64 h-3 mb-3" />
                <Skeleton className="w-full h-4" />
                <Skeleton className="w-3/4 h-4 mt-1" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
