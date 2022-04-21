import React from "react";
import { faX } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "../styles/Error.css";

const Error = ({ message, setError }) => (
  <div className="error">
    <p>{message} </p>
    {message && <FontAwesomeIcon icon={faX} onClick={() => setError(null)}/>}
  </div>
);

export default Error;
