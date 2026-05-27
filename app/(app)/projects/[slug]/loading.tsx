import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

export default function Loading() {
  return (
    <SkeletonTheme baseColor="var(--color-surface)" highlightColor="var(--color-surface-raised)" borderRadius="1rem">
      <main className='max-w-screen-2xl'>
        {/* back and view project links */}
        <div className="flex justify-between">
          <Skeleton height={24} width={140} />
          <Skeleton height={24} width={120} className="hidden sm:block" />
        </div>
        {/* title */}
        <Skeleton height={36} width={300} className="mx-auto my-7" />
        {/* tags */}
        <div className="flex justify-center items-center gap-2 mb-7">
          <Skeleton height={32} width={80} />
          <Skeleton height={32} width={80} />
          <Skeleton height={32} width={80} />
        </div>
        {/* image and description grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Skeleton height={400} />
          <div className="flex flex-col gap-2">
            {Array.from({ length: 6 }).map((_, i) => (
              <Skeleton key={i} height={32} />
            ))}
          </div>
        </div>
      </main>
    </SkeletonTheme>
  );
}