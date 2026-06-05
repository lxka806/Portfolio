const express = require('express');
const AuthRouter = express.Router()
const { register, login, logout } = require("../controller/auth.controller")

AuthRouter.post("/register", register)
AuthRouter.post("/login", login)
AuthRouter.post("/logout", logout)

module.exports = AuthRouter