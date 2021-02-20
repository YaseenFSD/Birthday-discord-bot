export default {
    name: "activate",
    description: "Activates the timed bot messages in the channel in which it was called.\n\n (This command is only accessible by the server creator)",
    help: function () { return `!activate - Args:\tTakes no arguments\n\nDescription:\n ${this.description}` },
    execute: function (message, args) {
        if (args[0] === "-h" || args[0] == "--help")
            message.channel.send(this.help())
        else if (message.guild.ownerID === message.author.id){
            // Todo: implement functionality here
        }
    }
}