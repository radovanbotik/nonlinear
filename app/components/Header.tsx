"use client";

import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
} from "@headlessui/react";
import { Container } from "./Container";
import logowhite from "../../public/logowhite.png";
import Image from "next/image";
import Link from "next/link";

import { RiMenuFill } from "react-icons/ri";
import { RiSearchLine } from "react-icons/ri";
import { RiUser3Line } from "react-icons/ri";
import { RiAddFill } from "react-icons/ri";
import { RiSubtractFill } from "react-icons/ri";
import { RiCloseFill } from "react-icons/ri";
import { cn } from "../lib/helpers";

import { AnimatePresence, easeOut, motion } from "framer-motion";
import NavLink from "./common/NavLink";
import CommandPallette from "./commandpallet/CommandPallet";

const navigation = [
  { name: "Articles", href: "/articles" },
  { name: "Genres", href: "/genres" },
  { name: "Releases", href: "/releases" },
  { name: "Reviews", href: "/reviews" },
  { name: "Tutorials", href: "/tutorials" },
];

const navigations = [
  { name: "Home", href: "/", current: true },
  {
    name: "Articles",
    current: false,
    children: [
      { name: "All News", href: "#" },
      { name: "News", href: "#" },
      { name: "Reviews", href: "/reviews" },
      { name: "Tech", href: "#" },
    ],
    href: "News",
  },
  {
    name: "Music",
    current: false,
    children: [
      { name: "Artists", href: "/artists" },
      { name: "Mixes", href: "/mixes" },
      { name: "Reviews", href: "/reviews" },
      { name: "Releases", href: "/releases" },
    ],
    href: "Music",
  },
  { name: "Reviews", href: "/reviews", current: false },
  { name: "Tutorials", href: "#", current: false },
  // { name: "Reports", href: "#", current: false },
];

