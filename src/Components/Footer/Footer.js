import React from 'react'
import './Footer.css'
import { FaLinkedin, FaFacebookSquare, FaTwitterSquare, FaInstagramSquare } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import FormInput from '../FormInput/FormInput'
import { useForm } from '../../Hooks/useForm'
import {
    requiredValidator,
    minValidator,
    maxValidator,
    emailValidator,
} from "../../Validators/Rules";
import swal from 'sweetalert'
import useToUpClick from '../../Hooks/useToUpClick'
import { useMutation } from 'react-query'
export default function Footer() {

    const [formState, onInputHandler] = useForm(
        {
            email: {
                value: "",
                isValid: false,
            }
        },
        false
    );

    const [toUpHandler] = useToUpClick()

    // Add New Email For Newsletters
    const { mutate: addNewEmailHandler } = useMutation((newEmail) => {
        return fetch(`http://localhost:4000/v1/newsletters`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newEmail)
        })
            .then(res => {
                if (res.ok) {
                    swal({
                        title: "درخواست شما با موفقیت ارسال شد",
                        icon: "success",
                        buttons: "قبول",
                    })
                }
            })
    })
    const addNewEmail = (event) => {
        event.preventDefault()
        const newEmail = {
            email: formState.inputs.email.value,
        }
        addNewEmailHandler(newEmail)
    }
    return (
        <div className="container">
            <div className='footer'>
                <div className="footer__top">
                    <h1 className="footer__top__title">برای دریافت جدیدترین به‌روزرسانی‌های دوره، در خبرنامه ما عضو شوید.</h1>
                    <img src="/images/svgs/footer-icon1.svg" alt="icon" className="footer__top__icon1 footer__top__icons" />
                    <img src="/images/svgs/footer-icon2.svg" alt="icon" className="footer__top__icon2 footer__top__icons" />
                    <img src="/images/svgs/footer-icon3.png" alt="icon" className="footer__top__icon3 footer__top__icons" />
                    <img src="/images/svgs/footer-icon4.png" alt="icon" className="footer__top__icon4 footer__top__icons" />
                    <img src="/images/svgs/footer-icon5.png" alt="icon" className="footer__top__icon5 " />
                    <form className='footer-top__input__wrapper'>
                        <FormInput
                            type="email"
                            id="email"
                            className="footer-top__input"
                            placeholder='ایمیل'
                            validations={[
                                requiredValidator(),
                                minValidator(8),
                                maxValidator(30),
                                emailValidator(),
                            ]}
                            onInputHandler={onInputHandler}
                        />
                        <button className="footer-top__input__btn" onClick={addNewEmail}>عضویت</button>
                    </form>
                </div>
                <div className="footer-bottom">
                    <svg className='footer__fill-body' viewBox="0 0 500 150" preserveAspectRatio='none' width="100%" height="150">
                        <path
                            d="M0,150 L0,40 Q250,150 500,40 L580,150 Z" />
                    </svg>
                    <div className="footer-bottom__logo__link">
                        <img src="/images/logo/logo-mini.png" alt="logo" className="footer-bottom__logo" />
                    </div>
                    <h3 className="footer-bottom__text">Varsity به عنوان یک مجموعه آموزشی، هدفش افزایش سطح کیفیت آموزش است. برای دستیابی به این هدف، Varsity تمام تلاش خود را می کند تا محتوای آموزشی با کیفیتی عالی ارائه دهد و به دانشجویان امکان انتقال مفاهیم و مهارت های لازم برای یادگیری بهتر را فراهم کند.
                    </h3>
                    <ul className="footer-bottom__items">
                        <li className="footer-bottom__item">
                            <Link to="/about-us" className="footer-bottom__item__link" onClick={toUpHandler}>درباره ما</Link>
                        </li>
                        <li className="footer-bottom__item">
                            <Link to="/contact-us" className="footer-bottom__item__link" onClick={toUpHandler}>ارتباط با ما</Link>
                        </li>
                        <li className="footer-bottom__item">
                            <Link to="/courses/1" className="footer-bottom__item__link" onClick={toUpHandler}>دوره ها</Link>
                        </li>
                        <li className="footer-bottom__item">
                            <Link to="/articles/1" className="footer-bottom__item__link" onClick={toUpHandler}>مقالات</Link>
                        </li>
                    </ul>
                    <div className="footer-bottom__social-medias">
                        <a href="" className="footer-bottom__social-media"><FaLinkedin /></a>
                        <a href="" className="footer-bottom__social-media"><FaTwitterSquare /></a>
                        <a href="" className="footer-bottom__social-media"><FaInstagramSquare /></a>
                        <a href="" className="footer-bottom__social-media"><FaFacebookSquare /></a>
                    </div>
                    <h6 className="footer-bottom__copy-right"> Created By THEGJAD | 2023 &copy;</h6>
                </div>
            </div>
        </div>
    )
}
