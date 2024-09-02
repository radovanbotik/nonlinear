import { ReactNode } from "react";
import { client } from "@/sanity/client";
import SectionHeadingWithTabs from "../../components/SectionHeadingWithTabs";

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

  return (
    <>
      <SectionHeadingWithTabs responsive={false} tabs={tabs} title={slug} />
      <div className="gap-x-6 flex relative">
        <div className="max-w-full w-2/3 max-h-full min-h-0 min-w-0">{children}</div>
        <aside className="block w-1/3 bg-gray-700/50">
          <Chart tracks={data} heading="NL Top10" />
        </aside>
      </div>
    </>
  );
}
