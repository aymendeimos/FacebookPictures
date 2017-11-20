const express = require("express");
const app = express();
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const secret = "592b04ec3f25bb0b9cf47e7d";
const localStorage = require("localStorage");
const axios = require("axios");

// Require user model in our routes module
const User = require("../models/user");

// Defined signup route
userRouter.route("/signup").post(function (req, res) {
    let user = new User(req.body);
    user.save()
        .then(user => {
            res.json({
                success: true,
                message: "Account created succefuly"
            });
        })
        .catch(err => {
            res.json({
                success: false,
                message: "Email already exist"
            });
        });
});

//sign in and creat JWT token

userRouter.route("/login").post(function (req, res) {
    User.findOne({
            email: req.body.email
        }).select("id email password facebook_id facebook_name facebook_accesstoken facebook_profile_picture")
        .exec(function (err, user) {
            if (err) res.json({
                success: false,
                message: "Internal Error"
            });

            if (!user) {
                res.json({
                    success: false,
                    message: "Account Email does not exist creat one"
                });
            } else if (user) {
                if (req.body.password) {
                    let validPassword = user.comparePassword(req.body.password);
                    if (!validPassword) {
                        res.json({
                            success: false,
                            message: "keep guessing"
                        });
                    } else {
                        let token = jwt.sign({
                            id: user.id,
                            email: user.email,
                            facebook_id: user.facebook_id,
                            facebook_name: user.facebook_name,
                            facebook_accesstoken: user.facebook_accesstoken,
                            facebook_profile_picture: user.facebook_profile_picture
                        }, secret, {
                            expiresIn: 86400
                        });
                        let tooken = {
                            id: user.id,
                            email: user.email,
                            facebook_id: user.facebook_id,
                            facebook_name: user.facebook_name,
                            facebook_accesstoken: user.facebook_accesstoken,
                            facebook_profile_picture: user.facebook_profile_picture
                        };
                        localStorage.setItem("token", token);
                        res.json({
                            success: true,
                            tooken: tooken,
                            message: "logging in ..."
                        });
                    }
                } else {
                    res.json({
                        success: false,
                        message: "atleast give us a password "
                    });
                }
            }
        })
});

//Defined logout route 

userRouter.route("/logout").post(function (req, res) {
    localStorage.removeItem("token");
    res.json({
        success: true,
        message: "Signing out ..."
    });
});


//  Defined update the account with facebook informations
userRouter.route("/update/:id").post(function (req, res) {
    User.findOneAndUpdate({
            _id: req.params.id
        }, {
            facebook_id: req.body.facebook_id,
            facebook_name: req.body.facebook_name,
            facebook_accesstoken: req.body.facebook_accesstoken
        }, {
            new: true
        },
        function (err, person) {
            if (err) {
                res.json({
                    success: false,
                    message: "Internal error please try again later"
                });
            } else {
                let token = localStorage.getItem("token");
                if (token) {
                    jwt.verify(token, secret, function (err, decoded) {
                        if (err) {
                            res.json({
                                success: false,
                                message: "Token Invalid"
                            });
                        } else {
                            req.decoded = decoded;
                            localStorage.removeItem("token");
                            let token = jwt.sign({
                                id: req.decoded.id,
                                email: req.decoded.email,
                                facebook_id: person.facebook_id,
                                facebook_name: person.facebook_name,
                                facebook_accesstoken: person.facebook_accesstoken
                            }, secret, {
                                expiresIn: 86400
                            });
                            localStorage.setItem("token", token);
                            res.json({
                                success: true,
                                message: "Succefuly Updated your facebook account",
                                token: req.decoded
                            });
                        }
                    });
                } else {
                    res.json({
                        success: false,
                        message: "NO token provided"
                    });
                }
            }
        });
});

//get the JWT token

userRouter.route("/gettoken").post(function (req, res) {
    let token = localStorage.getItem("token");

    if (token) {
        jwt.verify(token, secret, function (err, decoded) {
            if (err) {
                res.json({
                    success: false,
                    message: "Token Invalid"
                });
            } else {
                req.decoded = decoded;
                res.json({
                    success: true,
                    message: "token exist",
                    token: req.decoded
                });
            }
        });
    } else {
        res.json({
            success: false,
            message: "NO token provided"
        });
    }
});


module.exports = userRouter;