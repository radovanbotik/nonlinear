"use client";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { RiArrowDropDownFill } from "react-icons/ri";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { cn } from "../lib/helpers";
import ensure from "../helpers/ensure";

export default function RadioFilter({
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
  const optionsWithId = options.map((option, i) => ({ ...option, id: `sort-${name}-option-${option.value}` }));

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  const filter = searchParams.get(name);

  function handleSearch(name: string, value: string) {
    const params = new URLSearchParams(searchParams);
    if (filter === value) {
      params.delete(name, value);
    } else {
      params.set(name, value);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <Popover className="relative inline-block text-left ">
      {({ open }) => (
        <>
          <div className="bg-gray-700/40 hover:bg-gray-700/70  bg-clip-padding backdrop-filter backdrop-blur-sm rounded-sm ">
            <PopoverButton
              className={cn(
                "group px-3  py-1 inline-flex    items-center justify-center text-sm font-medium text-gray-400 hover:text-gray-300 transition w-28",
                open && "text-gray-300",
                filter && "text-teal-500 hover:text-teal-400"
              )}
            >
              <span className="truncate">
                {filter ? ensure(optionsWithId.find(option => option.value === filter)).label : title}
              </span>
              <RiArrowDropDownFill
                aria-hidden="true"
                className={cn(
                  "//-mr-1 //ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-300 transition -rotate-90",
                  open && "rotate-0 text-gray-300",
                  filter && "text-teal-400 group-hover:text-teal-300"
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
                  <button
                    type="button"
                    // defaultValue={option.value}
                    // defaultChecked={filter === option.value}
                    // id={option.id}
                    // name={name}
                    // type="radio"
                    className={cn(
                      "whitespace-nowrap text-sm font-medium text-gray-400 hover:text-gray-100 ml-3 border-gray-300 focus:ring-teal-600 cursor-pointer pr-6",
                      filter === option.value && "text-teal-400"
                    )}
                    onClick={() => {
                      handleSearch(name, option.value);
                    }}
                  >
                    <span>{option.label}</span>
                  </button>
                </div>
              ))}
            </form>
          </PopoverPanel>
        </>
      )}
    </Popover>
  );
}
