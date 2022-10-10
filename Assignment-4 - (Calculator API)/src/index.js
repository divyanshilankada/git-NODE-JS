const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 3000
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

app.get("/", (req, res) => {
    res.send("Hello World")
});

app.get("*", (req,res) => {

    res.status(404).json({
        status:"Failure",
        message:"API not found"
    })
});


const validate = (num1, num2, result) => {

    const error = {};

    if(isNaN(num1) || isNaN(num2) || isNaN(result))
    {
        error.status = "error";
        error.message = "Invalid data types"

        return error;
    }
    else if(num1 < -1000000 || num2 < -1000000 || result < -1000000)
    {
        error.status = "error";
        error.message = "Underflow"

        return error;
    }
    else if(num1 > 1000000 || num2 > 1000000 || result > 1000000)
    {
        error.status = "error";
        error.message = "Overflow"

        return error;
    }
    else
    {
        return 0;
    }
}

app.post("/add", (req,res) => {

    let num1 = req.body.num1;
    let num2 = req.body.num2;

    let result = Number(num1) + Number(num2);
    let error = validate(Number(num1), Number(num2), result);


    if(error !== 0)
    {
        res.status(400).json(error);
    }
    else if(error === 0)
    {
        res.status(200).json({
            status: "success",
            message: "The sum of given two numbers",
            result: result
        })
    }
    
});

app.post("/sub", (req,res) => {

    let num1 = req.body.num1;
    let num2 = req.body.num2;

    let result = Number(num1) - Number(num2);
    let error = validate(Number(num1), Number(num2), result);


    if(error !== 0)
    {
        res.status(400).json(error);
    }
    else if(error === 0)
    {
        res.status(200).json({
            status: "success",
            message: "The sum of given two numbers",
            result: result
        })
    }
    
});

app.post("/multiply", (req,res) => {

    let num1 = req.body.num1;
    let num2 = req.body.num2;

    let result = Number(num1) * Number(num2);
    let error = validate(Number(num1), Number(num2), result);


    if(error !== 0)
    {
        res.status(400).json(error);
    }
    else if(error === 0)
    {
        res.status(200).json({
            status: "success",
            message: "The sum of given two numbers",
            result: result
        })
    }
    
});

app.post("/divide", (req,res) => {

    let num1 = req.body.num1;
    let num2 = req.body.num2;

    if(Number(num2) === 0)
    {
        res.status(400).json({
            status : "error",
            message : "Cannot divide by zero"
        })
    }
    else
    {
        let result = Number(num1) / Number(num2);
        let error = validate(Number(num1), Number(num2), result);


        if(error !== 0)
        {   
            res.status(400).json(error);
        }
        else if(error === 0)
        {
            res.status(200).json({
                status: "success",
                message: "The sum of given two numbers",
                result: result
            })
        }
    }

    
    
});

app.listen(port, () => console.log(`App listening on port ${port}!`));

module.exports = app;