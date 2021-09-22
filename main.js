import Discord from "discord.js"
import config from "./config"
import fs from "fs"
import mongoose from "mongoose"
import { BotModel } from "./schemas"
import worker from "./worker"

const { prefix } = config

const client = new Discord.Client()
client.commands = new Discord.Collection()

const commandFiles = fs.readdirSync('./commands').filter((file) => file.endsWith(".js"))


const setCommands = async () => {
    for (const file of commandFiles) {
        const { default: command } = await import(`./commands/${file}`)
        client.commands.set(command.name, command)
    }
}


const startServer = async () => {
    await setCommands()
    await mongoose.connect(config.mongoURL, { useFindAndModify: false, useNewUrlParser: true, useUnifiedTopology: true })

    client.once("ready", () => {
        console.log("Ready!")
        worker(client)
    })


    client.on('message', (message) => {
        // if (message.channel.type === "dm") {
        //     fs.appendFile("messages.txt", `\nMessage from: ${message.author.username}\nContent: ${message.content}\n`, (err) => {
        //         if (err) { console.log(err) }
        //     });
        // }
        if (!message.content.startsWith(prefix) || message.author.bot) return;
        const args = message.content.slice(prefix.length).trim().split(/ +/);
        const command = args.shift().toLowerCase();
        if (!client.commands.has(command)) return;


        try {
            client.commands.get(command).execute(message, args)
        } catch (error) {
            console.error(error)
            message.reply(`An error has occured trying to execute command of ${command}`)
        }


    })

    client.on('guildMemberRemove', async (member) => {
        // Remove member from the guild "birthdays" array when that member leaves the guild
        const guildBot = await BotModel.findById(member.guild.id)
        if (!guildBot.birthdays) { return; }
        const leftUserIndex = guildBot.birthdays.indexOf(member.id)
        if (leftUserIndex !== -1) {
            guildBot.birthdays.pop(guildBot.birthdays.indexOf(member.id))
            guildBot.save()
        }
    })

    client.login(config.token)
}


try {
    startServer()

} catch (err) {
    console.log(`Server unable to start ${err}`)
}


process.on("unhandledRejection", (reason, promise) => {
    console.log("Unhandled Rejection at: ", reason, "Promise: ", promise)
})