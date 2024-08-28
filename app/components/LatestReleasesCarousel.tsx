"use client";

import { useRef, useState } from "react";
import { SwiperRef, SwiperSlide } from "swiper/react";
import { Grid, Pagination } from "swiper/modules";

import Carousel from "./Carousel";

import { RiArrowLeftSFill } from "react-icons/ri";
import { RiArrowRightSFill } from "react-icons/ri";

import { FeaturedSlideData } from "../genres/[slug]/featured/page";
import Image from "next/image";
import Artists from "./Artists";
import Link from "next/link";

function Feature({ artists, _id, image, label, release_date, slug, title }: FeaturedSlideData) {
  return (
    <div key={_id} className="relative shadow-lg bg-gray-700">
      <div className="relative transition-transform duration-75 ease-in-out hover:scale-[0.99] ">
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
        <Link className="inset-0 absolute" href={`/releases/${slug}`}></Link>
      </div>

      <div className="bg-gray-600 p-2 space-y-0.5 isolate">
        <div className="overflow-hidden leading-none">
          <Link className="font-bold text-white text-sm/4" href={`/releases/${slug}`}>
            {title}
          </Link>
        </div>
        <div className="overflow-hidden leading-none">
          <Artists artists={artists} className="text-xs text-neutral-400" />
        </div>
        <div className="overflow-hidden leading-none">
          <Link className="text-xs text-neutral-400" href={`/label/${label.href}`}>
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
            onClick={() => slidePrev()}
            disabled={isPrevControlDisabled}
            className="bg-gray-500 disabled:bg-gray-600 disabled:pointer-events-none leading-none rounded-sm p-0.5 group/button hover:bg-gray-400 active:bg-gray-600  transition ease-in-out"
          >
            <RiArrowLeftSFill className="w-5 h-5 text-gray-300 group-hover/button:text-gray-50 group-active/button:text-gray-100 group-active/button:scale-90  transition  ease-in-out translate-x-0   group-active/button:-translate-x-px" />
          </button>

          <button
            onClick={() => slideNext()}
            disabled={isNextControlDisabled}
            className="bg-gray-500 disabled:bg-gray-600 disabled:pointer-events-none leading-none rounded-sm p-0.5 group/button hover:bg-gray-400 active:bg-gray-600  transition ease-in-out"
          >
            <RiArrowRightSFill className="w-5 h-5 text-gray-300  group-hover/button:text-gray-50 group-active/button:text-gray-100  group-active/button:scale-90 transition ease-in-out -translate-x-0   group-active/button:translate-x-px" />
          </button>
        </div>
      </div>
      <Carousel
        modules={[Grid, Pagination]}
        pagination={{
          el: `#${ID}`,
          type: "bullets",
          bulletClass:
            "py-0.5 cursor-pointer bg-gray-500 flex-1 w-full h-0.5 transition hover:bg-gray-400 transition ease-in-out duration-300 shadow-lg",
          bulletActiveClass: "!bg-gray-300",
          clickable: true,
        }}
        onSlideChange={self => {
          self.realIndex <= 5 ? setIsPrevControlDisabled(true) : setIsPrevControlDisabled(false);
          self.realIndex >= self.slides.length / 2 - 5
            ? setIsNextControlDisabled(true)
            : setIsNextControlDisabled(false);
          console.log(self.realIndex);
        }}
        onSlideNextTransitionStart={self => {
          const activeBullet = self.pagination.bullets.find(bullet => bullet.classList.contains("active"));
          activeBullet?.classList.add("hue-rotate-180");
          activeBullet?.classList.add("scale-[1.01]");
        }}
        onSlideNextTransitionEnd={self => {
          const activeBullet = self.pagination.bullets.find(bullet => bullet.classList.contains("active"));
          activeBullet?.classList.remove("scale-[1.01]");
          activeBullet?.classList.remove("hue-rotate-180");
        }}
        onSlidePrevTransitionStart={self => {
          const activeBullet = self.pagination.bullets.find(bullet => bullet.classList.contains("active"));
          activeBullet?.classList.add("hue-rotate-180");
          activeBullet?.classList.add("scale-[1.01]");
        }}
        onSlidePrevTransitionEnd={self => {
          const activeBullet = self.pagination.bullets.find(bullet => bullet.classList.contains("active"));
          activeBullet?.classList.remove("scale-[1.01]");
          activeBullet?.classList.remove("hue-rotate-180");
        }}
        slidesPerView={5}
        slidesPerGroup={5}
        grid={{
          rows: 2,
          fill: "row",
        }}
        spaceBetween={8}
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
