import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import useToUpClick from '../../Hooks/useToUpClick'
import Loader from '../Loader/Loader'
export default function ArticleBox(props) {

    const [isImgShow, setIsImgShow] = useState(false)
    const onImageLoaded = () => setIsImgShow(true)
    const [toUpHandler] = useToUpClick()

    return (
        <>
            <Link to={`/article-info/${props.shortName}`} className="article-section__article-box" onClick={toUpHandler}>
                <div className="article-section__article-box__image__wrapper">
                    <img src={`http://localhost:4000/courses/covers/${props.cover}`} alt="article-img" onLoad={onImageLoaded} className="article-section__article-box__image" />
                </div>
                    {
                        !isImgShow && <Loader />
                    }
                <div className="article-section__article-box__content-wrapper">
                    <h1 className="article-section__article-box__title">{props.title}</h1>
                    <h3 className="article-section__article-box__text">{props.description.slice(0, 80)}...</h3>
                    <Link to={`/article-info/${props.shortName}`} className="article-section__article-box__link" onClick={toUpHandler}>بیشتر بخوانید</Link>
                </div>
            </Link>
        </>
    )
}
