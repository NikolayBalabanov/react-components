import React, { FC, ReactNode } from 'react';
import { Swiper } from 'swiper/react';
import { Pagination, Scrollbar, A11y, Navigation, Autoplay } from 'swiper';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

interface ISwipedList {
  children: ReactNode[];
}

export const SwipedList: FC<ISwipedList> = ({ children }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
      spaceBetween={10}
      breakpoints={{
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 3,
          spaceBetween: 20,
        },
        640: {
          slidesPerView: 4,
          spaceBetween: 24,
        },
        1024: {
          slidesPerView: 6,
          spaceBetween: 24,
        },
      }}
      navigation
      autoplay={{ delay: 3000 }}
      loop
    >
      {children}
    </Swiper>
  );
};
