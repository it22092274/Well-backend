import express from 'express';
import connectDB from '../config/db';
import loginRoute from './auth/login';  // Import routes using ES6 syntax
import signupRoute from './auth/signup'; // Import routes using ES6 syntax

// Initialize the database
connectDB();

const app = express();
app.use(express.json()); // Use express.json() for parsing JSON

// Use routes
app.use('/api/login', loginRoute);  // Mount the login route
app.use('/api/signup', signupRoute); // Mount the signup route

// Default route to verify server is running
app.get("/", (req, res) => res.send("Express on Vercel"));

// Start the server
app.listen(process.env.PORT || 3000, () => {
    console.log('server is up and running');
});

export default app;
