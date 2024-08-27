import CarouselWith from "@/app/components/FeatureCarousel";
import { client } from "@/sanity/client";

export type FeaturedSlideData = {
  artists: { name: string; slug: string }[];
  _id: string;
  image: string;
  label: { name: string; href: string };
  release_date: string;
  slug: string;
  title: string;
};

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
      <div className=" aspect-video">{result && <CarouselWith featured={result} />}</div>
    </main>
  );
}
