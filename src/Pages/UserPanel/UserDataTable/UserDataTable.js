import React from 'react'
import './UserDataTable.css'
export default function UserDataTable({ children, title }) {
    return (
        <div className='user-data-table'>
            <div className="user-data-table__top">
                <h1 className="user-data-table__top__title">{title}</h1>
            </div>
            <div className="user-data-table__bottom">
                {children}
            </div>
        </div>
    )
}
