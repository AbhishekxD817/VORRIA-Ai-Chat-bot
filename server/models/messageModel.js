import { Schema, model } from "mongoose";

const messageSchema = Schema({
    content: {
        type: String,
        required: true,
    },
    sender: {
        type: String,
        enum: ['user', 'ai']
    }
}, {
    timestamps: true
})

const Message = model('Message', messageSchema);

export default Message;