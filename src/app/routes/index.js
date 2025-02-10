import { Router } from "express";
import { authRoutes } from "./auth.route.js";


const router = Router();

//* items routes
router.use("/users", authRoutes);

router.use("/items", () => {});

//* users routes

export default router;
