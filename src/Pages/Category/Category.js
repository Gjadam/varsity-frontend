import React, { useEffect, useState } from 'react'
import './Category.css'
import NavBar from '../../Components/NavBar/NavBar'
import ToUp from '../../Components/ToUp/ToUp'
import CourseBox from '../../Components/CoursesSection/CourseBox'
import Footer from '../../Components/Footer/Footer'
import { CiSearch } from 'react-icons/ci'
import Pagination from '../../Components/Pagination/Pagination'
import { useParams } from 'react-router-dom'
import CategoryHeader from '../../Components/CategoryHeader/CategoryHeader'
import NotFoundCourses from '../../Components/NotFoundCourses/NotFoundCourses'
export default function Category() {

  const [courses, setCourses] = useState([])
  const [orderedCourses, setOrderedCourses] = useState([])
  const [showCourses, setShowCourses] = useState([])
  const [status, setStatus] = useState('default')
  const [searchValue, setSearchValue] = useState('')
  const { categoryName } = useParams()

  useEffect(() => {
    fetch(`http://localhost:4000/v1/courses/category/${categoryName}`)
      .then(res => res.json())
      .then(allCourses => {
        setCourses(allCourses)
        setOrderedCourses(allCourses)
      })

    courses.sort((s1, s2) => s2.price - s1.price)

  }, [categoryName])


  useEffect(() => {
    switch (status) {
      case 'free': {
        const freeCourses = courses.filter(course => course.price === 0)
        setOrderedCourses(freeCourses)
        break
      }
      case 'money': {
        const notFreeCourses = courses.filter(course => course.price !== 0)
        setOrderedCourses(notFreeCourses)
        break
      }
      case 'cheap': {
        const cheapCourses = courses.slice().sort((s1, s2) => s2.price - s1.price).reverse()
        setOrderedCourses(cheapCourses)
        break
      }
      case 'expensive': {
        const expensiveCourses = courses.slice().sort((s1, s2) => s2.price - s1.price)
        setOrderedCourses(expensiveCourses)
        break
      }
      default: {
        setOrderedCourses(courses)
      }
    }

  }, [status])


  const searchValueChangeHandler = (event) => {
    setSearchValue(event.target.value)
    const filteredCourses = courses.filter(course => course.name.includes(searchValue))
    setOrderedCourses(filteredCourses)
  }

  return (
    <>
      <NavBar />
      <ToUp />
      {
        courses.length === 0 ? (
          <>
            <NotFoundCourses title={'دوره'} />
          </>
        ) : (
          <>
            <CategoryHeader TitleName={categoryName} title={'لیست دوره های'} />
            <div className="container">
              <div className="category">
                <div className="category__left-side">
                  <div className="category__left-side__search-box">
                    <a href="" className="category__left-side__search-box__icon"><CiSearch /></a>
                    <input type="text" placeHolder="جستجو..." className="category__left-side__search-box__input" value={searchValue} onChange={searchValueChangeHandler} />
                  </div>
                </div>
                <div className="category__right-side">
                  <select className="category__right-side__select-box" onChange={(event) => setStatus(event.target.value)}>
                    <option value="" className="category__right-side__select-box__option">مرتب سازی پیش فرض</option>
                    <option value="free" className="category__right-side__select-box__option">دوره های رایگان</option>
                    <option value="money" className="category__right-side__select-box__option">دوره های پولی</option>
                    <option value="cheap" className="category__right-side__select-box__option">مرتب سازی براساس ارزان ترین</option>
                    <option value="expensive" className="category__right-side__select-box__option">مرتب سازی براساس گران ترین</option>
                  </select>

                </div>
              </div>
              <div className="category-box__wrapper">
                {
                  showCourses.length === 0 ? (
                    <NotFoundCourses title={'دوره'} />
                  ) : (
                    showCourses.map(course => (
                      <CourseBox key={course.id} {...course} />
                    ))
                  )
                }
              </div>
            </div>
            <Pagination
              items={orderedCourses}
              itemsCount={4}
              pathName={`/category-info/${categoryName}`}
              setShowCourses={setShowCourses}
            />
          </>
        )
      }
      <Footer />
    </>
  )
}
