"use client";
import { usePathname } from "next/navigation";
import { cn } from "../lib/helpers";
import { ReactElement } from "react";

function isCurrent(href: string, pathname: string) {
  return href === pathname;
}

export default function VerticalNavigation({
  navigation,
}: {
  navigation: { name: string; href: string; icons: { current: ReactElement; default: ReactElement }; count?: number }[];
}) {
  const pathname = usePathname();

  console.log(pathname);

  return (
    <div aria-label="Sidebar" className="flex flex-1 flex-col">
      <ul role="list" className="//-mx-2 divide-y-2 divide-gray-800 //space-y-1">
        {navigation.map(item => (
          <li
            key={item.name}
            className={cn("relative [&:not(:last-child)]:shadow", isCurrent(item.href, pathname) && "")}
          >
            <div
              className={cn("absolute w-1 h-full bg-teal-400 ", isCurrent(item.href, pathname) ? "block" : "hidden")}
            ></div>
            <a
              href={item.href}
              className={cn(
                "group flex items-center gap-x-3 //rounded-md py-3 px-5",
                isCurrent(item.href, pathname)
                  ? "bg-gray-700 text-teal-400"
                  : "text-gray-100 hover:bg-gray-600 hover:text-gray-300"
              )}
            >
              {isCurrent(item.href, pathname) ? item.icons.current : item.icons.default}

              <span className="text-sm tracking-wide">{item.name}</span>
              {item.count ? (
                <span
                  aria-hidden="true"
                  className="ml-auto grid place-content-center w-6 min-w-max whitespace-nowrap rounded-full bg-gray-200 px-2.5 py-0.5 text-center text-xs font-medium  text-gray-600 ring-1 ring-inset ring-gray-200"
                >
                  {item.count}
                </span>
              ) : null}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
