import React from 'react'
import './NotFoundCourses.css'
export default function NotFoundCourses({title}) {
  return (
    <>
      <div className="category__course-not-found__wrapper">
        <img src="/images/svgs/notFoundCourse.jpg" alt="notFound" className='category__course-not-found__image' />
        <h1 className="category__course-not-found__title">{title} ای یافت نشد</h1>
        <h1 className="category__course-not-found__text">متاسفانه {title} ای در این دسته بندی وجود ندارد</h1>
      </div>
    </>
  )
}
