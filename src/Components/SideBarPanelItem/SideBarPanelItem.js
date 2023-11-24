import React from 'react'
import './SideBarPanelItem.css'
import { NavLink } from 'react-router-dom'
export default function SideBarPanelItem({ title, icon, pathName }) {
  return (
    <>
     <NavLink to={pathName} className={link => link.isActive ? 'admin-panel__item--active' : 'admin-panel__item'}>
      {icon}
      <h1 className="admin-panel__item__title">{title}</h1>
     </NavLink>
    </>
  )
}
