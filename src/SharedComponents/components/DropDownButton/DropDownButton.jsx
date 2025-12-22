import React from "react";
import Dropdown from "react-bootstrap/Dropdown";

export default function DropDownButton({ actions }) {
  return (
    <Dropdown align="end">
      <Dropdown.Toggle
        as="span"
        className="d-inline-block "
        style={{ cursor: "pointer", fontSize: "20px" }}
         
      >
        <i className="fa-solid fa-ellipsis"></i>
      </Dropdown.Toggle>

      <Dropdown.Menu className="dropDownMenu">
        <div className="arrow"></div>
        {Object.entries(actions).map(([key, action]) => (
          <Dropdown.Item
            key={key}
            className={`list_item ${action.className || ""}`}
            onClick={action.onClick}
          >
            <i className={action.icon}></i>
            <span className="ms-2">{action.label}</span>
          </Dropdown.Item>
        ))}
      </Dropdown.Menu>
    </Dropdown>
  );
}
