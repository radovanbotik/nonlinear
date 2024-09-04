import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { RiArrowDropDownFill } from "react-icons/ri";
import Link from "next/link";
import { cn } from "../lib/helpers";

type TButtonWithDropdown = {
  buttonStyles?: string;
  dropdownPaperStyles?: string;
  iconStyles?: string;
  dropdownLinkStyles?: string;
  dropdownOptions: {
    title: string;
    href: string;
  }[];
  title: string;
};

export default function ButtonWithDropdown({
  buttonStyles,
  iconStyles,
  dropdownPaperStyles,
  dropdownLinkStyles,
  dropdownOptions,
  title,
}: TButtonWithDropdown) {
  return (
    <div className="inline-flex rounded-md shadow-sm h-6">
      <button
        type="button"
        className={cn(
          "relative inline-flex items-center  rounded-l-md bg-white px-3 py-1 text-xs max-h-6 font-semibold text-gray-900 //ring-1 //ring-inset //ring-gray-300 //hover:bg-gray-50 focus:z-10",
          buttonStyles
        )}
      >
        {title}
      </button>
      <Menu as="div" className="relative -ml-px block">
        <MenuButton
          className={cn(
            "relative inline-flex items-center rounded-r-md bg-white px-1 py-1 max-h-6 text-gray-400 //ring-1 //ring-inset //ring-gray-300 //hover:bg-gray-50 focus:z-10 text-sm",
            iconStyles
          )}
        >
          <span className="sr-only">Open options</span>
          <RiArrowDropDownFill aria-hidden="true" className="h-5 w-5" />
        </MenuButton>
        <MenuItems
          transition
          className={cn(
            "absolute text-left right-0 z-10 -mr-1 mt-2 w-56 origin-top-right //rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in",
            dropdownPaperStyles
          )}
        >
          <div className="py-1">
            {dropdownOptions.map(option => (
              <MenuItem key={option.title}>
                <Link
                  href={option.href}
                  className={cn(
                    "block px-4 py-2 text-sm text-gray-700 //data-[focus]:bg-gray-100 data-[focus]:text-teal-400",
                    dropdownLinkStyles
                  )}
                >
                  {option.title}
                </Link>
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Menu>
    </div>
  );
}
