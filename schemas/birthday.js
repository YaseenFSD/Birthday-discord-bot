import { SnowflakeUtil } from "discord.js"
import { Double, Timestamp } from "mongodb"
import { model, Schema } from "mongoose"

const birthdaySchema = new Schema({
    _id: Number,
    memberName: String,
    hasYear: Boolean,
    date: Timestamp,
})

export const BirthdayModel = model('Birthday', birthdaySchema)