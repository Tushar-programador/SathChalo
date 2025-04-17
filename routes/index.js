import express from "express";
const router = express.Router();
import usersRoutes from "./users.routes.js";
import ridesRoutes from "./rides.routes.js";

router.use("/users", usersRoutes);

router.use("/rides", ridesRoutes);

export { router };