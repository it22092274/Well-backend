import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "../config/db";
import loginRoute from "./auth/login"; // Import routes using ES6 syntax
import signupRoute from "./auth/signup"; // Import routes using ES6 syntax
import memoryRoutes from "./memory"; 

// Initialize the database
connectDB();

const app = express();
app.use(cors());
// app.use(express.json()); // Use express.json() for parsing JSON
app.use(express.json({ limit: '50mb' }));
app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '50mb' }));



// Use routes
app.use("/api/auth", loginRoute); // Mount the login route
app.use("/api/auth", signupRoute); // Mount the signup route
app.use("/memory", memoryRoutes); // Memory routes


app.use((req, res, next) => {
  res.status(404).json({ message: "Route not found" });
});


// Default route to verify server is running
app.get("/", (req, res) => res.send("Express on Vercel"));


// Start the server
app.listen(process.env.PORT || 3000, () => {
    console.log("Server is up and running");
});

export default app;  
