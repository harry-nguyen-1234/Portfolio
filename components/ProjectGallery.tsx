'use client'

import { MouseEventHandler, useState } from "react";
import Image from "next/image";
import { Media, Project, ProjectTag } from "@/payload-types";
import clsx from "clsx";

function isMedia(val: unknown): val is Media {
    return typeof val === 'object' && val !== null && 'url' in val;
}

function ProjectCard({ project }: { project: Project }) {
    const projectImage = project["project-image"];

    return <div className="rounded-2xl bg-surface p-6">
        {isMedia(projectImage) &&
            <Image
                src={projectImage.url!}
                alt={projectImage.alt!}
                width={projectImage.width!}
                height={projectImage.height!}
                className="rounded-2xl"
                loading="eager"
            />
        }
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
        <div id="project-listing" className="flex gap-6">
            {/* {!activeTags ?
                projects.map(project => <ProjectCard key={project.id} project={project} />)
                : ""} */}
            {projects.map(project => <ProjectCard key={project.id} project={project} />)}
        </div>
    </div>
}