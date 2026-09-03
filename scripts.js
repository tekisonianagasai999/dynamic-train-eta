/* =====================================================
   SMART ETA TRAIN DATABASE
===================================================== */

const trainDatabase = {

    "12864": {
        number: "12864",
        name: "Chennai Express",

        route:
            "Chennai Central (MAS) → Hyderabad Deccan (HYB)",

        location:
            "Near Vijayawada Junction",

        nextStation:
            "Vijayawada Junction",

        speed: 72,

        averageSpeed: 64,

        eta: "18:45",

        delay: 0,

        confidence: 94,

        status: "ON TIME",

        statusText:
            "Running as scheduled"
    },


    "12727": {
        number: "12727",
        name: "Godavari Express",

        route:
            "Visakhapatnam → Hyderabad",

        location:
            "Near Rajahmundry",

        nextStation:
            "Vijayawada Junction",

        speed: 61,

        averageSpeed: 63,

        eta: "19:20",

        delay: 15,

        confidence: 88,

        status: "DELAYED",

        statusText:
            "Running 15 minutes late"
    },


    "12806": {
        number: "12806",
        name: "Janmabhoomi Express",

        route:
            "Secunderabad → Visakhapatnam",

        location:
            "Near Warangal",

        nextStation:
            "Warangal",

        speed: 68,

        averageSpeed: 65,

        eta: "20:05",

        delay: 0,

        confidence: 92,

        status: "ON TIME",

        statusText:
            "Running as scheduled"
    },


    "12740": {
        number: "12740",
        name: "Garib Rath",

        route:
            "Visakhapatnam → Secunderabad",

        location:
            "Near Anakapalle",

        nextStation:
            "Rajahmundry",

        speed: 58,

        averageSpeed: 62,

        eta: "21:10",

        delay: 25,

        confidence: 82,

        status: "DELAYED",

        statusText:
            "Running 25 minutes late"
    }

};


/* =====================================================
   HOME PAGE
===================================================== */

const trainInput =
    document.getElementById("trainInput");

const checkBtn =
    document.getElementById("checkBtn");

const errorMessage =
    document.getElementById("errorMessage");


function searchTrain() {

    if (!trainInput) {
        return;
    }


    const input =
        trainInput.value
        .trim()
        .toLowerCase();


    errorMessage.textContent = "";


    if (input === "") {

        errorMessage.textContent =
            "Please enter a train number or train name.";

        return;
    }


    let selectedTrain = null;


    /* Search by train number */

    if (trainDatabase[input]) {

        selectedTrain =
            trainDatabase[input];

    }


    /* Search by train name */

    else {

        for (
            const number in trainDatabase
        ) {

            const train =
                trainDatabase[number];


            if (
                train.name
                    .toLowerCase()
                    .includes(input)
            ) {

                selectedTrain = train;

                break;
            }
        }
    }


    /* Train not found */

    if (!selectedTrain) {

        errorMessage.textContent =
            "Train not found. Try 12864, 12727, 12806 or 12740.";

        return;
    }


    /*
       Store selected train so train.html
       can display its information.
    */

    localStorage.setItem(
        "selectedTrain",
        selectedTrain.number
    );


    /* Redirect */

    window.location.href =
        "train.html";
}


if (checkBtn) {

    checkBtn.addEventListener(
        "click",
        searchTrain
    );

}


if (trainInput) {

    trainInput.addEventListener(
        "keydown",
        function(event) {

            if (event.key === "Enter") {

                searchTrain();

            }

        }
    );

}


/* =====================================================
   TRAIN DETAILS PAGE
===================================================== */

const selectedNumber =
    localStorage.getItem("selectedTrain");


if (
    selectedNumber &&
    document.getElementById("trainName")
) {

    const train =
        trainDatabase[selectedNumber];


    if (train) {

        /* Basic information */

        document.getElementById(
            "trainName"
        ).textContent =
            `${train.number} – ${train.name}`;


        document.getElementById(
            "trainRoute"
        ).textContent =
            train.route;


        document.getElementById(
            "location"
        ).textContent =
            train.location;


        document.getElementById(
            "nextStation"
        ).textContent =
            train.nextStation;


        document.getElementById(
            "speed"
        ).textContent =
            `${train.speed} km/h`;


        document.getElementById(
            "eta"
        ).textContent =
            train.eta;


        document.getElementById(
            "liveEta"
        ).textContent =
            train.eta;


        document.getElementById(
            "delay"
        ).textContent =
            `${train.delay} mins`;


        /* Train details */

        document.getElementById(
            "detailNumber"
        ).textContent =
            train.number;


        document.getElementById(
            "detailName"
        ).textContent =
            train.name;


        /* Delay */

        document.getElementById(
            "gaugeDelay"
        ).textContent =
            train.delay;


        /* Status */

        const badge =
            document.getElementById(
                "statusBadge"
            );

        const statusText =
            document.getElementById(
                "statusText"
            );


        badge.textContent =
            `● ${train.status}`;


        statusText.textContent =
            train.statusText;


        if (train.delay > 0) {

            badge.classList.remove(
                "ontime"
            );

            badge.style.color =
                "#ffc928";

            badge.style.borderColor =
                "#d49d00";

            badge.style.background =
                "rgba(255,200,0,.1)";


            statusText.style.color =
                "#ffc928";

        }

    }

}


/* =====================================================
   SIMULATED LIVE SPEED UPDATE
===================================================== */

if (
    document.getElementById("speed") &&
    selectedNumber
) {

    const train =
        trainDatabase[selectedNumber];


    setInterval(function() {

        const variation =
            Math.floor(
                Math.random() * 7
            ) - 3;


        const newSpeed =
            Math.max(
                35,
                train.speed + variation
            );


        document.getElementById(
            "speed"
        ).textContent =
            `${newSpeed} km/h`;


        document.getElementById(
            "updated"
        ).textContent =
            "Just now";


    }, 5000);

}


/* =====================================================
   CONSOLE MESSAGE
===================================================== */

console.log(
    "SMART ETA system initialized successfully 🚆"
);