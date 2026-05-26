import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function ProjectCardSkeleton() {
  return (
    <div className="rounded-2xl flex flex-col gap-4">
      {/* image */}
      <Skeleton height={200} />
      {/* title */}
      <Skeleton height={28} width={200} />
      {/* tags */}
      <div className="flex items-center gap-2">
        <Skeleton height={32} width={80} />
        <Skeleton height={32} width={80} />
      </div>
      {/* description */}
      <Skeleton count={2} />
      {/* links */}
      <div className="flex flex-col items-end gap-3">
        <Skeleton height={24} width={120} />
      </div>
    </div>
  )
}

export default function Loading() {
  return (
    <SkeletonTheme baseColor="var(--color-surface)" highlightColor='var(--color-surface-raised)' borderRadius="1rem">
      <main className="h-full container py-8 flex flex-col self-center grow gap-8 md:gap-12">
        <h1 className="font-bold text-5xl text-center">Projects</h1>
        {/* filter bar */}
        <div className="flex gap-4 items-center">
          <Skeleton circle height={24} width={24} />
          <Skeleton height={40} width={80} />
          <Skeleton height={40} width={80} />
          <Skeleton height={40} width={80} />
        </div>
        {/* grid */}
        <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <ProjectCardSkeleton key={i} />
          ))}
        </div>
      </main>
    </SkeletonTheme>
  )
}