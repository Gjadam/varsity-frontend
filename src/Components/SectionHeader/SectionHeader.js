import React from 'react'
import './SectionHeader.css'

export default function SectionHeader({title, TitleWithColor, text}) {
  return (
    <div className='section-header'>
        <h1 className="section-header__title">{title} <span className="section-header__title__style">{TitleWithColor}</span></h1>
        <h3 className="section-header__text">{text}</h3>
    </div>
  )
}
