import { LOAD_CONTACTS, LOAD_CONTACTS_FAIL, LOAD_CONTACTS_SUCCESS } from './ContactsTypes'

const initialState = {
    loading: false,
    totalContacts: [],
    error: ''
}

export const ContactsReducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_CONTACTS:
            return {
                ...state,
                loading: true
            }

        case LOAD_CONTACTS_SUCCESS:
            return {
                ...state,
                totalContacts: action.payload,
                loading: false
            }
        case LOAD_CONTACTS_FAIL:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default: return initialState
    }
}