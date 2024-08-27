"use client";

import { ReactNode, useCallback, useEffect, useRef, useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from "@heroicons/react/20/solid";
import { RiLayoutGridFill } from "react-icons/ri";
import { RiLayoutHorizontalFill } from "react-icons/ri";
import { RiArrowDropDownFill } from "react-icons/ri";
import { RiFilter2Fill } from "react-icons/ri";

import { cn } from "@/app/lib/helpers";
import { Container } from "../Container";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

const sortOptions = [
  { title: "Newest", value: "date" },
  { title: "Oldest", value: "-date" },
];
const subCategories = [
  { value: "bassline", title: "Bassline" },
  { value: "breakbeat", title: "Breakbeat" },
  { value: "drum-and-bass", title: "Drum&Bass" },
  { value: "dubstep", title: "Dubstep" },
  { value: "garage", title: "Garage" },
  { value: "grime", title: "Grime" },
  { value: "house", title: "House" },
  { value: "jungle", title: "Jungle" },
  { value: "techno", title: "Techno" },
];
const filters = [
  {
    id: "format",
    name: "Format",
    options: [
      { value: "album", label: "Album", checked: false },
      { value: "EP", label: "EP", checked: false },
    ],
  },
];

const formatOptions = [
  { value: "album", label: "Album" },
  { value: "ep", label: "EP" },
];

export default function Filter({ children }: { children: ReactNode }) {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [isGridLayout, setIsGridLayout] = useState(true);

  const { replace } = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const style = searchParams.get("style");
  const format = searchParams.get("format");
  const order_by = searchParams.get("order_by");

  function handleSearch(name: string, value: string) {
    const params = new URLSearchParams(searchParams);
    if (name === "style" && value === style) {
      params.delete(name, value);
      return replace(`${pathname}?${params.toString()}`);
    }
    if (value) {
      params.set(name, value);
    } else {
      params.delete(name, value);
    }
    replace(`${pathname}?${params.toString()}`);
  }

  return (
    <div className="">
      <div>
        {/* <Dialog open={mobileFiltersOpen} onClose={setMobileFiltersOpen} className="relative z-40 lg:hidden">
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-black bg-opacity-25 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 z-40 flex">
            <DialogPanel
              transition
              className="relative ml-auto flex h-full w-full max-w-xs transform flex-col overflow-y-auto  py-4 pb-12 shadow-xl transition duration-300 ease-in-out data-[closed]:translate-x-full"
            >
              <div className="flex items-center justify-between px-4">
                <h2 className="text-lg font-medium text-gray-900">Filters</h2>
                <button
                  type="button"
                  onClick={() => setMobileFiltersOpen(false)}
                  className="-mr-2 flex h-10 w-10 items-center justify-center rounded-md  p-2 text-gray-400"
                >
                  <span className="sr-only">Close menu</span>
                  <XMarkIcon aria-hidden="true" className="h-6 w-6" />
                </button>
              </div>

              <form className="mt-4 border-t border-gray-200">
                <h3 className="sr-only">Categories</h3>
                <ul role="list" className="px-2 py-3 font-medium text-gray-900">
                  {subCategories.map(category => (
                    <li key={category.name}>
                      <a href={category.href} className="block px-2 py-3">
                        {category.name}
                      </a>
                    </li>
                  ))}
                </ul>

                {filters.map(section => (
                  <Disclosure key={section.id} as="div" className="border-t border-gray-200 px-4 py-6">
                    <h3 className="-mx-2 -my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between  px-2 py-3 text-gray-400 hover:text-gray-500">
                        <span className="font-medium text-gray-900">{section.name}</span>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                          <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-6">
                        {section.options.map((option, optionIdx) => (
                          <div key={option.value} className="flex items-center">
                            <input
                              defaultValue={option.value}
                              defaultChecked={option.checked}
                              id={`filter-mobile-${section.id}-${optionIdx}`}
                              name={`${section.id}[]`}
                              type="checkbox"
                              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <label
                              htmlFor={`filter-mobile-${section.id}-${optionIdx}`}
                              className="ml-3 min-w-0 flex-1 text-gray-500"
                            >
                              {option.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </Disclosure>
                ))}
              </form>
            </DialogPanel>
          </div>
        </Dialog> */}

        <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
            <h1 className="text-4xl font-bold tracking-tight text-gray-900">Reviews</h1>

            <div className="flex items-center">
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <MenuButton className="group inline-flex justify-center text-sm font-medium text-gray-700 hover:text-gray-900">
                    Sort
                    {/* <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    /> */}
                    <RiArrowDropDownFill
                      aria-hidden="true"
                      className="-mr-1 ml-1 h-5 w-5 flex-shrink-0 text-gray-400 group-hover:text-gray-500"
                    />
                  </MenuButton>
                </div>

                <MenuItems
                  transition
                  className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md  shadow-2xl ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                >
                  <div className="py-1">
                    {sortOptions.map(option => (
                      <MenuItem key={option.title}>
                        <button
                          onClick={e => handleSearch("order_by", option.value)}
                          className={cn(
                            "block w-full text-start px-4 py-2 text-sm data-[focus]:bg-gray-100",
                            option.value === order_by ? "font-medium text-gray-900" : "text-gray-500"
                          )}
                        >
                          {option.title}
                        </button>
                      </MenuItem>
                    ))}
                  </div>
                </MenuItems>
              </Menu>

              <button
                type="button"
                className="hidden lg:inline-block -m-2 ml-5 p-2 text-gray-400 hover:text-gray-500 sm:ml-7"
                onClick={() => setIsGridLayout(prev => !prev)}
              >
                <span className="sr-only">View grid</span>
                <RiLayoutGridFill
                  aria-hidden="true"
                  className={cn("h-5 w-5", isGridLayout ? "inline-block" : "hidden")}
                />
                <RiLayoutHorizontalFill
                  aria-hidden="true"
                  className={cn("h-5 w-5", !isGridLayout ? "inline-block" : "hidden")}
                />
              </button>
              <button
                type="button"
                onClick={() => setMobileFiltersOpen(true)}
                className="-m-2 ml-4 p-2 text-gray-400 hover:text-gray-500 sm:ml-6 lg:hidden"
              >
                <span className="sr-only">Filters</span>
                {/* <FunnelIcon aria-hidden="true" className="h-5 w-5" /> */}
                <RiFilter2Fill aria-hidden="true" className="h-5 w-5" />
              </button>
            </div>
          </div>

          <section aria-labelledby="products-heading" className="pb-24 pt-6">
            <h2 id="products-heading" className="sr-only">
              Reviews
            </h2>

            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
              <form className="hidden lg:block">
                <h3 className="sr-only">Music style</h3>
                <ul
                  role="list"
                  className="flex flex-wrap gap-4 items-center justify-start //space-y-4 border-b border-gray-200 pb-6 text-sm font-medium text-gray-900"
                >
                  {subCategories.map(category => (
                    <li key={category.value} className={cn("px-1", style === category.value ? "bg-red-400" : "")}>
                      <button
                        type="button"
                        onClick={e => {
                          handleSearch("style", category.value);
                        }}
                      >
                        {category.title}
                      </button>
                    </li>
                  ))}
                </ul>

                <Disclosure as="div" className="border-b border-gray-200 py-6">
                  <fieldset>
                    <h3 className="-my-3 flow-root">
                      <DisclosureButton className="group flex w-full items-center justify-between  py-3 text-sm text-gray-400 hover:text-gray-500">
                        <legend className="text-sm font-semibold leading-6 text-gray-900 //font-medium //text-gray-900">
                          Format
                        </legend>
                        <span className="ml-6 flex items-center">
                          <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                          <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                        </span>
                      </DisclosureButton>
                    </h3>
                    <DisclosurePanel className="pt-6">
                      <div className="space-y-4">
                        {formatOptions.map(formatOption => (
                          <div key={formatOption.value} className="relative flex items-center">
                            <input
                              defaultChecked={format === formatOption.value}
                              id={formatOption.value}
                              name="format"
                              type="radio"
                              value={formatOption.value}
                              onClick={e => handleSearch(e.target.name, e.target.value)}
                              className="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                            />
                            <label
                              htmlFor={formatOption.value}
                              className="ml-3 block text-sm font-medium leading-6 text-gray-900"
                            >
                              {formatOption.label}
                            </label>
                          </div>
                        ))}
                      </div>
                    </DisclosurePanel>
                  </fieldset>
                </Disclosure>
              </form>

              {/* Product grid */}
              <div className="lg:col-span-3">
                <Container size="sm" className="@container">
                  <div
                    className={cn(
                      "[&>*]:flex [&>*]:flex-col [&>*]:gap-5",
                      isGridLayout
                        ? "lg:[&>*]:grid lg:[&>*]:grid-cols-2 lg:[&>*]:gap-5"
                        : "lg:[&>*]:flex lg:[&>*]:flex-col lg:[&>*]:gap-5"
                    )}
                  >
                    {children}
                  </div>
                </Container>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
