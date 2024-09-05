import Table from "./Table";

import Image from "next/image";

import { RiPlayFill } from "react-icons/ri";
import { RiPlayListAddFill } from "react-icons/ri";
import { RiAddLargeFill } from "react-icons/ri";

import Artists from "@/app/components/Artists";
import getMinMaxBPM from "@/app/helpers/getMinMaxBPM";
import { formatDate } from "@/app/helpers/formatDate";
import { ReactElement } from "react";
import Link from "next/link";
import ButtonWithDropdown from "./ButtonWithDropdown";
import { TReleaseData } from "../genres/[slug]/releases/page";

interface ColumnProps<T> {
  key: string;
  title: string | ReactElement;
  render?: (column: ColumnProps<T>, item: T) => ReactElement;
  width?: string;
}

type SortedData = {
  play: string;
  addToQue: string;
  addToPlaylist: string;
  tempo: number[];
  image: { src: string; slug: string };
  label: { name: string; href: string };
  release_date: string;
  titleArtists: { title: string; artists: { name: string; slug: string }[]; slug: string };
  actionButton: string;
};

export default function ReleasesTable({ data }: { data: TReleaseData[] }) {
  const tableData: { columns: Array<ColumnProps<SortedData>>; data: SortedData[] } = {
    columns: [
      {
        key: "image",
        title: "",
        render: (_, record) => {
          return (
            <div className="relative w-10 h-10">
              <Image
                src={record.image.src}
                alt={`Artwork for ${record.titleArtists.title}`}
                // className="lg:px-0 block min-w-10 h-10 max-w-10 w-10 max-h-10"
                fill
                // width={40}
                // height={40}
                placeholder="blur"
                blurDataURL={record.image.src}
                quality={100}
              />
              <Link className="absolute inset-0" href={`/releases/${record.image.slug}`} />
            </div>
          );
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
      {
        key: "tempo",
        title: "BPM",
        render: (_, record) => {
          return <span className=" whitespace-nowrap   text-xs text-gray-400 ">{getMinMaxBPM(record.tempo)}</span>;
        },
      },
      {
        key: "releaseDate",
        title: "Release Date",
        render: (_, record) => {
          return (
            <div className="text-xs text-gray-400">
              {formatDate(record.release_date, {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              }).replaceAll("/", "-")}
            </div>
          );
        },
      },
      {
        key: "actionButton",
        title: "",
        render: (_, record) => {
          return (
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
          );
        },
      },
    ],
    data: data.map(result => ({
      image: { src: result.image, slug: result.slug },
      play: "future-action",
      addToQue: "future-action",
      addToPlaylist: "future-action",
      titleArtists: { title: result.title, artists: result.artists, slug: result.slug },
      label: result.label,
      release_date: result.release_date,
      tempo: result.tempos,
      actionButton: "future-action",
    })),
  };

  return <Table data={tableData.data} columns={tableData.columns} />;
}
