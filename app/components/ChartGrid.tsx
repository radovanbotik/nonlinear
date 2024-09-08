import Image from "next/image";
import Link from "next/link";

type TChartGridItem = {
  author: string;
  _id: string;
  image: string;
  slug: string;
  title: string;
};

function GridItem({ image, _id, title, author, slug }: TChartGridItem) {
  return (
    <>
      <div className="group aspect-h-7 aspect-w-10 flex flex-col w-full overflow-hidden bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
        <Image
          alt={`Image of chart ${title}`}
          src={image}
          className="//absolute //      inset-0 pointer-events-none object-cover group-hover:opacity-75"
          width={300}
          height={300}
          placeholder="blur"
          blurDataURL={image}
          quality={100}
        />
        <div className="w-full bottom-0 flex flex-col  justify-end absolute bg-gradient-to-t from-gray-950/60 to-transparent text-gray-50  h-1/2 p-2">
          <div className="text-sm font-bold">{title}</div>
          <div className="text-sm font-bold">{author}</div>
        </div>
        <Link href={`/charts/${slug}`} className="absolute inset-0 focus:outline-none">
          <span className="sr-only">Open chart {title}</span>
        </Link>
      </div>
    </>
  );
}

export default function ChartGrid({ data }: { data: TChartGridItem[] }) {
  return (
    <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8">
      {data.map(item => (
        <li key={item._id} className="relative">
          <GridItem {...item} />
        </li>
      ))}
    </ul>
  );
}
