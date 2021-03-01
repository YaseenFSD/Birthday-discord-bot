import cron from "node-cron"

const worker = async (client) => {
    cron.schedule("0 21 * * *", () => {
        console.log("testing")
    }, {
        scheduled: true,
        timezone: "Etc/UTC"
    })
}
export default worker