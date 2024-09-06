"use client";

import { ReactElement, useRef, useState } from "react";
import { Swiper, SwiperProps, SwiperRef, SwiperSlide } from "swiper/react";
import { Grid, Pagination, Navigation } from "swiper/modules";

import { RiArrowLeftSFill, RiArrowLeftSLine, RiArrowRightSLine } from "react-icons/ri";
import { RiArrowRightSFill } from "react-icons/ri";

import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { cn } from "../lib/helpers";

type TCarouselProps = {
  id: string;
  className?: string;
  navigationStyle: "inside" | "outside";
  title?: string;
  children: ReactElement[];
};
export type TCarousel = TCarouselProps & SwiperProps;

export default function Carousel({ id, className, navigationStyle, title, children, ...props }: TCarousel) {
  //THIS HAS TO BE UNIQUE FOR EACH INSTANCE OF SLIDER
  const ID = id;
  const swiperInstance = useRef<SwiperRef>(null);
  const [isPrevControlDisabled, setIsPrevControlDisabled] = useState(true);
  const [isNextControlDisabled, setIsNextControlDisabled] = useState(false);

  return (
    <div className={cn("relative shrink w-full h-full flex flex-col isolate group overflow-hidden ", className)}>
      <div className="pb-3 flex items-center">
        <div className="inline-block leading-none text-xl tracking-tight font-medium text-white">{title}</div>
        {navigationStyle === "outside" && (
          <div className="isolate inline-flex text-white space-x-1 ml-auto">
            <button
              id={`buttonPrev-${ID}`}
              disabled={isPrevControlDisabled}
              className="bg-gray-600 disabled:bg-gray-700 disabled:pointer-events-none leading-none rounded-sm p-0.5 group/button hover:bg-gray-500 active:bg-gray-600  transition duration-300 ease-in-out"
              role="button"
              type="button"
              aria-label="Previous Slide"
            >
              <RiArrowLeftSFill
                aria-hidden="true"
                focusable="false"
                className="w-5 h-5 text-gray-300 group-hover/button:text-gray-50 group-active/button:text-gray-100 group-active/button:scale-90  transition  ease-in-out translate-x-0 duration-300   "
              />
              <span className="sr-only">Previous Slide</span>
            </button>

            <button
              id={`buttonNext-${ID}`}
              disabled={isNextControlDisabled}
              className="bg-gray-600 disabled:bg-gray-700 disabled:pointer-events-none leading-none rounded-sm p-0.5 group/button hover:bg-gray-500 active:bg-gray-600  transition duration-300 ease-in-out"
              role="button"
              type="button"
              aria-label="Next Slide"
            >
              <RiArrowRightSFill
                aria-hidden="true"
                focusable="false"
                className="w-5 h-5 text-gray-300  group-hover/button:text-gray-50 group-active/button:text-gray-100  group-active/button:scale-90 transition ease-in-out -translate-x-0  duration-300  "
              />
              <span className="sr-only">Next Slide</span>
            </button>
          </div>
        )}
      </div>
      <Swiper
        modules={[Grid, Navigation, Pagination]}
        navigation={{
          prevEl: `#buttonPrev-${ID}`,
          nextEl: `#buttonNext-${ID}`,
        }}
        pagination={{
          el: `#${ID}`,
          type: "bullets",
          bulletClass: `py-0.5 cursor-pointer bg-gray-500 flex-1 shrink w-full h-0.5 transition hover:bg-gray-400 transition ease-in-out duration-${props.speed} shadow-lg`,
          bulletActiveClass: "!bg-gray-300",
          clickable: true,
        }}
        onReachBeginning={() => setIsPrevControlDisabled(true)}
        onReachEnd={() => setIsNextControlDisabled(false)}
        onSlideNextTransitionStart={self => {
          const activeBullet = self.pagination.bullets.find(bullet => bullet.classList.contains("active"));
          activeBullet?.classList.add("hue-rotate-180", "scale-[1.01]");
        }}
        onSlideNextTransitionEnd={self => {
          const activeBullet = self.pagination.bullets.find(bullet => bullet.classList.contains("active"));
          activeBullet?.classList.remove("hue-rotate-180", "scale-[1.01]");
        }}
        onSlidePrevTransitionStart={self => {
          const activeBullet = self.pagination.bullets.find(bullet => bullet.classList.contains("active"));
          activeBullet?.classList.add("hue-rotate-180", "scale-[1.01]");
        }}
        onSlidePrevTransitionEnd={self => {
          const activeBullet = self.pagination.bullets.find(bullet => bullet.classList.contains("active"));
          activeBullet?.classList.remove("hue-rotate-180", "scale-[1.01]");
        }}
        ref={swiperInstance}
        className={cn("w-full h-full max-w-full max-h-full min-h-0 min-w-0")}
        {...props}
      >
        {children.map((child, i, arr) => (
          <SwiperSlide key={child.key} className="flex justify-center items-center w-full h-full">
            {child}
          </SwiperSlide>
        ))}
      </Swiper>

      {navigationStyle === "inside" && (
        <>
          <button
            className="group/button bg-transparent border-r-[25px] disabled:border-r-gray-200/50 disabled:pointer-events-none  border-r-gray-200/75  hover/button:border-r-gray-200/90 active:border-r-gray-200/75 w-[50px] h-[40px] rounded-full absolute top-1/2 -left-[25px] -translate-y-1/2 -translate-x-full z-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 ease-in-out transition"
            id={`buttonPrev-${ID}`}
            role="button"
            type="button"
            aria-label="Previous Slide"
          >
            <RiArrowLeftSLine
              aria-hidden="true"
              focusable="false"
              className="z-20 absolute top-1/2 -translate-y-1/2 left-[24px]  h-5 w-5 text-gray-600 group-disabled/button:text-gray-500 group-hover/button:text-gray-700 group-active/button:text-gray-600  ease-in-out transition translate-x-0  group-active/button:-translate-x-px"
            />
            <span className="sr-only">Previous Slide</span>
          </button>

          <button
            className="group/button bg-transparent border-l-[25px] disabled:border-l-gray-200/50 disabled:pointer-events-none  border-l-gray-200/75 hover/button:border-l-gray-200/90 active:border-l-gray-200/75  w-[50px] h-[40px] rounded-full absolute top-1/2 -right-[25px] -translate-y-1/2 translate-x-full z-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 ease-in-out transition"
            id={`buttonNext-${ID}`}
            role="button"
            type="button"
            aria-label="Next Slide"
          >
            <RiArrowRightSLine
              aria-hidden="true"
              focusable="false"
              className="z-20 absolute top-1/2 -translate-y-1/2 right-[24px]  h-5 w-5 text-gray-600 group-hover/button:text-gray-700 group-active/button:text-gray-600  ease-in-out transition translate-x-0  group-active/button:translate-x-px"
            />
            <span className="sr-only">Next Slide</span>
          </button>
        </>
      )}

      <div id={ID} className="mt-2 w-full flex gap-1 py-1"></div>
    </div>
  );
}
