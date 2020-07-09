const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const todoSchema = new Schema({

    // userId : {type :Number , default :1},
    title: {type : String},
    description : {type : String},
    deadline : {type : Date},
    isCompleted : {type : Boolean , default :false},
    isDeleted :{type : Boolean , default : false}
},
{
    timestamps : [{ createdAt : "created_at",updatedAt : "updated_at"}]
}
);

module.exports = mongoose.model("todoItems", todoSchema);