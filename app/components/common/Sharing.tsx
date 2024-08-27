import Facebook from "@/public/svg/Facebook";
import Reddit from "@/public/svg/Reddit";
import Twitter from "@/public/svg/Twitter";
import LinkIcon from "@/public/svg/Link";
import { cn } from "@/app/lib/helpers";

export default function Sharing({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-5 ", className)}>
      <span className="text-black/50 text-center text-xs">Share</span>
      <div>
        <Facebook className="w-8 @lg:w-10 h-8 @lg:h-10 text-green-500" />
      </div>
      <div>
        <Reddit className="w-8 @lg:w-10 h-8 @lg:h-10" />
      </div>
      <div>
        <Twitter className="w-8 @lg:w-10 h-8 @lg:h-10" />
      </div>
      <div>
        <LinkIcon className="w-8 @lg:w-10 h-8 @lg:h-10" />
      </div>
    </div>
  );
}
