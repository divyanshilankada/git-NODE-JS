const { Router } = require('express');
const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const Player = require('../models/players');
const {body, validationResult} = require('express-validator');

const secret = "lamda";

router.get('/', (req, res) => {
    res.send("login Route");
})

router.post('/', async (req, res) => {


    try{

        if(req.body.password && req.body.player_id)
        {
            const playerCheck = await Player.findOne({player_id:req.body.player_id});

            if(playerCheck)
            {
                bcrypt.compare(req.body.password, playerCheck.password).then(function(result) { 
                    
                    if(result)
                    {
                        const token = jwt.sign({
                            exp: Math.floor(Date.now() / 1000) + (60 * 60),
                            data: playerCheck.player_id
                          }, secret);
                          
                        res.status(200).json({
                            status:"Success",
                            message:"Login Successful",
                            token
                        });
                    }
                    else
                    {
                        return res.status(400).json({status:"Error", message:"Incorrect password"});
                    }

                });
            }
            else
            {
                return res.status(400).json({status:"Error", message:"Invalid player_id"});
            }
   
            
        }
        else
        {
            return res.status(400).json({status:"Error", message:"password/player_id field is missing"});
        }

        
    }
    catch(e)
    {
        res.status(401).json({ 
            status:"Failed",
            message:e.message
        });
    }
    
})

module.exports = router;



