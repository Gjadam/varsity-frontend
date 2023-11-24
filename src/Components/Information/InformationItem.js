import React from 'react'

export default function InformationItem({icon, title, text}) {
    return (
        <>
            <div className="information__left-side__item">
                <div className="information__left-side__item__icon">
                    {icon}
                </div>
                <h1 className="information__left-side__item__title">{title}</h1>
                <h3 className="information__left-side__item__text">{text}</h3>
            </div>
        </>
    )
}
