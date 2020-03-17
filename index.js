'use strict';
const express = require ('express');
const app = express();

app.get('/', (req,res) => {
    res.send('HelloCSAKO')
})

app.listen(3000);
