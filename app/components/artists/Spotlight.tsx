import { cn } from "@/app/lib/helpers";
import { Artist } from "@/app/lib/types";
import Image from "next/image";

export default function Spotlight({ artist, className }: { artist: Artist; className?: string }) {
  return (
    <div className={cn("relative isolate  //min-w-[320px]  @lg:max-w-2xl  w-full h-[450px] ", className)}>
      <div className="absolute  w-full h-[400px] bottom-0 bg-red-400  border-black/30 border rounded-md //-skew-x-6"></div>
      <Image src={artist.image} alt="artist" fill className="object-contain bottom-0 w-full h-full" />
    </div>
  );
}
