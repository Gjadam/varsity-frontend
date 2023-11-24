import React, { useContext } from 'react'
import './AdminPanel.css'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import SideBarPanelItem from '../../Components/SideBarPanelItem/SideBarPanelItem'
import { AiOutlineContacts, AiOutlineHome, AiOutlineMenu, AiOutlinePlayCircle, AiOutlinePoweroff } from 'react-icons/ai'
import { PiStudent } from 'react-icons/pi'
import { CiShoppingBasket } from 'react-icons/ci'
import { MdOutlineArticle, MdOutlineDiscount } from 'react-icons/md'
import { BsGlobe } from 'react-icons/bs'
import { BiCategoryAlt } from 'react-icons/bi'
import TopBar from './TopBar/TopBar'
import ToUp from '../../Components/ToUp/ToUp'
import AuthContext from '../../Context/AuthContext'
import swal from 'sweetalert'
import { LiaCommentsSolid } from 'react-icons/lia'
import { HiOutlineTicket } from 'react-icons/hi2'
import { TbDiscount2 } from 'react-icons/tb'
export default function AdminPanel() {

    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    const logOutAdmin = (event) => {
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

    return (
        <>
            <ToUp />
            <div className="admin-panel">
                <TopBar />
                <Outlet />
                <div className="admin-panel__side-bar">
                    <div className="admin-panel__side-bar__top">
                        <img src="/images/logo/Logo-mini.png" alt="logo" className="admin-panel__side-bar__top__logo" />
                    </div>
                    <div className="admin-panel__side-bar__center">
                        <div className="admin-panel__side-bar__center__items">
                            <SideBarPanelItem title={'داشبورد'} icon={<AiOutlineHome className='admin-panel__item__icon' />} pathName={'/p-admin/'} />
                            <SideBarPanelItem title={'دوره ها'} icon={<CiShoppingBasket className='admin-panel__item__icon' />} pathName={'courses'} />
                            <SideBarPanelItem title={'جلسات'} icon={<AiOutlinePlayCircle className='admin-panel__item__icon' />} pathName={'sessions'} />
                            <SideBarPanelItem title={'منو ها'} icon={<AiOutlineMenu className='admin-panel__item__icon' />} pathName={'menus'} />
                            <SideBarPanelItem title={'مقالات'} icon={<MdOutlineArticle className='admin-panel__item__icon' />} pathName={'articles'} />
                            <SideBarPanelItem title={'هنرجویان'} icon={<PiStudent className='admin-panel__item__icon' />} pathName={'users'} />
                            <SideBarPanelItem title={'دیدگاه ها'} icon={<LiaCommentsSolid className='admin-panel__item__icon' />} pathName={'comments'} />
                            <SideBarPanelItem title={'کدهای تخفیف'} icon={<MdOutlineDiscount className='admin-panel__item__icon' />} pathName={'offs'} />
                            <SideBarPanelItem title={'تخفیف همگانی'} icon={<TbDiscount2 className='admin-panel__item__icon' />} pathName={'discounts'} />
                            <SideBarPanelItem title={'تیکت ها'} icon={<HiOutlineTicket className='admin-panel__item__icon' />} pathName={'tickets'} />
                            <SideBarPanelItem title={'دسته بندی ها'} icon={<BiCategoryAlt className='admin-panel__item__icon' />} pathName={'category'} />
                            <SideBarPanelItem title={'ارتباط با ما'} icon={<AiOutlineContacts className='admin-panel__item__icon' />} pathName={'contacts'} />
                        </div>
                    </div>
                    <div className="admin-panel__side-bar__center__bottom">
                        <abbr title="صفحه اصلی">
                            <Link to='/' className="admin-panel__side-bar__center__bottom__link">
                                <BsGlobe className='admin-panel__side-bar__center__bottom__link__icon' />
                            </Link>
                        </abbr>

                        <div className="admin-panel__side-bar__center__bottom__link">
                            <abbr title="خروج">
                                <AiOutlinePoweroff className='admin-panel__side-bar__center__bottom__link__icon' onClick={logOutAdmin} />
                            </abbr>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
