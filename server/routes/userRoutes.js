// external packages/libraries/modules:
import express from 'express';

// internal packages/libraries/modules:
import validate from '../middlewares/validate-middleware.js';
import userValidationSchema from '../validators/userValidator.js';
import {
	signUpUser,
	signInUser,
	signOutUser,
	getAllUsers,
	getUserById,
	updateUserById,
	deleteUserById,
} from '../controllers/userController.js';

// creating the router object:
const router = express.Router();

// creating routes:
router.post('/sign-up', validate(userValidationSchema), signUpUser);
router.post('/sign-in', signInUser);
router.post('/', signOutUser);
router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.put('/:id', updateUserById);
router.delete('/:id', deleteUserById);

// exporting the router:
export default router;