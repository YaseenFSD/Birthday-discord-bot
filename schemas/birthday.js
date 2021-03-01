import { model, Schema } from "mongoose"

const birthdaySchema = new Schema({
    // change _id to String to prevent errors
    _id: Number,
    memberName: String,
    birthYear: {
        hasYear: Boolean,
        year: Number
    },
    date: Number,
})

export const BirthdayModel = model('Birthday', birthdaySchema)