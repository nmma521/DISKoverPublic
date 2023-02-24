import React, { useState } from "react";
import "./ReportBug.css";
import { useAuth } from "../../context/AuthContext";
import { db } from "../../firebase/config";

const ReportBug = () => {
  const auth = useAuth();
  const [input, setInput]=useState('');
  const [email, setEmail]=useState('');

  const handleSubmit = () => {

    db.collection("Report Bug").add({
      Classification: email,
      Message: input,
    });
    setEmail('');
    setInput('');
    
  };


  return (
    <form className="reportbox">
        <div>
            Report Bug
        </div>
      <div>
        <input className="textbox"placeholder="Bug Name" value={email} onChange={e=>setEmail(e.target.value)} required />
      </div>

      <div>
        <input className="messagebox"placeholder="Bug Description" value={input} onChange={e=>setInput(e.target.value)}required />
      </div>
      <div>
        <button onClick={handleSubmit}> Send a message </button>
      </div>
    </form>
  );
};

export default ReportBug;