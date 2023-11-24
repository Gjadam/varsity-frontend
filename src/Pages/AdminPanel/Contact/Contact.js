import React, { useEffect, useState } from 'react'
import './Contact.css'
import DataTable from '../DataTable/DataTable'
import swal from 'sweetalert'
import { AiFillCheckCircle, AiFillDelete, AiFillEye, AiOutlineLoading3Quarters } from 'react-icons/ai'
import { BiSolidCommentEdit } from 'react-icons/bi'
import { useMutation, useQuery, useQueryClient } from 'react-query'
export default function Contact() {

    const localStorageData = JSON.parse(localStorage.getItem('user'))
    const queryClient = useQueryClient()

    // Get Contacts From Server
    const { data: contacts } = useQuery("contacts", () => {
        return fetch(`http://localhost:4000/v1/contact`).then(res => res.json())
    })

    // Send Answer To User
    const { mutate: sendAnswerToUserHandler } = useMutation((answerInfo) => {
        return fetch(`http://localhost:4000/v1/contact/answer`, {
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
                queryClient.invalidateQueries(["contacts"])
            }
        })
    const sendAnswerToUser = (event, contactEmail) => {
        event.preventDefault()
        swal({
            title: "متن پاسخ را وارد کنید:",
            content: "input",
            buttons: "ارسال"
        })
            .then((adminAnswer) => {
                const answerInfo = {
                    email: contactEmail,
                    answer: adminAnswer,
                }
                sendAnswerToUserHandler(answerInfo)
            })
    }

    // Delete Contact From Server 
    const { mutate: deleteContactHandler } = useMutation((contactID) => {
        return fetch(`http://localhost:4000/v1/contact/${contactID}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        }).then(res => {
            if (res.ok) {
                swal({
                    title: 'پیام موردنظر با موفقیت حذف شد!',
                    icon: "success",
                    buttons: 'باشه'
                })
            }
        })
    },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["contacts"])
            }
        })
    const deleteContact = (event, contactID) => {
        event.preventDefault()
        swal({
            title: 'آیا میخواهید این پیام را حذف کنید؟',
            icon: "warning",
            buttons: ['خیر', 'بله']
        }).then(value => {
            if (value) {
                deleteContactHandler(contactID)
            }
        })
    }

    // Show Contact Body In Client
    const showContactBody = (event, body) => {
        event.preventDefault()
        swal({
            text: body,
            buttons: 'بستن'
        })
    }

    return (
        <>
            <DataTable title={"ارتباط با ما"} >
                <div className="admin-courses__table__wrapper">
                    <table className='admin-courses__table'>
                        <thead className="admin-courses__table-header">
                            <tr>
                                <th className='admin-courses__table__th rounded-start'>وضعیت</th>
                                <th className='admin-courses__table__th'>شناسه</th>
                                <th className='admin-courses__table__th'>نام و نام خانوادگی</th>
                                <th className='admin-courses__table__th'>ایمیل</th>
                                <th className='admin-courses__table__th'>شماره تماس</th>
                                <th className='admin-courses__table__th'>مشاهده</th>
                                <th className='admin-courses__table__th'>پاسخ</th>
                                <th className='admin-courses__table__th rounded-end'>حذف</th>
                            </tr>
                        </thead>
                        <tbody className='admin-courses__table-body'>
                            {
                                contacts?.map((contact, index) => (
                                    <tr className='admin-courses__table__tr'>
                                        <th className='admin-courses__table__th'>
                                            {
                                                contact.answer === 0 ? (
                                                    <AiOutlineLoading3Quarters className='no-answer' />
                                                ) : (
                                                    <AiFillCheckCircle className='answer-btn' />
                                                )
                                            }
                                        </th>
                                        <th className='admin-courses__table__th'>{index + 1}</th>
                                        <th className='admin-courses__table__th font-weight-item item-width'>{contact.name}</th>
                                        <th className='admin-courses__table__th'>{contact.email}</th>
                                        <th className='admin-courses__table__th'>{contact.phone}</th>
                                        <th className='admin-courses__table__th'>
                                            <AiFillEye className='edit-btn' onClick={(event) => showContactBody(event, contact.body)} />
                                        </th>
                                        <th className='admin-courses__table__th'>
                                            {
                                                contact.answer === 0 ? (
                                                    <BiSolidCommentEdit className='answer-btn' onClick={(event) => sendAnswerToUser(event, contact.email)} />
                                                ) : (
                                                    <AiFillCheckCircle className='answer-btn' />
                                                )
                                            }
                                        </th>
                                        <th className='admin-courses__table__th'>
                                            <AiFillDelete className='delete-btn' onClick={(event) => deleteContact(event, contact._id)} />
                                        </th>
                                    </tr>
                                ))
                            }

                        </tbody>
                    </table>
                </div>
            </DataTable>
        </>
    )
}