export default function Example() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  // const [isSearching,setIsSearching] = useState(false)

  return (
    <header className=" bg-gray-950 text-gray-50 border-b-[1px] border-b-gray-300">
      <Container size="xl">
        <nav aria-label="Global" className="mx-auto flex items-center //justify-between //p-6 //lg:px-8 h-16">
          <div className="flex items-center gap-x-7">
            <Link href="/" className="-m-1.5 //p-1.5">
              <span className="sr-only">Your Company</span>
              <Image alt="logowhite" width={40} height={40} src={logowhite} />
            </Link>
            <div className="hidden lg:flex lg:gap-x-7 items-center">
              {navigation.map(item => (
                <Link key={item.name} href={item.href} className="text-sm //font-semibold //leading-6 //text-gray-900">
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          {/* SEARCHBAR */}
          {/* <RiSearchLine className="h-5 w-5 ml-auto lg:ml-7" /> */}
          <CommandPallette />
          <div className="hidden lg:flex ml-auto">
            <button className="flex items-center gap-2 text-sm //font-semibold //leading-6 //text-gray-900">
              <span aria-hidden="true">
                <RiUser3Line className="h-6 w-6 sm:h-4 sm:w-4" />
              </span>
              <span>My account</span>
            </button>
          </div>
          {/* SIDEBAR ICON */}
          <div className="flex //lg:hidden ml-7">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 //text-gray-700"
            >
              <span className="sr-only">Open main menu</span>
              <RiMenuFill aria-hidden="true" className="h-6 w-6 sm:h-4 sm:w-4" />
              {/* <Bars3Icon aria-hidden="true" className="h-6 w-6" /> */}
            </button>
          </div>
        </nav>
      </Container>

      <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full //pl-10">
              <DialogPanel
                transition
                className="pointer-events-auto w-screen max-w-md transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
              >
                <div className="flex h-full flex-col overflow-y-scroll bg-black  //py-6 shadow-xl">
                  <div className="px-4 sm:px-6">
                    <div className="flex items-center justify-between h-16">
                      <DialogTitle className="text-base font-semibold leading-6 text-white">
                        {/* Panel title */}
                        <Image alt="logowhite" src={logowhite} className="h-7 w-auto" />
                      </DialogTitle>
                      <div className="ml-3 flex h-7 items-center">
                        <button
                          type="button"
                          onClick={() => setMobileMenuOpen(false)}
                          className="relative rounded-md //bg-white text-white/90 hover:text-white  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                          <span className="absolute -inset-2.5" />
                          <span className="sr-only">Close panel</span>
                          {/* <XMarkIcon aria-hidden="true" className="h-6 w-6" /> */}
                          <RiCloseFill aria-hidden="true" className="h-6 w-6" />
                        </button>
                      </div>
                    </div>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    {/* Your content */}
                    <nav className="flex flex-1 flex-col">
                      <ul role="list" className="flex flex-1 flex-col gap-y-7">
                        <li>
                          <ul role="list" className="-mx-2 space-y-2.5">
                            {navigations.map(item => (
                              <li key={item.name}>
                                {!item.children ? (
                                  <NavLink
                                    href={item.href}
                                    className={cn(
                                      "block //rounded-md py-2 pl-10 pr-2 text-2xl font-medium leading-6 text-white/80 hover:bg-gray-50 hover:text-black"
                                      // item.current ? "bg-gray-50 text-black" : "hover:bg-gray-50 hover:text-black"
                                    )}
                                    activeStyling="bg-gray-50 text-black"
                                    onClick={() => setMobileMenuOpen(false)}
                                  >
                                    {item.name}
                                  </NavLink>
                                ) : (
                                  <Disclosure as="div">
                                    {({ open }) => (
                                      <>
                                        <DisclosureButton
                                          className={cn(
                                            "group flex w-full justify-between items-center gap-x-3 //rounded-md pl-10 py-2 pr-2 text-left text-2xl font-medium leading-6 text-white/80",
                                            item.current ? "bg-gray-50 text-black" : "hover:bg-gray-50 hover:text-black"
                                          )}
                                        >
                                          <span className="inline-block">{item.name}</span>
                                          <RiAddFill
                                            aria-hidden="true"
                                            className="h-5 w-5 shrink-0 text-gray-400 group-data-[open]:hidden //group-data-[open]:text-gray-500"
                                          />
                                          <RiSubtractFill
                                            aria-hidden="true"
                                            className="h-5 w-5 shrink-0 text-gray-400 hidden group-data-[open]:inline-block //group-data-[open]:text-gray-500"
                                          />
                                        </DisclosureButton>
                                        <AnimatePresence>
                                          {open && (
                                            <DisclosurePanel as="ul" className="mt-1 px-4">
                                              {item.children.map(subItem => (
                                                <motion.li
                                                  key={subItem.name}
                                                  initial={{ opacity: 0 }}
                                                  animate={{ opacity: 1 }}
                                                  exit={{ opacity: 0 }}
                                                  transition={{ duration: 0.5, ease: easeOut }}
                                                  className="origin-top"
                                                >
                                                  <DisclosureButton
                                                    as={NavLink}
                                                    href={subItem.href}
                                                    className={cn(
                                                      "block //rounded-md py-2 pl-10 pr-2 text-2xl font-medium leading-6 text-white/80 hover:bg-gray-50 hover:text-black"
                                                      // item.current ? "bg-gray-50 text-black" : "hover:bg-gray-50 hover:text-black"
                                                    )}
                                                    activeStyling="bg-gray-50 text-black"
                                                    onClick={() => setMobileMenuOpen(false)}
                                                  >
                                                    {subItem.name}
                                                  </DisclosureButton>
                                                </motion.li>
                                              ))}
                                            </DisclosurePanel>
                                          )}
                                        </AnimatePresence>
                                      </>
                                    )}
                                  </Disclosure>
                                )}
                              </li>
                            ))}
                          </ul>
                        </li>
                        {/* --------------- ACCOUNT -------------- */}
                        {/* <li className="-mx-6 mt-auto">
                          <a
                            href="#"
                            className="flex items-center gap-x-4 px-6 py-3 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                          >
                            <img
                              alt=""
                              src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                              className="h-8 w-8 rounded-full bg-gray-50"
                            />
                            <span className="sr-only">Your profile</span>
                            <span aria-hidden="true">Tom Cook</span>
                          </a>
                        </li> */}
                      </ul>
                    </nav>
                  </div>
                </div>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </header>
  );
}
