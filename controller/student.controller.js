const StudentModel=require("../model/index").student;
const assert=require("assert");
const { response } = require("express");

module.exports={
    allStudents:(req,res)=>{
        //read  all students
        StudentModel.find((err,response)=>{
            if(err) assert.equal(err,null);
            res.json(response);
        });
    },
    createStudent:(req,res)=>{
        //adding new student to db
        let student=new StudentModel(req.body);

        student.save().then((response)=>{
            res.status(200).json({code:200,message:"Student Created"});
        })
        .catch((err)=>{
            res.status(200).json({code:301,message:"unable to save student"});
        });
    },
    showStudent:(req,res)=>{
        //viewing single student info
        let id=req.params.id;
        StudentModel.findById({_id:id},(err,data)=>{
            if(err) assert.equal(err,null);
            res.json(data);
        });
    },
    updateStudent:(req,res)=>{
        let id=req.params.id; //read id from url address

        let student =new StudentModel(req.body);

        StudentModel.findByIdAndUpdate({_id:id},student,(err,response)=>{
            if(err) {
                assert.equal(err,null);
                res.status(200).json({code:301,message:"Unable to update"});
            }
            else{
                res
                .status(200)
                .json({code:200,message:"successfully updated student"});
            }
        });

        
    },
    deleteStudent:(req,res)=>{
        let id=req.params.id;

        StudentModel.findByIdAndDelete({_id:id},(err,response)=>{
            if(err){
                assert.equal(null,err);
                res.status(200).json({code:301,message:"Unable to delete"});
            }else{
                res.status(200).json({code:200,message:"student deleted successfully"})
            }
        })
    },
};
