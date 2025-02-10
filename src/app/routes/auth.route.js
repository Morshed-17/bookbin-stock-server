import { Router } from "express";
import { authController } from "../controllers/auth.controller.js";

const router = Router();

// Public Route
router.post("/auth/register", authController.registerUser);
router.post("/auth/login", authController.loginUser);

router.post("/auth/refreshToken", authController.refreshAccessToken);
router.delete("/auth/refreshToken", authController.logoutUser);

//

export const authRoutes = router;
