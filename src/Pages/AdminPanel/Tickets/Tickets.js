import React from 'react'
import DataTable from '../DataTable/DataTable'
import { AiFillCheckCircle, AiFillEye, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BiSolidCommentEdit,  } from 'react-icons/bi'
import { MdKeyboardDoubleArrowUp, MdKeyboardDoubleArrowDown } from 'react-icons/md'
import { HiOutlineMinus } from 'react-icons/hi'
import swal from 'sweetalert'
import { useMutation, useQuery, useQueryClient } from 'react-query'

export default function Tickets() {

    const localStorageData = JSON.parse(localStorage.getItem('user'))
    const queryClient = useQueryClient()

    // Get Tickets From Server
    const { data: tickets } = useQuery("tickets", () => {
        return fetch(`http://localhost:4000/v1/tickets`, {
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        }).then(res => res.json())
    })

    // Send Answer To Tickets
    const { mutate: sendAnswerToTicketHandler } = useMutation((answerInfo) => {
        return fetch(`http://localhost:4000/v1/tickets/answer`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorageData.token}`
            },
            body: JSON.stringify(answerInfo)
        })
            .then(res => {
                if (res.ok) {
                    swal({
                        title: "پاسخ شما با موفقیت ارسال شد.",
                        icon: "success",
                        buttons: 'باشه'
                    })
                }
            })
    },
    {
        onSuccess: () => {
            queryClient.invalidateQueries(["tickets"])
        }
    })
    const sendAnswerToTicket = (ticketID) => {
        swal({
            title: "متن پاسخ را وارد کنید:",
            content: "input",
            buttons: "ارسال"
        })
            .then((adminAnswer) => {
                const answerInfo = {
                    body: adminAnswer,
                    ticketID: ticketID,
                }
                sendAnswerToTicketHandler(answerInfo)
            })
    }

    // Show Ticket Body In Client
    const showTicketBody = (ticketBody) => {
        swal({
            text: ticketBody,
            buttons: "باشه"
        })
    }

    return (
        <DataTable title={'تیکت ها'}>
            <div className="admin-courses__table__wrapper">
                <table className='admin-courses__table'>
                    <thead className="admin-courses__table-header">
                        <tr>
                            <th className='admin-courses__table__th rounded-start'>وضعیت</th>
                            <th className='admin-courses__table__th'>شناسه</th>
                            <th className='admin-courses__table__th'>کاربر</th>
                            <th className='admin-courses__table__th'>عنوان</th>
                            <th className='admin-courses__table__th'>نوع</th>
                            <th className='admin-courses__table__th'>دوره</th>
                            <th className='admin-courses__table__th'>اولویت</th>
                            <th className='admin-courses__table__th'>مشاهده</th>
                            <th className='admin-courses__table__th'>پاسخ</th>
                        </tr>
                    </thead>
                    <tbody className='admin-courses__table-body'>
                        {
                            tickets?.map((ticket, index) => (
                                <tr className='admin-courses__table__tr' key={ticket._id}>
                                    <th className='admin-courses__table__th'>
                                        {
                                            ticket.answer === 0 ? (
                                                <AiOutlineLoading3Quarters className='no-answer' />
                                            ) : (
                                                <AiFillCheckCircle className='answer-btn' />
                                            )
                                        }
                                    </th>
                                    <th className='admin-courses__table__th'>{index + 1}</th>
                                    <th className='admin-courses__table__th font-weight-item item-width'>{ticket.user}</th>
                                    <th className='admin-courses__table__th item-width'>{ticket.title}</th>
                                    <th className='admin-courses__table__th item-width'>{ticket.departmentSubID}</th>
                                    <th className='admin-courses__table__th item-width'>{ticket.course ? ticket.course : <HiOutlineMinus className='ban-btn' />}</th>
                                    <th className='admin-courses__table__th'>
                                        {ticket.priority === 1 && <MdKeyboardDoubleArrowUp className='answer-btn' />}
                                        {ticket.priority === 2 && <HiOutlineMinus className='edit-btn' />}
                                        {ticket.priority === 3 && <MdKeyboardDoubleArrowDown className='delete-btn' />}
                                    </th>
                                    <th className='admin-courses__table__th'>
                                        <AiFillEye className='edit-btn' onClick={() => showTicketBody(ticket.body)} />
                                    </th>
                                    <th className='admin-courses__table__th'>
                                        {
                                            ticket.answer === 0 ? (
                                                <BiSolidCommentEdit className='answer-btn' onClick={() => sendAnswerToTicket(ticket._id)} />
                                            ) : (
                                                <AiFillCheckCircle className='answer-btn' />
                                            )
                                        }
                                    </th>
                                </tr>
                            ))
                        }


                    </tbody>
                </table>
            </div>
        </DataTable>

    )
}
