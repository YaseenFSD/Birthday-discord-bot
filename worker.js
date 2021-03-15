import cron from "node-cron"
import { BirthdayModel, BotModel } from "./schemas"

const worker = async (client) => {
    cron.schedule("0 21 * * *", () => {
        sendTodayBirthdays(client)
    }, {
        scheduled: true,
        timezone: "Etc/UTC"
    })
}
export default worker


const updateBirthday = async (date, bdayId, currentYear = new Date().getUTCFullYear()) => {
    const doc = await BirthdayModel.findByIdAndUpdate(bdayId, {
        date: new Date(date).setUTCFullYear(currentYear + 1)
    })
    doc.save()
}


const sendTodayBirthdays = async (client) => {
    const today = new Date()
    const currentDate = today.setHours(0, 0, 0, 0)
    const currentYear = today.getUTCFullYear()

    const bots = await BotModel.find().populate("birthdays")

    bots.forEach((bot) => {

        const todayBirthdays = bot.birthdays.filter((birthday) => currentDate === new Date(birthday.date).setHours(0, 0, 0, 0))

        if (todayBirthdays.length === 1){
            const onlyBirthday = todayBirthdays[0]
            updateBirthday(onlyBirthday.date, onlyBirthday._id, currentYear)
            return client.channels.cache.get(bot.activatedChannelId).send(`Happy birthday to <@${onlyBirthday._id}>${onlyBirthday.birthYear.hasYear ? ` for turning ${currentYear - onlyBirthday.birthYear.year}`: ""}`)
        }

        let birthdayMessage = "Everyone wish these people happy birthday today :partying_face:\n"
        
        for (const bday of todayBirthdays) {
            birthdayMessage += `\n<@${bday._id}>`
            if (bday.birthYear.hasYear) {
                birthdayMessage += ` for turning ${currentYear - bday.birthYear.year}!`
            }
            updateBirthday(bday.date, bday._id, currentYear)
        }
        if (todayBirthdays.length !== 0){
            return client.channels.cache.get(bot.activatedChannelId).send(birthdayMessage)
        }
    })
}
