"use client";

import { ReactNode, useRef, useState } from "react";
import { SwiperRef } from "swiper/react";
import CarouselTest from "./Carousel";

import { cn } from "../lib/helpers";

import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";

export default function CarouselWith({ children }: { children: ReactNode[] }) {
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
    <div className="relative w-full h-full flex flex-col isolate group overflow-hidden ">
      <CarouselTest ref={swiperInstance} setCurrentIndex={setCurrentIndex}>
        {children}
      </CarouselTest>

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
              console.log("clicking to:", i);
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
