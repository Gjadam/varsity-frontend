import React from 'react'
import './NotFound.css'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import { Link } from 'react-router-dom'
export default function NotFound() {
  return (
    <>
    <NavBar/>
    <div className='container'>
    <div className='not-found'>
      <img src="/images/svgs/not-found-img.svg" alt="" className="not-found__image" />
      <h1 className="not-found__404">404</h1>
      <h1 className="not-found__title">اوه نه، مشکلی پیش آمد!</h1>
      <h3 className="not-found__text">یا مشکلی پیش آمده یا این صفحه دیگر وجود ندارد.</h3>
      <Link to="/" className="not-found__link">برگشت به صفحه اصلی</Link>
    </div>
    </div>
    <Footer />
    </>
  )
}
