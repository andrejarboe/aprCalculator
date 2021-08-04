const express = require('express');
const router = express.Router();


// Calculate mortgage
router.post('/', (req, res) => {
    console.log('hello');

 



    // console.log(req.body);
    // console.log(mortgage);
    // console.log(term);
    // console.log(intrest);

    // want to show the monthy payments
    // ex 300,000 5% 30years
    // m = (p * r (1+r)^n)/((1+r)^n -1)
    // P = principal loan amount
    // r = monthly interest rate
    // n = number of months required to repay the loan
    // p = 300,000 
    // n = 12 * 30 = 360 
    // r = 5 /100 = 0.05 
    // m = 1,610.46
    
    const p = req.body.mortgage
    const n = req.body.term * 12
    const r = req.body.intrest / 100
    const m = (p * r * (1+r)**n)/((1+r)**n -1)

    console.log(m);



});

module.exports = router;