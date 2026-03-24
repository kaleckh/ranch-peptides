import { Skeleton, ProductCardSkeleton } from "@/components/skeleton";

export default function ProductsLoading() {
  return (
    <div className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-10">
          <Skeleton className="w-48 h-9 sm:h-10 mb-3" />
          <Skeleton className="w-full max-w-lg h-5 mb-1" />
          <Skeleton className="w-64 h-5" />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </div>
  );
}
