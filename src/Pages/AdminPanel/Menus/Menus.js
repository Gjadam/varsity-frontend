import React, { useEffect, useState } from 'react'
import './Menus.css'
import DataTable from '../DataTable/DataTable'
import { AiFillCheckCircle, AiFillDelete } from 'react-icons/ai'
import swal from 'sweetalert'
import FormInput from '../../../Components/FormInput/FormInput'
import FormButton from '../../../Components/FormInput/FormButton'
import { useForm } from "../../../Hooks/useForm";
import {
  requiredValidator,
  minValidator,
} from "../../../Validators/Rules";
import { LiaEditSolid } from 'react-icons/lia'
import { useMutation, useQuery, useQueryClient } from 'react-query'
export default function Menus() {
  const queryClient = useQueryClient()
  const [menuParent, setMenuParent] = useState("-1")
  const localStorageData = JSON.parse(localStorage.getItem('user'))
  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      href: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // Get Menus From Server
  const { data: menus } = useQuery("menus", () => {
    return fetch(`http://localhost:4000/v1/menus/all`).then(res => res.json())
  })

  // Delete Menu From Server
  const { mutate: deleteMenuHandler } = useMutation("menus", (menuID) => {
    return fetch(`http://localhost:4000/v1/menus/${menuID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      }
    })
      .then((res) => {
        if (res.ok) {
          swal({
            title: 'منو موردنظر با موفقیت حذف شد!',
            icon: 'success',
            buttons: 'باشه',
          })
        } else {
          swal({
            title: 'حذف دوره با مشکل مواجه شد!',
            icon: 'error',
            buttons: 'باشه',
          })
        }
      })
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["menus"])
      }
    }
  )
  // Post Menu To Server
  const { mutate: postMenu } = useMutation("menus", (newMenuInfo) => {
    return fetch(`http://localhost:4000/v1/menus/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify(newMenuInfo)
    })
      .then(res => {
        if (res.ok) {
          swal({
            title: 'دوره جدید با موفقیت اضافه شد!',
            icon: 'success',
            buttons: 'باشه'
          })
        }
      })
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["menus"])
      }
    }
  )


  const deleteMenu = (event, menuID) => {
    event.preventDefault()
    swal({
      title: 'آیا میخواهید این منو را حذف کنید؟',
      icon: 'warning',
      buttons: ['خیر', 'بله']
    })
      .then((result) => {
        if (result) {
          deleteMenuHandler(menuID)
        }
      })
  }


  const createMenu = () => {
    const newMenuInfo = {
      title: formState.inputs.title.value,
      href: formState.inputs.href.value,
      parent: menuParent === '-1' ? undefined : menuParent,
    }

    postMenu(newMenuInfo)

  }

  return (
    <DataTable title={'منو ها'}>
      <div className="add-course">
        <div className="add-category__top">
          <h1 className="add-category__top__title">افزودن منو جدید:</h1>
        </div>
        <div className="add-category__inputs">
          <div className="add-category__input__wrapper">
            <FormInput
              label={"نام منو"}
              type="text"
              id='title'
              className="form-input__input"
              placeholder='لطفا عنوان را وارد کنید...'
              onInputHandler={onInputHandler}
              validations={[
                requiredValidator(),
                minValidator(5),
              ]}
            />
          </div>
          <div className="add-category__input__wrapper">
            <FormInput
              label={"لینک"}
              type="text"
              id='href'
              className="form-input__input"
              placeholder='لطفا href را وارد کنید...'
              onInputHandler={onInputHandler}
              validations={[
                requiredValidator(),
                minValidator(5),
              ]}
            />
          </div>
          <div className="add-category__input__wrapper">
            <div className="add-course__select-box__wrapper">
              <label className='add-course__select-box__title'>انتخاب دسته بندی</label>
              <select className='add-course__select-box' onChange={(event) => setMenuParent(event.target.value)}>
                <option value="-1">دسته بندی را انتخاب کنید</option>
                {
                  menus?.map(menu => (
                    <>
                      {
                        !Boolean(menu.parent) && <option value={menu._id} key={menu._id}>{menu.title}</option>
                      }
                    </>
                  ))
                }
              </select>
            </div>
          </div>
        </div>
        <div className="add-category__input__button__wrapper">
          <FormButton
            className={`login__form__submit ${(formState.isFormValid)
              ? "login__form__submit"
              : "login__form__submit--error"
              }`}
            type="submit"
            onClick={createMenu}
            disabled={!formState.isFormValid}
          >
            افزودن
          </FormButton>
        </div>
      </div>
      <div className="admin-courses__table__wrapper">
        <table className='admin-courses__table'>
          <thead className="admin-courses__table-header">
            <tr>
              <th className='admin-courses__table__th rounded-start'>شناسه</th>
              <th className='admin-courses__table__th'>عنوان</th>
              <th className='admin-courses__table__th'>مقصد</th>
              <th className='admin-courses__table__th'>فرزند...</th>
              <th className='admin-courses__table__th'>ویرایش</th>
              <th className='admin-courses__table__th rounded-end'>حذف</th>
            </tr>
          </thead>
          <tbody className='admin-courses__table-body'>
            {
              menus?.map((menu, index) => (
                !Boolean(menu.parent) &&
                <tr className='admin-courses__table__tr'>
                  <th className='admin-courses__table__th'>{index + 1}</th>
                  <th className='admin-courses__table__th item-width font-weight-item'>{menu.title}</th>
                  <th className='admin-courses__table__th item-width'>{menu.href}</th>
                  <th className='admin-courses__table__th'>
                    {
                      menu.parent ? menu.parent.title : (<AiFillCheckCircle className='answer' />)
                    }
                  </th>
                  <th className='admin-courses__table__th'>
                    <LiaEditSolid className='edit-btn' />
                  </th>
                  <th className='admin-courses__table__th'>
                    <AiFillDelete className='delete-btn' onClick={(event) => deleteMenu(event, menu._id)} />
                  </th>
                </tr>
              ))
            }
            {
              menus?.map((menu, index) => (
                Boolean(menu.parent) &&
                <tr className='admin-courses__table__tr'>
                  <th className='admin-courses__table__th'>{index + 1}</th>
                  <th className='admin-courses__table__th item-width font-weight-item'>{menu.title}</th>
                  <th className='admin-courses__table__th item-width'>{menu.href}</th>
                  <th className='admin-courses__table__th'>
                    {menu.parent.title}
                  </th>
                  <th className='admin-courses__table__th'>
                    <LiaEditSolid className='edit-btn' />
                  </th>
                  <th className='admin-courses__table__th'>
                    <AiFillDelete className='delete-btn' onClick={(event) => deleteMenu(event, menu._id)} />
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
