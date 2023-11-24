import React, { useEffect } from 'react'
import './InfiniteLogos.css'
export default function InfiniteLogos() {

    useEffect(() => {
        let copy = document.querySelector('.logos__slides').cloneNode(true)
        document.querySelector('.logos').appendChild(copy)
    }, []) 

  return (
    <div className='logos'>
        <div className="logos__slides">
            <img src="/images/logo/slide-logo-1.png" alt="logo" className='logos__slides__logo' />
            <img src="/images/logo/slide-logo-2.svg" alt="logo" className='logos__slides__logo' />
            <img src="/images/logo/slide-logo-3.png" alt="logo" className='logos__slides__logo' />
            <img src="/images/logo/slide-logo-4.webp" alt="logo" className='logos__slides__logo' />
            <img src="/images/logo/slide-logo-5.svg" alt="logo" className='logos__slides__logo' />
            <img src="/images/logo/slide-logo-6.svg" alt="logo" className='logos__slides__logo' />
            <img src="/images/logo/slide-logo-7.svg" alt="logo" className='logos__slides__logo' />
            <img src="/images/logo/slide-logo-8.svg" alt="logo" className='logos__slides__logo' />
        </div>
    </div>
  )
}
