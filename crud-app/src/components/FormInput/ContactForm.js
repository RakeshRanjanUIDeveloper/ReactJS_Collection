import React from 'react'
import FormInput from './FormInput';
import "./FormInput.scss";
import { useState, useRef } from 'react';

const ContactForm = () => {

  const [values, setValues] = useState({
    username: "",
    email: "",
    fullname: "",
    contact: ""
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage:"Username should be 3-16 characters and shouldn't include special characters",
      label: "Username",
      pattern:"^[A-Za-z0-9]{3,16}$",
      required: true
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage:"It should be a valid email id",
      label: "Email",
      required: true
    },
    {
      id: 3,
      name: "DOB",
      type: "date",
      placeholder: "Date of Birth",
      label: "D.O.B."
    },
    {
      id: 4,
      name: "Contact",
      type: "tel",
      placeholder: "Contact Number",
      errorMessage:"Contact Number must be of 10 digits and only contain numbers",
      pattern: "^[0-9]{10}$",
      label: "Contact Number",
      required: true
    },
    {
      id: 5,
      name: "Password",
      type: "password",
      placeholder: "Password",
      errorMessage:"Password should be 8-20 characters and include atleast 1 letter, 1 number and 1 special character",
      label: "Password",
      pattern : "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,20}$",
      required: true
    },
    {
      id: 6,
      name: "Confirm Password",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage:"Passwords don't match",
      label: "Confirm Password",
      pattern: values.password,
      required: true
    }
  ]

  const usernameRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  console.log(values)
  return (
    <div className='form-group'>
      <form onSubmit={handleSubmit}>
        <h1>Add Contact</h1>
        {inputs.map((input) => (
          <FormInput 
            key={input.id} 
            {...input} 
            value={values[input.name]} 
            onChange={onChange} 
          />
        ))}

        <button>Submit</button>
      </form>

    </div>
  )
}

export default ContactForm