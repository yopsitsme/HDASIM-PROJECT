const express = require('express');
const router = express.Router();
 const dbv=require('../db/crud.Vaccination');


router.get('/',async (req, res) => {
    const result= await dbv.readAllVaccination()
    res.send(result);
});

router.
route('/:patientId')
.get(async(req, res) => {
    const id=req.params.patientId;
    const result=await dbv.readVaccination(id);
    res.send(result);
})
.put( async(req, res) => {
    console.log(req.body);
    const vaccination=Object.keys(req.body);
    const result=await dbp.readVaccination(vaccination);
    res.status(201).send(result);
})
.delete( (req, res)=>{
    const id=req.params.patientId;
    dbv.deleteVaccination(id);
})

router.post('/', async(req, res) => {
    console.log(req.body);
    const vaccination=Object.keys(req.body);
    const result=await dbp.readVaccination(vaccination);
    res.status(201).send(result);
});


module.exports = router;