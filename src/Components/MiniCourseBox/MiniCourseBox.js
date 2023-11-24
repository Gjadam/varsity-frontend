import React, { useState } from 'react'
import './MiniCourseBox.css'
import { Link } from 'react-router-dom'
import Loader from '../Loader/Loader';
import useToUpClick from '../../Hooks/useToUpClick';
export default function MiniCourseBox(props) {

    const [toUpHandler] = useToUpClick()

    const [isImgShow, setIsImgShow] = useState(false)

    const onImageLoaded = () => setIsImgShow(true)

    return (
        <>
            <Link to={`/course-info/${props.shortName}`} onClick={toUpHandler} className="course-section__mini-course-box">
                <div className="course-section__mini-course-box__image__wrapper">
                    <img src={`http://localhost:4000/courses/covers/${props.cover}`} onLoad={onImageLoaded} alt="image" className="course-section__mini-course-box__image" />
                    {
                        !isImgShow && <Loader />
                    }
                </div>
                <div className="course-section__mini-course-box__content-wrapper">
                    <Link to={`/course-info/${props.shortName}`} onClick={toUpHandler} className="course-section__mini-course-box__title">{props.name}</Link>
                </div>
            </Link>
        </>
    )
}
