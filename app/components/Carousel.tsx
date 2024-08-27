"use client";

import React, { forwardRef, ReactNode, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { cn } from "../lib/helpers";

const Carousel = forwardRef<
  SwiperRef | null,
  { children: ReactNode[]; className?: string; setCurrentIndex: (index: number) => void }
>(function Carousel({ children, className, setCurrentIndex }, ref) {
  return (
    <>
      <Swiper
        slidesPerView={1}
        loop={true}
        // autoplay={{
        //   delay: 2500,
        //   disableOnInteraction: true,
        // }}
        onSlideChange={self => {
          setCurrentIndex(self.realIndex);
        }}
        modules={[Pagination, Navigation, Autoplay]}
        className={cn("w-full h-full", className)}
        ref={ref}
      >
        {children.map((child, i, arr) => {
          return <SwiperSlide key={i}>{child}</SwiperSlide>;
        })}
      </Swiper>
    </>
  );
});

export default Carousel;
