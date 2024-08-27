import { ImageType, PostData } from "@/app/lib/types";
import Image from "next/image";
import Link from "next/link";
import AuthorDateDiscussion from "../common/AuthorDateDiscussion";

function Content({ data }: { data: PostData }) {
  return (
    <div className="flex items-center  mx-auto">
      <div className="space-y-2.5 mr-10 sm:mr-0">
        <div className="relative space-y-2.5 @lg:space-y-5">
          <h2
            className="text-black dark:text-white"
            // style={{ textShadow: "0 0 40px rgb(0, 0, 0)" }}
          >
            <span className="dark:group-hover:shadow-[inset_0px_-16px_0px_#6d28d9]   group-hover:shadow-[inset_0px_-16px_0px_#d0ff4b]">
              {data.headline}
            </span>
            <Link href={data.slug} className="absolute inset-0" />
          </h2>
          <p className="text-black dark:text-white text-[18px] md:text-[20px] tracking-[.025em] line-clamp-4">
            {data.drophead}
          </p>
        </div>

        <AuthorDateDiscussion author={data.author} date={data.date} datetime={data.datetime} />
      </div>
    </div>
  );
}

function Thumb({ image, slug, byline }: { image: ImageType; slug: PostData["slug"]; byline: PostData["byline"] }) {
  return (
    <div className="relative w-full  //@lg:w-[360px] aspect-[3/2] rounded-sm  mx-auto">
      <Image
        src={image.href}
        alt={image.alt}
        fill
        className="object-cover inset-0 rounded-sm"
        sizes="(min-width: 520px) 400px, calc(100vw - 20px)"
        placeholder="blur"
        blurDataURL={image.href}
        quality={100}
      />
      <Link href={slug} className="absolute inset-0" />
      <span className="absolute top-2.5 right-2.5 //translate-x-1/2 z-10 dark:text-white dark:bg-violet-700 bg-black text-[#d0ff4b] px-3 py-2   uppercase text-[10px] font-light  leading-[1.2] tracking-[.15em]">
        {/* {byline} */}
        {/* <Link href={"/apple"} className="absolute inset-0" /> */}
        <span className="uppercase block text-center text-xl diagonal-fractions @lg:stacked-fractions">7/10</span>
        <span className="uppercase hidden @lg:block text-center text-white">scored</span>
      </span>
    </div>
  );
}

export default function Review1({ data }: { data: PostData }) {
  return (
    <article className="relative  p-2.5  @lg:max-w-lg  mx-auto border-b border-b-black/30 dark:border-b-violet-700 group py-5 space-y-5">
      <Thumb image={data.image} slug={data.slug} byline={data.byline} />
      <Content data={data} />
    </article>
  );
}
