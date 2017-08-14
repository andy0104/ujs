//Function Constructor

var Person = function(name, yearOfBirth, job){
	this.name = name;
	this.yearOfBirth = yearOfBirth;
	this.job = job;
	// this.calculateAge = function(){
	// 	console.log('Age:', (2017 - this.yearOfBirth));
	// };
}

//Creating prototype for the calculateAge
//function so that there is exactly 1 copy 
//of the function which is available to all
//the new objects :- Inheritance/Prototype
Person.prototype.calculateAge = function(){
	console.log('Age:', (2017 - this.yearOfBirth));
};

Person.prototype.lastName = 'Smith';

var john = new Person('John', 1985, 'Teacher');
console.log('John Object', john);
console.log(john.calculateAge());
console.log('John Last Name:', john.lastName);

var jane = new Person('Jane', 1996, 'Designer');
console.log('Jane Object', jane);
console.log(jane.calculateAge());
jane.lastName = 'Watson';
console.log('Jane Last Name:', jane.lastName);

// var john = {
// 	name: 'John',
// 	yearOfBirth: 1985,
// 	job: 'Teacher'
// };

//Passing functions as arguments
var years = [2000, 1985, 1999, 1973, 1991];

function arrayCalc(arr, fn){
	var res = [];
	console.log('Input: ', arr);
	for (var i = 0; i < arr.length; i++){
		console.log('Year:', arr[i]);
		res.push(fn(arr[i]));
	}

	return res;
}

function calculateAgeFromYear(yr){
	return (2017 - parseInt(yr));
}

function isFullAge(yr){
	return yr >= 18;
}

function maxHeartRate(yr){

	if (yr >= 18 && yr <= 81){
		return Math.round(206.9 - (0.67 * yr));
	}else{
		return -1;
	}
}

var response = arrayCalc(years, calculateAgeFromYear);
var isFull = arrayCalc(response, isFullAge);
var heartRate = arrayCalc(response, maxHeartRate);
console.log('Years: ', response);
console.log('Full Age: ', isFull);
console.log('Heart Rate: ', heartRate);


//Returning Functions From Functions

function interviewQuestion(job){

	if (job === 'designer'){

		return function(name){
			console.log(name + ', can you please explain what is UX?');
		};
	}else if (job === 'teacher'){
		return function(name){
			console.log('What subject do you teach ' + name + '?');
		};
	}else {
		return function(name){
			console.log('Hello ' + name + ', what do you do?');
		};
	}
}

var teacherQuestion = interviewQuestion('teacher');
teacherQuestion('Puspita');

var designerQuestion = interviewQuestion('designer');
designerQuestion('Subhasree');

var nameQuestion = interviewQuestion('');
nameQuestion('Aninda');


//Immediately Invoked Function Expression (IIFE)
//Function without any name
//wrapped around with parenthesis treated as expression
(function (){
	var score = Math.random() * 10;
	console.log(score >= 5);
})();


//Closures

function retirement(retirementAge){
	var a = ' years left until retirement.';

	return function(yearOfBirth){
		console.log((retirementAge - (2017 - yearOfBirth)) + a);
	};
}

retirement(60)(1985);

function interViewQuestionClosures(job){
	var a = '';
	
	return function(name){
		if (job === 'designer'){
			a = name + ', can you please explain what is UX?';
		}else if (job === 'teacher') {
			a = 'What subject do you teach ' + name + '?';
		}else {
			a = name + ', what do you do?';
		}

		console.log(a);
	};
}

interViewQuestionClosures('teacher')('Bishal');
interViewQuestionClosures('designer')('Poushali');

//Call, Bind, Apply

var suman = {
	name: 'Suman',
	age: 26,
	job: 'teacher',
	presentation: function(style, timeOfDay){
		if (style === 'formal'){
			console.log('Good ' + timeOfDay + ' ladies and gentlemen! I\'m ' + this.name + ', ' + this.age + ' years old and I\'m a ' + this.job + '.');
		}else if (style === 'friendly'){
			console.log('What\'s up everyone! I\'m ' + this.name + ', ' + this.age + ' and I\'m a ' + this.job + '. Have a great ' + timeOfDay + '.');
		}
	}
};

suman.presentation('formal', 'morning')

var puspita = {
	name: 'Puspita',
	age: 31,
	job: 'tester'
};

suman.presentation.call(puspita, 'friendly', 'afternoon');
var puspitaFormal = suman.presentation.bind(puspita, 'formal');
puspitaFormal('night');


