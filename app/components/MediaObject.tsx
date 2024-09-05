import Image from "next/image";
import { cn } from "../lib/helpers";

type TMediaObject = {
  image: { src: string; alt: string };
  title: string;
  description: string;
  style:
    | "basic"
    | "alignedToCenter"
    | "alignedToBottom"
    | "stretched"
    | "mediaOnRight"
    | "basicResponsive"
    | "wideResponsive";
};

export default function MediaObject({ image, title, description, style }: TMediaObject) {
  return (
    <div
      className={cn(
        "flex flex-row",
        style === "mediaOnRight" && "flex-row-reverse",
        style === "basicResponsive" && "sm:flex",
        style === "wideResponsive" && "sm:flex"
      )}
    >
      <div
        className={cn(
          "relative mr-4 flex-shrink-0",
          style === "alignedToCenter" && "self-center",
          style === "alignedToBottom" && "self-end",
          style === "wideResponsive" && "sm:mb-0 sm:mr-4"
        )}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={48}
          height={48}
          placeholder="blur"
          blurDataURL={image.src}
          quality={100}
          className={cn(
            "h-16 w-16 border border-gray-300 bg-white",
            style === "stretched" && "h-full",
            style === "wideResponsive" && "h-32 w-full sm:w-32"
          )}
        />
      </div>
      <div>
        <h4 className="text-lg font-bold">{title}</h4>
        <p className="mt-1">{description}</p>
      </div>
    </div>
  );
}
