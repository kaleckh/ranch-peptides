import { Skeleton } from "@/components/skeleton";

export default function FAQLoading() {
  return (
    <div className="py-8 sm:py-12 lg:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <Skeleton className="w-64 h-9 sm:h-10 mb-4" />
        <Skeleton className="w-full max-w-md h-5" />

        {Array.from({ length: 4 }).map((_, section) => (
          <div key={section} className="mt-10 sm:mt-12">
            <Skeleton className="w-40 h-6 mb-4" />
            <div className="space-y-2 sm:space-y-3">
              {Array.from({ length: 4 }).map((_, q) => (
                <div key={q} className="bg-white rounded-xl border border-border p-4">
                  <div className="flex items-center justify-between">
                    <Skeleton className="w-full max-w-xs h-4" />
                    <Skeleton className="w-5 h-5 rounded flex-shrink-0 ml-4" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
