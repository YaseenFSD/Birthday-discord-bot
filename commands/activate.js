import { BotModel } from "../schemas"

export default {
    name: "activate",
    description: "Activates the timed bot messages in the channel in which it was called.\n\nNote: This command is only accessible by the server creator",
    help: function () { return `Command: activate \n\n Args:\tTakes no arguments\n\nDescription:\n\t${this.description}` },
    execute: async function (message, args) {
        if (args[0] === "-h" || args[0] == "--help") {
            return message.channel.send(this.help())
        }
        if (message.guild.ownerID !== message.author.id) {
            return
        }
        const BotData = await BotModel.exists({ _id: message.guild.id })
        if (!BotData) {
            try {
                await BotModel.create({
                    _id: message.guild.id,
                    activatedChannelId: message.channel.id,
                    guildName: message.guild.name,
                    channelName: message.channel.name
                })
                return message.channel.send(`Bot activated in '${message.channel.name}' channel`)

            } catch (error) {
                console.error(error)
                return message.channel.send("Error: Failed to create bot")
            }
        } else {
            try {
                await BotModel.findOneAndUpdate({ _id: message.guild.id },
                    {
                        activatedChannelId: message.channel.id,
                        channelName: message.channel.name,
                    }
                )
                return message.channel.send(`Updated channel to '${message.channel.name}'`)

            } catch (error) {
                console.error(error)
                return message.channel.send("Error: Failed to update activated channel")
            }
        }
    }
}