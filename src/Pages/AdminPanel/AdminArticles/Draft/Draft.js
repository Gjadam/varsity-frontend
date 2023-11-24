import React, { useEffect, useState } from 'react'
import DataTable from '../../DataTable/DataTable'
import FormEditor from '../../../../Components/FormInput/FormEditor'
import { useNavigate, useParams } from 'react-router-dom'
import swal from 'sweetalert'

export default function Draft() {

    const [article, setArticle] = useState({})
    const [articleCover, setArticleCover] = useState({})
    const [articleTitle, setArticleTitle] = useState("")
    const [articleBody, setArticleBody] = useState("")
    const [articleDescription, setArticleDescription] = useState("")
    const [articleCategory, setArticleCategory] = useState("")
    const { shortName } = useParams()
    const navigate = useNavigate()
    useEffect(() => {
        const localStorageData = JSON.parse(localStorage.getItem("user"))
        fetch(`http://localhost:4000/v1/articles/${shortName}`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorageData.token
            }
        })
            .then(res => res.json())
            .then(articleInfo => {
                setArticle(articleInfo)
                setArticleCategory(articleInfo.categoryID)
                setArticleTitle(articleInfo.title)
                setArticleDescription(articleInfo.description)
                setArticleBody(articleInfo.body)
            })
    }, [])

    const addArticle = () => {
        let formData = new FormData()
        const localStorageData = JSON.parse(localStorage.getItem('user'))

        formData.append('cover', articleCover)
        formData.append('title', articleTitle)
        formData.append('description', articleDescription)
        formData.append('body', articleBody)
        formData.append('shortName', shortName)
        formData.append('categoryID', articleCategory._id)

        fetch(`http://localhost:4000/v1/articles/${article._id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        })


        fetch(`http://localhost:4000/v1/articles`, {
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
                .then(() => {
                    navigate('/p-admin/articles/')
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
    }


    const saveArticleAsDraft = () => {
        let formData = new FormData()
        const localStorageData = JSON.parse(localStorage.getItem('user'))

        formData.append('cover', articleCover)
        formData.append('title', articleTitle)
        formData.append('description', articleDescription)
        formData.append('body', articleBody)
        formData.append('shortName', shortName)
        formData.append('categoryID', articleCategory._id)

        fetch(`http://localhost:4000/v1/articles/${article._id}`, {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        })


        fetch(`http://localhost:4000/v1/articles/draft`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            },
            body: formData
        }).then(res => {
            if (res.ok) {
                swal({
                    title: "مقاله جدید با موفقیت پیش نویس شد.",
                    icon: "success",
                    buttons: "باشه",
                })
                .then(() => {
                    navigate('/p-admin/articles/')
                })
            } else {
                swal({
                    title: "پیش نویس مقاله جدید با مشکل مواجه شد!",
                    text: 'لطفا اطلاعات را به درستی وارد کنید.',
                    icon: "error",
                    buttons: "باشه",
                })
            }
        })
    }
    return (
        <DataTable title={'ادامه نوشتن'}>
            <div className="add-course">
                <div className="add-category__top">
                    <h1 className="add-category__top__title">افزودن مقاله جدید:</h1>
                </div>
                <div className="add-category__inputs">
                    <div className="add-category__input__wrapper">
                        <label className="form-input__label">نام مقاله</label>
                        <input
                            type="text"
                            id='title'
                            value={articleTitle}
                            onChange={event => setArticleTitle(event.target.value)}
                            className="form-input__input"
                            placeholder='لطفا عنوان را وارد کنید...'
                        />
                    </div>
                    <div className="add-category__input__wrapper">
                        <label className="form-input__label">لینک</label>
                        <input
                            type="text"
                            value={article.shortName}
                            className="form-input__input"
                            placeholder='لطفا URl را وارد کنید...'
                        />
                    </div>
                    <div className="add-category__input__wrapper">
                        <div className="add-course__select-box__wrapper">
                            <label className='add-course__select-box__title'>انتخاب دسته بندی</label>
                            <select className='add-course__select-box'>
                                <option value={articleCategory._id}>{articleCategory.title}</option>
                            </select>
                        </div>
                    </div>
                    <div className="add-category__input__wrapper">
                        <label className="form-input__label">توضیحات</label>
                        <input
                            type="textarea"
                            value={articleDescription}
                            onChange={event => setArticleDescription(event.target.value)}
                            className="form-input__text-area"
                            placeholder='لطفا توضیحات را وارد کنید...'
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
                    <button
                        className='login__form__submit'
                        type="submit"
                        onClick={addArticle}
                    >
                        افزودن
                    </button>
                    <button
                        className='login__form__submit'
                        type="submit"
                        onClick={saveArticleAsDraft}
                    >
                        پیش نویس
                    </button>
                </div>
            </div>
        </DataTable>
    )
}
