const mongoose = require("mongoose");
const uri = "mongodb+srv://Sonusa9024:Sonusa9024@cluster0.8g6fj0k.mongodb.net/portfolio?retryWrites=true&w=majority";
mongoose.connect(uri)
    .then(() => {
        console.log("✅ CONNECTED_TO_MONGODB");
        process.exit(0);
    })
    .catch(err => {
        console.error("❌ CONNECTION_FAILED:", err.message);
        process.exit(1);
    });
