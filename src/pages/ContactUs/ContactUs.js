import React, { useState } from "react";
import "./ContactUs.css";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";

const ContactUs = () => {
  const auth = useAuth();
  const [input, setInput]=useState('');
  const [email, setEmail]=useState('');

  const handleSubmit = () => {

    db.collection("ContactUs").add({
      Email: email,
      Message: input,
    });
    setEmail('');
    setInput('');
    
  };


  return (
    <form className="box">
        <div>
            Contact Us
        </div>
      <div>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
      </div>

      <div>
        <input placeholder="Message here" value={input} onChange={e=>setInput(e.target.value)}required />
      </div>
      <div>
        <button onClick={handleSubmit}> Send a message </button>
      </div>
    </form>
  );
};

export default ContactUs;