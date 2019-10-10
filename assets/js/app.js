 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyBsjooCD5Q2mZnx3t230lrtWxVd42OMUOQ",
    authDomain: "click-counter-4cfc1.firebaseapp.com",
    databaseURL: "https://click-counter-4cfc1.firebaseio.com",
    projectId: "click-counter-4cfc1",
    storageBucket: "click-counter-4cfc1.appspot.com",
    messagingSenderId: "1036095834809",
    appId: "1:1036095834809:web:60ea24c45f7a1093b86968"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var dataRef = firebase.database();

  var trainName = "";
  var destination = "";
  var firstTime = "";
  var frequency = 0;
  var currentTime = moment();
  console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));
  // var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
  $("#add-data").on("click", function(event){
    event.preventDefault();

    trainName = $("#name-input").val().trim();
    destination = $("#destination-input").val().trim();
    firstTime = $("#time-input").val().trim();
    frequency = $("#frequency-input").val().trim();

    dataRef.ref().push({
        name: trainName,
        destination: destination,
        firstTrainTime: firstTime,
        frequency: frequency
    });
  });

  dataRef.ref().on("child_added", function(childSnapshot){
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().destination);
    console.log(childSnapshot.val().firstTrainTime);
    console.log(childSnapshot.val().frequency);
    var name = childSnapshot.val().name;
    var destin = childSnapshot.val().destination;
    var firstTime = childSnapshot.val().firstTrainTime;
    var freq = childSnapshot.val().frequency;
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    var timeDiff = moment().diff(moment(firstTimeConverted), "minutes");
    var remaining = parseInt(timeDiff) % frequency;
    var minTill = frequency - remaining;
    var nextTrain = moment(moment(), "HH:mm").add(minTill, "minutes");
    console.log(nextTrain);

    $("#train-display").append("<tr><td>" + name + "</td><td>" 
    + destin + "</td><td>" + freq + "</td><td>" 
    + nextTrain + "</td><td>" + minTill + "</td></tr>");
  },
  
  function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  }
  );

