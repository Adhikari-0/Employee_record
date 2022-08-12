const mongoose = require("mongoose");

const CitySchema = new mongoose.Schema({

    city_id: {
        type: String,
    },
    city_name: {
        type: String,
    },
    state_id: {
        type: String,
    }
});

const cities = mongoose.model("cities", CitySchema);

module.exports = cities