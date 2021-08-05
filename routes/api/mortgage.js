const express = require("express");
const router = express.Router();
const data = require("../../Data");

// Calculate mortgage
router.post("/", (req, res) => {
  console.log("hello");

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

  function calculateData(data) {
    const totalMonths = data.term * 12;
    const monthlyInterest = (data.interest / 100) / 12;
    const monthlyPrincipalInterest =
    //   data.principal *
    //   ((monthlyInterest * (1 + monthlyInterest) ** totalMonths) /
    //     ((1 + monthlyInterest) ** totalMonths - 1));
        data.principal *
        (
            ( monthlyInterest * ((1 + monthlyInterest )**totalMonths)) /
            ((1+monthlyInterest)**totalMonths - 1)
        )   
        console.log("*******monthlyPrincipalInterest********");
        console.log(monthlyPrincipalInterest);
        console.log("*******monthlyPrincipalInterest********");

    data.monthly = monthlyPrincipalInterest;
  }

  
  console.log("*******old********");
  console.log(data);
  console.log("*******old********");
  
  //   set data state
  data.principal = Number(req.body.principal);
  data.term = Number(req.body.term);
  data.interest = Number(req.body.interest);
  
  calculateData(data);

  console.log("*******New********");
  console.log(data);
  console.log("*******New********");

//   const p = data.principal;
//   console.log("Mortgage: " + p);
//   const t = data.term * 12;
//   console.log("Terms: " + t);
//   const i = data.interest / 100;
//   console.log("Interest: " + i);
//   // p * ( (i * (1+i)**t )/ ((1+i)**t) - 1)

  //   const m = p * (i * (1 + i)** t) / ((1 + i)** t - 1);

  // let m = ((1+i)**t )- 1
//   let m = (p * (i * (1 + i) ** t)) / ((1 + i) ** t - 1);
//   console.log("Monthly " + m);

  //   data.principal = p;
  //   data.term = t;
  //   data.intrest =
  

  console.log("***************");
  console.log(data);
  console.log("***************");

  res.redirect("/");
});

module.exports = router;
