import { model, Schema } from "mongoose"

const BotSchema = new Schema({
    birthdaysSaved: Number,
    activatedChannelId: Number,
    guildId: Number,
    guildName: String,
    channelName: String
})

export const BotModel = model("Bot", BotSchema)