import ButtonGroup, { TButtonGroup } from "./ButtonGroup";
import { RiFacebookFill } from "react-icons/ri";
import { RiTwitterXFill } from "react-icons/ri";
import { RiLink } from "react-icons/ri";

export default function SocialMediaShareButtons() {
  const buttons: TButtonGroup["buttons"] = [
    {
      className:
        "relative inline-flex items-center rounded-md bg-gray-700 px-1.5 py-1.5 text-gray-50  hover:bg-gray-600 focus:z-10 shadow-sm",
      role: "button",
      icon: <RiFacebookFill aria-hidden="true" focusable="false" className="h-4 w-4" />,
      type: "button",
      "aria-label": "Share on Facebook",
    },
    {
      className:
        "relative inline-flex items-center rounded-md bg-gray-700 px-1.5 py-1.5 text-gray-50  hover:bg-gray-600 focus:z-10 shadow-sm",
      icon: <RiTwitterXFill aria-hidden="true" focusable="false" className="h-4 w-4" />,
      role: "button",
      type: "button",
      "aria-label": "Share on Twitter / X",
    },
    {
      className:
        "relative inline-flex items-center rounded-md bg-gray-700 px-1.5 py-1.5 text-gray-50  hover:bg-gray-600 focus:z-10 shadow-sm",
      icon: <RiLink aria-hidden="true" focusable="false" className="h-4 w-4" />,
      role: "button",
      type: "button",
      "aria-label": "Generate a URL Link to share",
    },
  ];

  return <ButtonGroup buttons={buttons} groupStyle="gap-2" />;
}
