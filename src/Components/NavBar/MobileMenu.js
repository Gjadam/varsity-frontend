import React, { useState } from 'react'
import { TiArrowSortedDown } from 'react-icons/ti'
import { Link, NavLink } from 'react-router-dom'

export default function MobileMenu(props) {

    const [isOpenMobileSubMenu, setIsOpenMobileSubMenu] = useState(true)

    const openMobileSubMenu = (event) => {
        const subMenuItems = document.querySelectorAll('.navbar__nav-mobile__items')

        subMenuItems.forEach(item => {
            if (event.target.dataset.id == item.dataset.id && isOpenMobileSubMenu) {
                item.style.display = 'flex'
                setIsOpenMobileSubMenu(false)

            } else if (isOpenMobileSubMenu == false) {
                item.style.display = 'none'
                setIsOpenMobileSubMenu(true)
            }
        })
    }

    return (
        <>
            <div className="navbar__nav-mobile" data-id={props._id} onClick={openMobileSubMenu}>
                <NavLink to={`/category-info/${props.href}/1`} className={link => link.isActive ? 'navbar__nav-mobile__title--active' : 'navbar__nav-mobile__title'}>{props.title}</NavLink>
                {
                    props.submenus.length !== 0 && <TiArrowSortedDown className="navbar__nav-mobile__title__icon" />
                }
            </div>
            {
                props.submenus.length !== 0 && (
                    <div className="navbar__nav-mobile__items" data-id={props._id}>
                        {props.submenus.map(submenu => (
                            <Link to={submenu.href} className="navbar__nav-mobile__item">{submenu.title}</Link>

                        ))}
                    </div>
                )
            }

        </>
    )
}
