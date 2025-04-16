import { Router } from "express";
import { dirname, join } from "path";
import { login, register } from "../../controllers/auth/authController.js";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const router = Router()


router.post("/register", register);
router.post("/login", login)

export default router;