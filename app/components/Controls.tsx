import { RiPlayFill } from "react-icons/ri";
import { RiPlayListAddFill } from "react-icons/ri";
import { RiAddLargeFill } from "react-icons/ri";
import { cn } from "../lib/helpers";

type TControls = {
  groupStyles?: string;
  iconStyles?: string;
};

export default function Controls({ groupStyles, iconStyles }: TControls) {
  return (
    <div className={cn("flex items-center gap-3 text-gray-50", groupStyles)}>
      <button className="relative flex items-center group/button p-1">
        <div className="group-hover/button:opacity-100 bg-transparent inset-0 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_2px_#f7fafc]"></div>
        <div className="bg-gray-500 inset-0 absolute rounded-full"></div>
        <RiPlayFill className="w-6 h-6 relative" />
      </button>
      <button className="group/button relative">
        <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
        <RiPlayListAddFill className="w-4 h-4" />
      </button>
      <button className="group/button relative">
        <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
        <RiAddLargeFill className="w-4 h-4 " />
      </button>
    </div>
  );
}
