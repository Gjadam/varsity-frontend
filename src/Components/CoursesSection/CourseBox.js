import React, { useState } from 'react'
import { PiChalkboardTeacherLight } from 'react-icons/pi'
import { FaUsersLine } from 'react-icons/fa6'
import { Link } from 'react-router-dom';

import Loader from '../Loader/Loader';
import useToUpClick from '../../Hooks/useToUpClick';
import { AiFillStar } from 'react-icons/ai';
export default function CourseBox(props) {

    const [toUpHandler] = useToUpClick()

    const [isImgShow, setIsImgShow] = useState(false)

    const onImageLoaded = () => setIsImgShow(true)

    return (
        <>
            <Link to={`/course-info/${props.shortName}`} onClick={toUpHandler} className="course-section__course-box">
                {
                    (props.discount > 0 && props.price !== 0) &&
                    <div className="course-section__course-box__discount">
                        <h3 className="course-section__course-box__discount__count">{props.discount}%</h3>
                    </div>
                }
                <div className="course-section__course-box__image__wrapper">
                    <img src={`http://localhost:4000/courses/covers/${props.cover}`} onLoad={onImageLoaded} alt="image" className="course-section__course-box__image" />
                    {
                        !isImgShow && <Loader />
                    }
                </div>
                <div className="course-section__course-box__content-wrapper">

                    <Link to={`/course-info/${props.shortName}`} onClick={toUpHandler} className="course-section__course-box__title">{props.name}</Link>
                    <h3 className="course-section__course-box__text">{props.description.slice(0, 60)}...</h3>
                    <div className="course-section__course-box__top__info">
                        <div className="course-section__course-box__top__info__stars">
                            <h1 className="course-section__course-box__top__info__star__count"><AiFillStar className="course-section__course-box__top__info__star" />{props.courseAverageScore}</h1>

                        </div>
                        <div className="course-section__course-box__top__info__teacher">
                            <h3 className="course-section__course-box__top__info__teacher__name">{props.creator}<PiChalkboardTeacherLight /></h3>
                        </div>
                    </div>
                    <div className="course-section__course-box__bottom__info">
                        {
                            (props.discount > 0 && props.price !== 0) ? (
                                <div className="course-section__course-box__bottom__info__discount__price__wrapper">
                                    <h1 className="course-section__course-box__bottom__info__discount__pure-price">{(`${Number(props.price).toLocaleString()} تومان`)}</h1>
                                    <h1 className="course-section__course-box__bottom__info__discount__price">{(`${Number((props.price * props.discount) / 100).toLocaleString()} تومان`)}</h1>
                                </div>) :
                                (
                                    <div className="course-section__course-box__bottom__info__price__wrapper">
                                        <h1 className="course-section__course-box__bottom__info__price">{props.price === 0 ? 'رایگان' : (`${Number(props.price).toLocaleString()} تومان`)}</h1>
                                    </div>
                                )
                        }
                        <div className="course-section__course-box__bottom__info__students">
                            <h3 className="course-section__course-box__bottom__info__students__count">{props.registers}<FaUsersLine className='course-section__course-box__bottom__info__students__count__icon' /></h3>
                        </div>
                    </div>
                </div>

            </Link>
        </>
    )
}
