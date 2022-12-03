require('dotenv').config();

const express = require('express');
const cors = require('cors')
const mongoose = require('mongoose');
const workoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');

//express app. you can call the app whatever you like;
const app = express();

//middlewares
app.use(cors());
app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
})

//routes
app.use('/api/workouts',workoutRoutes);
app.use('/api/user',userRoutes);

//connect to mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(()=>{
        //listen for request after connection to db is succussful
        app.listen(process.env.PORT,()=>{
            console.log('connected to db & listening on port', process.env.PORT);
        });
    })
    .catch((error)=>{
        console.log(error);
    })

// you can run the server using 'node server.js' but the best way is using
// nodemon because it automatically updates any changes on the server code.
// you can also run it from package.json script .. "npm run dev"
