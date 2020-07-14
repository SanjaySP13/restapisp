const TrainerModel=require("../model/index").trainer;
const assert=require("assert");
const { response } = require("express");

module.exports={
    allTrainers:(req,res)=>{
        //read  all trainer
        TrainerModel.find((err,response)=>{
            if(err) assert.equal(err,null);
            res.json(response);
        });
    },
    createTrainer:(req,res)=>{
        //adding new trainer to db
        let trainer=new TrainerModel(req.body);

        trainer.save().then((response)=>{
            res.status(200).json({code:200,message:"Trainer Created"});
        })
        .catch((err)=>{
            res.status(200).json({code:301,message:"unable to save trainer"});
        });
    },
    showTrainer:(req,res)=>{
        //viewing single trainer info
        let id=req.params.id;
        TrainerModel.findById({_id:id},(err,data)=>{
            if(err) assert.equal(err,null);
            res.json(data);
        });
    },
    updateTrainer:(req,res)=>{
        let id=req.params.id; //read id from url address

        let trainer =new TrainerModel(req.body);

        TrainerModel.findByIdAndUpdate({_id:id},trainer,(err,response)=>{
            if(err) {
                assert.equal(err,null);
                res.status(200).json({code:301,message:"Unable to trainer"});
            }
            else{
                res
                .status(200)
                .json({code:200,message:"successfully updated trainer"});
            }
        });

        
    },
    deleteTrainer:(req,res)=>{
        let id=req.params.id;

        TrainerModel.findByIdAndDelete({_id:id},(err,response)=>{
            if(err){
                assert.equal(null,err);
                res.status(200).json({code:301,message:"Unable to delete"});
            }else{
                res.status(200).json({code:200,message:"Trainer deleted successfully"})
            }
        })
    },
};
