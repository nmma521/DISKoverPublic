import React from "react";
import "./Recommendation.css"
import NavigationBar from "../WebApp/components/NavigationBar/NavigationBar";

const  Recommendation = () => {

    const [checked, setChecked] = React.useState(false);

    const handleChange = () => {
      setChecked(!checked);
    };
  
    return (
      <div className="Recommendation">
        <Checkbox
          label="My Value"
          value={checked}
          onChange={handleChange}
        />
        <Checkbox
          label="My Value"
          value={checked}
          onChange={handleChange}
        />
        
  
        <p>Is "My Value" checked? {checked.toString()}</p>
        <div>
          <button> Filter </button>
        </div>
      </div>
    );
  };
  
  const Checkbox = ({ label, value, onChange }) => {
    return (
      <label>
        <input type="checkbox" checked={value} onChange={onChange} />
        {label}
      </label>
    );
};

export default Recommendation;