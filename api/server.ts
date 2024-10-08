import express from "express";
import connectDB from "../config/db"; // Ensure this path is correct
import cors from 'cors'; 
import loginRoute from "./auth/login"; // Import routes using ES6 syntax
import signupRoute from "./auth/signup"; // Import routes using ES6 syntax
import memoryRoutes from "./memory"; 
import vaccinationScheduleRoutes from "./vaccinationSchedule";

// Create an instance of the Express application
const app = express(); 

// Initialize the database
connectDB();

// Use the CORS middleware
app.use(cors());

app.use(express.json()); // Use express.json() for parsing JSON

// Use routes
app.use("/api/auth", loginRoute); // Mount the login route
app.use("/api/auth", signupRoute); // Mount the signup route
app.use("/memory", memoryRoutes); // Memory routes


app.use("/vaccination", vaccinationScheduleRoutes); 



// Default route to verify server is running
app.get("/", (req, res) => res.send("Express on Vercel"));

// Catch-all for 404 errors
app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});

// Start the server
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is up and running");
});

export default app;  
