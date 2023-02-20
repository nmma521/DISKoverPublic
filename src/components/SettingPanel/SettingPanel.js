import React from "react";
import "./SettingPanel.css";
import * as ROUTES from '../../constants/routes'
import ContactUs from "../../pages/ContactUs/ContactUs";
import { Dropdown } from "rsuite";
import { Link } from "react-router-dom";

const SettingPanel = () => {

  
    return (
      <div className="ContactUs">
            <Dropdown title="Setting" className="SettingPanel">
                <Link className="button" to={ROUTES.CONTACT_US}>contact us</Link>
            </Dropdown>
        </div>
    );
};

export default SettingPanel;