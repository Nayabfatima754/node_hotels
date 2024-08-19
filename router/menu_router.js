const express = require('express');
const router = express.Router();
const MenuItem = require('./../models/menuItem') // Use PascalCase for model


router.post('/', async (req, res) => { // Fixed route path
    try {
      const data = req.body;
      const menuItem = new MenuItem(data); // Use PascalCase for model instance
      const response = await menuItem.save();
      console.log('Data saved');
      res.status(200).json(response);
    } catch (err) {
      console.log(err);
      res.status(500).json({ err: "Internal server error" });
    }
  });
  router.get('/',async(req,res)=>{
    try{
        const data = await MenuItem.find();
        console.log('sucesess fetched')
        res.status(200).json(data)
    }catch(err){
      console.log(err);
      res.status(500).json({ err: "Internal server error" });
    }
  });

  router.get('/:taste', async(req,res)=>{   
    const taste_type = req.params.taste;
    try{
        if(taste_type=='spicy'|| taste_type=='sweet'|| taste_type=='sour'){
            const response = await MenuItem.find({taste: taste_type})
            console.log('response fateched');
            res.status(200).json(response);
        }else{
            res.status(404).json({err:'invalied taste'});
        }

    }catch(err){
        console.log(err);
        res.status(500).json({err:"internal server error"})
    }

    }
  );
  router.put('/:id', async(req,res) => {
    try{
        const menuId = req.params.id;
        const  updateMenu = req.body;
        const response = await MenuItem.findByIdAndUpdate(menuId,updateMenu,{

        
        new:true,
        runValidators:true
    });
        if(!response){
            return res.status(404).json('menu not find');
        }
        console.log('menu updated');
        res.status(200).json(response)
    }
    catch(err){
        
    }
  });
  router.delete('/:id',async(req,res)=>{
    try{
        const menuId = req.params.id;
        const response = await MenuItem.findByIdAndDelete(menuId);
        if(!response){
            return res.status(404).json({err:'item not found'});
        }
        console.log('menu updated');
        res.status(200).json('item deleted successfully') 
    }catch(err){
        console.log(err);
        res.status(500).json({err:"internal server error"})
    }
  })
  module.exports=router;
  //comment addes for testing purpose