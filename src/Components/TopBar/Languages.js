import React from 'react'

export default function Languages({imgUrl, nameLanguage}) {
    return (
        <>
            <p className="top-bar__left-side__languages__wrapper__language">
                <img src={imgUrl} alt="icon" className="top-bar__left-side__languages__wrapper__language__flag" /> {nameLanguage}
            </p>
        </>
    )
}
