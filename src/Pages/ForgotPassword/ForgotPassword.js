import React from 'react'
import './ForgotPassword.css'
import FormInput from '../../Components/FormInput/FormInput'
import Welcome from '../../Components/WelCome/WelCome'
import { RiLockPasswordLine } from 'react-icons/ri'
import {
    requiredValidator,
    minValidator,
    maxValidator,
    emailValidator,
} from "../../Validators/Rules";
import { useForm } from '../../Hooks/useForm';
import FormButton from '../../Components/FormInput/FormButton';
export default function ForgotPassword() {


    const [formState, onInputHandler] = useForm(
        {
            email: {
                value: "",
                isValid: false,
            },
        },
        false
    );

    return (
        <div className='forgot-password'>
            <Welcome />
            <div className="forgot-password__form">
                <h1 className="forgot-password__title"><RiLockPasswordLine className='forgot-password__title__icon' /> فراموشی رمز عبور</h1>
                <h3 className="forgot-password__text">برای دریافت رمز عبور جدید، آدرس ایمیل خود را وارد کنید.</h3>
                <div className="forgot-password__form__inputs__wrapper">
                    <FormInput
                        label={"ایمیل*"}
                        id="email"
                        inputType={"email"}
                        placeholder={"gmail.com@***"}
                        validations={[
                            requiredValidator(),
                            minValidator(8),
                            maxValidator(30),
                            emailValidator(),
                        ]}
                        onInputHandler={onInputHandler}
                    />
                    <FormButton
                        className={`login__form__submit ${(formState.isFormValid)
                            ? "login__form__submit"
                            : "login__form__submit--error"
                            }`}
                        type="submit"
                        onClick={null}
                        disabled={!formState.isFormValid}
                    >
                        ورود
                    </FormButton>
                </div>
            </div>
        </div>
    )
}
