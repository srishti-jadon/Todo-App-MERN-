"use strict"

const HttpResponse = require("../models/http-response");
const Todo = require("../models/todoModel");

const showAllTask = async(req,res) => {
    let todoList ;
    try {
        todoList = await Todo.find({ isDeleted : false})
    }
    catch(err){
        const error = new HttpResponse(
            "Failed fetching data, please try again later. ",
            500
        );
        return res.status(500).json({result : error});
    }
    return res.json({todoList});
}

const showCompletedTask = async(req,res) => {

    let todoList;
    try{
        todoList =  await Todo.find({isCompleted : true})
    }
    catch(err){
        const error = new HttpResponse(
            "Failed fetching data, please try again later",
            500
        )
        return res.status(500).json({result : error})
    }
    return res.status(200).json({todoList});
}

const showPendingTask = async (req,res) => {

    let todoList;
    try{
        todoList =  await Todo.find({isCompleted : false})
    }
    catch(err){
        const error = new HttpResponse(
            "Failed fetching data, please try again later",
            500
        )
        return res.status(500).json({result : error})
    }
    return res.status(200).json({todoList});
}

const addTask = async(req,res) => {

    const data = req.body;
    console.log(data);

    var createdTask;
    createdTask = new Todo(data) ;
    console.log("data inserted");

    try{
        await createdTask.save();
    }
    catch(err){

        const error = new HttpResponse(
           "Failed to add task, try again !!",
            500
        );
        return res.status(500).json({response : error})
    }
    res.status(201).json({
        data
    });
}

const delete_edit_markTask = async(req,res) => {
    const id = req.params.id;
    console.log(id);

    const data = req.body;

    try{
        await Todo.findByIdAndUpdate(id, data);
        console.log(data);
        res.status(200).send({success:true})
    }
    catch(err){
        res.status(500).send({success :false})
    }
}

exports.addTask = addTask;
exports.delete_edit_markTask = delete_edit_markTask;
exports.showAllTask = showAllTask;
exports.showCompletedTask = showCompletedTask;
exports.showPendingTask = showPendingTask;