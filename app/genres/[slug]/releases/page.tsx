import { client } from "@/sanity/client";
import StackedList from "@/app/components/StackedList";

export type ReleaseData = {
  artists: { name: string; slug: string }[];
  tempos: number[];
  catalog_number: string;
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
    'tempos': singles[]->BPM,
    catalog_number,
    _id,
    'image':image.asset->url,
    'label':{...label->{name,'href':slug.current}},
    release_date,
    'slug':slug.current,
     title,
  }
  [0..2]
  |order(release_date desc)
`;

  const data = await client.fetch<ReleaseData[]>(QUERY);

  return (
    <main className="space-y-5 ">
      <section>filters</section>
      <section>
        <StackedList data={data} />
      </section>
    </main>
  );
}
