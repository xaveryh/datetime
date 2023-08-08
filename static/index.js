/* ---------- Functions ---------- */
function updateTime() {
    var time = dayjs().format("HH:mm:ss")
    $("#time").html(time);
}

function triggerModal() {
    micromodal.show("modal-1")
}

function insertTimezones() {
    var selectHTML = $("#timezone-list")
    var timezoneList = Intl.supportedValuesOf("timeZone")
    timezoneList.forEach( e => {
        newOption = $("<option class='timezone-option'>" + e + "</option>")
        $(selectHTML).append(newOption)
    })
}

function openTimezoneList() {
    var timezoneList = document.getElementById("timezone-list")
    timezoneList.style.display = "block"
}

function closeTimezoneList() {
    var timezoneList = document.getElementById("timezone-list")
    timezoneList.style.display = "none"
}

/* ---------- NPM Packages ----------- */
const dayjs = require("dayjs")
const micromodal = require("../node_modules/micromodal/dist/micromodal")
const $ = require("../node_modules/jquery/dist/jquery")
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
$("document").ready(() => {
    // Get elements from HTML
    var userTimezone = $("#current-timezone");
    var dateHTML = $("#date");
    var timeHTML = $("#time");
    var searchTimezone = $("#timezone-search")
    var timezoneList = $("#timezone-list")
    
    // Default timezone
    $(userTimezone).html(dayjs.tz.guess());
    
    // Click to trigger modal -> change timezone
    $(userTimezone).click(triggerModal);

    // On search bar's focus event, toggle list of available timezones
    $(searchTimezone).on("focus", openTimezoneList);
    $(searchTimezone).on("blur", () => {
        if (document.activeElement.id == "timezone-list") {
            openTimezoneList()
        }
        else {
            closeTimezoneList()
        }
    })
    $(timezoneList).on("focusout", closeTimezoneList)

    // Insert date and time
    $(dateHTML).html(date);
    $(timeHTML).html(time);
    
    insertTimezones()
})