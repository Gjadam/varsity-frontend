import React, { useEffect, useState } from 'react'
import './Courses.css'
import NavBar from '../../Components/NavBar/NavBar'
import ToUp from '../../Components/ToUp/ToUp'
import Footer from '../../Components/Footer/Footer'
import CourseBox from '../../Components/CoursesSection/CourseBox'
import Pagination from '../../Components/Pagination/Pagination'
import CategoryHeader from '../../Components/CategoryHeader/CategoryHeader'
import useCourses from '../../Hooks/useCourses'

export default function Courses() {
  
  // Get Courses From Server
  const { data: courses } = useCourses()
  const [showCourses, setShowCourses] = useState([])


  return (
    <>
      <NavBar />
      <ToUp />
      <CategoryHeader TitleName={'Varsity'} title={'دوره های محبوب'} />
      <div className='container'>
        <div className="courses-box__wrapper">
          {
            showCourses.map(course => (
              <CourseBox key={course._id} {...course} />
            ))
          }
        </div>
        <Pagination
          items={courses}
          itemsCount={3}
          pathName={'/courses'}
          setShowCourses={setShowCourses}
        />
      </div>
      <Footer />
    </>
  )
}
