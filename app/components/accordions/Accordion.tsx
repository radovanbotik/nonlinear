"use client";
import { cn } from "@/app/lib/helpers";
import { useState } from "react";

const data = [
  {
    id: 1,
    title: "Lorem",
    content: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    image: {
      href: "https://placehold.jp/400x400.png",
      alt: "image alt text",
      source: "placehold.co",
    },
  },
  {
    id: 2,
    title: "Lorem",
    content: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    image: {
      href: "https://placehold.jp/400x400.png",
      alt: "image alt text",
      source: "placehold.co",
    },
  },
  {
    id: 3,
    title: "Lorem",
    content: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    image: {
      href: "https://placehold.jp/400x400.png",
      alt: "image alt text",
      source: "placehold.co",
    },
  },
  {
    id: 4,
    title: "Lorem",
    content: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    image: {
      href: "https://placehold.jp/400x400.png",
      alt: "image alt text",
      source: "placehold.co",
    },
  },
  {
    id: 5,
    title: "Lorem",
    content: "Contrary to popular belief, Lorem Ipsum is not simply random text.",
    image: {
      href: "https://placehold.jp/400x400.png",
      alt: "image alt text",
      source: "placehold.co",
    },
  },
];

export default function Accordion() {
  const [activeIndex, setActiveIndex] = useState(0);

  function setIndex(i: number) {
    return setActiveIndex(i);
  }

  function isActiveIndex(i: number) {
    return i === activeIndex;
  }

  return (
    <div className="@lg:max-w-lg w-full @6xl:mx-0 mx-auto rounded-sm h-[600px] min-w-[320px]  py-5">
      <ul className="flex //flex-col w-full h-full">
        {data.map((object, i) => (
          <li
            key={object.id}
            className={cn(
              "bg-red-300 [&:not(:last-child)]:border-r //[&:not(:last-child)]:border-b border-black transition-all cursor-pointer min-w-20",
              isActiveIndex(i) && "grow"
            )}
            onClick={() => setIndex(i)}
          >
            <span style={{ writingMode: isActiveIndex(i) ? "initial" : "vertical-rl" }}>{object.title}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
