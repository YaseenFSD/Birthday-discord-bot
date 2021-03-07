import { Message } from "discord.js"
import cron from "node-cron"
import { BotModel } from "./schemas"

const worker = async (client) => {
    // Todo: once testing is complete change schedule to 0 minutes 21 hours utc
    // cron.schedule("0 21 * * *", () => {
    //     console.log("testing")
    //     sendTodayBirthdays(client)
    // }, {
    //     scheduled: true,
    //     timezone: "Etc/UTC"
    // })
    // cron.schedule("1 * * * *", () => {
        sendTodayBirthdays(client)
    // })
    
    // cron.schedule("")
}
export default worker


const sendTodayBirthdays = async (client) => {
    const today = new Date()
    const currentDate = today.setHours(0, 0, 0, 0)
    // const currentYear = currentDate.getFullYear()
    const currentYear = today.getFullYear()

    const bots = await BotModel.find().populate("birthdays")
    // await bots.populate('birthdays')

    // console.log(bots)

    bots.forEach((bot) => {

        let birthdayMessage = "Everyone wish these people happy birthday today :partying_face:\n"
        const todayBirthdays = bot.birthdays.filter((birthday) => currentDate === new Date(birthday.date).setHours(0, 0, 0, 0))
        for (const bday of todayBirthdays) {
            birthdayMessage += `\n<@${bday._id}>`
            if (bday.birthYear.hasYear) {
                birthdayMessage += ` for turning ${currentYear - bday.birthYear.year}!`
            }
        }
        if (todayBirthdays.length !== 0){
            client.channels.cache.get(bot.activatedChannelId).send(birthdayMessage)
        }
    })
}