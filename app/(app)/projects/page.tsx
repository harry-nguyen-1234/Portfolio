import { getPayload } from 'payload'
import config from '@payload-config'
import ProjectGallery from '@/components/ProjectGallery';


export default async function Projects() {
    const payload = await getPayload({ config });
    const projects = (await payload.find({ collection: 'projects', depth: 1 })).docs;
    const projectTags = (await payload.find({ collection: 'projectTags' })).docs;

    return <>
        <main id="about-me" className="h-full container py-8 flex flex-col self-center grow">
            <h1 className="font-bold text-5xl text-center">Projects</h1>
            <ProjectGallery projects={projects} projectTags={projectTags} />
        </main>
    </>;
}