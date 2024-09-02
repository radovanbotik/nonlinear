import Link from "next/link";
import { cn } from "@/app/lib/helpers";
import Image from "next/image";

import { sanityFetch, client } from "@/sanity/client";
import { SanityDocument, PortableText } from "next-sanity";

import { formatDate } from "@/app/helpers/formatDate";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";

import { RiFacebookFill } from "react-icons/ri";
import { RiTwitterXFill } from "react-icons/ri";
import { RiLink } from "react-icons/ri";

import { RiPlayFill } from "react-icons/ri";
import { RiPlayListAddFill } from "react-icons/ri";
import { RiAddLargeFill } from "react-icons/ri";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";
import LatestReleasesCarousel from "@/app/components/LatestReleasesCarousel";

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
    format,
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
       style,
      'artists':artists[]->{name,'slug':slug.current}},
    title
  }`;

  const result = await sanityFetch<
    SanityDocument[] & {
      image: string;
      artists: { name: string; slug: string }[];
      label: { href: string; name: string };
      release_date: string;
      release_title: string;
      styles: { style: string }[];
      title: string;
    }
  >({ query: RELEASE_QUERY });

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

  const categories = [
    {
      name: "Label",
      releases: label.releases,
    },
    {
      name: "Artist",
      releases: all_artists_releases,
    },
  ];

  console.log(result);

  return (
    <div className="relative flex flex-col lg:flex-row lg:gap-10 ">
      <div className="mx-auto w-full">
        {/* DESCRIPTION */}
        <div className="flex flex-col  sm:flex-row gap-3 lg:gap-4">
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
        <div className="mt-3">
          <table className="//table-fixed min-w-full border-t border-gray-700   border-spacing-y-1  border-separate ">
            <thead>
              <tr>
                <th scope="col" className="sm:pl-0 w-10 py-2"></th>
                <th scope="col" className="hidden w-8 px-1 py-2  lg:table-cell"></th>
                <th scope="col" className="hidden w-4 px-1.5 py-2  lg:table-cell"></th>
                <th scope="col" className="hidden w-4 px-1.5 py-2  lg:table-cell"></th>
                <th scope="col" className="hidden w-4 px-1.5 py-2  lg:table-cell"></th>
                <th scope="col" className="py-2 px-2.5 ">
                  <div className="text-left text-xs font-normal text-gray-300">Title / Artists</div>
                </th>
                <th scope="col" className="hidden px-2.5 py-2 lg:table-cell">
                  <div className="text-left text-xs font-normal text-gray-300">Label</div>
                </th>
                <th scope="col" className="hidden px-2.5 py-2  sm:table-cell">
                  <div className="text-left text-xs font-normal text-gray-300">Genre</div>
                </th>
                <th scope="col" className="px-2.5 py-2">
                  <div className="text-left text-xs font-normal text-gray-300">Key / BPM</div>
                </th>
                <th scope="col" className="relative py-2 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Purchase</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {result.singles.map((single, i, arr) => (
                <tr
                  key={single._id}
                  className="group/track bg-gray-700/60 hover:bg-gray-700/70 bg-clip-padding backdrop-filter backdrop-blur-sm tab"
                >
                  <td className=" w-10 //pr-2.5 //sm:w-auto //sm:max-w-none relative sm:pl-0 py-0">
                    <Image
                      src={result.image}
                      alt={`Image of ${result.title}`}
                      className="lg:px-0 block min-w-[40px]"
                      width={40}
                      height={40}
                      placeholder="blur"
                      blurDataURL={result.image}
                      quality={100}
                    />
                    <Link className="absolute inset-0" href={`/singles/${single.title}`} />
                  </td>
                  <td className="hidden w-8 px-1  lg:table-cell ">
                    <div className="text-xs  text-gray-400  text-center">{i + 1}</div>
                  </td>
                  <td className="hidden w-4  px-1.5  lg:table-cell ">
                    <button className="relative leading-0 group/button block">
                      <RiPlayFill className="text-gray-300 w-4 h-4" />
                      <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
                    </button>
                  </td>
                  <td className="hidden w-4 px-1.5  lg:table-cell ">
                    <button className=" relative leading-0 group/button block">
                      <RiPlayListAddFill className="text-gray-300 w-4 h-4" />
                      <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
                    </button>
                  </td>
                  <td className="hidden w-4 px-1.5  lg:table-cell ">
                    <button className="relative leading-0 group/button block">
                      <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
                      <RiAddLargeFill className="text-gray-300 w-4 h-4" />
                    </button>
                  </td>
                  <td className=" max-w-0  px-2.5 sm:w-auto sm:max-w-none  ">
                    <div>
                      <Link href={`/singles/${single.title}`} className="block text-xs font-bold text-gray-50 ">
                        {single.title}
                      </Link>
                      <div className="text-xs  truncate text-teal-400 hidden lg:block">
                        <Artists artists={single.artists}></Artists>
                      </div>
                    </div>
                    <dl className="font-normal lg:hidden">
                      <dt className="sr-only">Artists</dt>
                      <dd className="mt-1 text-xs  truncate text-teal-400">
                        <Artists artists={single.artists}></Artists>
                      </dd>
                      <dt className="sr-only sm:hidden">Style</dt>
                    </dl>
                  </td>
                  <td className="hidden px-2.5  w-32  lg:table-cell  truncate">
                    <Link className="text-xs text-gray-400" href={result.label.href}>
                      {result.label.name}
                    </Link>
                  </td>
                  <td className="hidden px-2.5  sm:table-cell capitalize ">
                    <Link className="text-xs text-gray-400" href={`/singles/${single.title}`}>
                      {single.style}
                    </Link>
                  </td>
                  <td className="px-2.5 ">
                    <span className=" whitespace-nowrap   text-xs text-gray-400 ">{single.key}</span>
                    <span className="text-gray-400">&nbsp;&#47;&nbsp;</span>
                    <span className=" whitespace-nowrap   text-xs text-gray-400 ">{single.BPM} BPM</span>
                  </td>
                  <td className="pl-3 pr-4 text-right //sm:pr-0 ">
                    <Popover className="relative ml-auto">
                      <PopoverButton className="px-3 py-1 bg-gray-950 group-hover/track:bg-gray-900 text-xs  text-gray-50 font-bold">
                        Purchase
                      </PopoverButton>
                      <PopoverPanel anchor="left" className="flex flex-col bg-gray-100 space-y-2 p-4">
                        <a href="/analytics">Analytics</a>
                        <a href="/engagement">Engagement</a>
                        <a href="/security">Security</a>
                        <a href="/integrations">Integrations</a>
                      </PopoverPanel>
                    </Popover>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* DISCOGRAPHY */}
        <div className="mt-8 space-y-2 relative">
          <LatestReleasesCarousel
            slides={artist.releases}
            title={`More From This Label`}
            id="artist-carousel"
            slidesPerView={2}
            spaceBetween={4}
            breakpoints={{
              640: { slidesPerView: 2, spaceBetween: 4 },
              768: { slidesPerView: 3, spaceBetween: 4 },
              1024: { slidesPerView: 4, spaceBetween: 8 },
              1240: { slidesPerView: 5, spaceBetween: 8 },
            }}
          />
        </div>
      </div>
    </div>
  );
}
