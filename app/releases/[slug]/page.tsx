import { Container } from "@/app/components/Container";
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
import { RiHeart3Line } from "react-icons/ri";

import DiscussionDrawer from "@/app/components/discussion/DiscussionDrawer";

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { EllipsisVerticalIcon } from "@heroicons/react/20/solid";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { RiPlayCircleFill } from "react-icons/ri";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

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

  const all_artists_releases = [];

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

  return (
    <main className="my-8">
      <Container size="md" className="@container ">
        <div className="relative flex flex-col lg:flex-row   lg:gap-10 //rounded-xl   //overflow-hidden">
          <div className="mx-auto w-full lg:w-2/3 max-w-[600px] lg:max-w-none">
            {/* DESCRIPTION */}
            <div>
              <div className="flex flex-col //items-center  sm:flex-row gap-3 lg:gap-6">
                <Image
                  src={result.image}
                  alt={`Image of ${result.title}`}
                  className="self-start rounded-md //px-4 lg:px-0 drop-shadow-2xl shadow-2xl"
                  // sizes="(max-width: 768px) 100vw, (max-width: 1180px) 700px, 550px"
                  width={240}
                  height={240}
                  placeholder="blur"
                  blurDataURL={result.image}
                  quality={100}
                />
                <div className="space-y-2 //my-auto">
                  <div className="text-2xl lg:text-3xl font-bold">{result.title}</div>
                  <div className="flex flex-wrap text-xl font-bold">
                    <Artists artists={result.artists} />
                  </div>
                  <dl className=" divide-gray-100">
                    {/* LABEL */}
                    <div className="//px-4 py-0.5 grid grid-cols-3 lg:gap-4 lg:px-0">
                      <dt className="text-sm //font-medium //leading-6 text-gray-700">Label:</dt>
                      <dd className="mt-1 text-sm //leading-6  text-gray-900 lg:col-span-2 lg:mt-0">
                        <Link href={`/labels/${result.label.href}`}>{result.label.name}</Link>
                      </dd>
                    </div>
                    {/* GENRES */}
                    <div className="//px-4 py-0.5 grid grid-cols-3 lg:gap-4 lg:px-0">
                      <dt className="text-sm //font-medium //leading-6 text-gray-700">Genres:</dt>
                      <dd className="mt-1 text-sm //leading-6  text-gray-900 lg:col-span-2 lg:mt-0">
                        {result.singles.map((single, i, arr) => (
                          <div key={single._id} className="inline-block capitalize">
                            <Link href={`/releases?style=${single.style}`}>{single.style}</Link>
                            {i < arr.length - 1 ? <span>,&nbsp;</span> : ""}
                          </div>
                        ))}
                      </dd>
                    </div>
                    {/* CATNO */}
                    <div className="//px-4 py-0.5 grid grid-cols-3 lg:gap-4 lg:px-0">
                      <dt className="text-sm //font-medium //leading-6 text-gray-700">Catalog:</dt>
                      <dd className="mt-1 text-sm //leading-6  text-gray-900 lg:col-span-2 lg:mt-0">
                        {result.catalog_number}
                      </dd>
                    </div>
                    {/* RELEASED */}
                    <div className="//px-4 py-0.5 grid grid-cols-3 lg:gap-4 lg:px-0">
                      <dt className="text-sm //font-medium //leading-6  text-gray-700">Release Date:</dt>
                      <dd className="mt-1 text-sm //leading-6 text-gray-900 lg:col-span-2 lg:mt-0">
                        {formatDate(result.release_date, {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        })}
                      </dd>
                    </div>
                  </dl>
                  <div className="isolate flex gap-3 items-center">
                    <span className="isolate inline-flex gap-3 rounded-md //shadow-sm">
                      <button
                        type="button"
                        className="relative inline-flex items-center rounded-l-md //bg-white  text-black //ring-1 ring-inset //ring-gray-300 hover:text-black/80 focus:z-10"
                      >
                        <span className="sr-only">Previous</span>
                        <RiPlayCircleFill aria-hidden="true" className="h-8 w-8" />
                      </button>
                    </span>
                    <Popover className="inline-block relative">
                      <PopoverButton className="px-3 text-xs py-1.5 rounded-md overflow-hidden bg-black/90 hover:bg-black/80 text-white font-bold">
                        Purchase
                      </PopoverButton>
                      <PopoverPanel anchor="left" className="flex flex-col bg-white space-y-2 p-4">
                        <a href="/analytics">Analytics</a>
                        <a href="/engagement">Engagement</a>
                        <a href="/security">Security</a>
                        <a href="/integrations">Integrations</a>
                      </PopoverPanel>
                    </Popover>
                    <span className="isolate inline-flex rounded-md  gap-x-1.5">
                      <button
                        type="button"
                        className="relative inline-flex items-center rounded-md bg-black/90 px-1.5 py-1.5 text-white //ring-1 ring-inset ring-white/70 hover:bg-black/80 focus:z-10 shadow-sm"
                      >
                        <span className="sr-only">Previous</span>
                        <RiFacebookFill aria-hidden="true" className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="relative inline-flex items-center rounded-md bg-black/90 px-1.5 py-1.5 text-white //ring-1 ring-inset ring-white/70 hover:bg-black/80 focus:z-10 shadow-sm"
                      >
                        <span className="sr-only">Next</span>
                        <RiTwitterXFill aria-hidden="true" className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        className="relative inline-flex items-center rounded-md bg-black/90 px-1.5 py-1.5 text-white //ring-1 ring-inset ring-white/70 hover:bg-black/80 focus:z-10 shadow-sm"
                      >
                        <span className="sr-only">Next</span>
                        <RiLink aria-hidden="true" className="h-4 w-4" />
                      </button>
                    </span>
                  </div>
                  {/* <div>
                      <span>&nbsp;&sdot;&nbsp;</span>
                      <span>2024</span>
                      <span>&nbsp;&sdot;&nbsp;</span>
                      <span>{result.singles.length} tracks, 5min 36sec</span>
                    </div> */}
                </div>
              </div>
            </div>
            {/* TRACKLIST */}
            <div className="mt-6">
              <table className="min-w-full //divide-y //divide-gray-300 border-t border-black/20">
                <thead>
                  <tr>
                    <th
                      scope="col"
                      className="//pl-4 sm:pl-0 py-1.5 text-left text-sm  font-base //font-semibold text-gray-900"
                    >
                      {/* Image */}
                    </th>
                    <th
                      scope="col"
                      className="py-1.5 pl-4 pr-3 text-left text-sm  font-base //font-semibold text-gray-900 sm:pl-0"
                    >
                      Title
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-1.5 text-left text-sm  font-base //font-semibold text-gray-900 lg:table-cell"
                    >
                      Artist
                    </th>
                    <th
                      scope="col"
                      className="hidden px-3 py-1.5 text-left text-sm  font-base //font-semibold text-gray-900 sm:table-cell"
                    >
                      Genre
                    </th>
                    <th scope="col" className="px-3 py-1.5 text-left text-sm  font-base //font-semibold text-gray-900">
                      Key/BPM
                    </th>
                    <th scope="col" className="relative py-1.5 pl-3 pr-4 sm:pr-0">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="//divide-y divide-gray-200 bg-white ">
                  {result.singles.map((single, i, arr) => (
                    <tr key={single._id} className="group/track bg-black/10 hover:bg-black/5">
                      <td className=" //max-w-0  //py-4 //pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                        <Image
                          src={result.image}
                          alt={`Image of ${result.title}`}
                          className=" //px-4 lg:px-0 block min-w-[48px]"
                          width={48}
                          height={48}
                          placeholder="blur"
                          blurDataURL={result.image}
                          quality={100}
                        />
                      </td>
                      <td className="w-full max-w-0  //py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0">
                        {single.title}
                        <dl className="font-normal lg:hidden">
                          <dt className="sr-only">Artists</dt>
                          <dd className="mt-1 truncate text-gray-700">
                            <Artists artists={single.artists}></Artists>
                          </dd>
                          <dt className="sr-only sm:hidden">Style</dt>
                          {/* <dd className="mt-1 truncate text-gray-500 sm:hidden capitalize">{single.style}</dd> */}
                        </dl>
                      </td>
                      <td className="hidden px-3  //py-4 text-sm text-gray-500 lg:table-cell">
                        <Artists artists={single.artists}></Artists>
                      </td>
                      <td className="hidden px-3  //py-4 text-sm text-gray-500 sm:table-cell capitalize">
                        {single.style}
                      </td>
                      <td className="px-3  //py-4 text-sm text-gray-500">
                        <span className=" whitespace-nowrap ">{single.key}</span>
                        <span>&nbsp;&#47;&nbsp;</span>
                        <span className=" whitespace-nowrap ">{single.BPM} BPM</span>
                      </td>
                      <td className=" //py-4 pl-3 pr-4 text-right text-sm font-medium //sm:pr-0">
                        <Popover className="relative ml-auto">
                          <PopoverButton className="px-3 py-1 bg-black/70 group-hover/track:bg-black/100 text-white font-bold">
                            Purchase
                          </PopoverButton>
                          <PopoverPanel anchor="left" className="flex flex-col bg-white space-y-2 p-4">
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
            <div className="mt-20">
              <div className="//border-b //border-gray-200 bg-white pb-2 mb-3">
                <div className="-ml-4 -mt-2 flex flex-wrap items-center justify-between sm:flex-nowrap">
                  <div className="ml-4 mt-2">
                    <h3 className="text-2xl font-semibold leading-6 text-gray-900">
                      Popular releases by {result.artists[0].name}
                    </h3>
                  </div>
                  <div className="ml-4 mt-2 flex-shrink-0">
                    <button
                      type="button"
                      className="relative inline-flex items-center rounded-md //bg-indigo-600 px-3 py-2 text-sm font-semibold text-black/70 //shadow-sm //hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                      Show all
                    </button>
                  </div>
                </div>
              </div>
              <ul className="flex ">
                {artist.releases.map(release => (
                  <li
                    key={release._id}
                    className="space-y-1 text-lg relative p-3 rounded-md hover:bg-black/10 transition-all "
                  >
                    <Image
                      src={release.image}
                      alt={`Image of ${release.title}`}
                      className="self-start //px-4 lg:px-0 rounded-md shadow-lg drop-shadow-lg"
                      // sizes="(max-width: 768px) 100vw, (max-width: 1180px) 700px, 550px"
                      width={180}
                      height={180}
                      placeholder="blur"
                      blurDataURL={release.image}
                      quality={100}
                    />
                    <div>{result.title}</div>
                    <div className="text-black/70 text-base">
                      <span>
                        {formatDate(release.release_date, {
                          year: "numeric",
                        })}
                      </span>
                      <span>&nbsp;&middot;&nbsp;</span>
                      <span className="uppercase">{release.format}</span>
                    </div>
                    <Link href={`/releases/${release.slug}`} className="absolute inset-0" />
                  </li>
                ))}

                {/* <div className="space-y-1 text-lg relative p-3 rounded-md hover:bg-black/10 transition-all ">
                  <Image
                    src={result.image}
                    alt={`Image of ${result.title}`}
                    className="self-start //px-4 lg:px-0 rounded-md shadow-lg drop-shadow-lg"
                    // sizes="(max-width: 768px) 100vw, (max-width: 1180px) 700px, 550px"
                    width={180}
                    height={180}
                    placeholder="blur"
                    blurDataURL={result.image}
                    quality={100}
                  />
                  <div>{result.title}</div>
                  <div className="text-black/70 text-base">
                    <span>
                      {formatDate(result.release_date, {
                        year: "numeric",
                      })}
                    </span>
                    <span>&nbsp;&middot;&nbsp;</span>
                    <span className="uppercase">{result.format}</span>
                  </div>
                  <Link href={`/releases/${result.slug}`} className="absolute inset-0" />
                </div>
                <div className="space-y-1 text-lg relative p-3 rounded-md hover:bg-black/10 transition-all ">
                  <Image
                    src={result.image}
                    alt={`Image of ${result.title}`}
                    className="self-start //px-4 lg:px-0 rounded-md shadow-lg drop-shadow-lg"
                    // sizes="(max-width: 768px) 100vw, (max-width: 1180px) 700px, 550px"
                    width={180}
                    height={180}
                    placeholder="blur"
                    blurDataURL={result.image}
                    quality={100}
                  />
                  <div>{result.title}</div>
                  <div className="text-black/70 text-base">
                    <span>
                      {formatDate(result.release_date, {
                        year: "numeric",
                      })}
                    </span>
                    <span>&nbsp;&middot;&nbsp;</span>
                    <span className="uppercase">{result.format}</span>
                  </div>
                  <Link href={`/releases/${result.slug}`} className="absolute inset-0" />
                </div>
                <div className="space-y-1 text-lg relative p-3 rounded-md hover:bg-black/10 transition-all ">
                  <Image
                    src={result.image}
                    alt={`Image of ${result.title}`}
                    className="self-start //px-4 lg:px-0 rounded-md shadow-lg drop-shadow-lg"
                    // sizes="(max-width: 768px) 100vw, (max-width: 1180px) 700px, 550px"
                    width={180}
                    height={180}
                    placeholder="blur"
                    blurDataURL={result.image}
                    quality={100}
                  />
                  <div>{result.title}</div>
                  <div className="text-black/70 text-base">
                    <span>
                      {formatDate(result.release_date, {
                        year: "numeric",
                      })}
                    </span>
                    <span>&nbsp;&middot;&nbsp;</span>
                    <span className="uppercase">{result.format}</span>
                  </div>
                  <Link href={`/releases/${result.slug}`} className="absolute inset-0" />
                </div> */}
              </ul>
            </div>
          </div>

          <div className="w-full lg:w-1/3 max-w-[600px] mx-auto space-y-1 //flex flex-col justify-between //bg-white">
            <div className="//flex //h-screen w-full justify-center  //pt-24 //px-4">
              <TabGroup defaultIndex={2}>
                <TabList className="flex gap-2">
                  {categories.map(({ name }) => (
                    <Tab
                      key={name}
                      className="rounded-md py-1 px-3 text-sm/6 //font-semibold //text-white focus:outline-none data-[selected]:bg-black/10 data-[hover]:bg-black/5 data-[selected]:data-[hover]:bg-black/10 data-[focus]:outline-1 data-[focus]:outline-white"
                    >
                      {name}
                    </Tab>
                  ))}
                  <Tab className="rounded-md py-1 px-3 text-sm/6 //font-semibold //text-white focus:outline-none data-[selected]:bg-black/10 data-[hover]:bg-black/5 data-[selected]:data-[hover]:bg-black/10 data-[focus]:outline-1 data-[focus]:outline-white">
                    Merch
                  </Tab>
                </TabList>
                <TabPanels className="mt-3">
                  {categories.map(({ name, releases }) => (
                    <TabPanel key={name} className="rounded-xl  //bg-black/5 p-3">
                      <ul>
                        {releases.map((release, i) => (
                          <li
                            key={release._id}
                            className="relative isolate rounded-md p-3 //overflow-hidden group //bg-black/5 text-sm/6 items-center transition //hover:bg-white/5 flex gap-4 hover:bg-black/20"
                          >
                            <div>{i + 1}</div>
                            <Image
                              src={release.image}
                              alt={`Image of ${release.title}`}
                              className="//px-4 lg:px-0 inline-block"
                              // sizes="(max-width: 768px) 100vw, (max-width: 1180px) 700px, 550px"
                              width={40}
                              height={40}
                              placeholder="blur"
                              blurDataURL={release.image}
                              quality={100}
                            />
                            <div className="inline-flex items-center //w-full //gap-x-6">
                              <div>
                                <div className="flex items-start gap-x-3">
                                  <p className="text-sm font-semibold leading-6 text-gray-900">{release.title}</p>
                                  {/* <p
                                    className={cn(
                                      statuses[project.status],
                                      "mt-0.5 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset"
                                    )}
                                  >
                                    {project.status}
                                  </p> */}
                                </div>
                                <div className="//mt-px flex items-center gap-x-2 text-xs leading-5 text-gray-500">
                                  <div className="truncate">
                                    <Artists artists={release.artists} />
                                  </div>
                                </div>
                              </div>
                            </div>
                            {/* <div className="opacity-0 transition group-hover:opacity-100 group-hover:-translate-x-full z-20 absolute -right-1/2 w-1/2 bg-black/20 top-0 h-full flex //justify-end //justify-start items-center px-4">
                                  <button>
                                    <RiHeart3Line className="w-5 h-5 text-black" />
                                  </button>
                                  <div className="inline-flex //ml-auto rounded-md shadow-sm //scale-75">
                                    <button
                                      type="button"
                                      className="relative inline-flex items-center rounded-l-md bg-black px-3 py-2 text-sm font-semibold text-white ring-1 ring-inset ring-gray-300 hover:bg-black/90 focus:z-10"
                                    >
                                      Purchase
                                    </button>
                                    <Menu as="div" className="relative -ml-px block">
                                      <MenuButton className="relative inline-flex items-center rounded-r-md bg-white px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-10">
                                        <span className="sr-only">Open options</span>
                                        <ChevronDownIcon aria-hidden="true" className="h-5 w-5" />
                                      </MenuButton>
                                      <MenuItems
                                        transition
                                        className="absolute  right-0 z-10 -mr-1 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-100 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"
                                      >
                                        <div className="py-1">
                                          {items.map(item => (
                                            <MenuItem key={item.name}>
                                              <a
                                                href={item.href}
                                                className="block px-4 py-2 text-sm text-gray-700 data-[focus]:bg-gray-100 data-[focus]:text-gray-900"
                                              >
                                                {item.name}
                                              </a>
                                            </MenuItem>
                                          ))}
                                        </div>
                                      </MenuItems>
                                    </Menu>
                                  </div>
                                </div> */}
                            <Popover className="relative ml-auto">
                              <PopoverButton className="px-3 py-1 bg-black text-white font-bold">
                                Purchase
                              </PopoverButton>
                              <PopoverPanel anchor="left" className="flex flex-col bg-white space-y-2 p-4">
                                <a href="/analytics">Analytics</a>
                                <a href="/engagement">Engagement</a>
                                <a href="/security">Security</a>
                                <a href="/integrations">Integrations</a>
                              </PopoverPanel>
                            </Popover>
                          </li>
                        ))}
                      </ul>
                    </TabPanel>
                  ))}
                  <TabPanel className="rounded-xl p-3">
                    <div className="p-3">
                      <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white col-span-2">
                        <div className="aspect-h-4 aspect-w-3 bg-gray-200 sm:aspect-none group-hover:opacity-75 ">
                          <Image
                            src={result.image}
                            alt={`Image of ${result.title}`}
                            className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                            // sizes="(max-width: 768px) 100vw, (max-width: 1180px) 700px, 550px"
                            width={240}
                            height={240}
                            placeholder="blur"
                            blurDataURL={result.image}
                            quality={100}
                          />
                        </div>
                        <div className="flex flex-1 flex-col space-y-2 p-4">
                          <h3 className="text-sm font-medium text-gray-900">
                            <a href={"a"}>
                              <span aria-hidden="true" className="absolute inset-0" />
                              Long T-shirt
                            </a>
                          </h3>
                          <p className="text-sm text-gray-500 line-clamp-2">
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequatur totam quod ea dicta
                            sunt amet possimus id autem ducimus vero.
                          </p>
                          <div className="flex flex-1 flex-col justify-end">
                            <p className="text-base font-medium text-gray-900">$32</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </div>

            {/* <div className="overflow-hidden //rounded-lg bg-white shadow-md">
              <div className="px-4 py-3 sm:p-3">
                <div className="text-base font-semibold leading-6 text-gray-900">Videos:</div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:p-3">
                <div className="aspect-video mt-2">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/LAzj3bQPx2c?si=wN_IofTAunZiuhiw"
                    title="YouTube video player"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    frameBorder="0"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
            </div> */}

            {/* <div className="overflow-hidden //rounded-lg bg-white shadow-md">
              <div>
                <div className="px-4 py-3 sm:p-3">
                  <div className="text-base font-semibold leading-6 text-gray-900">Stream:</div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:p-3">
                  <div className="mt-2">
                    <iframe
                      style={{ border: 0, width: "100%", height: "42px" }}
                      src="https://bandcamp.com/EmbeddedPlayer/album=391166060/size=small/bgcol=ffffff/linkcol=333333/transparent=true/"
                      seamless
                    ></iframe>
                  </div>
                  <div className="aspect-video mt-2">
                    <iframe
                      style={{ borderRadius: "12px" }}
                      src="https://open.spotify.com/embed/album/5o9XwRxvyDQvfOeAh3lDPE?utm_source=generator"
                      width="100%"
                      height="100%"
                      frameBorder="0"
                      allowFullScreen
                      allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                      loading="lazy"
                    ></iframe>
                  </div>
                </div>
              </div>
            </div> */}
          </div>
        </div>
      </Container>
    </main>
  );
}
