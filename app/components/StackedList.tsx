import { RiPlayFill } from "react-icons/ri";
import { RiPlayListAddFill } from "react-icons/ri";
import { RiMoreFill } from "react-icons/ri";

import Image from "next/image";

import { ReleaseData } from "../genres/[slug]/releases/page";
import Link from "next/link";
import Artists from "./Artists";
import { formatDate } from "../helpers/formatDate";
import getMinMaxBPM from "../helpers/getMinMaxBPM";

export default function StackedList({ data }: { data: ReleaseData[] }) {
  return (
    <>
      <ul role="list" className="space-y-1 sm:gap-x-1 md:grid grid-cols-2 lg:block">
        {data.map(release => (
          <li
            key={release._id}
            className="relative group grid grid-cols-[max-content_max-content_1fr_max-content] lg:grid-cols-[max-content_max-content_max-content_1fr_1fr_1fr_max-content] gap-3  bg-gray-700/60 hover:bg-gray-700/70 bg-clip-padding backdrop-filter backdrop-blur-sm "
          >
            <div className="relative">
              <Link href={`/releases/${release.slug}`}>
                <Image
                  alt={`artwork for ${release.title}`}
                  src={release.image}
                  width={40}
                  height={40}
                  placeholder="blur"
                  blurDataURL={release.image}
                  quality={100}
                />
              </Link>
            </div>

            <div className="my-auto leading-[0] ">
              <button className="relative leading-0 group/button ">
                <RiPlayFill className="text-gray-300 w-4 h-4" />
                <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
              </button>
            </div>

            <div className="my-auto leading-[0]  hidden lg:block">
              <button className="hidden lg:inline-block relative leading-0 group/button ">
                <RiPlayListAddFill className="text-gray-300 w-4 h-4" />
                <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
              </button>
            </div>

            <div className="flex flex-col py-0.5">
              <div className="text-xs font-medium  text-gray-50 ">
                <Link href={`/releases/${release.slug}`}>{release.title}</Link>
              </div>
              <div className=" flex text-xs leading-none text-teal-300 mt-1 overflow-hidden">
                <Artists artists={release.artists} className="text-clip tracking-tight" />
              </div>
            </div>
            <div className="hidden lg:flex flex-col py-0.5 ">
              <div className="text-xs font-medium  text-gray-300 ">{getMinMaxBPM(release.tempos)}</div>
              <div className=" flex text-xs leading-none text-gray-400 mt-1 ">
                <div className="truncate tracking-tight">
                  <Link href={`/releases/${release.label.href}`}>{release.label.name}</Link>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex flex-col py-0.5">
              <div className="text-xs font-medium  text-gray-300 ">
                {formatDate(release.release_date, {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }).replaceAll("/", "-")}
              </div>
              <div className=" flex text-xs leading-none text-gray-400 mt-1 ">
                <div className="truncate tracking-tight">
                  <Link href={`/releases/${release.slug}`}>{release.catalog_number}</Link>
                </div>
              </div>
            </div>
            <div className="hidden lg:flex flex-col justify-center py-0.5">
              <div className="text-xs font-medium  text-gray-300 pr-3">
                <button className="px-3 py-1.5 rounded-sm bg-teal-800 group-hover:bg-teal-600 active:!bg-teal-500">
                  download
                </button>
              </div>
            </div>

            <div className="my-auto min-w-4 pr-3 leading-[0] flex  gap-1 lg:hidden">
              <button className="relative leading-0 group/button ">
                <RiMoreFill className="text-gray-300 w-4 h-4" />
                <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
              </button>
            </div>
          </li>
        ))}
      </ul>
    </>
  );
}
