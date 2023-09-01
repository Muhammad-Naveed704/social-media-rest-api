import express from "express";
import { userPost, updatePost, deletePost, likePost, getPost,  timelinePosts} from "../controlers/postControllers.js";

const postRoutes = express.Router();
 
postRoutes.post('/', userPost);
postRoutes.put('/:id', updatePost);
postRoutes.delete('/:id', deletePost);
postRoutes.put('/:id/like', likePost);
postRoutes.get('/:id', getPost);
postRoutes.get('/timeline/all', timelinePosts);

export default postRoutes;