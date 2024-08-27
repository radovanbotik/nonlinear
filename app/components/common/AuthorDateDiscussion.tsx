import Link from "next/link";
import { ChatBubbleOvalLeftEllipsisIcon } from "@heroicons/react/20/solid";
import { PostData } from "@/app/lib/types";
import { cn } from "@/app/lib/helpers";

import { RiChat4Fill } from "react-icons/ri";

export default function AuthorDateDiscussion({
  author,
  date,
  datetime,
  className,
}: {
  author: { name: string; slug: string };
  date: PostData["date"];
  datetime: PostData["datetime"];
  className?: string;
}) {
  return (
    <div className={cn("text-xs tracking-wider", className)}>
      <div className="inline-block font-medium mr-2 text-black/50 dark:text-violet-700 hover:underline underline-offset-2 decoration-black/25 ">
        <Link href={`/authors/${author.slug}`} className="uppercase">
          {author.name}
        </Link>
      </div>
      <div className="inline-block text-black/40 dark:text-white/50 uppercase">
        <time dateTime={datetime}>
          {new Date(date).toLocaleDateString(undefined, { day: "2-digit", month: "long" })}
        </time>
        <span className="mx-2">|</span>
        <Link href="/chat" className="dark:hover:text-white/70 hover:text-black/70">
          {/* <ChatBubbleOvalLeftEllipsisIcon className="w-3.5 h-3.5 inline-block -translate-y-[2px] scale-x-[-1] mr-1 " /> */}
          <RiChat4Fill className="w-3.5 h-3.5 inline-block -translate-y-[2px] //scale-x-[-1] mr-1 " />
          <span className="inline-block">9</span>
        </Link>
      </div>
    </div>
  );
}
