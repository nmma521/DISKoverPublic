import React, { useState } from "react";
import "./FAQ.css";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";

const FAQ = () => {
  const auth = useAuth();
  const [input, setInput]=useState('');
  const [email, setEmail]=useState('');

  return (
    <form className="box">
        <h1>
            Frequently Asked Questions
        </h1>
        <div>
          
        </div>
    </form>
  );
};

export default FAQ;