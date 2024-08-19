const mongoose= require('mongoose');
const newItemSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    taste:{
        type:String,
        enum:['spicy','sweet','sour'],
        requird:true
    },
    is_drink:{
        type:Boolean,
        default:false


    },
    ingredients:{
        type:[String],
        default:0
    },
    num_sales:{
        type:Number,
        default:0
    }
})
const MenuItem = mongoose. model('menuItem',newItemSchema)
 
module.exports = MenuItem;
