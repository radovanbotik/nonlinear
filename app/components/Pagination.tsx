import Link from "next/link";
import { RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { cn } from "../lib/helpers";

type TPagination = {
  className?: string;
};

export default function Pagination({ className }: TPagination) {
  return (
    <nav aria-label="Pagination" className={cn("isolate inline-flex -space-x-px", className)}>
      <Link
        href="#"
        className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 hover:bg-text-50 focus:z-20 "
      >
        <span className="sr-only">Previous</span>
        <RiArrowLeftSLine aria-hidden="true" className="h-5 w-5" />
      </Link>
      {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
      <Link
        href="#"
        aria-current="page"
        className="relative z-10 inline-flex items-center underline-offset-4  decoration-teal-400 underline px-2 py-2 text-sm  text-gray-50 focus:z-20 "
      >
        1
      </Link>
      <Link
        href="#"
        className="relative inline-flex items-center px-2 py-2 text-sm  text-gray-400  hover:text-gray-50 focus:z-20 focus:outline-offset-0"
      >
        2
      </Link>
      <Link
        href="#"
        className="relative hidden items-center px-2 py-2 text-sm  text-gray-400   hover:text-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
      >
        3
      </Link>
      <span className="relative inline-flex items-center px-2 py-2 text-sm  text-gray-300   focus:outline-offset-0">
        ...
      </span>
      <Link
        href="#"
        className="relative hidden items-center px-2 py-2 text-sm  text-gray-400   hover:text-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
      >
        10
      </Link>
      <Link
        href="#"
        className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400   hover:text-gray-50 focus:z-20 focus:outline-offset-0"
      >
        <span className="sr-only">Next</span>
        <RiArrowRightSLine aria-hidden="true" className="h-5 w-5" />
      </Link>
    </nav>
  );
}
