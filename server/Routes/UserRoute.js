import express from "express";
import { updateUser, deleteUser, followUser, getUser, unFollowUser, getAllUsers } from "../Controllers/UserController.js";
import authMiddleWare from "../MiddleWare/AuthMiddleWare.js";

const router = express.Router();

router.get('/', getAllUsers)
router.get('/:id', getUser)
router.put('/:id',authMiddleWare, updateUser)
router.delete('/:id',authMiddleWare, deleteUser)
router.put('/:id/follow',authMiddleWare, followUser)
router.put('/:id/unfollow',authMiddleWare, unFollowUser)


export default router;
