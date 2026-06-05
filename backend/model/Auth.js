const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const validator = require('validator');
const jwt = require('jsonwebtoken');

const authSchema = new mongoose.Schema(
    {
        email: {
            type: String,
            required: true,
            unique: true,
            validate: [validator.isEmail, 'Please enter a valid email :)']
        },
        password: {
            type: String,
            required: true,
            minlength: 6
        },
        role: {
            type: String,
            enum: ['admin', 'user'],
            default: 'user',
        }
    },
    { timestamps: true }
)

authSchema.pre("save", async function () {
    if (!this.isModified("password")) return;
    this.password = await bcrypt.hash(this.password, 10);
})
authSchema.methods.comparePassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}
authSchema.methods.signToken = function () {
    return jwt.sign(
        {
            id: this._id,
            role: this.role
        },
        process.env.JWT_SECRET,
        {
            expiresIn: process.env.JWT_EXPIRES_IN
        }
    );
};

const Auth = mongoose.model('Auth', authSchema);

module.exports = Auth;