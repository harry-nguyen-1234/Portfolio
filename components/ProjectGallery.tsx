'use client'

import { HiOutlineFilter } from "react-icons/hi";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Project, ProjectTag } from "@/payload-types";
import { isProjectTag } from "@/utils/utils";
import ProjectCard from "./ProjectCard";
import ProjectTagFilterButton from "./ProjectTagFilterButton";

export default function ProjectGallery({ projects, projectTags }: { projects: Project[], projectTags: ProjectTag[] }) {
  const [activeTags, setActiveTags] = useState<ProjectTag['id'][]>([]);

  const toggleFilterTag = (clickedTagId: ProjectTag['id']) => {
    setActiveTags(prev =>
      prev.includes(clickedTagId)
        ? prev.filter(id => id !== clickedTagId)
        : [...prev, clickedTagId]
    );
  };

  const isInFilter = (project: Project) => {
    if (activeTags.length === 0) return true;
    const projectTagIds = project.tags.filter(isProjectTag).map(tag => tag.id);
    return activeTags.every(tagId => projectTagIds.includes(tagId));
  };

  const filteredProjects = projects.filter(isInFilter);

  return <div className="flex flex-col gap-6">
    <div className="flex flex-wrap gap-4 items-center">
      {/* Project tag filter */}
      <HiOutlineFilter className="size-6" />
      <ProjectTagFilterButton tagTitle="All" active={activeTags.length === 0} onClick={() => setActiveTags([])} />
      {projectTags.map(tag => (
        <ProjectTagFilterButton key={tag.id} tagTitle={tag.title} active={activeTags.includes(tag.id)} onClick={() => { toggleFilterTag(tag.id) }} />
      ))}
    </div>
    <AnimatePresence mode="wait">
      <motion.div
        key={filteredProjects.map(p => p.id).join(',')}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredProjects.map(project => (<ProjectCard key={project.id} project={project} />))}
      </motion.div>
    </AnimatePresence>
  </div>
}