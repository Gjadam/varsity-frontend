import React from 'react'
import './CategoryHeader.css'
export default function CategoryHeader({ TitleName, title }) {
    return (
        <>
            <div className="category__top">
                <h1 className="category__top__title">{title} {TitleName.toUpperCase()}</h1>
            </div>
        </>
    )
}
