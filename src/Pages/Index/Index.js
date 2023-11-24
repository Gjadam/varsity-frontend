import './Index.css'
import TopBar from '../../Components/TopBar/TopBar'
import NavBar from '../../Components/NavBar/NavBar'
import Header from '../../Components/Header/Header'
import Information from '../../Components/Information/Information'
import SectionHeader from '../../Components/SectionHeader/SectionHeader'
import CoursesSection from '../../Components/CoursesSection/CoursesSection'
import SectionButton from '../../Components/SectionButton/SectionButton'
import ToUp from '../../Components/ToUp/ToUp'
import ArticleSection from '../../Components/ArticleSection/ArticleSection'
import Footer from '../../Components/Footer/Footer'
import Ads from '../../Components/Ads/Ads'
import { useEffect, useState } from 'react'
import InfiniteLogos from '../../Components/InfiniteLogos/InfiniteLogos'


export default function Index() {

  const [indexInfo, setIndexInfo] = useState({})

  useEffect(() => {
    fetch(`http://localhost:4000/v1/infos/index`)
      .then(res => res.json())
      .then(allInfos => {
        setIndexInfo(allInfos)
      })
  }, [])

  return (
    <div>
      <TopBar info={indexInfo} />
      <NavBar />
      <ToUp />
      <Header info={indexInfo} />
      <Information />
      <SectionHeader title={'دوره های برتر'} TitleWithColor={'Varsity'} text={'سکوی پرتابی به سمت موفقیت'} />
      <CoursesSection/>
      <SectionButton pathName={'courses/1'} />
      <Ads />
      <SectionHeader title={'جدیدترین مقاله های '} TitleWithColor={'Varsity'} text={'پیش به سوی ارتقای دانش'} />
      <ArticleSection />
      <SectionButton pathName={'articles/1'} />
      <InfiniteLogos />
      <Footer />
    </div>
  )
}
