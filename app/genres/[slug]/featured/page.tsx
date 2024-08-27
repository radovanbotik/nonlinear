import CarouselWith from "@/app/components/WithCarousel";
import { cn } from "@/app/lib/helpers";
import { sanityFetch, client } from "@/sanity/client";
import { SanityDocument } from "next-sanity";
import Image from "next/image";
import Link from "next/link";

type FeaturedSlideData = {
  artists: { name: string; slug: string }[];
  _id: string;
  image: string;
  label: { name: string; href: string };
  release_date: string;
  slug: string;
  title: string;
};

function Artists({ artists, className }: { artists: { name: string; slug: string }[]; className?: string }) {
  const uniqueArr: { name: string; slug: string }[] = [];
  artists.map(artist => {
    if (!uniqueArr.find(object => object.name === artist.name && object.slug === artist.slug)) uniqueArr.push(artist);
  });

  return (
    <ul className={cn("inline-flex", className)}>
      {uniqueArr.map((a, i, arr) => (
        <li key={a.slug} className="group/artists">
          <Link href={`/artists/${a.slug}`} className="group-hover/artists:underline underline-inherit">
            {a.name}
          </Link>
          {i < arr.length - 1 && <span>,&nbsp;</span>}
        </li>
      ))}
    </ul>
  );
}

function FeatureSlide({ artists, _id, image, label, release_date, slug, title }: FeaturedSlideData) {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-indigo-400 overflow-hidden group">
      <Image
        src={image}
        alt={`Image of ${title}`}
        className="drop-shadow-2xl shadow-2xl"
        width={300}
        height={300}
        placeholder="blur"
        blurDataURL={image}
        quality={100}
      />
      <div className="absolute bg-black/75 w-full left-0 h-1/4 bottom-0 z-10 text-white flex flex-col gap-1.5 p-3 opacity-0 translate-y-full transition group-hover:translate-y-0 group-hover:opacity-100">
        <div className="text-xl font-medium">{title}</div>
        <div className="">
          <Artists artists={artists} />
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default async function Page({ params }: { params: { slug: string } }) {
  const { slug } = params;

  const QUERY = `
  *[_type == 'release']['${slug}' in singles[]->style]{
    'artists':singles[]->artists[]->{name,'slug':slug.current},
    _id,
    'image':image.asset->url,
    'label':{...label->{name,'href':slug.current}},
    release_date,
    'slug':slug.current,
     title,
  }
  [0...8]
  |order(release_date desc)
`;

  const result = await client.fetch<FeaturedSlideData[]>(QUERY);

  return (
    <main>
      <div className=" aspect-video">
        {result && (
          <CarouselWith>
            {result.map(fs => (
              <FeatureSlide
                artists={fs.artists}
                _id={fs._id}
                image={fs.image}
                key={fs._id}
                label={fs.label}
                release_date={fs.release_date}
                slug={fs.slug}
                title={fs.title}
              />
            ))}
          </CarouselWith>
        )}
      </div>
    </main>
  );
}
