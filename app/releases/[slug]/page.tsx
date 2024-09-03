import Link from "next/link";
import { cn } from "@/app/lib/helpers";
import Image from "next/image";

import { sanityFetch, client } from "@/sanity/client";
import { SanityDocument, PortableText } from "next-sanity";

import { formatDate } from "@/app/helpers/formatDate";

import { RiFacebookFill } from "react-icons/ri";
import { RiTwitterXFill } from "react-icons/ri";
import { RiLink } from "react-icons/ri";

import { RiPlayFill } from "react-icons/ri";
import { RiPlayListAddFill } from "react-icons/ri";
import { RiAddLargeFill } from "react-icons/ri";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import LatestReleasesCarousel from "@/app/components/LatestReleasesCarousel";
import ReleaseTable from "@/app/components/ReleaseTable";

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

  const result = await sanityFetch<SanityDocument[] & ReleaseData>({ query: RELEASE_QUERY });

  const ARTIST_QUERY = `*[_type=='artist' && slug.current=='${result.artists[0].slug}'][0]{
    releases[]->
    {
    ...,
    'artists':singles[]->artists[]->{name,'slug':slug.current},
    'image':image.asset->url,
    'slug':slug.current,
    }
  }`;

  const ARTIST_RELEASES_QUERY = `*[_type=='single' ]['${result.artists[0].slug}' in artists[]->slug.current]
  {
  'releases':*[_type=='release' && references(^._id)]
  {
    ...,
    'artists':singles[]->artists[]->{name,'slug':slug.current},
    'image':image.asset->url,
    'slug':slug.current,
    }
  }.releases`;

  const LABEL_QUERY = `*[_type=='label' && slug.current=='${result.label.href}'][0]
  {
  'releases':*[_type=='release' && references(^._id)]{
    ...,
    'artists':singles[]->artists[]->{name,'slug':slug.current},
    'image':image.asset->url,
    'slug':slug.current,
    }[0...10]
  }`;

  const artist = await sanityFetch<SanityDocument[]>({ query: ARTIST_QUERY });
  const artist_releases = await sanityFetch<SanityDocument[]>({ query: ARTIST_RELEASES_QUERY });
  const label = await sanityFetch<SanityDocument[]>({ query: LABEL_QUERY });

  const all_artists_releases: any[] = [];

  artist_releases.map(array => {
    array.map(object => {
      all_artists_releases.push(object);
    });
  });

  console.log(artist_releases);

  return (
    <div className="relative flex flex-col lg:flex-row lg:gap-10 ">
      <div className="mx-auto w-full">
        {/* DESCRIPTION */}
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
          <div className="space-y-1">
            <div className="text-3xl lg:text-3xl font-medium text-gray-50">{result.title}</div>
            <div className="flex flex-wrap text-xl font-bold text-gray-50 tracking-tight">
              <Artists artists={result.artists} />
            </div>
            <dl className="space-y-1">
              {/* RELEASED */}
              <div className="grid grid-cols-3 lg:gap-8 lg:px-0">
                <dt className="text-sm  text-gray-400">Release Date:</dt>
                <dd className="mt-1 text-sm  text-gray-100 lg:col-span-2 lg:mt-0">
                  {formatDate(result.release_date, {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  }).replaceAll("/", "-")}
                </dd>
              </div>
              {/* GENRES */}
              <div className="grid grid-cols-3 lg:gap-8 lg:px-0">
                <dt className="text-sm  text-gray-400">Genres:</dt>
                <dd className="mt-1 text-sm  text-gray-100 lg:col-span-2 lg:mt-0">
                  {result.singles.map((single, i, arr) => (
                    <div key={single._id} className="inline-block capitalize">
                      <Link href={`/releases?style=${single.style}`}>{single.style}</Link>
                      {i < arr.length - 1 ? <span>,&nbsp;</span> : ""}
                    </div>
                  ))}
                </dd>
              </div>
              {/* LABEL */}
              <div className="grid grid-cols-3 lg:gap-8 lg:px-0">
                <dt className="text-sm  text-gray-400">Label:</dt>
                <dd className="mt-1 text-sm  text-gray-100 lg:col-span-2 lg:mt-0">
                  <Link href={`/labels/${result.label.href}`}>{result.label.name}</Link>
                </dd>
              </div>
              {/* CATNO */}
              {/* <div className="grid grid-cols-3 lg:gap-8 lg:px-0">
                    <dt className="text-sm  text-gray-400">Catalog:</dt>
                    <dd className="mt-1 text-sm  text-gray-100 lg:col-span-2 lg:mt-0">{result.catalog_number}</dd>
                  </div> */}
            </dl>
            <div className="isolate flex gap-3 items-center py-1">
              <div className="flex items-center gap-3 text-gray-100 hover:bg-gray-700 transition rounded-full pr-3">
                <button className="relative flex items-center group/button p-1">
                  <div className="group-hover/button:opacity-100 bg-transparent inset-0 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_2px_#f7fafc]"></div>
                  <div className="bg-gray-500 inset-0 absolute rounded-full"></div>
                  <RiPlayFill className="w-6 h-6 relative //[&>path]:stroke-transparent" />
                </button>
                <button className="group/button relative">
                  <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
                  <RiPlayListAddFill className="w-4 h-4" />
                </button>
                <button className="group/button relative">
                  <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
                  <RiAddLargeFill className="w-4 h-4" />
                </button>
              </div>
              <Popover className="inline-block relative">
                <PopoverButton className="px-3 text-xs min-w-20 py-1.5 rounded-md overflow-hidden bg-teal-600 hover:bg-teal-500 text-white font-bold">
                  $3.95
                </PopoverButton>
                <PopoverPanel anchor="left" className="flex flex-col bg-white space-y-2 p-4">
                  <a href="/analytics">Analytics</a>
                  <a href="/engagement">Engagement</a>
                  <a href="/security">Security</a>
                  <a href="/integrations">Integrations</a>
                </PopoverPanel>
              </Popover>
              <div className="isolate inline-flex  gap-x-1.5">
                <button
                  type="button"
                  className="relative inline-flex items-center rounded-md bg-gray-700 px-1.5 py-1.5 text-gray-50  hover:bg-gray-600 focus:z-10 shadow-sm"
                >
                  <span className="sr-only">Previous</span>
                  <RiFacebookFill aria-hidden="true" className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="relative inline-flex items-center rounded-md bg-gray-700 px-1.5 py-1.5 text-gray-50  hover:bg-gray-600 focus:z-10 shadow-sm"
                >
                  <span className="sr-only">Next</span>
                  <RiTwitterXFill aria-hidden="true" className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  className="relative inline-flex items-center rounded-md bg-gray-700 px-1.5 py-1.5 text-gray-50  hover:bg-gray-600 focus:z-10 shadow-sm"
                >
                  <span className="sr-only">Next</span>
                  <RiLink aria-hidden="true" className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* TRACKLIST */}
        <ReleaseTable data={result} />
        {/* DISCOGRAPHY */}
        <div className="space-y-2 relative mt-8">
          <LatestReleasesCarousel
            slides={label.releases}
            title={`More From This Label`}
            id="artist-carousel"
            slidesPerView={2}
            spaceBetween={4}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 4 },
              768: { slidesPerView: 4, spaceBetween: 4 },
              1024: { slidesPerView: 5, spaceBetween: 8 },
              1240: { slidesPerView: 7, spaceBetween: 8 },
            }}
          />
        </div>
      </div>
    </div>
  );
}
