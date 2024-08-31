import Image from "next/image";
import Link from "next/link";
import Artists from "./Artists";

export default function MediaObject({
  artists,
  image,
  title,
  slug,
}: {
  artists: { name: string; slug: string }[];
  image: string;
  slug: string;
  title: string;
}) {
  return (
    <div className="flex ">
      <div className="mr-4 flex-shrink-0 relative  max-w-full">
        <Image
          src={image}
          alt={`Image of ${title}`}
          className="drop-shadow-xl shadow-xl "
          width={40}
          height={40}
          placeholder="blur"
          blurDataURL={image}
          quality={100}
        />
        <Link href={`/releases/${slug}`} className="absolute inset-0"></Link>
        {/* <svg
          fill="none"
          stroke="currentColor"
          viewBox="0 0 200 200"
          preserveAspectRatio="none"
          aria-hidden="true"
          className="h-10 w-10 border border-gray-300 bg-white text-gray-300"
        >
          <path d="M0 0l200 200M0 200L200 0" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        </svg> */}
      </div>
      <div className="truncate">
        <div className="text-sm font-medium text-gray-50">{title}</div>
        <div className="//mt-1 text-xs  tracking-tight text-teal-400">
          <Artists artists={artists} />
        </div>
      </div>
    </div>
  );
}
