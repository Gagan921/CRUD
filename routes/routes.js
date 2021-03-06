const express = require("express");
const Joi = require('joi');
const res = require('express/lib/response');

const courses = require("./Data/courses");
const app = express();

app.get('/',(req,res)=>{
    res.send('Hello World');
})
app.get('/api/courses',(req,res)=>{
    res.send(courses);
})
app.post('/api/courses',(req,res)=>{
    const result = validateCourse(req.body);

    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
    const course={
        id: courses.length+1,
        name:req.body.name
    };
    courses.push(course);
    res.send(course);
})

app.get('/api/courses/:id',(req,res)=>{
let course = courses.find(c=>c.id===parseInt(req.params.id))
if(!course) res.status(404).json({message:'course not found'});
else{
    res.send(course)
}
})
app.put('/api/courses/:id',(req,res)=>{
    let course = courses.find(c=>c.id===parseInt(req.params.id))
    if(!course) res.status(404).json({message:'course not found'});
    else{
        res.send(course)
    }
    const result = validateCourse(req.body);
    if(result.error){
        res.status(400).send(result.error.details[0].message);
        return;
    }
   course.name = req.body.name;
   res.send(course);
    })
  function validateCourse(course){
    const schema = {
        name:Joi.string().min(3).required()
    };
    return Joi.validate(course,schema);
  
  } 

    
app.get('/api/posts/:year/:month',(req,res)=>{
    res.send(req.params);
    //res.send(req.query);

    
})
app.delete('/api/courses/:id',(req,res)=>{
    let course = courses.find(c=>c.id===parseInt(req.params.id))
    if(!course) res.status(404).json({message:'course not found'});
    const index =  courses.indexOf(course);
    courses.splice(index,1);
    res.send(course);
})
module.exports=app;
