const express=require("express");
const app=express();
const path=require("path");
const ejsMate=require("ejs-mate");
const methodOverride = require('method-override');
const Listing=require("./models/listing.js");



app.listen(8080,()=>{
console.log("App is working from port 8080");
});



app.set("view engine","ejs");
app.set("views",path.join(__dirname,"/views"));
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(methodOverride('_method'));
app.engine('ejs',ejsMate);
app.use(express.static(path.join(__dirname,"/public")));


// route to add the new list 
app.get("/listings/new",(req,res)=>{
    res.render("listings/new.ejs");

});

// post req to add new listing
app.post("/listings",async(req,res)=>{

   
   let newListing=  new Listing(req.body.listing);
   await newListing.save();
   res.redirect("/listings");

});

app.put("/listings/:id", async (req, res) => {
   
        let id = req.params.id; // Extract the ID from the URL
        let updatedData = req.body.listing; // Extract updated data from the request

        let updatedListing = await Listing.findByIdAndUpdate(id, updatedData, { 
            new: true, // Return the updated document
            runValidators: true // Validate before saving
        });

       

        res.redirect(`/listings/${id}`); // Redirect to the updated listing
     
});

// Get request for all listings (Index page)
app.get("/listings", async (req,res)=>{
    let allListings= await Listing.find();
    res.render("listings/index.ejs", { listings: allListings });
})

// show route to view individual listings

app.get("/listings/:id",async (req,res)=>{

    let id= req.params.id;
   let listData= await Listing.findById(`${id}`);
   
    res.render("listings/details",{listData});
})

// route to update the details of listings

app.get("/listings/update/:id",async (req,res)=>{
    let id= req.params.id;
    let listData= await Listing.findById(`${id}`);
    console.log(listData);
    res.render("listings/update.ejs",{listData});

})

// route to delete the list 
app.delete("/listings/:id", async (req, res) => {
    let id = req.params.id;
    await Listing.findByIdAndDelete(id);
    res.redirect("/listings"); // Redirect to the main listings page
});
