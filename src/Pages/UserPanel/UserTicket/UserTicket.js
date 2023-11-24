import React, { useEffect, useState } from 'react'
import './UserTicket.css'
import UserPanelBox from '../../../Components/UserPanelBox/UserPanelBox'
import { HiTicket } from 'react-icons/hi2'
import { AiFillCheckCircle, AiFillEye, AiOutlineLoading3Quarters, AiOutlinePlusCircle } from 'react-icons/ai'
import { CgMail, CgMailOpen } from 'react-icons/cg'
import { Link } from 'react-router-dom'
import UserDataTable from '../UserDataTable/UserDataTable'
import { useQuery } from 'react-query'

export default function UserTicket() {

    const localStorageData = JSON.parse(localStorage.getItem('user'))

    // Get User Tickets From Server
    const { data: tickets } = useQuery("tickets", () => {
        return fetch(`http://localhost:4000/v1/tickets/user`, {
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        })
            .then(res => res.json())
    })


    return (
        <div className='user-ticket'>
            <div className="user-ticket__boxes">
                <UserPanelBox title={'همه تیکت ها'} count={tickets?.length} icon={<HiTicket className='user-panel-box__icon' />} />
                <Link to='send-ticket' className="user-ticket__add-ticket__wrapper">
                    <span className="user-ticket__add-ticket__link">تیکت جدید<AiOutlinePlusCircle className='user-ticket__add-ticket__link__icon' /></span>
                </Link>
            </div>
            <UserDataTable title={'تیکت ها'}>
                <div className="admin-courses">
                    <div className="admin-courses__table__wrapper">
                        <table className='admin-courses__table'>
                            <thead className="admin-courses__table-header">
                                <tr>
                                    <th className='admin-courses__table__th rounded-start'>وضعیت</th>
                                    <th className='admin-courses__table__th'>نوع تیکت</th>
                                    <th className='admin-courses__table__th'>تاریخ</th>
                                    <th className='admin-courses__table__th'>مشاهده</th>
                                </tr>
                            </thead>
                            <tbody className='admin-courses__table-body'>
                                {
                                    tickets?.map(ticket => (
                                        <tr className='admin-courses__table__tr'>
                                            <th className='admin-courses__table__th'>
                                                {
                                                    ticket.answer === 0 ? (
                                                        <AiOutlineLoading3Quarters className='no-answer' />
                                                    ) : (
                                                        <AiFillCheckCircle className='answer-btn' />
                                                    )
                                                }
                                            </th>
                                            <th className='admin-courses__table__th item-width font-weight-item'>{ticket.title}</th>
                                            <th className='admin-courses__table__th item-width'>{ticket.createdAt.slice(0, 10)}</th>
                                            <th className='admin-courses__table__th'>
                                                <Link to={`answer/${ticket._id}`}>
                                                    <AiFillEye className='edit-btn' />
                                                </Link>
                                            </th>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </UserDataTable>
        </div>
    )
}
