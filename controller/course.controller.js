const CourseModel=require("../model/index").course;
const assert=require("assert");
const { response } = require("express");

module.exports={
    allCourse:(req,res)=>{
        //read  all courses
        CourseModel.find((err,response)=>{
            if(err) assert.equal(err,null);
            res.json(response);
        });
    },
    createCourse:(req,res)=>{
        //adding new course to db
        let course=new CourseModel(req.body);

        course.save().then((response)=>{
            res.status(200).json({code:200,message:"Course Created"});
        })
        .catch((err)=>{
            res.status(200).json({code:301,message:"unable to save course"});
        });
    },
    showCourse:(req,res)=>{
        //viewing single course info
        let id=req.params.id;
        CourseModel.findById({_id:id},(err,data)=>{
            if(err) assert.equal(err,null);
            res.json(data);
        });
    },
    updateCourse:(req,res)=>{
        let id=req.params.id; //read id from url address

        let course =new CourseModel(req.body);

        CourseModel.findByIdAndUpdate({_id:id},course,(err,response)=>{
            if(err) {
                assert.equal(err,null);
                res.status(200).json({code:301,message:"Unable to update"});
            }
            else{
                res
                .status(200)
                .json({code:200,message:"successfully updated course"});
            }
        });

        
    },
    deleteCourse:(req,res)=>{
        let id=req.params.id;

        CourseModel.findByIdAndDelete({_id:id},(err,response)=>{
            if(err){
                assert.equal(null,err);
                res.status(200).json({code:301,message:"Unable to delete"});
            }else{
                res.status(200).json({code:200,message:"course deleted successfully"})
            }
        })
    },
};
