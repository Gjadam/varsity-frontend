import React, { useEffect, useState } from 'react'
import './OrderDetail.css'
import UserDataTable from '../../UserDataTable/UserDataTable'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
export default function OrderDetail() {

    const localStorageData = JSON.parse(localStorage.getItem("user"))
    const { orderID } = useParams()

    // Get User Order Detail From Server
    const { data: orderDetail} = useQuery("orderDetail", () => {
        return        fetch(`http://localhost:4000/v1/orders/${orderID}`, {
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        }).then(res => res.json())
    })

    return (
        <UserDataTable title={'جزئیات سفارش'}>
            {
                orderDetail?.map(order => (
                    <div className="order-detail">
                        <div className="order-detail__course-detail">
                            <img src={`http://localhost:4000/courses/covers/${order.course.cover}`} alt="image" className="order-detail__course-detail__image" />
                            <h1 className="order-detail__course-detail__name font-weight">{order.course.name}</h1>
                        </div>
                        <div className="order-detail__total-price-box">
                            <h1 className="order-detail__total-price-box__title font-weight">صورت حساب</h1>
                            <div className="order-detail__total-price-box__item">
                                <h1 className="order-detail__total-price-box__item__key">قیمت:</h1>
                                <h3 className="order-detail__total-price-box__item__value">{ order.price === 0 ? 'رایگان' : order.price.toLocaleString()}</h3>
                            </div>
                            <div className="order-detail__total-price-box__item">
                                <h1 className="order-detail__total-price-box__item__key">درصد تخفیف:</h1>
                                <h3 className="order-detail__total-price-box__item__value off-price">{order.course.discount === 0 ? 0 : (order.course.discount)}%</h3>
                            </div>
                            <div className="order-detail__total-price-box__item primary-color">
                                <h1 className="order-detail__total-price-box__item__key font-weight total-price">قیمت نهایی:</h1>
                                <h3 className="order-detail__total-price-box__item__value font-weight total-price">{order.course.price === 0 ? 'رایگان' : (order.course.price * (100 - order.course.discount) / 100).toLocaleString()}</h3>
                            </div>
                        </div>
                    </div>
                ))
            }

        </UserDataTable>
    )
}
