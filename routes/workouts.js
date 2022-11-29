const express = require('express');
const { 
    getWorkout,
    getWorkouts,
    createWorkout,
    updateWorkout,
    deleteWorkout } = require('../controllers/workoutController')

const requireAuth = require('../middleware/requireAuth')

const router = express.Router();

router.use(requireAuth);

//Get all workouts
router.get('/',getWorkouts);

//Get/Read a single workout
router.get('/:id',getWorkout);

//POST/Create a new Workout
router.post('/', createWorkout);

//Delet a new Workout
router.delete('/:id',deleteWorkout);
//Update a new Workout
router.patch('/:id',updateWorkout);

module.exports = router;