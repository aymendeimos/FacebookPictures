const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const bcrypt = require("bcrypt-nodejs");
const validate = require("mongoose-validator");

const passwordValidator = [
    validate({
        validator: "isLength",
        arguments: [7, 25],
        message: "Password should be between {ARGS[0]} and {ARGS[1]} charachters"
    }),
    validate({
        validator: "matches",
        arguments: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).{7,25}$/,
        message: "Password must contains one digit from 0-9 must contains one lowercase characters must contains one uppercase characters must contains one special symbols "
    })
];

const emailValidator = [
    validate({
        validator: "isEmail",
        message: "Is not a valid e-mail"
    }),
    validate({
        validator: "isLength",
        arguments: [7, 35],
        message: "Email should be between {ARGS[0]} and {ARGS[1]} charachters"
    })
];

const UserSchema = new Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        unique: true,
        validate: emailValidator
    },
    password: {
        type: String,
        required: true,
        validate: passwordValidator
    },
    facebook_id: {
        type: String,
        default: ""
    },
    facebook_name: {
        type: String,
        default: ""
    },
    facebook_accesstoken: {
        type: String,
        default: ""
    },
    facebook_profile_picture: {
        type: String,
        default: ""
    },
    photos: []
});

UserSchema.pre("save", function (next) {
    let user = this;
    bcrypt.hash(user.password, null, null, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
    });
});


UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
}

module.exports = mongoose.model("User", UserSchema);