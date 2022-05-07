import { id } from '@hapi/joi/lib/base';
import { log } from 'winston';
import Note from '../models/note.model';

export const addNewNote = async (body) => {
   
    const data = await Note.create(body);
    return data;
  };

  //get all users
export const getAllNotes = async (userid) => {
  const data = await Note.find(userid);
  return data;
};

  //update single user
export const updateNote = async (_id, body) => {
  const data = await Note.findByIdAndUpdate(_id,body,{new: true});
  //console.log("Data is"+data);
  return data;
};

//delete single user
export const deleteNote = async (id) => {
  await Note.findByIdAndDelete(id);
  return '';
};

//get single user
export const getNote = async (id) => {
  const data = await Note.findById(id);
  return data;
};

export const isArchieveNote = async (_id) => {
  const data = await Note.findByIdAndUpdate(
    _id,
    { isArchieved:true }
  );
  return data;
};

export const isDeleted = async (_id) => {
  const data = await Note.findByIdAndUpdate(
    _id,
    { isDeleted:true }
  );
  return data;
};
