"use client";

import React, { ReactNode, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { cn } from "../lib/helpers";

import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";

export default function Carousel({ children }: { children: ReactNode[] }) {
  const swiperInstance = useRef<SwiperRef | null>(null);

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

  useEffect(() => {
    console.log(swiperInstance.current?.swiper.realIndex);
  }, []);

  return (
    <>
      <div className="relative w-full h-full flex flex-col isolate group overflow-hidden ">
        <Swiper
          slidesPerView={1}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          onSlideChange={self => {
            setCurrentIndex(self.realIndex);
          }}
          modules={[Pagination, Navigation, Autoplay]}
          className="w-full h-full"
          ref={swiperInstance}
        >
          {children.map((child, i, arr) => {
            return <SwiperSlide key={i}>{child}</SwiperSlide>;
          })}
        </Swiper>

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
      </div>
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
    </>
  );
}
