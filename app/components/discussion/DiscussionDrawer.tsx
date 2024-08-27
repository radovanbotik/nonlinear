"use client";

import { useState } from "react";
import { Dialog, DialogBackdrop, DialogPanel, DialogTitle, TransitionChild } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

import { RiChat4Fill } from "react-icons/ri";
import { RiCloseFill } from "react-icons/ri";

import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import TextArea from "../common/TextArea";

export default function DiscussionDrawer() {
  const [open, setOpen] = useState(false);

  function openDrawer() {
    if (open) return;
    else {
      setOpen(true);
    }
  }

  return (
    <>
      <button
        className="inline-flex gap-1  dark:hover:text-white/70 hover:text-black/70 px-2 py-1 border border-black/50 rounded-sm"
        onClick={openDrawer}
      >
        <div className="p-1">
          <RiChat4Fill className="h-3 w-3 text-teal-600" />
        </div>
        <span className="inline-block text-sm self-center 0">
          <span>Chat&nbsp;</span>
          <span className="text-teal-600">(24)</span>
        </span>
      </button>
      <Dialog open={open} onClose={setOpen} className="fixed inset-0 overflow-hidden z-50">
        <div className="absolute inset-0 overflow-hidden">
          <DialogBackdrop
            transition
            className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-500 ease-in-out data-[closed]:opacity-0"
          />

          <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full //pl-10">
            <DialogPanel
              transition
              className="pointer-events-auto relative w-screen max-w-2xl transform transition duration-500 ease-in-out data-[closed]:translate-x-full sm:duration-700"
            >
              <TransitionChild>
                <div className="absolute left-0 top-0 -ml-8 flex pr-2 pt-4 duration-500 ease-in-out data-[closed]:opacity-0 sm:-ml-10 sm:pr-4">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="relative rounded-md text-gray-300 hover:text-white focus:outline-none focus:ring-2 focus:ring-white"
                  >
                    <span className="absolute -inset-2.5" />
                    <span className="sr-only">Close panel</span>
                    <RiCloseFill aria-hidden="true" className="h-6 w-6" />
                  </button>
                </div>
              </TransitionChild>
              <div className="flex h-full flex-col overflow-y-scroll bg-white py-6 shadow-xl">
                {/* TABS */}
                {/* <div className="px-4 sm:px-6"> */}
                <DialogTitle className="text-base //font-semibold //leading-6 ">
                  <TabGroup>
                    <TabList className="mx-4 sm:mx-6 space-x-8 border-b border-black/25  tracking-wider">
                      <Tab
                        className={
                          "data-[selected]:text-teal-700 data-[selected]:border-b-4 data-[selected]:border-teal-700 pb-2.5 data-[hover]:text-teal-600 data-[hover]:border-teal-600"
                        }
                      >
                        Comments
                      </Tab>
                      <Tab
                        className={
                          "data-[selected]:text-teal-700 data-[selected]:border-b-4 data-[selected]:border-teal-700 pb-2.5 data-[hover]:text-teal-600 data-[hover]:border-teal-600"
                        }
                      >
                        Other Chats
                      </Tab>
                    </TabList>
                    <TabPanels className="relative mt-6 flex-1 mx-4 sm:mx-6">
                      <TabPanel className={"space-y-5"}>
                        <p className="text-sm">Welcome to a decent discussion.</p>
                        <p className="text-sm">
                          We are not fighting here, but discussing the topics of the articles. We argue, but we don't
                          take offense. We all write under our own names and all posts are reviewed by moderators.
                        </p>
                        <TextArea />
                        {/* <DialogTitle className="text-base //font-semibold //leading-6 ">
                          <TabGroup>
                            <TabList className="mx-4 sm:mx-6 space-x-8 border-b border-black/25  tracking-wider">
                              <Tab
                                className={
                                  "data-[selected]:text-teal-700 data-[selected]:border-b-4 data-[selected]:border-teal-700 pb-2.5 data-[hover]:text-teal-600 data-[hover]:border-teal-600"
                                }
                              >
                                All Comments
                              </Tab>
                              <Tab
                                className={
                                  "data-[selected]:text-teal-700 data-[selected]:border-b-4 data-[selected]:border-teal-700 pb-2.5 data-[hover]:text-teal-600 data-[hover]:border-teal-600"
                                }
                              >
                                Other Chats
                              </Tab>
                            </TabList>
                            <TabPanels className="relative mt-6 flex-1 mx-4 sm:mx-6">
                              <TabPanel className={"space-y-5"}>
                                <p className="text-sm">This will be a comment by person</p>
                              </TabPanel>
                              <TabPanel>Content 2</TabPanel>
                            </TabPanels>
                          </TabGroup>
                        </DialogTitle> */}
                      </TabPanel>
                      <TabPanel>Content 2</TabPanel>
                    </TabPanels>
                  </TabGroup>
                </DialogTitle>
              </div>

              {/* <div className="relative mt-6 flex-1 px-4 sm:px-6">aaaaaaa</div> */}
              {/* </div> */}
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}
