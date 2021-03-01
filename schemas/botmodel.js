import { model, Schema } from "mongoose"

const BotSchema = new Schema({
    _id: String,
    activatedChannelId: String,
    guildName: String,
    channelName: String,
    birthdays: [{ type: Number, ref: "Birthday" }]
})

export const BotModel = model("Bot", BotSchema)