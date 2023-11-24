import React, { useEffect, useState } from 'react'
import './CoursesSection.css'
import CourseBox from './CourseBox'
import useCourses from '../../Hooks/useCourses'

export default function CoursesSection() {

  // Get Courses From Server
  const { data } = useCourses()


  return (
    <div className="container">
      <div className='course-section'>
        {data?.splice(0, 4)?.map(course => (
          <CourseBox key={course.id} {...course} />
        ))}
      </div>
    </div>

  )
}
