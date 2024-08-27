import Image from "next/image";
import Link from "next/link";
import AuthorDateDiscussion from "../common/AuthorDateDiscussion";
import { cn } from "@/app/lib/helpers";

function Content({
  author,
  drophead,
  headline,
  release_date,
  slug,
}: {
  author: { name: string; slug: string };
  drophead: string;
  headline: string;
  release_date: string;
  slug: string;
}) {
  return (
    <div className="flex items-center mt-2.5 mx-auto ">
      <div className="space-y-2.5  @md:pr-20">
        <div className="relative space-y-2.5 @md:space-y-5 ">
          <div className="font-black text-2xl @md:text-3xl @lg:text-5xl text-black dark:text-white">
            <span className=" @md:dark:group-hover:shadow-[inset_0px_-18px_0px_#6d28d9]   @md:group-hover:shadow-[inset_0px_-24px_0px_#d0ff4b]">
              {headline}
            </span>
            <Link href={slug} className="absolute inset-0" />
          </div>
          <div className="text-black/80 dark:text-white">
            <span className="line-clamp-4 text-base @md:text-xl @5xl:text-xl">{drophead}</span>
          </div>
        </div>

        <AuthorDateDiscussion author={author} date={release_date} datetime={release_date} />
      </div>
    </div>
  );
}

function Thumb({ image, imageAlt, slug }: { image: string; imageAlt: string; slug: string }) {
  return (
    <div className="relative w-full aspect-[5/4] rounded-md overflow-hidden mx-auto border-black/30 dark:border-white/30 //border ">
      <Image
        src={image}
        alt={imageAlt}
        fill
        className="object-cover inset-0 rounded-sm"
        sizes="(min-width: 520px) 400px, calc(100vw - 20px)"
        placeholder="blur"
        blurDataURL={image}
        quality={100}
      />
      <Link href={slug} className="absolute inset-0" />
    </div>
  );
}

export default function Post3({
  author,
  className,
  drophead,
  headline,
  image,
  release_date,
  imageAlt,
  slug,
}: {
  author: { name: string; slug: string };
  className?: string;
  drophead: string;
  headline: string;
  image: string;
  release_date: string;
  imageAlt: string;
  slug: string;
}) {
  return (
    <div className={cn("relative border-b-black/30 dark:border-b-violet-700 group ", className)}>
      <Thumb image={image} imageAlt={imageAlt} slug={slug} />
      <Content author={author} drophead={drophead} headline={headline} release_date={release_date} slug={slug} />
    </div>
  );
}
