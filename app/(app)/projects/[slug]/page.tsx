export const dynamic = 'force-dynamic';

import { getPayload } from 'payload';
import config from '@payload-config';
import { RichText } from '@payloadcms/richtext-lexical/react'
import Link from 'next/link';
import Image from 'next/image';
import ProjectTagList from '@/components/ProjectTagList';
import { isMedia } from '@/utils/utils';

export default async function ProjectSinglePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const payload = await getPayload({ config });
  const project = await payload.findByID({
    collection: 'projects',
    depth: 1,
    id: slug,
  });
  const { title, description, project_image, tags, external_link } = project;

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
      {external_link && <Link className="hyperlink hidden sm:flex items-center gap-2" href={external_link} target="_blank" rel="noopener noreferrer">
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
    <div className="flex justify-center items-center gap-2 mb-7">
      <ProjectTagList tags={tags} />
    </div>
    <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
      {isMedia(project_image) &&
        <Image
          src={project_image.url!}
          alt={project_image.alt!}
          width={project_image.width!}
          height={project_image.height!}
          className="rounded-2xl w-full"
          loading="eager"
        />
      }
      {description &&
        <RichText className="flex flex-col gap-4" data={description} />
      }
    </div>
  </>
}