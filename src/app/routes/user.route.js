import { Router } from "express";
import { userController } from "../controllers/user.controller.js";

const router = Router();

// Public Route
router.post("/auth/register", userController.registerUser);
router.post("/auth/login", userController.registerUser);

router.post("/auth/refreshToken", userController.registerUser);
router.delete("/auth/refreshToken", userController.registerUser);

//

export const userRouter = router;
