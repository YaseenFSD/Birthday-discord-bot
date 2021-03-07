import { model, Schema } from "mongoose"

const BotSchema = new Schema({
    _id: String,
    activatedChannelId: String,
    guildName: String,
    channelName: String,
    birthdays: [{ type: String, ref: "Birthday" }]
})

export const BotModel = model("Bot", BotSchema)