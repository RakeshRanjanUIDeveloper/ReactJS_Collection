import React from 'react'
import FormInput from './FormInput';
import "./FormInput.scss";
import { useState } from 'react';

const ContactForm = () => {

  const [values, setValues] = useState({});

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Username should be 3-16 characters and shouldn't include special characters",
      label: "Username",
      pattern: "^[A-Za-z0-9]{3,16}$",
      required: true
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "It should be a valid email id",
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
      name: "contact",
      type: "tel",
      placeholder: "Contact Number",
      errorMessage: "Contact Number must be of 10 digits and only contain numbers",
      pattern: "^[0-9]{10}$",
      label: "Contact Number",
      required: true
    },
    {
      id: 5,
      name: "gender",
      type: "text",
      placeholder: "Gender",
      errorMessage: "Gender should be 3-10 characters and shouldn't include special characters",
      label: "Gender",
      pattern: "^[A-Za-z]{3,10}$",
      required: true
    },
    {
      id: 6,
      name: "group",
      type: "text",
      placeholder: "Group",
      errorMessage: "Group should be among work,family,friends,other,school",
      label: "Group",
      pattern: "^[A-Za-z]{3,10}$",
      required: true
    },
  ]

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3031/users', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(values)
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.error(error));
  }

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  return (
    <>
      <div className='min-height'>
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
      </div>

    </>

  )
}

export default ContactForm