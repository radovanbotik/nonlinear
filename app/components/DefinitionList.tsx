// import { PaperClipIcon } from "@heroicons/react/20/solid";
import { ReactElement } from "react";
import { cn } from "../lib/helpers";

type TDefinitionList = {
  className?: string;
  header?: {
    title: string;
    subtitle: string | ReactElement;
  };
  bodyStyle?: string;
  dataGroupStyle?: string;
  headerStyles?: string;
  titleStyles?: string;
  subTitleStyles?: string;
  data: { term: string | ReactElement; detail: string | string[] | ReactElement | ReactElement[] }[];
  listStyle?: string;
  termStyle?: string;
  detailStyle?: string;
};

export default function DefinitionList({
  className,
  bodyStyle,
  header,
  data,
  dataGroupStyle,
  listStyle,
  termStyle,
  detailStyle,
  headerStyles,
  titleStyles,
  subTitleStyles,
}: TDefinitionList) {
  return (
    <div className={cn("", className)}>
      {header && (
        <div className={cn("px-4 sm:px-0", headerStyles)}>
          <div className={cn("text-base font-semibold leading-7 text-gray-900", titleStyles)}>{header.title}</div>
          <div className={cn("mt-1 max-w-2xl text-sm leading-6 text-gray-500", subTitleStyles)}>{header.subtitle}</div>
        </div>
      )}
      <div className={cn("mt-6 border-t border-gray-100", bodyStyle)}>
        <dl className={cn("divide-y divide-gray-100", listStyle)}>
          {data.map((entry, i) => {
            return (
              <div key={i} className={cn("px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0", dataGroupStyle)}>
                <dt className={cn("text-sm font-medium leading-6 text-gray-900", termStyle)}>{entry.term}</dt>
                <dd className={cn("mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0", detailStyle)}>
                  {entry.detail}
                </dd>
              </div>
            );
          })}

          {/* <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
            <dt className="text-sm font-medium leading-6 text-gray-900">Attachments</dt>
            <dd className="mt-2 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
              <ul role="list" className="divide-y divide-gray-100 rounded-md border border-gray-200">
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">resume_back_end_developer.pdf</span>
                      <span className="flex-shrink-0 text-gray-400">2.4mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
                <li className="flex items-center justify-between py-4 pl-4 pr-5 text-sm leading-6">
                  <div className="flex w-0 flex-1 items-center">
                    <PaperClipIcon aria-hidden="true" className="h-5 w-5 flex-shrink-0 text-gray-400" />
                    <div className="ml-4 flex min-w-0 flex-1 gap-2">
                      <span className="truncate font-medium">coverletter_back_end_developer.pdf</span>
                      <span className="flex-shrink-0 text-gray-400">4.5mb</span>
                    </div>
                  </div>
                  <div className="ml-4 flex-shrink-0">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Download
                    </a>
                  </div>
                </li>
              </ul>
            </dd>
          </div> */}
        </dl>
      </div>
    </div>
  );
}
