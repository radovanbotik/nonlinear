import { ImageType, PostData } from "@/app/lib/types";
import Image from "next/image";
import Link from "next/link";
import AuthorDateDiscussion from "../common/AuthorDateDiscussion";
import { cn } from "@/app/lib/helpers";

function Content({
  author,
  badge,
  drophead,
  headline,
  release_date,
  slug,
}: {
  author: { name: string; slug: string };
  badge?: string;
  drophead?: string;
  headline: string;
  release_date: string;
  slug: string;
}) {
  return (
    <div className="flex items-center max-w-xs">
      {badge && (
        <span
          className="relative hidden @lg:inline-block rotate-180 mr-7 bg-black text-[#d0ff4b]  py-2.5 px-px dark:px-0 dark:py-0 dark:text-white/70 dark:hover:text-white/90  dark:underline decoration-violet-700 underline-offset-4 uppercase text-10 //tracking-widest //font-light  leading-[1.2] tracking-[.15em]"
          style={{ writingMode: "vertical-lr", textOrientation: "sideways" }}
        >
          {badge}
          <Link href={"/apple"} className="absolute inset-0" />
        </span>
      )}
      <div>
        {badge && (
          <span className="relative inline-block @lg:hidden bg-black text-[#d0ff4b] dark:text-white/70  px-2.5 py-px dark:px-0 dark:py-0 dark:hover:text-white/90  dark:underline decoration-violet-700 underline-offset-4 uppercase text-10 //font-light  leading-[1.2] tracking-[.15em]">
            {badge}
            <Link href={"/apple"} className="absolute inset-0" />
          </span>
        )}
        <div className="relative mb-2 space-y-1">
          {/* rendered as h5 */}
          <span className="text-black font-medium //text-xl //@lg:text-xl text-lg @md:text-xl @lg:text-xl  dark:text-white group-hover:underline underline-offset-2 decoration-black/50 //group-hover:shadow-[0px_1px_0px_0px_#667eea] ">
            {headline}
            <Link href={`${slug}`} className="absolute inset-0" />
          </span>
          {drophead && <p className="hidden @sm:line-clamp-2 text-black/70">{drophead}</p>}
        </div>

        <AuthorDateDiscussion author={author} date={release_date} datetime={release_date} />
      </div>
    </div>
  );
}

function Thumb({
  image,
  headline,
  imageStyles,
  slug,
}: {
  image: string;
  headline: string;
  imageStyles?: string;
  slug: string;
}) {
  return (
    <div>
      <div
        className={cn(
          "relative w-32 aspect-square  rounded-lg overflow-hidden border-black/30 dark:border-white/30 border",
          imageStyles
        )}
      >
        <Image
          src={image}
          alt={`image for ${headline}`}
          fill
          className="object-cover inset-0 rounded-sm"
          sizes="(min-width: 640px) 96px, 80px"
          placeholder="blur"
          blurDataURL={image}
          quality={100}
        />
        <Link href={`${slug}`} className="absolute inset-0" />
      </div>
    </div>
  );
}

export default function Post1({
  author,
  badge,
  className,
  drophead,
  headline,
  image,
  imageStyles,
  isReversed,
  release_date,
  slug,
}: {
  author: { name: string; slug: string };
  badge?: string;
  className?: string;
  drophead?: string;
  headline: string;
  image?: string;
  imageStyles?: string;
  isReversed?: boolean;
  release_date: string;
  slug: string;
}) {
  return (
    <div
      className={cn(
        "relative flex w-full flex-row items-center  gap-5 group",
        isReversed && "flex-row-reverse justify-end",
        className
      )}
    >
      {image && <Thumb image={image} slug={slug} headline={headline} imageStyles={imageStyles} />}
      <Content
        author={author}
        drophead={drophead}
        headline={headline}
        release_date={release_date}
        slug={slug}
        badge={badge}
      />
    </div>
  );
}
