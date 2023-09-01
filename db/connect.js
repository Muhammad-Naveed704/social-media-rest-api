import mongoose from "mongoose";
uri ="mongodb+srv://naveed:naveed1122@codderlife.zjnojax.mongodb.net/naveed?retryWrites=true&w=majority"
const connectDb=()=>{
    console.log('connect db');
    return mongoose.connect(uri,{
        useNewurlParser: true,
        useUnifiedTopology:true

    });

};
module.exports =connectDb