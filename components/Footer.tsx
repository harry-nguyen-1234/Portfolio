import { FiGithub, FiLinkedin } from "react-icons/fi";
import CircleLink from "./CircleLink";

export default function Footer() {
  return <footer className="py-8 flex flex-col items-center justify-between gap-4 sm:flex-row">
    © Harry Nguyen 2026
    <div className="flex justify-end gap-4">
      {/* Social media links */}
      <CircleLink ariaLabel="Visit Harry's GitHub website" href="https://github.com/harry-nguyen-1234?tab=repositories">
        <FiGithub className="size-5" />
      </CircleLink>
      <CircleLink ariaLabel="Visit Harry's LinkedIn page" href="https://www.linkedin.com/in/harrynguyen2024/">
        <FiLinkedin className="size-5" />
      </CircleLink>
    </div>
  </footer>;
}