import React, { useEffect, useState } from 'react'
import './Comments.css'
import DataTable from '../DataTable/DataTable'
import swal from 'sweetalert'
import { AiFillCheckCircle, AiFillEye, AiOutlineLoading3Quarters, AiFillDelete, AiFillStar, AiOutlineStar } from 'react-icons/ai'
import { BsCheck2All } from 'react-icons/bs'
import { LiaTimesSolid } from 'react-icons/lia'
import { BiSolidCommentEdit } from 'react-icons/bi'
import { HiBan } from 'react-icons/hi'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import useBanUser from '../../../Hooks/useBanUser'

export default function Comments() {
    const queryClient = useQueryClient()
    const localStorageData = JSON.parse(localStorage.getItem('user'))

    // Get Comments From Server 
    const { data: comments } = useQuery("comments", () => {
        return fetch(`http://localhost:4000/v1/comments`).then(res => res.json())
    })


    // Reject Comment
    const { mutate: rejectCommentHandler } = useMutation((commentID) => {
        return fetch(`http://localhost:4000/v1/comments/reject/${commentID}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            },
        })
            .then(res => {
                if (res.ok) {
                    swal({
                        title: "دیدگاه موردنظر با موفقیت رد شد.",
                        icon: "success",
                        buttons: 'باشه'
                    })
                }
            })
    },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["comments"])
            }
        })
    const rejectComment = (event, commentID) => {
        event.preventDefault()
        swal({
            title: 'آیا میخواهید این دیدگاه را رد کنید؟',
            icon: 'warning',
            buttons: ['خیر', 'بله']
        })
            .then(result => {
                if (result) {
                    rejectCommentHandler(commentID)
                }
            })
    }

    // Accept Comment 
    const { mutate: acceptCommentHandler } = useMutation((commentID) => {
        return fetch(`http://localhost:4000/v1/comments/accept/${commentID}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            },
        })
            .then(res => {
                if (res.ok) {
                    swal({
                        title: "دیدگاه موردنظر با موفقیت تایید شد.",
                        icon: "success",
                        buttons: 'باشه'
                    })

                }
            })
    },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["comments"])
            }
        })
    const acceptComment = (event, commentID) => {
        event.preventDefault()
        swal({
            title: 'آیا میخواهید این دیدگاه را تایید کنید؟',
            icon: 'warning',
            buttons: ['خیر', 'بله']
        })
            .then(result => {
                if (result) {
                    acceptCommentHandler(commentID)
                }
            })
    }

    // Send Answer To Comment
    const { mutate: sendAnswerToCommentHandler } = useMutation((answerInfo) => {

        return fetch(`http://localhost:4000/v1/comments/answer/${answerInfo.commentID}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorageData.token}`
            },
            body: JSON.stringify({
                body: answerInfo.adminAnswer
            })
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
                queryClient.invalidateQueries(["comments"])
            }
        })
    const sendAnswerToComment = (event, commentID) => {
        event.preventDefault()
        swal({
            title: "متن پاسخ را وارد کنید:",
            content: "input",
            buttons: "ارسال"
        })
            .then((adminAnswer) => {
                const answerInfo = {
                    commentID,
                    adminAnswer,
                }
                sendAnswerToCommentHandler(answerInfo)
            })
    }

    // Delete Comment From Server
    const { mutate: deleteCommentHandler } = useMutation((commentID) => {
        return fetch(`http://localhost:4000/v1/comments/${commentID}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        })
            .then((res) => {
                if (res.ok) {
                    swal({
                        title: 'دیدگاه موردنظر با موفقیت حذف شد!',
                        icon: 'success',
                        buttons: 'باشه',
                    })
                } else {
                    swal({
                        title: 'حذف دیدگاه با مشکل مواجه شد!',
                        icon: 'error',
                        buttons: 'باشه',
                    })
                }
            })
    },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(["comments"])
            }
        })
    const deleteComment = (event, commentID) => {
        event.preventDefault()
        swal({
            title: 'آیا میخواهید این دیدگاه را حذف کنید؟',
            icon: 'warning',
            buttons: ['خیر', 'بله']
        })
            .then((result) => {
                if (result) {
                    deleteCommentHandler(commentID)
                }
            })
    }

    // Ban User From Server
    const { mutate: banUserHandler } = useBanUser()
    const banUser = (event, userID) => {
        event.preventDefault()
        swal({
            title: 'آیا میخواهید این کاربر را بن کنید؟',
            icon: 'warning',
            buttons: ['خیر', 'بله']
        }).then(result => {
            if (result) {
                banUserHandler(userID)
            }
        })
    }

    // Show Comment Body
    const showCommentBody = (event, commentBody) => {
        event.preventDefault()
        swal({
            text: commentBody,
            buttons: 'باشه'
        })
    }

    return (
        <DataTable title={'دیدگاه ها'}>
            <div className="admin-courses__table__wrapper">
                <table className='admin-courses__table'>
                    <thead className="admin-courses__table-header">
                        <tr>
                            <th className='admin-courses__table__th rounded-start'>وضعیت</th>
                            <th className='admin-courses__table__th '>شناسه</th>
                            <th className='admin-courses__table__th'>کاربر</th>
                            <th className='admin-courses__table__th'>دوره</th>
                            <th className='admin-courses__table__th'>امتیاز</th>
                            <th className='admin-courses__table__th'>مشاهده</th>
                            <th className='admin-courses__table__th'>تایید</th>
                            <th className='admin-courses__table__th'>پاسخ</th>
                            <th className='admin-courses__table__th'>حذف</th>
                            <th className='admin-courses__table__th rounded-end'>بن</th>
                        </tr>
                    </thead>
                    <tbody className='admin-courses__table-body'>
                        {
                            comments?.length &&
                            comments?.map((comment, index) => (
                                <tr className='admin-courses__table__tr'>
                                    <th className='admin-courses__table__th'>
                                        {
                                            comment.answer === 0 ? (
                                                <AiOutlineLoading3Quarters className='no-answer' />
                                            ) : (
                                                <AiFillCheckCircle className='answer-btn' />
                                            )
                                        }
                                    </th>
                                    <th className='admin-courses__table__th'>{index + 1}</th>
                                    <th className='admin-courses__table__th item-width font-weight-item'>{comment.creator.name}</th>
                                    <th className='admin-courses__table__th item-width'>{comment.course}</th>
                                    <th className='admin-courses__table__th item-width'>
                                        {
                                            Array(5 - comment.score).fill(0).map(item => (
                                                <AiOutlineStar className='star-icon' />
                                            ))
                                        }
                                        {
                                            Array(comment.score).fill(0).map(item => (
                                                <AiFillStar className='star-icon' />
                                            ))
                                        }
                                    </th>
                                    <th className='admin-courses__table__th'>
                                        <AiFillEye className='edit-btn' onClick={(event) => showCommentBody(event, comment.body)} />
                                    </th>
                                    <th className='admin-courses__table__th'>
                                        {
                                            comment.answer === 1 ? (
                                                <BsCheck2All className='edit-btn' onClick={(event) => rejectComment(event, comment._id)} />
                                            ) : (
                                                <LiaTimesSolid className='delete-btn' onClick={(event) => acceptComment(event, comment._id)} />
                                            )
                                        }
                                    </th>
                                    <th className='admin-courses__table__th'>
                                        {
                                            comment.answer === 0 ? (
                                                <BiSolidCommentEdit className='answer-btn' onClick={(event) => sendAnswerToComment(event, comment._id)} />
                                            ) : (
                                                <AiFillCheckCircle className='answer-btn' />
                                            )
                                        }
                                    </th>
                                    <th className='admin-courses__table__th'>
                                        <AiFillDelete className='delete-btn' onClick={(event) => deleteComment(event, comment._id)} />
                                    </th>
                                    <th className='admin-courses__table__th'>
                                        <HiBan className='ban-btn' onClick={(event) => banUser(event, comment.creator._id)} />
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
