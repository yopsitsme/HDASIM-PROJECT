import React,{useState,useEffect} from 'react'
import { useParams, useNavigate } from "react-router-dom";
import Loading from '../components/Loading';
import Error from '../components/Error';

function Patient_info () {

  const URL_API = "http://localhost:3000";
  const patientId = useParams().id;
  const [isLoading, setIsLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);
  const [patient, setPatient] = useState();
  const [updatePatient, setUpdatePatient] = useState(false);
  const [updateTitle, setUpdateTitle] = useState();
  const [updateBody, setUpdateBody] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => await fetchPatient())();
  }, []);
  const fetchPatient = async () => {
    try {
      const response = await fetch(`${URL_API}/patient/${patientId}`);
      if (!response.ok) {
        throw Error("Did not received expected data");
      }
      const result = await response.json();
      setPatient(result);
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };
  function updatePatientHandler() {
    setUpdatePatient(!updatePatient);
  }

  function updatePatientInDataBase(e) {
    e.preventDefault();
    setUpdatePatient(!updatePost);

    const updatedData = {
      userId: post.userId,
      id: post.id,
      title: updateTitle,
      body: updateBody,
    };

    fetch(`${URL_API}/posts/${postId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedData),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to update patient");
        }
      })
      .then(() => {
        console.log("Post updated successfully:", updatedData);
        setPatient(updatedData);
      })
      .catch((error) => {
        setFetchError("Error updating post:", error);
      });
  }

  const deletePatient = async () => {
    try {
      const response = await fetch(`${URL_API}/patient/${patientId}`, {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
        },
      });
      if (!response.ok) {
        throw Error("Failed to delete patient");
      } else {
        navigate("/Patients");
      }
    } catch (err) {
      setFetchError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  function arrowHandler() {
    navigate("/Home");
  }

  return (
    <>
      {isLoading && <Loading />}
      {fetchError && <Error message={fetchError} />}
      {!updatePatient && !isLoading && !fetchError && (
        <div className="post-container">
          <div className="post-header">
            <div className="post-buttons">
              <button onClick={deletePatient}>
              delete Patient
              </button>
              <button onClick={updatePatientHandler}>
                update Patient
              </button>
              <button onClick={arrowHandler}>
                close
              </button>
            </div>
          </div>
          <h3>id:{patient.id}</h3>
          <h3>first name:{patient.first_name}</h3>
          <h3>last name:{patient.last_name}</h3>
          <h3>birthday: {patient.birthday}</h3>
          <h3>address</h3>
          <h3>city:{patient.city}</h3>
          <h3>street:{patient.street}</h3>
          <h3>house number:{patient.house_number}</h3>
          <h3>phone number:{patient.phone_number}</h3>
          <h3>cellphone number:{patient.cellphone_number}</h3>
       <br/>
       <h3>positive at :{patient.positive}</h3>
       <h3>recovery at :{patient.recovery}</h3>


        </div>
      )}
      {updatePatient && (
        <form className="post-form">
          <i
            className="fa-solid fa-circle-xmark"
            onClick={updatePatientHandler}
          ></i>
          <label name="title" htmlFor="title">
            title:
          </label>
          <input
            name="title"
            id="title"
            value={updateTitle || ""}
            onChange={(e) => setUpdateTitle(e.target.value)}
            type="text"
          />
          <br />
          <label name="body" htmlFor="body">
            post:
          </label>
          <textarea
            name="body"
            id="body"
            value={updateBody || ""}
            onChange={(e) => setUpdateBody(e.target.value)}
            type="text"
          />
          <button onClick={updatePatientInDataBase}>save changes</button>
        </form>
      )}
      
          </>
  );
}

export default Patient_info
