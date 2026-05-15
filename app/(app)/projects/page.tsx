import { getPayload } from 'payload'
import config from '@payload-config'


export default async function Projects() {
    const payload = await getPayload({ config });
    const projects = (await payload.find({ collection: 'projects' })).docs;
    console.log(projects);

    return <>
        <main id="about-me" className="h-full container py-8 flex flex-col self-center grow">
            <h1 className="font-bold text-5xl text-center">Projects</h1>
        </main>
    </>;
}