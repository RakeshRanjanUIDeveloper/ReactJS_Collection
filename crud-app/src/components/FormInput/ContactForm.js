import React, { useEffect } from 'react'
import FormInput from './FormInput';
import "./FormInput.scss";
import { useState } from 'react';

const ContactForm = () => {
  const [values, setValues] = useState({});
  const [submitPage, setSubmitPage] = useState(false);

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
      placeholder: "Gender",
      errorMessage: "Please select your gender from dropdown",
      label: "Gender",
      required: true,
      list: "data",
      dropdownBlock: true,
      dataDropdown: ["male", "female", "Polygender", "Bigender", "Agender", "Genderfluid", "Genderqueer", "Non-binary"]
    },
    {
      id: 6,
      name: "group",
      type: "text",
      placeholder: "Group",
      errorMessage: "Group should be among work,family,friends,other,school",
      label: "Group",
      pattern: "^[A-Za-z]{3,10}$",
      required: true,
      dropdownBlock: true,
      dataDropdown: ["work", "family", "friends", "other", "school"],
      list: "data-group",
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
      alert("Your contact has been added successfully, you will be redirected to all contacts page");
        const timeout = setTimeout(() => {
          window.location.replace('http://localhost:3000/all-contacts');
        }, 1000);

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
            {inputs.map((input) => {
              return input.dropdownBlock === true ? (
                <FormInput
                  key={input.id}
                  {...input}
                  onChange={onChange}
                />
              ) : (
                <FormInput
                  key={input.id}
                  {...input}
                  value={values[input.name]}
                  onChange={onChange}
                />
              );
            })}
            <button>Submit</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default ContactForm