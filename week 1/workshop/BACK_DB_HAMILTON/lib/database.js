import mongoose from "mongoose";

export const dbConnection = async () => {

    try{
        const URI = "mongodb+srv://angelapmonsalve_db_user:UxvVYo4znuLh3RFa@cluster0.u8ko5y1.mongodb.net/riwi";
        await mongoose.connect(URI);
        console.log("DB online")
    }catch(err){
        console.log(err)
    }
    
}