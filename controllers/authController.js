const asynchandler = require("express-async-handler")


const registerUser = asynchandler(async (req, res) => {
    console.log(req.body);
})


module.exports = {
    registerUser
}