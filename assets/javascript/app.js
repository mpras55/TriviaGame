// Global Variables
var correctAnswers = 0;
var incorrectAnswers = 0;
var unaswered = 0;
var answered = 0;
var qIndex = 0;
var answerSelected = false;
var totalTime = 0;

// Set the time intervals here (in seconds)
// Timer for each trivia question
var secondsPerQuestion = 60;

// Time gap before loading next question
var nextQTime = 12;
//////////////////////////////////////////////

var questionInterval = nextQTime * 1000;
var clkIntervalId;
var qIntervalId;
var clkCounter = 0;

// Trivia questions
var questions = [
	{
		// Question #1
		q: "What is the freezing point of water (in Celcius) ?"
		, a: "20 C"
		, b: "0 C"
		, c: "-5 C"
		, d: "32 C"
		, ans: "b"
		, anstext: "The temperature at which a liquid changes into a solid is called freezing point. Water freezes to form ice at 0 C ( or 32 F). Ice also melts at same temperature."
		, image: "assets/images/question01.jpg"
	}
	,
	{
		// Question #2
		q: "What Golden Globe winning actor played Tony Soprano's cousin Tony Blundetto?"
		, a: "Kevin Spacey"
		, b: "Willem Dafoe"
		, c: "Steve Buscemi"
		, d: "James Gandolfini"
		, ans: "c"
		, anstext: "Anthony 'Tony' Blundetto, played by Steve Buscemi, is a fictional character on the HBO TV series The Sopranos. He is Tony Soprano's cousin who is released from prison at the beginning of the show's fifth season"
		, image: "assets/images/question02.png"
	}
	,
	{
		// Question #3
		q: "What is the name of the Magician who often caused problems for King Arthur?"
		, a: "Guinevere"
		, b: "Morgan le Fay"
		, c: "Brigit the Cruel"
		, d: "Merlin"
		, ans: "b"
		, anstext: "Morgan le Fay is a powerful enchantress in the Arthurian legend. In texts such as the Lancelot-Grail and the Post-Vulgate Cycle she is described as a dangerous enemy of King Arthur and is an unpredictable antihero and antagonist of some tales."
		, image: "assets/images/question03.jpg"
	}
	,
	{
		// Question #4
		q: "What is the name of the college football bowl game that has been played annually in Miami since 1935?"
		, a: "Sugar Bowl"
		, b: "Sun Bowl"
		, c: "Orange Bowl"
		, d: "Rose Bowl"
		, ans: "c"
		, anstext: "The Orange Bowl, is an annual American college football bowl game played at Hard Rock Stadium in Miami Gardens, Florida. The Orange Bowl, along with the Sugar Bowl and the Sun Bowl, is the second-oldest bowl game in the country, behind the Rose Bowl (first played 1902, played annually since 1916)."
		, image: "assets/images/question04.jpg"
	}
	,
	{
		// Question #5
		q: "The world's busiest train station, Shinjuku Station, is located in what city?"
		, a: "Beijing"
		, b: "Seoul"
		, c: "Tokyo"
		, d: "Shanghai"
		, ans: "c"
		, anstext: "Shinjuku Station is a major railway station in Shinjuku and Shibuya wards in Tokyo, Japan. The station was used by an average of 3.64 million people per day in 2007, making it, by far, the world's busiest transport hub."
		, image: "assets/images/question05.jpg"
	}
	,
	{
		// Question #6
		q: "Adele recorded the theme song for what James Bond movie?"
		, a: "Skyfall"
		, b: "Casino Royale"
		, c: "Quantum of Solace"
		, d: "Spectre"
		, ans: "a"
		, anstext: "Skyfall is the theme song of the 2012 James Bond film of the same name, performed by the English singer Adele. It was written by Adele and the producer Paul Epworth, and features orchestration by J. A. C. Redford."
		, image: "assets/images/question06.jpg"
	}
	,
	{
		// Question #7
		q: "In what city does SpongeBob SquarePants and his friends live?"
		, a: "Ocean Floor"
		, b: "Coral Shores"
		, c: "Clamton"
		, d: "Bikini Bottom"
		, ans: "d"
		, anstext: "Bikini Bottom, which in its history, has gone by the names 'Bikini Gulch', 'Dead Eye Gulch' and 'Bikini Bottomshire' is the main setting in the SpongeBob SquarePants series. The city has a proper population of about 538! The city consists of various businesses, including restaurants, stores, and manufacturers."
		, image: "assets/images/question07.jpg"
	}
	,
	{
		// Question #8
		q: "From which country did the United States purchase the Alaskan territory in 1867?"
		, a: "Spain"
		, b: "Russia"
		, c: "England"
		, d: "France"
		, ans: "b"
		, anstext: "Russian America was the name of the Russian colonial possessions in North America from 1733 to 1867. Its capital was Novo-Archangelsk (New Archangel), which is now Sitka, Alaska, USA. In 1867, Russia sold its last remaining possessions to the United States of America for $7.2 million."
		, image: "assets/images/question08.jpg"
	}
	,
	{
		// Question #9
		q: "What is the name of the alien race featured in the 2009 movie Avatar?"
		, a: "Shi'ar"
		, b: "Na'vi"
		, c: "Kerian"
		, d: "Toruk Makto"
		, ans: "b"
		, anstext: "The Na'vi (English: The People) are a race of sentient extraterrestrial humanoids who inhabit the lush jungle moon of Pandora. The indigenous Na'vi are, on average, approximately 3 meters (~ 10 feet) tall, with smooth, striped cyan-colored skin, large amber eyes, and long, sweeping tails."
		, image: "assets/images/question09.jpg"
	}
	,
	{
		// Question #10
		q: "What was the last New England state to join the United States?"
		, a: "Maine"
		, b: "Vermont"
		, c: "Rhode Island"
		, d: "Massachusetts"
		, ans: "a"
		, anstext: "As part of the Missouri Compromise between the North and the South, Maine was admitted into the Union as the 23rd state on March 15, 1820. Administered as a province of Massachusetts since 1647, the entrance of Maine as a free state was agreed to by Southern senators in exchange for the entrance of Missouri as a slave state."
		, image: "assets/images/question10.jpg"
	}
];

