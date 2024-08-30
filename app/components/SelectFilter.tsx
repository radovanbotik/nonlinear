"use client";

import { Popover, PopoverButton, PopoverPanel, PopoverGroup } from "@headlessui/react";
import { RiArrowDropDownFill } from "react-icons/ri";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "../lib/helpers";

export default function SelectFilter({
  name,
  title,
  options,
}: {
  name: string;
  title: string;
  options: {
    value: string;
    label: string;
  }[];
}) {
  const optionsWithId = options.map((option, i) => ({ ...option, id: `filter-${name}-option-${option.value}` }));

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace, push } = useRouter();

  const filter = searchParams.getAll(name);

  function handleSearch(name: string, value: string) {
    const params = new URLSearchParams(searchParams);
    if (filter.includes(value)) {
      params.delete(name, value);
    } else {
      params.append(name, value);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Popover className="relative inline-block text-left ">
      {({ open }) => (
        <>
          <div className="bg-gray-700/30 hover:bg-gray-700/70  bg-clip-padding backdrop-filter backdrop-blur-sm rounded-sm ">
            <PopoverButton
              className={cn(
                "group px-3  py-1 inline-flex    items-center justify-center text-sm font-medium text-gray-400 hover:text-gray-300 transition",
                filter.length > 0 && "text-teal-500 hover:text-teal-400"
                // open && "shadow-none outline-none border-0 ring-0 after:content-none before:content-none"
              )}
            >
              <span>{title}</span>
              {/* {filter.length > 0 ? (
                <div className="//grid place-content-center ml-1.5 rounded bg-gray-300  px-1 py-0.5 text-xs/3 font-semibold tabular-nums text-gray-700">
                  {filter.length}
                </div>
              ) : null} */}
              <RiArrowDropDownFill
                aria-hidden="true"
                className={cn(
                  "-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-300 transition -rotate-90",
                  open && "rotate-0",
                  filter.length > 0 && "text-teal-400 group-hover:text-teal-300"
                )}
              />
            </PopoverButton>
          </div>

          <PopoverPanel
            transition
            className="absolute left-0 z-10 mt-2 origin-top-right rounded-md bg-gray-700/40 hover:bg-gray-700/50 bg-clip-padding backdrop-filter backdrop-blur-md p-4 shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <form className="space-y-4">
              {optionsWithId.map((option, i) => (
                <div key={option.value} className="flex items-center">
                  <input
                    defaultValue={option.value}
                    defaultChecked={filter.includes(option.value)}
                    id={option.id}
                    name={option.id}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-teal-700  focus:ring-teal-600"
                    onClick={() => {
                      handleSearch(name, option.value);
                    }}
                  />
                  <label
                    htmlFor={option.id}
                    className={cn("ml-3 whitespace-nowrap pr-6 text-sm font-medium text-gray-50")}
                  >
                    {option.label}
                  </label>
                </div>
              ))}
            </form>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}
