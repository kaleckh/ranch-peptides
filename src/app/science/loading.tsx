import { Skeleton } from "@/components/skeleton";

export default function ScienceLoading() {
  return (
    <div className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <Skeleton className="w-56 h-9 sm:h-10 mb-4" />
        <Skeleton className="w-full max-w-2xl h-5 mb-2" />
        <Skeleton className="w-3/4 max-w-xl h-5" />

        {/* Image banner */}
        <Skeleton className="w-full h-48 sm:h-64 rounded-2xl mt-8 sm:mt-10" />

        {/* What are peptides */}
        <div className="mt-12 sm:mt-16">
          <Skeleton className="w-48 h-7 mb-4" />
          <div className="space-y-3">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-5/6 h-4" />
            <Skeleton className="w-full h-4 mt-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-2/3 h-4" />
          </div>
        </div>

        {/* Comparison table */}
        <div className="mt-12 sm:mt-16">
          <Skeleton className="w-72 h-7 mb-4" />
          <Skeleton className="w-full max-w-xl h-5 mb-6" />
          <Skeleton className="w-full h-[400px] rounded-xl" />
        </div>

        {/* Product research sections */}
        <div className="mt-12 sm:mt-16">
          <Skeleton className="w-56 h-7 mb-3" />
          <Skeleton className="w-64 h-5 mb-8" />
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="mt-8">
              <Skeleton className="w-40 h-6 mb-3" />
              <Skeleton className="w-full h-4 mb-1" />
              <Skeleton className="w-3/4 h-4 mb-4" />
              <div className="space-y-2">
                {Array.from({ length: 2 }).map((_, j) => (
                  <div key={j} className="p-3 sm:p-4 bg-white rounded-xl border border-border">
                    <Skeleton className="w-full h-4 mb-2" />
                    <Skeleton className="w-48 h-3 mb-2" />
                    <Skeleton className="w-full h-4" />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
