// Import required modules
const express = require('express');
const fs = require('fs');
const path = require('path');//import path module
const connectToDatabase = require('./db'); // Import the database connection function
const cors = require('cors');

// Create an instance of the express application
const app = express();
// Enable CORS for all origins
app.use(cors());
// Define the port the server will listen on
const port = 3000;

// Middleware tono parse JSON request bodies
app.use(express.json());

// Path to the users.json file
const usersFilePath = path.join(__dirname, 'users.json');
// Function to read users from the users.json file
const readUsers = () => {
  try {
    const data = fs.readFileSync(usersFilePath);
    return JSON.parse(data);
  } catch (err) {
    return [];
  }
};
// Function to write users to the users.json file
const writeUsers = (users) => {
  fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
};

// Route handler for the root path
app.get('/', (req, res) => {
  res.send('Hello World!');
});
//calling the function connect to database
connectToDatabase()

app.post('/signup', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send('Username and password are required.');
  }

  const users = readUsers();
  if (users.find(user => user.username === username)) {
    return res.status(409).send('Username already exists.');
  }

  const newUser = { username, password };
  users.push(newUser);
  writeUsers(users);
  res.status(201).send('User created successfully.');
});

// Define the /dashboard route
app.get('/dashboard', (req, res) => {
  //generate the data for the dashboard
   const dashboardData = [
     {
       name: "corn",
       water_level: Math.floor(Math.random() * 101) // Generate a random number between 0 and 100
     },
     {
       name: "wheat",
       water_level: Math.floor(Math.random() * 101) // Generate a random number between 0 and 100
     },
     {
       name: "soybean",
       water_level: Math.floor(Math.random() * 101) // Generate a random number between 0 and 100
     }
   ];
     //if the data is generated correctly, send the response
      res.status(200).json(dashboardData); // Respond with the dashboard data in JSON format
});

// Define the /dashboard-history route
app.get('/dashboard-history', async (req, res) => {
    try {
        // Find all the documents in the DashboardData collection
        const history = await DashboardData.find({});
        // Respond with the history data in JSON format
        res.status(200).json(history);
    } catch (err) {
        // Log the error if an error occurs while retrieving the history data
        console.error('Error retrieving dashboard history:', err);
        // Send a 500 error response
        res.status(500).send('Error retrieving dashboard history');
    }
});
// Define the /firstpage route
app.get('/firstpage', async (req, res) => {
  // Create an object with the specified format
  const firstPageData = {
    message: "Welcome to Smart Irrigation", // A sample message
    img: "https://via.placeholder.com/500", // A sample image URL (you can replace it with a real one)
    description: "Smart Irrigation is the future of agriculture." // A sample description
  };
    try{
  } catch (err) {
    console.error('Error saving first page data:', err); // Log the error if saving fails
    return res.status(500).send('Error saving first page data'); // Send a 500 error response
  }
  res.status(200).json(firstPageData); // Respond with the first page data in JSON format
}); 

// Define the /firstpage-history route
app.get('/firstpage-history', async (req, res) => {
  try {
      // Find all the documents in the FirstPageData collection
      const history = await FirstPageData.find({});
      // Respond with the history data in JSON format
      res.status(200).json(history);
  } catch (err) {
      // Log the error if an error occurs while retrieving the history data
      console.error('Error retrieving first page history:', err);
      // Send a 500 error response
      res.status(500).send('Error retrieving first page history');
  }
}); 
// Define the /secondpage route
app.get('/secondpage', async (req, res) => {
    // Create an array of objects with the specified format
    const secondPageData = [
      {
        name: "corn",
        status: Math.random() < 0.5 ? "ON" : "OFF" // Randomly assign ON or OFF
      },
      {
        name: "wheat",
        status: Math.random() < 0.5 ? "ON" : "OFF" // Randomly assign ON or OFF
      },
      {
        name: "soybean",
        status: Math.random() < 0.5 ? "ON" : "OFF" // Randomly assign ON or OFF
      }
    ];
      res.status(200).json(secondPageData); // Respond with the second page data in JSON format
});

// Define the /secondpage-history route
app.get('/secondpage-history', async (req, res) => {
  try {
      // Find all the documents in the SecondPageData collection
      const history = await SecondPageData.find({});
      // Respond with the history data in JSON format
      res.status(200).json(history);
  } catch (err) {
      // Log the error if an error occurs while retrieving the history data
      console.error('Error retrieving second page history:', err);
      // Send a 500 error response
      res.status(500).send('Error retrieving second page history');
  }

});
// Define the /thirdpage route
app.get('/thirdpage', (req, res) => {
  // Create an array of objects with the specified format
  const thirdPageData = [
    {
      name: "temperature",
      value: Math.floor(Math.random() * 101) // Generate a random number between 0 and 100
    },
    {
      name: "humidity",
      value: Math.floor(Math.random() * 101) // Generate a random number between 0 and 100
    },
    {
      name: "soil humidity",
      value: Math.floor(Math.random() * 101) // Generate a random number between 0 and 100
    }
  ];
    //if the data is generated correctly, send the response
  res.status(200).json(thirdPageData); // Respond with the third page data in JSON format
});
// Define the /thirdpage-history route
app.get('/thirdpage-history', async (req, res) => {
    try {
        // Find all the documents in the ThirdPageData collection
        const history = await ThirdPageData.find({});
        // Respond with the history data in JSON format
        res.status(200).json(history);
    } catch (err) {
        // Log the error if an error occurs while retrieving the history data
        console.error('Error retrieving third page history:', err);
        // Send a 500 error response
        res.status(500).send('Error retrieving third page history');
    }
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    return res.status(400).send();
  }

  const users = readUsers();
  const user = users.find(user => user.username === username && user.password === password);
  if (!user) {
    return res.status(401).send();
  }
  res.status(200).send();
});
// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});