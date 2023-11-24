import React, { useEffect, useReducer } from "react";
import "./FormInput.css";
import validator from "../../Validators/Validator";
const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE": {
      return {
        ...state,
        value: action.value,
        isValid: validator(action.value, action.validations)
      }
    }
    default: {
      return state
    }
  }
}

export default function FormInput(props) {

  const [mainInput, dispatch] = useReducer(inputReducer, {
    value: "",
    isValid: false,
  });

  const onChangeHandler = (e) => {
    dispatch({
      type: 'CHANGE',
      value: e.target.value,
      validations: props.validations,
      isValid: true
    })
  };

  const { value, isValid } = mainInput
  const { onInputHandler, id } = props

  useEffect(() => {
    onInputHandler(id, value, isValid)
  }, [value])
  return (
    <>
      {
        props.type === "textArea" ? (
          <>
            <label className="form-input__label">{props.label}</label>
            <textarea 
            className="form-input__text-area" required
            placeholder={props.placeholder}
            onChange={onChangeHandler}
            value={mainInput.value}
            ></textarea>
          </>
        ) : (
          <div className="form-input__wrapper">
            <label className="form-input__label">{props.label}</label>
            <input
              type={props.type}
              className={`${props.className} ${mainInput.isValid ? 'success' : 'error'}`}
              placeholder={props.placeholder}
              onChange={onChangeHandler}
              value={mainInput.value}
            />
          </div>
        )
      }

    </>
  );
}
