/* ---------- Functions ---------- */
function updateTime() {
    var time = dayjs().format("HH:mm:ss")
    document.getElementById("time").innerHTML = time
}

function triggerModal() {
    micromodal.show("modal-1")
}

function insertTimezones() {
    var selectHTML = document.getElementById("timezone-list")
    var timezoneList = Intl.supportedValuesOf("timeZone")
    timezoneList.forEach( e => {
        newOption = document.createElement("option")
        newOption.innerHTML = e
        newOption.classList.add("timezone-option")
        selectHTML.appendChild(newOption)
    })
}

function toggleTimezoneList() {
    var timezoneList = document.getElementById("timezone-list")
    timezoneList.classList.toggle("is-open")
}

/* ---------- NPM Packages ----------- */
const dayjs = require("dayjs")
const micromodal = require("../node_modules/micromodal/dist/micromodal")
var utc = require("dayjs/plugin/utc")
var timezone = require("dayjs/plugin/timezone")

/* ---------- Plugins ----------- */
dayjs.extend(utc)
dayjs.extend(timezone)

/* ---------- Main content ---------- */
var now = dayjs()
var date = now.format("dddd, D MMMM YYYY")
var time = now.format("HH:mm:ss")
micromodal.init()
setInterval(updateTime, 1000)


// When page is loaded...
document.addEventListener("DOMContentLoaded", () => {
    // Get elements from HTML
    var userTimezone = document.getElementById("current-timezone")
    var dateHTML = document.getElementById("date")
    var timeHTML = document.getElementById("time")
    var searchTimezone = document.getElementById("timezone-search")

    // Default timezone
    userTimezone.innerHTML = dayjs.tz.guess()
    
    // Click to trigger modal -> change timezone
    userTimezone.addEventListener("click", triggerModal)

    // On search bar's focus event, toggle list of available timezones
    searchTimezone.addEventListener("focusin", toggleTimezoneList)

    // Insert date and time
    dateHTML.innerHTML = date
    timeHTML.innerHTML = time

    insertTimezones()
})