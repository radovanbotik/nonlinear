import { client } from "@/sanity/client";
import Controls from "./components/Controls";
import Chart from "./components/Chart";
import Carousel, { TCarousel } from "./components/Carousel";
import CarouselSlideBig from "./components/CarouselSlideBig";
import CarouselSlideSmall from "./components/CarouselSlideSmall";
import CarouselSlideDJChartSlide from "./components/CarouselSlideChartBig";

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

  const primaryCarouselConfig: Omit<TCarousel, "children"> = {
    id: "PRIMARY_MAIN",
    autoplay: {
      delay: 2500,
      disableOnInteraction: true,
    },
    navigationStyle: "inside",
    slidesPerView: 1,
    loop: true,
    title: "New on NL",
  };

  const secondaryCarouselConfig: Omit<TCarousel, "children"> = {
    id: "SECONDARY_MAIN",
    navigationStyle: "outside",
    title: "New Releases",
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 4,
    grid: {
      rows: 2,
      fill: "row",
    },
    breakpoints: {
      640: { slidesPerGroup: 2, slidesPerView: 2, spaceBetween: 4, grid: { fill: "row", rows: 2 } },
      768: { slidesPerGroup: 3, slidesPerView: 3, spaceBetween: 4, grid: { fill: "row", rows: 2 } },
      1024: { slidesPerGroup: 4, slidesPerView: 4, spaceBetween: 8, grid: { fill: "row", rows: 2 } },
      1240: { slidesPerGroup: 5, slidesPerView: 5, spaceBetween: 8, grid: { fill: "row", rows: 2 } },
    },
  };
  const chartCarouselConfig: Omit<TCarousel, "children"> = {
    id: "CHART_MAIN",
    navigationStyle: "outside",
    title: "DJ Charts",
    slidesPerView: 1,
    slidesPerGroup: 2,
    grid: {
      rows: 2,
      fill: "row",
    },
    spaceBetween: 8,
    breakpoints: {
      640: { slidesPerGroup: 2, slidesPerView: 1, spaceBetween: 8, grid: { fill: "row", rows: 2 } },
      768: { slidesPerGroup: 2, slidesPerView: 2, spaceBetween: 8, grid: { fill: "row", rows: 1 } },
      1024: { slidesPerGroup: 3, slidesPerView: 3, spaceBetween: 8, grid: { fill: "row", rows: 1 } },
      1240: { slidesPerGroup: 1, slidesPerView: 1, spaceBetween: 8, grid: { fill: "row", rows: 3 } },
    },
  };

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
    <main className="min-h-dvh">
      <div className="gap-x-6 flex relative">
        <div className="max-w-full w-2/3 max-h-full min-h-0 min-w-0 space-y-5">
          <section className="gap-x-3 xl:flex">
            <div className="mx-auto w-full xl:w-2/3">
              <Carousel {...primaryCarouselConfig}>
                {[...data].map(release => {
                  return <CarouselSlideBig key={release._id} {...release} />;
                })}
              </Carousel>
            </div>
            <div className="mx-auto w-full xl:w-1/3">
              <Carousel {...chartCarouselConfig}>
                {[...data].map(release => {
                  return <CarouselSlideDJChartSlide key={release._id} {...release} author="Dj Kaki" />;
                })}
              </Carousel>
            </div>
          </section>
          <section>
            <Carousel {...secondaryCarouselConfig}>
              {[...data].map(release => {
                return <CarouselSlideSmall key={release._id} {...release} />;
              })}
            </Carousel>
          </section>
        </div>
        <aside className="w-1/3 flex flex-col gap-6  justify-start">
          <Chart chartItems={data} footer={{ title: "VIEW ALL ITEMS", href: "#" }} header={chartHeader} style="basic" />
          <Chart
            chartItems={data}
            footer={{ title: "VIEW ALL ITEMS", href: "#" }}
            header={"Top 10 Releases"}
            style="withImage"
          />
        </aside>
      </div>
    </main>
  );
}
