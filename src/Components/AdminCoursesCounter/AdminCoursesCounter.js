import React, { useEffect, useState } from 'react'
import './AdminCoursesCounter.css'
export default function AdminCoursesCounter({title, count}) {


    return (
        <>
            <div className="admin-courses__counter-box">
                <h1 className="admin-courses__counter-box__title">{title}</h1>
                <h3 className="admin-courses__counter-box__count">{count}</h3>
            </div>
        </>
    )
}
