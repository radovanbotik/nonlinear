import { Container } from "@/app/components/Container";
import Link from "next/link";
import { cn } from "@/app/lib/helpers";
import Image from "next/image";

import { sanityFetch, client } from "@/sanity/client";
import { SanityDocument, PortableText } from "next-sanity";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";

import Subheader from "@/app/components/common/Subheader";
import { formatDate } from "@/app/helpers/formatDate";
import Sharing from "@/app/components/common/Sharing";
import Avatar from "@/app/components/common/Avatar";
import Dropdown from "@/app/components/common/Dropdown";
import { ChatBubbleOvalLeftEllipsisIcon, PlusIcon } from "@heroicons/react/24/outline";
import ButtonGroupWithDropdown from "@/app/components/common/ButtonGroupWithDropdown";

import { RiFacebookFill } from "react-icons/ri";
import { RiTwitterXFill } from "react-icons/ri";
import { RiLinksFill } from "react-icons/ri";
import { RiChat4Line } from "react-icons/ri";
import { RiChat4Fill } from "react-icons/ri";
import { RiChatForwardLine } from "react-icons/ri";
import Drawer from "@/app/components/common/Drawer";
import DiscussionDrawer from "@/app/components/discussion/DiscussionDrawer";

// function Content({ review }: { review: any }) {
//   return (
//     <div className="flex-1">
//       <div className="//@lg:max-w-lg mx-auto prose">
//         <PortableText value={review} />

//         <button
//           type="button"
//           className=" bg-black px-4 py-2.5 text-sm font-semibold text-white  shadow-sm ring-1 ring-inset ring-gray-300 hover:text-[#d0ff4b] block mt-10"
//         >
//           Add a comment (0)
//         </button>
//       </div>
//     </div>
//   );
// }

// function Preview({ image, title }: { image: string; title: string }) {
//   return (
//     <div className="flex-1 items-start">
//       <div className="relative @lg:max-w-lg mx-auto w-full aspect-square ">
//         <Image
//           src={image}
//           alt={`Image of ${title}`}
//           fill
//           className="object-cover inset-0 rounded-xl"
//           // sizes="(min-width: 640px) 80px, 64px"
//           placeholder="blur"
//           blurDataURL={image}
//           quality={100}
//         />
//       </div>
//     </div>
//   );
// }

// function Article({ className, data }: { className?: string; data: any }) {
//   return (
//     <article className={cn("flex flex-col gap-10 @3xl:flex-row-reverse w-full", className)}>
//       <Preview image={data.image} title={data.title} />
//       <Content review={data.article} />
//     </article>
//   );
// }

export default async function Review({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const QUERY = `*[_type=='news_article' && slug.current=='${slug}'][0]{
  article,
  author->{'name':author_name,'slug':slug.current,'image':image.asset->url},
  _createdAt,
  _id,
  'image':image.asset->url,
  'slug':slug.current,
  subtitle,
  title,
}`;

  const article = await sanityFetch<
    SanityDocument[] & {
      article: [];
      author: { name: string; slug: string; image: string };
      _createdAt: string;
      _id: string;
      image: string;
      slug: string;
      subtitle: string;
      title: string;
    }
  >({ query: QUERY });

  return (
    <div>
      {/* <Subheader breadcrums={{ href: "/", title: "Home" }} headline={article.title}>
        <div className="flex flex-wrap gap-5 text-lg">
          <div className="flex flex-col gap-1 ">
            <span className="block text-white/50 text-lg">Published</span>
            <span className="block text-white">{formatDate(article._createdAt)}</span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="block text-white/50 text-lg">Author</span>
            <span className="block text-white">{article.author.name}</span>
          </div>
        </div>
      </Subheader> */}

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
                        // sizes="(min-width: 640px) 80px, 64px"
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
                      <p className="text-sm text-black/40">{formatDate(article._createdAt)}</p>
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
                        {/* <button className="inline-flex gap-1  dark:hover:text-white/70 hover:text-black/70 px-2 py-1 border border-black/50 rounded-sm">
                          <div className="p-1">
                            <RiChat4Fill className="h-3 w-3 text-teal-600" />
                          </div>
                          <span className="inline-block text-sm self-center 0">
                            <span>Chat&nbsp;</span>
                            <span className="text-teal-600">(24)</span>
                          </span>
                        </button> */}
                      </div>
                    </div>
                    <div className="prose pt-5 @4xl:pt-0">
                      <h2>
                        <span className="text-teal-600">&#8260;</span> {article.subtitle}
                      </h2>
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
