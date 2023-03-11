const express = require("express");
const mongoose = require("mongoose");
require("dotenv/config");
const cors = require("cors");
const TodoItemRoute = require("./routes/todoItems");

const app = express();

//middleware
app.use(express.json());

//PORT
const PORT = process.env.PORT || 5500;

//use cors
app.use(cors());

//MongoDb connection
mongoose.connect(process.env.MONGO_DB_URL)
 .then(() => console.log("MongoDB connected successfully"))
 .catch(err => console.log(err))

app.use('/', TodoItemRoute);

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})

