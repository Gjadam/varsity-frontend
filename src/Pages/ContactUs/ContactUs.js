import React from 'react'
import './ContactUs.css'
import NavBar from '../../Components/NavBar/NavBar'
import Footer from '../../Components/Footer/Footer'
import ContactUsBox from '../../Components/ContactUsBox/ContactUsBox'
import { AiFillFacebook, AiFillInstagram, AiFillTwitterSquare, AiFillLinkedin } from 'react-icons/ai'
import FormInput from '../../Components/FormInput/FormInput'
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
  phoneValidator,
} from "../../Validators/Rules";
import { useForm } from '../../Hooks/useForm'
import FormButton from '../../Components/FormInput/FormButton'
import ToUp from '../../Components/ToUp/ToUp'
import swal from 'sweetalert'
import { useNavigate } from 'react-router-dom'
import { useMutation } from 'react-query'
export default function ContactUs() {
  const navigate = useNavigate()
  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      textArea: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  // Send Contact Request To Server 
  const { mutate: addNewContactHandler } = useMutation((newContactInfo) => {
    return fetch(`http://localhost:4000/v1/contact`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(newContactInfo)
    })
      .then(res => {
        if (res.ok) {
          swal({
            title: "درخواست شما با موفقیت ارسال شد",
            icon: "success",
            buttons: "ورود به صفحه اصلی",
          }).then(() => {
            navigate("/")
          })
        }
      })
  })

  const addNewContact = (event) => {
    event.preventDefault()
    const newContactInfo = {
      name: formState.inputs.name.value,
      email: formState.inputs.email.value,
      phone: formState.inputs.phone.value,
      body: formState.inputs.textArea.value,
    }
    addNewContactHandler(newContactInfo)
  }

  return (
    <>
      <NavBar />
      <ToUp />
      <div className='container'>
        <div className="contact-us">
          <div className="contact-us__top">
            <h1 className="contact-us__top__title">تماس با ما</h1>
            <h3 className="contact-us__top__text">ما برای کمک اینجا هستیم!</h3>
            <div className="contact-us__top__boxes">
              <ContactUsBox />
              <ContactUsBox />
              <ContactUsBox />
            </div>
          </div>
          <div className="contact-us__bottom">
            <div className="contact-us__bottom__right-side">
              <img src="/images/svgs/contact-us-form.svg" alt="" className="contact-us__bottom__right-side__image" />
              <div className="contact-us__bottom__right-side__social-medias">
                <h1 className="contact-us__bottom__right-side__social-medias__title">ما را دنبال کنید:</h1>
                <a href="" className="contact-us__bottom__right-side__social-media">
                  <AiFillFacebook className='contact-us__bottom__right-side__social-media__icon' />
                </a>
                <a href="" className="contact-us__bottom__right-side__social-media">
                  <AiFillInstagram className='contact-us__bottom__right-side__social-media__icon' />
                </a>
                <a href="" className="contact-us__bottom__right-side__social-media">
                  <AiFillTwitterSquare className='contact-us__bottom__right-side__social-media__icon' />
                </a>
                <a href="" className="contact-us__bottom__right-side__social-media">
                  <AiFillLinkedin className='contact-us__bottom__right-side__social-media__icon' />
                </a>
              </div>
            </div>
            <form className="contact-us__bottom__form">
              <h1 className="contact-us__bottom__form__title">با ما در ارتباط باشید</h1>
              <h3 className="contact-us__bottom__form__text">برای درخواست نمایندگی لطفا با بخش فروش شرکت تماس بگیرید یا فرم را پر کنید سپس همکاران ما با شما تماس خواهند گرفت.</h3>
              <FormInput
                label={"نام و نام خانوادگی*"}
                id="name"
                type={"text"}
                placeholder={"نام و نام خانوادگی خود را بنویسید..."}
                className="form-input__input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(18),
                ]}
                onInputHandler={onInputHandler}
              />
              <FormInput
                label={"ایمیل*"}
                id="email"
                type={"email"}
                placeholder={"gmail.com@***"}
                className="form-input__input"
                validations={[
                  requiredValidator(),
                  minValidator(8),
                  maxValidator(30),
                  emailValidator(),
                ]}
                onInputHandler={onInputHandler}
              />
              <FormInput
                label={"شماره تلفن*"}
                type={"number"}
                placeholder={"09912345678"}
                className="form-input__input"
                id='phone'
                validations={[
                  requiredValidator(),
                  minValidator(11),
                  maxValidator(11),
                  phoneValidator(),
                ]}
                onInputHandler={onInputHandler}
              />
              <FormInput
                label={"متن درخواست*"}
                id="textArea"
                type="textArea"
                placeholder={"درخواست خود را بنویسید..."}
                className="form-input__input"
                validations={[
                  requiredValidator(),
                  minValidator(4),
                ]}
                onInputHandler={onInputHandler}
              />
              <FormButton
                className={`login__form__submit ${(formState.isFormValid)
                  ? "login__form__submit"
                  : "login__form__submit--error"
                  }`}
                type="submit"
                onClick={addNewContact}
                disabled={!formState.isFormValid}
              >
                ارسال
              </FormButton>
            </form>
          </div>
          <div className="contact-us__map">
            <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d207344.82909255978!2d51.03583578298455!3d35.70745047505023!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f8e00491ff3dcd9%3A0xf0b3697c567024bc!2sTehran%2C%20Tehran%20Province%2C%20Iran!5e0!3m2!1sen!2snl!4v1697293336838!5m2!1sen!2snl" width="1100" height="400" style={{ border: 0, borderRadius: '0.4rem' }} allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
