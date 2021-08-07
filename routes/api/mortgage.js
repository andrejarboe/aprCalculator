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
  // r = interest rate / 100 / 12
  // n = number of months required to repay the loan
  // p = 300,000
  // n = 12 * 30 = 360
  // r = 5 /100 = 0.05
  // m = 1,610.46

  function calculateMonthlyPayments(data) {
    const totalMonths = data.term * 12;
    const monthlyInterest = data.interest / 100 / 12;
    const monthlyPrincipalInterest =
      data.principal *
      ((monthlyInterest * (1 + monthlyInterest) ** totalMonths) /
        ((1 + monthlyInterest) ** totalMonths - 1));
    console.log("*******monthlyPrincipalInterest********");
    console.log(monthlyPrincipalInterest);
    console.log("*******monthlyPrincipalInterest********");

    data.monthly = Number(monthlyPrincipalInterest.toFixed(2));
  }

  function calculateTotalPayments(data) {
    const totalMonths = data.term * 12;

    data.totalPayment = totalMonths * data.monthly;
  }

  function calculateTotalInterest(data) {
    data.totalInterest = data.totalPayment - data.principal;
  }

  function calculateAPR(data) {
    /*
        APR = ((Interest + Fees / Loan amount) / Number of days in loan term)) x 365 x 100
        in our case we are doing a mortgage with 12 periods so we can use:
        APR = ((Interest + Fees / Loan amount) / 12 periods)) x 100
      */
    // const totalFees = 0;
    // const loanAPR =     (( ((data.totalInterest + totalFees) / data.principal ) / 30.416 ) * 365 )* 100;

    const p = data.principal + data.fees;
    const n = data.term * 12;



  // i = data.interest / 100 / 12
  function monthlyPayment(i) {
    return p * i * Math.pow(1 + i, n)/(Math.pow(1 + i, n) - 1) - data.monthly
  }



  function monthlyPaymentPrime(i) {
    return (
      p *
      (Math.pow(1 + i, n) / (-1 + Math.pow(1 + i, n)) -
        (n * i * Math.pow(1 + i, -1 + 2 * n)) /
          Math.pow(-1 + Math.pow(1 + i, n), 2) +
        (n * i * Math.pow(1 + i, -1 + n)) /
          (-1 + Math.pow(1 + i, n)))
    );
  }

  // guess and check based on Newtons formula
  let guess = 0.001 / 12;
  let nextGuess;

  for (let i = 0; i < 20; i++) {
    // let nextGuess = guess - monthlyPayment(guess) / monthlyPaymentPrime(guess);
    // console.log(nextGuess);
    // guess = nextGuess;
    nextGuess = guess;
    guess = nextGuess - monthlyPayment(nextGuess) / monthlyPaymentPrime(nextGuess);
    diff = guess-nextGuess;
    console.log("new guess" + guess + " diff  is " + diff)

  }



apr = Math.round(guess * 12 * 10000)/100 
data.apr = apr;

console.log(data);


  
}

  console.log("*******old********");
  console.log(data);
  console.log("*******old********");

  //   set data state
  data.principal = Number(req.body.principal);
  data.term = Number(req.body.term);
  data.interest = Number(req.body.interest);
  data.fees = Number(req.body.fees);


  calculateMonthlyPayments(data);
  calculateTotalPayments(data);
  calculateTotalInterest(data);
  
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
  
  calculateAPR(data)
  res.redirect("/");
});

module.exports = router;
