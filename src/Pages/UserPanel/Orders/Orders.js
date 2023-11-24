import React, { useEffect, useState } from 'react'
import './Orders.css'
import UserDataTable from '../UserDataTable/UserDataTable'
import { AiFillEye } from 'react-icons/ai'
import { Link } from 'react-router-dom'
import { useQuery } from 'react-query'
export default function Orders() {

    const localStorageData = JSON.parse(localStorage.getItem("user"))

    // Get User Orders From Server
    const { data: orders } = useQuery("orders", () => {
        return fetch(`http://localhost:4000/v1/orders`, {
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        })
            .then(res => res.json())
    })


    return (
        <UserDataTable title={'سفارش'}>
            <div className="admin-courses">
                <div className="admin-courses__table__wrapper">
                    <table className='admin-courses__table'>
                        <thead className="admin-courses__table-header">
                            <tr>
                                <th className='admin-courses__table__th rounded-start'>شناسه</th>
                                <th className='admin-courses__table__th'>نام دوره</th>
                                <th className='admin-courses__table__th'>قیمت</th>
                                <th className='admin-courses__table__th'>تاریخ انتشار</th>
                                <th className='admin-courses__table__th'>مشاهده</th>
                            </tr>
                        </thead>
                        <tbody className='admin-courses__table-body'>
                            {
                                orders?.map((order, index) => (
                                    <tr className='admin-courses__table__tr'>
                                        <th className='admin-courses__table__th'>{index + 1}</th>
                                        <th className='admin-courses__table__th item-width font-weight-item'>{order.course.name}</th>
                                        <th className='admin-courses__table__th item-width'>{order.course.price === 0 ? 'رایگان' : order.course.price.toLocaleString()}</th>
                                        <th className='admin-courses__table__th item-width'>{order.createdAt.slice(0, 10)}</th>
                                        <th className='admin-courses__table__th'>
                                            <Link to={`${order._id}`}>
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
    )
}
