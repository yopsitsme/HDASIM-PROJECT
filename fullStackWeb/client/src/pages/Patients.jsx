import React, { useState, useEffect } from "react";
import {  useNavigate } from "react-router-dom";
import Error from "../components/Error";
import Loading from "../components/Loading";
function Patients() {
  const URL_API = "http://localhost:3000";
  const [patientsList, setPatientsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const navigate = useNavigate();

  //A function that runs immediately upon loading the page and calls the function that imports the list of patients
  useEffect(() => {
    (async () => await fetchPatients())();
  },[]);

  //A function that imports the list of patients from the data base
  const fetchPatients = async () => {
    try {
      const response = await fetch(`${URL_API}/patient`);

      if (!response.ok) {
        throw Error("Did not received expected data");
      }
      const result = await response.json();
      setPatientsList(result);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  function watchPatientHandler(e){
    const patientId = e.target.value;
    navigate(`/Patient/${patientId}`);
  }

  return (
    <>
      {isLoading && <Loading />}
      {fetchError && <Error message={fetchError} />}
      {!isLoading &&
        !fetchError &&
        patientsList.map((patient, key) => {
          {
            console.log(patient);
          }
          return (
            <>
         
              <h2>
                {patient.first_name} {patient.last_name} {patient.id}
              </h2>
              <button 
              onClick={watchPatientHandler}
                value={patient.id}
              >
                view patient
              </button>
            </>
          );
        })}
    </>
  );
}
export default Patients;
