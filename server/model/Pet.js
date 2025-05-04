const mongoose = require("mongoose");

// Define schema for mongoose ...
const petSchema = new mongoose.Schema({
        // Declare the properties ...
        name: {
            type: String,
            required: true,
        },
        image: {
            type: String,
            default: null,
        },
        species: {
            type: String,
            required: true,
        },
        age: {
            type: Number,
            required: true,
        },
        personality: {
            type: String,
            required: true,
        },
        adopted: {
            type: Boolean,
            default: false,
        },
        adoption_Date: {
            type: Date,
            default: new Date(),
        }
    }, {
        timestamps: true,
    }
);

const Pet = mongoose.model("Pet", petSchema);
module.exports = Pet;