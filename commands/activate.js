import { BotModel } from "../schemas"

export default {
    name: "activate",
    description: "Activates the timed bot messages in the channel in which it was called.\n\n (This command is only accessible by the server creator)",
    help: function () { return `!activate - Args:\tTakes no arguments\n\nDescription:\n ${this.description}` },
    execute: async function (message, args) {
        if (args[0] === "-h" || args[0] == "--help")
            message.channel.send(this.help())
        else if (message.guild.ownerID === message.author.id) {
            const BotData = await BotModel.exists({ guildId: message.guild.id })
            if (!BotData) {
                try {
                    await BotModel.create({
                        birthdaysSaved: 0,
                        activatedChannelId: message.channel.id,
                        guildId: message.guild.id,
                        guildName: message.guild.name,
                        channelName: message.channel.name
                    })
                    return message.channel.send(`Bot activated in '${message.channel.name}' channel`)

                } catch (error) {
                    console.log(error)
                    return message.channel.send("Failed to create document")
                }
            } else {
                try {
                    await BotModel.findOneAndUpdate({ guildId: message.guild.id },
                        {
                            activatedChannelId: message.channel.id,
                            channelName: message.channel.name,
                        }
                    )
                    return message.channel.send(`Updated Channel to ${message.channel.name}`)

                } catch (error) {
                    console.log(error)
                    return message.channel.send("Failed to update activated channel")
                }
            }
        }
    }
}