const express = require('express');
const router = express.Router();

const bcrypt = require('bcrypt');
const Player = require('../models/players');
const {body, validationResult} = require('express-validator');



router.get('/', async (req, res) => {

    try{

        const player = await Player.find();
        res.json({
            status:"Success",
            message:player
        });
    }
    catch(e){
        res.status(400).json({
            status:"Fail",
            message:e.message
        })
    }

});

router.post('/', body('player_id').isEmail(), body('password').isLength({min:5, max:15}), async (req, res) => {


    try{

        if(req.body.password)
        {
            const errors = validationResult(req);

            if(!errors.isEmpty())
            {
                return res.status(400).json({ errors: errors.array() });
            }
            else
            {
                bcrypt.hash(req.body.password, 10, async function(err, hash) {
                    // Store hash in your password DB.

                    if(err)
                    {
                        return res.status(400).json({status:"Error", message:err.message});
                    }
                    else
                    {

                        const playerExists = await Player.find({player_id:req.body.player_id});

                        if(playerExists.length !== 0)
                        {
                            return res.status(400).json({status:"Error", message:"Player id exists"});
                        }

                        const player = await Player.create({
                            player_id: req.body.player_id,
                            password:hash,
                            age: req.body.age,
                            country: req.body.country, 
                            installed_days: req.body.installed_days, 
                            coins: req.body.coins, 
                            gems: req.body.gems, 
                            game_level: req.body.game_level, 
                            purchaser: req.body.purchaser
                        });

                        res.status(200).json({
                            status:"Registration Success",
                            message:player
                        });

                    }
                });
            
            }
        }
        else
        {
            return res.status(400).json({status:"Error", message:"Password field is missing"});
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
