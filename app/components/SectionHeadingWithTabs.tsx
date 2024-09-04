"use client";

import Link from "next/link";
import { cn } from "../lib/helpers";
import { usePathname } from "next/navigation";

function isCurrent(pathname: string, href: string) {
  return pathname === href;
}

export default function SectionHeadingWithTabs({
  responsive = false,
  tabs,
  title,
}: {
  responsive: boolean;
  tabs: { name: string; href: string }[];
  title: string;
}) {
  const pathname = usePathname();

  return (
    <div className="pb-5 sm:pb-3">
      <div className="text-3xl font-medium capitalize text-gray-50">{title}</div>
      <div className="mt-1 sm:mt-3">
        {responsive && (
          <div className="sm:hidden">
            <label htmlFor="current-tab" className="sr-only">
              Select a tab
            </label>
            <select
              id="current-tab"
              name="current-tab"
              defaultValue={tabs.find(tab => isCurrent(pathname, tab.href))?.name}
              className="block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base //focus:border-indigo-500 focus:outline-none //focus:ring-indigo-500 sm:text-sm"
            >
              {tabs.map(tab => (
                <option key={tab.name}>{tab.name}</option>
              ))}
            </select>
          </div>
        )}
        <div className={cn(responsive ? "hidden sm:block" : "")}>
          <nav className="-mb-px flex space-x-4">
            {tabs.map(tab => (
              <Link
                key={tab.name}
                href={tab.href}
                aria-current={isCurrent(pathname, tab.href) ? "page" : undefined}
                className={cn(
                  "whitespace-nowrap border-b-[1px] text-gray-300  pb-px text-base font-medium tracking-tight group",
                  isCurrent(pathname, tab.href)
                    ? "border-teal-400 //text-teal-400"
                    : "border-transparent   hover:text-gray-300"
                )}
              >
                <span>{tab.name}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
    </div>
  );
}
