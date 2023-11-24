import React, { useEffect, useState } from 'react'
import './AdminCourses.css'
import DataTable from '../DataTable/DataTable'
import AdminCoursesCounter from '../../../Components/AdminCoursesCounter/AdminCoursesCounter'
import swal from 'sweetalert'
import FormInput from '../../../Components/FormInput/FormInput'
import FormButton from '../../../Components/FormInput/FormButton'
import { useForm } from "../../../Hooks/useForm";
import {
  requiredValidator,
  minValidator,
  maxValidator,
} from "../../../Validators/Rules";
import { LiaEditSolid } from 'react-icons/lia'
import { AiFillDelete } from 'react-icons/ai'
import useCourses from '../../../Hooks/useCourses'
import { useCategories } from '../../../Hooks/useCategories'
import { useMutation, useQueryClient } from 'react-query'

export default function AdminCourses() {

  const [courseCategory, setCourseCategory] = useState("-1")
  const [courseStatus, setCourseStatus] = useState("start")
  const [courseCover, setCourseCover] = useState({})
  const queryClient = useQueryClient()
  const localStorageData = JSON.parse(localStorage.getItem("user"))
  
  // Get Courses From Server
  const { data: courses } = useCourses()
  
  // Get Categories From Server
  const { data: categories } = useCategories()
  
  // Delete Course From Server
  const { mutate: deleteCourseHandler } = useMutation((courseID) => {
    return fetch(`http://localhost:4000/v1/courses/${courseID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      }
    }).then((res) => {
      if (res.ok) {
        swal({
          title: 'دوره موردنظر با موفقیت حذف شد!',
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
        queryClient.invalidateQueries(["courses"])
      }
    }
  )

  // Post Course To Server
  const { mutate: postCourse } = useMutation((formData) => {
    return fetch(`http://localhost:4000/v1/courses`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      },
      body: formData,
    })
    .then((res) => {
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
      queryClient.invalidateQueries(["courses"])
      }
    }
    )
    
    // Box Contents
    const AllCourses = courses?.length
    const completeCourses = courses?.filter(course => course.isComplete === 0)?.length
    const notCompleteCourses = courses?.filter(course => course.isComplete !== 0)?.length
    
    
    const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
      shortName: {
        value: "",
        isValid: false,
      },
      price: {
        value: "",
        isValid: false,
      },
    },
    false
  );



  const deleteCourse = (event, courseID) => {
    event.preventDefault()
    swal({
      title: 'آیا میخواهید این دوره را حذف کنید؟',
      icon: 'warning',
      buttons: ['خیر', 'بله']
    })
      .then((result) => {
        if (result) {
          deleteCourseHandler(courseID)
        }
      })
  }

  const selectCategory = (event) => {
    setCourseCategory(event.target.value)
  }

  const addCourse = () => {
    let formData = new FormData()

    formData.append('name', formState.inputs.name.value)
    formData.append('description', formState.inputs.description.value)
    formData.append('shortName', formState.inputs.shortName.value)
    formData.append('cover', courseCover)
    formData.append('price', formState.inputs.price.value)
    formData.append('status', courseStatus)
    formData.append('categoryID', courseCategory)

    if (courseCategory === "-1") {
      swal({
        title: 'لطفا دسته بندی دوره را انتخاب کنید.',
        icon: 'error',
        buttons: 'باشه'
      })
    } else {
      postCourse(formData)
    }
  }


  return (
    <>

      <DataTable title={'دوره ها'}>
        <div className="add-course">
          <div className="admin-courses__counter-boxes">
            <AdminCoursesCounter title={'دوره ها'} count={AllCourses} />
            <AdminCoursesCounter title={'دوره های فعال'} count={completeCourses} />
            <AdminCoursesCounter title={'درحال ضبط'} count={notCompleteCourses} />
          </div>
          <div className="add-category__top">
            <h1 className="add-category__top__title">افزودن دوره جدید:</h1>
          </div>
          <div className="add-category__inputs">
            <div className="add-category__input__wrapper">
              <FormInput
                label={"نام دوره"}
                type="text"
                id='name'
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
                id='shortName'
                className="form-input__input"
                placeholder='لطفا URl را وارد کنید...'
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(5),
                ]}
              />
            </div>
            <div className="add-category__input__wrapper">
              <FormInput
                label={"قیمت"}
                type="number"
                id='price'
                className="form-input__input"
                placeholder='لطفا قیمت را وارد کنید...'
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(1),
                ]}
              />
            </div>
            <div className="add-category__input__wrapper">
              <FormInput
                label={"توضیحات"}
                type="textArea"
                id='description'
                className="form-input__text-area"
                placeholder='لطفا توضیحات را وارد کنید...'
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
                <select className='add-course__select-box' onChange={selectCategory}>
                  <option value="-1">دسته بندی را انتخاب کنید</option>
                  {
                    categories?.map(category => (
                      <option value={category._id} key={category._id}>{category.title}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="add-category__input__wrapper">
              <div className="add-course__input-radios__wrapper">
                <label className='add-course__input-radio__title'>وضعیت دوره:</label>
                <div class="add-course__input-radio__wrapper">
                  <input id="option1" name="radio-group" value="start" type="radio" onInput={event => setCourseStatus(event.target.value)} checked />
                  <span class="add-course__input-radio__label">درحال برگزاری</span>
                </div>
                <div class="add-course__input-radio__wrapper">
                  <input id="option2" name="radio-group" value="presell" type="radio" onInput={event => setCourseStatus(event.target.value)} />
                  <span class="add-course__input-radio__label">پیش فروش</span>
                </div>
              </div>
            </div>
            <div className="add-category__input__wrapper">
              <div className="add-course__upload-image">
                <input className="add-course__upload-image__input" name="file" type="file" onChange={event => setCourseCover(event.target.files[0])} />
                <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" stroke-linejoin="round" stroke-linecap="round" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" className="add-course__upload-image__icon"><polyline points="16 16 12 12 8 16"></polyline><line y2="21" x2="12" y1="12" x1="12"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>
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
              onClick={addCourse}
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
                  <th className='admin-courses__table__th'>نام دوره</th>
                  <th className='admin-courses__table__th'>نام مدرس</th>
                  <th className='admin-courses__table__th'>تاریخ انتشار</th>
                  <th className='admin-courses__table__th'>قیمت</th>
                  <th className='admin-courses__table__th'>لینک</th>
                  <th className='admin-courses__table__th'>دسته بندی</th>
                  <th className='admin-courses__table__th'>ویرایش</th>
                  <th className='admin-courses__table__th rounded-end'>حذف</th>
                </tr>
              </thead>
              <tbody className='admin-courses__table-body'>
                {
                  courses?.map((course, index) => (
                    <tr className='admin-courses__table__tr'>
                      <th className='admin-courses__table__th'>{index + 1}</th>
                      <th className='admin-courses__table__th item-width font-weight-item'>{course.name}</th>
                      <th className='admin-courses__table__th item-width'>{course.creator}</th>
                      <th className='admin-courses__table__th item-width'>{course.createdAt.slice(0, 10)}</th>
                      <th className='admin-courses__table__th'>{course.price === 0 ? "رایگان" : course.price.toLocaleString()}</th>
                      <th className='admin-courses__table__th item-width'>{course.shortName}</th>
                      <th className='admin-courses__table__th item-width'>
                        <h1 className='category-style'>{course.categoryID.title}</h1>
                      </th>
                      <th className='admin-courses__table__th'>
                        <LiaEditSolid className='edit-btn' />
                      </th>
                      <th className='admin-courses__table__th'>
                        <AiFillDelete className='delete-btn' onClick={(event) => deleteCourse(event, course._id)} />
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
