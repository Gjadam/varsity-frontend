import React, { useEffect, useState } from 'react'
import './Articles.css'
import TopBar from '../../Components/TopBar/TopBar'
import NavBar from '../../Components/NavBar/NavBar'
import ToUp from '../../Components/ToUp/ToUp'
import SectionHeader from '../../Components/SectionHeader/SectionHeader'
import Footer from '../../Components/Footer/Footer'
import Pagination from '../../Components/Pagination/Pagination'
import ArticleBox from '../../Components/ArticleSection/ArticleBox'
import CategoryHeader from '../../Components/CategoryHeader/CategoryHeader'
import useArticles from '../../Hooks/useArticles'
export default function Articles() {
    const [showCourses, setShowCourses] = useState([])

    // Get Articles From Server
    const { data: articles } = useArticles()
    
    return (
        <>
            <NavBar />
            <ToUp />
            <CategoryHeader TitleName={'Varisity'} title={'جدیدترین مقاله های'}/>
            <div className="courses-box__wrapper">
                {
                    showCourses?.filter(article => article.publish === 1).map(article => (
                        <ArticleBox key={article._id} {...article} />
                    ))
                }
            </div>
            <Pagination
                items={articles}
                itemsCount={3}
                pathName={'/articles'}
                setShowCourses={setShowCourses}
            />
            <Footer />
        </>
    )
}
