import React from 'react'
import './CourseDetailBox.css'
export default function CourseDetailBox({icon, title, value}) {
    return (
        <div className='course-info__left-side__box-info__course-detail__box__wrapper'>
            <h3 className="course-info__left-side__box-info__course-detail__box__key"> {icon}{title}</h3>
            <h3 className="course-info__left-side__box-info__course-detail__box__value">{value}</h3>
        </div>
    )
}
