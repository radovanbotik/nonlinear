import Link from "next/link";
import Artists from "./Artists";
import MediaObject from "./MediaObject";

import { RiPlayFill } from "react-icons/ri";
import { RiPlayListAddFill } from "react-icons/ri";
import { RiAddLargeFill } from "react-icons/ri";

export default function Chart({
  tracks,
  heading,
}: {
  tracks: {
    artists: { name: string; slug: string }[];
    _id: string;
    image: string;
    label: { name: string; href: string };
    slug: string;
    title: string;
  }[];
  heading: string;
}) {
  return (
    <div aria-label="Sidebar" className="flex flex-1 flex-col px-3 py-4 divide-y divide-gray-400">
      <div className="flex items-center w-full pb-3">
        <div className="flex-1 flex items-center gap-3 text-gray-50">
          <button className="relative flex items-center group/button p-1">
            <div className="group-hover/button:opacity-100 bg-transparent inset-0 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_2px_#f7fafc]"></div>
            <div className="bg-gray-500 inset-0 absolute rounded-full"></div>
            <RiPlayFill className="w-6 h-6 relative //[&>path]:stroke-transparent" />
          </button>
          <button className="group/button relative">
            <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
            <RiPlayListAddFill className="w-4 h-4" />
          </button>
          <button className="group/button relative">
            <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
            <RiAddLargeFill className="w-4 h-4" />
          </button>
        </div>
        <div className="flex-1 text-teal-400 justify-self-center w-full ">
          <div className="-translate-x-1/2 w-fit font-semibold tracking-wide  ">{heading}</div>
        </div>
      </div>
      <ul role="list" className="divide-gray-800 ">
        {tracks.map((track, i) => (
          <li key={track._id} className="relative">
            <MediaObject image={track.image} href={track.slug} title={track.title}>
              <div>
                <div className="text-xs  tracking-tight text-teal-400">
                  <Artists artists={track.artists} />
                </div>
                <Link
                  href={`/labels/${track.label.href}`}
                  className="block text-xs  tracking-tight text-gray-400 hover:text-gray-300"
                >
                  {track.label.name}
                </Link>
              </div>
              <div className="absolute w-fit h-full top-0 px-4 bg-gray-700/60  bg-clip-padding backdrop-filter backdrop-blur-sm right-0 translate-x-full  flex items-center gap-4 opacity-0  group-hover:translate-x-0 group-hover:opacity-100 transition">
                <button className="relative inline-block  //mx-auto group/button ">
                  <RiPlayFill className="text-gray-300 w-4 h-4" />
                  <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
                </button>

                <button className="relative inline-block  //mx-auto group/button ">
                  <RiPlayListAddFill className="text-gray-300 w-4 h-4" />
                  <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
                </button>

                <button className="w-full px-3 text-xs py-1.5 text-gray-300  bg-teal-600 hover:text-gray-50 active:!bg-teal-500 transition">
                  download
                </button>
              </div>
            </MediaObject>
            {/* <div className="absolute grid place-content-center top-1/2 left-3 bg-gray-900 text-teal-400 rounded-full text-[7px] w-3 h-3">
              <div>{i + 1}</div>
            </div> */}
          </li>
        ))}
      </ul>
    </div>
  );
}
