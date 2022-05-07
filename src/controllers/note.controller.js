import HttpStatus from 'http-status-codes';
import * as NoteService from '../services/note.service';

/**
 * Controller to create a new user
 * @param  {object} req - request object
 * @param {object} res - response object
 * @param {Function} next
 */
export const addNewNote = async (req, res, next) => {
  try {
    const data = await NoteService.addNewNote(req.body);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Note created successfully'
    });
  } catch (error) { 
    next(error);
  }
};

export const getAllNotes = async (req, res, next) => {
  try {
    console.log("user id",req.body)
    const data = await NoteService.getAllNotes(req.body);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'All users fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const getNote = async (req, res, next) => {
  try {
    const data = await NoteService.getNote(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'User fetched successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const updateNote = async (req, res, next) => {
  try {
    const data = await NoteService.updateNote(req.params.noteid);
    res.status(HttpStatus.CREATED).json({
      code: HttpStatus.CREATED,
      data: data,
      message: 'Updated successfully'
    });
  } catch (error) {
    next(error);
  }
};

export const deleteNote = async (req, res, next) => {
  try {
    const data = await NoteService.deleteNote(req.params._id);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Deleted successfully'
    });
  } catch (error) {
    next(error);
  }
};


export const isDeleted = async (req, res, next) => {
  try {
    const data = await NoteService.isDeleted(req.params._id,req.body.isDeleted);
    res.status(HttpStatus.OK).json({
      code: HttpStatus.OK,
      data: data,
      message: 'Note is trashed..'
    });
  } catch (error) {
    next(error);
  }
};

export const archievedNote = async (req, res, next) => {
  console.log(req.body)
  try {
    const data = await NoteService.isArchieveNote(req.params._id,req.body.isArchieveNote);
    res.status(HttpStatus.ACCEPTED).json({
      code: HttpStatus.ACCEPTED,
      data: data,
      message: 'Note is archived..'
    });
  } catch (error) {
    next(error);
  }
};
