import { sanityFetch, client } from "@/sanity/client";
import { SanityDocument, PortableText } from "next-sanity";
import { Container } from "@/app/components/Container";
import Post1 from "@/app/components/Posts/Post1";
import Filter from "../components/Filter";

const radioFilters = [
  {
    id: "format",
    title: "Format",
    options: [
      { value: "album", title: "Album" },
      { value: "ep", title: "EP" },
    ],
  },
];

const subCategories = [
  { value: "bassline", title: "Bassline" },
  { value: "breakbeat", title: "Breakbeat" },
  { value: "drum-and-bass", title: "Drum&Bass" },
  { value: "dubstep", title: "Dubstep" },
  { value: "garage", title: "Garage" },
  { value: "grime", title: "Grime" },
  { value: "house", title: "House" },
  { value: "jungle", title: "Jungle" },
  { value: "techno", title: "Techno" },
];

const sortOptions = [
  { title: "Newest", value: "date" },
  { title: "Oldest", value: "-date" },
];

export default async function Overview({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { format?: string; order_by?: "string"; style?: string };
}) {
  let order_by = "";
  if (searchParams.order_by) {
    switch (searchParams.order_by) {
      case "date":
        order_by = `|order(_createdAt desc)`;
        break;
      case "-date":
        order_by = `|order(_createdAt asc)`;
        break;
      default:
        order_by = "";
        break;
    }
  }

  const QUERY = `*[_type=='release' ${searchParams.format ? `&&format=='${searchParams.format}'` : ""} ${searchParams.style ? `&& '${searchParams.style}' in styles` : ""}]{
    _createdAt,
    _id,
    'image':image.asset->url,
    'label':{...label->{name,'href':slug.current}},
    release_date,
    'slug':slug.current,
    artists[]->{name,'slug':slug.current},
    title,
  }${order_by}
  `;

  const all = await sanityFetch<SanityDocument[]>({ query: QUERY });

  return (
    <>
      <main className="//pt-10">
        <Container size="md">
          <Filter
            headline="Releases"
            sortOptions={sortOptions}
            radioFilters={radioFilters}
            subCategories={subCategories}
          >
            <div className="w-full aspect-video bg-indigo-900"></div>
            {all.length > 0 ? (
              <ul className="//space-y-10">
                {all.map(r => (
                  <li key={r._id}>
                    <Post1
                      author={r.artists[0]}
                      className="flex-row"
                      headline={r.title}
                      image={r.image}
                      release_date={r._createdAt}
                      slug={`/releases/${r.slug}`}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <p>NO RESULTS</p>
            )}
          </Filter>
        </Container>
      </main>
    </>
  );
}
