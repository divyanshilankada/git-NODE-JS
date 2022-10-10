const express = require("express");
const router = express.Router();
const Offer = require('../models/offers');

router.get('/', async (req, res) => {

    
    try{

        const {page = 1, records = 5, attribute = "", query = ""} = req.query;

        if(attribute !== "" && query !== "")
        {
            const offers = await Offer.find({attribute:query})//.limit( page * records);

            res.status(200).json({
                status:"Success",
                page: page,
                has_more: false,
                message:offers
            });

        }
        else
        {
            const offers = await Offer.find()//.limit( page * records);

            res.status(200).json({
                page: page,
                has_more: false,
                message:offers
            });
        }

        

    }
    catch(e){
        res.status(401).json({ 
            status:"Failed",
            message:e.message
        });
    }

});

router.post('/', async (req, res) => {

    try{

        if(req.body.offer_id)
        {
            const checkOffer = await Offer.findOne({offer_id: req.body.offer_id});

            if(!checkOffer)
            {
                const offer = await Offer.create(req.body);

                res.status(200).json({
                    status:"Success",
                    message:offer
                });
            }
            else
            {
                return res.status(400).json({status:"Error", message:"Offer id exists"});
            }
            
    
        }
        else
        {
            return res.status(400).json({status:"Error", message:"offer_id field is missing"});        
        }           

    }
    catch(e){
        res.status(401).json({ 
            status:"Failed",
            message:e.message
        });
    }

});

router.put('/:id', async (req, res) => {

    try{

        const offer = await Offer.findOne({offer_id:req.params.id});

        if(offer.offer_id === req.params.id)
        {         
            const message = await Offer.updateOne({offer_id:req.params.id},req.body);
            const offer = await Offer.findOne({offer_id:req.params.id});

            res.status(200).json({
                status:"Success",
                message:message,
                offer
            });
    
        }
        else
        {
            if(req.body.offer_id)
            {

                const offer = await Offer.create(req.body);

                res.status(200).json({
                    status:"Success",
                    message:offer
                });
        
            }
            else
            {
                return res.status(400).json({status:"Error", message:"offer_id field is missing"});        
            }          
        }           

    }
    catch(e){
        res.status(401).json({ 
            status:"Failed",
            message:e.message
        });
    }

});

router.delete('/:id', async (req, res) => {

    try{

        const offer = await Offer.findOne({offer_id:req.params.id});

        if(offer.offer_id === req.params.id)
        {         
            const message = await Offer.deleteMany({offer_id:req.params.id});

            res.status(200).json({
                status:"Success",
                message:message,
                offer
            });
    
        }
        else
        {
            return res.status(400).json({status:"Error", message:"incorrect Offer_id"});           
        }           

    }
    catch(e){
        res.status(401).json({ 
            status:"Failed",
            message:e.message
        });
    }

});

module.exports = router;