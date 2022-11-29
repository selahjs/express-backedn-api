const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const workout = require('./workoutModel');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    email:{
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true 
    }
    
})

userSchema.statics.signup = async function(email, password){
    
    if(!email || !password){
        throw Error('Email and Password can not be empty')
    }
    if(!validator.isEmail(email)){
        throw Error('Email is not valid!')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not Strong enough!')
    }

    const exists = await this.findOne({email});

    if(exists){
        throw Error('email already in use')
    }
    
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const user = await this.create({email,password:hash});

    return user;
}

userSchema.statics.login = async function(email, password){
    if(!email || !password){
        throw Error('Email and Password can not be empty')
    }

    const user = await this.findOne({email});

    if(!user){
        throw Error('The email account is not registerd');
    }

    //the bcrypt.compare method returns true/false depending on the condition
    const match = await bcrypt.compare(password, user.password);

    if(!match){
       throw Error('Incorrect Password'); 
    }

    return user;
}

module.exports = mongoose.model('User', userSchema);

