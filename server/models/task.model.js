const mongoose=require('mongoose');
// const uniqueValidator = require('mongoose-unique-validator');

const TaskSchema = mongoose.Schema({
    taskName:{
        type:String,
        required:[true, "Please enter the Project Name"],
        minlength:[3, "Project Name must be atleast 3 characters"],
        // unique:[true, "Project Name already exists"]
    },
    taskStatus:{
        type:String, 
        default:"pending"
    }, 
    taskDate:{
        type:Date,
        required:[true, "Please enter the date"]
    }
},{timestamps:true})
// TaskSchema.plugin(uniqueValidator);

module.exports.Task = mongoose.model('Task',TaskSchema);