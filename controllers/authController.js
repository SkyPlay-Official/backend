const asynchandler = require("express-async-handler")
const UserModel = require("../models/UserModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const registerUser = asynchandler(async (req, res) => {

    // Retreiving the user's attributes from the body
    const {
        username,
        email,
        password,
        confirm_password
    } = req.body


    // Cehck if all the required body is passed or not
    if (!username || !email && !password || !confirm_password) {
        res.status(400);
        throw new Error("All fields are required")
    }


    // Check if password and confirm password matches
    if (password !== confirm_password) {
        res.status(400);
        throw new Error("Password and Confirm Password must match")
    }


    // Check username
    const userAvailable = await UserModel.findOne({ username })
    if (userAvailable) {
        res.status(400);
        throw new Error(`Username: ${username} is already taken`)
    }


    // Check email
    const emailAvailable = await UserModel.findOne({ email })
    if (emailAvailable) {
        res.status(400);
        throw new Error(`Email: ${email} is already registered`)
    }


    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10)


    // Try to create a new user
    try {

        const newUser = await UserModel.create({
            username,
            email,
            password: hashedPassword
        })

        res.status(201).json({
            "status": res.statusCode,
            "message": "User has been created sucessfully",
            "data": newUser
        })

    } catch (err) {
        res.status(500)
        throw new Error("Unable to create a new user")
    }
})

const loginUser = asynchandler(async (req, res) => {

    const { username, password } = req.body
    if (!username || !password) {
        res.status(400)
        throw new Error("Both username and password")
    }

    const user = await UserModel.findOne({ username })
    if (user && bcrypt.compare(password, user.password)) {
        const accessToken = jwt.sign({
            user: {
                id: user._id,
                username: user.username,
                email: user.email
            }
        }, process.env.JWT_ACCESS_TOKEN, { expiresIn: "30m" })
        var cookieOptions = {
            expires: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
            ),
            httpOnly: true
        }

        res.cookie('jwt', accessToken, cookieOptions);
        res.status(200)
            .json({
                "status": res.statusCode,
                "message": `User: ${username} has been LoggedIn`,
                "token": accessToken
            })
    } else {
        res.status(404)
        throw new Error("Unable to login user")
    }
})


const logoutUser = asynchandler(async (req, res) => {
    try {
        res.clearCookie('jwt');
        res.status(200).json({
            "data": res.statusCode,
            "message": "USer has been logged out"
        })
    } catch (err) {
        res.status(500)
        throw new Error("Unable to logout")
    }


})

const userDetails = asynchandler(async (req, res) => {
    const userInDatabase = await UserModel.findOne(
        { username: req.user.username },
        {
            password: 0,
            __v: 0,
            _id: 0
        })
    if (userInDatabase) {
        res.status(200).json({
            "status": res.statusCode,
            "message": "Loggedin user's data has been fetched",
            "data": userInDatabase
        })

    } else {

        res.status(404).json({
            "status": res.statusCode,
            "message": "User is either not loggedin or not available"
        })

    }
})


const updateUser = asynchandler(async (req, res) => {

    try {
        const updatedUser = await UserModel.findOneAndUpdate(
            req.user.username,
            req.body,
            { new: true }
        )

        res.status(201).json({
            "status": res.statusCode,
            "message": "User data has been updated",
            "data": updatedUser
        })
    } catch (err) {
        res.status(500)
        throw new Error("Unable to update user data");
    }

})

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    userDetails,
    updateUser
}