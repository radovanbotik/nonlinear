"use client";

import { useRef } from "react";
import { SwiperRef, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import Carousel from "./Carousel";

import { RiArrowLeftSLine } from "react-icons/ri";
import { RiArrowRightSLine } from "react-icons/ri";
import { FeaturedSlideData } from "../genres/[slug]/featured/page";
import Image from "next/image";
import Artists from "./Artists";
import Link from "next/link";

function Feature({ artists, _id, image, label, release_date, slug, title }: FeaturedSlideData) {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden group transition ease-in-out">
      <div className=" cursor-grab absolute inset-0 bg-teal-600 //active:bg-teal-500 isolate after:-z-10 after:absolute after:bg-gradient-to-t from-gray-900/40 via-transparent to-gray-900/10 after:inset-0 after:w-full after:h-full after:pointer-events-none "></div>
      <div className="relative">
        <Image
          src={image}
          alt={`Image of ${title}`}
          className="drop-shadow-xl shadow-xl "
          width={300}
          height={300}
          placeholder="blur"
          blurDataURL={image}
          quality={100}
        />
        <Link href={`/releases/${slug}`} className="absolute inset-0"></Link>
      </div>
      <div className="isolate absolute bg-gray-900 z-20  bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-60 w-full left-0 h-1/4 min-h-28 bottom-0  text-gray-50 flex flex-col gap-2 p-3 opacity-0 translate-y-full transition group-hover:translate-y-0 group-hover:opacity-100">
        <div>
          <Link href={`/releases/${slug}`} className="hover:underline text-xl font-medium leading-none">
            {title}
          </Link>
        </div>
        <div className="flex flex-wrap items-baseline mb-1">
          <Artists artists={artists} className="isolate text-sm leading-none tracking-tight" />
          <span className=" leading-none">&nbsp;&nbsp;</span>
          <Link href={`/labels/${label.href}`} className="text-xs  leading-none text-gray-400 ">
            {label.name}
          </Link>
        </div>
        <div>
          <button className="min-w-20 bg-teal-700 hover:bg-teal-600 rounded-sm">
            <span className="inline-block text-xs font-bold my-2 mx-3 ">Add to basket</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default function FeatureCarousel({ id, featured }: { id: string; featured: FeaturedSlideData[] }) {
  //THIS HAS TO BE UNIQUE FOR EACH INSTANCE OF SLIDER
  const ID = id;
  const swiperInstance = useRef<SwiperRef>(null);

  return (
    <div className="relative w-full h-full flex flex-col isolate group overflow-hidden  //aspect-square lg:aspect-video">
      <Carousel
        modules={[Autoplay, Navigation, Pagination]}
        pagination={{
          el: `#${ID}`,
          type: "bullets",
          bulletClass:
            "relative py-0.5 cursor-pointer bg-gray-500 flex-1 w-full hover:bg-gray-400 transition ease-in-out duration-300 shadow-lg",
          bulletActiveClass: "!bg-gray-300 active",
          clickable: true,
        }}
        navigation={{
          prevEl: `#buttonPrev-${ID}`,
          nextEl: `#buttonNext-${ID}`,
        }}
        autoplay={{
          delay: 2500,
          disableOnInteraction: true,
        }}
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
        loop={true}
        ref={swiperInstance}
        className="shadow-xl"
      >
        {featured.map(feature => (
          <SwiperSlide key={feature._id} className="relative">
            <Feature {...feature} />
          </SwiperSlide>
        ))}
      </Carousel>

      <button
        className="group/button bg-transparent border-r-[25px] disabled:border-r-gray-200/50 disabled:pointer-events-none  border-r-gray-200/75  hover/button:border-r-gray-200/90 active:border-r-gray-200/75 w-[50px] h-[40px] rounded-full absolute top-1/2 -left-[25px] -translate-y-1/2 -translate-x-full z-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 ease-in-out transition"
        id={`buttonPrev-${ID}`}
      >
        <div className="z-20 absolute top-1/2 -translate-y-1/2 left-[24px] ">
          <RiArrowLeftSLine className="h-5 w-5 text-gray-600 group-disabled/button:text-gray-500 group-hover/button:text-gray-700 group-active/button:text-gray-600  ease-in-out transition translate-x-0  group-active/button:-translate-x-px" />
        </div>
      </button>

      <button
        className="group/button flex items-center justify-center bg-transparent border-l-[25px] disabled:border-r-gray-200/50 disabled:pointer-events-none  border-r-gray-200/75 hover/button:border-l-gray-200/90 active:border-l-gray-200/75  w-[50px] h-[40px] rounded-full absolute top-1/2 -right-[25px] -translate-y-1/2 translate-x-full z-10 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 ease-in-out transition"
        id={`buttonNext-${ID}`}
      >
        <div className="z-20 absolute top-1/2 -translate-y-1/2 right-[24px] ">
          <RiArrowRightSLine className="h-5 w-5 text-gray-600 group-hover/button:text-gray-700 group-active/button:text-gray-600  ease-in-out transition translate-x-0  group-active/button:translate-x-px" />
        </div>
      </button>

      <div id={ID} className="mt-2 w-full flex gap-1 py-1"></div>
    </div>
  );
}
