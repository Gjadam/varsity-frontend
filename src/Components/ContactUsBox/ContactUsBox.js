import React from 'react'
import './ContactUsBox.css'
import { IoLocationSharp } from 'react-icons/io5'
import { BiSolidPhone } from 'react-icons/bi'
import { HiOutlineMail } from 'react-icons/hi'
export default function ContactUsBox() {
    return (
        <>
            <div className="contact-us__top__box">
                <h1 className="contact-us__top__box__title">پشتیبانی فروش</h1>
                <h3 className="contact-us__top__box__location"><IoLocationSharp className='icon-style ' />تهران، میدان آزادی، جنب مترو شادمان، مجتمع صدف</h3>
                <h3 className="contact-us__top__box__phone-number"><BiSolidPhone className='icon-style ' />09320000000</h3>
                <h3 className="contact-us__top__box__email"><HiOutlineMail className='icon-style ' />example@email.com</h3>
            </div>
        </>
    )
}
