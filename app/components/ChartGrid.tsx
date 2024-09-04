import Image from "next/image";
import Link from "next/link";

type TChartGridItem = {
  author: { name: string; slug: string };
  _id: string;
  image: { src: string; alt: string };
  slug: string;
  title: string;
};

function GridItem({ image, _id, title, author, slug }: TChartGridItem) {
  return (
    <>
      <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden bg-gray-100 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100">
        <Image
          alt={image.alt}
          src={image.src}
          className="pointer-events-none object-cover group-hover:opacity-75"
          width={240}
          height={240}
          placeholder="blur"
          blurDataURL={image.src}
          quality={100}
        />
        <Link href={`/charts/${slug}`} className="absolute inset-0 focus:outline-none">
          <span className="sr-only">Open chart {title}</span>
        </Link>
      </div>
      {/* <p className="pointer-events-none mt-2 block truncate text-sm font-medium text-gray-900">{file.title}</p> */}
      {/* <p className="pointer-events-none block text-sm font-medium text-gray-500">{file.size}</p> */}
    </>
  );
}

export default function ChartGrid({ data }: { data: TChartGridItem[] }) {
  return (
    <ul role="list" className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 sm:gap-x-6 lg:grid-cols-5 xl:gap-x-8">
      {data.map(item => (
        <li key={item._id} className="relative">
          <GridItem {...item} />
        </li>
      ))}
    </ul>
  );
}
