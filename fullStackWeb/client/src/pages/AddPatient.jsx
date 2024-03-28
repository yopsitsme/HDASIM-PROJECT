import React, { useState } from 'react';
import {  useNavigate } from "react-router-dom";


function AddPatientForm() {
  const URL_API = "http://localhost:3000";
  const navigate = useNavigate();

  function arrowHandler() {
    navigate("/Home");
  }
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    birthday: '',
    cellphone_number: '',
    city: '',
    street: '',
    house_number: '',
    vaccination: '',
    positive: '',
    recovery: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL_API}/patient`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log('Patient added successfully');
        // Reset form after successful submission
        setFormData({
          first_name: '',
          last_name: '',
          birthday: '',
          cellphone_number: '',
          city: '',
          street: '',
          house_number: '',
          vaccination: '',
          positive: '',
          recovery: ''
        });
      } else {
        console.error('Failed to add patient');
      }
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  return (
    <div>
          <button onClick={arrowHandler}>
                close
              </button>
      <h2>Add Patient</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name*:
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </label><br />
        <label>
          Last Name*:
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
        </label><br />
        <label>
          Birthday*:
          <input type="date" name="birthday" value={formData.birthday} onChange={handleChange} required />
        </label><br />
        <label>
          Phone Number:
          <input type="tel" name="phone_number" value={formData.phone_number} onChange={handleChange} />
        </label><br />
        <label>
          Cellphone Number*:
          <input type="tel" name="cellphone_number" value={formData.cellphone_number} onChange={handleChange} required />
        </label><br />
        <label>
          City*:
          <input type="text" name="city" value={formData.city} onChange={handleChange} required />
        </label><br />
        <label>
          Street*:
          <input type="text" name="street" value={formData.street} onChange={handleChange} required />
        </label><br />
        <label>
          House Number*:
          <input type="text" name="house_number" value={formData.house_number} onChange={handleChange} required />
        </label><br />
        <label>
          Vaccination*:
          <input type="number" name="vaccination" value={formData.vaccination} onChange={handleChange} required />
        </label><br />
        <label>
          Positive:
          <input type="date" name="positive" value={formData.positive} onChange={handleChange} />
        </label><br />
        <label>
          Recovery:
          <input type="date" name="recovery" value={formData.recovery} onChange={handleChange} />
        </label><br />
        <button type="submit">OK</button>
      </form>
    </div>
  );

}

export default AddPatientForm;
