const mongoose = require("mongoose");


const StateSchema = new mongoose.Schema({

    state_id: {
        type: String,
    },
    state_name: {
        type: String,
    },
    country_id: {
        type: String,
    }
});

const states = mongoose.model("states", StateSchema);

module.exports = states