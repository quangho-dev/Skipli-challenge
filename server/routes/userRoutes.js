import express from "express";

import { createNewAccessCode } from "../controllers/userControllers.js";

const router = express.Router();

router.post("/createNewAccessCode", createNewAccessCode)

export default router;