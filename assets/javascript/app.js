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

//global variable
var trainName = "";
var destination = "";
var frequency = "";
var nextArrival = "";
var minutesAway = "";

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

  database.ref().push({
    name: trainName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  });
});

//grab data from
database.ref().on(
  "child_added",
  function(childSnapshot) {
    console.log(childSnapshot.val());
    //display in row
    $("#displayTable").append(
      "<tr>" +
        "<td>" +
        childSnapshot.val().trainName +
        "<td>" +
        childSnapshot.val().destination +
        "<td>" +
        childSnapshot.val().frequency +
        "<td>" +
        childSnapshot.val().trainArrival +
        "<td>" +
        childSnapshot.val().trainMinutesAway +
        "<td>"
    );
  },
  function(error) {
    console.log("error" + error.code);
  }
);

//     dataRef.ref().orderByChild("dateAdded").limitToLast(1).on("child_added", function(snapshot) {
//   // Change the HTML to reflect
//   $("#name").text(snapshot.val().name);
//   $("#role").text(snapshot.val().role);
//   $("#start-date").text(snapshot.val().startDate);
//   $("#worked").text(snapshot.val().worked);
// });
