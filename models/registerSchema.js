import mongoose  from "mongoose";

const UserSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
        unique: true,
    },
    email:{
        type: String,
        required: true,
        unique: true,
    },
    password:{
        type: String,
    },
    profilePicture:{
        type: String,
        default: "",
    },
    coverPicture:{
        type: String,
        default: "",
    },
    followers:{
        type: Array,
        default: [],
    },
    following:{
        type: Array,
        default: [],
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    desc:{
        type: String,
        max: 50,
    },
    city:{ 
    type: String,
    max: 50,
    },
    from:{ 
    type: String,
    max: 50,
    },
    relation:{ 
    type: Number,
    option: [1,2,3]
    },
},
{timestamps: true}
);

export default mongoose.model('User', UserSchema);