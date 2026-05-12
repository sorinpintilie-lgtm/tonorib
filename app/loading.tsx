export default function Loading() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center gap-6 px-4">
      {/* Animated fish skeleton */}
      <div className="flex flex-col items-center gap-3">
        <div className="w-16 h-16 rounded-full skeleton" />
        <div className="h-4 w-40 skeleton rounded-full" />
        <div className="h-3 w-56 skeleton rounded-full" />
      </div>

      {/* Card skeletons row */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full max-w-3xl mt-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="rounded-card overflow-hidden shadow-card">
            <div className="aspect-[4/3] skeleton" />
            <div className="p-4 space-y-2">
              <div className="h-4 w-3/4 skeleton rounded" />
              <div className="h-3 w-1/2 skeleton rounded" />
              <div className="h-3 w-2/3 skeleton rounded" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
