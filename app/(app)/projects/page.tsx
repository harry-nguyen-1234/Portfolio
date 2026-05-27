export const dynamic = 'force-dynamic';

import { getPayload } from 'payload'
import config from '@payload-config'
import ProjectGallery from '@/components/ProjectGallery';

export default async function Projects() {
    const payload = await getPayload({ config });
    const projects = (await payload.find({
        collection: 'projects',
        depth: 1,
        where: { _status: { equals: 'published' } }
    })).docs;
    const projectTags = (await payload.find({ collection: 'projectTags' })).docs;

    return <>
        <main className="gap-8 md:gap-12 max-w-screen-2xl">
            <h1 className="font-bold text-5xl text-center">Projects</h1>
            <ProjectGallery projects={projects} projectTags={projectTags} />
        </main>
    </>;
}