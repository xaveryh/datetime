function updateTime() {
    if (httpRequest.readyState === 4 && httpRequest.status === 200) {
        var time = dayjs().format("HH:mm:ss")
        document.getElementById("time").innerHTML = time
    }
}


const dayjs = require("dayjs")
var utc = require("dayjs/plugin/utc")
var timezone = require("dayjs/plugin/timezone")

dayjs.extend(utc)
dayjs.extend(timezone)

var now = dayjs()
var date = now.format("dddd, D MMMM YYYY")
var time = now.format("HH:mm:ss")

const httpRequest = new XMLHttpRequest()
httpRequest.onreadystatechange = updateTime
httpRequest.open("GET", "http://127.0.0.1:5500/static/", "true")
httpRequest.send()



// When page is loaded...
document.addEventListener("DOMContentLoaded", () => {
    var userTimezone = document.getElementById("timezone")
    var dateHTML = document.getElementById("date")
    var timeHTML = document.getElementById("time")

    userTimezone.innerHTML = dayjs.tz.guess()
    dateHTML.innerHTML = date
    timeHTML.innerHTML = time
})