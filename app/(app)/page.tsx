import { HiOutlineArrowRight } from "react-icons/hi";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return <main className="justify-center self-center max-w-5xl">
    <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center">
      <Image className="rounded-full border-foreground border-4" src="/profile.png" alt="Picture of the site author" width={300} height={300} loading="eager" />
      <article className="text-justify flex flex-col gap-4 backdrop-blur-sm">
        <h1 className="font-bold text-5xl">About me</h1>
        <p>
          My name's Harry, and I'm a junior full-stack developer who enjoys building responsive, accessible web experiences.
        </p>
        <p>
          I like building things that feel good to use, and I also have a keen interest in UI polish and performance.
        </p>
        <Link className='hyperlink flex items-center gap-2' href='/projects'>
          <p className="hyperlink-text">View my projects</p>
          <HiOutlineArrowRight className="size-6" />
        </Link>
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