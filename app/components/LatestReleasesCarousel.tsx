"use client";

import { useRef, useState } from "react";
import { SwiperRef, SwiperSlide } from "swiper/react";
import { Grid, Pagination, Navigation } from "swiper/modules";

import Carousel from "./Carousel";

import { RiArrowLeftSFill } from "react-icons/ri";
import { RiArrowRightSFill } from "react-icons/ri";
import { RiPlayFill } from "react-icons/ri";
import { RiPlayListAddFill } from "react-icons/ri";

import { FeaturedSlideData } from "../genres/[slug]/featured/page";
import Image from "next/image";
import Artists from "./Artists";
import Link from "next/link";

function Feature({ artists, _id, image, label, release_date, slug, title }: FeaturedSlideData) {
  return (
    <div key={_id} className="relative group/parent shadow-lg bg-gray-700">
      <div className="relative overflow-hidden transition-transform duration-75 ease-in-out group/image">
        <Link className="inset-0 absolute" href={`/releases/${slug}`}></Link>
        <Image
          src={image}
          alt={`Image of ${title}`}
          className="block"
          width={200}
          height={200}
          placeholder="blur"
          blurDataURL={image}
          quality={100}
        />
        <div className="absolute bottom-0 left-0 translate-y-full flex w-full bg-gray-950 opacity-0  group-hover/parent:translate-y-0 group-hover/parent:opacity-100 transition">
          <div className="w-full flex justify-evenly">
            <button className="relative inline-block  //mx-auto group/button ">
              <RiPlayFill className="text-gray-300 w-4 h-4" />
              <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
            </button>

            <button className="relative inline-block  //mx-auto group/button ">
              <RiPlayListAddFill className="text-gray-300 w-4 h-4" />
              <div className="group-hover/button:opacity-100 absolute opacity-0 transition ease-in-out top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-[0px_0px_16px_3px_#f7fafc]"></div>
            </button>
          </div>

          <div className="w-full">
            <button className="w-full px-3 text-xs py-1.5 text-gray-300  bg-teal-800 hover:bg-teal-600 hover:text-gray-50 active:!bg-teal-500 transition">
              download
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-700 p-2 space-y-0.5 isolate">
        <div className="overflow-hidden leading-none">
          <Link className="font-bold text-white text-sm/4" href={`/releases/${slug}`}>
            {title}
          </Link>
        </div>
        <div className="overflow-hidden leading-none">
          <Artists artists={artists} className="text-xs text-neutral-400 tracking-tight" />
        </div>
        <div className="overflow-hidden leading-none">
          <Link className="text-xs text-neutral-400 tracking-tight" href={`/label/${label.href}`}>
            {label.name}
          </Link>
        </div>
      </div>
    </div>
  );
}
export default function LatestReleasesCarousel({
  id,
  slides,
  title,
}: {
  id: string;
  slides: FeaturedSlideData[];
  title: string;
}) {
  //THIS HAS TO BE UNIQUE FOR EACH INSTANCE OF SLIDER
  const ID = id;
  const speed = 300;
  const swiperInstance = useRef<SwiperRef>(null);
  const [isPrevControlDisabled, setIsPrevControlDisabled] = useState(true);
  const [isNextControlDisabled, setIsNextControlDisabled] = useState(false);

  function slidePrev() {
    swiperInstance.current?.swiper.slidePrev();
  }
  function slideNext() {
    swiperInstance.current?.swiper.slideNext();
  }

  return (
    <div className="relative w-full h-full flex flex-col isolate group overflow-hidden  //aspect-video">
      <div className="pb-3 flex items-center">
        <div className="inline-block leading-none text-xl tracking-tight font-medium text-white">{title}</div>
        <div className="isolate inline-flex text-white space-x-1 ml-auto">
          <button
            id={`buttonPrev-${ID}`}
            disabled={isPrevControlDisabled}
            className="bg-gray-600 disabled:bg-gray-700 disabled:pointer-events-none leading-none rounded-sm p-0.5 group/button hover:bg-gray-500 active:bg-gray-600  transition duration-300 ease-in-out"
          >
            <RiArrowLeftSFill className="w-5 h-5 text-gray-300 group-hover/button:text-gray-50 group-active/button:text-gray-100 group-active/button:scale-90  transition  ease-in-out translate-x-0 duration-300   " />
          </button>

          <button
            id={`buttonNext-${ID}`}
            disabled={isNextControlDisabled}
            className="bg-gray-600 disabled:bg-gray-700 disabled:pointer-events-none leading-none rounded-sm p-0.5 group/button hover:bg-gray-500 active:bg-gray-600  transition duration-300 ease-in-out"
          >
            <RiArrowRightSFill className="w-5 h-5 text-gray-300  group-hover/button:text-gray-50 group-active/button:text-gray-100  group-active/button:scale-90 transition ease-in-out -translate-x-0  duration-300  " />
          </button>
        </div>
      </div>
      <Carousel
        modules={[Grid, Navigation, Pagination]}
        navigation={{
          prevEl: `#buttonPrev-${ID}`,
          nextEl: `#buttonNext-${ID}`,
        }}
        speed={speed}
        pagination={{
          el: `#${ID}`,
          type: "bullets",
          bulletClass: `py-0.5 cursor-pointer bg-gray-500 flex-1 w-full h-0.5 transition hover:bg-gray-400 transition ease-in-out duration-${speed} shadow-lg`,
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
        slidesPerView={2}
        slidesPerGroup={2}
        spaceBetween={4}
        grid={{
          rows: 2,
          fill: "row",
        }}
        breakpoints={{
          640: { slidesPerGroup: 2, slidesPerView: 2, spaceBetween: 4, grid: { fill: "row", rows: 2 } },
          768: { slidesPerGroup: 3, slidesPerView: 3, spaceBetween: 4, grid: { fill: "row", rows: 2 } },
          1024: { slidesPerGroup: 4, slidesPerView: 4, spaceBetween: 8, grid: { fill: "row", rows: 2 } },
          1240: { slidesPerGroup: 5, slidesPerView: 5, spaceBetween: 8, grid: { fill: "row", rows: 2 } },
        }}
        ref={swiperInstance}
        className="shadow-xl"
      >
        {slides.map((slide, i) => (
          <SwiperSlide key={slide._id + i} className="flex justify-center items-center">
            <Feature {...slide} />
          </SwiperSlide>
        ))}
      </Carousel>

      <div id={ID} className="mt-2 w-full flex gap-1 py-1"></div>
    </div>
  );
}
