import { sanityFetch, client } from "@/sanity/client";
import { SanityDocument, PortableText } from "next-sanity";
import { Container } from "@/app/components/Container";
// import Filter from "@/app/components/filters/Filter";
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
  searchParams: { format?: "ep" | "album"; order_by?: "date" | "-date"; style?: string };
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

  const Q = `
*[_type == 'review' ${searchParams.format ? `&& release->format=='${searchParams.format}'` : ""}]
${searchParams.style ? `['${searchParams.style}' in release->singles[]->style]` : ""}
  {author->{'name':author_name,'slug':slug.current},
  _createdAt,
  _id,
  'image':release->image.asset->url,
  'label':release->{...label->{name,'href':slug.current}},
  'release_date':release->release_date,
  'slug':slug.current,
  subtitle,
   title,
  }
  ${order_by}
`;

  // const QUERY = `*[_type=='review' ${searchParams.format ? `&& release->format=='${searchParams.format}'` : ""} ${searchParams.style ? `&& '${searchParams.style}' in release->styles` : ""}]{
  //   author->{'name':author_name,'slug':slug.current},
  //   _createdAt,
  //   _id,
  //   'image':release->image.asset->url,
  //   'label':release->{...label->{name,'href':slug.current}},
  //   'release_date':release->release_date,
  //   'slug':slug.current,
  //   subtitle,
  //   title,
  // }${order_by}
  // `;

  // *[_type == 'review']['garage' in release->singles[]->style]

  const results = await sanityFetch<SanityDocument[]>({ query: Q });

  console.log(results);

  return (
    <>
      <main className="//pt-10">
        <Container size="md">
          <Filter
            headline="Reviews"
            sortOptions={sortOptions}
            radioFilters={radioFilters}
            subCategories={subCategories}
          >
            {results.length > 0 ? (
              <ul className="//space-y-10">
                {results.map(r => (
                  <li key={r._id}>
                    <Post1
                      author={r.author}
                      className="flex-row"
                      headline={r.title}
                      image={r.image}
                      release_date={r._createdAt}
                      slug={`/reviews/${r.slug}`}
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
