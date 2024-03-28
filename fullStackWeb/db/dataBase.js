const mysql = require("mysql2");
require("dotenv").config();


  // Create a new MySQL connection
  const con = mysql.createConnection({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
  });
  
let pool;
async function createDataBase() {

    con.connect(function (err) {
        if (err) throw err;
        console.log("Connected!");

// Check if the database exists
con.query(
    "SHOW DATABASES LIKE ?",
    [process.env.MYSQL_DATABASE],
    async function (err, result) {
      if (err) {
        throw err;
      }
      if (result.length === 0) {
        // Database doesn't exist, create it
       con.query(
          "CREATE DATABASE " + process.env.MYSQL_DATABASE,
          function (err, result) {
            if (err) {
              throw err;
            }
            console.log("Database created");
            connectToDB();
            // Now that the database is created, reconnect to it
          }
        );
      } else {
        // Database already exists
        console.log("Database already exists");
        connectToDB();
      }
    }
  );
    })
}
function connectToDB() {
      // Create a new MySQL connection with the specified database name
  pool = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USERNAME,
    port: process.env.MYSQL_PORT,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
});
pool.getConnection(function (err, connection) {
    if (err) throw err;
        console.log("Connected!");
        createTables();
});
}

async function createTables(){
   await createVaccinationTable();
   await createPatientsTable();
}

async function createVaccinationTable() {
    pool.query(
        "SHOW TABLES LIKE 'vaccination'",
        async function (err, result) {
            if (err) {
                throw err;
            }
            if (result.length === 0) {
                // Table doesn't exist, create it
                pool.query(
                    `
                    CREATE TABLE vaccination (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        Patient_id INT NOT NULL,
                        manufacturer VARCHAR(255) NOT NULL,
                        vaccination_number INT(1) NOT NULL,
                        vaccination_date DATE NOT NULL                    )
                    `,
                    function (err, result) {
                        if (err) {
                            throw err;
                        }
                        console.log("The 'vaccination' table has been successfully created.");
                    }
                );
            } else {
                // Table already exists
                console.log("The 'vaccination' table already exists.");
            }
        }
    );
}

async function createPatientsTable() {
    pool.query(
        "SHOW TABLES LIKE 'patients'",
        async function (err, result) {
            if (err) {
                throw err;
            }
            if (result.length === 0) {
                // Table doesn't exist, create it
                pool.query(
                    `
                    CREATE TABLE patients (
                        id INT PRIMARY KEY AUTO_INCREMENT,
                        first_name VARCHAR(255) NOT NULL,
                        last_name VARCHAR(255) NOT NULL,
                        birthday DATE NOT NULL,
                        phone_number BIGINT(10),
                        cellphone_number BIGINT(10) NOT NULL,
                        city VARCHAR(255) NOT NULL,
                        street VARCHAR(255) NOT NULL,
                        house_number INT(10) NOT NULL,
                        vaccination INT NOT NULL,
                        positive DATE,
                        recovery DATE,
                        FOREIGN KEY (vaccination) REFERENCES vaccination(id)
                    )
                    `,
                    function (err, result) {
                        if (err) {
                            throw err;
                        }
                        console.log("The 'patients' table has been successfully created.");
                    }
                );
            } else {
                // Table already exists
                console.log("The 'patients' table already exists.");
            }
        }
    );
}

module.exports = {createDataBase};
