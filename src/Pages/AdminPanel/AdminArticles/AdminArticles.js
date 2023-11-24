import React, { useEffect, useState } from 'react'
import './AdminArticles.css'
import DataTable from '../DataTable/DataTable'
import swal from 'sweetalert'
import FormInput from '../../../Components/FormInput/FormInput'
import FormButton from '../../../Components/FormInput/FormButton'
import { useForm } from "../../../Hooks/useForm";
import {
  requiredValidator,
  minValidator,
} from "../../../Validators/Rules";
import FormEditor from '../../../Components/FormInput/FormEditor'
import { LiaEditSolid } from 'react-icons/lia'
import { AiFillCheckCircle, AiFillDelete } from 'react-icons/ai'
import { TbWriting } from 'react-icons/tb'
import { Link } from 'react-router-dom'
import { useCategories } from '../../../Hooks/useCategories'
import { useMutation, useQuery, useQueryClient } from 'react-query'
export default function AdminArticles() {

  const [articleCategory, setArticleCategory] = useState("-1")
  const [articleCover, setArticleCover] = useState({})
  const [articleBody, setArticleBody] = useState("")
  const localStorageData = JSON.parse(localStorage.getItem('user'))
  const queryClient = useQueryClient()
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
      description: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // Get Categories From Server
  const { data: categories } = useCategories()

  // Get Articles With Authorization From Server
  const { data: articles } = useQuery("adminArticles", () => {
    return fetch(`http://localhost:4000/v1/articles`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      }
    })
      .then(res => res.json())
  })

  // Delete article From Server
  const { mutate: deleteArticleHandler } = useMutation((articleID) => {
    return fetch(`http://localhost:4000/v1/articles/${articleID}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      }
    }).then(res => {
      if (res.ok) {
        swal({
          title: "مقاله موردنظر با موفقیت حذف شد!",
          icon: 'success',
          buttons: "باشه"
        })
      } else {
        swal({
          title: 'حذف مقاله با مشکل مواجه شد!',
          icon: 'error',
          buttons: 'باشه',
        })
      }
    })
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["adminArticles"])
      }
    }
  )

  const deleteArticle = (event, articleID) => {
    event.preventDefault()
    swal({
      title: 'آیا میخواهید این مقاله را حذف کنید؟',
      buttons: ["خیر", "بله"]
    }).then(result => {
      if (result) {
        deleteArticleHandler(articleID)
      }
    })
  }

  // Post article To Server
  const { mutate: postArticle } = useMutation((formData) => {
    return fetch(`http://localhost:4000/v1/articles`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      },
      body: formData
    }).then(res => {
      if (res.ok) {
        swal({
          title: "مقاله جدید با موفقیت ایجاد شد.",
          icon: "success",
          buttons: "باشه",
        })
      } else {
        swal({
          title: "افزودن مقاله جدید با مشکل مواجه شد!",
          text: 'لطفا اطلاعات را به درستی وارد کنید.',
          icon: "error",
          buttons: "باشه",
        })
      }
    })
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["adminArticles"])
      }
    }
  )

  const addArticle = () => {
    let formData = new FormData()

    formData.append('cover', articleCover)
    formData.append('title', formState.inputs.title.value)
    formData.append('description', formState.inputs.description.value)
    formData.append('body', articleBody)
    formData.append('shortName', formState.inputs.shortName.value)
    formData.append('categoryID', articleCategory)


    if (articleCategory === "-1") {
      swal({
        title: 'لطفا دسته بندی مقاله را انتخاب کنید.',
        icon: 'error',
        buttons: 'باشه'
      })
    } else {
      postArticle(formData)
    }
  }

  // Save Article As Draft
  const { mutate: saveArticle } = useMutation((formData) => {
    return fetch(`http://localhost:4000/v1/articles/draft`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      },
      body: formData
    }).then(res => {
      if (res.ok) {
        swal({
          title: "مقاله با موفقیت پیش نویس شد.",
          icon: "success",
          buttons: "باشه",
        })
      } else {
        swal({
          title: "پیش نویس مقاله با مشکل مواجه شد!",
          text: 'لطفا اطلاعات را به درستی وارد کنید.',
          icon: "error",
          buttons: "باشه",
        })
      }
    })
  },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["adminArticles"])
      }
    }
  )

  const saveArticleAsDraft = () => {

    let formData = new FormData()
    formData.append('cover', articleCover)
    formData.append('title', formState.inputs.title.value)
    formData.append('description', formState.inputs.description.value)
    formData.append('body', articleBody)
    formData.append('shortName', formState.inputs.shortName.value)
    formData.append('categoryID', articleCategory)


    if (articleCategory === "-1") {
      swal({
        title: 'لطفا دسته بندی مقاله را انتخاب کنید.',
        icon: 'error',
        buttons: 'باشه'
      })
    } else {
      saveArticle(formData)
    }
  }

  const selectCategory = (event) => {
    setArticleCategory(event.target.value)
  }

  return (
    <DataTable title={'مقالات'}>
      <div className="add-course">
        <div className="add-category__top">
          <h1 className="add-category__top__title">افزودن مقاله جدید:</h1>
        </div>
        <div className="add-category__inputs">
          <div className="add-category__input__wrapper">
            <FormInput
              label={"نام مقاله"}
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
            <div className="add-course__select-box__wrapper">
              <label className='add-course__select-box__title'>انتخاب دسته بندی</label>
              <select className='add-course__select-box' onChange={selectCategory}>
                <option value="-1">دسته بندی را انتخاب کنید</option>
                {
                  categories?.map(category => (
                    <option value={category._id}>{category.title}</option>
                  ))
                }
              </select>
            </div>
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
            <div className="add-course__upload-image">
              <input className="add-course__upload-image__input" name="file" type="file" onChange={event => setArticleCover(event.target.files[0])} />
              <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" stroke-linejoin="round" stroke-linecap="round" viewBox="0 0 24 24" stroke-width="2" fill="none" stroke="currentColor" className="add-course__upload-image__icon"><polyline points="16 16 12 12 8 16"></polyline><line y2="21" x2="12" y1="12" x1="12"></line><path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"></path><polyline points="16 16 12 12 8 16"></polyline></svg>
            </div>
          </div>
        </div>
        <div className="editor__wrapper">
          <FormEditor
            value={articleBody}
            setValue={setArticleBody}
          />
        </div>
        <div className="add-category__input__button__wrapper">
          <FormButton
            className={`login__form__submit ${(formState.isFormValid)
              ? "login__form__submit"
              : "login__form__submit--error"
              }`}
            type="submit"
            onClick={addArticle}
            disabled={!formState.isFormValid}
          >
            افزودن
          </FormButton>
          <FormButton
            className={`login__form__submit ${(formState.isFormValid)
              ? "login__form__submit"
              : "login__form__submit--error"
              }`}
            type="submit"
            onClick={saveArticleAsDraft}
            disabled={!formState.isFormValid}
          >
            پیش نویس
          </FormButton>
        </div>
      </div>
      <div className="admin-courses__table__wrapper">
        <table className='admin-courses__table'>
          <thead className="admin-courses__table-header">
            <tr>
              <th className='admin-courses__table__th rounded-start'>شناسه</th>
              <th className='admin-courses__table__th'>نام مقاله</th>
              <th className='admin-courses__table__th'>نویسنده</th>
              <th className='admin-courses__table__th'>لینک</th>
              <th className='admin-courses__table__th'>وضعیت</th>
              <th className='admin-courses__table__th'>ادامه نوشتن</th>
              <th className='admin-courses__table__th'>ویرایش</th>
              <th className='admin-courses__table__th rounded-end'>حذف</th>
            </tr>
          </thead>
          <tbody className='admin-courses__table-body'>
            {
              articles?.map((article, index) => (
                <tr className='admin-courses__table__tr'>
                  <th className='admin-courses__table__th'>{index + 1}</th>
                  <th className='admin-courses__table__th item-width font-weight-item'>{article.title}</th>
                  <th className='admin-courses__table__th item-width font-weight-item'>{article.creator.name}</th>
                  <th className='admin-courses__table__th item-width'>{article.shortName}</th>
                  <th className='admin-courses__table__th item-width'>{article.publish === 1 ? 'منتشر شده' : 'پیش نویس'}</th>
                  <th className='admin-courses__table__th'>
                    {
                      article.publish === 1 ?
                        (<AiFillCheckCircle className='answer' />)
                        :
                        (
                          <Link to={`draft/${article.shortName}`}>
                            <TbWriting className='answer-btn' />
                          </Link>
                        )
                    }

                  </th>
                  <th className='admin-courses__table__th'>
                    <LiaEditSolid className='edit-btn' />
                  </th>
                  <th className='admin-courses__table__th'>
                    <AiFillDelete className='delete-btn' onClick={(event) => deleteArticle(event, article._id)} />
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
