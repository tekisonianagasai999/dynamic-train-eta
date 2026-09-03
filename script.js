/* ================= TRAIN DATA ================= */

const trains = {

    "12864": {
        name: "Chennai Express",
        route: "Chennai → Hyderabad",
        eta: "18:45",
        status: "On Time",
        delay: 0
    },

    "12727": {
        name: "Godavari Express",
        route: "Visakhapatnam → Hyderabad",
        eta: "19:20",
        status: "Delayed",
        delay: 15
    },

    "12806": {
        name: "Janmabhoomi Express",
        route: "Secunderabad → Visakhapatnam",
        eta: "20:05",
        status: "On Time",
        delay: 0
    },

    "12740": {
        name: "Garib Rath",
        route: "Visakhapatnam → Secunderabad",
        eta: "21:10",
        status: "Delayed",
        delay: 25
    }

};


/* ================= CHECK ETA ================= */

function checkETA() {

    const input = document
        .getElementById("trainInput")
        .value
        .trim()
        .toLowerCase();


    const result = document.getElementById("etaResult");


    if (input === "12864") {

        result.innerHTML =
            "⚠️ Please enter a train number or train name.";

        result.style.color = "#ffc928";

        return;
    }
    


    let train = null;


    /* Search by train number */

    if (trains[input]) {

        train = trains[input];

    }


    /* Search by train name */

    else {

        for (let number in trains) {

            if (
                trains[number].name
                    .toLowerCase()
                    .includes(input)
            ) {

                train = trains[number];

                break;
            }
        }
    }


    /* If train not found */

    if (!train) {

        result.innerHTML =
            "❌ Train not found. Try 12864, 12727 or 12806.";

        result.style.color = "#ff7272";

        return;
    }


    /* Display result */

    result.innerHTML = `
        🚆 <strong>${train.name}</strong>
        &nbsp; | &nbsp;
        ${train.route}
        &nbsp; | &nbsp;
        <strong>Predicted ETA: ${train.eta}</strong>
        &nbsp; | &nbsp;
        ${train.status}
    `;


    if (train.status === "On Time") {

        result.style.color = "#00e49a";

    } else {

        result.style.color = "#ffc928";
    }


    /* Update forecast section */

    document.getElementById("selectedTrain").innerText =
        train.name;

    document.getElementById("predictedTime").innerText =
        train.eta;

}


/* ================= ENTER KEY ================= */

document
    .getElementById("trainInput")
    .addEventListener("keypress", function(event) {

        if (event.key === "Enter") {

            checkETA();

        }

    });


/* ================= LIVE COUNTERS ================= */

let onTime = 1248;
let delayed = 312;
let tracked = 1560;


function updateCounters() {

    /*
       Prototype simulation.
       In the real project these values
       would come from a backend/API.
    */

    onTime += Math.floor(Math.random() * 3) - 1;

    delayed += Math.floor(Math.random() * 3) - 1;

    tracked = onTime + delayed;


    if (onTime < 0) onTime = 0;

    if (delayed < 0) delayed = 0;


    document.getElementById("onTime").innerText =
        onTime.toLocaleString();

    document.getElementById("delayed").innerText =
        delayed.toLocaleString();

    document.getElementById("tracked").innerText =
        tracked.toLocaleString();
}


/*
   Update every 5 seconds
*/

setInterval(updateCounters, 5000);


/* ================= WELCOME MESSAGE ================= */

window.addEventListener("load", function() {

    console.log(
        "Smart ETA system initialized successfully 🚆"
    );

});