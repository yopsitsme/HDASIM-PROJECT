const mysql = require("mysql2");
require("dotenv").config();
// Create a new MySQL connection with the specified database name
const pool = mysql
  .createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
  }).promise();

 async function createVaccination(vaccination) {
  try {
    const [rows] = await pool.query(
      `INSERT INTO vaccination (Patient_id,manufacturer,vaccination_number,vaccination_date)
          value(?,?,?,?)`,
      vaccination
    );
    return rows;
  } catch (err) {
    console.log(err);
  }
}
 async function readAllVaccination() {
  try {
    const [rows] = await pool.query("SELECT * FROM vaccination");
    return rows;
  } catch (err) {
    console.log(err);
  }
}
 async function readVaccination(patientId) {
  try {
    const [rows] = await pool.query(
      "SELECT * FROM vaccination WHERE Patient_Id =?",
      [patientId]);
    return rows[0];
  } catch (err) {
    console.log(err);
  }
}

 async function updateVaccination(patientId, updatedVaccination) {
  try {
    const [rows] = await pool.query(
      "UPDATE vaccination SET? WHERE patientId =?",
      [updatedVaccination, patientId]
    );
    return rows;
  } catch (err) {
    console.log(err);
  }
}

 async function deleteVaccination(patientId) {
  try {
    await pool.query("DELETE FROM vaccinations WHERE patientId =?", [
      patientId,
    ]);
    return;
  } catch (err) {
    console.log(err);
  }
}

// let vaccinations = [325914783, "abc", 1, "20150104"];
// console.log(createVaccination(vaccinations));

//console.log(readVaccination(325914783));
module.exports = {createVaccination,readAllVaccination,readVaccination,updateVaccination,deleteVaccination}
