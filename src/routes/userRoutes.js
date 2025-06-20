import express from "express";
import { createUser, deleteUser, getAllUsers, getUserById, updateUser,verifiedUser,getAllWorkers, getPerfil } from "../controllers/userController.js";
const router = express.Router();

router.post("/user", createUser);
router.get("/user", getAllUsers);
router.get("/workers", getAllWorkers);
router.get("/user/:id", getUserById);
router.get("/perfil/:id", getPerfil);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.post("/user/login", verifiedUser);

export default router;