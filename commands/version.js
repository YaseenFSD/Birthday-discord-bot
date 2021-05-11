export default {
    name: "version",
    description: "Sends a message of the current version of the bot",
    execute: async function (message, args){
        message.channel.send("Version: 1.1-beta")
    }
}