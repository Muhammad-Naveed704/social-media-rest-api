import mongoose from "mongoose";
import bcrypt from "bcrypt";
import User from '../models/User.js'


// export const registeration = async(req,res, )=>{
//     const newUser = await new User({
//         username:"jhon",
//         email:"jhon@mail.com",
//         password:"12345678"

//     })
//     await newUser.save()
//     res.send("user save")
// };
//register
export const registeration = async (req, res, next) => {

try{
const salt = await bcrypt.genSalt(10);
const hashedPasscode = await bcrypt.hash(req.body.password, salt); 
const newUser = new User({...req.body, password: hashedPasscode });
await newUser.save();   
res.status(200).send("User register");

}catch (err){
next(err)
}
};
// login
export const login = async(req, res) => {
    try {
        const loggedUser = await User.findOne({email: req.body.email});
        !loggedUser && res.status(404).json("wrong email");

        const validPasscode = bcrypt.compareSync(req.body.password, loggedUser.password);
        !validPasscode && res.status(400).json("wrong password");

        res.status(200).json("User logged In");

    } catch (error) {
        console.log(error);
        res.status(500).json(error)
        
    }; 
};