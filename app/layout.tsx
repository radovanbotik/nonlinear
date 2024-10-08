import { ReactNode } from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import type { Metadata } from "next";
import logowhite from "../public/logowhite.png";

import VerticalNavigation from "@/app/components/VerticalNavigation";

import { RiHeart3Line } from "react-icons/ri";
import { RiHeart3Fill } from "react-icons/ri";

import { RiPlayList2Line } from "react-icons/ri";
import { RiPlayList2Fill } from "react-icons/ri";

import { RiDownload2Line } from "react-icons/ri";
import { RiDownload2Fill } from "react-icons/ri";

import { RiListUnordered } from "react-icons/ri";
import { Container } from "./components/Container";
import Navigation from "./components/Navigation";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

const inter = Inter({ subsets: ["latin"] });

export default async function Layout({
  children,
  params,
}: Readonly<{
  children: ReactNode;
  params: { slug: string };
}>) {
  const { slug } = params;

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

  const navbar = {
    logo: { src: logowhite, alt: "this is nonlinear" },
    profileNavigation: [
      { href: "/account/settings", title: "Account Settings" },
      { href: "/logout", title: "Log Out" },
    ],
    siteNavigation: [
      // { href: "/", title: "Home" },
      {
        title: "Genres",
        children: [
          {
            href: "/genres/jungle/featured",
            title: "Jungle",
          },
          {
            href: "/genres/house/featured",
            title: "House",
          },
          {
            href: "/genres/drum-and-bass/featured",
            title: "Drum & Bass",
          },
          {
            href: "/genres/techno/featured",
            title: "Techno",
          },
          {
            href: "/genres/dubstep/featured",
            title: "Dubstep",
          },
          {
            href: "/genres/deep-house/featured",
            title: "Deep House",
          },
          {
            href: "/genres/ambient/featured",
            title: "Ambient",
          },
          {
            href: "/genres/trap/featured",
            title: "Trap",
          },
          {
            href: "/genres/hiphop/featured",
            title: "Hip Hop",
          },
          {
            href: "/genres/bass/featured",
            title: "Bass",
          },
          {
            href: "/genres/footwork/featured",
            title: "Footwork",
          },
          {
            href: "/genres/trance/featured",
            title: "Trance",
          },
        ],
      },
    ],
  };

  return (
    <html lang="en" className="//dark">
      <body className={`${inter.className}   dark:bg-black`}>
        <Navigation
          logo={navbar.logo}
          profileNavigation={navbar.profileNavigation}
          siteNavigation={navbar.siteNavigation}
        />
        <div className="bg-gray-800 py-7">
          <Container size="xl">
            <div className="flex w-full justify-between gap-x-6">
              <aside className="hidden xl:block w-52  bg-gray-700">
                <VerticalNavigation navigation={navigation} />
              </aside>
              <div className="flex-1 max-w-full max-h-full min-h-0 min-w-0">
                <div className="max-w-full  max-h-full min-h-0 min-w-0">{children}</div>
              </div>
            </div>
          </Container>
        </div>
      </body>
    </html>
  );
}
