import { model, Schema } from "mongoose"

const BotSchema = new Schema({
    _id: Number,
    activatedChannelId: Number,
    guildName: String,
    channelName: String,
    birthdays: [{ type: Schema.Types.ObjectId, ref: "Birthday" }]
})

export const BotModel = model("Bot", BotSchema)