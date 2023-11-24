import './NavBar.css'
import { CiSettings, CiSearch } from 'react-icons/ci'
import { BiSolidUserAccount, BiSupport } from 'react-icons/bi'
import { LiaPowerOffSolid } from 'react-icons/lia'
import { FaUserCircle } from 'react-icons/fa'
import { TiArrowSortedDown } from 'react-icons/ti'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import { useContext, useEffect, useRef, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import AuthContext from '../../Context/AuthContext'
import MobileMenu from './MobileMenu'
import swal from 'sweetalert'
import useToUpClick from '../../Hooks/useToUpClick'
export default function NavBar() {
    
    const [isOpenSubMenu, setIsOpenSubMenu] = useState(true)
    const [isOpenHamburgerIcon, setIsOpenHamburgerIcon] = useState(true)    
    const [searchValue, setSearchValue] = useState('')
    const [allMenus, setAllMenus] = useState([])
    const [toUpHandler] = useToUpClick()

    const authContext = useContext(AuthContext)
    const userSubMenuInfo = useRef()
    const navigate = useNavigate()

    const openUserSubMenu = () => {
        const userSubMenu = userSubMenuInfo.current
        if (isOpenSubMenu) {
            userSubMenu.classList.add('navbar__left-side__user__sub-nav--active')
            setIsOpenSubMenu(prevState => !prevState)
        } else {
            userSubMenu.classList.remove('navbar__left-side__user__sub-nav--active')
            setIsOpenSubMenu(prevState => !prevState)
        }
    }

    const openNavbar = () => {
        const hamburgerIcon = document.querySelector('.navbar__left-side__hamburger')
        const navMobileWrapper = document.querySelector('.navbar__nav-mobile__wrapper')
        if (isOpenHamburgerIcon) {
            hamburgerIcon.classList.add("navbar__left-side__hamburger--active")
            navMobileWrapper.classList.add('navbar__nav-mobile__wrapper--active')
            setIsOpenHamburgerIcon(false)
        } else {
            hamburgerIcon.classList.remove("navbar__left-side__hamburger--active")
            navMobileWrapper.classList.remove('navbar__nav-mobile__wrapper--active')
            setIsOpenHamburgerIcon(true)
        }

    }

    const goToSearchPage = (event) => {
        event.preventDefault()
        navigate(`/search/${searchValue}`)
    }


    useEffect(() => {
        fetch('http://localhost:4000/v1/menus')
            .then(res => res.json())
            .then(menus => setAllMenus(menus))
    }, [])

    const logOutUser = (event) => {
        event.preventDefault()

        swal({
            title: 'آیا میخواهید خارج شوید؟',
            icon: 'warning',
            buttons: ["خیر", "بله"]
        }).then((result) => {
            if(result) {
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
        <div className='container'>
            <div className='navbar'>
                <div className="navbar__left-side">
                    <div className="navbar__left-side__user">
                        {
                            authContext.isLoggedIn ? (
                                <>
                                    {
                                        authContext.userInfos.profile ? (
                                            <div className="navbar__left-side__user__image__wrapper" onClick={openUserSubMenu}>
                                                <img src={authContext.userInfos.profile} alt="image" className="navbar__left-side__user__image" />
                                            </div>
                                        ) : (
                                            <div className="navbar__left-side__user__image__wrapper" onClick={openUserSubMenu}>
                                                <FaUserCircle className="navbar__left-side__user__image" />
                                            </div>
                                        )
                                    }

                                    <div ref={userSubMenuInfo} className="navbar__left-side__user__sub-nav">
                                        <div className="navbar__left-side__user__sub-nav__infos">
                                            <div className='navbar__left-side__user__sub-nav__infos__wrapper'>
                                                {
                                                    authContext.userInfos.profile ? (
                                                        <img src={authContext.userInfos.profile} alt="image" className="navbar__left-side__user__sub-nav__infos__image" />
                                                    ) : (
                                                        <FaUserCircle className="navbar__left-side__user__sub-nav__infos__icon" />
                                                    )
                                                }
                                                <div>
                                                <h1 className="navbar__left-side__user__sub-nav__infos__user-name">{authContext.userInfos.name}</h1>
                                                <h1 className="navbar__left-side__user__sub-nav__infos__gmail">{authContext.userInfos.email}</h1>

                                                </div>
                                            </div>
                                        </div>
                                        <div className="navbar__left-side__user__sub-nav__options">
                                            {
                                                authContext.userInfos.role === "ADMIN" &&
                                                <Link to="/p-admin/" className="navbar__left-side__user__sub-nav__option"><CiSettings className='navbar__left-side__user__sub-nav__option__icon' /> داشبورد ادمین</Link> 
                                            }
                                            <Link to="/my-account/" className="navbar__left-side__user__sub-nav__option"><BiSolidUserAccount className='navbar__left-side__user__sub-nav__option__icon' /> پنل کاربری</Link>
                                            <Link to="/my-account/buyed" className="navbar__left-side__user__sub-nav__option"><AiOutlineShoppingCart className='navbar__left-side__user__sub-nav__option__icon' /> دوره های من</Link>
                                            <Link to="/my-account/ticket" className="navbar__left-side__user__sub-nav__option"><BiSupport className='navbar__left-side__user__sub-nav__option__icon' /> پشتیبانی</Link>
                                            <a href="" id='navbar__left-side__user__sub-nav__option__logout' className="navbar__left-side__user__sub-nav__option" onClick={logOutUser}><LiaPowerOffSolid className='navbar__left-side__user__sub-nav__option__icon' /> خروج</a>
                                        </div>
                                    </div>
                                </>
                            ) : (
                                <div className="navbar__left-side__user__register-user">
                                    <Link to='/login' className="navbar__left-side__user__register-user__login">ورود</Link>
                                    <Link to='/register' className="navbar__left-side__user__register-user__register">ثبت نام</Link>
                                </div>
                            )
                        }
                    </div>
                    <form className="navbar__left-side__search-box">
                        <button className="navbar__left-side__search-box__icon" onClick={goToSearchPage}><CiSearch /></button>
                        <input
                            type="text"
                            placeholder="جستجو..."
                            className="navbar__left-side__search-box__input"
                            value={searchValue}
                            onChange={(event) => setSearchValue(event.target.value)}
                        />
                    </form>
                    <div className="navbar__left-side__hamburger__wrapper" onClick={openNavbar}>
                        <p className="navbar__left-side__hamburger"></p>
                    </div>
                </div>
                <div className="navbar__right-side">
                    <Link to='/' className="navbar__right-side__link" onClick={toUpHandler}>
                        <img src="/images/logo/logo.png" alt="logo" className="navbar__right-side__link__logo" />
                        <img src="/images/logo/logo-mini.png" alt="logo" className="navbar__right-side__link__logo-mini" />
                    </Link>
                    {
                        allMenus.map(menu => (
                            <div className="navbar__center-side__menu" key={menu._id}>
                                <NavLink to={`/category-info/${menu.href}/1`} className={link => link.isActive ? 'navbar__center-side__menu__title--active' : 'navbar__center-side__menu__title'}>{menu.title}
                                    {
                                        menu.submenus.length !== 0 && <TiArrowSortedDown />
                                    }
                                </NavLink>
                                {
                                    menu.submenus.length !== 0 && (
                                        <div className="navbar__center-side__sub-menu">
                                            {menu.submenus.map(submenu => (
                                                <div className='navbar__center-side__sub-menu__items'>
                                                    <Link to={`${submenu.href}`} className="navbar__center-side__sub-menu__item">{submenu.title}</Link>
                                                </div>
                                            ))}
                                        </div>

                                    )
                                }

                            </div>
                        ))
                    }
                </div>
                <div className="navbar__nav-mobile__wrapper">
                    <form className="navbar__nav-mobile__search-box">
                        <button className="navbar__nav-mobile__search-box__icon" onClick={goToSearchPage}><CiSearch /></button>
                        <input
                            type="text"
                            placeholder="جستجو..."
                            className="navbar__nav-mobile__search-box__input"
                            value={searchValue}
                            onChange={(event) => setSearchValue(event.target.value)}
                        />
                    </form>
                    {allMenus.map(menu => (
                        <MobileMenu key={menu._id} {...menu} />
                    ))}
                </div>

            </div>
        </div>
    )
}
