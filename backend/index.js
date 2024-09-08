const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");
const router = require('./routes/index')
const cookieParser = require('cookie-parser')


const app = express();
// app.use(cors({
//   origin: process.env.FRONTEND_URL,
//   credentials: true
// }));

const allowedOrigins = [
  'https://fullstack-e-commerce-u1vh.vercel.app',
  'https://fullstack-e-commerce-u1vh-n1dajpv64-tom-lewis-projects-57b7522f.vercel.app' // Add all frontend origins
  // Add other allowed origins if needed
];

app.use(cors({
  origin: (origin, callback) => {
    if (allowedOrigins.includes(origin) || !origin) { // Allow requests with no origin (e.g., server-to-server)
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));




app.use(express.json())
app.use(cookieParser())

app.use('/api',router)



const PORT = 8080 || process.env.PORT;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("connected to DB");

    console.log("server is running");
  });
});
