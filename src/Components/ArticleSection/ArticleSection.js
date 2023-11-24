import React, { useEffect, useState } from 'react'
import './ArticleSection.css'
import ArticleBox from './ArticleBox'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/scrollbar';
import { useQuery } from 'react-query';
import useArticles from '../../Hooks/useArticles';


export default function ArticleSection() {


  // Get Articles From Server
  const { data: articles } = useArticles()

  return (
    <div className='article-section'>
      <Swiper
        scrollbar={{
          hide: true,
        }}
        breakpoints={{
          576: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1200: {
            slidesPerView: 3,
            spaceBetween: 60,
          },
          1600: {
            slidesPerView: 4,
            spaceBetween: 80,
          },
        }}
        modules={[Scrollbar]}
        className="mySwiper"
      >
        {articles?.filter(article => article.publish === 1).slice(0, 4).map(article => (
          <SwiperSlide>
            <ArticleBox key={article._id} {...article} />
          </SwiperSlide>
        ))}

      </Swiper>

    </div>


  )
}
{/*         */ }