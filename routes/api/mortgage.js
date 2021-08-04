const express = require('express');
const router = express.Router();


// Calculate mortgage
router.post('/', (req, res) => {
    console.log('hello');

    // const mortgage = req.body.mortgage

    console.log(req.body);

});

module.exports = router;