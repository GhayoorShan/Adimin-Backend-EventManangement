import { Router } from "express"; // Import Router from express
import authController from "../controller/authController.js";

const { register, login } = authController;

const router = Router();

router.post("/register", register);
router.post("/login", login);

export default router;
