
export default {
    name: "roll",
    description: "Gives back a random number 1-6",
    execute: async function (message) {
        const randomNumber = Math.ceil(Math.random() * 6)
        message.reply(randomNumber)
    }
}