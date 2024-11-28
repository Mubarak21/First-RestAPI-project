const express = require('express');
const app = express();
const mongoose = require('mongoose');
const userRoutes = require('./routes/users');  // Ensure this file exists and exports a router
const bookRoutes = require('./routes/Books');  // Ensure this file exists and exports a router
const borrowRoutes = require('./routes/Borrow');
const errorHandler = require('./middleware/errorHandler');

app.use(express.json());

app.use(errorHandler)
app.use('/users', userRoutes);
app.use('/books', bookRoutes);  
app.use('/borrow',borrowRoutes)

app.use((req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error); 
});


app.use((error, req, res, next) => {  
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

// MongoDB connection
mongoose.connect(
    "mongodb+srv://Mubaraka:Mu01bM7we98!@node-rest-shop.8hlxq.mongodb.net/yourDatabaseName?retryWrites=true&w=majority&appName=node-rest-shop",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
    .then(() => {
        console.log('Connected to MongoDB successfully');
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
    });

module.exports = app;
