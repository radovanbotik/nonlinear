import Image from "next/image";
import Link from "next/link";
import Artists from "./Artists";
import { ReactNode } from "react";

export default function MediaObject({
  children,
  image,
  title,
  href,
}: {
  children: ReactNode;
  image: string;
  href: string;
  title: string;
}) {
  return (
    <div className="flex relative items-center group hover:bg-gray-600 py-2 px-2 overflow-hidden">
      <div className="mr-4 flex-shrink-0 relative  max-w-full">
        <Image
          src={image}
          alt={`Image of ${title}`}
          width={48}
          height={48}
          placeholder="blur"
          blurDataURL={image}
          quality={100}
        />
        {href && <Link href={`/releases/${href}`} className="absolute inset-0"></Link>}
      </div>
      <div className="truncate">
        {href ? (
          <Link href={`/releases/${href}`} className="block text-sm font-medium text-gray-50">
            {title}
          </Link>
        ) : (
          <div className="text-sm font-medium text-gray-50">{title}</div>
        )}
        {children}
      </div>
    </div>
  );
}
