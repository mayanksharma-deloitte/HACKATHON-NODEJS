// Requiring module
const express = require('express');

const {connectDB}=require('./utils/db.js');
const authRoutes=require('./routes/authRoutes.js');

// Creating express object
const app = express();

connectDB();


// Middleware
app.use(express.json());

// Routes
app.use('/auth', authRoutes);


// Handling GET request
app.get('/', (req, res) => {
	res.send('A simple Node App is '
		+ 'running on this server')
	res.end()
})

// Port Number
const PORT = process.env.PORT ||5000;






// Server Setup
app.listen(PORT,console.log(
`Server started on port ${PORT}`));
