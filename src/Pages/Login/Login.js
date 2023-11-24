import React, { useContext, useState } from "react";
import "./Login.css";
import { PiSignIn } from "react-icons/pi";
import { AiOutlineGoogle } from "react-icons/ai";
import { BiLogoFacebook } from "react-icons/bi";
import WelCome from "../../Components/WelCome/WelCome";
import FormInput from "../../Components/FormInput/FormInput";
import FormButton from "../../Components/FormInput/FormButton";
import {
  requiredValidator,
  minValidator,
  maxValidator,
  emailValidator,
} from "../../Validators/Rules";
import { useForm } from "../../Hooks/useForm";
import AuthContext from "../../Context/AuthContext";
import swal from "sweetalert";
import { Link, useNavigate } from "react-router-dom";
import ReCAPTCHA from "react-google-recaptcha";
export default function Login() {
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const [isGoogleRecaptchaVerify, setIsGoogleRecaptchaVerify] = useState(false);
  const [formState, onInputHandler] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const onChangeHandler = () => {
    setIsGoogleRecaptchaVerify(true);
  };

  const userLogin = (event) => {
    event.preventDefault();

    const userData = {
      identifier: formState.inputs.email.value,
      password: formState.inputs.password.value,
    };

    fetch(`http://localhost:4000/v1/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    })
      .then((res) => {
        if (!res.ok) {
          return res.text().then((text) => {
            throw new Error(text);
          });
        } else {
          return res.json();
        }
      })
      .then((result) => {
        swal({
          title: "با موفقیت وارد شدید!",
          icon: "success",
          buttons: "ورود به صفحه اصلی",
        }).then(() => {
          navigate("/");
        });
        authContext.login({}, result.accessToken);
      })
      .catch((err) => {
        console.log("err =>", err);
        swal({
          title: "کاربری وجود ندارد!",
          text: 'اطلاعات وارد شده صحیح نیست یا کاربری با این مشخصات وجود ندارد.',
          icon: "error",
          buttons: "تلاش دوباره",
        });
      });
  };

  return (
    <div className="login">
      <WelCome />
      <div className="login__form">
        <div className="login__form__top">
          <h1 className="login__form__top__title">
            <PiSignIn className="login__form__top__title__icon" />
            ورود به حساب کاربری
          </h1>
          <h3 className="login__form__top__text">
            از دیدن شما خوشحالم! لطفا به حساب کاربری خود وارد شوید.
          </h3>
        </div>
        <form className="login__form__inputs__wrapper">
          <FormInput
            label={"ایمیل*"}
            id="email"
            className="form-input__input"
            type={"email"}
            placeholder={"gmail.com@***"}
            validations={[
              requiredValidator(),
              minValidator(8),
              maxValidator(30),
              emailValidator(),
            ]}
            onInputHandler={onInputHandler}
          />
          <FormInput
            label={"رمز عبور*"}
            id="password"
            type={"password"}
            className="form-input__input"
            placeholder={"********"}
            validations={[
              requiredValidator(),
              minValidator(8),
              maxValidator(18),
            ]}
            onInputHandler={onInputHandler}
          />
          <ReCAPTCHA
            sitekey="6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI"
            onChange={onChangeHandler}
          />
          <div className="login__form__checkbox">
            <div className="login__form__checkbox__wrapper">
              <input
                type="checkbox"
                id="CheckBox"
                className="login__form__inputs__wrapper__checkbox"
              />
              <h3
                htmlFor="CheckBox"
                className="login__form__inputs__wrapper__checkbox__label"
              >
                مرا بخاطر بسپار
              </h3>
            </div>
            <div className="login__form__checkbox__wrapper">
              <Link
                to="/forgot-password"
                htmlFor="CheckBox"
                className="login__form__inputs__wrapper__checkbox__label"
              >
                رمز خود را فراموش کرده اید ؟
              </Link>
            </div>
          </div>
          <FormButton
            className={`login__form__submit ${
              (formState.isFormValid && isGoogleRecaptchaVerify)
                ? "login__form__submit"
                : "login__form__submit--error"
            }`}
            type="submit"
            onClick={userLogin}
            disabled={!formState.isFormValid || !isGoogleRecaptchaVerify}
          >
            ورود
          </FormButton>
        </form>
        <div className="login__form__bottom">
          <h3 className="login__form__bottom__OR">یا</h3>
          <div className="login__form__bottom__links">
            <a href="" className="login__form__bottom__link">
              <AiOutlineGoogle className="login__form__bottom__link__icon" />
              با گوگل
            </a>
            <a href="" className="login__form__bottom__link">
              <BiLogoFacebook className="login__form__bottom__link__icon" />
              با فیسبوک
            </a>
          </div>
          <div className="login__form__bottom__question">
            حساب کاربری ندارید ؟
            <FormButton
              to="/register"
              className="login__form__bottom__question__link"
            >
              ثبت نام
            </FormButton>
          </div>
        </div>
      </div>
    </div>
  );
}
