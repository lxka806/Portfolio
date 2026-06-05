const express = require('express');
const dotenv = require('dotenv');
dotenv.config();
const AuthRouter = require("./router/auth.route")
const WebsiteRouter = require("./router/websites.route")
const mongoose = require("mongoose")
const cookieParser = require('cookie-parser')



const app = express();

app.use(express.json());
app.use(cookieParser())
app.use("/api/auth", AuthRouter)
app.use("/api/websites", WebsiteRouter)


mongoose.connect(process.env.MONGODB_URI)
    .then(() => {
        console.log("Connected to MongoDB")

            app.listen(process.env.PORT, () => {
                console.log(`Server is running on port ${process.env.PORT}`);
            });
        })
    .catch((error) => {
        console.log("Error connecting to MongoDB:", error);
    });
