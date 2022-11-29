const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

//get single workout
const getWorkout = async (req, res) =>{
    const {id} = req.params;

    //check if the id is valid
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'});
    }

    const workout = await Workout.findById(id);

    if(!workout){
        return res.status(404).json({error: 'No such workout'});
    }
    res.status(200).json(workout);


}
//get all workouts
const getWorkouts = async (req, res) =>{
    const user_id = req.user._id
    //we live the find object to get all docs
    //to get a single doc eg: find({reps:20}) --> find all workouts with reps count 20
    try{
        const workout = await Workout.find({user_id}).sort({title: 1});//sort by created date descending/newest at top 
        res.status(200).json(workout);
    }catch(error){
        res.status(400).json({error:error.message})
    }
}

//create a new workout
const createWorkout = async(req, res) =>{
    const {title, reps, load} = req.body;

    let emptyFields = [];

    if(!title){
        emptyFields.push('title')
    }

    if(!reps){
        emptyFields.push('reps')
    }

    if(!load){
        emptyFields.push('load')
    }

    if(emptyFields.length > 0){
        return res.status(400).json({error: 'please fill in all the fields',emptyFields})
    }
    
    //add doc to db
    try{
        const user_id = req.user._id
        const workout = await Workout.create({title, reps, load, user_id});
        res.status(200).json(workout);
    }catch(error){
        res.status(400).json({error:error.message});
    }
}

//delete a workout
const deleteWorkout = async (req, res) =>{
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'});
    }
    const workout = await Workout.findOneAndDelete({_id: id});

    if(!workout){
        return res.status(404).json({error: 'No such workout'});
    }
    res.status(200).json(workout);

}

//update workout
const updateWorkout = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'No such workout'});
    }

    const workout = await Workout.findOneAndUpdate({_id: id},{
        ...req.body //check whatever data sent from the client then spread 
        //eg: title: 'abc' --> title : req.body.title
    });

    if(!workout){
        return res.status(404).json({error: 'No such workout'});
    }
    res.status(200).json(workout);

}

module.exports = {
    getWorkout,
    getWorkouts,
    createWorkout,
    updateWorkout,
    deleteWorkout
}