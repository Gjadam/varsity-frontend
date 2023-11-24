import React from 'react'
import './DataTable.css'
import { CiSearch } from 'react-icons/ci'
export default function DataTable({ children, title }) {
    return (
        <>
            <div className='users'>
                <div className="users__top">
                    <h1 className="users__top__title">{title}</h1>
                    <form className="user__top__search__box__wrapper">
                        <button className="users__top__search__icon"><CiSearch /></button>
                        <input type="text" className='users__top__search__box' placeholder='جست و جو...' />
                    </form>
                </div>
                <div className="users__boxes">
                    {children}
                </div>
            </div>
        </>
    )
}
