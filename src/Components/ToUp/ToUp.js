import React, { useEffect, useRef, useState } from 'react'
import './ToUp.css'
import { BsFillArrowUpSquareFill } from 'react-icons/bs'
export default function ToUp() {



    const toUpClick = (e) => {
        e.preventDefault()
        window.scroll(0, 0)
    }
    
    useEffect(() => {
        const toUpBtn = document.querySelector('.to-up__btn')
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                toUpBtn.classList.add('to-uo__btn--active')
            } else {
                toUpBtn.classList.remove('to-uo__btn--active')
            }
        })
    },[])

    return (
        <div className='to-up'>
            <a href="" className="to-up__btn" onClick={toUpClick}><BsFillArrowUpSquareFill /></a>
        </div>
    )
}
