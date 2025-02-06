const mongoose=require("mongoose");

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/swift-lodge');

  
}

const listingSchema= new mongoose.Schema(
    {

        title:{
            type:String,
            require:true,
        },
        description:{
            type:String,
            require:true
        },
        image:{
            type:String,
            set:(v)=>v==="" ? "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.housebeautiful.com%2Flifestyle%2Fg4500%2Fmost-beautiful-places-world%2F&psig=AOvVaw3SgfAmmgojn29cBV0SwfnD&ust=1738532985008000&source=images&cd=vfe&opi=89978449&ved=0CBQQjRxqFwoTCLCYmJy6o4sDFQAAAAAdAAAAABAE" : v

        },
        price:Number,
        location:String,
        country:String,


    }
);

const Listing= new mongoose.model("Listing",listingSchema);
module.exports=Listing;