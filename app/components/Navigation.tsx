import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from "@headlessui/react";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import { ChevronDownIcon, PhoneIcon, PlayCircleIcon } from "@heroicons/react/20/solid";
import {
  ArrowPathIcon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
} from "@heroicons/react/24/outline";

import { MagnifyingGlassIcon } from "@heroicons/react/20/solid";
import { Bars3Icon, BellIcon, XMarkIcon } from "@heroicons/react/24/outline";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

import { RiMenuFill } from "react-icons/ri";
import { RiSearchLine } from "react-icons/ri";
import { RiUser3Line } from "react-icons/ri";
import { RiAddFill } from "react-icons/ri";
import { RiSubtractFill } from "react-icons/ri";
import { RiCloseFill } from "react-icons/ri";
import { Container } from "./Container";

type TNavigation = {
  logo: { src: string | StaticImageData; alt: string };
  siteNavigation: { href?: string; title: string; children?: { href: string; title: string }[] }[];
  profileNavigation: { href: string; title: string }[];
  user?: {};
};

export default function Navigation({ logo, siteNavigation, profileNavigation, user }: TNavigation) {
  const siteNavigationLinks = siteNavigation.map(path => {
    if (path.href && !path.children) {
      return (
        <Link
          className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 //hover:bg-gray-700 hover:text-teal-300"
          href={path.href}
          key={path.href}
        >
          {path.title}
        </Link>
      );
    }
    if (path.children) {
      return (
        <Popover className="relative isolate z-50 bg-red-900">
          <PopoverButton className="inline-flex items-center gap-x-1 rounded-md px-3 py-2 text-sm font-medium text-gray-300 //hover:bg-gray-700 hover:text-teal-300">
            <span>{path.title}</span>
            <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
          </PopoverButton>

          <PopoverPanel
            transition
            className="//max-w-screen-2xl  w-max absolute inset-x-0 top-12 -z-10 //bg-gray-950/50 bg-red-500  //bg-clip-padding //backdrop-filter //backdrop-blur-sm pt-0 shadow-lg ring-1 ring-gray-900/5 transition data-[closed]:-translate-y-1 data-[closed]:opacity-0 data-[enter]:duration-200 data-[leave]:duration-150 data-[enter]:ease-out data-[leave]:ease-in"
          >
            <div className="mx-auto max-w-7xl grid gap-x-8 grid-cols-4  //divide-y-2 w-max">
              {path.children.map(item => (
                <div
                  key={item.href}
                  className="group relative flex gap-x-6 //rounded-lg px-3 py-4 text-gray-50 text-sm bg-pink-400 hover:text-teal-400 border-b"
                >
                  {/* <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                  <item.icon aria-hidden="true" className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" />
                </div> */}
                  <div>
                    <Link href={item.href} className="font-semibold ">
                      {item.title}
                      <span className="absolute inset-0" />
                    </Link>
                    {/* <p className="mt-1 text-gray-600">{item.description}</p> */}
                  </div>
                </div>
              ))}
              {/* <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-gray-50">
            {callsToAction.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center justify-center gap-x-2.5 p-3 font-semibold text-gray-900 hover:bg-gray-100"
              >
                <item.icon aria-hidden="true" className="h-5 w-5 flex-none text-gray-400" />
                {item.name}
              </a>
            ))}
          </div> */}
            </div>
          </PopoverPanel>
        </Popover>
      );
      //   path.children.map(childPath => {
      //     return (

      //       <Link href={childPath.href} key={childPath.href}>
      //         {childPath.title}
      //       </Link>
      //     );
      //   });
    }
  });

  const mobileSiteNavigationLinks = siteNavigation.map(path => {
    if (path.href && !path.children) {
      return (
        <DisclosureButton
          as={Link}
          href={path.href}
          className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 //hover:bg-gray-700 hover:text-white"
          key={path.href}
        >
          {path.title}
        </DisclosureButton>
      );
    }
    if (!path.href && path.children) {
      path.children.map(childPath => {
        return (
          <Link href={childPath.href} key={childPath.href}>
            {childPath.title}
          </Link>
        );
      });
    }
  });

  const profileNavigationLinks = profileNavigation.map(path => {
    return (
      <MenuItem key={path.href}>
        <Link href={path.href} className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100">
          {path.title}
        </Link>
      </MenuItem>
    );
  });
  const mobileProfileNavigationLinks = profileNavigation.map(path => {
    return (
      <DisclosureButton
        as={Link}
        className="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
        href={path.href}
        key={path.href}
      >
        {path.title}
      </DisclosureButton>
    );
  });

  return (
    <Disclosure as="nav" className="bg-gray-950 border-b-[1px] border-b-gray-600">
      <Container size="xl">
        <div className="relative flex h-14 items-center justify-between">
          <div className="flex items-center px-2 lg:px-0">
            <div className="flex-shrink-0">
              <Image alt={logo.alt} src={logo.src} height={32} className="h-8 w-auto" />
            </div>
            <div className="hidden lg:ml-6 lg:block">
              <div className="flex space-x-0">
                {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                {siteNavigationLinks}
              </div>
            </div>
          </div>
          <div className="flex flex-1 justify-center px-2 lg:ml-6 lg:justify-end">
            <div className="w-full max-w-lg lg:max-w-xs">
              <label htmlFor="search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon aria-hidden="true" className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="search"
                  name="search"
                  type="search"
                  placeholder="Search"
                  className="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-gray-300 placeholder:text-gray-400 focus:bg-white focus:text-gray-900 focus:ring-0 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
          </div>
          <div className="flex lg:hidden">
            {/* Mobile menu button */}
            <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
              <span className="absolute -inset-0.5" />
              <span className="sr-only">Open main menu</span>
              <RiMenuFill aria-hidden="true" className="block h-6 w-6 group-data-[open]:hidden" />
              <RiCloseFill aria-hidden="true" className="hidden h-6 w-6 group-data-[open]:block" />
            </DisclosureButton>
          </div>
          {user && (
            <>
              <div className="hidden lg:ml-4 lg:block">
                <div className="flex items-center">
                  <button
                    type="button"
                    className="relative flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="h-6 w-6" />
                  </button>

                  {/* Profile dropdown */}
                  <Menu as="div" className="relative ml-4 flex-shrink-0">
                    <div>
                      <MenuButton className="relative flex rounded-full bg-gray-800 text-sm text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800">
                        <span className="absolute -inset-1.5" />
                        <span className="sr-only">Open user menu</span>
                        <Image
                          alt=""
                          src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          className="h-8 w-8 rounded-full"
                        />
                      </MenuButton>
                    </div>
                    <MenuItems
                      transition
                      className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                    >
                      {profileNavigationLinks}
                    </MenuItems>
                  </Menu>
                </div>
              </div>
            </>
          )}
        </div>

        <DisclosurePanel className="lg:hidden">
          <div className="space-y-1 px-2 pb-3 pt-2">
            {/* Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
            {mobileSiteNavigationLinks}
          </div>
          <div className="border-t border-gray-700 pb-3 pt-4">
            {user && (
              <>
                <div className="flex items-center px-5">
                  <div className="flex-shrink-0">
                    <img
                      alt=""
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                  <div className="ml-3">
                    <div className="text-base font-medium text-white">Tom Cook</div>
                    <div className="text-sm font-medium text-gray-400">tom@example.com</div>
                  </div>
                  <button
                    type="button"
                    className="relative ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                  >
                    <span className="absolute -inset-1.5" />
                    <span className="sr-only">View notifications</span>
                    <BellIcon aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
                <div className="mt-3 space-y-1 px-2">{mobileProfileNavigationLinks}</div>
              </>
            )}
          </div>
        </DisclosurePanel>
      </Container>
    </Disclosure>
  );
}
