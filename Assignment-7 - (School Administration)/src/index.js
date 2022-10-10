const express = require('express')
const app = express()
const bodyParser = require("body-parser");
const port = 8080
const students = require('./InitialData');
app.use(express.urlencoded());

// Parse JSON bodies (as sent by API clients)
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// your code goes here

let newId = students.length + 1;

app.get('/api/student', (req, res) => {
    
    try{
        res.status(200).json(students);
    }
    catch(e){
        res.status(404).send({
            status:"Failed",
            message:e.message
        })
    }

})

app.get('/api/student/:id', (req, res) => {
    
    const student = students.find((stud) => stud.id === parseInt(req.params.id));

    try{
        if(student===undefined)
        {
            res.status(404).send({
                status:"Failed",
                message:"Invalid id"
            });
        }
        else{
            res.status(200).json(student);
        }
    }
    catch(e){
        res.status(400).send({
            status:"Failed",
            message:e.message
        })
    }

})

app.post('/api/student', (req, res) => {

    try{

        if(req.body.name === undefined || req.body.currentClass === undefined || req.body.division === undefined)
        {
            res.status(400).send({
                status:"Failed",
                message:"Invalid Data"
            })
        }
        else
        {
            students.push({
                id:newId,
                name: req.body.name,
                currentClass: req.body.currentClass,
                division: req.body.division
            });

    
            res.status(200).send({
                status:"success",
                id:newId
            })

            newId++;

        }
        
    }
    catch(e){
        res.status(400).send({
            status:"Failed",
            message:e.message
        })
    }
})

app.put('/api/student/:id', (req, res) => {


    const idx = students.findIndex((stud) => stud.id === parseInt(req.params.id));

    try{
        if(idx === -1)
        {
            res.status(400).send({
                status:"Failed",
                message:"Invalid id"
            });
        }
        else{

            const flag = Object.keys(req.body).every(b => {

                if(b === "name" || b === "currentClass" || b === "division")
                {
                    return true;
                }
                else
                {
                    return false;
                }
                
            }) 


            if(flag === false)
            {
                res.status(400).send({
                    status:"Failed",
                    message:"Invalid Data"
                })
            }
            else
            {
                if(req.body.name !== undefined)
                {
                    students[idx].name = req.body.name;
                }

                if(req.body.currentClass !== undefined)
                {
                    students[idx].currentClass = req.body.currentClass;
                }

                if(req.body.division !== undefined)
                {
                    students[idx].division = req.body.division;
                }

                res.status(200).send({
                    status:"success",
                    student : students[idx]
                })
            }
        }

    }
    catch(e){
        res.status(400).send({
            status:"Failed",
            message:e.message
        })
    }
})

app.delete('/api/student/:id', (req, res) => {

    const idx = students.findIndex((stud) => stud.id === parseInt(req.params.id));

    try{
        if(idx === -1)
        {
            res.status(400).send({
                status:"Failed",
                message:"Invalid id"
            });
        }
        else{
            students.splice(idx, 1);

            res.status(200).send({
                status:"success",
                message: "Record deleted"
            })
        }
    }
    catch(e){
        res.status(400).send({
            status:"Failed",
            message:e.message
        })
    }
})

app.listen(port, () => console.log(`App listening on port ${port}!`))

module.exports = app;   