import { ImageType, PostData } from "@/app/lib/types";
import { EllipsisVerticalIcon, PlusIcon } from "@heroicons/react/24/outline";
import Image from "next/image";

function Thumb({ image, slug }: { image: ImageType; slug: PostData["slug"] }) {
  return (
    <div className="w-full h-full relative">
      <Image
        src={image.href}
        alt={image.alt}
        fill
        className="object-cover inset-0 rounded-sm object-left"
        sizes="(min-width: 640px) 112px, 64px"
        placeholder="blur"
        blurDataURL={image.href}
        quality={100}
      />
    </div>
  );
}

export default function Row({ data }: { data: PostData }) {
  return (
    <div className="flex border-b border-b-black/30 dark:border-b-violet-700 group items-center">
      <div className="w-10 @7xl:w-20 h-20 bg-black order-2 @xl:order-1 flex items-center justify-center">
        <span className="text-white font-black text-[20px] @7xl:text-[28px] leading-[1]">3</span>
      </div>
      <div className="w-16 @xl:w-20 h-20 order-1 @xl:order-2">
        <Thumb image={data.image} slug={data.slug} />
      </div>
      <div className="flex-1 h-20 bg-[#d0ff4b] order-3 flex items-center px-5">
        <h5 className="line-clamp-1">{data.headline}</h5>
      </div>
      <div className="w-10 h-20 bg-black order-4 flex items-center justify-center">
        {/* <span className="text-white font-black text-[20px] @7xl:text-[28px] leading-[1]">+</span> */}
        <EllipsisVerticalIcon className="text-white font-black w-5 h-5 " />
      </div>
    </div>
  );
}
