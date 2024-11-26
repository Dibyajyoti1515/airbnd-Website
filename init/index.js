const mongoose = require("mongoose");
const MONGO_URL ="mongodb://127.0.0.1:27017/wanderlust";
const Listing = require("../models/listing.js");
const initData = require("./data.js");

main()
    .then((res) =>{
        console.log("Mongo db is connected!")
    }).catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect(MONGO_URL);
}

const initdb = async ()=> {
    await Listing.deleteMany({});
    await Listing.insertMany(initData.data);
    console.log("data add in database ");
}

initdb();

