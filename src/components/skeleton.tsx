export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div className={`animate-pulse bg-zinc-200 rounded-lg ${className}`} />
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-border p-4 sm:p-6">
      <Skeleton className="w-full h-36 sm:h-40 rounded-xl mb-3 sm:mb-4" />
      <Skeleton className="w-24 h-5 rounded-full mb-3" />
      <Skeleton className="w-32 h-6 mb-2" />
      <Skeleton className="w-48 h-4 mb-4" />
      <div className="flex justify-between items-baseline">
        <Skeleton className="w-16 h-7" />
        <Skeleton className="w-12 h-3" />
      </div>
      <Skeleton className="w-36 h-3 mt-3" />
    </div>
  );
}
