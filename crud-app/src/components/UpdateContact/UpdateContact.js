import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import FormInput from '../FormInput/FormInput';
import { useSelector } from 'react-redux';

function UpdateContact() {
    const { contactId } = useParams();
    const userData = useSelector(state => state.totalContacts);
    const [selectedContact, setSelectedContact] = useState({});

    useEffect(() => {
        setSelectedContact(userData.filter(item => item.id.includes(contactId)));
        // eslint-disable-next-line 
    }, [])

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

    function handleSubmit(event) {
        event.preventDefault();
        fetch(`http://localhost:3031/users/${contactId}`, {
            method: 'PUT',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(selectedContact[0])
        })
            .then(
                data => {
                    alert("Your contact has been updated successfully, you will be redirected to all contacts page");
                    const timeout = setTimeout(() => {
                        window.location.replace('http://localhost:3000/all-contacts');
                    }, 1000);
                    timeout()
                }

            )
            .catch(error => console.error(error));
    }
    const onChangeSelected = (e) => {
        console.log(selectedContact[0])
        setSelectedContact([{ ...selectedContact[0], [e.target.name]: e.target.value }])
    }

    return (
        <>
            <div className='min-height'>
                <div className='form-group'>
                    <form onSubmit={handleSubmit}>
                        <h1>Update Contact</h1>
                        {selectedContact.length > 0 && inputs.map((input) => {
                            return input.dropdownBlock === true ? (
                                <FormInput
                                    key={input.id}
                                    {...input}
                                    value={selectedContact[0][input.name]}
                                    onChange={onChangeSelected}
                                />
                            ) : (
                                <FormInput
                                    key={input.id}
                                    {...input}
                                    value={selectedContact[0][input.name]}
                                    onChange={onChangeSelected}
                                />
                            );
                        })}

                        {/* <div class="formInput">
                            <label>Username</label>
                            <input name="username" type="text" placeholder="Username" pattern="^[A-Za-z0-9]{3,16}$" required="" focused="true" value={selectedContact.name} onChange={e => setSelectedContact({...selectedContact, username: e.target.value})}/>
                            <span>Username should be 3-16 characters and shouldn't include special characters</span>
                        </div> */}

                        <button>Submit</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default UpdateContact