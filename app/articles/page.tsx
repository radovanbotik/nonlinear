import { sanityFetch, client } from "@/sanity/client";
// import Card1 from "../../components/cards/Card1";
import { SanityDocument, PortableText } from "next-sanity";
import Subheader from "@/app/components/common/Subheader";
import NavLink from "@/app/components/common/NavLink";
import { Container } from "@/app/components/Container";
import Filter from "@/app/components/filters/Filter";
// import Story1 from "@/app/components/Stories/Story1";
import Post1 from "@/app/components/Posts/Post1";
import Post3 from "../components/Posts/Post3";

export default async function Overview({
  params,
  searchParams,
}: {
  params: { slug: string };
  searchParams: { order_by?: "string"; style?: string };
}) {
  // let order_by = "";
  // if (searchParams.order_by) {
  //   switch (searchParams.order_by) {
  //     case "date":
  //       order_by = `|order(_createdAt desc)`;
  //       break;
  //     case "-date":
  //       order_by = `|order(_createdAt asc)`;
  //       break;
  //     default:
  //       order_by = "";
  //       break;
  //   }
  // }

  // const NO_FILTER = `*[_type=='review' ${searchParams.format ? `&& release->format=='${searchParams.format}'` : ""} ${searchParams.style ? `&& '${searchParams.style}' in release->styles` : ""}]{
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

  const QUERY = `*[_type=='news_article']{
    article,
    author->{'name':author_name,'slug':slug.current},
    _createdAt,
    _id,
    'image':image.asset->url,
    'slug':slug.current,
    subtitle,
    title
  }|order(_createdAt desc)`;

  const results = await sanityFetch<SanityDocument[]>({ query: QUERY });

  // console.log(searchParams);

  return (
    <>
      <main className="py-10">
        <Container size="md">
          <div className="flex gap-5 flex-col md:flex-row w-full">
            <Container size="xs" className="mx-0 @container container">
              <Post3
                author={results[0].author}
                className="flex-row"
                headline={results[0].title}
                drophead={results[0].subtitle}
                image={results[0].image}
                release_date={results[0]._createdAt}
                slug={`/articles/${results[0].slug}`}
              />
            </Container>
            <Container size="xs" className="mx-0 @container container">
              <Post3
                author={results[0].author}
                className="flex-row"
                headline={results[0].title}
                drophead={results[0].subtitle}
                image={results[0].image}
                release_date={results[0]._createdAt}
                slug={`/articles/${results[0].slug}`}
              />
            </Container>
          </div>
          <Container size="xs" className="mx-0 @container container">
            <ul className="grid grid-cols-1 //md:grid-cols-2 w-full gap-5 pt-10 //space-y-5">
              {results.map(r => (
                <li key={r._id}>
                  <Post1
                    author={r.author}
                    className="flex-row"
                    drophead={results[0].subtitle}
                    headline={r.title}
                    image={r.image}
                    release_date={r._createdAt}
                    slug={`/articles/${r.slug}`}
                  />
                </li>
              ))}
            </ul>
          </Container>
        </Container>
      </main>
    </>
  );
}
