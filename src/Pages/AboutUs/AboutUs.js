import React from 'react'
import "./AboutUs.css"
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import InfiniteLogos from '../../Components/InfiniteLogos/InfiniteLogos'
export default function AboutUs() {
    return (
        <>
            <NavBar />
            <div className="container">
                <div className="about-us">
                    <h1 className="about-us__title">
                        مشاور پروژه های برنامه نویسی و بازاریابی الکترونیکی
                    </h1>
                    <div className="about-us__images">
                        <img src="/images/info/info-image.jpg" alt="" className="about-us__image-2" />
                        <img src="/images/aboutUs-1.jpg" alt="" className="about-us__image-1" />
                        <div className="about-us__desc__wrapper">
                            <h3 className="about-us__desc">“پذیرای ایده ها و رویکردهای جدید باشید. مهارت های حل مسئله خود را توسعه دهید“</h3>
                        </div>
                    </div>
                    <div className="about-us__section">
                        <h1 className="about-us__section__desc">Varsity به عنوان یک مجموعه آموزشی، هدفش افزایش سطح کیفیت آموزش است. برای دستیابی به این هدف، Varsity تمام تلاش خود را می کند تا محتوای آموزشی با کیفیتی عالی ارائه دهد و به دانشجویان امکان انتقال مفاهیم و مهارت های لازم برای یادگیری بهتر را فراهم کند علاوه بر ارتقاء کیفیت آموزش، Varsity به دنبال ساختن راهی برای ورود دانشجویان به بازار کار تخصصی است. به این منظور تلاش می کند تا آموزش ها و دوره های خود را بر اساس نیازهای واقعی بازار کار طراحی کند. این به دانشجویان اجازه می دهد تا مهارت های عملی و علمی لازم را برای ورود به صنایع مختلف تخصصی بدست آورند .</h1>
                    </div>
                </div>
            </div>
            <InfiniteLogos />
            <Footer />
        </>
    )
}
