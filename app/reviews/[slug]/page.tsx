import { Container } from "@/app/components/Container";
import Link from "next/link";
import { cn } from "@/app/lib/helpers";
import Image from "next/image";

import { sanityFetch, client } from "@/sanity/client";
import { SanityDocument, PortableText } from "next-sanity";

import { formatDate } from "@/app/helpers/formatDate";

import { RiFacebookFill } from "react-icons/ri";
import { RiTwitterXFill } from "react-icons/ri";
import { RiLinksFill } from "react-icons/ri";

import DiscussionDrawer from "@/app/components/discussion/DiscussionDrawer";

export default async function Review({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const QUERY = `*[_type=='review' && slug.current=='${slug}'][0]{
    article,
    'artists':release->{artists[]->{name,'slug':slug.current}}.artists,
    author->{'name':author_name,'slug':slug.current},
    _id,
    'image':release->image.asset->url,
    'label':release->{...label->{name,'href':slug.current}},
    'preview_link':release->preview_link,
    'release_date':release->release_date,
    'slug':slug.current,
    'styles':release->{music_styles[]->{style}}.music_styles,
     subtitle,
     title,
  }`;

  const article = await sanityFetch<
    SanityDocument[] & {
      image: string;
      artists: { name: string; slug: string }[];
      label: { href: string; name: string };
      release_date: string;
      release_title: string;
      styles: { style: string }[];
      title: string;
    }
  >({ query: QUERY });

  return (
    <div>
      <main className="my-20">
        <Container size="md" className="@container">
          <div className="relative flex w-full @lg:gap-5">
            <div className="flex flex-col gap-5 w-full ">
              <Container size="xs" className="prose mx-0">
                <h1>{article.title}</h1>
              </Container>

              <div className="flex flex-col-reverse @4xl:flex-row gap-5 w-full //mb-10">
                <Container size="xs" className="w-full flex-[2] mx-0">
                  <div className="//space-y-7 w-full">
                    <div className="relative  w-full //aspect-square aspect-[3/2] ">
                      <Image
                        src={article.image}
                        alt={`Image of ${article.title}`}
                        fill
                        className="object-cover inset-0 //rounded-sm"
                        placeholder="blur"
                        blurDataURL={article.image}
                        quality={100}
                      />
                    </div>
                  </div>
                </Container>
                <Container size="xs" className="flex-1 mx-0">
                  <div className="flex flex-col  @4xl:flex-col-reverse divide-y-[1px] @4xl:divide-y-0 divide-black/25 w-full h-full gap-5 justify-between">
                    <div className="flex flex-col space-y-3">
                      <p className="text-sm">
                        By <span className="text-teal-700 tracking-wide font-medium">{article.author.name}</span>, a
                        news editor who writes about technology, video games, and virtual worlds. He’s submitted several
                        accepted emoji proposals to the Unicode Consortium.
                      </p>
                      {/* <div dangerouslySetInnerHTML={{ __html: article.preview_link }}></div> */}
                      <p className="text-sm text-black/40">{formatDate(article.release_date)}</p>
                      <div className="//divide-x-2 flex //flex-col flex-row //gap-2.5 items-center ">
                        <div className="space-x-2.5 inline-block">
                          <button
                            type="button"
                            className="rounded-full bg-white //bg-teal-600 p-1 text-teal-600 hover:text-white border hover:border-teal-600 border-black/50 //shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                          >
                            <RiFacebookFill aria-hidden="true" className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            className="rounded-full bg-white //bg-teal-600 p-1 text-teal-600 hover:text-white border hover:border-teal-600 border-black/50 //shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                          >
                            <RiTwitterXFill aria-hidden="true" className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            className="rounded-full bg-white //bg-teal-600 p-1 text-teal-600 hover:text-white border hover:border-teal-600 border-black/50 //shadow-sm hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600"
                          >
                            <RiLinksFill aria-hidden="true" className="h-4 w-4" />
                          </button>
                        </div>

                        <span className="//mx-1 text-sm text-black/50 py-1 px-4">|</span>
                        <DiscussionDrawer />
                      </div>
                    </div>
                    <div className="prose pt-5 @4xl:pt-0">
                      <h2>
                        <span className="text-teal-600">&#8260;</span> {article.subtitle}
                      </h2>
                      {/* <div dangerouslySetInnerHTML={{ __html: article.preview_link }}></div> */}
                    </div>
                  </div>
                </Container>
              </div>

              <Container size="xs" className="mx-0">
                <article className="prose">
                  <PortableText value={article.article} />

                  <button
                    type="button"
                    className="w-fit bg-black px-4 py-2.5 text-sm font-semibold text-white  shadow-sm ring-1 ring-inset ring-gray-300 hover:text-[#d0ff4b] block mt-10"
                  >
                    Add a comment (0)
                  </button>
                </article>
              </Container>
            </div>
          </div>
        </Container>
      </main>
    </div>
  );
}
