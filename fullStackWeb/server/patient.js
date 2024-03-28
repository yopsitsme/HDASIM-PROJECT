const express = require('express');
const router = express.Router();
 const dbp=require('../db/crud.Patients');



router.get('/', async(req, res) => {
    const result=await dbp.readAllPatients()
    res.send(result);
});

router.get('/brief', async(req, res) => {
    const result=await dbp.readAllPatients();
    const id_name = result.filter(p=>{p.id, p.name});
    res.send(id_name);
});

router.
route('/:patientId')
.get(async(req, res) => {
    const id=req.params.patientId;
    const result =await dbp.readPatient(id)
    res.send(result);
})
.put( async(req, res) => {
    console.log(req.body);
    const patient=Object.keys(req.body);
    const result=await dbp.createPatient(patient);
    res.status(201).send(result);
})
.delete( (req, res)=>{
    const id=req.params.patientId;
    dbp.deletePatient(id);
})

router.post('/',async (req, res) => {
    console.log(req.body);
    const patient=Object.keys(req.body);
    const result=await dbp.createPatient(patient);
    res.status(201).send(result);
});


module.exports = router;