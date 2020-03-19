
const {Task} = require("../models/task.model")

module.exports.createTask = (req,res) => {
    const {taskName, taskDate} = req.body;
    Task.create({
        taskName,
        taskDate
    })
        .then(task => res.json(task))
        .catch(err => res.json(err))
}

module.exports.getAll = (req,res) => {
    Task.find().sort({taskDate:1})
    .then(tasks => res.json(tasks))
    .catch(err => res.json(err))
}

module.exports.getOne = (req,res) => {
    Task.findOne({_id:req.params.id})
    .then(task => res.json(task))
    .catch(err => res.json(err))
}

module.exports.updateTask = (req,res) => {
    Task.updateOne({_id: req.params.id}, req.body, {runValidators: true})
    .then(updateTask => res.json(updateTask))
    .catch(err => res.json(err))
}

module.exports.deleteTask = (req,res) => {
    Task.deleteOne({_id: req.params.id})
    .then(deleteTask => res.json(deleteTask))
    .catch(err => res.json(err));
}