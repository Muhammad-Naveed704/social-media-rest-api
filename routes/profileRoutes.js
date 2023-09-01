import express from 'express'
import {getProfile, updatePofile, deletePofile, followUser,unfollowUser} from "../controlers/profileController.js";

const profileRoutes = express.Router()

profileRoutes.get('/:id', getProfile);
profileRoutes.put('/:id', updatePofile);
profileRoutes.delete('/:id', deletePofile);
profileRoutes.put('/:id/follow', followUser);
profileRoutes.put('/:id/unfollow', unfollowUser);

export default profileRoutes

