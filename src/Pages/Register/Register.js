import React, { useContext, useState } from "react";
import "./Register.css";
import { PiSignIn } from "react-icons/pi";
import { AiOutlineGoogle } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import WelCome from "../../Components/WelCome/WelCome";
import FormInput from "../../Components/FormInput/FormInput";
import FormButton from "../../Components/FormInput/FormButton";
import { useForm } from '../../Hooks/useForm'
import { requiredValidator, minValidator, maxValidator, emailValidator, phoneValidator } from "../../Validators/Rules";
import AuthContext from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";
export default function Register() {

  const [isRuleVerify, setIsRuleVerify] = useState(false);
  const authContext = useContext(AuthContext)
  const navigate = useNavigate()
  const [formState, onInputHandler] = useForm(
    {
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      name: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    }, false)


  const onChangeHandler = () => {
    setIsRuleVerify(true);
  };

  const registerNewUser = (event) => {
    event.preventDefault()

    const newUserInfos = {
      username: formState.inputs.username.value,
      email: formState.inputs.email.value,
      password: formState.inputs.password.value,
      confirmPassword: formState.inputs.password.value,
      name: formState.inputs.name.value,
      phone: formState.inputs.phone.value,
    }

    fetch(`http://localhost:4000/v1/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUserInfos),
    })
      .then((res) => {
        if (res.ok) {
          return res.json()
        } else if (res.status === 403) {
          swal({
            title: 'این شماره تلفن مسدود شده است!',
            icon: 'error',
            buttons: 'باشه'
          })
        }
      })
      .then((result) => {
        if (result) {
          authContext.login(result.user, result.accessToken);
          swal({
            title: "ثبت نام با موفقیت انجام شد!",
            icon: "success",
            buttons: "ورود به صفحه اصلی",
          }).then(() => {
            navigate("/")
          })

        }

      }
      )
  }

  return (
    <div className="register">
      <WelCome />
      <div className="register__form">
        <div className="register__form__top">
          <h1 className="register__form__top__title">
            <PiSignIn className="register__form__top__title__icon" />
            ثبت نام
          </h1>
          <h3 className="register__form__top__text">
            از دیدن شما خوشحالم! لطفا ثبت نام کنید.
          </h3>
        </div>
        <form className="register__form__inputs__wrapper">
          <FormInput
            label={"نام و نام خانوادگی*"}
            type={"text"}
            placeholder={"نام و نام خانوادگی خود را وارد کنید..."}
            className="form-input__input"
            id='name'
            validations={[
              requiredValidator(),
              minValidator(6),
              maxValidator(20),
            ]}
            onInputHandler={onInputHandler}
          />
          <FormInput
            label={"نام کاربری*"}
            type={"text"}
            placeholder={"نام کاربری خود را وارد کنید..."}
            className="form-input__input"
            id='username'
            validations={[
              requiredValidator(),
              minValidator(8),
              maxValidator(20),
            ]}
            onInputHandler={onInputHandler}
          />
          <FormInput
            label={"ایمیل*"}
            type={"email"}
            placeholder={"gmail.com@***"}
            className="form-input__input"
            id='email'
            validations={[
              requiredValidator(),
              minValidator(8),
              maxValidator(30),
              emailValidator()
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
            label={"رمز عبور*"}
            type={"password"}
            placeholder={"********"}
            className="form-input__input"
            id='password'
            validations={[
              requiredValidator(),
              minValidator(8),
              maxValidator(18),
            ]}
            onInputHandler={onInputHandler}
          />
          <div className="register__form__checkbox">
            <div className="register__form__checkbox__wrapper">
              <input
                type="checkbox"
                id="CheckBox"
                onChange={onChangeHandler}
                className="register__form__inputs__wrapper__checkbox"
              />
              <label
                htmlFor="CheckBox"
                className="register__form__inputs__wrapper__checkbox__label"
              >
                با ثبت نام{" "}
                <a
                  href=""
                  className="register__form__inputs__wrapper__checkbox__label__link"
                >
                  شرایط و قوانین سایت
                </a>{" "}
                را خواهید پذیرفت.
              </label>
            </div>
          </div>

          <FormButton
            className={`register__form__submit ${formState.isFormValid && isRuleVerify ? 'register__form__submit' : 'register__form__submit--error'}`}
            type="submit"
            disabled={!formState.isFormValid || !isRuleVerify}
            onClick={registerNewUser}
          >
            ثبت نام
          </FormButton>
        </form>
        <div className="register__form__bottom">
          <h3 className="register__form__bottom__OR">یا</h3>
          <div className="register__form__bottom__links">
            <a href="" className="register__form__bottom__link">
              <AiOutlineGoogle className="register__form__bottom__link__icon" />
              با گوگل
            </a>
            <a href="" className="register__form__bottom__link">
              <BiLogoFacebook className="register__form__bottom__link__icon" />
              با فیسبوک
            </a>
          </div>
          <div className="register__form__bottom__question">
            آیا قبلا ثبت نام کرده اید ؟
            <FormButton
              to="/login"
              className="register__form__bottom__question__link"
            >
              ورود
            </FormButton>
          </div>
        </div>
      </div>
    </div>
  );
}
