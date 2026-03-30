// external packages/modules/libraries:
import express from 'express';

// internal packages/modules/libraries:
// importing all the routes:
import userRoutes from './userRoutes.js';

// creating router object:
const router = express.Router();

// declaring the main route paths:
router.use('/users', userRoutes);

// exporting all routers in one unified router:
export default router;