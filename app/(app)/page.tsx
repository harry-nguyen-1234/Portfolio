import Image from "next/image";

export default function Home() {
  return <main className="h-full container py-8 flex flex-col justify-center self-center grow max-w-5xl">
    <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center">
      <Image className="rounded-full border-foreground border-4" src="/profile.png" alt="Picture of the site author" width={300} height={300} loading="eager" />
      <article className="text-justify flex flex-col gap-4 py-8 backdrop-blur-sm">
        <h1 className="font-bold text-5xl">About me</h1>
        <p>
          My name's Harry, and I'm a junior full-stack developer who enjoys building responsive, accessible web experiences, and also have a keen interest in UI polish and performance.
        </p>
        <p>
          I like building things that feel good to use - clean interfaces, smooth interactions, and code that's easy to reason about.
        </p>
        <h2 className="font-bold text-4xl mt-6">Skills</h2>
        <ul className="list-disc list-inside">
          <li>JavaScript/TypeScript, Python</li>
          <li>React, Next.js, Django REST Framework</li>
          <li>Tailwind CSS, Payload CMS, Motion, PixiJS</li>
        </ul>
      </article>
    </div>
  </main>;
}