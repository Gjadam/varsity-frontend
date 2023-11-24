import React, { useEffect, useState } from 'react'
import './ArticleInfo.css'
import NavBar from '../../Components/NavBar/NavBar'
import ToUp from '../../Components/ToUp/ToUp'
import Comments from '../../Components/Comments/Comments'
import Footer from '../../Components/Footer/Footer'
import DOMPurify from 'dompurify'
import { AiFillLinkedin, AiFillFacebook, AiFillInstagram, AiFillTwitterSquare } from 'react-icons/ai'
import { BsFillInfoCircleFill, BsFillCalendarDateFill } from 'react-icons/bs'
import { useParams } from 'react-router-dom'
export default function ArticleInfo() {

  const [articleInfo, setArticleInfo] = useState([])
  const [articleCategory, setArticleCategory] = useState([])
  const [articleCreateDate, setArticleCreateDate] = useState([])
  const [articleCreator, setArticleCreator] = useState([])

  const {articleName} = useParams()

  useEffect(() => {
    fetch(`http://localhost:4000/v1/articles/${articleName}`)
    .then(res => res.json())
    .then(allArticles => {
      setArticleInfo(allArticles)
      setArticleCategory(allArticles.categoryID)
      setArticleCreateDate(allArticles.createdAt)
      setArticleCreator(allArticles.creator)
    })
  }, [])

  return (
    <>
        <NavBar />
        <ToUp />
      <div className="container">
        <div className="article-info">
          <div className="article-info__writer">
            <img src={articleCreator.profile} alt="image" className="article-info__writer__image" />
            <h1 className="article-info__writer__name">{articleCreator.name}</h1>
            <h3 className="article-info__writer__role">نویسنده</h3>

          </div>
          <div className="article-info__content">
            <h1 className="article-info__content__title">{articleInfo.title}</h1>
            <div className="article-info__content__header">
              <h3 className="article-info__content__header__text"><BsFillInfoCircleFill className='article-info__content__header__text__icon' />{articleCategory.title}</h3>
              <h3 className="article-info__content__header__text"><BsFillCalendarDateFill className='article-info__content__header__text__icon' />تاریخ انتشار: {articleCreateDate.slice(0, 10)}</h3>
            </div>
            <img src={`http://localhost:4000/courses/covers/${articleInfo.cover}`} alt="image" className="article-info__content__image" />
            <div className="article-info__content__body" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(articleInfo.body) }}></div>
            <div className="article-info__content__share">
              <h1 className="article-info__content__share__title">اشتراک گذاری :</h1>
              <div className="article-info__content__share__icon__wrapper">
                <a href="" className="article-info__content__share__icon">
                  <AiFillLinkedin />
                </a>
                <a href="" className="article-info__content__share__icon">
                  <AiFillFacebook />
                </a>
                <a href="" className="article-info__content__share__icon">
                  <AiFillInstagram />
                </a>
                <a href="" className="article-info__content__share__icon">
                  <AiFillTwitterSquare />
                </a>
              </div>

            </div>
          </div>
        </div>
      </div>

        <Footer />
    </>
  )
}
