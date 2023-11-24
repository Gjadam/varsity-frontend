import React, { useEffect, useState } from 'react'
import './AnswerTicket.css'
import UserDataTable from '../../UserDataTable/UserDataTable'
import { useParams } from 'react-router-dom'
import { useQuery } from 'react-query'
export default function AnswerTicket() {

    const localStorageData = JSON.parse(localStorage.getItem('user'))
    const { id } = useParams()

    // Get Ticket Answer
    const { data: ticketInfo } = useQuery("ticketInfo", () => {
        return fetch(`http://localhost:4000/v1/tickets/answer/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        })
            .then(res => res.json())
    })

    return (
        <UserDataTable title={"پاسخ تیکت"}>
            <div className="answer-ticket">
                <div className="answer-ticket__question-box">
                    <div className="answer-ticket__question-box__user-info">
                        <h1 className="answer-ticket__question-box__user-info__user-name">شما</h1>
                    </div>
                    <h1 className="answer-ticket__question-box__text">
                        {ticketInfo?.ticket}
                    </h1>
                </div>
                {
                    ticketInfo?.answer ? (
                        <div className="answer-ticket__answer-box">
                            <div className="answer-ticket__answer-box__admin-info">
                                <h1 className="answer-ticket__answer-box__admin-info__user-name">پشتیبانی</h1>
                            </div>
                            <h1 className="answer-ticket__answer-box__text">
                                {ticketInfo.answer}
                            </h1>
                        </div>
                    ) : (
                        <div className="answer-ticket__answer-box">
                            <div className="answer-ticket__answer-box__admin-info">
                                <h1 className="answer-ticket__answer-box__admin-info__user-name">پشتیبانی</h1>
                            </div>
                            <h1 className="answer-ticket__answer-box__text">
                                پاسخ شما پس از بررسی توسط تیم پشتیبانی ارسال خواهد شد.
                            </h1>
                        </div>
                    )

                }
            </div>
        </UserDataTable>
    )
}
