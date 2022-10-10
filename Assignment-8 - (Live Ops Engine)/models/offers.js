const mongoose = require('mongoose');

const offersSchema = new mongoose.Schema({
    offer_id: {type:String, required:true}, 
    offer_title: String, 
    offer_description: String , 
    offer_image: String, 
    offer_sort_order:Number,
    content: Array, 
    schedule: Object, 
    target: String, 
    pricing: Array

});

const Offer = mongoose.model("Offer", offersSchema);

module.exports=Offer;