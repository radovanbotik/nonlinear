"use client";

import { forwardRef, ReactNode } from "react";
import { Swiper, SwiperRef, SwiperProps } from "swiper/react";

// import "swiper/swiper-bundle.css";
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { cn } from "../lib/helpers";

const Carousel = forwardRef<SwiperRef | null, SwiperProps & { children: ReactNode[]; className?: string }>(
  function Carousel({ children, className, ...props }, ref) {
    return (
      <Swiper className={cn("!w-full !h-full !max-w-full", className)} ref={ref} {...props}>
        {children}
      </Swiper>
    );
  }
);

export default Carousel;
