import Link from "next/link";
import Artists from "./Artists";

import { RiAddLargeFill, RiArrowDropRightLine, RiArrowRightLine, RiPlayFill } from "react-icons/ri";
import { RiPlayListAddFill } from "react-icons/ri";
import ButtonWithDropdown from "./ButtonWithDropdown";
import { ReactElement } from "react";
import Image from "next/image";

type TChartItem = {
  artists: { name: string; slug: string }[];
  itemIndex?: number;
  image?: { alt: string; src: string };
  itemHref: string;
  itemTitle: string;
  label: { name: string; href: string };
};

type TChart = {
  chartItems: {
    artists: { name: string; slug: string }[];
    _id: string;
    image: string;
    label: { name: string; href: string };
    slug: string;
    title: string;
  }[];
  footer?: { title: string; href: string };
  header: string | ReactElement;
  style: "basic" | "withImage";
};

function ChartItem({ itemIndex, image, itemHref, itemTitle, artists, label }: TChartItem) {
  return (
    <div className="flex relative items-center group hover:bg-gray-600 py-2 px-2 overflow-hidden h-20">
      <div className="flex-shrink-0 relative flex items-center">
        {image && (
          <div>
            <Image
              src={image.src}
              alt={image.alt}
              width={48}
              height={48}
              placeholder="blur"
              blurDataURL={image.src}
              quality={100}
              className="h-full w-12"
            />
            <Link href={`/releases/${itemHref}`} className="absolute inset-0"></Link>
          </div>
        )}
        <div className="relative group">
          <div className="text-gray-400 text-xl/8 w-9 flex place-content-center tabular-nums  opacity-100 group-hover:opacity-0">
            {itemIndex}
          </div>

          <button className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 group/button  opacity-0 group-hover:opacity-100">
            <RiPlayFill className="text-gray-300 w-4 h-4" />
            <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
          </button>
        </div>
      </div>
      <div className="truncate text-xs/4">
        <Link href={itemHref} className="font-bold text-gray-50  text-sm/4 ">
          {itemTitle}
        </Link>
        <Artists artists={artists} />
        <Link
          href={`/labels/${label.href}`}
          className="block text-xs  tracking-tight text-gray-400 hover:text-gray-300"
        >
          {label.name}
        </Link>
      </div>
      <div className="absolute w-fit h-full top-0 px-4 bg-gray-700/60  bg-clip-padding backdrop-filter backdrop-blur-sm right-0 translate-x-full  flex items-center gap-2 opacity-0  group-hover:translate-x-0 group-hover:opacity-100 transition">
        <button className="relative inline-block  //mx-auto group/button ">
          <RiPlayListAddFill className="text-gray-300 w-4 h-4" />
          <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
        </button>

        <button className="relative inline-block  //mx-auto group/button ">
          <RiAddLargeFill className="text-gray-300 w-4 h-4" />
          <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
        </button>

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
  );
}

export default function Chart({ chartItems, footer, header, style }: TChart) {
  return (
    <div className="flex flex-col px-2 py-4  bg-gray-700/50">
      <div className="flex items-center w-full pb-2 border-b-[1px] border-b-gray-600 text-gray-50 font-medium text-xl/7 tracking-wide">
        {header}
      </div>
      <ul role="list" className="">
        {chartItems.map((item, i) => (
          <li key={item._id} className="relative first-of-type:pt-4 last-of-type:pb-4">
            <ChartItem
              itemIndex={i + 1}
              artists={item.artists}
              itemHref={item.slug}
              itemTitle={item.title}
              label={item.label}
              image={style === "withImage" ? { src: item.image, alt: `Artwork for ${item.title}` } : undefined}
            />
          </li>
        ))}
      </ul>
      {footer && (
        <Link
          href={footer.href}
          className="flex items-center font-bold text-xs/4 self-end justify-self-end text-gray-50"
        >
          {footer.title}
          <RiArrowDropRightLine className="h-4 w-4 inline-block" />
        </Link>
      )}
    </div>
  );
}
