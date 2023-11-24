import React from 'react'
import './UserPanelBox.css'
export default function UserPanelBox({title, count, icon}) {
  return (
    <div className='user-panel-box'>
        <div className="user-panel-box__icon__wrapper">
            {icon}
        </div>
        <div className="user-panel-box__content-wrapper">
            <h1 className="user-panel-box__content-wrapper__title">{title}</h1>
            <h1 className="user-panel-box__content-wrapper__count">{count}</h1>
        </div>
    </div>
  )
}
