import { client } from "@/sanity/client";
import SelectFilter from "@/app/components/SelectFilter";
import RadioFilter from "@/app/components/RadioFilter";
import ResultsPerPage from "@/app/components/ResultsPerPage";
import ReleasesTable from "@/app/components/ReleasesTable";
import Pagination from "@/app/components/Pagination";

export type TReleaseData = {
  artists: { name: string; slug: string }[];
  tempos: number[];
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

  const QUERY = `
  *[_type == 'release']['${slug}' in singles[]->style]{
    'artists':singles[]->artists[]->{name,'slug':slug.current},
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
    TReleaseData[] & {
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

          <Pagination className={"ml-auto"} />
        </div>
      </section>
      <section className="w-full">
        <ReleasesTable data={data} />
      </section>
    </main>
  );
}
