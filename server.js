const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const users = require('./routes/apis/users');
const profile = require('./routes/apis/profile');
const posts = require('./routes/apis/posts');

const app = express();

app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

// routes
app.use('/api/users',users);
app.use('/api/profile',profile);
app.use('/api/posts',posts);

const db = require('./config/keys').mongoURI;

mongoose.connect(db).then(()=>{
    console.log('Successfully connected to the database');
},()=>{
    console.log('Error connecting database');
});

const port = process.env.PORT || 3001;

// app.get('/',(req,res)=>{
//     res.send('Hello People!');
// });

app.use(passport.initialize());

require('./config/authenticate/authenticate')(passport);


app.listen(port,()=>console.log(`Server Running on port ${port}`));