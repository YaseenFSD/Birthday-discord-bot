import { BirthdayModel, BotModel } from "../schemas"

const getUpcomingBday = (month, day) => {
    const currentDate = new Date()
    const currentYear = currentDate.getUTCFullYear()
    const currentTimestamp = currentDate.getTime()
    const bdayTime = new Date(currentYear, month - 1, day).getTime()

    if (currentTimestamp > bdayTime) {
        return new Date(currentYear + 1, month - 1, day).getTime()
    } else {
        return bdayTime
    }
}

export default {
    name: "bday",
    description: "Add birthday to be pinged in the activated channel by the bot on your birthday\n\n",
    help: function () { return `Command: bday \n\n Args: Takes a bday in the format of MM/DD/YYYY (or MM/DD)\n\nDescription:\n\t${this.description}` },
    execute: async function (message, args) {
        if (args[0] === "-h" || args[0] == "--help") {
            return message.channel.send(this.help())
        }
        const botExists = await BotModel.exists({ _id: message.guild.id })
        if (!botExists) {
            return message.channel.send("Error: Bot has not been activated.")
        }

        let month, day, year
        try {
            [month, day, year = 0] = args[0].split("/").map((num) => parseInt(num))

            if (isNaN(month) || isNaN(day) || isNaN(year)) {
                throw new Error("Invalid input")
            }

        } catch (error) {
            console.log(error)
            return message.channel.send("Error: Invalid format or input")
        }


        const yearExists = year > 0 ? true : false
        const Birthday = new BirthdayModel({
            _id: message.author.id,
            memberName: message.author.name,
            birthYear: {
                hasYear: yearExists,
                year: yearExists ? year : null,
            },
            date: getUpcomingBday(month, day)
        })

        const birthdayExists = await BirthdayModel.exists({ _id: message.author.id })
        if (birthdayExists) {
            // Update birthday document if exists
            await BirthdayModel.updateOne({ _id: message.author.id }, Birthday)
            message.reply("Birthday updated")
        } else {
            // Save birthday if it doesn't exist
            Birthday.save()
            message.reply("Birthday added")
        }


        const GuildBot = await BotModel.findById(message.guild.id)

        if (!GuildBot.birthdays.includes(message.author.id)) {
            // If birthdays is not stored in the Bot Document, then save it
            GuildBot.birthdays.push(Birthday)
            GuildBot.save()
        }


    }
}