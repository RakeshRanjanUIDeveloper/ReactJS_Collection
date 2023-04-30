import axios from "axios"
import { LOAD_CONTACTS, LOAD_CONTACTS_FAIL, LOAD_CONTACTS_SUCCESS } from "./ContactsTypes"

export const loadContacts = () => {
    return {
        type : LOAD_CONTACTS
    }
}

export const loadContactsSuccess = (users) => {
    return {
        type : LOAD_CONTACTS_SUCCESS,
        payload: users
    }
}

export const loadContactsFail = (errMsg) => {
    return {
        type : LOAD_CONTACTS_FAIL,
        payload: errMsg
    }
}

export const fetchContacts = (url) => {
    return ((dispatch) => {
        dispatch(loadContacts)
        axios.get(url)
        .then(response => {
            const users = response.data;
            dispatch(loadContactsSuccess(users));
        }).catch(err => {
            const error = err.message;
            dispatch(loadContactsFail(error));
        })
    })
}