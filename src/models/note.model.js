import { Schema, model } from 'mongoose';

const noteSchema = new Schema(
    {
        Title: {
            type: String,
            required: true,
        },
        Description: {
            type: String,
            required: true,
        },
        color: {
            type: String,
        },
        isArchived: {
            type: Boolean,
        },
        isDeleted: {
            type: Boolean,
        },
        UserID: {
            type: String
        }
        
    },
    {
        Timestamps: true
    }
);

export default model('Note', noteSchema);