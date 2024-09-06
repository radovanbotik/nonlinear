import Link from "next/link";
import Image from "next/image";
import { client } from "@/sanity/client";

import { formatDate } from "@/app/helpers/formatDate";

import ReleaseTable from "@/app/components/ReleaseTable";
import ButtonWithDropdown from "@/app/components/ButtonWithDropdown";
import Artists from "@/app/components/Artists";
import WithCarousel, { TCarousel } from "@/app/components/Carousel";
import CarouselSlideSmall from "@/app/components/CarouselSlideSmall";
import DescriptionList, { TDescriptionList } from "@/app/components/DescriptionList";
import Controls from "@/app/components/Controls";
import SocialMediaShareButtons from "@/app/components/SocialMediaShareButtons";

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
  singles: {
    artists: { name: string; slug: string }[];
    BPM: number;
    duration: number;
    _id: string;
    key: string;
    slug: string;
    style: string;
    title: string;
  }[];
};

type TLabelData = {
  _id: string;
  title: string;
  image: string;
  label: { name: string; href: string };
  artists: { name: string; slug: string }[];
  slug: string;
};
type TArtistData = {
  _id: string;
  title: string;
  image: string;
  label: { name: string; href: string };
  artists: { name: string; slug: string }[];
  slug: string;
};

export default async function Review({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const RELEASE_QUERY = `*[_type=='release' && slug.current=='${slug}'][0]{
    'artists':singles[]->artists[]->{name,'slug':slug.current},
    catalog_number,
    _id,
    'image':image.asset->url,
    'label':{...label->{name,'href':slug.current}},
    'preview_link':preview_link,
    'release_date':release_date,
    'slug':slug.current,
    'styles':singles[]->{style}.style,
    singles[]->{
       _id,
       title,
       BPM,
       key,
       duration,
       'slug':slug.current,
       style,
      'artists':artists[]->{name,'slug':slug.current}},
    title
  }`;

  const result = await client.fetch<ReleaseData>(RELEASE_QUERY);

  const ARTIST_RELEASES_QUERY = `*[_type=='single' ]['${result.artists[0].slug}' in artists[]->slug.current]
  {
  'releases':*[_type=='release' && references(^._id)]
  {
    _id,
    title,
    label,
    'artists':singles[]->artists[]->{name,'slug':slug.current},
    'image':image.asset->url,
    'slug':slug.current,
    }
  }.releases`;

  const LABEL_QUERY = `*[_type=='label' && slug.current=='${result.label.href}'][0]
  {
  'releases':*[_type=='release' && references(^._id)]
  {
    _id,
    title,
    label,
    'artists':singles[]->artists[]->{name,'slug':slug.current},
    'image':image.asset->url,
    'slug':slug.current,
    }[0...10]
  }.releases`;

  const artist_releases = await client.fetch<TArtistData[]>(ARTIST_RELEASES_QUERY);
  const label = await client.fetch<TLabelData[]>(LABEL_QUERY);

  //COMPONENT CONFIGS
  const labelCarouselConfig: Omit<TCarousel, "children"> = {
    title: `More From This Label`,
    id: "release-label-carousel",
    navigationStyle: "outside",
    slidesPerView: 2,
    spaceBetween: 4,
    breakpoints: {
      640: { slidesPerView: 2, spaceBetween: 4 },
      768: { slidesPerView: 4, spaceBetween: 4 },
      1024: { slidesPerView: 5, spaceBetween: 8 },
      1240: { slidesPerView: 7, spaceBetween: 8 },
    },
  };
  const descriptionListConfig: Omit<TDescriptionList, "data"> = {
    header: { title: result.title, subtitle: <Artists artists={result.artists} /> },
    titleStyles: "text-3xl lg:text-3xl font-medium text-gray-50",
    subTitleStyles: "text-xl font-bold text-gray-50 tracking-tight",
    bodyStyle: "border-0 mt-2",
    listStyle: "divide-y-0",
    dataGroupStyle: "py-0.5",
    termStyle: "text-sm/5 text-gray-400 font-normal",
    detailStyle: "text-sm/5 text-gray-50 font-normal",
  };

  return (
    <div className="relative isolate flex flex-col lg:flex-row lg:gap-10 ">
      <div className="mx-auto w-full">
        <div className="flex flex-col  sm:flex-row gap-3 lg:gap-4 mb-4">
          <Image
            src={result.image}
            alt={`Image of ${result.title}`}
            width={260}
            height={260}
            placeholder="blur"
            blurDataURL={result.image}
            quality={100}
          />
          <div>
            <DescriptionList
              {...descriptionListConfig}
              data={[
                {
                  term: "Release Date:",
                  detail: formatDate(result.release_date, {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }).replaceAll("/", "-"),
                },
                {
                  term: "Styles:",
                  detail: result.singles.map((single, i, arr) => (
                    <div key={single._id} className="inline-block capitalize">
                      <Link href={`/releases?style=${single.style}`}>{single.style}</Link>
                      {i < arr.length - 1 ? <span>,&nbsp;</span> : ""}
                    </div>
                  )),
                },
                {
                  term: "Label",
                  detail: <Link href={`/labels/${result.label.href}`}>{result.label.name}</Link>,
                },
              ]}
            />

            <div className="isolate flex gap-4 items-center py-1">
              <div className="flex items-center  gap-3 text-gray-100 hover:bg-gray-700 transition rounded-full pr-3">
                <Controls />
              </div>
              <ButtonWithDropdown
                title="$2.49"
                dropdownOptions={[
                  { title: "option1", href: "#1" },
                  { title: "option2", href: "#2" },
                ]}
                buttonStyles="bg-teal-600 text-gray-100 border-0 ring-0 hover:bg-teal-500"
                iconStyles="bg-teal-700 text-gray-100 border-0 ring-0"
                dropdownPaperStyles="bg-gray-700/60 hover:bg-gray-700/70 bg-clip-padding backdrop-filter backdrop-blur-sm"
                dropdownLinkStyles="text-gray-300"
              />
              <SocialMediaShareButtons />
            </div>
          </div>
        </div>
        <ReleaseTable data={result} />
        <div className="space-y-2 relative mt-12">
          <WithCarousel {...labelCarouselConfig}>
            {[...label].map(release => {
              return <CarouselSlideSmall key={release._id} {...release} />;
            })}
          </WithCarousel>
        </div>
      </div>
    </div>
  );
}
