import React, { useReducer } from "react";
import axios from 'axios';
import ContactContext from "./contactContext";
import ContactReducer from "./contactReducer";
import {
  ADD_CONTACT,
  SET_CURRENT,
  CLEAR_CURRENT,
  DELETE_CONTACT,
  UPDATE_CONTACT,
  FILTER_CONTACTS,
  CLEAR_FILTER,
  CONTACT_ERROR,
  GET_CONTACTS,
  CLEAR_CONTACTS
} from "../types";

const ContactState = props => {
  const intialState = {
    contacts: null,
    current: null,
    filtered: null,
    error: null,
    loading:true
  };

  const [state, dispatch] = useReducer(ContactReducer,intialState);

  //Get Contacts

  const getContacts = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/contacts');
      dispatch({
        type: GET_CONTACTS,
        payload: res.data
      })
    } catch (err) {
      dispatch({
        type:CONTACT_ERROR,
        payload: err.response.msg
      })
    }
  }

  //Clear Contacts

  const clearContacts = () => {
    dispatch({
      type: CLEAR_CONTACTS
    })
  }

  //Add Contact
  const addContact = async contact => {
    const config = {
        headers: {
          'Content-Type': 'application/json'
        }
    }

    try {
      await axios.post('http://localhost:5000/api/contacts',contact,config)
      dispatch({type:ADD_CONTACT, payload:contact})
    } catch (err) {
      dispatch({
        type: CONTACT_ERROR,
        payload: err.response.msg
      })
    }

  }
  //Delete Contact
  const deleteContact = async id => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
  }

  try {
     await axios.delete(`http://localhost:5000/api/contacts/${id}`,config)
    dispatch({type:DELETE_CONTACT,payload:id});
    
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.msg
    })
  }
  }
  // setUser
  const setUser = (contact) => {
    dispatch({type: SET_CURRENT, payload: contact});
  }

  // clear Current
  const clearCurrent = () => {
    dispatch({type:CLEAR_CURRENT});
  }
  //Update Contact
  const updateContact = async (contact) => {
    const config = {
      headers: {
        'Content-Type': 'application/json'
      }
  }

  try {
   const res = await axios.put(`http://localhost:5000/api/contacts/${contact._id}`,contact,config)
    dispatch({type: UPDATE_CONTACT, payload: res.data});
  } catch (err) {
    dispatch({
      type: CONTACT_ERROR,
      payload: err.response.msg
    })
  }
    
  }
  //Filter Contact
  const filterContacts = (text) => {
    dispatch({type: FILTER_CONTACTS,payload:text})
  }
  //Clear Filter
  const clearFilter = () =>{
    dispatch({type: CLEAR_FILTER});
  }
  return (
    <ContactContext.Provider
      value={{
        contacts: state.contacts,
        current: state.current,
        filtered: state.filtered,
        error: state.error,
        loading: state.loading,
        addContact,
        deleteContact,
        setUser,
        clearCurrent,
        updateContact,
        filterContacts,
        clearFilter,
        getContacts,
        clearContacts
      }}
    >
      {props.children}
    </ContactContext.Provider>
  );
};

export default ContactState;
