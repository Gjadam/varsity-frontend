import React, { useContext } from 'react'
import './UserPanel.css'
import CategoryHeader from '../../Components/CategoryHeader/CategoryHeader'
import NavBar from '../../Components/NavBar/NavBar'
import AuthContext from '../../Context/AuthContext'
import swal from 'sweetalert'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { FaTimes, FaUserCircle, } from 'react-icons/fa'
import { BiSolidDashboard, BiSolidShoppingBagAlt, BiSolidWallet } from 'react-icons/bi'
import { GiTicket } from 'react-icons/gi'
import { FaCartShopping, FaRectangleList } from 'react-icons/fa6'
import { RiAccountPinCircleFill, RiListSettingsLine } from 'react-icons/ri'
import { LiaPowerOffSolid } from 'react-icons/lia'



export default function UserPanel() {

    const authContext = useContext(AuthContext)
    const navigate = useNavigate()

    const logOutUser = (event) => {
        event.preventDefault()

        swal({
            title: 'آیا میخواهید خارج شوید؟',
            icon: 'warning',
            buttons: ["خیر", "بله"]
        }).then((result) => {
            if (result) {
                swal({
                    title: 'با موفقیت خارج شدید',
                    icon: 'success',
                    buttons: 'باشه'
                }).then(() => {
                    authContext.logout()
                    navigate('/')
                })
            }
        })
    }


    const openUserPanelSideBar = () => {
        let userPanelSideBarMobile = document.querySelector('.user-panel__dashboard__side-bar__mobile')
        userPanelSideBarMobile.style.right = "0"
    }

    const closeUserPanelSideBar = () => {
        let userPanelSideBarMobile = document.querySelector('.user-panel__dashboard__side-bar__mobile')
        userPanelSideBarMobile.style.right = "-20rem"
    }

    return (
        <>
            <NavBar />
            <CategoryHeader TitleName={''} title={''} />
            <div className="container">
                <div className="user-panel">
                    <div className="user-panel__top">
                        <div className="user-panel__top__user-info">
                            {
                                authContext.userInfos.profile ? (
                                    <img src={authContext.userInfos.profile} alt="image" className="user-panel__top__user-info__image" />
                                ) : (
                                    <FaUserCircle className="user-panel__top__user-info__icon" />
                                )
                            }
                            <div className="user-panel__top__user-info__wrapper">
                                <h1 className="user-panel__top__user-info__name">{authContext.userInfos.name}</h1>
                                <h1 className="user-panel__top__user-info__email">{authContext.userInfos.email}</h1>
                            </div>
                        </div>
                        <Link to='/my-account/buyed' className="user-panel__top__user-info__all-user-courses">
                            <h1 className="user-panel__top__user-info__all-user-courses__btn">مشاهده دوره های من</h1>
                        </Link>
                    </div>
                    <div className="user-panel__dashboard__wrapper">
                        <div className="user-panel__dashboard__side-bar">
                            <NavLink to="/my-account/" className={link => link.isActive ? "user-panel__dashboard__side-bar__item--active" : "user-panel__dashboard__side-bar__item"}>داشبورد<BiSolidDashboard className='user-panel__dashboard__side-bar__item__icon' /></NavLink>
                            <NavLink to="orders" className={link => link.isActive ? "user-panel__dashboard__side-bar__item--active" : "user-panel__dashboard__side-bar__item"}>سفارش<FaCartShopping className='user-panel__dashboard__side-bar__item__icon' /></NavLink>
                            <NavLink to="edit-account" className={link => link.isActive ? "user-panel__dashboard__side-bar__item--active" : "user-panel__dashboard__side-bar__item"}>جزئیات حساب<RiAccountPinCircleFill className='user-panel__dashboard__side-bar__item__icon' /></NavLink>
                            <NavLink to="buyed" className={link => link.isActive ? "user-panel__dashboard__side-bar__item--active" : "user-panel__dashboard__side-bar__item"}>دوره های من<BiSolidShoppingBagAlt className='user-panel__dashboard__side-bar__item__icon' /></NavLink>
                            <NavLink to="ticket" className={link => link.isActive ? "user-panel__dashboard__side-bar__item--active" : "user-panel__dashboard__side-bar__item"}>تیکت پشتیبانی<GiTicket className='user-panel__dashboard__side-bar__item__icon' /></NavLink>
                            <NavLink to="" id='log-out' className="user-panel__dashboard__side-bar__item" onClick={logOutUser}>خروج<LiaPowerOffSolid className='user-panel__dashboard__side-bar__item__icon' /></NavLink>
                        </div>
                        <div className="user-panel__dashboard__side-bar__mobile">
                            <FaTimes className='user-panel__dashboard__side-bar__mobile__close-btn' onClick={closeUserPanelSideBar}/>
                            <NavLink to="/my-account/" className={link => link.isActive ? "user-panel__dashboard__side-bar__item--active" : "user-panel__dashboard__side-bar__item"}>داشبورد<BiSolidDashboard className='user-panel__dashboard__side-bar__item__icon' /></NavLink>
                            <NavLink to="orders" className={link => link.isActive ? "user-panel__dashboard__side-bar__item--active" : "user-panel__dashboard__side-bar__item"}>سفارش<FaCartShopping className='user-panel__dashboard__side-bar__item__icon' /></NavLink>
                            <NavLink to="edit-account" className={link => link.isActive ? "user-panel__dashboard__side-bar__item--active" : "user-panel__dashboard__side-bar__item"}>جزئیات حساب<RiAccountPinCircleFill className='user-panel__dashboard__side-bar__item__icon' /></NavLink>
                            <NavLink to="buyed" className={link => link.isActive ? "user-panel__dashboard__side-bar__item--active" : "user-panel__dashboard__side-bar__item"}>دوره های من<BiSolidShoppingBagAlt className='user-panel__dashboard__side-bar__item__icon' /></NavLink>
                            <NavLink to="ticket" className={link => link.isActive ? "user-panel__dashboard__side-bar__item--active" : "user-panel__dashboard__side-bar__item"}>تیکت پشتیبانی<GiTicket className='user-panel__dashboard__side-bar__item__icon' /></NavLink>
                            <NavLink to="" id='log-out' className="user-panel__dashboard__side-bar__item" onClick={logOutUser}>خروج<LiaPowerOffSolid className='user-panel__dashboard__side-bar__item__icon' /></NavLink>
                        </div>
                        <div className="user-panel__dashboard__info">
                    <div className="user-panel__dashboard__side-bar__hamburger">
                        <FaRectangleList className='user-panel__dashboard__side-bar__hamburger__icon' onClick={openUserPanelSideBar}/>
                    </div>
                            <Outlet />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
