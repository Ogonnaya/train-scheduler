// Your web app's Firebase configuration
var config = {
  apiKey: "AIzaSyBpTycaNOEM2UpoX-7bNlPqsIlnqtDq1LM",
  authDomain: "train-scheduler-homework-07.firebaseapp.com",
  databaseURL: "https://train-scheduler-homework-07.firebaseio.com",
  storageBucket: "train-scheduler-homework-07.appspot.com"
};

// Initialize Firebase
firebase.initializeApp(config);
var database = firebase.database();

// Global variable
var trainName = "";
var destination = "";
var frequency = "";
var nextArrival = "";
var minutesAway = "";

// Click submit to add trains
$("#submit").on("click", function(event) {
  event.preventDefault();

  trainName = $("#train-name")
    .val()
    .trim();
  destination = $("#destination")
    .val()
    .trim();
  firstTrainTime = $("#first-train")
    .val()
    .trim();
  frequency = $("#frequency")
    .val()
    .trim();

  console.log(trainName);
  console.log(destination);
  console.log(firstTrainTime);
  console.log(frequency);

  // Upload trains to firebase
  database.ref().push({
    name: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  });

  // Clear input from text boxes
  $("#train-name").val("");
  $("#destination").val("");
  $("#first-train").val("");
  $("#frequency").val("");
});

//grab data from database
database.ref().on(
  "child_added",
  function(childSnapshot) {
    console.log(childSnapshot.val());

    // Calculate arrival time and minutes away
    var timeArr = childSnapshot.val().firstTrainTime.split(":");
    var trainTime = moment()
      .hours(timeArr[0])
      .minutes(timeArr[1]);
    var maxMoment = moment.max(moment(), trainTime);

    trainMinutesAway;
    nextArrival;

    // Set arrival time for first train
    if (maxMoment === trainTime) {
      nextArrival = trainTime.format("hh:mm A");
      minutesAway = trainTime.diff(moment(), "minutes");
    } else {
      var differenceTimes = moment().diff(trainTime, "minutes");
      var remainder = differenceTimes % childSnapshot.val().frequency;

      minutesAway = childSnapshot.val().frequency - remainder;

      // Calculate next arrival
      nextArrival = moment()
        .add(minutesAway, "m")
        .format("hh:mm A");
    }
    console.log("minutesAway:", minutesAway);
    console.log("nextArrival:", nextArrival);

    //display train info in rows
    $("#displayTable").append(
      "<tr>" +
        "<td>" +
        childSnapshot.val().name +
        "<td>" +
        childSnapshot.val().destination +
        "<td>" +
        childSnapshot.val().frequency +
        "<td>" +
        nextArrival +
        "<td>" +
        minutesAway
    );
  },
  function(error) {
    console.log("error" + error.code);
  }
);
