const router = require('express').Router();
const User = require('../model/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {registerValidation} = require('../validation');



router.post('/register', async (req, res) => {

    //LET'S VALIDATE USER BEFORE CREATING
    const {error} = registerValidation(req.body);
    if(error) 
    return res.status(400).send(error.details[0].message);
   
    //Checking if the user is already exist
    const emaiilExist = await User.findOne({email: req.body.email});
    if(emaiilExist) return res.status(400).send('Email already exist');

    // Hash passwords
    const salt = await bcrypt.gentSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);



    //Create a new user
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    try{
    const savedUser = await user.save();
    res.send({ user: user._id});
    }catch(err){
        res.status(400).send(err);
    }
});

//LOGIN
router.post, ('/login'),async (req, res) => {
    //LETS VALIDATE THE DATA BEFORE WE LOGIN A USER
    const {error} = loginValidation(res.body);
    if(error) return res.status(400).send(error.details[0].message);
    //Checking if the email exists
    const user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Email or password is wrong');
    //Validate password
    const validPass = await bcrypt.compare(res.body.password, user.password);
    if(!validPass) return res.status(400).send('Invalid password');


    //Create and assign a token
    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
    res.header('auth-token',token).send(token);


    // res.send('Logged in');
}



module.exports = router;