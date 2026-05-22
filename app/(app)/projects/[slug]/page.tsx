import { getPayload } from 'payload';
import config from '@payload-config';
import Link from 'next/link';
import ProjectTagList from '@/components/ProjectTagList';

export default async function ProjectSinglePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const project = await payload.findByID({
    collection: 'projects',
    depth: 1,
    id: slug,
  });
  const { title, short_description, project_image, tags, external_link } = project;

  return <>
    <div className='flex justify-between'>
      {/* Back to Projects and View Project hyperlinks */}
      <Link className="hyperlink flex items-center gap-2" href="/projects">
        <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"
          strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        <span className="hyperlink-text">Back to Projects</span>
      </Link>
      {external_link && <Link className="hyperlink flex items-center gap-2" href={external_link} target="_blank" rel="noopener noreferrer">
        <span className="hyperlink-text">View project</span>
        <span className="sr-only">opens external link for {title} in new tab</span>
        <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"
          strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
          <polyline points="15 3 21 3 21 9"></polyline>
          <line x1="10" y1="14" x2="21" y2="3"></line>
        </svg>
      </Link>}
    </div>
    <h1 className='font-bold text-4xl text-center my-7'>{title}</h1>
    <div className="flex items-center justify-center gap-4">
      <ProjectTagList tags={tags} />
    </div>
  </>
}