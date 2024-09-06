import { ButtonHTMLAttributes, ReactElement } from "react";
import { cn } from "../lib/helpers";
import { IconType } from "react-icons/lib";

export type TButton = ButtonHTMLAttributes<HTMLButtonElement> & { icon?: IconType | ReactElement };

export type TButtonGroup = {
  buttons: Array<TButton>;
  groupStyle?: string;
};

export default function ButtonGroup({ buttons, groupStyle }: TButtonGroup) {
  console.log(buttons);
  return (
    <span className={cn("isolate inline-flex", groupStyle)}>
      {buttons.map(button => {
        return (
          <button
            className={cn(
              "relative inline-flex items-center  bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10",
              button.className
            )}
            {...button}
          >
            {!button.children && button.icon && (
              <>
                <span className="sr-only">{button["aria-label"]}</span>
                {button.icon}
              </>
            )}
          </button>
        );
      })}
    </span>
  );
}
