import { SnowflakeUtil } from "discord.js"
import { Double, Timestamp } from "mongodb"
import { model, Schema } from "mongoose"

const birthdaySchema = new Schema({
    _id: Number,
    memberName: String,
    birthYear: {
        hasYear: Boolean,
        year: Number
    },
    date: Number,
})

export const BirthdayModel = model('Birthday', birthdaySchema)