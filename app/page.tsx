import Post1 from "./components/Posts/Post1";
import Post3 from "./components/Posts/Post3";
import { Container } from "./components/Container";

import { sanityFetch, client } from "@/sanity/client";
import { SanityDocument, PortableText } from "next-sanity";

const HEADLINE = `*[_type=='news_article']{
  article,
  author->{'name':author_name,'slug':slug.current},
  _createdAt,
  _id,
  'image':image.asset->url,
  'slug':slug.current,
  subtitle,
  title
}|order(_createdAt desc)[0]`;

const TOP_STORIES = `*[_type=='news_article']{
  article,
  author->{'name':author_name,'slug':slug.current},
  _createdAt,
  _id,
  'image':image.asset->url,
  'slug':slug.current,
   title
}|order(_createdAt desc)[1...6]`;

const MORE_STORIES = `*[_type=='news_article']{
  article,
  author->{'name':author_name,'slug':slug.current},
  _createdAt,
  _id,
  'image':image.asset->url,
  'slug':slug.current,
  subtitle,
  title
}|order(_createdAt desc)`;

const FIRST = `*[_type=='review'][0]{
  article,'release_date':release->release_date,
  author->{'name':author_name,'slug':slug.current},
  _id,
  'image':release->image.asset->url,
  'label':release->{...label->{name,'href':slug.current}},
  'release_title':release->title,
  'slug':slug.current,
   title
}
`;
const FIVE = `*[_type=='review'][0...5]{
  article,'release_date':release->release_date,
  author->{'name':author_name,'slug':slug.current},
  _createdAt,
  _id,
  'image':release->image.asset->url,
  'label':release->{...label->{name,'href':slug.current}},
  'release_title':release->title,
  'slug':slug.current,
   title
}|order(_createdAt desc)
`;

