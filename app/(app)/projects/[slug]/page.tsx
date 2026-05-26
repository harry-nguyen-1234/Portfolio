export const dynamic = 'force-dynamic';

import clsx from 'clsx';
import { HiOutlineArrowLeft, HiOutlineExternalLink } from 'react-icons/hi';
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
        <HiOutlineArrowLeft className="size-6" />
        <span className="hyperlink-text">Back to Projects</span>
      </Link>
      {external_link && <Link className="hyperlink hidden sm:flex items-center gap-2" href={external_link} target="_blank" rel="noopener noreferrer">
        <span className="hyperlink-text">View project</span>
        <span className="sr-only">opens external link for {title} in new tab</span>
        <HiOutlineExternalLink className="size-6" />
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
          className="rounded-2xl w-full max-w-xl lg:max-w-none justify-self-center"
          loading="eager"
        />
      }
      {description &&
        <RichText className={clsx("flex flex-col gap-2 backdrop-blur-sm",
          "prose prose-custom max-w-none",
          "prose-p:m-0 prose-p:text-base",
          "prose-h2:not-first:my-[1em]",
          "prose-h3:not-first:my-[0.5em]",
        )}
          data={description} />
      }
    </div>
  </>
}