function startGame() {
	correctAnswers = 0;
	incorrectAnswers = 0;
	unaswered = 0;
	answered = 0;
	qIndex = 0;
	totalTime = 0;

	// console.log("Starting Game!");
	populateQuestion();

}


function populateQuestion() {

	answerSelected = false;
	clearInterval(qIntervalId);
	clkCounter = secondsPerQuestion;

	$(".answers").empty();
	$(".time-text").html("Time Remaining");
	$(".time-remaining").attr("id","time-remaining");		
	$(".time-remaining").html(timeConverter(clkCounter));

	$(".question").html(questions[qIndex].q);

	optButton(questions[qIndex].a,"a");
	optButton(questions[qIndex].b,"b");
	optButton(questions[qIndex].c,"c");
	optButton(questions[qIndex].d,"d");
	
	startClock();

}

function startClock() {
	clearInterval(clkIntervalId);
	clkIntervalId = setInterval(clkDecrement, 1000);
}

function clkDecrement() {
	clkCounter--;

	if(clkCounter <= 10){
		$(".time-remaining").attr("id","alert");
	} else {
		$(".time-remaining").attr("id","time-remaining");		
	}

	$(".time-remaining").html(timeConverter(clkCounter));

	if (clkCounter === 0) {
		clearInterval(clkIntervalId);
		unaswered++;

		$(".answers").empty();

		userMsg("Oops. Time Out!");
		answerFact();
		showImage();
		nextQuestion();
	}
}


$(document).on("click", ".option-button", function () {
	// console.log("Answer selected");
	clearInterval(clkIntervalId);
	answerSelected = true;
	answered++;
	// console.log("The answer is " + questions[qIndex].anstext);
	var answer = $(this).attr("id");

	$(".answers").empty();


	if (answer === questions[qIndex].ans) {
		// console.log("Correct Answer");
		correctAnswers++;
		userMsg("You got it!!");
	} else {
		// console.log("Wrong answer");
		incorrectAnswers++;
		userMsg("Nope!!");
	}

	answerFact();
	showImage();

	nextQuestion();

});

$(document).on("click", "#restart", function () {
	// console.log("Restarting game!");
	startGame();
});

function nextQuestion() {
	// console.log("time lapse: " + clkCounter);
	// console.log("Time taken: " + (secondsPerQuestion - clkCounter));
	totalTime += secondsPerQuestion - clkCounter;
	// console.log("Total time: " + timeConverter(totalTime));
	qIndex++;
	if (qIndex === questions.length) {
		qIntervalId = setInterval(showResult, questionInterval);	
	} else {
		qIntervalId = setInterval(populateQuestion, questionInterval);
	}
}

function showResult() {

	clearInterval(qIntervalId);
	$(".question").empty();
	$(".answers").empty();
	$(".time-text").html("");
	$(".time-remaining").html("");

	userMsg("That's it for now. Here is how you did !!");
	userMsg("Correct Answers: " + correctAnswers);
	userMsg("Incorrect Answers: " + incorrectAnswers);
	userMsg("Unanswered: " + unaswered);
	userMsg("Total time " + timeConverter(totalTime));
	userMsg("<br><br><br>");

	var startOver = $("<button>");
	startOver.html("Start Over ?");
	startOver.attr("id","restart");
	$(".answers").append(startOver);
}

function optButton(optValue,idValue) {
	var myButton = $("<button>");
	myButton.html(optValue);
	myButton.addClass("option-button");
	myButton.attr("id", idValue);
	$(".answers").append(myButton);
}

function answerFact() {
	var userMsg2 = $("<div>");
	userMsg2.addClass("user-message");
	userMsg2.html(questions[qIndex].anstext);
	$(".answers").append(userMsg2);
}

function showImage() {
	var ansImage = $("<div>");
	ansImage.addClass("answer-image");
	ansImage.html("<img src='" + questions[qIndex].image + "' height='300px' >");
	$(".answers").append(ansImage);
}

function userMsg(msgText) {
	var userMsg1 = $("<div>");
	userMsg1.addClass("user-message");
	userMsg1.html(msgText);
	$(".answers").append(userMsg1);
}

function timeConverter(t) {

	//  Takes the current time in seconds and convert it to minutes and seconds (mm:ss).
	var minutes = Math.floor(t / 60);
	var seconds = t - (minutes * 60);

	if (seconds < 10) {
		seconds = "0" + seconds;
	}
	if (minutes === 0) {
		minutes = "00";
	}
	else if (minutes < 10) {
		minutes = "0" + minutes;
	}
	return minutes + ":" + seconds;
}