export default async function Home() {
  const headline = await sanityFetch<SanityDocument[]>({ query: HEADLINE });
  const top_stories = await sanityFetch<SanityDocument[]>({ query: TOP_STORIES });
  const more_stories = await sanityFetch<SanityDocument[]>({ query: MORE_STORIES });
  const main = await sanityFetch<SanityDocument[]>({ query: FIRST });
  const five = await sanityFetch<SanityDocument[]>({ query: FIVE });

  console.log(headline);

  return (
    <main className="py-10 space-y-10">
      <Container size="md">
        <div className="flex flex-col  lg:flex-row justify-between gap-10  py-5  //divide-black">
          <Container size="sm" className="mx-0 @container container">
            <Post3
              author={headline.author}
              drophead={headline.subtitle}
              headline={headline.title}
              image={headline.image}
              release_date={headline._createdAt}
              imageAlt={"image is capturing something"}
              slug={`/articles/${headline.slug}`}
            />
          </Container>
          <Container size="xs" className="mx-0 @container container ">
            <div className="mb-2.5">
              <span className="font-bold tracking-wide text-sm uppercase text-black/40">latest news</span>
            </div>
            <ol className="[counter-reset:li] relative divide-y-2">
              {top_stories.map(review => (
                <li
                  key={review._id}
                  className="w-fit gap-5 [&:not(:first-of-type)]:pt-2.5 [&:not(:last-of-type)]:pb-2.5 flex items-start  before:translate-y-1 relative isolate before:z-10 before:shrink-0 before:flex before:h-5 before:w-5 before:justify-center before:items-center before:rounded-full dark:before:bg-[#5200a7] before:bg-black before:text-center before:text-[10px] before:text-[#d0ff4b] before:font-bold before:content-[counter(li)] before:[counter-increment:li] last:mb-0 last:border-b-0 last:pb-0"
                >
                  <Post1
                    author={review.author}
                    className="max-w-sm"
                    headline={review.title}
                    image={review.image}
                    imageStyles="w-24 aspect-square @md:aspect-[5/4] @md:w-32"
                    isReversed={true}
                    release_date={review._createdAt}
                    slug={`/articles/${review.slug}`}
                  />
                </li>
              ))}
            </ol>
            {/* </div> */}
          </Container>
        </div>
      </Container>

      <Container size="md">
        <div className="flex flex-col  lg:flex-row justify-between gap-10  py-5  //divide-black">
          <Container size="md" className="mx-0 @container container">
            <ul>
              {more_stories.map(story => (
                <li key={story._id} className="[&:not(:first-of-type)]:pt-2.5 [&:not(:last-of-type)]:pb-2.5">
                  <Post1
                    author={story.author}
                    badge="music"
                    drophead={story.subtitle}
                    headline={story.title}
                    image={story.image}
                    isReversed={true}
                    release_date={story._createdAt}
                    slug={`/articles/${story.slug}`}
                  />
                </li>
              ))}
            </ul>
          </Container>

          <Container size="xs" className="mx-0 @container container relative">
            <div
              className={"isolate px-5 py-5  w-full rounded-xl  bg-violet-700 //bg-[#d0ff4b] space-y-2.5 sticky top-0"}
            >
              <div className="ml-10">
                <span className="font-bold tracking-wide text-sm uppercase text-black/40">best rated</span>
              </div>
              <ol className="[counter-reset:li] relative divide-y-2 text-white">
                {top_stories.slice(0, 5).map((story, i) => {
                  return (
                    <li
                      key={i}
                      className="py-5 first:pt-0 items-start //before:mt-2.5 //before:translate-y-1.5 w-fit gap-2.5 flex before:translate-y-1 before:shrink-0 before:flex before:p-3 before:h-5 before:w-5 before:justify-center before:items-center before:rounded-full dark:before:bg-[#5200a7] before:bg-black before:text-center before:text-xs before:text-white before:font-bold before:content-[counter(li)] before:[counter-increment:li] last:mb-0 last:border-b-0 last:pb-0"
                    >
                      <Post1
                        author={story.author}
                        headline={story.title}
                        key={story._id}
                        release_date={story._createdAt}
                        slug={`/reviews/${story.slug}`}
                      />
                    </li>
                  );
                })}
              </ol>
            </div>
          </Container>
        </div>
      </Container>

      {/* <Container size="md" className="@container pb-10 relative //bg-stone-50 //border-x-2">
        <div className="flex flex-col-reverse @4xl:flex-row justify-between gap-20 items-start //py-5 //@6xl:divide-x-2">
          <div className="w-fit h-full //mx-auto //@6xl:mx-0 flex-[1.6] flex flex-col //divide-y-[1px] ">
            <span className="relative text-black uppercase //mt-10 text-xl">Interplanetary Criminal</span>
            <div className="divide-y-[1px] //mx-auto ">
              <Story3 data={post} index={1} />
              <Story3 data={post} index={2} />
              <Story3 data={post} index={3} />
            </div>
          </div>
          <div className="flex-[1.6] w-full h-full //mx-auto //@6xl:mx-0 //flex //items-end //justify-end ">
            <Spotlight artist={artist} />
          </div>
        </div>
      </Container> */}

      {/* <Container size="md" className="@container pb-10 relative //bg-stone-50 //border-x-2">
        <div className="relative flex flex-col @4xl:flex-row justify-between gap-20  items-start py-5 ">
          <div className="flex-[1.6] divide-y-[1px]">
            <Story1 data={post} />
            <Story1 data={post} />
            <Story1 data={post} />
            <Story1 data={post} />
            <Story1 data={post} />
            <Story1 data={post} />
          </div>
          <div className="w-full flex-[1.6] sticky top-24 flex ">
            <iframe
              className="rounded-sm w-full //@lg:max-w-2xl min-w-[320px] py-5 "
              src="https://open.spotify.com/embed/playlist/5ozgkq3ChOQ7p723QNUnsz?utm_source=generator&theme=0"
              width="100%"
              height="600"
              allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </Container> */}
    </main>
  );
}
