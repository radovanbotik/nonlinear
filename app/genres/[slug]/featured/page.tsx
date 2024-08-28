import FeatureCarousel from "@/app/components/FeatureCarousel";
import LatestReleasesCarousel from "@/app/components/LatestReleasesCarousel";
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

  const FEATURED_QUERY = `
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
  const LATEST_QUERY = `
  *[_type == 'release']['${slug}' in singles[]->style]{
    'artists':singles[]->artists[]->{name,'slug':slug.current},
    _id,
    'image':image.asset->url,
    'label':{...label->{name,'href':slug.current}},
    release_date,
    'slug':slug.current,
     title,
  }
  [0...40]
  |order(release_date desc)
`;

  const featured = await client.fetch<FeaturedSlideData[]>(FEATURED_QUERY);
  const latest = await client.fetch<FeaturedSlideData[]>(LATEST_QUERY);

  const latestData = [
    {
      id: 1,
      releases: [...latest, ...latest, ...latest, ...latest, ...latest],
    },
    {
      id: 2,
      releases: [...latest, ...latest, ...latest, ...latest, ...latest],
    },
    {
      id: 3,
      releases: [...latest, ...latest, ...latest, ...latest, ...latest],
    },
    {
      id: 4,
      releases: [...latest, ...latest, ...latest, ...latest, ...latest],
    },
  ];

  const latest40 = [
    ...latest,
    ...latest,
    ...latest,
    ...latest,
    ...latest,
    ...latest,
    ...latest,
    ...latest,
    ...latest,
    ...latest,
    ...latest,
    ...latest,
    ...latest,
    ...latest,
    ...latest,
    ...latest,
    ...latest,
    ...latest,
    ...latest,
    ...latest,
  ];

  return (
    <main className="space-y-5">
      <section>{featured && <FeatureCarousel id="FEATURE_CAROUSEL" featured={featured} />}</section>
      <section>
        {latest && <LatestReleasesCarousel id="LATEST_RELEASES_CAROUSEL" slides={latest40} title="Latest Releases" />}
      </section>
      <section>
        {latest && <LatestReleasesCarousel id="STAFF_PICKS_CAROUSEL" slides={latest40} title="Staff Picks" />}
      </section>
    </main>
  );
}
