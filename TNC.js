import React, { useState } from "react";
import "./TNC.css";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";

const TNC = () => {
  const auth = useAuth();
  const [input, setInput]=useState('');
  const [email, setEmail]=useState('');

  return (
    <form className="box">
        <h1>
            Terms & Conditions
        </h1>
        <div>
          
        </div>
    </form>
  );
};

export default TNC;