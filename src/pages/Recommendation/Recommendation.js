import React from "react";
import "./Recommendation.css"

const  Recommendation = () => {

    const [checked, setChecked] = React.useState(false);
    const [list2, setList2] = React.useState(false);
    const [list3, setList3] = React.useState(false);

    const handleChange = () => {
      setChecked(!checked);
    };

    const handleChange2 = () => {
      setList2(!list2);
    };


    const handleChange3 = () => {
      setList3(!list3);
    };
  
    return (
      <div className="Recommendation">
        <Checkbox
          label="choice 1"
          value={checked}
          onChange={handleChange}
        />
        <Checkbox
          label="choice 2"
          value={list2}
          onChange={handleChange2}
        />
        <Checkbox
          label="choice 3"
          value={list3}
          onChange={handleChange3}
        />

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