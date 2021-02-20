import { discord } from "discord.js"

const startServer = async () => {
    // Mongoose connection should start here


}



try {
    startServer()
    
} catch (err) {
    console.log(`Server unable to start ${err}`)
}

process.on("unhandledRejection", (reason, promise) => {
    console.log("Unhandled Rejection at: ", reason, "Promise: ", promise)
})