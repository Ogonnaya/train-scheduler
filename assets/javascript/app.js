// Your web app's Firebase configuration
var config = {
    apiKey: "AIzaSyBpTycaNOEM2UpoX-7bNlPqsIlnqtDq1LM",
    authDomain: "train-scheduler-homework-07.firebaseapp.com",
    databaseURL: "https://train-scheduler-homework-07.firebaseio.com",
    projectId: "train-scheduler-homework-07",
    storageBucket: "train-scheduler-homework-07.appspot.com",
    messagingSenderId: "661699174674",
    appId: "1:661699174674:web:09d0160734c9ec4cf993cb",
    measurementId: "G-E6LNFH6YQJ"
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

  $("#submit").on("click", function() {
    event.preventDefault();

    trainName = $("#trainName")
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

    database.ref().push({
      name: name,
      destination: destination,
      firstTrainTime: firstTrainTime,
     frequency: frequency,
      dateAdded: firebase.database.ServerValue.TIMESTAMP
    });
  });

  //grab data from
  database.ref().on(
    "child_added",
    function(childSnapshot) {
      console.log(childSnapshot);
      //display in row
      $("#displayTable").append(
        "<tr>" +
          "<td>" +
          childSnapshot.val().name +
          "<td>" +
          childSnapshot.val().destination +
          "<td>" +
          childSnapshot.val().firstTrainTime +
          "<td>" +
          childSnapshot.val().worked +
          "<td>" +
          childSnapshot.val().rate +
          "<td>" +
          childSnapshot.val().billed +
          "<tr>"
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