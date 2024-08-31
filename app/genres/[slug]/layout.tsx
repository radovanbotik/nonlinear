import { ReactNode } from "react";
import { client } from "@/sanity/client";
import { Container } from "../../components/Container";
import SectionHeadingWithTabs from "../../components/SectionHeadingWithTabs";
import VerticalNavigation from "@/app/components/VerticalNavigation";

import { RiHeart3Line } from "react-icons/ri";
import { RiHeart3Fill } from "react-icons/ri";

import { RiPlayList2Line } from "react-icons/ri";
import { RiPlayList2Fill } from "react-icons/ri";

import { RiDownload2Line } from "react-icons/ri";
import { RiDownload2Fill } from "react-icons/ri";

import { RiListUnordered } from "react-icons/ri";
import Chart from "@/app/components/Chart";

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
export default async function Layout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: { slug: string };
}>) {
  const { slug } = params;

  const QUERY = `
  *[_type == 'release']['${slug}' in singles[]->style]{
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

  const tabs = [
    { name: "Featured", href: `/genres/${slug}/featured` },
    { name: "Releases", href: `/genres/${slug}/releases` },
    { name: "Tracks", href: `/genres/${slug}/tracks` },
    { name: "Charts", href: `/genres/${slug}/charts` },
  ];

  const navigation = [
    {
      name: "Favourites",
      href: `/genres/${slug}/releases`,
      icons: {
        current: <RiHeart3Fill aria-hidden="true" className="h-4 w-4 shrink-0 text-teal-400 " />,
        default: (
          <RiHeart3Line
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-gray-100 group-hover:text-gray-300 leading-[0]"
          />
        ),
      },
    },
    {
      name: "Collection",
      href: "/genres/collection",
      icons: {
        current: <RiListUnordered aria-hidden="true" className="h-4 w-4 shrink-0 text-teal-400 " />,
        default: (
          <RiListUnordered
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-gray-100 group-hover:text-gray-300 leading-[0]"
          />
        ),
      },
    },
    {
      name: "Downloads",
      href: "/genres/downloads",
      icons: {
        current: <RiDownload2Fill aria-hidden="true" className="h-4 w-4 shrink-0 text-teal-400 " />,
        default: (
          <RiDownload2Line
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-gray-100 group-hover:text-gray-300 leading-[0]"
          />
        ),
      },
      count: 12,
    },
    {
      name: "Playlists",
      href: "/genres/playlists",
      icons: {
        current: <RiPlayList2Fill aria-hidden="true" className="h-4 w-4 shrink-0 text-teal-400 " />,
        default: (
          <RiPlayList2Line
            aria-hidden="true"
            className="h-4 w-4 shrink-0 text-gray-100 group-hover:text-gray-300 leading-[0]"
          />
        ),
      },
      count: 12,
    },
  ];

  return (
    <div className="bg-gray-800 py-7">
      <Container size="xl">
        <div className="flex w-full justify-between gap-x-8">
          <aside className="block w-2/12 bg-gray-700">
            <VerticalNavigation navigation={navigation} />
          </aside>
          <div className="flex-1 max-w-full max-h-full min-h-0 min-w-0">
            <SectionHeadingWithTabs responsive={false} tabs={tabs} title={slug} />
            <div className="gap-x-8 flex relative">
              <div className="max-w-full w-2/3 max-h-full min-h-0 min-w-0">{children}</div>
              <aside className="block w-1/3 bg-gray-700">
                <Chart tracks={data} heading="Top10" />
              </aside>
            </div>
          </div>
          {/* <aside className="block w-3/12 bg-gray-700">
            <Chart tracks={data} heading="Top10" />
          </aside> */}
        </div>
      </Container>
    </div>
  );
}
