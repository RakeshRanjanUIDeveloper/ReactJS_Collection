import { applyMiddleware, legacy_createStore as  createStore } from "redux";
import { ContactsReducer } from "./contacts/ContactsReducer";
import thunk from "redux-thunk";

export const store = createStore(ContactsReducer, applyMiddleware(thunk));