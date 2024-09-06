import Image from "next/image";
import Link from "next/link";

type TCarouselSlideDJChartSlide = {
  _id: string;
  title: string;
  image: string;
  author: string;
  slug: string;
};

export default function CarouselSlideDJChartSlide({ author, _id, image, slug, title }: TCarouselSlideDJChartSlide) {
  return (
    <div key={_id} className="relative group/parent  bg-gray-700 w-full h-full aspect-square lg:aspect-video">
      <Image
        src={image}
        alt={`Image of ${title}`}
        className="block h-full w-full object-cover"
        fill
        placeholder="blur"
        blurDataURL={image}
        quality={100}
      />

      <div className="space-y-0.5 isolate w-full bottom-0 flex flex-col  justify-end absolute bg-gradient-to-t from-gray-950/60 to-transparent text-gray-50  h-1/2 p-2">
        <div className="text-xs text-neutral-400 tracking-tight">{author}</div>
      </div>
      <Link className="inset-0 absolute" href={`/releases/${slug}`}></Link>
    </div>
  );
}
