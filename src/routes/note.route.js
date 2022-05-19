import express from 'express';
import * as noteController from '../controllers/note.controller';
import { newNoteValidator } from '../validators/user.validator';
import { userAuth } from '../middlewares/auth.middleware';
import { redis } from '../middlewares/redis.mddleware';
const router = express.Router();

 router.post('', newNoteValidator, userAuth, noteController.addNewNote);

 router.get('', userAuth, redis, noteController.getAllNotes);

router.get('/:_id', userAuth, noteController.getNote);

router.put('/:_id', userAuth, noteController.updateNote);

router.delete('/:_id', userAuth, noteController.deleteNote);

router.put('/isarchive/:_id', noteController.archievedNote);

 router.put('/istrash/:_id', noteController.isDeleted);
export default router;
