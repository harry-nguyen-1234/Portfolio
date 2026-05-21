import Image from "next/image";

export default function Home() {
  return <>
    <main className="h-full container py-8 flex flex-col justify-center self-center grow max-w-5xl">
      <div className="flex flex-col md:flex-row gap-8 lg:gap-16 items-center">
        <Image className="rounded-full border-foreground border-4" src="/profile.png" alt="Picture of the site author" width={300} height={300} loading="eager" />
        <article className="text-justify flex flex-col gap-4" >
          <h1 className="font-bold text-5xl">About me</h1>
          <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Hic ut minima quaerat quasi sint nemo unde
            praesentium id reiciendis quam. Sequi porro similique dignissimos soluta neque, recusandae possimus eligendi
            quae.</p>
        </article>
      </div>
    </main>
  </>;
}
