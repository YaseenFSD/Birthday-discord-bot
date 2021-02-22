import { BirthdayModel, BotModel } from "../schemas"

const getUpcomingBday = (month, day) => {
    const currentDate = new Date()
    const currentYear = currentDate.getUTCFullYear()
    const currentTimestamp = currentDate.getTime()
    const bdayTime = new Date(currentYear, month - 1, day, 21).getTime()
    // * 21 (hours) is equivalent to 9 pm UTC
    
    if (currentTimestamp > bdayTime){
        return new Date(currentYear + 1, month - 1, day,  21).getTime()
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

        // const upcomingBday = 
        
        const yearExists = year > 0 ? true : false
        const newBirthday = new BirthdayModel({
            _id: message.author.id,
            memberName: message.author.name,
            birthYear: {
                hasYear: yearExists,
                year: yearExists ? year : null,
            },
            date: getUpcomingBday(month, day)
        })
        // await BotModel.findOneAndUpdate()
        message.channel.send(`month: ${typeof month} day:${typeof day} year:${typeof year}`)

    }
}