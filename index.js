const express = require('express');
const app = express(); 
const dotenv =require('dotenv');
const mongoose = require('mongoose');

//Import Routes
const authRoute = require('./routes/auth');
const postRoute = require('./routes/posts');
const { connect } = require('./routes/auth');

dotenv.config();
//Connect to DB
// mongoose.connect(process.env.DB_CONNECT,
//     //  { useNewUrlParser: true},
//     { useUnifiedTopology: true ,
//          useNewUrlParser: true} , 
//     () =>
//     console.log('connected to db!')
// );
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true},
      { useUnifiedTopology: true ,
         useNewUrlParser: true})
         .then(() => console.log("Database Connected"))
         .catch(err => console.log(err));

mongoose.connection
.once("open",() => console.log("Connected"))
.on('error', (error) => {
console.log("Your Error", error)
});



//Middleware
app.use(express.json()); 

//Routes Middlewares
app.use('/api/user', authRoute);
app.use('/api/posts', postRoute);


app.listen(3000, () => console.log('Server up and running'));