/* ---------- Functions ---------- */
function updateTime() {
    var time = dayjs().format("HH:mm:ss")
    $("#time").html(time);
}

function updatePage() {
    var selectedTimezone = $("#timezone-list").selectize()[0].selectize.getValue();
    selectedTimezone = selectedTimezone.split(" ")[0];
    var currentTimezone = $("#current-timezone");

    $(currentTimezone).html(selectedTimezone)
    
}

function triggerModal() {
    micromodal.show("modal-1")
}

function insertTimezones() {
    var selectHTML = $("#timezone-list")
    var timezoneList = Intl.supportedValuesOf("timeZone")

    timezoneList.forEach( e => {
        // Get current based on current timezone chosen per loop, and format to string
        let offset = dayjs().tz(e).format("Z").toString()
        // Format offset to be "GMT +00:00"
        offset = "GMT " + offset
        
        // Format options to be "{timezone} {offset}"
        newOption = $("<option class='timezone-option'>" + e + " " + offset + "</option>")
        $(selectHTML).append(newOption)
    })
}

function selectizeTzList() {
    var timezoneList = $("#timezone-list")
    $(timezoneList).selectize({
        allowEmptyOption: true,
        showEmptyOptionInDropdown: true
    })
}

/* ---------- NPM Packages ----------- */
const dayjs = require("dayjs")
const micromodal = require("../node_modules/micromodal/dist/micromodal")
const $ = require("../node_modules/jquery/dist/jquery")
const selectize = require("@selectize/selectize")
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
    var submitTimezone = $("#modal-1__submit");

    // Default timezone
    $(userTimezone).html(dayjs.tz.guess());
    
    // Click to trigger modal -> change timezone
    $(userTimezone).click(triggerModal);

    // When timezone entered, update time and current timezone
    $(submitTimezone).click(updatePage)

    // Insert date and time
    $(dateHTML).html(date);
    $(timeHTML).html(time);
    
    insertTimezones()
    selectizeTzList()
})