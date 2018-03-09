  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyA0xOVQ1qN2f356glQAKCVZF89_dZd_cYA",
    authDomain: "newtrain-72eb4.firebaseapp.com",
    databaseURL: "https://newtrain-72eb4.firebaseio.com",
    projectId: "newtrain-72eb4",
    storageBucket: "newtrain-72eb4.appspot.com",
    messagingSenderId: "213997843907"
  };
  firebase.initializeApp(config);
  
  var database = firebase.database();

// On click get value of form
$('.btn').on('click', function(event) {
	event.preventDefault();
	
	var trainName = $('#trainName').val().trim();
	var destination = $('#destination').val().trim();
	var firstTrain = moment($('#firstTrain').val().trim(), "hh:mm").subtract(1,"years").format("X");
	var frequency = $('#frequency').val().trim();
	console.log(firstTrain);
	
	var newTrain = {
		name: trainName,
		destination: destination,
		firstTrain: firstTrain,
		time: frequency
	};

// Push data to database
	database.ref().push(newTrain);
	
	// console.log(newTrain.name);
	// console.log(newTrain.destination);
	// console.log(newTrain.firstTrain);
	// console.log(newTrain.time);
	
// Clears input fields
	$('#trainName').val('');
	$('#destination').val('');
	$('#firstTrain').val('');
	$('#frequency').val('');
	
	return false;
});

database.ref().on('child_added', function(snapshot) {
	var train = snapshot.val().name;
	var destination = snapshot.val().destination;
	var frequency = snapshot.val().time;
	var firstTrain = snapshot.val().firstTrain;
	var nextStop = moment().diff(moment.unix(firstTrain), "minutes")%frequency;
	var minutes = frequency - nextStop;
	var arrival = moment().add(minutes, "m").format("hh:mm A");

	console.log(nextStop);
	console.log(minutes);
	console.log(arrival);


	$('#scheduleTable > tbody ').append('<tr><td>' + train + '</td><td>' + destination + '</td><td>' + frequency + '</td><td>' + arrival + '</td><td>' + minutes + '</td></tr>');

})