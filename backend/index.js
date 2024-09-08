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

app.use(cors({
  origin: 'https://fullstack-e-commerce-u1vh.vercel.app', // Replace with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Adjust methods as needed
  allowedHeaders: ['Content-Type', 'Authorization'], // Adjust headers as needed
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
