import { ReactNode } from "react";
import { client } from "@/sanity/client";
import SectionHeadingWithTabs from "../../components/SectionHeadingWithTabs";

import Chart from "@/app/components/Chart";
import Controls from "@/app/components/Controls";

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

  const chartHeader = (
    <>
      <Controls groupStyles="flex-1" />
      <div className="flex-1 justify-self-center w-full ">
        <div className="-translate-x-1/2 w-fit font-medium tracking-wide ">
          <span className="text-gray-50 text-lg">Jungle</span>
          <span className="text-teal-400 text-lg">Top10</span>
        </div>
      </div>
    </>
  );

  return (
    <>
      <SectionHeadingWithTabs responsive={false} tabs={tabs} title={slug} />
      <div className="gap-x-6 flex relative">
        <div className="max-w-full w-2/3 max-h-full min-h-0 min-w-0">{children}</div>
        <aside className="w-1/3 flex flex-col gap-6  justify-start">
          <Chart chartItems={data} footer={{ title: "VIEW ALL ITEMS", href: "#" }} header={chartHeader} style="basic" />
          <Chart
            chartItems={data}
            footer={{ title: "VIEW ALL ITEMS", href: "#" }}
            header={"Top 10 Releases"}
            style="basic"
          />
        </aside>
      </div>
    </>
  );
}
