import { StaticImageData } from "next/image";

export type ImageType = {
  href: string;
  alt: string;
  source: string;
};
export type PostData = {
  slug: string;
  headline: string;
  drophead?: string;
  byline: string;
  image: ImageType;
  author: { name: string; slug: string };
  datetime: string;
  date: string;
};

export type Artist = {
  slug: string;
  name: string;
  firstName: string;
  lastName: string;
  bio: string;
  image: StaticImageData;
};
