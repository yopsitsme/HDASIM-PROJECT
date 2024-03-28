import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Patient_view from "./pages/Patients";
import AddPatientForm from './pages/AddPatient';
import Patient_info from "./pages/Patient_info";
import './App.css'

function App() {


  return (
<BrowserRouter>
<Routes>
  <Route path='/' element={<Home/>} />
  <Route path='/Home' element={<Home/>} />
  <Route path='/Patient_view' element={<Patient_view/>} />
  <Route path='/Add_patient' element={<AddPatientForm/>} />
  <Route path="/Patient/:id" element={< Patient_info/>} />

  </Routes>
</BrowserRouter>
  )
}

export default App
