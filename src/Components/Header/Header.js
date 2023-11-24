import React, { useEffect, useState } from 'react'
import './Header.css'
import Typewriter from 'typewriter-effect';
import { BsArrowDownCircle } from 'react-icons/bs'

import { PiMonitorThin, PiStudentThin, PiTimerThin } from 'react-icons/pi'
import AcademyInfoBox from './AcademyInfoBox';
import SocialMedias from '../TopBar/SocialMedias';
import { BiLogoFacebookCircle, BiLogoLinkedin } from 'react-icons/bi';
import { AiOutlineInstagram, AiOutlineTwitter } from 'react-icons/ai';
export default function Header({ info }) {

  const toBottomClick = (e) => {
    e.preventDefault()
    window.scroll(0, 1500)
  }


  return (
    <div className='container'>
      <div className='header'>
        <div className="header__social-medias">
          <SocialMedias icon={<BiLogoLinkedin />} />
          <SocialMedias icon={<AiOutlineTwitter />} />
          <SocialMedias icon={<AiOutlineInstagram />} />
          <SocialMedias icon={<BiLogoFacebookCircle />} />
        </div>
        <div className="header__content">
          <h1 className="header__content__title">
            <Typewriter
              onInit={typeWriter => {
                typeWriter
                  .typeString('آکادمی  Varsity')
                  .start()
                  .pauseFor(1500)
                  .deleteAll()
                  .typeString('دوره های پروژه محور')
                  .pauseFor(1500)
                  .deleteAll()
                  .typeString("پشتیبانی رایگان")
                  .pauseFor(1500)
                  .deleteAll()
                  .typeString('همین حالا شروع کن !')
                  .pauseFor(1500)
              }}
              options={{
                loop: true,
                autoStart: true,
              }}
            />
          </h1>
          <h3 className="header__content__text">با <span className="header__content__text__style">آکادمی Varsity</span> برنامه نویسی رو با خیال راحت یاد بگیر و پیشرفت کن</h3>
          <a href="" className="header__content__link" onClick={toBottomClick}><BsArrowDownCircle className='header__content__link__arrow' /></a>
        </div>
        <svg className='header__fill-body' viewBox="0 0 500 150" preserveAspectRatio='none' width="100%" height="150">
          <path
            d="M0,150 L0,40 Q250,150 500,40 L580,150 Z" />
        </svg>
      </div>
      <div className="academy__info">
        <AcademyInfoBox count={info.coursesCount} title={"دوره"} text={"آموزش آنلاین"} icon={<PiMonitorThin />}/>
        <AcademyInfoBox count={info.usersCount} title={"هنرجو"} text={"دانشجوی آنلاین"} icon={<PiStudentThin />}/>
        <AcademyInfoBox count={info.totalTime} title={"دقیقه"} text={"آموزش آنلاین"} icon={<PiTimerThin />}/>
      </div>
    </div>
  )
}
