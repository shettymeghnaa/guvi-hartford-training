const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
    },
    lastName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    country: {
        type: String,
        trim: true
    },
    notes: {
        type: String,
        trim: true
    },
    company: {
        type: String,
        trim: true
    },
    jobTitle: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

// Check for duplicate email before saving
contactSchema.pre('save', async function() {
    if (this.isModified('email')) {
        const existingContact = await mongoose.model('Contact')
            .findOne({
            email: this.email
        });

        if (existingContact && existingContact._id.toString() !== this._id.toString()) {
            // Throwing an error in async middleware will reject the save operation
            throw new Error('Email already exists');
        }
    }
});

module.exports = mongoose.model('Contact', contactSchema);