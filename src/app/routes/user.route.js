import { Router } from "express";
import { userController } from "../controllers/user.controller.js";



const router = Router();

// Public Route
router.post("/auth/register", userController.registerUser);

export const userRouter = router;
