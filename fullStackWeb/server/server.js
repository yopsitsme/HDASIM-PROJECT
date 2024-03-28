//const DB=require('../db/dataBase')
require('dotenv').config();
const express=require('express');
const server=express();
const db=require ('../db/dataBase.js');

const patientRouter = require('./patient.js');
const vaccinationRouter = require('./vaccination.js');

const host = process.env.HOST_NAME;
const port = process.env.PORT;

server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:5173'); // Update this with your frontend URL
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
});

// server.use((req, res, next) => {
//     console.log('before')
//     next();
// })

server.use(express.json());

server.use('/patient', patientRouter)
server.use('/vaccination', vaccinationRouter);
server.get('/',(req, res)=>{
    res.send(db.createDataBase());
})

server.use((err, req, res, ) => {
    console.log(err.stack)
   res.status(500).send('Error: ' + err.stack);
})

server.listen(port, host, () => {
    console.log(`listening to requests at http://${host}:${port}`);
});
