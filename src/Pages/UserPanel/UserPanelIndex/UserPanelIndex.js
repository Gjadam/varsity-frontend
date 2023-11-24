import React, { useEffect, useState } from 'react'
import UserPanelBox from '../../../Components/UserPanelBox/UserPanelBox'
import './UserPanelIndex.css'
import MiniCourseBox from '../../../Components/MiniCourseBox/MiniCourseBox'
import NotFoundCourses from '../../../Components/NotFoundCourses/NotFoundCourses'
import UserDataTable from '../UserDataTable/UserDataTable'
import { PiMonitorPlayFill, PiPercentFill } from 'react-icons/pi'
import { RiMoneyDollarBoxFill } from 'react-icons/ri'
import useUserCourses from '../../../Hooks/useUserCourses'

export default function UserPanelIndex() {

  // Get User Courses From Server
  const { data: courses } = useUserCourses()

  const freeCourses = courses?.filter(course => course.price === 0)
  const PaidCourses = courses?.filter(course => course.price !== 0)

  return (
    <>
      <div className="user-panel-index">
        <UserPanelBox title={'همه دوره ها'} count={courses?.length} icon={<PiMonitorPlayFill className='user-panel-box__icon' />} />
        <UserPanelBox title={'دوره های رایگان'} count={freeCourses?.length} icon={<PiPercentFill className='user-panel-box__icon' />} />
        <UserPanelBox title={'دوره های نقدی'} count={PaidCourses?.length} icon={<RiMoneyDollarBoxFill className='user-panel-box__icon' />} />
      </div>
      <UserDataTable title={'دوره های من'} >
        <div className="user-courses">
          {
            courses?.length !== 0 ? (
              courses?.map(course => (
                <MiniCourseBox key={course._id} {...course.course} />
              ))
            ) : (
              <NotFoundCourses title={'دوره'} />
            )

          }
        </div>
      </UserDataTable>
    </>

  )
}
