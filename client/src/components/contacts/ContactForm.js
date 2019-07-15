import React, { useState, useContext, useEffect } from "react";
import ContactContext from "../../context/contact/contactContext";
const ContactForm = () => {
  const contactContext = useContext(ContactContext);
  const { addContact, current,clearCurrent,updateContact } = contactContext;
  useEffect(() => {
    if (current !== null) {
      setContact(current);
    } else {
      setContact({
        name: "",
        email: "",
        phone: "",
        type: "personal"
      });
      // [contactContext,current];
    }
  },[contactContext,current]);
  const [contact, setContact] = useState({
    name: "",
    email: "",
    phone: "",
    type: "personal"
  });
  const { name, email, phone, type } = contact;
  const handleChange = e => {
    setContact({ ...contact, [e.target.name]: e.target.value });
  };
  const handleSubmit = e => {
    e.preventDefault();
    if(current === null){
      addContact(contact);
    }else{
      updateContact(contact);
    }
    clearAll();
  };
  const clearAll = () => {
    clearCurrent();
  }
  return (
    <form onSubmit={handleSubmit}>
      <h2 className="text-primary">{current ? 'Edit Contact' : 'Add Contact'}</h2>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="email"
        placeholder="email"
        value={email}
        onChange={handleChange}
      />
      <input
        type="text"
        name="phone"
        placeholder="phone"
        value={phone}
        onChange={handleChange}
      />
      <h5>Contact Type:</h5>
      <input
        type="radio"
        name="type"
        value="personal"
        onChange={handleChange}
        checked={type === "personal"}
      />{" "}
      Personal{" "}
      <input
        type="radio"
        name="type"
        value="professional"
        onChange={handleChange}
        checked={type === "professional"}
      />{" "}
      Professional{" "}
      <div>
        <input
          type="submit"
          className="btn btn-block btn-primary"
          value={current ? 'Update Contact' : 'Add Contact'}
        />
      </div>
      {current && (
        <div>
          <button className="btn btn-block btn-danger" onClick = {clearAll}>Clear</button>
        </div>
      )}
    </form>
  );
};

export default ContactForm;
