import React, { useEffect, useState } from 'react'
import './Search.css'
import NavBar from '../../Components/NavBar/NavBar'
import ToUp from '../../Components/ToUp/ToUp'
import Footer from '../../Components/Footer/Footer'
import { useParams } from 'react-router-dom'
import NotFoundCourses from '../../Components/NotFoundCourses/NotFoundCourses'
import ArticleBox from '../../Components/ArticleSection/ArticleBox'
import SectionHeader from '../../Components/SectionHeader/SectionHeader'
import CategoryHeader from '../../Components/CategoryHeader/CategoryHeader'
import MiniCourseBox from '../../Components/MiniCourseBox/MiniCourseBox'
export default function Search() {

    const [courses, setCourses] = useState([])
    const [articles, setArticles] = useState([])
    const { value } = useParams()

    useEffect(() => {
        fetch(`http://localhost:4000/v1/search/${value}`)
            .then(res => res.json())
            .then(allData => {
                console.log(allData);
                setCourses(allData.allResultCourses)
                setArticles(allData.allResultArticles)
            })
    }, [value])
    return (
        <>
            <NavBar />
            <ToUp />
            <CategoryHeader TitleName={''} title={'نتایج جست و جو'} />
            <div className="container">
                <SectionHeader text={'سکوی پرتابی به سمت موفقیت'} TitleWithColor={'دوره های آموزشی'} />
                <div className="search-box">
                    {
                        courses.length === 0 ? (
                            <NotFoundCourses title={'دوره'}/>
                        ) : (
                            <>
                                {
                                    courses.map(course => (
                                        <MiniCourseBox key={course._id} {...course} />
                                    ))
                                }
                            </>
                        )
                    }
                </div>
                <SectionHeader text={'پیش به سوی ارتقای دانش'} TitleWithColor={'مقالات'} />
                <div className="search-box">
                    {
                        articles.length === 0 ? (
                            <NotFoundCourses title={'مقاله'}/>
                        ) : (
                            <>
                                {
                                    articles.map(article => (
                                        <ArticleBox key={article._id} {...article} />
                                    ))
                                }
                            </>
                        )
                    }
                </div>
            </div>
            <Footer />
        </>
    )
}
