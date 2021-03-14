const mongoose = require("mongoose");

const ThirdPartyProviderSchema = new mongoose.Schema({
    provider_name: {
        type: String,
        enum:["google","github"]
    },
    provider_id: {
        type: String,
        default: null
    },
    provider_token: {
        type: String,
        default: null
    }
})

module.exports = ThirdPartyProviderSchema