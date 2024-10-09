import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import connectDB from "../config/db"; // Ensure this path is correct
import loginRoute from "./auth/login"; // Import routes using ES6 syntax
import signupRoute from "./auth/signup"; // Import routes using ES6 syntax
import memoryRoutes from "./memory"; 
import clinicRoute from "./clinic";
import  ClinicScheduleRoute  from "./clinicSchedule";
import vaccineRoute from "./vaccine";
import vaccinationScheduleRoutes from "./vaccinationSchedule";


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
app.use("/clinic", clinicRoute); // clinic routes
app.use("/clinic-schedule", ClinicScheduleRoute); // clinic schedule routes

app.use("/vaccine", vaccineRoute);
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
