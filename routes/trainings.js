const express = require('express');
const router = express.Router();
const Training = require('../model/training');

/***
 * Add Api
 * Method: POST
 */

router.post('/add',async (req,res,next) => {

    try{
        const training = await Training.findOne({phone: req.body.phone});
        console.log(`training ${JSON.stringify(training)}`);
        if(training){
            return res.json({
                success: false,
                message: "Data already exists."
            });
        }
        else{
            let newTraining = await Training.create(req.body);
            res.json({
                success: true,
                message: "Data added successfully",
                training: newTraining
            });
        }
    }
    catch(error){
        next(error);
    }

});

/***
 * Add Api
 * Method: GET
 */

router.get('/all',async (req,res,next) => {
    try{
        const training = await Training.find({});

    res.json({
        success: true,
        total: training.length,
        trainings: training
    });
    }catch(error){
        next(error);
    }
 
});

/***
 * Add Api
 * Method: GET
 */

 router.get('/single/:id',async (req,res,next) => {
    try{

        let training = await Training.findById(req.params.id);
        if(!training){
            res.json({
                success: false,
                message: "Not found"
                
            });    
        }else{
            res.json({
                success: true,
                training: training
                
            });   


        }
    }
    catch(error)
    {
        next(error);
    }
 
});

/***
 * Add Api
 * Method: PUT
 */

 router.put('/update/:id',async (req,res,next) => {
    try{

        let training = await Training.findById(req.params.id);
        if(!training){
            res.json({
                success: false,
                message: "Not found"
                
            });    
        }else{
            let updateTraining = await Training.findByIdAndUpdate(req.params.id,req.body,{
                new: true,
                runValidator: true
            });  
            res.json({
            success: true,
            message: "Data updated successfully.",
            training: updateTraining
            });

        } 
    }
    catch(error)
    {
        next(error);
    }
 });

 /***
 * Add Api
 * Method: Delete
 */

  router.delete('/delete/:id',async (req,res,next) => {
    try{

        let training = await Training.findById(req.params.id);
        if(!training){
            res.json({
                success: false,
                message: "Not found"
            });    
        }else{
           await training.remove();
           res.json({
               success: true,
               message: `Data with id ${req.params.id} deleted successfully.`,
               training: {}
           });

        }
    }catch(error){
        next(error);
    }

});
module.exports = router;