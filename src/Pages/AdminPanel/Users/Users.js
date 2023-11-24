import React, { useEffect, useState } from 'react'
import './Users.css'
import { BiBlock } from 'react-icons/bi'
import { AiOutlineUser } from 'react-icons/ai'
import { BsFillPhoneVibrateFill } from 'react-icons/bs'
import { MdAlternateEmail } from 'react-icons/md'
import { FiMoreHorizontal } from 'react-icons/fi'
import { RiAdminLine } from 'react-icons/ri'
import DataTable from '../DataTable/DataTable'
import { FaUserCircle } from 'react-icons/fa'
import swal from 'sweetalert'
import { useMutation, useQuery, useQueryClient } from 'react-query'
import useBanUser from '../../../Hooks/useBanUser'

export default function Users() {
  const queryClient = useQueryClient()
  const localStorageData = JSON.parse(localStorage.getItem('user'))
  // Get Users Info From Server
  const { data: usersInfos } = useQuery("users", () => {
    return fetch(`http://localhost:4000/v1/users`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      }
    })
      .then(res => res.json())
  })

  // Delete User From Server
  const { mutate: removeUserHandler } = useMutation((userID) => {
    return fetch(`http://localhost:4000/v1/users/${userID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      }
    })
      .then(res => {
        if (res.ok) {
          swal({
            title: "کاربر با موفقیت حذف شد.",
            icon: 'success',
            buttons: 'قبول'
          })
        }
      })
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"])
      }
    })

  const removeUser = (event, userID) => {
    event.preventDefault()
    swal({
      title: 'آیا از حذف کردن کاربر مطمئن هستید؟',
      icon: 'warning',
      buttons: ["خیر ", "بله"]
    }).then(result => {
      if (result) {
        removeUserHandler(userID)
      }
    })
  }

  // Change User Role
  const { mutate: changeRoleHandler } = useMutation((reqBodyInfos) => {
    return fetch(`http://localhost:4000/v1/users/role`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`
      },
      body: JSON.stringify(reqBodyInfos)
    })
      .then(res => {
        if (res.ok) {
          swal({
            title: `نقش به ${reqBodyInfos.role === "ADMIN" ? "ادمین" : "کاربر"} تغییر یافت.`,
            icon: "success",
            buttons: "باشه"
          })
        } else {
          swal({
            title: 'تغییر نقش کاربر با مشکل مواجه شد!',
            icon: "error",
            buttons: "باشه"
          })
        }
      })
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["users"])
      }
    })
  const changeRole = (event, userID) => {
    event.preventDefault()
    swal({
      title: "لطفا نقش جدید را وارد نمایید",
      text: "برای تغییر نقش به کاربر (USER) و برای ادمین (ADMIN) را وارد کنید:",
      content: "input",
    })
      .then(value => {
        if (value) {
          const reqBodyInfos = {
            id: userID,
            role: value,
          }
          changeRoleHandler(reqBodyInfos)
        }
      })
  }

  // Ban User From Server
  const { mutate: banUserHandler } = useBanUser()

  const banUser = (event, userID) => {
    event.preventDefault()
    swal({
      title: 'آیا از بن شدن کاربر مطمئن هستید؟',
      icon: 'warning',
      buttons: ["خیر ", "بله"]
    }).then(result => {
      if (result) {
        banUserHandler(userID)
      }
    })
  }

  return (
    <>
      <DataTable title={'هنرجویان'}>
        {
          usersInfos?.map((userinfo, index) => (
            <div className="users__box" key={userinfo._id}>
              <div className="users__box__top">
                <div className="users__box__top__content">
                  {
                    userinfo.profile ? (
                      <img src={userinfo.profile} alt="image" className="users__box__top__user-image" />
                    ) : (
                      <FaUserCircle className='panel__top-bar__user__icon' />
                    )
                  }
                  <h1 className="users__box__top__user-name">{userinfo.name}</h1>
                </div>
                <div className="users__box__top__more">
                  <FiMoreHorizontal className='users__box__top__more__icon' />
                  <div className="users__box__top__more__content__wrapper">
                    <div className="users__box__top__more__content">
                      <a href='' className="users__box__top__more__content__edit" onClick={(event) => changeRole(event, userinfo._id)}>تغییر نقش</a>
                      <a href='' className="users__box__top__more__content__delete" onClick={(event) => removeUser(event, userinfo._id)}>حذف</a>
                    </div>
                  </div>
                </div>
              </div>
              <div className="users__box__infos">
                <div className="users__box__info">
                  <h1 className="users__box__infos__user-id">
                    <div id='id' className="users__box__infos__user-id__icon__wrapper">
                      <AiOutlineUser className="users__box__infos__user-id__icon" />
                    </div>
                    شناسه
                  </h1>
                  <h1 className="users__box__infos__user-id__value">{index + 1}</h1>
                </div>
                <div className="users__box__info">
                  <h1 className="users__box__infos__user-id">
                    <div id='phoneNumber' className="users__box__infos__user-id__icon__wrapper">
                      <BsFillPhoneVibrateFill className="users__box__infos__user-id__icon" />
                    </div>
                    شماره تلفن
                  </h1>
                  <h1 className="users__box__infos__user-id__value">{userinfo.phone}</h1>
                </div>
                <div className="users__box__info">
                  <h1 className="users__box__infos__user-id">
                    <div id='email' className="users__box__infos__user-id__icon__wrapper">
                      <MdAlternateEmail className="users__box__infos__user-id__icon" />
                    </div>
                    ایمیل
                  </h1>
                  <h1 className="users__box__infos__user-id__value">{userinfo.email}</h1>
                </div>
                <div className="users__box__info">
                  <h1 className="users__box__infos__user-id">
                    <div id='role' className="users__box__infos__user-id__icon__wrapper">
                      <RiAdminLine className="users__box__infos__user-id__icon" />
                    </div>
                    نقش
                  </h1>
                  <h1 className="users__box__infos__user-id__value">{userinfo.role === 'ADMIN' ? 'ادمین' : 'کاربر'}</h1>
                </div>
              </div>
              <div className="users__box__bottom">
                <div className="users__box__bottom__login-date">
                  <h1 className="users__box__bottom__login-date__title">تاریخ عضویت:</h1>
                  <h1 className="users__box__bottom__login-date__title__value">{userinfo.createdAt.slice(0, 10)}</h1>
                </div>
                <div className="users__box__bottom__options">
                  <abbr title="بلاک">
                    <a href='' className="users__box__bottom__option" onClick={(event) => banUser(event, userinfo._id)}>
                      <BiBlock className='users__box__bottom__option__icon' />
                    </a>
                  </abbr>
                </div>
              </div>
            </div>
          ))
        }

      </DataTable >
    </>
  )
}
