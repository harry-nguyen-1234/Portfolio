'use client'

import { HiOutlineArrowRight, HiOutlineExternalLink } from "react-icons/hi";
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
      <Link href={projectDetailPageLink}>
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
    <Link href={projectDetailPageLink} className="hyperlink self-start">
      <h2 className="hyperlink-text text-2xl font-semibold">{title}</h2>
    </Link>
    <div className="flex flex-wrap items-center gap-2">
      <ProjectTagList tags={tags} />
    </div>
    {shortDescriptionSplit && <p>{shortDescriptionSplit.length > maxWordCount ? shortDescriptionSplit.slice(0, maxWordCount).join(' ') + '...' : short_description}</p>}
    <div className="flex flex-col items-end gap-3">
      {/* Hyperlinks for Read Details and View Project */}
      <Link className="hyperlink flex items-center gap-2" href={projectDetailPageLink}>
        <span className="hyperlink-text">Read details</span>
        <span className="sr-only">for project {title}</span>
        <HiOutlineArrowRight className="size-6" />
      </Link>
      {external_link && <Link className="hyperlink flex items-center gap-2" href={external_link} target="_blank" rel="noopener noreferrer">
        <span className="hyperlink-text">View project</span>
        <span className="sr-only">opens external link for project {title} in new tab</span>
        <HiOutlineExternalLink className="size-6" />
      </Link>}
    </div>
  </div>
}