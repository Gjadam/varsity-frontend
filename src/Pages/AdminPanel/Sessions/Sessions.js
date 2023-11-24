import React, { useEffect, useState } from 'react'
import './Sessions.css'
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
import { AiFillDelete } from 'react-icons/ai'
import useCourses from '../../../Hooks/useCourses'
import { useMutation, useQuery, useQueryClient } from 'react-query'
export default function Sessions() {

  const [sessionCourse, setSessionCourse] = useState("-1")
  const [isSessionFree, setIsSessionFree] = useState(0)
  const [sessionVideo, setSessionVideo] = useState({})

  const queryClient = useQueryClient()
  const localStorageData = JSON.parse(localStorage.getItem('user'))

  const [formState, onInputHandler] = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      time: {
        value: "",
        isValid: false,
      },

    },
    false
  );

  // Get Courses From Server
  const { data: courses } = useCourses()

  // Get Sessions From Server
  const { data: sessions } = useQuery("sessions", () => fetch(`http://localhost:4000/v1/courses/sessions`).then((res) => res.json()))

  // Post Session To Server
  const { mutate: postSession } = useMutation((formData) => {
    return fetch(`http://localhost:4000/v1/courses/${sessionCourse}/sessions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      },
      body: formData,
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
        queryClient.invalidateQueries(["sessions"])
      }
    }
  )

  // Delete Session From Server
  const { mutate: deleteSessionHandler } = useMutation((sessionID) => {
    return fetch(`http://localhost:4000/v1/courses/sessions/${sessionID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      }
    })
      .then((res) => {
        if (res.ok) {
          swal({
            title: 'جلسه موردنظر با موفقیت حذف شد!',
            icon: 'success',
            buttons: 'باشه',
          })
        } else {
          swal({
            title: 'حذف جلسه با مشکل مواجه شد!',
            icon: 'error',
            buttons: 'باشه',
          })
        }
      })
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["sessions"])
      }
    }
  )

  const addSession = () => {
    let formData = new FormData()
    formData.append('video', sessionVideo)
    formData.append('title', formState.inputs.title.value)
    formData.append('time', formState.inputs.time.value)
    formData.append('free', isSessionFree)

    if (sessionCourse === '-1') {
      swal({
        title: 'لطفا دسته بندی جلسه را انتخاب کنید.',
        icon: 'error',
        buttons: 'باشه'
      })
    } else {
      postSession(formData)
    }
  }

  const deleteSession = (event, sessionID) => {
    event.preventDefault()
    const localStorageData = JSON.parse(localStorage.getItem('user'))

    swal({
      title: 'آیا میخواهید این جلسه را حذف کنید؟',
      icon: 'warning',
      buttons: ['خیر', 'بله']
    })
      .then((result) => {
        if (result) {
          deleteSessionHandler(sessionID)
        }
      })
  }

  return (
    <>
      <DataTable title={'جلسات'}>
        <div className="add-course">
          <div className="add-category__top">
            <h1 className="add-category__top__title">افزودن جلسه جدید:</h1>
          </div>
          <div className="add-category__inputs">
            <div className="add-category__input__wrapper">
              <FormInput
                label={"نام جلسه"}
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
                label={"مدت زمان"}
                type="text"
                id='time'
                className="form-input__input"
                placeholder='لطفا زمان جلسه را وارد کنید...'
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(5),
                  maxValidator(8),
                ]}
              />
            </div>
            <div className="add-category__input__wrapper">
              <div className="add-course__select-box__wrapper">
                <label className='add-course__select-box__title'>انتخاب دوره</label>
                <select className='add-course__select-box' onChange={(event => setSessionCourse(event.target.value))}>
                  <option value="-1">دوره را انتخاب کنید</option>
                  {
                    courses?.map(course => (
                      <option value={course._id} key={course._id}>{course.name}</option>
                    ))
                  }
                </select>
              </div>
            </div>
            <div className="add-category__input__wrapper">
              <div className="add-course__input-radios__wrapper">
                <label className='add-course__input-radio__title'>وضعیت دوره:</label>
                <div class="add-course__input-radio__wrapper">
                  <input id="option1" name="radio-group" value="1" type="radio" onInput={event => setIsSessionFree(event.target.value)} />
                  <span class="add-course__input-radio__label">رایگان</span>
                </div>
                <div class="add-course__input-radio__wrapper">
                  <input id="option2" name="radio-group" value="0" type="radio" onInput={event => setIsSessionFree(event.target.value)} checked />
                  <span class="add-course__input-radio__label">نقدی</span>
                </div>
              </div>
            </div>
            <div className="add-category__input__wrapper">
              <div className="add-course__upload-image">
                <input className="add-course__upload-image__input" name="file" type="file" onChange={event => setSessionVideo(event.target.files[0])} />
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
              onClick={addSession}
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
                <th className='admin-courses__table__th'>نام جلسه</th>
                <th className='admin-courses__table__th'>مدت زمان</th>
                <th className='admin-courses__table__th'>دوره</th>
                <th className='admin-courses__table__th rounded-end'>حذف</th>
              </tr>
            </thead>
            <tbody className='admin-courses__table-body'>
              {
                sessions?.map((session, index) => (
                  <tr className='admin-courses__table__tr'>
                    <th className='admin-courses__table__th'>{index + 1}</th>
                    <th className='admin-courses__table__th item-width font-weight-item'>{session.title}</th>
                    <th className='admin-courses__table__th item-width'>{session.time}</th>
                    <th className='admin-courses__table__th item-width'>
                      <h1 className='category-style'>{session.course.name}</h1>
                    </th>
                    <th className='admin-courses__table__th'>
                      <AiFillDelete className='delete-btn' onClick={(event) => deleteSession(event, session._id)} />
                    </th>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      </DataTable>
    </>
  )
}
