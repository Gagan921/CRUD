const Joi = require('joi');
const express = require('express');
const res = require('express/lib/response');
const courses = require("./Data/courses");
const routes = require("./routes/routes");


const app = express();

const port = process.env.PORT||3000;
app.listen(port,()=>console.log(`Listening on port ${port}...`));
