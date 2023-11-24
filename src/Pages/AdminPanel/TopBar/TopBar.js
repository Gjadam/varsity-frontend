import React, { useEffect, useState } from 'react'
import './TopBar.css'
import { FaUserCircle } from 'react-icons/fa'
import { CiSearch } from 'react-icons/ci'
import { IoIosNotificationsOutline } from 'react-icons/io'
export default function TopBar() {
    const [adminInfo, setAdminInfo] = useState({})
    const [adminNotification, setAdminNotification] = useState([])
    
    const [isOpenNotification, setIsOpenNotification] = useState(true)
    
    const openNotificationHandler = () => {
        let notificationBox = document.querySelector('.panel__top-bar__user__notification__box__items')
        if(isOpenNotification) {
            notificationBox.classList.add('panel__top-bar__user__notification__box__items--active')
            setIsOpenNotification(false)
        } else {
            notificationBox.classList.remove('panel__top-bar__user__notification__box__items--active')
            setIsOpenNotification(true)
        }
    }
    
    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        fetch(`http://localhost:4000/v1/auth/me`, {
            method: "GET",
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        })
            .then(res => res.json())
            .then(infos => {
                setAdminInfo(infos)
                setAdminNotification(infos.notifications)
            })
    }, [seeNotification])


    function seeNotification (notificationID) {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        fetch(`http://localhost:4000/v1/notifications/see/${notificationID}`, {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        })
    }

    return (
        <>
            <div className="panel__top-bar">
                <div className="panel__top-bar__user">
                    <div className="panel__top-bar__user__notification__wrapper" onClick={openNotificationHandler}>
                        <IoIosNotificationsOutline className='panel__top-bar__user__notification' />
                        {
                            adminNotification.length !== 0 ? (
                                <>
                                    <span className='panel__top-bar__user__notification__active'></span>
                                    <div className="panel__top-bar__user__notification__box__items">
                                        <div className="panel__top-bar__user__notification__box__items__top">
                                            <h1 className="panel__top-bar__user__notification__box__items__top__title">پیام ها</h1>
                                            <h1 className="panel__top-bar__user__notification__box__items__top__count">{adminNotification.length} پیام جدید</h1>
                                        </div>
                                        {
                                            adminNotification.map(notification => (
                                                <div className="panel__top-bar__user__notification__box__item" key={notification._id}>
                                                    <h1 className="panel__top-bar__user__notification__box__item__text">{notification.msg}</h1>
                                                    <button className="panel__top-bar__user__notification__box__item__submit" onClick={() => seeNotification(notification._id)}>مشاهده شد</button>
                                                </div>
                                            ))
                                        }

                                    </div>
                                </>

                            ) : (
                                <div className="panel__top-bar__user__notification__box__items">
                                    <h1 className="panel__top-bar__user__notification__box__item__text__error">پیام جدیدی وجود ندارد!</h1>
                                </div>
                            )
                        }

                    </div>
                    {
                        adminInfo.profile ? (
                            <img src={adminInfo.profile} alt="" className="panel__top-bar__user__image" />
                        ) : (
                            <FaUserCircle className='panel__top-bar__user__icon' />
                        )
                    }
                    <div className="panel__top-bar__user__info__wrapper">
                        <h1 className="panel__top-bar__user__info__name">{adminInfo.name}</h1>
                        <h1 className="panel__top-bar__user__info__email">{adminInfo.email}</h1>
                    </div>
                </div>
                <form className="panel__top-bar__search">
                    <button className="panel__top-bar__search__icon"><CiSearch /></button>
                    <input type="text" className='panel__top-bar__search__box' placeholder='جست و جو...' />
                </form>
            </div>
        </>
    )
}
