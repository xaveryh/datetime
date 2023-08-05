function updateTime() {
    var time = dayjs().format("HH:mm:ss")
    document.getElementById("time").innerHTML = time
}

function showModal(element) {
    micromodal.show(element )
}

const dayjs = require("dayjs")
const MicroModal = require("micromodal")
var utc = require("dayjs/plugin/utc")
var timezone = require("dayjs/plugin/timezone")


dayjs.extend(utc)
dayjs.extend(timezone)

var now = dayjs()
var date = now.format("dddd, D MMMM YYYY")
var time = now.format("HH:mm:ss")

setInterval(updateTime, 1000)

// When page is loaded...
document.addEventListener("DOMContentLoaded", () => {
    var userTimezone = document.getElementById("timezone")
    var dateHTML = document.getElementById("date")
    var timeHTML = document.getElementById("time")

    userTimezone.innerHTML = dayjs.tz.guess()
    userTimezone.addEventListener("click", () => { showModal(userTimezone) })
    dateHTML.innerHTML = date
    timeHTML.innerHTML = time
})