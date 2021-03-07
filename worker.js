import cron from "node-cron"
import { BotModel } from "./schemas"

const worker = async (client) => {
    cron.schedule("0 21 * * *", () => {
        sendTodayBirthdays(client)
    }, {
        scheduled: true,
        timezone: "Etc/UTC"
    })
}
export default worker


const sendTodayBirthdays = async (client) => {
    const today = new Date()
    const currentDate = today.setHours(0, 0, 0, 0)
    const currentYear = today.getFullYear()

    const bots = await BotModel.find().populate("birthdays")

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