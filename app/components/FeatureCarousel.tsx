"use client";

import { ReactNode, useRef, useState } from "react";
import { SwiperRef } from "swiper/react";
import Carousel from "./Carousel";

import { cn } from "../lib/helpers";

import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";
import { FeaturedSlideData } from "../genres/[slug]/featured/page";
import Image from "next/image";
import Artists from "./Artists";

function Feature({ artists, _id, image, label, release_date, slug, title }: FeaturedSlideData) {
  return (
    <div className="relative w-full h-full flex items-center justify-center bg-indigo-400 overflow-hidden group">
      <Image
        src={image}
        alt={`Image of ${title}`}
        className="drop-shadow-2xl shadow-2xl"
        width={300}
        height={300}
        placeholder="blur"
        blurDataURL={image}
        quality={100}
      />
      <div className="absolute bg-black/75 w-full left-0 h-1/4 bottom-0 z-10 text-white flex flex-col gap-1.5 p-3 //opacity-0 //translate-y-full transition group-hover:translate-y-0 group-hover:opacity-100">
        <div className="text-xl font-medium">{title}</div>
        <div className="">
          <Artists artists={artists} />
        </div>
        <div></div>
      </div>
    </div>
  );
}

export default function FeatureCarousel({ featured }: { featured: FeaturedSlideData[] }) {
  const swiperInstance = useRef<SwiperRef>(null);

  function slidePrev() {
    swiperInstance.current?.swiper.slidePrev();
  }
  function slideNext() {
    swiperInstance.current?.swiper.slideNext();
  }
  function slideTo(index: number) {
    swiperInstance.current?.swiper.slideToLoop(index);
  }

  function isCurrent(releaseIndex: number, slideIndex: number | undefined) {
    if (typeof slideIndex === "undefined") return false;
    return releaseIndex === slideIndex;
  }

  const [currentIndex, setCurrentIndex] = useState(swiperInstance.current?.swiper.activeIndex);

  return (
    <div className="relative w-full h-full flex flex-col isolate group overflow-hidden  aspect-video">
      <Carousel ref={swiperInstance} setCurrentIndex={setCurrentIndex}>
        {featured.map(feature => (
          <Feature {...feature} key={feature._id} />
        ))}
      </Carousel>

      <button
        className="flex items-center justify-center bg-transparent border-r-[25px] border-r-white/50  w-[50px] h-[40px] rounded-full absolute top-1/2 -left-[25px] -translate-y-1/2 -translate-x-full z-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition"
        onClick={() => slidePrev()}
      >
        <div className="z-20 absolute top-1/2 -translate-y-1/2 left-[24px] ">
          <RiArrowLeftSLine className="h-5 w-5 text-black" />
        </div>
      </button>

      <button
        className="flex items-center justify-center bg-transparent border-l-[25px] border-l-white/50  w-[50px] h-[40px] rounded-full absolute top-1/2 -right-[25px] -translate-y-1/2 translate-x-full z-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 transition"
        onClick={() => slideNext()}
      >
        <div className="z-20 absolute top-1/2 -translate-y-1/2 right-[24px] ">
          <RiArrowRightSLine className="h-5 w-5 text-black" />
        </div>
      </button>

      <ul className="list-none flex w-full items-center space-x-1  py-1">
        {swiperInstance.current?.swiper.slides.map((_, i, arr) => (
          <li
            key={i}
            className="apperance-none leading-[0] flex-1 w-full  cursor-pointer py-1"
            onClick={() => {
              slideTo(i);
            }}
          >
            <button
              className={cn(
                "m-0 p-0 w-full bg-teal-600 h-1",
                isCurrent(i, currentIndex) ? "bg-teal-400" : "bg-teal-600"
              )}
            ></button>
          </li>
        ))}
      </ul>
    </div>
  );
}
