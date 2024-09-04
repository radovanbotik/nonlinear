import { sanityFetch, client } from "@/sanity/client";
import { SanityDocument, PortableText } from "next-sanity";
import Controls from "./components/Controls";
import Chart from "./components/Chart";
import LatestReleasesCarousel from "./components/LatestReleasesCarousel";
import FeatureCarousel from "./components/FeatureCarousel";

type ReleaseData = {
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

export default async function Home() {
  const QUERY = `
  *[_type == 'release']{
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
  [0..10]
  |order(release_date desc)
`;

  const data = await client.fetch<ReleaseData[]>(QUERY);

  const chartHeader = (
    <>
      <Controls groupStyles="flex-1" />
      <div className="flex-1 justify-self-center w-full ">
        <div className="-translate-x-1/2 w-fit font-medium tracking-wide ">
          <span className="text-gray-50 text-lg capitalize">NL</span>
          <span className="text-teal-400 text-lg">Top10</span>
        </div>
      </div>
    </>
  );

  return (
    <main className="pt-2.5 space-y-5 min-h-dvh">
      <div className="gap-x-6 flex relative">
        <div className="max-w-full w-2/3 max-h-full min-h-0 min-w-0">
          <section className="space-x-3 flex">
            <div className="w-2/3">
              <FeatureCarousel
                className="aspect-[4/3]"
                id="NEW_FEATURE_CAROUSEL_MAIN_PAGE"
                featured={data}
                title="New on NL"
              />
            </div>
            <div className="w-1/3">caoursel vertical</div>
          </section>
          <section>
            <LatestReleasesCarousel
              id="NEW_RELEASES_CAROUSEL_MAIN_PAGE"
              slides={[...data, ...data, ...data, ...data]}
              title="New Releases"
              slidesPerView={2}
              slidesPerGroup={2}
              spaceBetween={4}
              grid={{
                rows: 2,
                fill: "row",
              }}
              breakpoints={{
                640: { slidesPerGroup: 2, slidesPerView: 2, spaceBetween: 4, grid: { fill: "row", rows: 2 } },
                768: { slidesPerGroup: 3, slidesPerView: 3, spaceBetween: 4, grid: { fill: "row", rows: 2 } },
                1024: { slidesPerGroup: 4, slidesPerView: 4, spaceBetween: 8, grid: { fill: "row", rows: 2 } },
                1240: { slidesPerGroup: 5, slidesPerView: 5, spaceBetween: 8, grid: { fill: "row", rows: 2 } },
              }}
            />
          </section>
        </div>
        <aside className="w-1/3 flex flex-col gap-6  justify-start">
          <Chart chartItems={data} footer={{ title: "VIEW ALL ITEMS", href: "#" }} header={chartHeader} style="basic" />
          <Chart
            chartItems={data}
            footer={{ title: "VIEW ALL ITEMS", href: "#" }}
            header={"Top 10 Releases"}
            style="basic"
          />
        </aside>
      </div>
    </main>
  );
}
