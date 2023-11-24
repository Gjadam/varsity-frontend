import React, { useEffect, useRef, useState } from 'react'
import './Session.css'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import { Link, NavLink, useParams } from 'react-router-dom'
import { BiSolidLockAlt } from 'react-icons/bi'
import { AiFillPlayCircle } from 'react-icons/ai'
import { IoIosArrowDown } from 'react-icons/io'
import useToUpClick from '../../Hooks/useToUpClick'
export default function Session() {

  const { courseName, sessionID } = useParams()
  const [isOpenAccordion, setIsOpenAccordion] = useState(true)
  const [toUpHandler] = useToUpClick()
  const [session, setSession] = useState({})
  const [sessions, setSessions] = useState([])
  const [courseDetails, setCourseDetails] = useState([])

  const SessionArrow = useRef()
  const SessionContent = useRef()
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
    getSessionInfo()
    getCourseInfo()
  }, [sessionID])

  function getSessionInfo() {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    fetch(`http://localhost:4000/v1/courses/${courseName}/${sessionID}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      }
    })
      .then(res => res.json())
      .then(sessionInfo => {
        setSession(sessionInfo.session)
        setSessions(sessionInfo.sessions)
      })
  }

  function getCourseInfo() {
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    fetch(`http://localhost:4000/v1/courses/${courseName}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      }
    })
      .then(res => res.json())
      .then(courseInfo => {
        console.log(courseInfo);
        setCourseDetails(courseInfo)
      })
  }

  return (
    <>
      <NavBar />
      <div className="container">
        <div className="session">
          <div className="session__top__wrapper">
            <h1 className="course-info__right-side__title session__course-title">{courseDetails.name}</h1>
            <div className="course-info__right-side__video">
              <video
                id="my-player"
                class="video-js"
                controls
                crossOrigin="anonymous"
                playsInline 
                poster={`http://localhost:4000/courses/covers/${courseDetails.cover}`}
                width={'100%'}
                height={'100%'}
                data-setup='{}'
              >
                <source src={`http://localhost:4000/courses/covers/${session.video}`} type="video/mp4"></source>
                <source src={`http://localhost:4000/courses/covers/${session.video}`} type="video/webm"></source>
                <source src={`http://localhost:4000/courses/covers/${session.video}`} type="video/ogg"></source>
                <p class="vjs-no-js">
                  To view this video please enable JavaScript, and consider upgrading to a
                  web browser that
                  <a href="https://videojs.com/html5-video-support/" target="_blank">
                    supports HTML5 video
                  </a>
                </p>
              </video>
              <h1 className="session__top__video-name">{session.title}</h1>
            </div>
          </div>
          <div className="session__bottom__wrapper">


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
                                <NavLink to={`/${courseName}/${session._id}`} className={link => link.isActive ? 'course-info__right-side__session__accordion__sub-title__link--active' : 'course-info__right-side__session__accordion__sub-title__link'} onClick={toUpHandler}>پخش</NavLink>
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
        </div>
      </div>
      <Footer />
    </>
  )
}
