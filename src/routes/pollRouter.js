import { Router } from "express";
import { validatePoolSchema } from "../middlewares/validatePoolSchema.js";
import {
  createPool,
} from "../controllers/poolController.js";

const poolRouter = Router();

poolRouter.post("/pool", validatePoolSchema, createPool);

export default poolRouter;