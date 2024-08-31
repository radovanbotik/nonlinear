import { ReactNode } from "react";
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

export default function RootLayout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: { slug: string };
}>) {
  const { slug } = params;

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
            {children}
          </div>
          <aside className="block w-3/12 bg-gray-700"></aside>
        </div>
      </Container>
    </div>
  );
}
