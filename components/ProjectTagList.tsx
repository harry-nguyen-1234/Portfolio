import { ProjectTag } from "@/payload-types";
import { isProjectTag } from "@/utils/utils";

export default function ProjectTagList({ tags }: { tags: (number | ProjectTag)[] }) {
  return <>
    {tags.filter(isProjectTag).map(tag =>
      <span key={tag.id} className="text-sm bg-surface-raised py-2 px-5 rounded-2xl">
        {tag.title}
      </span>)}
  </>;
}