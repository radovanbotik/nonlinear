import Link from "next/link";
import ButtonWithDropdown from "./ButtonWithDropdown";
import Controls from "./Controls";
import Artists from "./Artists";
import Image from "next/image";
import { cn } from "../lib/helpers";

export type TCarouselSlideBig = {
  artists: { name: string; slug: string }[];
  className?: string;
  _id: string;
  image: string;
  label: { name: string; href: string };
  release_date: string;
  slug: string;
  title: string;
};

export default function CarouselSlideBig({
  artists,
  className,
  _id,
  image,
  label,
  release_date,
  slug,
  title,
}: TCarouselSlideBig) {
  return (
    <div
      className={cn(
        "relative w-full h-full flex items-center justify-center overflow-hidden group transition ease-in-out aspect-[4/3]",
        className
      )}
    >
      <div className=" cursor-grab absolute inset-0 bg-teal-600 //active:bg-teal-500 isolate after:-z-10 after:absolute after:bg-gradient-to-t from-gray-900/40 via-transparent to-gray-900/10 after:inset-0 after:w-full after:h-full after:pointer-events-none "></div>
      <div className="relative  max-w-full">
        <Image
          src={image}
          alt={`Image of ${title}`}
          className="drop-shadow-xl shadow-xl "
          width={300}
          height={300}
          placeholder="blur"
          blurDataURL={image}
          quality={100}
        />
        <Link href={`/releases/${slug}`} className="absolute inset-0"></Link>
      </div>
      <div className="isolate absolute bg-gray-900 z-20  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 w-full left-0 h-1/4 min-h-28 bottom-0  text-gray-50 flex flex-col gap-2 p-3 opacity-0 translate-y-full transition group-hover:translate-y-0 group-hover:opacity-100">
        <div>
          <Link href={`/releases/${slug}`} className="hover:underline text-xl font-medium leading-none">
            {title}
          </Link>
        </div>
        <div className="flex flex-wrap items-baseline mb-1">
          <Artists artists={artists} className="isolate text-sm leading-none tracking-tight" />
          <span className=" leading-none">&nbsp;&nbsp;</span>
          <Link href={`/labels/${label.href}`} className="text-xs  leading-none text-gray-400 ">
            {label.name}
          </Link>
        </div>
        <div className="flex items-center gap-3">
          <Controls />
          <ButtonWithDropdown
            title="$2.49"
            dropdownOptions={[
              { title: "option1", href: "#1" },
              { title: "option2", href: "#2" },
            ]}
            buttonStyles="bg-teal-600 text-gray-100 border-0 ring-0 hover:bg-teal-500"
            iconStyles="bg-teal-700 text-gray-100 border-0 ring-0"
            dropdownPaperStyles="bg-gray-700/60 hover:bg-gray-700/70 bg-clip-padding backdrop-filter backdrop-blur-sm"
            dropdownLinkStyles="text-gray-300"
          />
        </div>
      </div>
    </div>
  );
}
