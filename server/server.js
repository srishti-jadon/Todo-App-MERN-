const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const path = require("path");

const todoRoutes =  require("./routes/todo.routes");

const app = express();

//usages
app.use(express.json());
app.use(express.urlencoded({ extended :true}));
app.use(bodyParser.json());

// TOKEN AUTHENTICATION- ALL THE ROUTES WRITTEN BELOW THIS WILL NEED TOKEN TO BE SENT in request headers
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept, Authorization'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET,PUT, POST, PATCH, DELETE');
    next();
});

//use routes
app.use("/api/todo", todoRoutes);

mongoose
    .connect("mongodb://127.0.0.1:27017/todoApp" , {
        useUnifiedTopology: true,
        useNewUrlParser:true,
        useCreateIndex:true
    })
    .then(()=> {
        console.log("server has started!!");
        app.listen(5000);
    })
    .catch(err => {
        console.log(err);
    });

