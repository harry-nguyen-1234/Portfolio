'use client'

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Project, ProjectTag } from "@/payload-types";
import { isProjectTag } from "@/utils/utils";
import ProjectCard from "./ProjectCard";
import ProjectTagFilterButton from "./ProjectTagFilterButton";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
  exit: {
    opacity: 0,
  },
};

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

  return <div className="flex flex-col gap-6">
    <div className="flex gap-4 items-center">
      {/* Project tag filter */}
      <svg className="w-6 h-6" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" fill="none"
        strokeLinecap="round" strokeLinejoin="round">
        <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
      </svg>
      <ProjectTagFilterButton tagTitle="All" active={activeTags.length === 0} onClick={() => setActiveTags([])} />
      {projectTags.map(tag => (
        <ProjectTagFilterButton key={tag.id} tagTitle={tag.title} active={activeTags.includes(tag.id)} onClick={() => { toggleFilterTag(tag.id) }} />
      ))}
    </div>
    <AnimatePresence mode="wait">
      <motion.div
        key={activeTags.join(',')}
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
      >
        {projects.filter(isInFilter).map(project => (<ProjectCard key={project.id} project={project} />))}
      </motion.div>
    </AnimatePresence>
  </div>
}