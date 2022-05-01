require('dotenv').config();
const mongoose = require("mongoose");

module.exports = class mongoDatabaseServices {
    initDatabase(callback) {
        mongoose.connect(process.env.MONGO_CRED, { serverSelectionTimeoutMS: 25000 }, function (err) {
            if (err) {
                console.log("Connection to Database failed, please retry later");
            }

            else {
                console.log("Connected to database");
                callback();
            }

        });

    };
}

