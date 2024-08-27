"use client";

import { ReactNode, useRef, useState } from "react";
import { SwiperRef } from "swiper/react";
import Carousel from "./Carousel";

import { cn } from "../lib/helpers";

import { RiArrowLeftSFill } from "react-icons/ri";
import { RiArrowRightSFill } from "react-icons/ri";

import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";

import { FeaturedSlideData } from "../genres/[slug]/featured/page";
import Image from "next/image";
import Artists from "./Artists";
import Link from "next/link";

function Grid({ id, slides }: { id: number; slides: FeaturedSlideData[] }) {
  return (
    <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  gap-2 ">
      {slides.map((slide, i) => (
        <li key={slide._id + i} className="relative shadow-xl">
          <div className="relative">
            <Image
              src={slide.image}
              alt={`Image of ${slide.title}`}
              className="block"
              width={200}
              height={200}
              placeholder="blur"
              blurDataURL={slide.image}
              quality={100}
            />
            <Link className="inset-0 absolute" href={`/releases/${slide.slug}`}></Link>
          </div>

          <div className="bg-gray-600 p-2 space-y-1 isolate">
            <div className="overflow-hidden leading-none">
              <Link className="font-bold text-white text-sm/4" href={`/releases/${slide.slug}`}>
                {slide.title}
              </Link>
            </div>
            <div className="overflow-hidden leading-none">
              <Artists artists={slide.artists} className="text-xs text-neutral-400" />
            </div>
            <div className="overflow-hidden leading-none">
              <Link className="text-xs text-neutral-400" href={`/label/${slide.label.href}`}>
                {slide.label.name}
              </Link>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default function LatestReleasesCarousel({
  slides,
}: {
  slides: { id: number; releases: FeaturedSlideData[] }[];
}) {
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
    <div className="relative w-full h-full flex flex-col isolate group overflow-hidden  //aspect-video">
      <div className="pb-3 flex items-center">
        <div className="inline-block leading-none text-xl tracking-tight font-medium text-white">Latest Releases</div>
        <div className="isolate inline-flex text-white space-x-1 ml-auto">
          <button
            onClick={() => slidePrev()}
            className="bg-gray-500 leading-none rounded-sm p-0.5 group/prevbutton hover:bg-gray-400"
          >
            <RiArrowLeftSFill className="w-4 h-4 text-gray-300 group-hover/prevbutton:text-white" />
          </button>

          <button
            onClick={() => slideNext()}
            className="bg-gray-500 leading-none rounded-sm p-0.5 group/prevbutton hover:bg-gray-400"
          >
            <RiArrowRightSFill className="w-4 h-4 text-gray-300 group-hover/prevbutton:text-white" />
          </button>
        </div>
      </div>
      <Carousel ref={swiperInstance} setCurrentIndex={setCurrentIndex} className="shadow-xl">
        {slides.map((slide, i) => (
          <Grid id={slide.id} key={slide.id + i} slides={slide.releases} />
        ))}
      </Carousel>

      <ul className="list-none flex w-full items-center space-x-1  py-2">
        {slides.map((_, i, arr) => (
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
