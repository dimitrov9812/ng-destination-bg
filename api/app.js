import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

const app = express();
dotenv.config();
const PORT = process.env.PORT;

app.use(bodyParser.json());

// Connect to database
mongoose.connect(
    `mongodb://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@destination-bg-shard-00-00.pfwdt.mongodb.net:27017,destination-bg-shard-00-01.pfwdt.mongodb.net:27017,destination-bg-shard-00-02.pfwdt.mongodb.net:27017/myFirstDatabase?ssl=true&replicaSet=atlas-ugxikq-shard-0&authSource=admin&retryWrites=true&w=majority`,
    { useUnifiedTopology: true, useNewUrlParser: true }, () => {
        console.log("HI")
    });

const connection = mongoose.connection;

connection.once("open", function() {
    console.log("MongoDB database connection established successfully");
});

// Import Routes
const authRoute = require('./routes/auth');

// Route Middlewares
app.use('/api/user', authRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});