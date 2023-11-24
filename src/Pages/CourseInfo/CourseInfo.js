import React, { useEffect, useRef, useState } from 'react'
import './CourseInfo.css'
import NavBar from '../../Components/NavBar/NavBar'
import ToUp from '../../Components/ToUp/ToUp'
import Footer from '../../Components/Footer/Footer'
import CourseDetailBox from '../../Components/CourseDetailBox.js/CourseDetailBox'
import Comments from '../../Components/Comments/Comments'
import { Link, useParams } from 'react-router-dom'
import swal from 'sweetalert'
/* Import Iconts Start */
import { AiOutlineEye, AiFillPlayCircle } from 'react-icons/ai'
import { GoShareAndroid } from 'react-icons/go'
import { RiGraduationCapLine, RiFolderInfoFill } from 'react-icons/ri'
import { BiTimeFive, BiSupport, BiSolidLockAlt } from 'react-icons/bi'
import { BsInfoCircle } from 'react-icons/bs'
import { MdUpdate } from 'react-icons/md'
import { PiStudentLight, PiChalkboardTeacherFill } from 'react-icons/pi'
import { VscFeedback } from 'react-icons/vsc'
import { IoIosArrowDown } from 'react-icons/io'
import useToUpClick from '../../Hooks/useToUpClick'
/* Import Iconts End */
import { Swiper, SwiperSlide } from 'swiper/react';
import { Scrollbar } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/scrollbar';
import SectionHeader from '../../Components/SectionHeader/SectionHeader'
import MiniCourseBox from '../../Components/MiniCourseBox/MiniCourseBox'


