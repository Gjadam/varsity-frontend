import React, { useEffect, useState } from 'react'
import './SendTicket.css'
import UserDataTable from '../../UserDataTable/UserDataTable'
import { AiOutlineSend } from 'react-icons/ai'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
import useUserCourses from '../../../../Hooks/useUserCourses'
import { useMutation, useQuery } from 'react-query'
export default function SendTicket() {
    
    const [departmentsSubs, setDepartmentsSubs] = useState([])
    const [ticketTypeID, setTicketTypeID] = useState('')
    const [departmentID, setDepartmentID] = useState('')
    const [title, setTitle] = useState('')
    const [priority, setPriority] = useState('')
    const [body, setBody] = useState('')
    const [courseID, setCourseID] = useState('')
    const navigate = useNavigate()
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    
    // Get User Courses From Server
    const { data: courses } = useUserCourses()

    // Get All Departments From Server
    const { data: departments } = useQuery("departments", () => {
        return fetch(`http://localhost:4000/v1/tickets/departments`).then(res => res.json())
    })

    const getDepartmentsSub = (departmentID) => {
        fetch(`http://localhost:4000/v1/tickets/departments-subs/${departmentID}`)
            .then(res => res.json())
            .then(subs => {
                setDepartmentsSubs(subs)
            })
    }

    // Send Ticket To Server
    const { mutate: sendTicketHandler } = useMutation((newTicketInfos) => {
        return fetch(`http://localhost:4000/v1/tickets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorageData.token}`
            },
            body: JSON.stringify(newTicketInfos)
        })
            .then(res => {
                if (res.ok) {
                    swal({
                        title: "تیکت با موفقیت ارسال شد!",
                        icon: "success",
                        buttons: "باشه"
                    })
                        .then(result => {
                            if (result) {
                                navigate('/my-account/ticket')
                            }
                        })
                } else {
                    swal({
                        title: "ارسال تیکت با مشکل مواجه شد!",
                        icon: "error",
                        buttons: "باشه"
                    })
                }
            })
    })

    const sendTicket = () => {
        const newTicketInfos = {
            departmentID,
            departmentSubID: ticketTypeID,
            title,
            body,
            priority,
            course: courseID.length ? courseID : undefined,
        }
        sendTicketHandler(newTicketInfos)
    }

    return (
        <UserDataTable title={'ارسال تیکت جدید'}>
            <form className="send-ticket__wrapper">
                <div className="send-ticket__select-box__wrapper">
                    <label className='send-ticket__select-box__title'>انتخاب دپارتمان</label>
                    <select
                        className='send-ticket__select-box'
                        onChange={(event) => {
                            getDepartmentsSub(event.target.value);
                            setDepartmentID(event.target.value)
                        }
                        }
                        required
                    >
                        <option value="-1">دپارتمان را انتخاب کنید</option>
                        {
                            departments?.map(department => (
                                <option key={department._id} value={department._id} >{department.title}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="send-ticket__select-box__wrapper">
                    <label className='send-ticket__select-box__title'>نوع تیکت</label>
                    <select className='send-ticket__select-box' onChange={(event) => setTicketTypeID(event.target.value)} required>
                        <option value="-1">نوع تیکت را انتخاب کنید</option>
                        {
                            departmentsSubs.map(departmentsSub => (
                                <option key={departmentsSub._id} value={departmentsSub._id} >{departmentsSub.title}</option>
                            ))
                        }
                    </select>
                </div>
                {
                    ticketTypeID === '63b688c5516a30a651e98156' &&
                    <div className="send-ticket__select-box__wrapper">
                        <label className='send-ticket__select-box__title'>انتخاب دوره</label>
                        <select className='send-ticket__select-box' onChange={(event) => setCourseID(event.target.value)} required>
                            <option value="-1">محصول را انتخاب کنید</option>
                            {
                                courses.map(course => (
                                    <option key={course._id} value={course._id} >{course.course.name}</option>
                                ))
                            }
                        </select>
                    </div>
                }
                <div className="send-ticket__select-box__wrapper">
                    <label className='send-ticket__select-box__title'>سطح اولویت</label>
                    <select className='send-ticket__select-box' required onChange={(event) => setPriority(event.target.value)}>
                        <option value="-1">اولویت تیکت را انتخاب کنید</option>
                        <option value='3'>کم</option>
                        <option value='2'>متوسط</option>
                        <option value='1'>زیاد</option>
                    </select>
                </div>
                <div className="send-ticket__select-box__wrapper">
                    <label className='send-ticket__select-box__title'>عنوان تیکت</label>
                    <input
                        type="text"
                        className='send-ticket__select-box'
                        placeholder='عنوان تیکت را وارد کنید...'
                        onChange={(event) => setTitle(event.target.value)}
                        required
                    />
                </div>
                <div className="send-ticket__select-box__wrapper">
                    <label className='send-ticket__select-box__title'>محتوای تیکت</label>
                    <textarea style={{ height: '15rem' }} className='send-ticket__select-box' placeholder='محتوای تیکت را وارد کنید...' onChange={(event) => setBody(event.target.value)} required />
                </div>
                <div className="user-ticket__add-ticket__wrapper">
                    <span className="user-ticket__add-ticket__link" onClick={sendTicket}>ارسال تیکت<AiOutlineSend className='user-ticket__add-ticket__link__icon' /></span>
                </div>
            </form>
        </UserDataTable>
    )
}
