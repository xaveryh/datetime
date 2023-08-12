/* ---------- Functions ---------- */
function updateTime(showingTimezone) {
    // If no timezone from the modal was selected, guess the user's timezone
    if (showingTimezone == "") {
        var selectedTimezone = dayjs.tz.guess()
    }
    // Else show the selected timezone
    else {
        var selectedTimezone  = showingTimezone
    }
    // Show current time with timezone's offset, and format the time to be readable
    var time = dayjs().tz(selectedTimezone).format("HH:mm:ss")
    // Display the time to html
    $("#time").html(time);
}

function updatePage() {
    // Get chosen value from select
    var selectedTimezone = $("#timezone-list").selectize()[0].selectize.getValue();
    // Split value to seperate timezone and GMT
    selectedTimezone = selectedTimezone.split(" ")[0];
    // Get timezone's html display
    var currentTimezone = $("#current-timezone")

    // If no timezone was chosen, show an error
    if (selectedTimezone == "") {
        alert("Please enter choose a timezone")
    }
    else {
        // Display current chosen timezone
        currentTimezone.html(selectedTimezone)
        // Set global timezone variable to be the chosen one by the user
        showingTimezone = selectedTimezone
        // Revert selectizejs's option to be default
        $("#timezone-list").selectize()[0].selectize.clear()
    }
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
        showEmptyOptionInDropdown: true,
        deselectBehavior: "top"
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
var showingTimezone = ""
micromodal.init()
setInterval(() => { updateTime(showingTimezone) }, 1000)


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
    
    // Insert timezone to select options on modal open
    insertTimezones()
    // Use selectizejs make select be searchable
    selectizeTzList()
})