const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Listing = require("./models/listing.js");
const path = require("path");
app.set("view engine" , "ejs");
app.set("views",path.join(__dirname, "views"));
app.use(express.urlencoded({extended: true}))
const methodOverride = require('method-override');
app.use(methodOverride("_method"));
const ejsmate = require("ejs-mate");
app.engine('ejs', ejsmate);
app.use(express.static(path.join(__dirname,"/public")));

const MONGO_URL ="mongodb://127.0.0.1:27017/wanderlust";

main()
    .then((res) =>{
        console.log("Mongo db is connected!")
    }).catch((err) => {
        console.log(err);
    })

async function main() {
    await mongoose.connect(MONGO_URL);
}

app.listen(8080, () => {
    console.log(`Server started on 8080`);
});

app.get('/', (req, res) => {
    res.send("I am root");
});

//index rout
app.get('/airbnb', async (req, res) => {
    const allListings = await Listing.find();
    res.render("index.ejs", {allListings});

});

app.put('/airbnb/edit/:id', async (req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById({_id: id});
    Listing.findByIdAndUpdate(id, {...req.body.listing}).then((res) => {
        console.log(res);
    });
    res.redirect(`/airbnb/${id}`);
});

app.delete('/airbnb/show/:id', async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById({_id: id});
    Listing.findByIdAndDelete(id).then((res) =>{
        console.log(res);
    });
    res.redirect("/airbnb");
});

//Edit Rout
app.get('/airbnb/show/:id/edit', async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById({_id: id});
    res.render("edit.ejs",{listing});
});


//new rout
app.get("/airbnb/new", async(req, res) => {
    res.render("new.ejs");
});

//show rout
app.get("/airbnb/:id", async(req, res) => {
    let {id} = req.params;
    const listing = await Listing.findById({_id: id});
    res.render("show.ejs",{listing});
});

app.post('/airbnb/new',async (req, res) => {
    const listing = new Listing(req.body.listing);
    console.log(listing);
    console.log(req.body.listing)
    await listing.save();
    res.redirect("/airbnb");
});





// app.get('/testListing', async (req, res) => {
//     let samplelisting = new Listing({
//         title:"My new Home",
//         description: "This is my new Home.",
//         image:"",
//         price:1500,
//         Location: "Bangali Market",
//         country: "India"
//     });

//    await samplelisting.save();
//    console.log("Sample saved sucessfully");
//    res.send("saved sucessfully");
// });

