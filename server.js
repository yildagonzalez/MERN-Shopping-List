const express = require('express');
const mongoose = require('mongoose'); // database ORM to interact with Mongo
const path = require('path');
const config = require('config');

// initialize express
const app = express();

// bodyParser middleware
app.use(express.json());

// mongoDB URI
// DB config
const db = config.get('mongoURI');

// connect to mongoDB
mongoose
.connect(db,{ useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

// Use routes
app.use('/api/items', require('./routes/api/items')); // anything that goes to this route, should reffer to the items variable
app.use('/api/users', require('./routes/api/users')); // anything that goes to this route, should reffer to the items variable
app.use('/api/auth', require('./routes/api/auth')); // anything that goes to this route, should reffer to the items variable

// Serve static assets (build folder) if in production
if(process.env.NODE_ENV == 'production') {
    // set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}

// Heroku config
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));


