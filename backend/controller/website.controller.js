const Website = require("../model/Website")

const createWebsite = async (req, res) => {
    try {
        const { name, url, description, image } = req.body
        const website = await Website.create({ name, url, description, image })
        res.status(201).json(website)
    }
    catch (error) {        
        res.status(500).json({ error: error.message })
    }
}

const getWebsites = async (req, res) => {
    try {
        const websites = await Website.find()
        res.status(200).json(websites)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }   
}  

const updateWebsite = async (req, res) => {
    try {
        const { id } = req.params
        const { name, url, description, image } = req.body
        const website = await Website.findByIdAndUpdate(id, { name, url, description, image }, { new: true })
        if (!website) {
            return res.status(404).json({ error: "Website not found" })
        }   
        res.status(200).json(website)
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }   
}   


const deleteWebsite = async (req, res) => {
    try {
        const { id } = req.params   
        const website = await Website.findByIdAndDelete(id)
        if (!website) {
            return res.status(404).json({ error: "Website not found" })
        }   
        res.status(200).json({ message: "Website deleted successfully" })
    }
    catch (error) {
        res.status(500).json({ error: error.message })
    }   
}

module.exports = {
    createWebsite,
    getWebsites,
    updateWebsite,
    deleteWebsite
}