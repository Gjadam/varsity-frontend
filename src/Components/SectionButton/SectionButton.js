import React from 'react'
import './SectionButton.css'
import { HiMiniArrowPath } from 'react-icons/hi2'
import { Link } from 'react-router-dom'
import useToUpClick from '../../Hooks/useToUpClick'
export default function SectionButton({ pathName }) {
  
  const [toUpHandler] = useToUpClick()

  return (
    <div className='section-button'>
        <Link to={pathName} className="section-button__link" onClick={toUpHandler}>مشاهده همه <HiMiniArrowPath className='section-button__link__icon' /></Link>
    </div>
  )
}
