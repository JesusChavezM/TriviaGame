import { Schema, model, models } from 'mongoose';

const questionSchema = new Schema({
    question: {
        type: String,
        required: true,
    },
    optionA: {
        type: String,
        required: true,
    },
    optionB: {
        type: String,
        required: true,
    },
    optionC: {
        type: String,
        required: true,
    },
    optionD: {
        type: String,
        required: true,
    },
});

const Question = models.Question || model('Question', questionSchema);
export default Question;