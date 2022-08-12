const mongoose = require("mongoose");

const CountrySchema = new mongoose.Schema({

    country_id: {
        type: String,
    },
    sortname: {
        type: String,
    },
    country_name: {
        type: String,
    }
});

const countries = mongoose.model("countries", CountrySchema);

module.exports = countries