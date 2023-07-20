const mongoose = require('mongoose');

exports.connectDB = async () => {
    try {
        const connection = await mongoose.connect('mongodb+srv://nodejs:helloworld@cluster0.zwfh3di.mongodb.net/?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            
        });
        console.log(`Connected to MongoDB: ${connection.connection.host}`);
    } catch (error) {
        console.error('Error connecting to MongoDB:', error.message);
        process.exit(1);
    }
};

