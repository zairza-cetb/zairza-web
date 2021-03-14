const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

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
    },
    provider_data: {
        type: {},
        default: null
    }
})

const UserSchema = new mongoose.Schema(
    {
        name: {
            type: String
        },
        email: {
            type: String,
            unique: true
        },
        email_is_verified: {
            type: Boolean,
            default: false
        },
        registration_no:{
            type: Number,
            unique: true,
            sparse: true
        },
        password: {
            type: String
        },
        third_party_auth: [ThirdPartyProviderSchema],
        created_at: {
            type: Date,
            default: Date.now
        },
        newsletter_subscription: {
            type: Boolean,
            default: false
        }
    },
    { strict: false }
);

// generating a hash
UserSchema.methods.generateHash = function(password) {
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// checking if password is valid
UserSchema.methods.validPassword = function(password) {
    return bcrypt.compareSync(password, this.local.password);
};


module.exports = User = mongoose.model("users", UserSchema);