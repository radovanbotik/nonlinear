import { ChevronRightIcon } from "@heroicons/react/20/solid";
import Image from "next/image";
import { ReleaseData } from "../genres/[slug]/releases/page";
import Link from "next/link";
import Artists from "./Artists";
import { formatDate } from "../helpers/formatDate";

const people = [
  {
    name: "Leslie Alexander",
    email: "leslie.alexander@example.com",
    role: "Co-Founder / CEO",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Michael Foster",
    email: "michael.foster@example.com",
    role: "Co-Founder / CTO",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Dries Vincent",
    email: "dries.vincent@example.com",
    role: "Business Relations",
    imageUrl:
      "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
    lastSeen: null,
  },
  {
    name: "Lindsay Walton",
    email: "lindsay.walton@example.com",
    role: "Front-end Developer",
    imageUrl:
      "https://images.unsplash.com/photo-1517841905240-472988babdf9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Courtney Henry",
    email: "courtney.henry@example.com",
    role: "Designer",
    imageUrl:
      "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
    lastSeen: "3h ago",
    lastSeenDateTime: "2023-01-23T13:23Z",
  },
  {
    name: "Tom Cook",
    email: "tom.cook@example.com",
    role: "Director of Product",
    imageUrl:
      "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    href: "#",
    lastSeen: null,
  },
];

//image
//title*artists double row
//label
//bpm
//release date
//action

//image
//name/email
//--
export default function StackedList({ data }: { data: ReleaseData[] }) {
  return (
    <ul role="list" className="space-y-1 ">
      {data.map(release => (
        <li
          key={release._id}
          className="relative group grid grid-cols-[max-content_1fr_1fr_1fr_max-content] gap-3  bg-gray-800/60 hover:bg-gray-800/70 bg-clip-padding backdrop-filter backdrop-blur-sm "
        >
          <Image
            alt={`artwork for ${release.title}`}
            src={release.image}
            width={40}
            height={40}
            placeholder="blur"
            blurDataURL={release.image}
            quality={100}
          />

          <div className="flex flex-col pt-0.5">
            <div className="text-xs font-semibold  text-gray-50 ">{release.title}</div>
            <div className=" flex text-xs leading-none text-teal-300 mt-1 ">
              <Artists artists={release.artists} className="truncate tracking-tight" />
            </div>
          </div>
          <div className="flex flex-col pt-0.5 bg-clip-padding backdrop-filter ">
            <div className="text-xs font-semibold  text-gray-300 ">95 - 120 BPM</div>
            <div className=" flex text-xs leading-none text-gray-400 mt-1 ">
              <div className="truncate tracking-tight">{release.label.name}</div>
            </div>
          </div>
          <div className="flex flex-col pt-0.5">
            <div className="text-xs font-semibold  text-gray-300 ">
              {formatDate(release.release_date, {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </div>
            <div className=" flex text-xs leading-none text-gray-400 mt-1 ">
              <div className="truncate tracking-tight">{release.catalog_number}</div>
            </div>
          </div>
          <div className="flex flex-col justify-center pt-0.5">
            <div className="text-xs font-semibold  text-gray-300 pr-3">
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
