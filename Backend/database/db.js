const mongoose = require('mongoose');

module.exports = () => {
    const connectionString = "mongodb://127.0.0.1:27017/binaDB"; 

    try {
        mongoose.connect(connectionString);
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.log("Could not connect to MongoDB");
        console.error(error);
    }
};
