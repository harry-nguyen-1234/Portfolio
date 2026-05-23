import clsx from "clsx";

import { MouseEventHandler } from "react";

export default function ProjectTagFilterButton({ tagTitle, active, onClick }: { tagTitle: string, active: boolean, onClick: MouseEventHandler<HTMLButtonElement> }) {
    return <button aria-label="project tag filter button" onClick={onClick} className=
        {clsx("px-5 py-2 border-solid border-2 border-transparent rounded-3xl",
            "hover:border-foreground transition-colors duration-200",
            active ? "bg-foreground text-background" : "bg-surface"
        )}>
        {tagTitle}
    </button>;
}
