import React from 'react'
import './WelCome.css'
import { Link } from 'react-router-dom'
export default function WelCome() {
    return (
        <>
            <div className="welcome">
                <Link to='/' className="welcome__link">
                    <img src="/images/logo/logo.png" alt="logo" className="welcome__link__logo" />
                </Link>
                <h1 className="welcome__title">خوش آمدید</h1>
                <h3 className="welcome__text">بیایید امروز چیز جدیدی یاد بگیریم!</h3>
                <img src="/images/svgs/register-img.svg" alt="image" className="welcome__image" />
            </div>
        </>
    )
}
