import React, { useState } from 'react'
import DataTable from '../DataTable/DataTable'
import FormInput from '../../../Components/FormInput/FormInput'
import FormButton from '../../../Components/FormInput/FormButton'
import { useForm } from "../../../Hooks/useForm";
import {
    requiredValidator,
    minValidator,
} from "../../../Validators/Rules";
import swal from 'sweetalert';
import { useMutation, useQueryClient } from 'react-query';

export default function Discounts() {

    const [formState, onInputHandler] = useForm(
        {
            discount: {
                value: "",
                isValid: false,
            },
        },
        false
    );
    const queryClient = useQueryClient()
    const localStorageData = JSON.parse(localStorage.getItem('user'))

    // Set Discounts On Courses
    const { mutate: setDiscountsHandler } = useMutation((reqBody) => {
        return fetch(`http://localhost:4000/v1/offs/all`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorageData.token}`,
            },
            body: JSON.stringify(reqBody)
        })
            .then(res => {
                if (res.ok) {
                    swal({
                        title: "کمپین با موفقیت ایجاد شد!",
                        icon: "success",
                        buttons: "باشه",
                    })
                }
            })
    },
    {
        onSuccess: () => {
            queryClient.invalidateQueries(["courses"])
        }
    })
    const setDiscounts = () => {
        const reqBody = {
            discount: formState.inputs.discount.value
        }
        setDiscountsHandler(reqBody)
    }


    return (
        <DataTable title={'تخفیف همگانی'}>
            <div className="add-course">
                <div className="add-category__top">
                    <h1 className="add-category__top__title">برگزاری کمپین جدید:</h1>
                </div>
                <div className="add-category__inputs">
                    <div className="add-category__input__wrapper">
                        <FormInput
                            label={"درصد تخفیف"}
                            type="number"
                            id='discount'
                            className="form-input__input"
                            placeholder='لطفا درصد تخفیف همگانی را وارد کنید...'
                            onInputHandler={onInputHandler}
                            validations={[
                                requiredValidator(),
                                minValidator(1),
                            ]}
                        />
                    </div>
                </div>
                <div className="add-category__input__button__wrapper">
                    <FormButton
                        className={`login__form__submit ${(formState.isFormValid)
                            ? "login__form__submit"
                            : "login__form__submit--error"
                            }`}
                        type="submit"
                        onClick={setDiscounts}
                        disabled={!formState.isFormValid}
                    >
                        افزودن
                    </FormButton>
                </div>
            </div>
        </DataTable>
    )
}