export default function CourseInfo() {

  const [isOpenAccordion, setIsOpenAccordion] = useState(true)
  const { courseName } = useParams()
  const SessionArrow = useRef()
  const SessionContent = useRef()
  const [comments, setComments] = useState([])
  const [sessions, setSessions] = useState([])
  const [relatedCourses, setRelatedCourses] = useState([])
  const [createdAt, setCreatedAt] = useState('')
  const [updatedAt, setUpdatedAt] = useState('')
  const [courseDetails, setCourseDetails] = useState({})
  const [courseTeacher, setCourseTeacher] = useState({})
  const [courseCategory, setCourseCategory] = useState({})
  const [toUpHandler] = useToUpClick()
  const openSession = () => {
    if (isOpenAccordion) {
      SessionArrow.current.classList.add('course-info__right-side__session__accordion__title__icon--active')
      SessionContent.current.classList.add('course-info__right-side__session__accordion__sub-title__wrapper--active')
      setIsOpenAccordion(false)
    } else {
      SessionArrow.current.classList.remove('course-info__right-side__session__accordion__title__icon--active')
      SessionContent.current.classList.remove('course-info__right-side__session__accordion__sub-title__wrapper--active')
      setIsOpenAccordion(true)
    }
  }

  useEffect(() => {
    getCourseDetails()
    getRelatedCourses()
  }, [courseName])


  function getRelatedCourses() {
    fetch(`http://localhost:4000/v1/courses/related/${courseName}`)
      .then(res => res.json())
      .then(relatedCourseInfos => {
        setRelatedCourses(relatedCourseInfos)
      })
  }



  function getCourseDetails() {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    fetch(`http://localhost:4000/v1/courses/${courseName}`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`,
      }
    })
      .then(res => res.json())
      .then(courseInfo => {
        setComments(courseInfo.comments)
        setSessions(courseInfo.sessions)
        setCourseDetails(courseInfo)
        setCreatedAt(courseInfo.createdAt)
        setUpdatedAt(courseInfo.updatedAt)
        setCourseTeacher(courseInfo.creator)
        setCourseCategory(courseInfo.categoryID)
      })
  }


  const submitComment = (newCommentBody, newCommentScore, event) => {
    event.preventDefault()
    const localStorageData = JSON.parse(localStorage.getItem('user')).token

    fetch(`http://localhost:4000/v1/comments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData}`,
      },
      body: JSON.stringify({
        body: newCommentBody,
        courseShortName: courseName,
        score: newCommentScore,
      })
    })
      .then(res => res.json())
      .then(result => {
        swal({
          title: 'دیدگاه شما ثبت شد',
          text: 'دیدگاه شما پس از بررسی نمایش داده میشود.',
          icon: 'success',
          buttons: 'تایید'
        })
      })
  }


  const registerInCourse = (event, course) => {
    event.preventDefault()

    const localStorageData = JSON.parse(localStorage.getItem('user'))

    if (course.price === 0) {
      fetch(`http://localhost:4000/v1/courses/${course._id}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorageData.token}`,
        },
        body: JSON.stringify({
          price: course.price
        })
      })
        .then(res => {
          if (res.ok) {
            swal({
              title: 'ثبتنام با موفقیت انجام شد.',
              icon: "success",
              buttons: 'باشه'
            })
              .then(() => {
                getCourseDetails()
              })
          }
        })
    } else {
      swal({
        title: 'آیا میخواهید در این دوره ثبتنام کنید؟',
        icon: "warning",
        buttons: ["خیر", "بله"]
      }).then(result => {
        if (result) {
          swal({
            title: 'درصورت داشتن کد تخفیف وارد کنید!',
            content: "input",
            buttons: ["ثبت نام بدون کد تخفیف", "اعمال کد تخفیف"]
          }).then(code => {
            if (code === null) {
              fetch(`http://localhost:4000/v1/courses/${course._id}/register`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorageData.token}`,
                },
                body: JSON.stringify({
                  price: course.price
                })
              })
                .then(res => {
                  if (res.ok) {
                    swal({
                      title: 'ثبتنام با موفقیت انجام شد.',
                      icon: "success",
                      buttons: 'باشه'
                    })
                      .then(() => {
                        getCourseDetails()
                      })
                  }
                })
            } else {
              fetch(`http://localhost:4000/v1/offs/${code}`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${localStorageData.token}`,
                },
                body: JSON.stringify({
                  course: course._id
                })
              })
                .then(res => {
                  if (res.status === 404) {
                    swal({
                      title: "کد تخفیف معتبر نیست!",
                      icon: "error",
                      buttons: "باشه"
                    })
                  } else if (res.status === 409) {
                    swal({
                      title: "کد تخفیف قبلا استفاده شده !",
                      icon: "error",
                      buttons: "باشه"
                    })
                  } else {
                    return res.json()
                  }
                })
                .then((code) => {
                  if (code) {
                    fetch(`http://localhost:4000/v1/courses/${course._id}/register`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorageData.token}`,
                      },
                      body: JSON.stringify({
                        price: course.price - (course.price * code.percent / 100)
                      })
                    })
                      .then(res => {
                        if (res.ok) {
                          swal({
                            title: 'ثبتنام با موفقیت انجام شد.',
                            icon: "success",
                            buttons: 'باشه'
                          })
                            .then(() => {
                              getCourseDetails()
                            })
                        }
                      })
                  }
                })
            }
          })
        }
      })
    }
  }


  return (
    <>
      <NavBar />
      <ToUp />
      <div className='container'>
        <div className="course-info">
          <div className="course-info__right-side">
            <h3 className="course-info__right-side__category">{courseCategory.title}</h3>
            <h1 className="course-info__right-side__title">{courseDetails.name}</h1>
            <div className="course-info__right-side__course-image__wrapper">
              <img src={`http://localhost:4000/courses/covers/${courseDetails.cover}`} className='course-info__right-side__course-image' alt="image" />
            </div>
            <div className="course-info__right-side__information">
              <h1 className="course-info__right-side__information__title">توضیحات دوره</h1>
              <h3 className="course-info__right-side__information__text">{courseDetails.description}</h3>
              <div className="course-info__right-side__information__btns">
                <a href="" className="course-info__right-side__information__btn">دانلود همگانی ویدئوها</a>
                <a href="" className="course-info__right-side__information__btn">دانلود همگانی پیوست ها</a>
              </div>
            </div>
            <div className="course-info__right-side__sessions">
              {
                sessions.length === 0 ? (
                  <h1 className="course-info__right-side__sessions__title">جلسه ای برای این دوره وجود ندارد!!!</h1>
                ) : (
                  <>
                    <h1 className="course-info__right-side__sessions__title">جلسات دوره</h1>
                    <div className="course-info__right-side__session">
                      <div className="course-info__right-side__session__accordion__title__wrapper" onClick={openSession}>
                        <h1 className="course-info__right-side__session__accordion__title__text">معرفی دوره</h1>
                        <span ref={SessionArrow} className="course-info__right-side__session__accordion__title__icon" >
                          <IoIosArrowDown />
                        </span>
                      </div>
                      <div ref={SessionContent} className="course-info__right-side__session__accordion__sub-title__wrapper">
                        {sessions.map(session => (
                          <div className="course-info__right-side__session__accordion__sub-title__info__wrapper">
                            <div className="course-info__right-side__session__accordion__sub-title__info">
                              <AiFillPlayCircle className="course-info__right-side__session__accordion__sub-title__info__icon" />
                              <div>
                                <h1 className="course-info__right-side__session__accordion__sub-title__info__text">{session.title}</h1>
                                <h3 className="course-info__right-side__session__accordion__sub-title__info__time">{session.time}</h3>
                              </div>
                            </div>
                            {
                              (session.free === 1 || courseDetails.isUserRegisteredToThisCourse) ? (
                                <Link to={`/${courseName}/${session._id}`} className="course-info__right-side__session__accordion__sub-title__link" onClick={toUpHandler}>پخش</Link>
                              ) : (
                                <BiSolidLockAlt className="course-info__right-side__session__accordion__sub-title__Lock-icon" />
                              )
                            }
                          </div>
                        ))}

                      </div>
                    </div>
                  </>
                )
              }

            </div>
          </div>
          <div className="course-info__left-side">
            <div className="course-info__left-side__box-info">
              <div className="course-info__left-side__box-info__top">
                {
                  (courseDetails.discount !== 0 && courseDetails.price !== 0) ? (
                    <h1 className="course-info__left-side__box-info__top__price">{(`${Number((courseDetails.price * courseDetails.discount) / 100).toLocaleString()} تومان`)}</h1>

                  ) : (
                    <h1 className="course-info__left-side__box-info__top__price">{courseDetails.price === 0 ? 'رایگان' : `${Number(courseDetails.price).toLocaleString()} تومان`}</h1>
                  )
                }
                <a href="" className="course-info__left-side__box-info__top__share-icon"><GoShareAndroid /></a>
              </div>
              <div className="course-info__left-side__box-info__add-course">
                {courseDetails.isUserRegisteredToThisCourse === false ? (
                  <>
                    <a href="" className="course-info__left-side__box-info__add-course__btn" onClick={(event) => registerInCourse(event, courseDetails)}>افزودن به سبد خرید</a>
                  </>
                ) : (
                  <h1 href="" className="course-info__left-side__box-info__add-course__have-btn">شما دانشجوی دوره هستید</h1>
                )}

              </div>
              <div className="course-info__left-side__box-info__course-detail">
                <h1 className="course-info__left-side__box-info__course-detail__title"><RiFolderInfoFill className='course-info__left-side__box-info__course-detail__title__icon' /> مشخصات دوره</h1>
                <div className="course-info__left-side__box-info__course-detail__box">
                  <CourseDetailBox icon={<RiGraduationCapLine className='course-info__left-side__box-info__course-detail__box__key__icon' />} title={'وضعیت دوره'} value={courseDetails.isComplete === 1 ? 'به اتمام رسیده' : 'در حال برگزاری'} />
                  <CourseDetailBox icon={<BiTimeFive className='course-info__left-side__box-info__course-detail__box__key__icon' />} title={"زمان برگزاری"} value={createdAt.slice(0, 10)} />
                  <CourseDetailBox icon={<MdUpdate className='course-info__left-side__box-info__course-detail__box__key__icon' />} title={"آخرین بروزرسانی"} value={updatedAt.slice(0, 10)} />
                  <CourseDetailBox icon={<PiStudentLight className='course-info__left-side__box-info__course-detail__box__key__icon' />} title={"تعداد دانشجو"} value={courseDetails.courseStudentsCount} />
                  <CourseDetailBox icon={<VscFeedback className='course-info__left-side__box-info__course-detail__box__key__icon' />} title={"دیدگاه"} value={67} />
                  <CourseDetailBox icon={<AiOutlineEye className='course-info__left-side__box-info__course-detail__box__key__icon' />} title={"بازدید"} value={14_234} />
                </div>
              </div>
            </div>
            <div className="course-info__left-side__teacher-info">
              <h1 className="course-info__left-side__teacher-info__title"><PiChalkboardTeacherFill className='course-info__left-side__teacher-info__title__icon' /> مدرس</h1>
              <div className="course-info__left-side__teacher-info__content__wrapper">
                <img src={courseTeacher.profile} alt="image" className="course-info__left-side__teacher-info__content__teacher-image" />
                <div className="course-info__left-side__teacher-info__content__teacher-info">
                  <h3 className="course-info__left-side__teacher-info__content__teacher-info__username">{courseTeacher.name}</h3>
                  <h3 className="course-info__left-side__teacher-info__content__teacher-info__role">مدرس دوره</h3>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Comments comments={comments} submitComment={submitComment} />
      {
        relatedCourses.length &&
        <>
          <SectionHeader title={'دوره های مرتبط با'} TitleWithColor={courseCategory.title}/>
          <div className="related-courses">
            {<Swiper
              scrollbar={{
                hide: true,
              }}
              loop={true}
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
              {relatedCourses.map(course => (
                <SwiperSlide>
                  <MiniCourseBox key={course._id} {...course} />
                </SwiperSlide>
              ))}

            </Swiper>}
          </div>
        </>
      }

      <Footer />
    </>
  )
}
