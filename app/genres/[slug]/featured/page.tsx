import CarouselSlideBig from "@/app/components/CarouselSlideBig";
import CarouselSlideSmall from "@/app/components/CarouselSlideSmall";
import Carousel, { TCarousel } from "@/app/components/Carousel";
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

  const data = [
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

  const primaryCarouselConfig: Omit<TCarousel, "children"> = {
    id: "PRIMARY_FEATURED",
    autoplay: {
      delay: 2500,
      disableOnInteraction: true,
    },
    navigationStyle: "inside",
    slidesPerView: 1,
    loop: true,
  };

  const secondaryCarouselConfig: Omit<TCarousel, "children"> = {
    id: "SECONDARY_FEATURED",
    title: "New Releases",
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 4,
    navigationStyle: "outside",
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

  const tertiaryCarouselConfig: Omit<TCarousel, "children"> = {
    id: "TERTIARY_FEATURED",
    title: "New Releases",
    slidesPerView: 2,
    slidesPerGroup: 2,
    spaceBetween: 4,
    navigationStyle: "outside",
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

  return (
    <main className="space-y-5 min-h-dvh">
      <section>
        {featured && (
          <Carousel {...primaryCarouselConfig}>
            {[...featured].map(release => {
              return <CarouselSlideBig key={release._id} {...release} className="aspect-video" />;
            })}
          </Carousel>
        )}
      </section>
      <section>
        {latest && (
          <Carousel {...secondaryCarouselConfig}>
            {[...data].map(release => {
              return <CarouselSlideSmall key={release._id} {...release} />;
            })}
          </Carousel>
        )}
      </section>
      <section>
        {latest && (
          <Carousel {...tertiaryCarouselConfig}>
            {[...data].map(release => {
              return <CarouselSlideSmall key={release._id} {...release} />;
            })}
          </Carousel>
        )}
      </section>
    </main>
  );
}
