import React, { Fragment } from 'react';
import "./FormInput.scss";
import { useState } from 'react';
import Dropdown from '../Dropdown/Dropdown';

const FormInput = (props) => {

  const { label, errorMessage, onChange, onChangeDrop, id, dropdownBlock, list, dataDropdown, ...inputProps } = props;
  const [focused, setFocused] = useState(false);

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <Fragment>
      {dropdownBlock === true ?
        <div className='formInput'>
          <label>{label}</label>
          <Dropdown  {...inputProps} id={list} data={dataDropdown} onChange={onChange} onBlur={handleFocus}  list={list} placeholder={label}  focused={focused.toString()} />
          <span>{errorMessage}</span>
        </div> :
        <div className='formInput'>
          <label>{label}</label>
          <input
            {...inputProps}
            onChange={onChange}
            onBlur={handleFocus}
            onFocus={() => inputProps.name === "confirmPassword" && setFocused(true)}
            focused={focused.toString()}
          />
          <span>{errorMessage}</span>
        </div>
      }

    </Fragment>

  )
}

export default FormInput