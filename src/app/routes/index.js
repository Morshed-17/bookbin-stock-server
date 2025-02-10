import { Router } from "express";
import { userRouter } from "./user.route.js";

const router = Router();

//* items routes
router.use("/users", userRouter);

router.use("/items", () => {});

//* users routes

export default router;
