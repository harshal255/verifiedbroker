const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://ridhamchauhan693:kEGw6CO2zwq2z3YV@cluster0.g7rhl0b.mongodb.net/?retryWrites=true&w=majority" , {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then((data) => {
    console.log(`connection successful with server: ${data.connection.host}`);
}).catch((e) => {
    console.log(e);
})