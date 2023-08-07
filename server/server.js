require('dotenv').config();
const express = require('express');
require("./src/db/connection");
const bodyParser = require('body-parser');
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3000;

// Handling uncaught exception
process.on("uncaughtException", (err) => {
    console.log(err);
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to Uncaught Exception`);
    process.exit(1);
})


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors());

app.listen(port, () => {
    console.log(`connection is live at port no ${port}`);
});

app.get("/", async (req, res) => {
    res.send("Namaste GoAgrics");
});

const user = require("./src/Routes/userRoute");
const property = require("./src/Routes/propertyRoute")

app.use("/api",user);
app.use("/api",property);

// unhandled promise rejection
process.on("unhandledRejection",(err)=>{
    console.log(`Error : ${err.message}`);
    console.log(`Shutting down the server due to Unhandled Promise Rejection`);

    server.close(()=>{
        process.exit(1);
    })
})