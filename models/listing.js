const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const listingSchema = new Schema({
    title: {
        type: String,
        required:true
    },    
    description: String,
    image: {
        filename:{
            type: String
        },
        url:{
        type: String,
        default: "https://www.gqmiddleeast.com/2021/06/bA0BD40x-2.-Habtoor-Palace---Exterior-1200x900.jpg",
        set: (v) => v === "" ? "https://www.gqmiddleeast.com/2021/06/bA0BD40x-2.-Habtoor-Palace---Exterior-1200x900.jpg" : v
        }
    },
    price: Number,
    Location: String,
    country: String
});

const Listing = mongoose.model("Listing",listingSchema);
module.exports = Listing;