import React, { useState } from 'react'
import './Offs.css'
import FormInput from '../../../Components/FormInput/FormInput'
import FormButton from '../../../Components/FormInput/FormButton'
import { useForm } from "../../../Hooks/useForm";
import {
  requiredValidator,
  minValidator,
} from "../../../Validators/Rules";
import DataTable from '../DataTable/DataTable';
import swal from 'sweetalert';
import { AiFillDelete } from 'react-icons/ai';
import useCourses from '../../../Hooks/useCourses';
import { useMutation, useQuery, useQueryClient } from 'react-query';
export default function Offs() {

  const [offCourse, setOffCourse] = useState('-1')
  const localStorageData = JSON.parse(localStorage.getItem("user"))
  const queryClient = useQueryClient()
  const [formState, onInputHandler] = useForm(
    {
      code: {
        value: "",
        isValid: false,
      },
      percent: {
        value: "",
        isValid: false,
      },
      max: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // Get Courses From Server
  const { data: allCourses } = useCourses()

  // Get Offs From Server
  const { data: offs } = useQuery("offs", () => {
    return fetch(`http://localhost:4000/v1/offs`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      },
    }).then(res => res.json())
  })

  // Create New Off
  const { mutate: createOffHandler } = useMutation((newOffInfo) => {
    return fetch(`http://localhost:4000/v1/offs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorageData.token}`
      },
      body: JSON.stringify(newOffInfo)
    })
      .then(res => {
        if (res.ok) {
          swal({
            title: 'کد تخفیف با موفقیت اضافه شد!',
            icon: 'success',
            buttons: 'باشه'
          })
        }
      })
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["offs"])
      }
    })
  const createOff = () => {
    const newOffInfo = {
      code: formState.inputs.code.value,
      percent: formState.inputs.percent.value,
      course: offCourse,
      max: formState.inputs.max.value,
    }
    if (offCourse === "-1") {
      swal({
        title: 'لطفا دسته بندی دوره را انتخاب کنید.',
        icon: 'error',
        buttons: 'باشه'
      })
    } else {
      createOffHandler(newOffInfo)
    }
  }


  // Delete Off From Server
  const { mutate: deleteOffHandler } = useMutation((offID) => {
    return fetch(`http://localhost:4000/v1/offs/${offID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      }
    })
      .then((res) => {
        if (res.ok) {
          swal({
            title: 'کد تخفیف موردنظر با موفقیت حذف شد!',
            icon: 'success',
            buttons: 'باشه',
          })
        } else {
          swal({
            title: 'حذف کد تخفیف با مشکل مواجه شد!',
            icon: 'error',
            buttons: 'باشه',
          })
        }
      })
  },
  {
    onSuccess: () => {
      queryClient.invalidateQueries(['offs'])
    }
  })
  const deleteOff = (offID) => {

    swal({
      title: 'آیا میخواهید این کد تخفیف را حذف کنید؟',
      icon: 'warning',
      buttons: ['خیر', 'بله']
    })
      .then((result) => {
        if (result) {
          deleteOffHandler(offID)
        }
      })
  }


  return (
    <>
      <DataTable title={'کدهای تخفیف'}>
        <div className="add-course">
          <div className="add-category__top">
            <h1 className="add-category__top__title">افزودن کد تخفیف جدید:</h1>
          </div>
          <div className="add-category__inputs">
            <div className="add-category__input__wrapper">
              <FormInput
                label={"کد تخفیف"}
                type="text"
                id='code'
                className="form-input__input"
                placeholder='لطفا کد تخفیف را وارد کنید...'
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                  minValidator(5),
                ]}
              />
            </div>
            <div className="add-category__input__wrapper">
              <FormInput
                label={"درصد تخفیف "}
                type="number"
                id='percent'
                className="form-input__input"
                placeholder='لطفا درصد تخفیف را وارد کنید...'
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                ]}
              />
            </div>
            <div className="add-category__input__wrapper">
              <FormInput
                label={"حداکثر استفاده"}
                type="number"
                id='max'
                className="form-input__input"
                placeholder='حداکثر استفاده از کد تخفیف...'
                onInputHandler={onInputHandler}
                validations={[
                  requiredValidator(),
                ]}
              />
            </div>
            <div className="add-category__input__wrapper">
              <div className="add-course__select-box__wrapper">
                <label className='add-course__select-box__title'>انتخاب دوره</label>
                <select className='add-course__select-box' onChange={(event => setOffCourse(event.target.value))}>
                  <option value="-1">دوره را انتخاب کنید</option>
                  {
                    allCourses?.map(course => (
                      <option value={course._id} key={course._id}>{course.name}</option>
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
              onClick={createOff}
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
                <th className='admin-courses__table__th'>کد</th>
                <th className='admin-courses__table__th'>درصد</th>
                <th className='admin-courses__table__th'>حداکثر استفاده</th>
                <th className='admin-courses__table__th'>دفعات استفاده</th>
                <th className='admin-courses__table__th'>سازنده</th>
                <th className='admin-courses__table__th rounded-end'>حذف</th>
              </tr>
            </thead>
            <tbody className='admin-courses__table-body'>
              {
                offs?.map((off, index) => (
                  <tr className='admin-courses__table__tr' key={off._id}>
                    <th className='admin-courses__table__th'>{index + 1}</th>
                    <th className='admin-courses__table__th item-width font-weight-item'>{off.code}</th>
                    <th className='admin-courses__table__th item-width'>{off.percent}</th>
                    <th className='admin-courses__table__th item-width'>{off.max}</th>
                    <th className='admin-courses__table__th item-width'>{off.uses}</th>
                    <th className='admin-courses__table__th item-width'>{off.creator}</th>
                    <th className='admin-courses__table__th'>
                      <AiFillDelete className='delete-btn' onClick={() => deleteOff(off._id)} />
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
