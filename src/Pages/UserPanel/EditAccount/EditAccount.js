import React, { useContext, useEffect, useState } from 'react'
import UserDataTable from '../UserDataTable/UserDataTable'
import AuthContext from '../../../Context/AuthContext'
import { CiSaveDown1 } from 'react-icons/ci'
import swal from 'sweetalert'
import { useMutation } from 'react-query'
export default function EditAccount() {

    const authContext = useContext(AuthContext)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [username, setUserName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const localStorageData = JSON.parse(localStorage.getItem('user'))
    
    useEffect(() => {
        setName(authContext.userInfos.name)
        setPhone(authContext.userInfos.phone)
        setUserName(authContext.userInfos.username)
        setEmail(authContext.userInfos.email)
        setPassword(authContext.userInfos.password)
    }, [])


    const { mutate: editAccountHandler } = useMutation((userNewInfos) => {
        return fetch(`http://localhost:4000/v1/users`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorageData.token}`
            },
            body: JSON.stringify(userNewInfos)
        })
            .then(res => {
                if (res.ok) {
                    swal({
                        title: "اطلاعات شما با موفقیت ویرایش شد.",
                        icon: "success",
                        buttons: "باشه",
                    })
                } else {
                    swal({
                        title: "ویرایش اطلاعات با مشکل مواجه شد!",
                        icon: "error",
                        buttons: "باشه",
                    })
                }
            })
    })


    const editAccount = () => {
        const userNewInfos = {
            username,
            name,
            email,
            password,
            phone,
        }
        editAccountHandler(userNewInfos)
    }


    return (
        <>
            <UserDataTable title={'ویرایش پروفایل'}>
                <form className="edit-account__wrapper">
                    <div className="send-ticket__select-box__wrapper">
                        <label className='send-ticket__select-box__title'>شماره موبایل</label>
                        <input
                            type="number"
                            className='send-ticket__select-box'
                            placeholder='لطفا شماره موبایل را وارد کنید...'
                            value={phone}
                            onChange={event => setPhone(event.target.value)}
                            required
                        />
                    </div>
                    <div className="send-ticket__select-box__wrapper">
                        <label className='send-ticket__select-box__title'>نام و نام خانوادگی</label>
                        <input
                            type="text"
                            className='send-ticket__select-box'
                            placeholder='لطفا نام و نام خانوادگی خود را وارد کنید...'
                            value={name}
                            onChange={event => setName(event.target.value)}
                            required
                        />
                    </div>
                    <div className="send-ticket__select-box__wrapper">
                        <label className='send-ticket__select-box__title'>نام کاربری</label>
                        <input
                            type="text"
                            className='send-ticket__select-box'
                            placeholder='لطفا نام کاربری خود را وارد کنید...'
                            value={username}
                            onChange={event => setUserName(event.target.value)}
                            required
                        />
                    </div>
                </form>
            </UserDataTable>
            <UserDataTable title={'تغییر ایمیل'}>
                <div className="send-ticket__select-box__wrapper">
                    <label className='send-ticket__select-box__title'>ایمیل</label>
                    <input
                        type="email"
                        className='send-ticket__select-box'
                        placeholder='لطفا ایمیل خود را وارد کنید...'
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                        required
                    />
                </div>
            </UserDataTable>
            <UserDataTable title={'تغییر رمز عبور'}>
                <div className="send-ticket__select-box__wrapper">
                    <label className='send-ticket__select-box__title'>رمز جدید</label>
                    <input
                        type="text"
                        className='send-ticket__select-box'
                        placeholder='لطفا رمز جدید خود را وارد کنید...'
                        value={password}
                        onChange={event => setPassword(event.target.value)}
                        required
                    />
                </div>
            </UserDataTable>
            <div className="user-ticket__add-ticket__wrapper">
                <span className="user-ticket__add-ticket__link" onClick={editAccount}>ذخیره تغییرات<CiSaveDown1 className='user-ticket__add-ticket__link__icon' /></span>
            </div>
        </>

    )
}
