import React, { useState } from "react";
import "./ContactUs.css";

const ContactUs = () => {
  const [input, setInput]=useState('');
  const [email, setEmail]=useState('');

  const handleSubmit = () => {
  };


  return (
    <form
    className="box"
    >
        <div>
            Contact Us
        </div>
      <div>
        <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} required />
      </div>

      <div>
        <textarea placeholder="Message here" value={input} onChange={e=>setInput(e.target.value)}required />
      </div>
      <div>
        <button onClick={handleSubmit}> Send a message </button>
      </div>
    </form>
  );
};

export default ContactUs;