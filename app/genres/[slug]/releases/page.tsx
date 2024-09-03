import { client } from "@/sanity/client";
import StackedList from "@/app/components/StackedList";
import SelectFilter from "@/app/components/SelectFilter";
import RadioFilter from "@/app/components/RadioFilter";
import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";
import Link from "next/link";
import ResultsPerPage from "@/app/components/ResultsPerPage";
import Table from "@/app/components/Table";
import Image from "next/image";

import { RiPlayFill } from "react-icons/ri";
import { RiPlayListAddFill } from "react-icons/ri";
import { RiAddLargeFill } from "react-icons/ri";

import { Popover, PopoverButton, PopoverPanel } from "@headlessui/react";

import Artists from "@/app/components/Artists";

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

export default async function Page({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { bpm: string; label: string; order: string; per_page: string };
}) {
  const { slug } = params;
  console.log(searchParams);

  const QUERY = `
  *[_type == 'release']['${slug}' in singles[]->style]{
    'artists':singles[]->artists[]->{name,'slug':slug.current},
    catalog_number,
    _id,
    'image':image.asset->url,
    'label':{...label->{name,'href':slug.current}},
    release_date,
    'slug':slug.current,
    'tempos': singles[]->BPM,
     title,
  }
  [0..4]
  |order(release_date desc)
`;

  const data = await client.fetch<
    ReleaseData[] & {
      artist: { name: string; slug: string }[];
      catalog_number: string;
      _id: string;
      image: string;
      label: { name: string; href: string };
      release_date: string;
      slug: string;
      tempos: number[];
      title: string;
    }
  >(QUERY);

  const resultsPerPage = [
    { value: 25, label: 25 },
    { value: 50, label: 50 },
    { value: 100, label: 100 },
    { value: 125, label: 125 },
  ];
  const filterLabel = {
    name: "label",
    title: "Label",
    options: [
      {
        value: "deep-medi",
        label: "Deep Medi Music",
      },
      {
        value: "tempa-music",
        label: "Tempa Music",
      },
      {
        value: "hyperdub-records",
        label: "Hyperdub",
      },
    ],
  };
  const filterBPM = {
    name: "bpm",
    title: "BPM",
    options: [
      {
        value: "130",
        label: "130",
      },
      {
        value: "135",
        label: "135",
      },
      {
        value: "140",
        label: "140",
      },
    ],
  };
  const filterOrder = {
    name: "order_by",
    title: "Order by",
    options: [
      {
        value: "date",
        label: "Newest To Oldest",
      },
      {
        value: "-date",
        label: "Oldest To Newest",
      },
      {
        value: "name",
        label: "Title A - Z",
      },
      {
        value: "-name",
        label: "Title Z - A",
      },
    ],
  };

  const tableData = {
    columns: [
      {
        key: "image",
        title: "",
        render: (_, record) => {
          return (
            <div className="relative">
              <Image
                src={record.image}
                alt={`Image of ${record.title}`}
                className="lg:px-0 block min-w-10 h-10 max-w-10 w-10 max-h-10"
                width={40}
                height={40}
                placeholder="blur"
                blurDataURL={record.image}
                quality={100}
              />
              <Link className="absolute inset-0" href={`/releases/${record.title}`} />
            </div>
          );
        },
        width: "w-10",
      },
      {
        key: "count",
        title: "",
        render: (_, record) => {
          return <div className="text-center text-gray-400 text-sm">{record.count}</div>;
        },
        width: "w-10",
      },
      {
        key: "play",
        title: "",
        render: (_, record) => {
          return (
            <button className="relative leading-0 group/button block">
              <RiPlayFill className="text-gray-300 w-4 h-4" />
              <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
            </button>
          );
        },
        width: "w-4",
      },
      {
        key: "addToQue",
        title: "",
        render: () => {
          return (
            <button className=" relative leading-0 group/button block">
              <RiPlayListAddFill className="text-gray-300 w-4 h-4" />
              <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
            </button>
          );
        },
        width: "w-4",
      },
      {
        key: "addToPlaylist",
        title: "",
        render: () => {
          return (
            <button className="relative leading-0 group/button block">
              <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
              <RiAddLargeFill className="text-gray-300 w-4 h-4" />
            </button>
          );
        },
        width: "w-4",
      },
      {
        key: "titleArtist",
        title: "Title / Artist",
        render: (_, record) => {
          console.log(record.titleArtists);
          return (
            <>
              <div>
                <Link href={`/releases/${record.titleArtists.slug}`} className="block text-xs font-bold text-gray-50 ">
                  {record.titleArtists.title}
                </Link>
                <div className="text-xs  truncate text-teal-400 hidden lg:block">
                  <Artists artists={record.titleArtists.artists}></Artists>
                </div>
              </div>
              {/* <dl className="font-normal lg:hidden">
                <dt className="sr-only">Artists</dt>
                <dd className="mt-1 text-xs  truncate text-teal-400">
                  <Artists artists={record.artists}></Artists>
                </dd>
                <dt className="sr-only sm:hidden">Style</dt>
              </dl> */}
            </>
          );
        },
      },
      {
        key: "label",
        title: "Label",
        render: (_, record) => {
          return (
            <Link className="text-xs text-gray-400" href={record.label.href}>
              {record.label.name}
            </Link>
          );
        },
      },
      // {
      //   key: "style",
      //   title: "Style",
      //   render: (_, record) => {
      //     return (
      //       <Link className="text-xs text-gray-400" href={`/singles/${record.title}`}>
      //         {record.style}
      //       </Link>
      //     );
      //   },
      // },
      // {
      //   key: "bpm",
      //   title: "Key / BPM",
      //   render: (_, record) => {
      //     return (
      //       <>
      //         <span className=" whitespace-nowrap   text-xs text-gray-400 ">{record.key}</span>
      //         <span className="text-gray-400">&nbsp;&#47;&nbsp;</span>
      //         <span className=" whitespace-nowrap   text-xs text-gray-400 ">{record.BPM} BPM</span>
      //       </>
      //     );
      //   },
      // },
      {
        key: "actionButton",
        title: "",
        render: (_, record) => {
          return (
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
          );
        },
      },
    ],
    data: [
      {
        image: data[0].image,
        count: data.findIndex(obj => obj._id === data[0]._id) + 1,
        play: "future-action",
        addToQue: "future-action",
        addToPlaylist: "future-action",
        titleArtists: { title: data[0].title, artists: data[0].artists, slug: data[0].slug },
        label: data[0].label,
        // style:data[0].
        // bpm:data[0].tempos
        actionButton: "future-action",
      },
    ],
  };

  return (
    <main className="pt-2.5 space-y-5 min-h-dvh">
      <section className="w-full">
        <div className="gap-2 flex w-full items-center">
          <SelectFilter name={filterBPM.name} options={filterBPM.options} title={filterBPM.title} />
          <SelectFilter name={filterLabel.name} options={filterLabel.options} title={filterLabel.title} />
          <div className="ml-auto">
            <RadioFilter name={filterOrder.name} options={filterOrder.options} title={filterOrder.title} />
          </div>
        </div>
      </section>
      <section>
        <div className="flex">
          <div className="flex items-center">
            <div className="mr-3 text-sm  text-gray-400">Results per page</div>
            <ResultsPerPage options={resultsPerPage} />
          </div>

          <nav aria-label="Pagination" className="ml-auto isolate inline-flex -space-x-px">
            <Link
              href="#"
              className="relative inline-flex items-center rounded-l-md px-2 py-2 text-gray-400 hover:bg-text-50 focus:z-20 "
            >
              <span className="sr-only">Previous</span>
              <RiArrowLeftSLine aria-hidden="true" className="h-5 w-5" />
            </Link>
            {/* Current: "z-10 bg-indigo-600 text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600", Default: "text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0" */}
            <Link
              href="#"
              aria-current="page"
              className="relative z-10 inline-flex items-center underline-offset-4  decoration-teal-400 underline px-2 py-2 text-sm  text-gray-50 focus:z-20 "
            >
              1
            </Link>
            <Link
              href="#"
              className="relative inline-flex items-center px-2 py-2 text-sm  text-gray-400  hover:text-gray-50 focus:z-20 focus:outline-offset-0"
            >
              2
            </Link>
            <Link
              href="#"
              className="relative hidden items-center px-2 py-2 text-sm  text-gray-400   hover:text-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              3
            </Link>
            <span className="relative inline-flex items-center px-2 py-2 text-sm  text-gray-300   focus:outline-offset-0">
              ...
            </span>
            <Link
              href="#"
              className="relative hidden items-center px-2 py-2 text-sm  text-gray-400   hover:text-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
            >
              10
            </Link>
            <Link
              href="#"
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400   hover:text-gray-50 focus:z-20 focus:outline-offset-0"
            >
              <span className="sr-only">Next</span>
              <RiArrowRightSLine aria-hidden="true" className="h-5 w-5" />
            </Link>
          </nav>
        </div>
      </section>
      <section className="w-full">
        <StackedList data={data} />
        <Table data={tableData.data} columns={tableData.columns} />
      </section>
    </main>
  );
}
