import bcrypt from "bcrypt";
import Post from "../models/Post.js";
import User from "../models/User.js";


// create post

export const userPost = async (req, res) => {
    console.log("post data");

    const newPost = new Post(req.body)
    try {
        const savePost = await newPost.save();
        res.status(200).send(savePost);
    } catch (error) {

        res.status(500).send(error)
    }

};

// update post
export const updatePost = async (req, res) => {
    try {
     
    console.log("update post data");
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId){

        await post.updateOne({$set:req.body});
        res.status(200).json("the post has been updated");

    }else{
        res.status(403).json("you can update only  your post");
    }   
    } catch (error) {
     res.status(500).json(error); 
    }
};

// delete post

export const deletePost = async (req, res) => {
    try {
     
    console.log("update post data");
    const post = await Post.findById(req.params.id);
    if(post.userId === req.body.userId){

        await post.deleteOne();
        res.status(200).json("the post has been deleted");
        
    }else{
        res.status(403).json("you can only delete your post");
    }   
    } catch (error) {
     res.status(500).json(error); 
    }
};

// like a post

export const likePost = async (req, res) => {
    console.log("like a post");
    try {
        const likePost = await Post.findById(req.params.id);
        if(!likePost.like.includes(req.body.userId)){

            await likePost.updateOne({$push:{like: req.body.userId}});
            res.status(200).json(" Post has been liked");
        }else{
            await likePost.updateOne({$pull:{like: req.body.userId}});
            res.status(200).json(" Post has been disliked");   
        }
    } catch (error) {
        res.status(500).json(error)
    }
  
};

// get a post
export const getPost = async (req, res) => {
    console.log("get a single post");
  try {
    const getPost = await Post.findById(req.params.id);
    res.status(200).json(getPost);
  } catch (error) {
    res.status(500).json(error);
  }
};


// get timeline posts

export const timelinePosts = async (req, res) => {
    console.log("get a all post");
    let postArray = [];
    try {
        const currentUser = await User.findById(req.body.userId);
        const userPost = await Post.find({userId: currentUser._id});
        const friendPost = await Promise.all(
            currentUser.following.map((friendId)=>{
              return  Post.find({userId: friendId});
            })
        );
        res.status(200).json(userPost.concat(...friendPost))
    } catch (error) {
        res.status(500).json(error)
    }
 
};