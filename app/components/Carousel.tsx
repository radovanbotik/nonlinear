"use client";

import React, { forwardRef, ReactNode, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide, SwiperRef } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Pagination, Navigation, Autoplay } from "swiper/modules";

const CarouselTest = forwardRef<SwiperRef | null, { children: ReactNode[]; setCurrentIndex: (index: number) => void }>(
  function CarouselTest({ children, setCurrentIndex }, ref) {
    return (
      <>
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
          ref={ref}
        >
          {children.map((child, i, arr) => {
            return <SwiperSlide key={i}>{child}</SwiperSlide>;
          })}
        </Swiper>
      </>
    );
  }
);

export default CarouselTest;
