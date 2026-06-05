const mongoose = require('mongoose');

const WebsiteSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        },
        description: {
            type: String,   
            required: true,
        },
        image: {
            type: String,
            required: true,
        },
    },{
        timestamps: true,
    }
)

const Website = mongoose.model('Website', WebsiteSchema);

module.exports = Website;