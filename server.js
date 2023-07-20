// Requiring module
const express = require('express');

// Creating express object
const app = express();

// Handling GET request
app.get('/', (req, res) => {
	res.send('A simple Node App is '
		+ 'running on this server')
	res.end()
})

// Port Number
const PORT = process.env.PORT ||5000;



// const { MongoClient, ServerApiVersion } = require('mongodb');
// const connectionString = "mongodb+srv://nodejs:helloworld@cluster0.zwfh3di.mongodb.net/?retryWrites=true&w=majority";

// async function addData() {
//     try {
//       // Connect to the MongoDB Atlas cluster
//       const client = await MongoClient.connect(connectionString, {
//         useNewUrlParser: true,
//         useUnifiedTopology: true,
//       });
  
//       // Access a test collection to insert data
//       const collection = client.db().collection('testCollection');
  
//       // Data to be inserted into the collection
//       const data = [
//         { name: 'John Doe', age: 30, city: 'New York' },
//         { name: 'Jane Smith', age: 25, city: 'Los Angeles' },
//         { name: 'Bob Johnson', age: 40, city: 'Chicago' },
//       ];
  
//       // Insert the data into the collection
//       const insertResult = await collection.insertMany(data);
  
//       console.log('Data inserted successfully:');
//       console.log(insertResult);
  
//       // Close the connection
//       await client.close();
//     } catch (error) {
//       console.error('Error connecting to MongoDB Atlas:', error);
//     }
//   }
  
//   addData();




// Server Setup
app.listen(PORT,console.log(
`Server started on port ${PORT}`));
