import bcrypt from "bcrypt";
import User  from "../models/User.js";


// get user
export const getProfile = async (req, res) => {
    try {

        const getUser = await User.findById(req.params.id);
        const {password, updatedAt, ...other} = getUser._doc       
        res.status(200).json(other)

    } catch (error) {
        res.status(500).json(error)
    }
};

// update user
export const updatePofile = async (req, res) => {
    console.log(req.params.id)
    try {
        if(req.body.userId === req.params.id || req.body.isAdmin){
            if(req.body.password){
                try {
                    const salt = await bcrypt.genSalt(10);
                    req.body.password = await bcrypt.hash(req.body.password, salt)
                } catch (error) {
                    res.status(500).json(error)
                    res.status(404).send("not found")
                }
            }
            try {
                const user = await User.findByIdAndUpdate(req.params.id, {
                    $set: req.body,
                 });
                 res.status(200).json("Account has been updated")
            } catch (error) {
                res.status(500).json(error)
            }
        }else{
            return res.status(403).json("you can update only account!")
        }
    } catch (error) {
        res.status(500).json(error)
        res.send("not found id")
    }
   };


//    delete user
export const deletePofile = async (req, res) => {
    console.log(req.params.id)
    try {
        if(req.body.userId === req.params.id || req.body.isAdmin){
            try {
                const user = await User.findByIdAndDelete(req.params.id);
                 res.status(200).json("Account has been deleted")
            } catch (error) {
                res.status(500).json(error)
            }
        }else{
            return res.status(403).json("ap ka account delete nhi ho sakta")
        }
    } catch (error) {
        res.status(500).json(error)
    }
   };


//    follow user
export const followUser = async (req, res) => {
   if(req.body.userId !== req.params.id){
    try {
        const user = await User.findById(req.params.id);
        const currentUser = await User.findById(req.body.userId);
        if(!user.followers.includes(req.body.userId)){
            await user.updateOne({$push: {followers: req.body.userId}});
            await currentUser.updateOne({$push: {following: req.params.id}});
            res.status(200).json("user has been followed")
        }else{
            res.status(403).json("you already follow this user")
        }
    } catch (error) {
        res.status(500).json(error)    
    }
   }else{
    res.status(403).json("you can't follow yourself")
   }
   };

   //    unfollow user
export const unfollowUser = async (req, res) => {
    if(req.body.userId !== req.params.id){
     try {
         const user = await User.findById(req.params.id);
         const currentUser = await User.findById(req.body.userId);
         if(!user.followers.includes(req.body.userId)){
             await user.updateOne({$pull: {followers: req.body.userId}});
             await currentUser.updateOne({$pull: {following: req.params.id}});
             res.status(200).json("user has been unfollowed")
         }else{
             res.status(403).json("you dont unfollow this user")
         }
     } catch (error) {
         res.status(500).json(error)    
     }
    }else{
     res.status(403).json("you cant unfollow yourself")
    }
    };