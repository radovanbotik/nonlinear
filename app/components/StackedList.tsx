import { RiPlayFill } from "react-icons/ri";
import { RiPlayListAddFill } from "react-icons/ri";

import Image from "next/image";

import { ReleaseData } from "../genres/[slug]/releases/page";
import Link from "next/link";
import Artists from "./Artists";
import { formatDate } from "../helpers/formatDate";
import getMinMaxBPM from "../helpers/getMinMaxBPM";

export default function StackedList({ data }: { data: ReleaseData[] }) {
  return (
    <ul role="list" className="space-y-1 ">
      {data.map(release => (
        <li
          key={release._id}
          className="relative group grid grid-cols-[max-content_max-content_max-content_1fr_1fr_1fr_max-content] gap-3  bg-gray-700/60 hover:bg-gray-700/70 bg-clip-padding backdrop-filter backdrop-blur-sm "
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

          <button className="relative leading-0 group/button ">
            <RiPlayFill className="text-gray-300 w-4 h-4" />
            <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
          </button>

          <button className="relative leading-0 group/button ">
            <RiPlayListAddFill className="text-gray-300 w-4 h-4" />
            <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
          </button>

          <div className="flex flex-col pt-0.5">
            <div className="text-xs font-medium  text-gray-50 ">
              <Link href={`/releases/${release.slug}`}>{release.title}</Link>
            </div>
            <div className=" flex text-xs leading-none text-teal-300 mt-1 ">
              <Artists artists={release.artists} className="truncate tracking-tight" />
            </div>
          </div>
          <div className="flex flex-col pt-0.5 bg-clip-padding backdrop-filter ">
            <div className="text-xs font-medium  text-gray-300 ">{getMinMaxBPM(release.tempos)}</div>
            <div className=" flex text-xs leading-none text-gray-400 mt-1 ">
              <div className="truncate tracking-tight">
                <Link href={`/releases/${release.label.href}`}>{release.label.name}</Link>
              </div>
            </div>
          </div>
          <div className="flex flex-col pt-0.5">
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
          <div className="flex flex-col justify-center pt-0.5">
            <div className="text-xs font-medium  text-gray-300 pr-3">
              <button className="px-3 py-1 rounded-sm bg-teal-800 group-hover:bg-teal-600 active:!bg-teal-500">
                download
              </button>
            </div>
            {/* <div className=" flex text-xs leading-none text-gray-400 mt-1 ">
              <div className="truncate tracking-tight">{release.catalog_number}</div>
            </div> */}
          </div>

          {/* <div className="flex items-center justify-between gap-x-4  sm:flex-none">
            <div className="hidden sm:block">
              <p className="text-sm leading-6 text-gray-900">{person.role}</p>
              {person.lastSeen ? (
                <p className="mt-1 text-xs leading-5 text-gray-500">
                  Last seen <time dateTime={person.lastSeenDateTime}>{person.lastSeen}</time>
                </p>
              ) : (
                <div className="mt-1 flex items-center gap-x-1.5">
                  <div className="flex-none rounded-full bg-emerald-500/20 p-1">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  </div>
                  <p className="text-xs leading-5 text-gray-500">Online</p>
                </div>
              )}
            </div>
            <ChevronRightIcon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
          </div> */}
        </li>
      ))}
    </ul>
  );
}
