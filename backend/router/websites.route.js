const express = require('express');
const WebsiteRouter = express.Router()
const protect = require("../middleware/protect")
const role = require("../middleware/role")
const { 
    createWebsite,
    getWebsites,
    updateWebsite,
    deleteWebsite
} = require("../controller/website.controller")

WebsiteRouter.get("/", getWebsites)
WebsiteRouter.post("/", protect, role("admin"), createWebsite)
WebsiteRouter.put("/:id", protect, role("admin"), updateWebsite)
WebsiteRouter.delete("/:id", protect, role("admin"), deleteWebsite)

module.exports = WebsiteRouter