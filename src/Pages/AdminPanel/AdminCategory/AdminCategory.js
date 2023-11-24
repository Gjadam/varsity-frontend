import React, { useEffect, useState } from 'react'
import './AdminCategory.css'
import DataTable from '../DataTable/DataTable'
import FormInput from '../../../Components/FormInput/FormInput'
import FormButton from '../../../Components/FormInput/FormButton'
import { useForm } from "../../../Hooks/useForm";
import {
  requiredValidator,
  minValidator,
  maxValidator,
} from "../../../Validators/Rules";
import swal from 'sweetalert'
import { LiaEditSolid } from 'react-icons/lia'
import { AiFillDelete } from 'react-icons/ai'
import { useCategories } from '../../../Hooks/useCategories'
import { useMutation, useQueryClient } from 'react-query'
export default function AdminCategory() {

  const queryClient = useQueryClient()
  const localStorageData = JSON.parse(localStorage.getItem('user'))

  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      shortName: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // Get Categories From Server
  const { data: categories } = useCategories()

  // Create New Category
  const { mutate: createNewCategoryHandler } = useMutation((newCategoryInfo) => {
    return fetch(`http://localhost:4000/v1/category`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`
      },
      body: JSON.stringify(newCategoryInfo)
    })
      .then(res => res.json())
      .then(() => {
        swal({
          title: 'دسته بندی جدید اضافه شد!',
          icon: 'success',
          buttons: 'باشه'
        })

      })
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["categories"])
      }
    })
  const createNewCategory = () => {
    const newCategoryInfo = {
      title: formState.inputs.title.value,
      name: formState.inputs.shortName.value,
    }

    createNewCategoryHandler(newCategoryInfo)
  }

  // Delete Category From Server
  const { mutate: deleteCategoryHandler } = useMutation((categoryID) => {
    return fetch(`http://localhost:4000/v1/category/${categoryID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      }
    })
      .then(() => {
        swal({
          title: "دسته بندی با موفقیت حذف شد!",
          icon: "success",
          buttons: "باشه"
        })
      })
  }, {
    onSuccess: () => {
      queryClient.invalidateQueries(['categories'])
    }
  })
  const deleteCategory = (event, categoryID) => {
    event.preventDefault()

    swal({
      title: 'آیا میخواهید دسته بندی را حذف کنید؟',
      icon: "warning",
      buttons: ["خیر ", "بله"],
    })
      .then((result) => {
        if (result) {

          deleteCategoryHandler(categoryID)
        }
      })
  }

  // Update Category
  const { mutate: updateCategoryHandler } = useMutation((updateCategoryInfos) => {
    return fetch(`http://localhost:4000/v1/category/${updateCategoryInfos.categoryID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`,
      },
      body: JSON.stringify({
        title: updateCategoryInfos.titleResult,
        name: updateCategoryInfos.nameResult,
      })
    })
      .then(() => {
        swal({
          title: "دسته بندی با موفقیت ویرایش شد!",
          icon: "success",
          buttons: "باشه"
        })
      })
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries(["categories"])
    }
  })
  const updateCategory = (event, categoryID) => {
    event.preventDefault()
    swal({
      title: 'عنوان جدید دسته بندی را وارد کنید',
      content: "input",
      buttons: 'ثبت عنوان جدید',
    }).then((titleResult) => {
      if (titleResult) {
        swal({
          title: 'نام کوتاه جدید دسته بندی را وارد کنید',
          content: "input",
          buttons: 'ثبت عنوان جدید',
        }).then((nameResult) => {
          if (nameResult) {
            const updateCategoryInfos = {
              categoryID,
              titleResult,
              nameResult,
            }
            updateCategoryHandler(updateCategoryInfos)
          }
        })
      }
    })
  }


  return (
    <>

      <DataTable title={'دسته بندی ها'}>
        <div className="add-category">
          <div className="add-category__top">
            <h1 className="add-category__top__title">افزودن دسته بندی جدید:</h1>
          </div>
          <div className="add-category__inputs">
            <div className="add-category__input__wrapper">
              <FormInput
                label={"عنوان"}
                type="text"
                id='title'
                className="form-input__input"
                placeholder='لطفا عنوان را وارد کنید...'
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(30),
                ]}
              />
            </div>
            <div className="add-category__input__wrapper">
              <FormInput
                label={"نام کوتاه"}
                type="text"
                id='shortName'
                className="form-input__input"
                placeholder='لطفا نام کوتاه را وارد کنید...'
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(20),
                ]}
              />

            </div>
          </div>
          <div className="add-category__input__button__wrapper">
            <FormButton
              className={`login__form__submit ${(formState.isFormValid)
                ? "login__form__submit"
                : "login__form__submit--error"
                }`}
              type="submit"
              onClick={createNewCategory}
              disabled={!formState.isFormValid}
            >
              افزودن
            </FormButton>
          </div>
        </div>
        <div className="admin-courses">
          <div className="admin-courses__table__wrapper">
            <table className='admin-courses__table'>
              <thead className="admin-courses__table-header">
                <tr>
                  <th className='admin-courses__table__th rounded-start'>شناسه</th>
                  <th className='admin-courses__table__th'>دسته بندی</th>
                  <th className='admin-courses__table__th'>ویرایش</th>
                  <th className='admin-courses__table__th rounded-end'>حذف</th>
                </tr>
              </thead>
              <tbody className='admin-courses__table-body'>
                {
                  categories?.map((category, index) => (
                    <tr className='admin-courses__table__tr'>
                      <th className='admin-courses__table__th'>{index + 1}</th>
                      <th className='admin-courses__table__th item-width'>
                        <h1 className='category-style'>{category.title}</h1>
                      </th>
                      <th className='admin-courses__table__th'>
                        <LiaEditSolid className='edit-btn' onClick={(event) => updateCategory(event, category._id)} />
                      </th>
                      <th className='admin-courses__table__th'>
                        <AiFillDelete className='delete-btn' onClick={(event) => deleteCategory(event, category._id)} />
                      </th>
                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </DataTable>
    </>
  )
}
