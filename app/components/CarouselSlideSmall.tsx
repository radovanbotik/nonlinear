import Image from "next/image";
import Link from "next/link";
import { RiPlayFill, RiPlayListAddFill } from "react-icons/ri";
import ButtonWithDropdown from "./ButtonWithDropdown";
import Artists from "./Artists";

type TCarouselSlideSmall = {
  _id: string;
  title: string;
  image: string;
  label: { name: string; href: string };
  artists: { name: string; slug: string }[];
  slug: string;
};

export default function CarouselSlideSmall({ artists, _id, image, label, slug, title }: TCarouselSlideSmall) {
  return (
    <div key={_id} className="relative group/parent //shadow-lg bg-gray-700 //max-w-64 aspect-square">
      <div className="relative overflow-hidden transition-transform duration-75 ease-in-out group/image aspect-square">
        <Link className="inset-0 absolute" href={`/releases/${slug}`}></Link>
        <Image
          src={image}
          alt={`Image of ${title}`}
          className="block h-full w-full"
          fill
          placeholder="blur"
          blurDataURL={image}
          quality={100}
        />
        <div className="absolute bottom-0 left-0 //translate-y-full flex w-full bg-gray-950 opacity-0  //group-hover/parent:translate-y-0 group-hover/parent:opacity-100 transition">
          <div className="w-full flex justify-evenly">
            <button className="relative inline-block  //mx-auto group/button ">
              <RiPlayFill className="text-gray-300 w-4 h-4" />
              <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
            </button>

            <button className="relative inline-block  //mx-auto group/button ">
              <RiPlayListAddFill className="text-gray-300 w-4 h-4" />
              <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
            </button>
          </div>

          <ButtonWithDropdown
            title="$2.49"
            dropdownOptions={[
              { title: "option1", href: "#1" },
              { title: "option2", href: "#2" },
            ]}
            buttonStyles="bg-teal-600 text-gray-100 border-0 ring-0 hover:bg-teal-500 rounded-none"
            iconStyles="bg-teal-700 text-gray-100 border-0 ring-0 rounded-none"
            dropdownPaperStyles="bg-gray-700/60 hover:bg-gray-700/70 bg-clip-padding backdrop-filter backdrop-blur-sm"
            dropdownLinkStyles="text-gray-300"
          />
        </div>
      </div>

      <div className="bg-gray-700 p-2 space-y-0.5 isolate">
        <div className="overflow-hidden leading-none ">
          <Link className="font-bold text-white text-sm/4 truncate" href={`/releases/${slug}`}>
            {title}
          </Link>
        </div>
        <div className="overflow-hidden leading-none truncate">
          <Artists artists={artists} className="text-xs text-neutral-400 tracking-tight" />
        </div>
        <div className="overflow-hidden leading-none truncate">
          <Link className="text-xs text-neutral-400 tracking-tight" href={`/label/${label.href}`}>
            {label.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
