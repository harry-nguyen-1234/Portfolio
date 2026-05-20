'use client'

import { MouseEventHandler, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import clsx from "clsx";

import { Media, Project, ProjectTag } from "@/payload-types";

function isMedia(val: unknown): val is Media {
    return typeof val === 'object' && val !== null && 'url' in val;
}

function ProjectCard({ project }: { project: Project }) {
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
        {shortDescriptionSplit && <p>{shortDescriptionSplit.length > maxWordCount ? shortDescriptionSplit.slice(0, maxWordCount).join(' ') + '...' : short_description}</p>}
        <div className="flex flex-col items-end gap-3">
            <Link className="hyperlink flex items-center gap-2" href={projectDetailPageLink}>
                <span className="hyperlink-text">Read details</span>
                <span className="sr-only">for {title}</span>
                <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"
                    strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
            </Link>
            {external_link && <Link className="hyperlink flex items-center gap-2" href={external_link} target="_blank" rel="noopener noreferrer">
                <span className="hyperlink-text">View project</span>
                <span className="sr-only">opens {title} in new tab</span>
                <svg aria-hidden="true" className="h-6 w-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"
                    strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                    <polyline points="15 3 21 3 21 9"></polyline>
                    <line x1="10" y1="14" x2="21" y2="3"></line>
                </svg>
            </Link>}
        </div>
    </div>
}

function ProjectTagButton({ tag, active, onClick }: { tag: ProjectTag, active: boolean, onClick: MouseEventHandler<HTMLButtonElement> }) {
    return <button aria-label="project tag filter button" onClick={onClick} className=
        {clsx("px-4 py-2 border-solid border-2 border-transparent rounded-2xl",
            "hover:border-foreground transition-colors duration-200",
            active ? "bg-foreground text-background" : "bg-surface-raised"
        )}>
        {tag.title}
    </button>;
}

export default function ProjectGallery({ projects, projectTags }: { projects: Project[], projectTags: ProjectTag[] }) {
    // projects.forEach(project => console.log(project));
    // projectTags.forEach(projectTag => console.log(projectTag));
    const [activeTags, setActiveTags] = useState<ProjectTag['id'][]>([]);

    const toggleFilterTag = (clickedTagId: ProjectTag['id']) => {
        setActiveTags(prev =>
            prev.includes(clickedTagId)
                ? prev.filter(id => id !== clickedTagId)
                : [...prev, clickedTagId]
        );
    };

    return <div className="flex flex-col gap-6">
        <div id="project-tag-filter" className="flex gap-4 items-center">
            <svg className="w-6 h-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"
                strokeLinecap="round" strokeLinejoin="round">
                <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
            </svg>
            {projectTags.map(tag => (
                <ProjectTagButton key={tag.id} tag={tag} active={activeTags.includes(tag.id)} onClick={() => { toggleFilterTag(tag.id) }} />
            ))}
        </div>
        <div id="project-listing" className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {/* {!activeTags ?
                projects.map(project => <ProjectCard key={project.id} project={project} />)
                : ""} */}
            {projects.map(project => <ProjectCard key={project.id} project={project} />)}
        </div>
    </div>
}