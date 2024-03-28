import React, { useEffect, useState } from "react";
import Patients from "./Patients";
import { Link } from "react-router-dom";

//import { useNavigate } from "react-router-dom";

export default function Home() {
  return (
    <div>
      <h1>HMO</h1>
      <button>
        <Link to="/Add_patient">add patient</Link>
      </button>
      <Patients />
    </div>
  );
}
