'use client'

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Project } from "@/payload-types";
import { isMedia } from "@/utils/utils";
import ProjectTagList from "./ProjectTagList";

export default function ProjectCard({ project }: { project: Project }) {
  const { title, short_description, project_image, tags, external_link } = project;
  const projectDetailPageLink = `${usePathname()}/${project.id}`
  const shortDescriptionSplit = short_description?.split(' ');
  const maxWordCount = 20

  return <div className="rounded-2xl bg-surface p-6 pt-8 flex flex-col gap-4">
    {isMedia(project_image) &&
      <Link href={external_link ?? projectDetailPageLink} target={external_link ? "_blank" : undefined} rel={external_link ? "noopener noreferrer" : undefined}>
        <Image
          src={project_image.url!}
          alt={project_image.alt!}
          width={project_image.width!}
          height={project_image.height!}
          className="rounded-2xl transition-all duration-300 hover:-translate-y-3 hover:drop-shadow-[8px_8px_8px_rgba(0,0,0,0.5)]"
          loading="eager"
        />
      </Link>
    }
    <Link href={external_link ?? projectDetailPageLink} className="hyperlink self-start" target={external_link ? "_blank" : undefined} rel={external_link ? "noopener noreferrer" : undefined}>
      <h2 className="hyperlink-text text-2xl font-semibold">{title}</h2>
    </Link>
    <div className="flex items-center gap-2">
      <ProjectTagList tags={tags} />
    </div>
    {shortDescriptionSplit && <p>{shortDescriptionSplit.length > maxWordCount ? shortDescriptionSplit.slice(0, maxWordCount).join(' ') + '...' : short_description}</p>}
    <div className="flex flex-col items-end gap-3">
      {/* Hyperlinks for Read Details and View Project */}
      <Link className="hyperlink flex items-center gap-2" href={projectDetailPageLink}>
        <span className="hyperlink-text">Read details</span>
        <span className="sr-only">for project {title}</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
        </svg>
      </Link>
      {external_link && <Link className="hyperlink flex items-center gap-2" href={external_link} target="_blank" rel="noopener noreferrer">
        <span className="hyperlink-text">View project</span>
        <span className="sr-only">opens external link for project {title} in new tab</span>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25" />
        </svg>
      </Link>}
    </div>
  </div>
}