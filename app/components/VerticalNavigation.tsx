import {
  CalendarIcon,
  ChartPieIcon,
  DocumentDuplicateIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

import { RiHeart3Line } from "react-icons/ri";
import { RiHeart3Fill } from "react-icons/ri";

import { RiPlayList2Line } from "react-icons/ri";
import { RiPlayList2Fill } from "react-icons/ri";

import { RiDownload2Line } from "react-icons/ri";
import { RiDownload2Fill } from "react-icons/ri";

import { RiListUnordered } from "react-icons/ri";

import { cn } from "../lib/helpers";
import { ReactNode } from "react";

const navigation = [
  { name: "Favourites", href: "#", icon: RiHeart3Fill, current: true },
  { name: "Collection", href: "#", icon: RiListUnordered, current: false },
  { name: "Downloads", href: "#", icon: RiDownload2Line, count: "12", current: false },
  { name: "Playlist", href: "#", icon: RiPlayList2Line, count: "12", current: false },
];

export default function VerticalNavigation({
  navigationa,
}: {
  navigationa: { name: string; href: string; icon: ReactNode; count: number }[];
}) {
  return (
    <nav aria-label="Sidebar" className="flex flex-1 flex-col">
      <ul role="list" className="//-mx-2 divide-y-2 divide-gray-800 //space-y-1">
        {navigation.map(item => (
          <li key={item.name}>
            <a
              href={item.href}
              className={cn(
                item.current ? "bg-gray-700 text-teal-400" : "text-gray-100 hover:bg-gray-600 hover:text-gray-300",
                "group flex gap-x-3 //rounded-md py-3 px-5 text-sm //font-medium leading-6"
              )}
            >
              <item.icon
                aria-hidden="true"
                className={cn(
                  item.current ? "text-teal-400" : "text-gray-100 group-hover:text-gray-300",
                  "h-5 w-5 shrink-0"
                )}
              />
              {item.name}
              {item.count ? (
                <span
                  aria-hidden="true"
                  className="ml-auto w-9 min-w-max whitespace-nowrap rounded-full bg-white px-2.5 py-0.5 text-center text-xs font-medium leading-5 text-gray-600 ring-1 ring-inset ring-gray-200"
                >
                  {item.count}
                </span>
              ) : null}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
