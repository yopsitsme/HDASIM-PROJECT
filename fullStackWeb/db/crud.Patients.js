const mysql = require("mysql2");
require("dotenv").config();
    // Create a new MySQL connection with the specified database name
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  port: process.env.MYSQL_PORT,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
}).promise();

 async function createPatient(patientToCreate) {
  try {
    const [result] = await pool.query(`INSERT INTO patients 
    (id,first_name,last_name,birthday,phone_number,cellphone_number,city,street,house_number,vaccination,positive,recovery)
    values 
    (?,?,?,?,?,?,?,?,?,?,?,?,?)`, 
    patientToCreate
  );
    return result;
  } catch (err) {
    console.log(err);
  }
}
 async function readAllPatients(){
  try {
    const [rows] = await pool.query("SELECT * FROM patients");
    return rows;
  } catch (err) {
    console.log(err);
  }
}

 async function readPatient(id){
  try {
    const [rows] = await pool.query("SELECT * FROM patients WHERE id =?", [id]);
    return rows[0];
  } catch (err) {
    console.log(err);
  }
}

 async function updatePatient(patientId, updatedPatient){
  try {
    const [rows] = await pool.query("UPDATE patients SET ? WHERE id =?", [updatedPatient, patientId]);
    return rows;
  } catch (err) {
    console.log(err);
  }
}

 async function deletePatient(patientId){
  try {
    await pool.query("DELETE FROM patients WHERE id =?", [patientId]);
    return ;
  } catch (err) {
    console.log(err);
  }
}

// const Patient=[325944787,'John', 'Doe', '19850101', '0501234567', '0501234567','jerusalem','yafo',15,1,'19850101','19850101']
// console.log( createPatient(Patient));
// readAllPatients().then(patient => {
//   console.log(patient);
// });
module.exports ={createPatient,readAllPatients,readPatient,updatePatient,deletePatient}