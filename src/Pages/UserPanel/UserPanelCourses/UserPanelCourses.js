import React, { useEffect, useState } from 'react'
import './UserPanelCourses.css'
import MiniCourseBox from '../../../Components/MiniCourseBox/MiniCourseBox'
import UserDataTable from '../UserDataTable/UserDataTable'
import NotFoundCourses from '../../../Components/NotFoundCourses/NotFoundCourses'
import useUserCourses from '../../../Hooks/useUserCourses'
export default function UserPanelCourses() {

    const [showCourseState, setShowCourseState] = useState("all")
    const [showCourses, setShowCourses] = useState([])

    const { data: courses } = useUserCourses()

    const filterCourses = (state) => {
        switch (state) {
            case 'all': {
                setShowCourses(courses)
                break
            }
            case 'free': {
                const filteredCourses = courses.filter(course => course.course.price === 0)
                setShowCourses(filteredCourses)
                break
            }
            case 'money': {
                const filteredCourses = courses.filter(course => course.course.price !== 0)
                setShowCourses(filteredCourses)
                break
            }
            default: {
                setShowCourses(courses)
                break
            }
        }
    }

    return (
        <UserDataTable title={'دوره های من'} >
            <div className="filter-courses">
                <div className="filter-courses__item">
                    <h1 className={`filter-courses__item__title ${showCourseState === 'all' ? 'filter-courses__item__title--active' : null}`} onClick={() => { setShowCourseState("all"); filterCourses("all") }}>همه دوره ها</h1>
                </div>
                <div className="filter-courses__item">
                    <h1 className={`filter-courses__item__title ${showCourseState === 'free' ? 'filter-courses__item__title--active' : null}`} onClick={() => { setShowCourseState("free"); filterCourses("free") }}>دوره های رایگان</h1>
                </div>
                <div className="filter-courses__item">
                    <h1 className={`filter-courses__item__title ${showCourseState === 'money' ? 'filter-courses__item__title--active' : null}`} onClick={() => { setShowCourseState("money"); filterCourses("money") }}>دوره های نقدی</h1>
                </div>
            </div>
            <div className="user-courses">
                {
                    showCourses.length !== 0 ? (
                        showCourses.map(course => (
                            <MiniCourseBox key={course._id} {...course.course} />
                        ))
                    ) : (
                        <NotFoundCourses title={'دوره'} />
                    )

                }
            </div>
        </UserDataTable>
    )
}
